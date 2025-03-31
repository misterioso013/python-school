import { prisma } from '@/lib/prisma'
import { generateCertificateNumber } from '@/lib/utils/certificate'

export async function checkAndIssueCertificate(userId: string, moduleId: string) {
  // Verificar se todas as lições do módulo foram completadas
  const progress = await prisma.progress.findMany({
    where: {
      userId,
      moduleId,
    }
  })

  const allLessonsCompleted = progress.every(p => p.completed)

  if (!allLessonsCompleted) {
    return null
  }

  // Criar ou recuperar a conclusão do módulo
  const moduleCompletion = await prisma.moduleCompletion.upsert({
    where: {
      userId_moduleId: {
        userId,
        moduleId
      }
    },
    create: {
      userId,
      moduleId
    },
    update: {}
  })

  // Verificar se já existe um certificado
  if (await prisma.certificate.findUnique({
    where: { moduleCompletionId: moduleCompletion.id }
  })) {
    return null
  }

  // Criar certificado
  const certificate = await prisma.certificate.create({
    data: {
      moduleId,
      userId,
      certificateNumber: generateCertificateNumber(),
      moduleCompletionId: moduleCompletion.id
    }
  })

  // Registrar atividade
  await prisma.activity.create({
    data: {
      userId,
      type: 'certificate_issued',
      detail: `Certificado emitido para o módulo ${moduleId}`
    }
  })

  return certificate
}