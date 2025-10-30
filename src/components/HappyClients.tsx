"use client"

import { useState } from "react"
import Image from "next/image"

interface Client {
  name: string
  image: string
}

interface HappyClientsProps {
  clients: Client[]
}

export default function HappyClients({ clients }: HappyClientsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="happy-clients" aria-label="Happy clients">
      <ul className="avatar-list" role="list">
        {clients.slice(0, 3).map((client, index) => (
          <li
            key={index}
            className="avatar"
            data-name={client.name}
            role="listitem"
            tabIndex={0}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onFocus={() => setHoveredIndex(index)}
            onBlur={() => setHoveredIndex(null)}
          >
            <Image
              src={client.image}
              alt={client.name}
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
            {hoveredIndex === index && (
              <div className="tooltip" role="tooltip">
                {client.name}
              </div>
            )}
          </li>
        ))}
        {clients.length > 3 && (
          <li className="avatar more" role="listitem">
            +{clients.length - 3}
          </li>
        )}
      </ul>
    </div>
  )
}
