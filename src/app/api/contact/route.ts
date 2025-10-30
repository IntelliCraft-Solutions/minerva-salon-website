import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendContactEmails } from '@/lib/email'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z
    .string()
    .min(7, 'Phone number must be at least 7 digits')
    .max(13, 'Phone number must be at most 13 digits')
    .regex(/^\d+$/, 'Phone number can only contain digits'),
  category: z.string().min(1, 'Category is required'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = contactSchema.parse(body)

    await sendContactEmails(data)

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out. We'll respond shortly.",
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('[Contact API] Failed to process request:', error)

    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: 'Failed to send message. Please try again later.' }, { status: 500 })
  }
}
