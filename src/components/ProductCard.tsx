"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

interface ProductCardProps {
  name: string
  price: number
  image: string
  isFavorite?: boolean
}

export default function ProductCard({ name, price, image, isFavorite = false }: ProductCardProps) {
  const [favorite, setFavorite] = useState(isFavorite)

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group relative"
    >
      <div className="aspect-square bg-[#F5EFE7] relative overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-8 group-hover:scale-110 transition-transform duration-500"
        />
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setFavorite(!favorite)}
          className="absolute top-4 right-4 rounded-full bg-white/90 hover:bg-white shadow-sm"
        >
          <Heart className={`h-4 w-4 ${favorite ? "fill-primary text-primary" : "text-gray-600"}`} />
        </Button>
      </div>
      <div className="p-6">
        <h3 className="font-medium text-lg mb-2">{name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">${price}</span>
          <Button
            size="icon"
            className="rounded-full bg-[#2A1810] hover:bg-[#3A2A1F] shadow-md"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
