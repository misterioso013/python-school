'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

interface ModuleCardProps {
  title: string
  description: string
  progress: number
  href: string
}

export function ModuleCard({ title, description, progress, href }: ModuleCardProps) {
  return (
    <Link href={href}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {description}
          </p>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {progress}% completo
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}