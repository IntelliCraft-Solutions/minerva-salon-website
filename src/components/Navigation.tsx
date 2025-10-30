"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useEffect, useState } from "react"

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Booking", href: "/booking" },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
      scrolled ? "bg-[#6B5344]/95 backdrop-blur-sm border-b border-white/20" : "bg-transparent border-b border-transparent"
    }`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative flex items-center justify-between h-16 lg:h-20" style={{ padding: '24px 0' }}>
          {/* Left: Desktop Navigation */}
          <div className="hidden lg:flex items-center" style={{ gap: '48px', paddingLeft: '0' }}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white/90 hover:text-white transition-colors text-base font-medium"
                style={{ letterSpacing: '0.02em' }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Center: Brand */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 brand-wordmark text-white">
            MINERVA
          </Link>

          {/* Right: CTA + Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link href="/contact">
              <Button 
                variant="outline" 
                className="hidden lg:flex bg-white text-[#6B5344] hover:bg-white/90 border-white rounded-full px-6"
              >
                Contact Us
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#6B5344] text-white border-l-0 w-[280px] sm:w-[320px] z-[100] p-0">
                <div className="flex flex-col gap-6 mt-12 px-6 py-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-white hover:text-white/80 transition-colors text-xl font-medium"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link href="/contact">
                    <Button 
                      variant="outline" 
                      className="bg-white text-[#6B5344] hover:bg-white/90 border-white rounded-full mt-4 h-12 text-base font-semibold w-full"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
