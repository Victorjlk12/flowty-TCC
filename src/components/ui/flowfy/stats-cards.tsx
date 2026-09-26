import { Card } from "@/components/ui/card"
import { Clock, DollarSign, TrendingUp } from "lucide-react"

export function StatsCards() {
  return (
    <div className="grid grid-cols-3 gap-2 p-2">
      <Card className="rounded-[16px] bg-zinc-900 dark:bg-zinc-800 text-white p-5 border-0">
        <div className="flex gap-2 text-zinc-400 text-xs mb-3"><DollarSign className="w-4 h-4"/> FATURAMENTO</div>
        <div className="text-3xl font-bold">R$ 12.4k</div>
        <div className="text-xs text-green-400 flex gap-1 mt-1"><TrendingUp className="w-3 h-3"/>+18% esse mês</div>
      </Card>
      <Card className="rounded-[16px] bg-violet-600 text-white p-5 border-0">
        <div className="flex gap-2 text-violet-200 text-xs mb-3"><Clock className="w-4 h-4"/> HORAS</div>
        <div className="text-3xl font-bold">86h</div>
        <div className="text-xs text-violet-200 mt-1">de trabalho</div>
      </Card>
      <Card className="rounded-[16px] bg-zinc-100 dark:bg-zinc-800 p-5 border-0">
        <div className="text-xs text-zinc-500 mb-3">OCUPAÇÃO</div>
        <div className="text-3xl font-bold">94%</div>
        <div className="w-full h-1 bg-zinc-200 dark:bg-zinc-700 rounded-full mt-3"><div className="h-full w-[94%] bg-zinc-900 dark:bg-white rounded-full"/></div>
      </Card>
    </div>
  )
}