"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface ServiceCardProps {
  title: string
  image: string
  bgColor?: string
  delay?: number
}

export default function ServiceCard({ title, image, bgColor = "#A94442", delay = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group aspect-[3/4]"
      style={{ backgroundColor: bgColor }}
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>
      <div className="absolute top-6 left-6 bg-white px-6 py-2 rounded-full">
        <span className="font-semibold text-[#2A1810]">{title}</span>
      </div>
    </motion.div>
  )
}
