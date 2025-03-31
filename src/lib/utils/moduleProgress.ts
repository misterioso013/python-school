import { prisma } from '@/lib/prisma'

export async function isModuleCompleted(userId: string, moduleId: string) {
  const totalLessons = {
    'basics': 10, // Número total de lições do módulo básico
    'intermediate': 15, // Número total de lições do módulo intermediário
    'advanced': 20 // Número total de lições do módulo avançado
  }

  const completedLessons = await prisma.progress.count({
    where: {
      userId,
      moduleId,
      completed: true
    }
  })

  return completedLessons === totalLessons[moduleId as keyof typeof totalLessons]
}