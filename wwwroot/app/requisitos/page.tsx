import { Card, CardContent } from "@/components/ui/card"
import { Check, AlertCircle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Requisitos() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-bold text-red-900 md:text-4xl">Requisitos para Doar Sangue</h1>
          <p className="text-lg text-gray-600">Confira se você está apto a realizar este gesto de solidariedade</p>
        </div>

        <Alert className="mb-8 border-red-200 bg-red-50">
          <Info className="h-5 w-5 text-red-700" />
          <AlertTitle className="text-red-900">Importante</AlertTitle>
          <AlertDescription className="text-gray-700">
            Antes de doar, certifique-se de estar bem alimentado e descansado. Leve um documento oficial com foto.
          </AlertDescription>
        </Alert>

        <div className="mb-10">
          <h2 className="mb-6 text-2xl font-semibold text-red-900">Regras Básicas</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <RequisitoCard titulo="Idade" descricao="Ter entre 16 e 69 anos (menores precisam de autorização)" />
            <RequisitoCard titulo="Peso" descricao="Pesar mais de 50kg" />
            <RequisitoCard titulo="Saúde" descricao="Estar em boas condições de saúde" />
            <RequisitoCard titulo="Alimentação" descricao="Estar alimentado (evite alimentos gordurosos)" />
            <RequisitoCard titulo="Descanso" descricao="Ter dormido pelo menos 6 horas nas últimas 24 horas" />
            <RequisitoCard titulo="Documentação" descricao="Apresentar documento oficial com foto" />
          </div>
        </div>

        <div className="mb-10">
          <h2 className="mb-6 text-2xl font-semibold text-red-900">Impedimentos Temporários</h2>
          <div className="space-y-4">
            <ImpedimentoItem titulo="Gripe, resfriado ou febre" tempo="7 dias após o fim dos sintomas" />
            <ImpedimentoItem titulo="Gravidez" tempo="90 dias após o parto normal e 180 dias após cesariana" />
            <ImpedimentoItem titulo="Amamentação" tempo="12 meses após o parto" />
            <ImpedimentoItem titulo="Ingestão de bebida alcoólica" tempo="12 horas após o consumo" />
            <ImpedimentoItem titulo="Tatuagem ou piercing" tempo="12 meses após o procedimento" />
          </div>
        </div>

        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-5 w-5 text-red-700" />
          <AlertTitle className="text-red-900">Atenção</AlertTitle>
          <AlertDescription className="text-gray-700">
            Em caso de dúvidas, entre em contato com o banco de sangue mais próximo. Cada caso é avaliado
            individualmente pelos profissionais de saúde.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}

function RequisitoCard({
  titulo,
  descricao,
}: {
  titulo: string
  descricao: string
}) {
  return (
    <Card className="border-red-100 transition-all hover:shadow-sm">
      <CardContent className="flex items-start gap-3 p-4">
        <div className="mt-1 rounded-full bg-red-100 p-1">
          <Check className="h-4 w-4 text-red-700" />
        </div>
        <div>
          <h3 className="font-semibold text-red-900">{titulo}</h3>
          <p className="text-sm text-gray-600">{descricao}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function ImpedimentoItem({
  titulo,
  tempo,
}: {
  titulo: string
  tempo: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-red-100 bg-white p-4 shadow-sm">
      <AlertCircle className="h-5 w-5 text-red-700" />
      <div>
        <span className="font-medium text-red-900">{titulo}:</span> <span className="text-gray-700">{tempo}</span>
      </div>
    </div>
  )
}
