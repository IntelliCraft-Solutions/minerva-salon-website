"use client"

import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { User, Phone, Mail, MessageSquare, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function BookingCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    notes: "",
  })

  const workingHours = [
    { day: "Monday - Friday", hours: "08AM - 9PM" },
    { day: "Saturday", hours: "08AM - 9PM" },
    { day: "Sunday", hours: "Closed" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!date) {
      toast.error('Please select a date')
      return
    }
    
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email) {
      toast.error('Please fill in all required fields')
      return
    }
    
    setLoading(true)
    
    try {
      const dateStr = date.toISOString().split('T')[0]
      
      // Create appointment without specific time - will be confirmed by salon
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: 'haircut', // Default service for hero form
          date: dateStr,
          time: '10:00', // Default time - will be confirmed
          duration: 60,
          customer: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            email: formData.email,
          },
          notes: formData.notes || 'Requested via homepage - please call to confirm service and time',
          source: 'hero',
        }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        toast.success('Request submitted! We\'ll call you to confirm your appointment.')
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          notes: "",
        })
        setDate(new Date())
      } else {
        toast.error(data.error || 'Failed to submit request. Please try again.')
      }
    } catch (error) {
      console.error('Booking error:', error)
      toast.error('Failed to submit request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
      {/* Calendar Section */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <h3 className="text-2xl lg:text-3xl font-bold text-center">Choose from calendar</h3>
        
        {/* Calendar Card with Stylist Image */}
        <div className="bg-[#E8DDD0] rounded-3xl p-4 lg:p-6 shadow-sm">
          <div className="bg-white rounded-2xl p-4 lg:p-6 flex flex-col md:flex-row gap-4">
            {/* Stylist Image - Left Column */}
            <div className="relative w-full md:w-[200px] lg:w-[220px] h-[280px] md:h-auto md:min-h-[320px] rounded-2xl overflow-hidden flex-shrink-0">
              <Image
                src="/stylist.png"
                alt="Professional Stylist"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
            
            {/* Calendar - Right Column */}
            <div className="flex-1 flex items-center justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="border-0 w-full mx-auto"
                classNames={{
                  months: "flex flex-col space-y-4 w-full",
                  month: "space-y-4 w-full px-10 lg:px-12",
                  caption: "flex justify-center pt-1 relative items-center mb-4",
                  caption_label: "text-lg font-bold",
                  nav: "flex items-center",
                  nav_button: "h-8 w-8 bg-transparent p-0 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center",
                  nav_button_previous: "absolute left-0 top-0",
                  nav_button_next: "absolute right-0 top-0",
                  table: "w-full border-collapse mx-auto",
                  head_row: "flex w-full mb-2",
                  head_cell: "text-foreground/60 rounded-md font-medium text-xs flex-1 text-center",
                  row: "flex w-full mt-1",
                  cell: "relative p-0.5 text-center text-sm focus-within:relative focus-within:z-20 flex-1 flex items-center justify-center",
                  day: "h-9 w-9 p-0 font-normal hover:bg-gray-50 rounded-lg transition-all text-sm flex items-center justify-center",
                  day_selected: "bg-[#A94442] text-white hover:bg-[#A94442] hover:text-white focus:bg-[#A94442] focus:text-white rounded-lg font-semibold",
                  day_today: "bg-gray-100 text-foreground rounded-lg font-medium",
                  day_outside: "text-muted-foreground opacity-30",
                  day_disabled: "text-muted-foreground opacity-20",
                  day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                  day_hidden: "invisible",
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Working Hours */}
        <div className="space-y-4">
          <h4 className="text-xl font-bold">Working Hours</h4>
          <div className="space-y-3">
            {workingHours.map((item, index) => (
              <div key={index} className="flex justify-between text-base py-2">
                <span className="text-foreground/70">{item.day}</span>
                <span className="font-semibold">{item.hours}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Your Details Form */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#2A1810] rounded-3xl p-6 lg:p-8 shadow-lg flex flex-col justify-center"
      >
        <h3 className="text-2xl font-bold text-white mb-6">Your Details</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="firstName" className="text-white/80 mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              First Name *
            </Label>
            <Input
              id="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="bg-[#3A2A1F] border-[#5D4A3A] text-white placeholder:text-white/50 rounded-xl h-12"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="lastName" className="text-white/80 mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              Last Name *
            </Label>
            <Input
              id="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="bg-[#3A2A1F] border-[#5D4A3A] text-white placeholder:text-white/50 rounded-xl h-12"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone" className="text-white/80 mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone *
            </Label>
            <Input
              id="phone"
              type="tel"
              maxLength={13}
              placeholder="+1 (555) 555-5555"
              value={formData.phone}
              onChange={(e) => {
                const numeric = e.target.value.replace(/\D/g, '').slice(0, 13)
                setFormData({ ...formData, phone: numeric })
              }}
              className="bg-[#3A2A1F] border-[#5D4A3A] text-white placeholder:text-white/50 rounded-xl h-12"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="text-white/80 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-[#3A2A1F] border-[#5D4A3A] text-white placeholder:text-white/50 rounded-xl h-12"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="notes" className="text-white/80 mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Any special requests or preferences..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="bg-[#3A2A1F] border-[#5D4A3A] text-white placeholder:text-white/50 rounded-xl min-h-[100px] resize-none"
            />
          </div>
          
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-[#2A1810] hover:bg-white/90 rounded-full h-14 font-semibold text-lg mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              'Book Appointment'
            )}
          </Button>
          
          <p className="text-white/60 text-xs text-center mt-4">
            We'll call you to confirm your appointment
          </p>
        </form>
      </motion.div>
    </div>
  )
}
