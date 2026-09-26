"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

type Props = { date: Date | undefined; setDate: (d: Date | undefined) => void }

export function SidePanel({ date, setDate }: Props) {
  return (
    <div className="space-y-6">
      <Card className="rounded-[24px] p-6 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl">
        <Calendar mode="single" selected={date} onSelect={setDate} className="w-full" />
      </Card>
      <Card className="rounded-[24px] p-6 bg-gradient-to-br from-violet-600 to-indigo-700 text-white border-0">
        <h3 className="font-bold text-lg">Você é Pro, Vitor.</h3>
        <p className="text-violet-200 text-sm mt-1">Design de startup gringa. A banca vai pirar.</p>
        <Button className="mt-4 w-full rounded-full bg-white text-black hover:bg-white/90">Exportar para Banca</Button>
      </Card>
    </div>
  )
}