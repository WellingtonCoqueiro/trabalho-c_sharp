import { Droplets } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
        <div className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-red-700" />
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Banco de Doação de Sangue</p>
        </div>
        <div className="flex gap-4">
          <a href="#" className="text-sm text-muted-foreground hover:text-red-700">
            Política de Privacidade
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-red-700">
            Termos de Uso
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-red-700">
            Contato
          </a>
        </div>
      </div>
    </footer>
  )
}
