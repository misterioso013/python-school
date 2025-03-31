import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { checkAndIssueCertificate } from '@/lib/services/certificate'

export async function POST(req: Request) {
  const { userId } = auth()
  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { moduleId } = await req.json()

  const user = await prisma.user.findFirst({
    where: { clerkId: userId }
  })

  if (!user) {
    return new Response('User not found', { status: 404 })
  }

  const certificate = await checkAndIssueCertificate(user.id, moduleId)

  if (!certificate) {
    return new Response('Module not completed or certificate already issued', { status: 400 })
  }

  return new Response(JSON.stringify(certificate), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}