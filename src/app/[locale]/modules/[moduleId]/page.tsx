import { getTranslations } from "next-intl/server"
import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { ModuleHeader } from "@/components/modules/ModuleHeader"
import { LessonList } from "@/components/modules/LessonList"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

interface ModulePageProps {
  params: {
    locale: string
    moduleId: string
  }
}

async function getModuleLessons(moduleId: string) {
  // Temporário - depois virá do banco de dados
  return [
    { id: 'variables', title: 'Variáveis', completed: true },
    { id: 'data-types', title: 'Tipos de Dados', completed: true },
    { id: 'operators', title: 'Operadores', completed: false },
    { id: 'conditionals', title: 'Condicionais', completed: false },
    { id: 'loops', title: 'Loops', completed: false }
  ]
}

async function getModuleProgress(userId: string, moduleId: string) {
  const user = await prisma.user.findFirst({
    where: { clerkId: userId }
  })

  if (!user) return 0

  const completedLessons = await prisma.progress.count({
    where: {
      userId: user.id,
      moduleId,
      completed: true
    }
  })

  const totalLessons = {
    'basics': 10,
    'intermediate': 15,
    'advanced': 20
  }

  return Math.round((completedLessons / totalLessons[moduleId as keyof typeof totalLessons]) * 100)
}

export default async function ModulePage({ params: { locale, moduleId } }: ModulePageProps) {
  const t = await getTranslations('dashboard.modules')
  const { userId } = auth()

  const lessons = await getModuleLessons(moduleId)
  const progress = userId ? await getModuleProgress(userId, moduleId) : 0

  return (
    <>
      <Header locale={locale} />
      <main className="container mx-auto sm:px-10 py-8 bg-background">
        <ModuleHeader
          title={t(`${moduleId}.title`)}
          description={t(`${moduleId}.description`)}
          progress={progress}
        />
        <LessonList lessons={lessons} moduleId={moduleId} locale={locale} />
      </main>
      <Footer />
    </>
  )
}