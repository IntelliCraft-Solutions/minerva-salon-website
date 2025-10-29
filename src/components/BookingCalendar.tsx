"use client"

import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion } from "framer-motion"

export default function BookingCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  })

  const workingHours = [
    { day: "Monday - Friday", hours: "08AM - 9PM" },
    { day: "Saturday", hours: "08AM - 9PM" },
    { day: "Sunday", hours: "Closed" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Booking:", { date, ...formData })
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Calendar Section */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl p-6 shadow-lg"
      >
        <h3 className="text-xl font-bold mb-4">January 2024</h3>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-2xl border-0"
          classNames={{
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-lg font-semibold",
            nav: "space-x-1 flex items-center",
            nav_button: "h-9 w-9 bg-transparent p-0 opacity-50 hover:opacity-100 rounded-full hover:bg-muted",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell: "text-muted-foreground rounded-md w-full font-normal text-sm",
            row: "flex w-full mt-2",
            cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent",
            day: "h-12 w-full p-0 font-normal hover:bg-muted rounded-full transition-colors",
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-full",
            day_today: "bg-accent text-accent-foreground rounded-full",
            day_outside: "text-muted-foreground opacity-50",
            day_disabled: "text-muted-foreground opacity-50",
            day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
          }}
        />
        
        <div className="mt-6 space-y-3">
          <h4 className="font-bold text-lg">Working Hours</h4>
          {workingHours.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.day}</span>
              <span className="font-medium">{item.hours}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#2A1810] rounded-3xl p-8 shadow-lg"
      >
        <h3 className="text-2xl font-bold text-white mb-6">We will call you</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="bg-[#3A2A1F] border-[#5D4A3A] text-white placeholder:text-white/50 rounded-2xl h-12"
            required
          />
          <Input
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="bg-[#3A2A1F] border-[#5D4A3A] text-white placeholder:text-white/50 rounded-2xl h-12"
            required
          />
          <Input
            placeholder="Phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="bg-[#3A2A1F] border-[#5D4A3A] text-white placeholder:text-white/50 rounded-2xl h-12"
            required
          />
          <Input
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-[#3A2A1F] border-[#5D4A3A] text-white placeholder:text-white/50 rounded-2xl h-12"
            required
          />
          <Button
            type="submit"
            className="w-full bg-white text-[#2A1810] hover:bg-white/90 rounded-full h-12 font-semibold text-base"
          >
            Book Appointment
          </Button>
        </form>
      </motion.div>
    </div>
  )
}
