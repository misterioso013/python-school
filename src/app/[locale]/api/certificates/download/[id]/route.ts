import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { generateCertificatePDF } from '@/lib/utils/generateCertificatePDF'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = auth()
  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  const user = await prisma.user.findFirst({
    where: { clerkId: userId },
    select: {
      id: true,
      name: true,
      email: true,
      imageUrl: true
    }
  })

  if (!user) {
    return new Response('User not found', { status: 404 })
  }

  const certificate = await prisma.certificate.findUnique({
    where: { id: params.id },
    include: {
      user: true
    }
  })

  if (!certificate || certificate.userId !== user.id) {
    return new Response('Certificate not found', { status: 404 })
  }

  const moduleNames = {
    'basics': 'Fundamentos do Python',
    'intermediate': 'Python Intermediário',
    'advanced': 'Python Avançado'
  }

  const pdf = await generateCertificatePDF({
    studentName: user.name || 'Estudante',
    moduleName: moduleNames[certificate.moduleId as keyof typeof moduleNames],
    certificateNumber: certificate.certificateNumber,
    completionDate: certificate.issuedAt.toLocaleDateString()
  })

  return new Response(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="certificado-${certificate.moduleId}.pdf"`
    }
  })
}