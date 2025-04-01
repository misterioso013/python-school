import { prisma } from '@/lib/prisma'

export async function isAdmin(userId: string) {
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || []
  console.log(adminEmails)
  const user = await prisma.user.findFirst({
    where: { clerkId: userId }
  })
  return user?.email && adminEmails.includes(user.email)
}