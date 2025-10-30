"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { ContactForm } from "@/components/ContactForm"
import { Button } from "@/components/ui/button"
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  User,
} from "lucide-react"

const SALON_PHONE_PRIMARY = "+91 98765 43210"
const SALON_PHONE_SECONDARY = "+91 91234 56789"
const SALON_EMAIL = "intellicraft.solutions25@gmail.com"
const SALON_ADDRESS = "Level 2, Phoenix Marketcity Mall, Kurla West, Mumbai, MH 400070"
const SALON_INCHARGE = "Ananya Sharma"
const WHATSAPP_NUMBER = "919876543210"
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi MINERVA Salon team! I'd love to connect."
)}`

const contactHighlights = [
  {
    title: "Call Us",
    description: "Speak directly with our salon concierge team.",
    icon: Phone,
    items: [SALON_PHONE_PRIMARY, SALON_PHONE_SECONDARY],
  },
  {
    title: "Email",
    description: "Share detailed requests, collaborations, or feedback.",
    icon: Mail,
    items: [SALON_EMAIL],
  },
  {
    title: "Salon In-charge",
    description: "Your point of contact for premium experiences and partnerships.",
    icon: User,
    items: [SALON_INCHARGE, "Guest Experience Lead"],
  },
  {
    title: "Hours",
    description: "We are open daily for appointments and walk-ins.",
    icon: Clock,
    items: ["Mon - Sat: 08:00 AM – 09:00 PM", "Sunday: 10:00 AM – 06:00 PM"],
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative min-h-[65vh] bg-[#6B5344] overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 pt-32 lg:pt-40 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight">
              Let’s create your next salon story
            </h1>
            <p className="mt-6 text-lg lg:text-2xl text-white/90 leading-relaxed max-w-2xl">
              Whether you’re booking a luxury service, exploring partnerships, or ready to join the MINERVA family, our concierge team is here for you.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href={`tel:${SALON_PHONE_PRIMARY.replace(/\s+/g, "")}`}>
                <Button className="rounded-full bg-white text-[#2A1810] hover:bg-white/90 px-6 h-12 font-semibold flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Call Concierge
                </Button>
              </Link>
              <Link href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                <Button variant="outline" className="rounded-full border-white text-white hover:bg-white/10 px-6 h-12 font-semibold flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-6"
            >
              <span className="inline-flex items-center px-4 py-1 rounded-full bg-[#F5EFE7] text-[#6B5344] text-xs font-semibold tracking-[0.25em] uppercase">
                Connect with us
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#2A1810] leading-tight">
                Tailored assistance for every MINERVA guest
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                From bespoke styling consultations to career opportunities, our dedicated team personally responds to each enquiry. Reach out through the channel that suits you best.
              </p>

              <div className="grid gap-4">
                {contactHighlights.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-3xl bg-white shadow-sm border border-black/5 p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1 rounded-2xl bg-[#F5EFE7] p-3 text-[#6B5344]">
                        <card.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[#2A1810]">
                          {card.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {card.description}
                        </p>
                        <ul className="space-y-1 text-base text-[#2A1810] font-medium">
                          {card.items.map((item) => (
                            <li key={item}>
                              {card.title === "Email" ? (
                                <Link
                                  href={`mailto:${item}`}
                                  className="hover:underline decoration-[#6B5344]"
                                >
                                  {item}
                                </Link>
                              ) : card.title === "Call Us" ? (
                                <Link
                                  href={`tel:${item.replace(/\s+/g, "")}`}
                                  className="hover:underline decoration-[#6B5344]"
                                >
                                  {item}
                                </Link>
                              ) : (
                                item
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="inline-flex">
                <Button className="rounded-full bg-[#2A1810] hover:bg-[#2A1810]/90 text-white px-6 h-12 font-semibold flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" /> Chat with salon concierge
                </Button>
              </Link>
            </motion.div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2A1810]">
                Visit our flagship salon in Mumbai
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Nestled within Phoenix Marketcity, our salon features private styling lounges, a colour artistry bar, and a relaxation suite. Drop by to experience the signature MINERVA hospitality.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#6B5344] mt-1" />
                  <div>
                    <p className="font-semibold text-[#2A1810]">Salon Address</p>
                    <p className="text-muted-foreground">{SALON_ADDRESS}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-[#6B5344] mt-1" />
                  <div>
                    <p className="font-semibold text-[#2A1810]">WhatsApp Concierge</p>
                    <Link
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#6B5344] font-medium hover:underline"
                    >
                      +91 98765 43210
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl overflow-hidden shadow-lg border border-black/5 h-[400px] lg:h-[460px]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.016358072149!2d72.88891551135025!3d19.08671958209486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6248c0aa0a9%3A0x35171a0b91028304!2sPhoenix%20Marketcity!5e0!3m2!1sen!2sin!4v1730140000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                allowFullScreen
                loading="lazy"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
                title="MINERVA Salon Location"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
