'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface Lesson {
  id: string
  moduleId: string
  slug: string
  title: string
  content: string
  order: number
}

interface LessonManagerProps {
  lessons: Lesson[]
}

export function LessonManager({ lessons: initialLessons }: LessonManagerProps) {
  const [lessons, setLessons] = useState(initialLessons)
  const [newLesson, setNewLesson] = useState({
    moduleId: 'basics',
    slug: '',
    title: '',
    content: '',
    order: 0
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const response = await fetch('/api/admin/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLesson)
      })

      if (!response.ok) throw new Error('Failed to create lesson')

      const lesson = await response.json()
      setLessons([...lessons, lesson])
      setNewLesson({
        moduleId: 'basics',
        slug: '',
        title: '',
        content: '',
        order: 0
      })
      toast({
        title: "Sucesso!",
        description: "Lição criada com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro!",
        description: "Falha ao criar lição.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Adicionar Nova Lição</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Módulo</label>
              <select
                className="w-full p-2 border rounded"
                value={newLesson.moduleId}
                onChange={e => setNewLesson({...newLesson, moduleId: e.target.value})}
              >
                <option value="basics">Fundamentos</option>
                <option value="intermediate">Intermediário</option>
                <option value="advanced">Avançado</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Ordem</label>
              <Input
                type="number"
                value={newLesson.order}
                onChange={e => setNewLesson({...newLesson, order: parseInt(e.target.value)})}
              />
            </div>
          </div>
          <div>
            <label className="block mb-2">Slug</label>
            <Input
              value={newLesson.slug}
              onChange={e => setNewLesson({...newLesson, slug: e.target.value})}
              placeholder="variables"
            />
          </div>
          <div>
            <label className="block mb-2">Título</label>
            <Input
              value={newLesson.title}
              onChange={e => setNewLesson({...newLesson, title: e.target.value})}
              placeholder="Variáveis em Python"
            />
          </div>
          <div>
            <label className="block mb-2">Conteúdo (Markdown)</label>
            <Textarea
              value={newLesson.content}
              onChange={e => setNewLesson({...newLesson, content: e.target.value})}
              rows={10}
            />
          </div>
          <Button type="submit">Adicionar Lição</Button>
        </form>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Lições Existentes</h2>
        {lessons.map(lesson => (
          <Card key={lesson.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold">{lesson.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {lesson.moduleId} / {lesson.slug}
                </p>
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm">Editar</Button>
                <Button variant="destructive" size="sm">Excluir</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}