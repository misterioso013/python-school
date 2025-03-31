import { prisma } from '@/lib/prisma'

export async function getOrCreateUser(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId }
  })

  if (user) return user

  return prisma.user.create({
    data: { clerkId }
  })
}