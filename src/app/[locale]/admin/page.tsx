import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { LessonManager } from "@/components/admin/LessonManager"
import { prisma } from "@/lib/prisma"
import { isAdmin } from "@/lib/utils/auth"

const ADMIN_EMAILS = ['seu-email@exemplo.com'] // Lista de emails autorizados

export default async function AdminPage() {
  const { userId } = auth()
  if (!userId) redirect('/')

  if (!await isAdmin(userId)) {
    redirect('/')
  }

  const lessons = await prisma.lesson.findMany({
    orderBy: [
      { moduleId: 'asc' },
      { order: 'asc' }
    ]
  })

  return (
    <div className="container mx-auto py-8">
      <AdminHeader />
      <LessonManager lessons={lessons} />
    </div>
  )
}