'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Clock, Trophy, Target } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}

function StatsCard({ title, value, description, icon }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      </CardContent>
    </Card>
  )
}

export function UserStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatsCard
        title="Tempo de estudo"
        value="12h 30m"
        description="Nesta semana"
        icon={<Clock className="h-4 w-4 text-gray-500" />}
      />
      <StatsCard
        title="Lições completadas"
        value="24"
        description="De 48 lições"
        icon={<BookOpen className="h-4 w-4 text-gray-500" />}
      />
      <StatsCard
        title="Conquistas"
        value="8"
        description="3 novas esta semana"
        icon={<Trophy className="h-4 w-4 text-gray-500" />}
      />
      <StatsCard
        title="Meta diária"
        value="80%"
        description="2/3 objetivos completos"
        icon={<Target className="h-4 w-4 text-gray-500" />}
      />
    </div>
  )
}