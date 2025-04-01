import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
  console.log('Webhook Secret:', WEBHOOK_SECRET)

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env')
  }

  const headerPayload = headers();
  console.log('All Headers:', Object.fromEntries(headerPayload.entries()))
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  console.log('Svix Headers:', {
    svix_id,
    svix_timestamp,
    svix_signature
  })

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
    console.log('Verified webhook event:', evt)
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400
    })
  }

  const { id } = evt.data;
  const eventType = evt.type;

  console.log('Event type:', eventType)
  console.log('Event data:', evt.data)

  if (eventType === 'user.created') {
    if (!id) return new Response('No user id provided', { status: 400 });

    const { first_name, last_name, email_addresses, image_url } = evt.data;
    const name = first_name && last_name
      ? `${first_name} ${last_name}`
      : first_name || 'Estudante';
    const email = email_addresses?.[0]?.email_address || '';

    console.log('Creating user:', {
      clerkId: id,
      name,
      email,
      imageUrl: image_url
    });

    try {
      await prisma.user.create({
        data: {
          clerkId: id,
          name,
          email,
          imageUrl: image_url
        }
      })
      console.log('User created successfully')
    } catch (error) {
      console.error('Error creating user:', error)
      return new Response('Error creating user', { status: 500 })
    }
  }

  if (eventType === 'user.deleted') {
    try {
      // Verificar se o usuário existe antes de tentar deletar
      const user = await prisma.user.findUnique({
        where: { clerkId: id }
      })

      if (!user) {
        console.log('User not found in database, skipping delete')
        return new Response('User not found', { status: 200 })
      }

      await prisma.user.delete({
        where: {
          clerkId: id
        }
      })

      console.log('User deleted successfully')
      return new Response('User deleted', { status: 200 })
    } catch (error) {
      console.error('Error deleting user:', error)
      return new Response('Error deleting user', { status: 500 })
    }
  }

  if (eventType === 'user.updated') {
    if (!id) return new Response('No user id provided', { status: 400 });

    const { first_name, last_name, email_addresses, image_url } = evt.data;
    const name = first_name && last_name
      ? `${first_name} ${last_name}`
      : first_name || 'Estudante';
    const email = email_addresses?.[0]?.email_address;

    await prisma.user.update({
      where: { clerkId: id },
      data: {
        name,
        email,
        imageUrl: image_url
      }
    })
  }

  return new Response('', { status: 200 })
}
