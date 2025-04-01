import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(',') || []

async function isAdmin(userId: string) {
  const user = await prisma.user.findFirst({
    where: { clerkId: userId }
  })
  return user && ADMIN_EMAILS.includes(user.email || '')
}

export async function POST(req: Request) {
  const { userId } = auth()
  if (!userId || !await isAdmin(userId)) {
    return new Response('Unauthorized', { status: 401 })
  }

  const data = await req.json()

  const lesson = await prisma.lesson.create({
    data: {
      moduleId: data.moduleId,
      slug: data.slug,
      title: data.title,
      content: data.content,
      order: data.order
    }
  })

  return new Response(JSON.stringify(lesson), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  })
}