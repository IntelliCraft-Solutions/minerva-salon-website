"use client"

import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { User, Phone, Mail, MessageSquare, Loader2, Clock } from "lucide-react"
import { toast } from "sonner"

interface Service {
  id: string
  slug: string
  name: string
  description?: string
  durationMinutes: number
  price?: number
}

interface TimeSlot {
  time: string
  available: boolean
}

export default function BookingCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    notes: "",
  })

  // Fetch services on mount
  useEffect(() => {
    fetchServices()
  }, [])

  // Fetch time slots when service and date are selected
  useEffect(() => {
    if (selectedService && date) {
      fetchTimeSlots()
    }
  }, [selectedService, date])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      const data = await response.json()
      
      // Use API services or fallback to default services
      const servicesList = data.services && data.services.length > 0 ? data.services : [
        { id: '1', slug: 'haircut', name: 'Haircut', description: 'Professional haircut and styling', durationMinutes: 60, price: 50 },
        { id: '2', slug: 'coloring', name: 'Hair Coloring', description: 'Full hair coloring service', durationMinutes: 120, price: 120 },
        { id: '3', slug: 'facial', name: 'Facial Treatment', description: 'Rejuvenating facial treatment', durationMinutes: 90, price: 80 },
        { id: '4', slug: 'manicure', name: 'Manicure', description: 'Complete nail care and polish', durationMinutes: 45, price: 35 },
      ]
      
      setServices(servicesList)
      if (servicesList.length > 0) {
        setSelectedService(servicesList[0])
      }
    } catch (error) {
      console.error('Failed to fetch services:', error)
      // Set fallback services on error
      const fallbackServices = [
        { id: '1', slug: 'haircut', name: 'Haircut', description: 'Professional haircut and styling', durationMinutes: 60, price: 50 },
        { id: '2', slug: 'coloring', name: 'Hair Coloring', description: 'Full hair coloring service', durationMinutes: 120, price: 120 },
        { id: '3', slug: 'facial', name: 'Facial Treatment', description: 'Rejuvenating facial treatment', durationMinutes: 90, price: 80 },
        { id: '4', slug: 'manicure', name: 'Manicure', description: 'Complete nail care and polish', durationMinutes: 45, price: 35 },
      ]
      setServices(fallbackServices)
      setSelectedService(fallbackServices[0])
    }
  }

  const fetchTimeSlots = async () => {
    if (!selectedService || !date) return
    
    setLoadingSlots(true)
    setSelectedTime("")
    
    try {
      const dateStr = date.toISOString().split('T')[0]
      const response = await fetch(`/api/availability?date=${dateStr}&service=${selectedService.slug}`)
      const data = await response.json()
      
      if (response.ok && data.slots && data.slots.length > 0) {
        setTimeSlots(data.slots)
      } else {
        // Fallback time slots
        const fallbackSlots = [
          { time: '09:00', available: true },
          { time: '10:00', available: true },
          { time: '11:00', available: true },
          { time: '12:00', available: true },
          { time: '13:00', available: true },
          { time: '14:00', available: true },
          { time: '15:00', available: true },
          { time: '16:00', available: true },
          { time: '17:00', available: true },
          { time: '18:00', available: true },
          { time: '19:00', available: true },
          { time: '20:00', available: true },
        ]
        setTimeSlots(fallbackSlots)
      }
    } catch (error) {
      console.error('Failed to fetch time slots:', error)
      // Fallback time slots on error
      const fallbackSlots = [
        { time: '09:00', available: true },
        { time: '10:00', available: true },
        { time: '11:00', available: true },
        { time: '12:00', available: true },
        { time: '13:00', available: true },
        { time: '14:00', available: true },
        { time: '15:00', available: true },
        { time: '16:00', available: true },
        { time: '17:00', available: true },
        { time: '18:00', available: true },
        { time: '19:00', available: true },
        { time: '20:00', available: true },
      ]
      setTimeSlots(fallbackSlots)
    } finally {
      setLoadingSlots(false)
    }
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    const period = hours >= 12 ? 'PM' : 'AM'
    const displayHours = hours % 12 || 12
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
  }

  const workingHours = [
    { day: "Monday - Friday", hours: "08AM - 9PM" },
    { day: "Saturday", hours: "08AM - 9PM" },
    { day: "Sunday", hours: "Closed" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedService || !date || !selectedTime) {
      toast.error('Please select a service, date, and time')
      return
    }
    
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email) {
      toast.error('Please fill in all required fields')
      return
    }
    
    setLoading(true)
    
    try {
      const dateStr = date.toISOString().split('T')[0]
      
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: selectedService.slug,
          date: dateStr,
          time: selectedTime,
          duration: selectedService.durationMinutes,
          customer: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            email: formData.email,
          },
          notes: formData.notes,
          source: 'hero',
        }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        toast.success('Appointment booked successfully!')
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          notes: "",
        })
        setSelectedTime("")
        setDate(new Date())
      } else if (response.status === 409) {
        toast.error(data.error || 'This time slot is no longer available')
        fetchTimeSlots()
      } else {
        toast.error(data.error || 'Failed to book appointment. Please try again.')
      }
    } catch (error) {
      console.error('Booking error:', error)
      toast.error('Failed to book appointment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center">Choose from calendar</h3>
      
      {/* Service Selection and Time Slots Row */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Service Selection */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl lg:rounded-3xl p-4 lg:p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-2 lg:gap-3 mb-4">
            <div className="bg-primary/10 rounded-full p-2 lg:p-3">
              <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
            </div>
            <h4 className="text-lg lg:text-xl font-bold">Select Service</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {services.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => setSelectedService(service)}
                className={`text-left p-3 lg:p-4 rounded-xl lg:rounded-2xl border-2 transition-all ${
                  selectedService?.id === service.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h5 className="font-semibold text-sm lg:text-base mb-1">{service.name}</h5>
                <p className="text-xs lg:text-sm text-muted-foreground mb-2 line-clamp-2">{service.description}</p>
                <div className="flex items-center justify-between text-xs lg:text-sm">
                  <span className="text-muted-foreground">{service.durationMinutes} min</span>
                  {service.price && <span className="font-semibold">${service.price}</span>}
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Time Slots */}
        <AnimatePresence>
          {date && selectedService && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl lg:rounded-3xl p-4 lg:p-6 shadow-sm border border-gray-100"
            >
              <h4 className="text-lg lg:text-xl font-bold mb-4">Available Times</h4>
              
              {loadingSlots ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 lg:w-8 lg:h-8 animate-spin text-primary" />
                </div>
              ) : timeSlots.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm lg:text-base">
                  <p>No available time slots for this date.</p>
                  <p className="text-xs lg:text-sm mt-2">Please select another date.</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`py-2 lg:py-3 px-2 lg:px-4 rounded-lg lg:rounded-xl text-xs lg:text-sm font-medium transition-all ${
                        !slot.available
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : selectedTime === slot.time
                          ? 'bg-primary text-white'
                          : 'bg-gray-50 hover:bg-gray-100 text-foreground'
                      }`}
                    >
                      {formatTime(slot.time)}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Calendar and Form Row */}
      <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 items-start">
        {/* Calendar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
        
        {/* Calendar Card with Stylist Image */}
        <div className="bg-[#E8DDD0] rounded-2xl lg:rounded-3xl p-3 lg:p-6 shadow-sm">
          <div className="bg-white rounded-xl lg:rounded-2xl p-3 lg:p-6 flex flex-col md:flex-row gap-3 lg:gap-4">
            {/* Stylist Image - Left Column */}
            <div className="relative w-full md:w-[180px] lg:w-[220px] h-[240px] md:h-auto md:min-h-[320px] rounded-xl lg:rounded-2xl overflow-hidden flex-shrink-0">
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
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                className="border-0 w-full mx-auto"
                classNames={{
                  months: "flex flex-col space-y-4 w-full",
                  month: "space-y-4 w-full px-2 sm:px-6 lg:px-12",
                  caption: "flex justify-center pt-1 relative items-center mb-4",
                  caption_label: "text-base lg:text-lg font-bold",
                  nav: "flex items-center",
                  nav_button: "h-7 w-7 lg:h-8 lg:w-8 bg-transparent p-0 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center",
                  nav_button_previous: "absolute left-0 top-0",
                  nav_button_next: "absolute right-0 top-0",
                  table: "w-full border-collapse mx-auto",
                  head_row: "flex w-full mb-2",
                  head_cell: "text-foreground/60 rounded-md font-medium text-xs flex-1 text-center",
                  row: "flex w-full mt-1",
                  cell: "relative p-0.5 text-center text-sm focus-within:relative focus-within:z-20 flex-1 flex items-center justify-center",
                  day: "h-8 w-8 lg:h-9 lg:w-9 p-0 font-normal hover:bg-gray-50 rounded-lg transition-all text-xs lg:text-sm flex items-center justify-center",
                  day_selected: "bg-[#A94442] text-white hover:bg-[#A94442] hover:text-white focus:bg-[#A94442] focus:text-white rounded-lg font-semibold",
                  day_today: "bg-gray-100 text-foreground rounded-lg font-medium",
                  day_outside: "text-muted-foreground opacity-30",
                  day_disabled: "text-muted-foreground opacity-20 cursor-not-allowed",
                  day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                  day_hidden: "invisible",
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Working Hours */}
        <div className="space-y-3 lg:space-y-4">
          <h4 className="text-lg lg:text-xl font-bold">Working Hours</h4>
          <div className="space-y-2 lg:space-y-3">
            {workingHours.map((item, index) => (
              <div key={index} className="flex justify-between text-sm lg:text-base py-1.5 lg:py-2">
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
        className="bg-[#2A1810] rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Your Details</h3>
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <Label htmlFor="firstName" className="text-white/80 mb-2 flex items-center gap-2 text-sm">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                First Name *
              </Label>
              <Input
                id="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="bg-[#3A2A1F] border-[#5D4A3A] text-white placeholder:text-white/50 rounded-xl h-11 sm:h-12 text-sm sm:text-base"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="lastName" className="text-white/80 mb-2 flex items-center gap-2 text-sm">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Last Name *
              </Label>
              <Input
                id="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="bg-[#3A2A1F] border-[#5D4A3A] text-white placeholder:text-white/50 rounded-xl h-11 sm:h-12 text-sm sm:text-base"
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="phone" className="text-white/80 mb-2 flex items-center gap-2 text-sm">
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
              className="bg-[#3A2A1F] border-[#5D4A3A] text-white placeholder:text-white/50 rounded-xl h-11 sm:h-12 text-sm sm:text-base"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="text-white/80 mb-2 flex items-center gap-2 text-sm">
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-[#3A2A1F] border-[#5D4A3A] text-white placeholder:text-white/50 rounded-xl h-11 sm:h-12 text-sm sm:text-base"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="notes" className="text-white/80 mb-2 flex items-center gap-2 text-sm">
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Any special requests or preferences..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="bg-[#3A2A1F] border-[#5D4A3A] text-white placeholder:text-white/50 rounded-xl min-h-[80px] sm:min-h-[100px] resize-none text-sm sm:text-base"
            />
          </div>
          
          <Button
            type="submit"
            disabled={loading || !selectedService || !date || !selectedTime}
            className="w-full bg-white text-[#2A1810] hover:bg-white/90 rounded-full h-12 sm:h-14 font-semibold text-base sm:text-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin mr-2" />
                Booking...
              </>
            ) : (
              'Book Appointment'
            )}
          </Button>
          
          <p className="text-white/60 text-xs sm:text-sm text-center mt-2">
            We'll call you to confirm your appointment
          </p>
        </form>
      </motion.div>
      </div>
    </div>
  )
}
