import { NextRequest, NextResponse } from 'next/server'
import { getAppointment } from '@/lib/booking'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const appointment = await getAppointment(params.id)
    
    if (!appointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      appointment: {
        id: appointment.id,
        service: appointment.service.name,
        date: appointment.date,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        customer: {
          firstName: appointment.customerFirst,
          lastName: appointment.customerLast,
          email: appointment.customerEmail,
          phone: appointment.customerPhone,
        },
        notes: appointment.notes,
        status: appointment.status,
        createdAt: appointment.createdAt,
      },
    })
  } catch (error: any) {
    console.error('Get appointment error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch appointment' },
      { status: 500 }
    )
  }
}
