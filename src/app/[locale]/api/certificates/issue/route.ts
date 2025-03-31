import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { generateCertificateNumber } from '@/lib/utils/certificate'
import { isModuleCompleted } from '@/lib/utils/moduleProgress'

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

  // Verifica se o módulo foi concluído
  const completed = await isModuleCompleted(user.id, moduleId)
  if (!completed) {
    return new Response('Module not completed', { status: 400 })
  }

  // Verifica se já existe um certificado
  const existingCertificate = await prisma.certificate.findFirst({
    where: {
      userId: user.id,
      moduleId
    }
  })

  if (existingCertificate) {
    return new Response('Certificate already issued', { status: 400 })
  }

  // Cria o registro de conclusão do módulo
  const moduleCompletion = await prisma.moduleCompletion.create({
    data: {
      userId: user.id,
      moduleId
    }
  })

  // Emite o certificado
  const certificate = await prisma.certificate.create({
    data: {
      userId: user.id,
      moduleId,
      certificateNumber: generateCertificateNumber(),
      moduleCompletionId: moduleCompletion.id
    }
  })

  return new Response(JSON.stringify(certificate), {
    status: 201,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}