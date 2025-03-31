import { PrismaClient } from '@prisma/client'
import { generateCertificateNumber } from '../src/lib/utils/certificate'

const prisma = new PrismaClient()

async function main() {
  // 1. Encontrar um usuário existente
  const user = await prisma.user.findFirst()

  if (!user) {
    console.error('Nenhum usuário encontrado')
    return
  }

  // 2. Criar uma conclusão de módulo
  const moduleCompletion = await prisma.moduleCompletion.create({
    data: {
      userId: user.id,
      moduleId: 'basics',
      completedAt: new Date()
    }
  })

  // 3. Criar um certificado
  const certificate = await prisma.certificate.create({
    data: {
      userId: user.id,
      moduleId: 'basics',
      certificateNumber: generateCertificateNumber(),
      moduleCompletionId: moduleCompletion.id
    }
  })

  console.log('Certificado criado:', certificate)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())