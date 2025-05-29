import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Calendar, Award, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-red-50 py-16 md:py-24">
        <div className="blood-drop-bg absolute inset-0 opacity-30" />
        <div className="container relative z-10 flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-red-900 sm:text-5xl md:text-6xl">
              Doe Sangue, <br />
              <span className="text-red-700">Salve Vidas</span>
            </h1>
            <p className="mx-auto max-w-[600px] text-lg text-gray-700 md:mx-0">
              Uma única doação pode salvar até 4 vidas. Junte-se a nós nessa corrente de solidariedade e faça a
              diferença.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              <Button size="lg" className="bg-red-700 text-white hover:bg-red-800" asChild>
                <Link href="/doadores">Quero Doar</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-red-700 text-red-700 hover:bg-red-50" asChild>
                <Link href="/requisitos">Ver Requisitos</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Doação de Sangue"
              width={400}
              height={400}
              className="mx-auto rounded-lg shadow-lg md:mx-0"
              priority
            />
          </div>
        </div>
      </section>

      {/* Por que doar section */}
      <section className="py-16">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold text-red-900">Por que doar sangue?</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-red-100 bg-white transition-all hover:shadow-md">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-red-50 p-3">
                  <Heart className="h-8 w-8 text-red-700" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-red-900">Salva Vidas</h3>
                <p className="text-gray-600">
                  Uma única doação pode salvar até 4 vidas em situações de emergência, cirurgias e tratamentos.
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-100 bg-white transition-all hover:shadow-md">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-red-50 p-3">
                  <Users className="h-8 w-8 text-red-700" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-red-900">Ato de Solidariedade</h3>
                <p className="text-gray-600">
                  Doar sangue é um gesto de amor ao próximo que contribui para uma sociedade mais humana e solidária.
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-100 bg-white transition-all hover:shadow-md md:col-span-2 lg:col-span-1">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-red-50 p-3">
                  <Calendar className="h-8 w-8 text-red-700" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-red-900">Rápido e Seguro</h3>
                <p className="text-gray-600">
                  O processo leva apenas 40 minutos e é realizado com total segurança e higiene para o doador.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefícios section */}
      <section className="bg-red-50 py-16">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold text-red-900">Benefícios da doação</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-red-100 p-2">
                  <Award className="h-6 w-6 text-red-700" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-red-900">Ajuda a salvar vidas</h3>
                  <p className="text-gray-600">
                    Sua doação pode ser crucial para pessoas em situações de emergência, cirurgias e tratamentos
                    médicos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-red-100 p-2">
                  <Award className="h-6 w-6 text-red-700" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-red-900">Estimula a produção de novas células</h3>
                  <p className="text-gray-600">
                    Após a doação, seu corpo é estimulado a produzir novas células sanguíneas, renovando seu sangue.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-red-100 p-2">
                  <Award className="h-6 w-6 text-red-700" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-red-900">Contribui para um mundo mais solidário</h3>
                  <p className="text-gray-600">
                    Seu exemplo inspira outras pessoas a também doarem, fortalecendo a cultura de solidariedade.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative h-[300px] w-[300px] overflow-hidden rounded-full border-8 border-white shadow-lg">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Benefícios da doação"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Button className="bg-red-700 text-white hover:bg-red-800" size="lg" asChild>
              <Link href="/doadores" className="flex items-center gap-2">
                Quero me tornar um doador
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
