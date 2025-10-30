import { prisma } from './db'

export interface TimeSlot {
  time: string
  available: boolean
}

export interface AvailabilityParams {
  date: string // YYYY-MM-DD
  serviceSlug: string
}

// Parse time string (HH:MM) to minutes since midnight
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

// Convert minutes since midnight to time string (HH:MM)
function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
}

// Get day of week (0 = Sunday, 1 = Monday, etc.)
function getDayOfWeek(dateString: string): number {
  const date = new Date(dateString + 'T00:00:00')
  return date.getDay()
}

// Check if a date is in the past
function isPastDate(dateString: string, timeString: string): boolean {
  const now = new Date()
  const slotDate = new Date(`${dateString}T${timeString}:00`)
  return slotDate < now
}

// Get available time slots for a given date and service
export async function getAvailableSlots(params: AvailabilityParams): Promise<TimeSlot[]> {
  const { date, serviceSlug } = params
  
  // Get service details
  const service = await prisma.service.findUnique({
    where: { slug: serviceSlug, active: true },
  })
  
  if (!service) {
    throw new Error('Service not found')
  }
  
  // Get working hours for this day
  const dayOfWeek = getDayOfWeek(date)
  const workingHours = await prisma.workingHours.findUnique({
    where: { weekday: dayOfWeek, active: true },
  })
  
  if (!workingHours) {
    return [] // Salon is closed on this day
  }
  
  // Get existing appointments for this date and service
  const existingAppointments = await prisma.appointment.findMany({
    where: {
      date,
      serviceId: service.id,
      status: { in: ['confirmed', 'pending'] },
    },
    select: {
      startTime: true,
      endTime: true,
    },
  })
  
  // Generate all possible time slots
  const slots: TimeSlot[] = []
  const startMinutes = timeToMinutes(workingHours.startTime)
  const endMinutes = timeToMinutes(workingHours.endTime)
  const slotInterval = 30 // 30-minute intervals
  const serviceDuration = service.durationMinutes
  
  for (let minutes = startMinutes; minutes + serviceDuration <= endMinutes; minutes += slotInterval) {
    const slotTime = minutesToTime(minutes)
    const slotEndMinutes = minutes + serviceDuration
    const slotEndTime = minutesToTime(slotEndMinutes)
    
    // Check if slot is in the past
    if (isPastDate(date, slotTime)) {
      continue
    }
    
    // Check if slot overlaps with any existing appointment
    const isBooked = existingAppointments.some((apt: { startTime: string; endTime: string }) => {
      const aptStart = timeToMinutes(apt.startTime)
      const aptEnd = timeToMinutes(apt.endTime)
      
      // Check for overlap
      return (
        (minutes >= aptStart && minutes < aptEnd) ||
        (slotEndMinutes > aptStart && slotEndMinutes <= aptEnd) ||
        (minutes <= aptStart && slotEndMinutes >= aptEnd)
      )
    })
    
    slots.push({
      time: slotTime,
      available: !isBooked,
    })
  }
  
  return slots
}

// Create a new appointment with atomic reservation
export async function createAppointment(data: {
  serviceSlug: string
  date: string
  time: string
  customer: {
    firstName: string
    lastName: string
    phone: string
    email: string
  }
  notes?: string
  source?: string
}) {
  // Get service
  const service = await prisma.service.findUnique({
    where: { slug: data.serviceSlug, active: true },
  })
  
  if (!service) {
    throw new Error('Service not found')
  }
  
  // Calculate end time
  const startMinutes = timeToMinutes(data.time)
  const endMinutes = startMinutes + service.durationMinutes
  const endTime = minutesToTime(endMinutes)
  
  // Check if slot is still available (atomic check within transaction)
  try {
    const appointment = await prisma.$transaction(async (tx: any) => {
      // Check for existing appointment at this time
      const existing = await tx.appointment.findFirst({
        where: {
          date: data.date,
          startTime: data.time,
          serviceId: service.id,
          status: { in: ['confirmed', 'pending'] },
        },
      })
      
      if (existing) {
        throw new Error('SLOT_TAKEN')
      }
      
      // Create appointment
      return await tx.appointment.create({
        data: {
          serviceId: service.id,
          date: data.date,
          startTime: data.time,
          endTime,
          customerFirst: data.customer.firstName,
          customerLast: data.customer.lastName,
          customerEmail: data.customer.email,
          customerPhone: data.customer.phone,
          notes: data.notes,
          status: 'confirmed',
          source: data.source || 'booking-page',
        },
        include: {
          service: true,
        },
      })
    })
    
    return appointment
  } catch (error: any) {
    if (error.message === 'SLOT_TAKEN') {
      throw new Error('This time slot is no longer available. Please choose another time.')
    }
    throw error
  }
}

// Get appointment by ID
export async function getAppointment(id: string) {
  return await prisma.appointment.findUnique({
    where: { id },
    include: {
      service: true,
    },
  })
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00')
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Format time for display (convert 24h to 12h format)
export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 || 12
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
}
