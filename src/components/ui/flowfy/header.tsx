"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Zap } from "lucide-react"
import { useTheme } from "next-themes"

export function Header() {
  const { theme, setTheme } = useTheme()
  return (
    <header className="flex justify-between items-center py-5 px-8 rounded-[20px] border bg-white/70 dark:bg-zinc-900/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">flowfy</span>
        <Badge className="ml-2 bg-violet-600">TCC 2026</Badge>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark"? "light" : "dark")} className="rounded-full">
          <Sun className="h-5 w-5 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
        </Button>
        <Button className="rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black px-6">Novo Agendamento</Button>
      </div>
    </header>
  )
}