"use client"
import { FlowCard } from "./flow-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function FlowBoard() {
  return (
    <div className="min-h-screen bg-[#050507] p-10">
      <div className="flex justify-between items-center mb-10 max-w-[1600px] mx-auto">
        <h1 className="text-4xl font-black text-white tracking-tighter">Flowfy • Kanban 3D</h1>
        <Link href="/"><Button className="rounded-full bg-white text-black">Voltar pro Dashboard</Button></Link>
      </div>

      <div className="grid grid-cols-3 gap-6 max-w-[1600px] mx-auto">
        <div className="rounded-[32px] bg-white/[0.03] border border-white/[0.05] p-6">
          <h2 className="text-white/60 font-bold mb-6">A Fazer</h2>
          <div className="flex flex-col gap-4">
            <FlowCard id="1" title="Criar design 3D" />
            <FlowCard id="2" title="Implementar drag" />
          </div>
        </div>
        <div className="rounded-[32px] bg-white/[0.03] border border-white/[0.05] p-6">
          <h2 className="text-white/60 font-bold mb-6">Fazendo</h2>
          <FlowCard id="3" title="Apresentar TCC" />
        </div>
        <div className="rounded-[32px] bg-white/[0.03] border border-white/[0.05] p-6">
          <h2 className="text-white/60 font-bold mb-6">Feito</h2>
          <FlowCard id="4" title="Deploy final" />
        </div>
      </div>
    </div>
  )
}