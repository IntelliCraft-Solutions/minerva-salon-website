"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribe:", email)
    setEmail("")
  }

  return (
    <footer className="bg-[#2A1810] text-white">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Map Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
            <div className="bg-[#3A2A1F] rounded-2xl overflow-hidden h-64 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2176616689773!2d-73.98784492346716!3d40.748817371416895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            
            <div className="space-y-3 pt-4">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">(123) 456-7890</p>
                  <p className="text-sm text-white/70">Mon - Fri: 9AM - 8PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <p className="font-medium">hello@minerva.salon</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <p className="font-medium">350 5th Ave, New York, NY 10118</p>
              </div>
            </div>
          </div>

          {/* Newsletter & Links */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Subscribe to the newsletter</h3>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#3A2A1F] border-[#5D4A3A] text-white placeholder:text-white/50 rounded-full flex-1"
                  required
                />
                <Button type="submit" className="bg-primary hover:bg-primary/90 rounded-full px-8">
                  Subscribe
                </Button>
              </form>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4">Visit Us</h4>
              <p className="text-white/70 mb-4">
                We are here to ensure you get the best service at MINERVA
              </p>
              <div className="flex gap-3">
                <Button size="icon" variant="ghost" className="rounded-full bg-[#3A2A1F] hover:bg-primary">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full bg-[#3A2A1F] hover:bg-primary">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full bg-[#3A2A1F] hover:bg-primary">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full bg-[#3A2A1F] hover:bg-primary">
                  <Youtube className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-2xl font-bold tracking-wider">MINERVA</div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70">
            <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <p className="text-sm text-white/70">
            Copyright © MINERVA. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
