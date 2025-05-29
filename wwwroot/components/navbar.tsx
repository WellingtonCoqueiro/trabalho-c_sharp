"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Droplets } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Droplets className="h-6 w-6 text-red-700" />
            <span className="hidden font-bold text-red-700 sm:inline-block">Doação de Sangue</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end md:justify-end">
          <nav className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-red-700">
              Home
            </Link>
            <Link href="/doadores" className="text-sm font-medium transition-colors hover:text-red-700">
              Doadores
            </Link>
            <Link href="/requisitos" className="text-sm font-medium transition-colors hover:text-red-700">
              Requisitos
            </Link>
          </nav>
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Abrir menu</span>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="container pb-4 md:hidden">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/"
              className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/doadores"
              className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsOpen(false)}
            >
              Doadores
            </Link>
            <Link
              href="/requisitos"
              className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsOpen(false)}
            >
              Requisitos
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
