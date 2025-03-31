'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Certificate {
  id: string
  moduleId: string
  certificateNumber: string
  issuedAt: string
}

interface CertificatesProps {
  certificates: Certificate[]
  onRequestCertificate: (moduleId: string) => Promise<void>
}

export function Certificates({ certificates, onRequestCertificate }: CertificatesProps) {
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
                    <Button variant="outline" className="w-full" onClick={() => {}}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">
                      Complete todas as lições para receber seu certificado
                    </p>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => onRequestCertificate(moduleId)}
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