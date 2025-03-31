import { Progress as ProgressBar } from "@/components/ui/progress"

interface ProgressProps {
  progress: number
}

export function Progress({ progress }: ProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Progresso geral</span>
        <span>{progress}%</span>
      </div>
      <ProgressBar value={progress} className="h-2" />
    </div>
  )
}