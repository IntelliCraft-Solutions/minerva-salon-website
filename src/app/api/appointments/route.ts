import { NextRequest, NextResponse } from 'next/server'
import { createAppointment, formatDate, formatTime, getAvailableSlots } from '@/lib/booking'
import { sendBookingEmails } from '@/lib/email'
import { z } from 'zod'

// Validation schema
const appointmentSchema = z.object({
  service: z.string().min(1, 'Service is required'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
  duration: z.number().optional(),
  customer: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    phone: z.string().min(10, 'Valid phone number is required'),
    email: z.string().email('Valid email is required'),
  }),
  notes: z.string().optional(),
  source: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validatedData = appointmentSchema.parse(body)
    
    // Create appointment
    const appointment = await createAppointment({
      serviceSlug: validatedData.service,
      date: validatedData.date,
      time: validatedData.time,
      customer: validatedData.customer,
      notes: validatedData.notes,
      source: validatedData.source,
    })
    
    // Send confirmation emails (async, don't block response)
    sendBookingEmails({
      appointmentId: appointment.id,
      service: appointment.service.name,
      date: formatDate(appointment.date),
      time: formatTime(appointment.startTime),
      duration: appointment.service.durationMinutes,
      firstName: appointment.customerFirst,
      lastName: appointment.customerLast,
      phone: appointment.customerPhone,
      email: appointment.customerEmail,
      notes: appointment.notes || undefined,
    }).catch(error => {
      console.error('Failed to send booking emails:', error)
      // Don't fail the booking if email fails
    })
    
    return NextResponse.json(
      {
        success: true,
        appointment: {
          id: appointment.id,
          service: appointment.service.name,
          date: appointment.date,
          time: appointment.startTime,
          status: appointment.status,
        },
        message: 'Appointment booked successfully! Check your email for confirmation.',
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Appointment creation error:', error)
    
    // Handle validation errors
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    
    // Handle slot taken error
    if (error.message.includes('no longer available')) {
      // Get updated availability
      try {
        const body = await request.json()
        const slots = await getAvailableSlots({
          date: body.date,
          serviceSlug: body.service,
        })
        
        return NextResponse.json(
          {
            error: error.message,
            availableSlots: slots.filter(s => s.available).map(s => s.time),
          },
          { status: 409 }
        )
      } catch {
        return NextResponse.json(
          { error: error.message },
          { status: 409 }
        )
      }
    }
    
    return NextResponse.json(
      { error: error.message || 'Failed to create appointment' },
      { status: 500 }
    )
  }
}
