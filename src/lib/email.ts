import nodemailer from 'nodemailer'

interface EmailOptions {
  to: string
  subject: string
  html: string
}

interface ContactEmailData {
  name: string
  email: string
  phone: string
  category: string
  message: string
}

interface AppointmentEmailData {
  appointmentId: string
  service: string
  date: string
  time: string
  duration: number
  firstName: string
  lastName: string
  phone: string
  email: string
  notes?: string
}

const getContactCategoryLabel = (category: string) => {
  switch (category) {
    case 'services':
      return 'Need Salon Services'
    case 'careers':
      return 'Want to Join the Team'
    case 'partnership':
      return 'Collaboration / Partnership'
    case 'feedback':
      return 'Feedback or Concern'
    default:
      return 'General Inquiry'
  }
}

const getSalonContactEmail = (data: ContactEmailData) => {
  const categoryLabel = getContactCategoryLabel(data.category)
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Request</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 20px;">
        <tr>
          <td align="center">
            <table width="620" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.08);">
              <tr>
                <td style="background-color:#6B5344;padding:32px;text-align:center;color:#ffffff;">
                  <h1 style="margin:0;font-size:26px;font-weight:700;letter-spacing:1px;">New Contact Request</h1>
                  <p style="margin:8px 0 0 0;font-size:14px;opacity:0.85;">A new enquiry just arrived from the website</p>
                </td>
              </tr>
              <tr>
                <td style="padding:36px;">
                  <h2 style="margin:0 0 16px 0;font-size:20px;color:#2A1810;">Details</h2>
                  <table width="100%" cellpadding="12" cellspacing="0" style="background-color:#F5EFE7;border-radius:10px;margin-bottom:24px;">
                    <tr>
                      <td style="width:30%;color:#6B5344;font-size:14px;font-weight:600;">Name</td>
                      <td style="color:#2A1810;font-size:14px;">${data.name}</td>
                    </tr>
                    <tr>
                      <td style="color:#6B5344;font-size:14px;font-weight:600;">Email</td>
                      <td style="color:#A94442;font-size:14px;"><a href="mailto:${data.email}" style="color:#A94442;text-decoration:none;">${data.email}</a></td>
                    </tr>
                    <tr>
                      <td style="color:#6B5344;font-size:14px;font-weight:600;">Phone</td>
                      <td style="color:#2A1810;font-size:14px;"><a href="tel:${data.phone}" style="color:#2A1810;text-decoration:none;">${data.phone}</a></td>
                    </tr>
                    <tr>
                      <td style="color:#6B5344;font-size:14px;font-weight:600;">Category</td>
                      <td style="color:#2A1810;font-size:14px;">${categoryLabel}</td>
                    </tr>
                  </table>
                  <div style="background-color:#FFF9F5;border-left:4px solid #A94442;padding:18px 22px;border-radius:8px;">
                    <h3 style="margin:0 0 10px 0;font-size:16px;color:#2A1810;">Message</h3>
                    <p style="margin:0;color:#4A3C35;font-size:15px;line-height:1.6;white-space:pre-line;">${data.message}</p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

const getCustomerContactConfirmation = (data: ContactEmailData) => {
  const salonPhone = process.env.SALON_PHONE || '+1-555-555-5555'
  const categoryLabel = getContactCategoryLabel(data.category)
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>We received your message</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.08);">
              <tr>
                <td style="background-color:#6B5344;padding:36px;text-align:center;color:#ffffff;">
                  <h1 style="margin:0;font-size:30px;font-weight:700;letter-spacing:2px;">MINERVA</h1>
                  <p style="margin:10px 0 0 0;font-size:15px;opacity:0.85;">Premium Salon & Beauty</p>
                </td>
              </tr>
              <tr>
                <td style="padding:40px 36px;">
                  <h2 style="margin:0 0 16px 0;font-size:24px;color:#2A1810;">Hi ${data.name.split(' ')[0] || 'there'},</h2>
                  <p style="margin:0 0 20px 0;font-size:16px;line-height:1.6;color:#4A3C35;">Thank you for reaching out regarding <strong>${categoryLabel}</strong>. Our concierge team will review your message and respond within 24 hours.</p>
                  <div style="background-color:#F5EFE7;border-radius:10px;padding:22px 24px;margin-bottom:24px;">
                    <h3 style="margin:0 0 12px 0;font-size:16px;color:#2A1810;">Your Message</h3>
                    <p style="margin:0;color:#4A3C35;font-size:15px;line-height:1.6;white-space:pre-line;">${data.message}</p>
                  </div>
                  <p style="margin:0 0 20px 0;font-size:15px;color:#4A3C35;">If you need immediate assistance, please call us at <a href="tel:${salonPhone}" style="color:#A94442;text-decoration:none;">${salonPhone}</a> or reply to this email.</p>
                  <p style="margin:0;font-size:15px;font-weight:600;color:#2A1810;">The MINERVA Team</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

export async function sendContactEmails(data: ContactEmailData) {
  const salonEmail = process.env.SALON_EMAIL || process.env.SMTP_USER

  if (!salonEmail) {
    throw new Error('Salon email is not configured')
  }

  await sendEmail({
    to: salonEmail,
    subject: `New Contact Request — ${data.name}`,
    html: getSalonContactEmail(data),
  })

  await sendEmail({
    to: data.email,
    subject: 'We received your message — MINERVA Salon',
    html: getCustomerContactConfirmation(data),
  })

  return { success: true }
}

// Create transporter with Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// Send email utility
export async function sendEmail({ to, subject, html }: EmailOptions) {
  const transporter = createTransporter()
  
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM || `"Minerva Salon" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    })
    
    console.log('Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email send error:', error)
    throw error
  }
}

// Customer confirmation email template
export function getCustomerConfirmationEmail(data: AppointmentEmailData): string {
  const { firstName, service, date, time, duration, appointmentId, phone } = data
  const salonPhone = process.env.SALON_PHONE || '+1-555-555-5555'
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your MINERVA Appointment Confirmation</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background-color: #6B5344; padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: 2px;">MINERVA</h1>
                  <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">Premium Salon & Beauty</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="margin: 0 0 20px 0; color: #2A1810; font-size: 24px; font-weight: 600;">Hi ${firstName},</h2>
                  <p style="margin: 0 0 30px 0; color: #4a4a4a; font-size: 16px; line-height: 1.6;">Your booking is confirmed! We're excited to see you.</p>
                  
                  <!-- Booking Details Card -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5EFE7; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
                    <tr>
                      <td>
                        <h3 style="margin: 0 0 20px 0; color: #2A1810; font-size: 18px; font-weight: 600;">Booking Summary</h3>
                        
                        <table width="100%" cellpadding="8" cellspacing="0">
                          <tr>
                            <td style="color: #6B5344; font-size: 14px; font-weight: 500;">Service:</td>
                            <td style="color: #2A1810; font-size: 14px; font-weight: 600; text-align: right;">${service}</td>
                          </tr>
                          <tr>
                            <td style="color: #6B5344; font-size: 14px; font-weight: 500;">Date:</td>
                            <td style="color: #2A1810; font-size: 14px; font-weight: 600; text-align: right;">${date}</td>
                          </tr>
                          <tr>
                            <td style="color: #6B5344; font-size: 14px; font-weight: 500;">Time:</td>
                            <td style="color: #2A1810; font-size: 14px; font-weight: 600; text-align: right;">${time}</td>
                          </tr>
                          <tr>
                            <td style="color: #6B5344; font-size: 14px; font-weight: 500;">Duration:</td>
                            <td style="color: #2A1810; font-size: 14px; font-weight: 600; text-align: right;">${duration} minutes</td>
                          </tr>
                          <tr>
                            <td style="color: #6B5344; font-size: 14px; font-weight: 500;">Reference:</td>
                            <td style="color: #A94442; font-size: 14px; font-weight: 600; text-align: right;">${appointmentId.slice(0, 8).toUpperCase()}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="margin: 0 0 20px 0; color: #4a4a4a; font-size: 15px; line-height: 1.6;">We will call you at <strong>${phone}</strong> to confirm your appointment details.</p>
                  
                  <!-- Important Info -->
                  <div style="background-color: #FFF9F5; border-left: 4px solid #A94442; padding: 15px 20px; margin-bottom: 30px;">
                    <p style="margin: 0; color: #2A1810; font-size: 14px; line-height: 1.6;"><strong>Need to cancel or reschedule?</strong><br>Please call us at <strong>${salonPhone}</strong> or reply to this email at least 24 hours in advance.</p>
                  </div>
                  
                  <p style="margin: 0; color: #4a4a4a; font-size: 15px; line-height: 1.6;">We look forward to pampering you!</p>
                  <p style="margin: 20px 0 0 0; color: #2A1810; font-size: 15px; font-weight: 600;">The MINERVA Team</p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #F5F5F5; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                  <p style="margin: 0 0 10px 0; color: #6B5344; font-size: 14px; font-weight: 600;">MINERVA Salon</p>
                  <p style="margin: 0; color: #888888; font-size: 13px;">Premium Hair Styling & Beauty Treatments</p>
                  <p style="margin: 15px 0 0 0; color: #888888; font-size: 12px;">Phone: ${salonPhone}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

// Salon notification email template
export function getSalonNotificationEmail(data: AppointmentEmailData): string {
  const { appointmentId, service, date, time, firstName, lastName, phone, email, notes } = data
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Booking Notification</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background-color: #A94442; padding: 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">🎉 New Booking Received</h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="margin: 0 0 25px 0; color: #2A1810; font-size: 20px; font-weight: 600;">Appointment Details</h2>
                  
                  <!-- Booking Info -->
                  <table width="100%" cellpadding="12" cellspacing="0" style="background-color: #F5EFE7; border-radius: 8px; margin-bottom: 25px;">
                    <tr>
                      <td style="color: #6B5344; font-size: 14px; font-weight: 500; width: 40%;">Service:</td>
                      <td style="color: #2A1810; font-size: 14px; font-weight: 600;">${service}</td>
                    </tr>
                    <tr>
                      <td style="color: #6B5344; font-size: 14px; font-weight: 500;">Date & Time:</td>
                      <td style="color: #2A1810; font-size: 14px; font-weight: 600;">${date} at ${time}</td>
                    </tr>
                    <tr>
                      <td style="color: #6B5344; font-size: 14px; font-weight: 500;">Appointment ID:</td>
                      <td style="color: #A94442; font-size: 14px; font-weight: 600; font-family: monospace;">${appointmentId}</td>
                    </tr>
                  </table>
                  
                  <h3 style="margin: 0 0 15px 0; color: #2A1810; font-size: 18px; font-weight: 600;">Customer Information</h3>
                  
                  <table width="100%" cellpadding="12" cellspacing="0" style="background-color: #FFF9F5; border-radius: 8px; margin-bottom: 25px;">
                    <tr>
                      <td style="color: #6B5344; font-size: 14px; font-weight: 500; width: 40%;">Name:</td>
                      <td style="color: #2A1810; font-size: 14px; font-weight: 600;">${firstName} ${lastName}</td>
                    </tr>
                    <tr>
                      <td style="color: #6B5344; font-size: 14px; font-weight: 500;">Phone:</td>
                      <td style="color: #2A1810; font-size: 14px; font-weight: 600;"><a href="tel:${phone}" style="color: #A94442; text-decoration: none;">${phone}</a></td>
                    </tr>
                    <tr>
                      <td style="color: #6B5344; font-size: 14px; font-weight: 500;">Email:</td>
                      <td style="color: #2A1810; font-size: 14px; font-weight: 600;"><a href="mailto:${email}" style="color: #A94442; text-decoration: none;">${email}</a></td>
                    </tr>
                    ${notes ? `
                    <tr>
                      <td style="color: #6B5344; font-size: 14px; font-weight: 500; vertical-align: top;">Notes:</td>
                      <td style="color: #2A1810; font-size: 14px; font-weight: 400; line-height: 1.5;">${notes}</td>
                    </tr>
                    ` : ''}
                  </table>
                  
                  <div style="background-color: #E8F5E9; border-left: 4px solid #4CAF50; padding: 15px 20px; margin-top: 25px;">
                    <p style="margin: 0; color: #2A1810; font-size: 14px;"><strong>Action Required:</strong> Please call the customer to confirm the appointment details.</p>
                  </div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #F5F5F5; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
                  <p style="margin: 0; color: #888888; font-size: 12px;">This is an automated notification from the MINERVA booking system.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

// Send booking confirmation emails
export async function sendBookingEmails(data: AppointmentEmailData) {
  const salonEmail = process.env.SALON_EMAIL || process.env.SMTP_USER
  
  try {
    // Send customer confirmation
    await sendEmail({
      to: data.email,
      subject: `Your MINERVA Appointment — ${data.date} at ${data.time}`,
      html: getCustomerConfirmationEmail(data),
    })
    
    // Send salon notification
    if (salonEmail) {
      await sendEmail({
        to: salonEmail,
        subject: `New Booking — ${data.service} — ${data.date} ${data.time}`,
        html: getSalonNotificationEmail(data),
      })
    }
    
    return { success: true }
  } catch (error) {
    console.error('Failed to send booking emails:', error)
    throw error
  }
}
