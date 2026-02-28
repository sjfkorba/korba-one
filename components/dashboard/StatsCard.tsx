"use client"

import { ReactNode } from "react"

export default function StatsCard({
  title,
  value,
  icon,
  trend,
}: {
  title: string
  value: number
  icon?: ReactNode
  trend?: string
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 shadow-lg border border-white/5 hover:scale-[1.02] transition duration-300">

      {/* Glow Effect */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl" />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white/50">{title}</p>
          <h3 className="text-2xl md:text-3xl font-black mt-2">
            {value}
          </h3>
          {trend && (
            <p className="text-xs text-green-400 mt-1">{trend}</p>
          )}
        </div>

        <div className="text-orange-500 text-2xl">
          {icon}
        </div>
      </div>
    </div>
  )
}