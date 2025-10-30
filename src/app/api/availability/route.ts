import { NextRequest, NextResponse } from 'next/server'
import { getAvailableSlots } from '@/lib/booking'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const date = searchParams.get('date')
    const service = searchParams.get('service')
    
    if (!date || !service) {
      return NextResponse.json(
        { error: 'Missing required parameters: date and service' },
        { status: 400 }
      )
    }
    
    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(date)) {
      return NextResponse.json(
        { error: 'Invalid date format. Use YYYY-MM-DD' },
        { status: 400 }
      )
    }
    
    const slots = await getAvailableSlots({
      date,
      serviceSlug: service,
    })
    
    return NextResponse.json({
      date,
      service,
      slots,
      timezone: 'America/New_York', // Adjust based on your salon's timezone
    })
  } catch (error: any) {
    console.error('Availability API error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch availability' },
      { status: 500 }
    )
  }
}
