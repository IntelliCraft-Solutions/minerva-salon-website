"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2, Mail, MessageSquare, Phone, User, Tags } from "lucide-react"

const inquiryCategories = [
  { value: "services", label: "Need Salon Services" },
  { value: "careers", label: "Want to Join the Team" },
  { value: "partnership", label: "Collaboration / Partnership" },
  { value: "feedback", label: "Feedback or Concern" },
  { value: "other", label: "Something Else" },
]

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "services",
    message: "",
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error("Please fill in all required fields")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || "Failed to send message")
      }

      toast.success("Message sent! We'll get back to you shortly.")
      setFormData({
        name: "",
        email: "",
        phone: "",
        category: "services",
        message: "",
      })
    } catch (error: any) {
      console.error("Contact form submission failed:", error)
      toast.error(error?.message || "Failed to send message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-[#2A1810] rounded-3xl p-6 lg:p-10 shadow-xl text-white"
    >
      <div className="mb-8">
        <span className="inline-flex items-center px-4 py-1 rounded-full bg-white/10 text-sm uppercase tracking-widest text-white/80">
          Drop Us a Line
        </span>
        <h2 className="text-3xl lg:text-4xl font-bold mt-4">Send us a message</h2>
        <p className="text-white/70 mt-3 text-base lg:text-lg">
          Tell us how we can help and our concierge will reply within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2 text-white/80">
              <User className="h-4 w-4" /> Full Name *
            </Label>
            <Input
              id="name"
              placeholder="Jane Doe"
              value={formData.name}
              onChange={(event) => setFormData({ ...formData, name: event.target.value })}
              className="bg-[#3A2A1F] border-[#5D4A3A] text-white placeholder:text-white/50 rounded-xl h-12"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2 text-white/80">
              <Mail className="h-4 w-4" /> Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              className="bg-[#3A2A1F] border-[#5D4A3A] text-white placeholder:text-white/50 rounded-xl h-12"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2 text-white/80">
              <Phone className="h-4 w-4" /> Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              maxLength={13}
              placeholder="9876543210"
              value={formData.phone}
              onChange={(event) => {
                const numeric = event.target.value.replace(/\D/g, "").slice(0, 13)
                setFormData({ ...formData, phone: numeric })
              }}
              className="bg-[#3A2A1F] border-[#5D4A3A] text-white placeholder:text-white/50 rounded-xl h-12"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="flex items-center gap-2 text-white/80">
              <Tags className="h-4 w-4" /> Inquiry Category *
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger className="bg-[#3A2A1F] border-[#5D4A3A] text-white rounded-xl h-12">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent className="bg-[#3A2A1F] text-white border-[#5D4A3A]">
                {inquiryCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="flex items-center gap-2 text-white/80">
            <MessageSquare className="h-4 w-4" /> Message *
          </Label>
          <Textarea
            id="message"
            placeholder="Share a few details..."
            value={formData.message}
            onChange={(event) => setFormData({ ...formData, message: event.target.value })}
            className="bg-[#3A2A1F] border-[#5D4A3A] text-white placeholder:text-white/50 rounded-2xl min-h-[160px] resize-none"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-8 h-12 rounded-full bg-white text-[#2A1810] hover:bg-white/90 font-semibold text-lg flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </motion.div>
  )
}
