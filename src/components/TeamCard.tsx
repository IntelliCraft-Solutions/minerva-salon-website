"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface TeamCardProps {
  name: string
  role: string
  image: string
  delay?: number
}

export default function TeamCard({ name, role, image, delay = 0 }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-[#E8DDD0] mb-4">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="text-center">
        <h3 className="font-bold text-xl mb-1">{name}</h3>
        <p className="text-muted-foreground">{role}</p>
      </div>
    </motion.div>
  )
}
