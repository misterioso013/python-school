import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { clerkId } = await req.json()

  const user = await prisma.user.findUnique({
    where: { clerkId }
  })

  if (user) {
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const newUser = await prisma.user.create({
    data: { clerkId }
  })

  return new Response(JSON.stringify(newUser), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  })
}