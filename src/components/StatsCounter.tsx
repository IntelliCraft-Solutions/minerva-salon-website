"use client"

import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useRef } from "react"

interface StatsCounterProps {
  value: number
  label: string
  suffix?: string
  delay?: number
}

export default function StatsCounter({ value, label, suffix = "", delay = 0 }: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 2000 })
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(value)
      }, delay)
    }
  }, [isInView, motionValue, value, delay])

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.floor(latest)}${suffix}`
      }
    })
  }, [springValue, suffix])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div ref={ref} className="text-4xl lg:text-5xl font-bold text-white mb-2">
        0{suffix}
      </div>
      <div className="text-white/80 text-sm lg:text-base">{label}</div>
    </motion.div>
  )
}
