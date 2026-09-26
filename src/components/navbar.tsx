"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Início" },
    { href: "/flowfy", label: "Kanban" },
    { href: "/agendar", label: "Agendamento" },
  ]

  return (
    <nav className="flex items-center gap-1.5 bg-white/80 dark:bg-zinc-900/80 p-1.5 rounded-full border border-zinc-200 dark:border-white/10 backdrop-blur-md shadow-sm">
      {links.map((link) => {
        const isActive = pathname === link.href
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              isActive
                ? "bg-zinc-900 dark:bg-white text-white dark:text-black shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}