"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2, Edit, Save, X, UserPlus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Doador {
  id: number
  nome: string
  tipoSanguineo: string
  dataUltimaDoacao: string
}

export default function Doadores() {
  const [doadores, setDoadores] = useState<Doador[]>([])
  const [nome, setNome] = useState("")
  const [tipoSanguineo, setTipoSanguineo] = useState("")
  const [dataUltimaDoacao, setDataUltimaDoacao] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editValues, setEditValues] = useState<Partial<Doador>>({})
  const { toast } = useToast()

  const apiUrl = "/api/doadores"

  useEffect(() => {
    carregarDoadores()
  }, [])

  async function carregarDoadores() {
    try {
      // Simulando dados para demonstração
      const dadosSimulados = [
        {
          id: 1,
          nome: "Maria Silva",
          tipoSanguineo: "O+",
          dataUltimaDoacao: "2025-03-15",
        },
        {
          id: 2,
          nome: "João Santos",
          tipoSanguineo: "A-",
          dataUltimaDoacao: "2025-02-20",
        },
        {
          id: 3,
          nome: "Ana Oliveira",
          tipoSanguineo: "AB+",
          dataUltimaDoacao: "2025-04-10",
        },
      ]
      setDoadores(dadosSimulados)
    } catch (erro) {
      toast({
        title: "Erro ao carregar doadores",
        description: "Não foi possível carregar a lista de doadores.",
        variant: "destructive",
      })
    }
  }

  async function cadastrarDoador(e: React.FormEvent) {
    e.preventDefault()
    try {
      // Simulando cadastro
      const novoDoador = {
        id: doadores.length + 1,
        nome,
        tipoSanguineo,
        dataUltimaDoacao,
      }
      setDoadores([...doadores, novoDoador])
      setNome("")
      setTipoSanguineo("")
      setDataUltimaDoacao("")
      toast({
        title: "Doador cadastrado",
        description: "O doador foi cadastrado com sucesso!",
      })
    } catch (erro) {
      toast({
        title: "Erro ao cadastrar",
        description: "Não foi possível cadastrar o doador.",
        variant: "destructive",
      })
    }
  }

  function iniciarEdicao(doador: Doador) {
    setEditingId(doador.id)
    setEditValues({
      nome: doador.nome,
      tipoSanguineo: doador.tipoSanguineo,
      dataUltimaDoacao: doador.dataUltimaDoacao,
    })
  }

  function cancelarEdicao() {
    setEditingId(null)
    setEditValues({})
  }

  async function salvarEdicao(id: number) {
    try {
      // Simulando atualização
      const doadoresAtualizados = doadores.map((doador) =>
        doador.id === id
          ? {
              ...doador,
              nome: editValues.nome || doador.nome,
              tipoSanguineo: editValues.tipoSanguineo || doador.tipoSanguineo,
              dataUltimaDoacao: editValues.dataUltimaDoacao || doador.dataUltimaDoacao,
            }
          : doador,
      )
      setDoadores(doadoresAtualizados)
      setEditingId(null)
      setEditValues({})
      toast({
        title: "Doador atualizado",
        description: "As informações do doador foram atualizadas com sucesso!",
      })
    } catch (erro) {
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível atualizar o doador.",
        variant: "destructive",
      })
    }
  }

  async function excluirDoador(id: number) {
    try {
      // Simulando exclusão
      setDoadores(doadores.filter((doador) => doador.id !== id))
      toast({
        title: "Doador excluído",
        description: "O doador foi excluído com sucesso!",
      })
    } catch (erro) {
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o doador.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container py-12">
      <div className="mb-10 text-center">
        <h1 className="mb-3 text-3xl font-bold text-red-900 md:text-4xl">Gestão de Doadores</h1>
        <p className="text-lg text-gray-600">Cadastre e gerencie os doadores de sangue</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="border-red-100">
          <CardHeader className="bg-red-50">
            <CardTitle className="flex items-center gap-2 text-red-900">
              <UserPlus className="h-5 w-5" />
              Cadastrar Novo Doador
            </CardTitle>
            <CardDescription>Preencha os dados para cadastrar um novo doador</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={cadastrarDoador} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome do doador"
                  required
                  className="border-red-100 focus-visible:ring-red-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipoSanguineo">Tipo Sanguíneo</Label>
                <Input
                  id="tipoSanguineo"
                  value={tipoSanguineo}
                  onChange={(e) => setTipoSanguineo(e.target.value)}
                  placeholder="Ex: A+, O-, AB+"
                  required
                  className="border-red-100 focus-visible:ring-red-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataUltimaDoacao">Data da Última Doação</Label>
                <Input
                  id="dataUltimaDoacao"
                  type="date"
                  value={dataUltimaDoacao}
                  onChange={(e) => setDataUltimaDoacao(e.target.value)}
                  required
                  className="border-red-100 focus-visible:ring-red-700"
                />
              </div>
              <Button type="submit" className="w-full bg-red-700 text-white hover:bg-red-800">
                Cadastrar Doador
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-red-100">
            <CardHeader className="bg-red-50">
              <CardTitle className="text-red-900">Lista de Doadores</CardTitle>
              <CardDescription>Gerencie os doadores cadastrados no sistema</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[500px] overflow-auto">
                <Table>
                  <TableHeader className="bg-red-50/50">
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Última Doação</TableHead>
                      <TableHead className="w-[100px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {doadores.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                          Nenhum doador cadastrado
                        </TableCell>
                      </TableRow>
                    ) : (
                      doadores.map((doador) => (
                        <TableRow key={doador.id}>
                          <TableCell>
                            {editingId === doador.id ? (
                              <Input
                                value={editValues.nome || ""}
                                onChange={(e) =>
                                  setEditValues({
                                    ...editValues,
                                    nome: e.target.value,
                                  })
                                }
                                className="border-red-100 focus-visible:ring-red-700"
                              />
                            ) : (
                              doador.nome
                            )}
                          </TableCell>
                          <TableCell>
                            {editingId === doador.id ? (
                              <Input
                                value={editValues.tipoSanguineo || ""}
                                onChange={(e) =>
                                  setEditValues({
                                    ...editValues,
                                    tipoSanguineo: e.target.value,
                                  })
                                }
                                className="border-red-100 focus-visible:ring-red-700"
                              />
                            ) : (
                              <span className="rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
                                {doador.tipoSanguineo}
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            {editingId === doador.id ? (
                              <Input
                                type="date"
                                value={editValues.dataUltimaDoacao || ""}
                                onChange={(e) =>
                                  setEditValues({
                                    ...editValues,
                                    dataUltimaDoacao: e.target.value,
                                  })
                                }
                                className="border-red-100 focus-visible:ring-red-700"
                              />
                            ) : (
                              new Date(doador.dataUltimaDoacao).toLocaleDateString()
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              {editingId === doador.id ? (
                                <>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => salvarEdicao(doador.id)}
                                    className="h-8 w-8 text-green-600 hover:bg-green-50 hover:text-green-700"
                                  >
                                    <Save className="h-4 w-4" />
                                    <span className="sr-only">Salvar</span>
                                  </Button>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={cancelarEdicao}
                                    className="h-8 w-8 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                  >
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Cancelar</span>
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => iniciarEdicao(doador)}
                                    className="h-8 w-8 text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                                  >
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Editar</span>
                                  </Button>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Excluir</span>
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="border-red-100">
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Tem certeza que deseja excluir este doador? Esta ação não pode ser desfeita.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel className="border-red-100 hover:bg-red-50 hover:text-red-700">
                                          Cancelar
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                          className="bg-red-700 hover:bg-red-800"
                                          onClick={() => excluirDoador(doador.id)}
                                        >
                                          Excluir
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
