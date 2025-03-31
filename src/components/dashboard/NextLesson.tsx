'use client'

import Link from "next/link"
import { PlayCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface NextLessonProps {
  title: string
  description: string
  module: string
  duration: string
  href: string
  locale: string
}

export function NextLesson({ title, description, module, duration, href, locale }: NextLessonProps) {
  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Próxima Lição</CardTitle>
        <span className="text-sm text-gray-500">{duration} min</span>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-sm text-gray-500 mb-2">{description}</p>
            <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              {module}
            </span>
          </div>
          <Link
            href={`/${locale}${href}`}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
          >
            <PlayCircle size={20} />
            <span>Continuar</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}