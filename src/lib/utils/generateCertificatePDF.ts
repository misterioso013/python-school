import { jsPDF } from 'jspdf'

interface GenerateCertificateProps {
  studentName: string
  moduleName: string
  certificateNumber: string
  completionDate: string
}

export async function generateCertificatePDF({
  studentName,
  moduleName,
  certificateNumber,
  completionDate
}: GenerateCertificateProps) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  })

  // Configurar fonte
  doc.setFont('helvetica', 'normal')

  // Adicionar borda decorativa
  doc.setDrawColor(0, 128, 0)
  doc.setLineWidth(1)
  doc.rect(10, 10, 277, 190)

  // Título
  doc.setFontSize(40)
  doc.setTextColor(0, 100, 0)
  doc.text('CERTIFICADO', 148.5, 40, { align: 'center' })

  // Texto principal
  doc.setFontSize(16)
  doc.setTextColor(0, 0, 0)
  doc.text(
    `Certificamos que ${studentName} concluiu com êxito o módulo`,
    148.5,
    80,
    { align: 'center' }
  )

  // Nome do módulo
  doc.setFontSize(24)
  doc.setTextColor(0, 100, 0)
  doc.text(moduleName, 148.5, 100, { align: 'center' })

  // Informações adicionais
  doc.setFontSize(12)
  doc.setTextColor(100, 100, 100)
  doc.text(`Certificado Nº: ${certificateNumber}`, 20, 180)
  doc.text(`Data de Conclusão: ${completionDate}`, 20, 188)

  // Logo ou marca d'água
  doc.setFontSize(14)
  doc.setTextColor(200, 200, 200)
  doc.text('Python School', 255, 188, { align: 'right' })

  return doc.output('blob')
}