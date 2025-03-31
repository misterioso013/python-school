import { getTranslations } from "next-intl/server"
import { ModuleCard } from "@/components/dashboard/ModuleCard"
import { Progress } from "@/components/dashboard/Progress"
import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { UserProfile } from "@/components/dashboard/UserProfile"
import { NextLesson } from "@/components/dashboard/NextLesson"
import { UserStats } from "@/components/dashboard/UserStats"
import { Certificates } from "@/components/dashboard/Certificates"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

async function getUserCertificates(userId: string) {
  const user = await prisma.user.findFirst({
    where: { clerkId: userId },
    include: {
      certificates: {
        select: {
          id: true,
          moduleId: true,
          certificateNumber: true,
          issuedAt: true
        }
      }
    }
  })

  return user?.certificates.map(cert => ({
    ...cert,
    issuedAt: cert.issuedAt.toISOString()
  })) || []
}

async function getModuleProgress(userId: string) {
  const user = await prisma.user.findFirst({
    where: { clerkId: userId }
  })

  if (!user) return []

  const progress = await prisma.progress.groupBy({
    by: ['moduleId'],
    where: {
      userId: user.id,
      completed: true
    },
    _count: true
  })

  const totalLessons = {
    'basics': 10,
    'intermediate': 15,
    'advanced': 20
  }

  return progress.map(p => ({
    moduleId: p.moduleId,
    progress: Math.round((p._count / totalLessons[p.moduleId as keyof typeof totalLessons]) * 100)
  }))
}

export default async function Dashboard({params: {locale}}: {params: {locale: string}}) {
  const t = await getTranslations('dashboard')
  const { userId } = auth()
  const certificates = userId ? await getUserCertificates(userId) : []
  const progress = userId ? await getModuleProgress(userId) : []

  return (
    <>
      <Header locale={locale} />
      <main className="container mx-auto sm:px-10 py-8 bg-background">
        <UserProfile />
        <UserStats />

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{t('welcome')}</h1>
          <Progress progress={30} />
        </div>

        <NextLesson
          title={t('next_lesson.title')}
          description={t('next_lesson.description')}
          module={t('modules.basics.title')}
          duration="15"
          href="/modules/basics/variables"
          locale={locale}
        />

        <Certificates
          certificates={certificates}
          progress={progress}
          onRequestCertificate={async (moduleId) => {
            'use server'
            // A lógica de solicitação será implementada no cliente
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ModuleCard
            title={t('modules.basics.title')}
            description={t('modules.basics.description')}
            progress={100}
            href={`/${locale}/modules/basics`}
          />
          <ModuleCard
            title={t('modules.intermediate.title')}
            description={t('modules.intermediate.description')}
            progress={45}
            href={`/${locale}/modules/intermediate`}
          />
          <ModuleCard
            title={t('modules.advanced.title')}
            description={t('modules.advanced.description')}
            progress={0}
            href={`/${locale}/modules/advanced`}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}