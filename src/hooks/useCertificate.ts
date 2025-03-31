'use client'

import { useState } from 'react'
import { useToast } from "@/components/ui/use-toast"

export function useCertificate() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const requestCertificate = async (moduleId: string) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/certificates/issue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ moduleId }),
      })

      if (!response.ok) {
        throw new Error('Failed to request certificate')
      }

      const certificate = await response.json()

      toast({
        title: "Certificado emitido!",
        description: "Seu certificado foi emitido com sucesso.",
      })

      return certificate
    } catch (error) {
      toast({
        title: "Erro ao emitir certificado",
        description: "Complete todas as lições do módulo primeiro.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { requestCertificate, isLoading }
}