"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navigation() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Salon", href: "#services" },
    { name: "Blog", href: "#blog" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#6B5344]/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="text-xl lg:text-2xl font-bold tracking-wider text-white">
            MINERVA
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white/90 hover:text-white transition-colors text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              className="hidden lg:flex bg-white text-[#6B5344] hover:bg-white/90 border-white rounded-full px-6"
            >
              Contact Us
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#6B5344] text-white border-l-0">
                <div className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-white/90 hover:text-white transition-colors text-lg font-medium"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Button 
                    variant="outline" 
                    className="bg-white text-[#6B5344] hover:bg-white/90 border-white rounded-full mt-4"
                  >
                    Contact Us
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
