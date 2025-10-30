"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Clock, Check, Loader2, Calendar as CalendarIcon, User, Mail, Phone, MessageSquare } from "lucide-react"
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

export default function BookingPage() {
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [bookingId, setBookingId] = useState("")
  
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
      setServices(data.services || [])
      if (data.services?.length > 0) {
        setSelectedService(data.services[0])
      }
    } catch (error) {
      console.error('Failed to fetch services:', error)
      toast.error('Failed to load services')
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
      
      if (response.ok) {
        setTimeSlots(data.slots || [])
      } else {
        toast.error(data.error || 'Failed to load time slots')
        setTimeSlots([])
      }
    } catch (error) {
      console.error('Failed to fetch time slots:', error)
      toast.error('Failed to load time slots')
      setTimeSlots([])
    } finally {
      setLoadingSlots(false)
    }
  }

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
          source: 'booking-page',
        }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setBookingSuccess(true)
        setBookingId(data.appointment.id)
        toast.success('Appointment booked successfully!')
        
        // Scroll to success message
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 100)
      } else if (response.status === 409) {
        toast.error(data.error || 'This time slot is no longer available')
        // Refresh time slots
        fetchTimeSlots()
      } else {
        toast.error(data.error || 'Failed to book appointment')
      }
    } catch (error) {
      console.error('Booking error:', error)
      toast.error('Failed to book appointment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    const period = hours >= 12 ? 'PM' : 'AM'
    const displayHours = hours % 12 || 12
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
  }

  const groupSlotsByPeriod = (slots: TimeSlot[]) => {
    const morning: TimeSlot[] = []
    const afternoon: TimeSlot[] = []
    const evening: TimeSlot[] = []
    
    slots.forEach(slot => {
      const hour = parseInt(slot.time.split(':')[0])
      if (hour < 12) morning.push(slot)
      else if (hour < 17) afternoon.push(slot)
      else evening.push(slot)
    })
    
    return { morning, afternoon, evening }
  }

  if (bookingSuccess) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-green-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Booking Confirmed!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your appointment has been successfully booked. We've sent a confirmation email to <strong>{formData.email}</strong>.
            </p>
            
            <div className="bg-[#F5EFE7] rounded-3xl p-8 mb-8 text-left">
              <h2 className="text-2xl font-bold mb-6">Appointment Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service:</span>
                  <span className="font-semibold">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-semibold">{date?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-semibold">{formatTime(selectedTime)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-semibold">{selectedService?.durationMinutes} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reference:</span>
                  <span className="font-semibold text-primary">{bookingId.slice(0, 8).toUpperCase()}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-[#FFF9F5] border-l-4 border-primary p-6 rounded-lg mb-8 text-left">
              <p className="text-sm">
                <strong>What's next?</strong><br />
                We will call you at <strong>{formData.phone}</strong> to confirm your appointment details. 
                If you need to cancel or reschedule, please call us at <strong>{process.env.NEXT_PUBLIC_SALON_PHONE || '+1-555-555-5555'}</strong> at least 24 hours in advance.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => {
                  setBookingSuccess(false)
                  setFormData({ firstName: "", lastName: "", phone: "", email: "", notes: "" })
                  setSelectedTime("")
                  setDate(undefined)
                }}
                className="bg-primary hover:bg-primary/90 rounded-full px-8 h-12 font-semibold"
              >
                Book Another Appointment
              </Button>
              <Button
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="rounded-full px-8 h-12 font-semibold"
              >
                Back to Home
              </Button>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  const { morning, afternoon, evening } = groupSlotsByPeriod(timeSlots)

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] bg-[#6B5344] overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 pt-32 lg:pt-40 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
              Book an Appointment
            </h1>
            <p className="text-white/90 text-xl lg:text-2xl leading-relaxed">
              Choose your service, select a convenient time, and we'll take care of the rest.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>
      
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Service & Date Selection */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Service Selection */}
              <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 rounded-full p-3">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Select Service</h2>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className={`text-left p-5 rounded-2xl border-2 transition-all ${
                        selectedService?.id === service.id
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <h3 className="font-semibold text-lg mb-1">{service.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{service.durationMinutes} min</span>
                        {service.price && <span className="font-semibold">${service.price}</span>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 rounded-full p-3">
                    <CalendarIcon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Choose Date</h2>
                </div>
                
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    className="border-0"
                    classNames={{
                      months: "flex flex-col space-y-4 w-full",
                      month: "space-y-4 w-full",
                      caption: "flex justify-center pt-1 relative items-center mb-4",
                      caption_label: "text-lg font-bold",
                      nav: "flex items-center",
                      nav_button: "h-10 w-10 bg-transparent p-0 hover:bg-gray-100 rounded-full transition-colors",
                      nav_button_previous: "absolute left-0",
                      nav_button_next: "absolute right-0",
                      table: "w-full border-collapse",
                      head_row: "flex w-full mb-2",
                      head_cell: "text-muted-foreground rounded-md font-medium text-sm flex-1 text-center",
                      row: "flex w-full mt-2",
                      cell: "relative p-0 text-center focus-within:relative focus-within:z-20 flex-1",
                      day: "h-12 w-12 p-0 font-normal hover:bg-gray-100 rounded-xl transition-all mx-auto",
                      day_selected: "bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white rounded-xl font-semibold",
                      day_today: "bg-gray-100 text-foreground rounded-xl font-medium",
                      day_outside: "text-muted-foreground opacity-30",
                      day_disabled: "text-muted-foreground opacity-20 cursor-not-allowed",
                    }}
                  />
                </div>
              </div>

              {/* Time Slots */}
              <AnimatePresence>
                {date && selectedService && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100"
                  >
                    <h2 className="text-2xl font-bold mb-6">Available Times</h2>
                    
                    {loadingSlots ? (
                      <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      </div>
                    ) : timeSlots.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <p>No available time slots for this date.</p>
                        <p className="text-sm mt-2">Please select another date.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {morning.length > 0 && (
                          <div>
                            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Morning</h3>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                              {morning.map((slot) => (
                                <button
                                  key={slot.time}
                                  type="button"
                                  disabled={!slot.available}
                                  onClick={() => setSelectedTime(slot.time)}
                                  className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
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
                          </div>
                        )}
                        
                        {afternoon.length > 0 && (
                          <div>
                            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Afternoon</h3>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                              {afternoon.map((slot) => (
                                <button
                                  key={slot.time}
                                  type="button"
                                  disabled={!slot.available}
                                  onClick={() => setSelectedTime(slot.time)}
                                  className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
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
                          </div>
                        )}
                        
                        {evening.length > 0 && (
                          <div>
                            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Evening</h3>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                              {evening.map((slot) => (
                                <button
                                  key={slot.time}
                                  type="button"
                                  disabled={!slot.available}
                                  onClick={() => setSelectedTime(slot.time)}
                                  className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
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
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-[#2A1810] rounded-3xl p-6 lg:p-8 shadow-lg sticky top-24">
                <h2 className="text-2xl font-bold text-white mb-6">Your Details</h2>
                
                <div className="space-y-4">
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
                    disabled={loading || !selectedService || !date || !selectedTime}
                    className="w-full bg-white text-[#2A1810] hover:bg-white/90 rounded-full h-14 font-semibold text-lg mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Booking...
                      </>
                    ) : (
                      'Book Appointment'
                    )}
                  </Button>
                  
                  <p className="text-white/60 text-xs text-center mt-4">
                    We'll call you to confirm your appointment
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
      
      <Footer />
    </div>
  )
}
