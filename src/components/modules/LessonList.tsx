import { Card } from "@/components/ui/card"
import { CheckCircle2, Circle } from "lucide-react"
import Link from "next/link"

interface Lesson {
  id: string
  title: string
  completed: boolean
}

interface LessonListProps {
  lessons: Lesson[]
  moduleId: string
  locale: string
}

export function LessonList({ lessons, moduleId, locale }: LessonListProps) {
  return (
    <div className="grid gap-4">
      {lessons.map((lesson) => (
        <Link
          key={lesson.id}
          href={`/${locale}/modules/${moduleId}/${lesson.id}`}
        >
          <Card className="p-4 hover:bg-accent transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-medium">{lesson.title}</span>
              {lesson.completed ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}