'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface Certificate {
  id: string
  moduleId: string
  certificateNumber: string
  issuedAt: string
}

interface ModuleProgress {
  moduleId: string
  progress: number
}

interface CertificatesProps {
  certificates: Certificate[]
  progress: ModuleProgress[]
  onRequestCertificate: (moduleId: string) => Promise<void>
}

export function Certificates({ certificates, progress, onRequestCertificate }: CertificatesProps) {
  const [downloading, setDownloading] = useState<string | null>(null)

  const handleDownload = async (certificateId: string) => {
    try {
      setDownloading(certificateId)
      const response = await fetch(`/pt-BR/api/certificates/download/${certificateId}`)

      if (!response.ok) throw new Error('Failed to download certificate')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `certificado.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading certificate:', error)
    } finally {
      setDownloading(null)
    }
  }

  const moduleNames = {
    'basics': 'Fundamentos do Python',
    'intermediate': 'Python Intermediário',
    'advanced': 'Python Avançado'
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Certificados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(moduleNames).map(([moduleId, name]) => {
          const certificate = certificates.find(cert => cert.moduleId === moduleId)
          const moduleProgress = progress.find(p => p.moduleId === moduleId)?.progress || 0

          return (
            <Card key={moduleId}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  {name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {certificate ? (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">
                      Certificado Nº: {certificate.certificateNumber}
                    </p>
                    <p className="text-sm text-gray-500">
                      Emitido em: {new Date(certificate.issuedAt).toLocaleDateString()}
                    </p>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleDownload(certificate.id)}
                      disabled={downloading === certificate.id}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {downloading === certificate.id ? 'Baixando...' : 'Download'}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">
                      {moduleProgress === 100
                        ? 'Você completou este módulo! Solicite seu certificado.'
                        : `Complete todas as lições para receber seu certificado (${moduleProgress}%)`
                      }
                    </p>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => onRequestCertificate(moduleId)}
                      disabled={moduleProgress < 100}
                    >
                      Solicitar Certificado
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}