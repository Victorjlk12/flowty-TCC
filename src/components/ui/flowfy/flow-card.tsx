"use client"
import { motion, useMotionValue, useTransform } from "framer-motion"

interface Props {
  id: string
  title: string
}

export function FlowCard({ id, title }: Props) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [12, -12])
  const rotateY = useTransform(x, [-100, 100], [-12, 12])

  return (
    <motion.div
      style={{ x, y, rotateX, rotateY }}
      whileHover={{ scale: 1.02 }}
      className="w-full h-[140px] rounded-[20px] bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-5 shadow-2xl cursor-grab active:cursor-grabbing"
    >
      <h3 className="text-white font-bold text-sm">{title}</h3>
      <p className="text-white/40 text-xs mt-2">ID: {id} • Arraste</p>
      <div className="mt-6 h-1 w-full bg-white/10 rounded-full">
        <div className="h-1 w-1/2 bg-white rounded-full" />
      </div>
    </motion.div>
  )
}