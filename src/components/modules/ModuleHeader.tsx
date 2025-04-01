import { Progress } from "@/components/ui/progress"

interface ModuleHeaderProps {
  title: string
  description: string
  progress: number
}

export function ModuleHeader({ title, description, progress }: ModuleHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progresso</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} />
      </div>
    </div>
  )
}