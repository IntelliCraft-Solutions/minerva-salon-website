import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create services
  const services = [
    {
      slug: 'haircut',
      name: 'Haircut',
      description: 'Professional haircut with styling consultation',
      durationMinutes: 60,
      price: 45,
    },
    {
      slug: 'hairstyle',
      name: 'Hairstyle',
      description: 'Creative styling for any occasion',
      durationMinutes: 90,
      price: 65,
    },
    {
      slug: 'coloring',
      name: 'Hair Coloring',
      description: 'Full color treatment with premium products',
      durationMinutes: 120,
      price: 120,
    },
    {
      slug: 'highlights',
      name: 'Highlights',
      description: 'Partial or full highlights',
      durationMinutes: 150,
      price: 150,
    },
    {
      slug: 'treatment',
      name: 'Hair Treatment',
      description: 'Deep conditioning and repair treatment',
      durationMinutes: 60,
      price: 55,
    },
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    })
    console.log(`✓ Created service: ${service.name}`)
  }

  // Create working hours (Monday = 1, Sunday = 0)
  const workingHours = [
    { weekday: 1, startTime: '08:00', endTime: '21:00' }, // Monday
    { weekday: 2, startTime: '08:00', endTime: '21:00' }, // Tuesday
    { weekday: 3, startTime: '08:00', endTime: '21:00' }, // Wednesday
    { weekday: 4, startTime: '08:00', endTime: '21:00' }, // Thursday
    { weekday: 5, startTime: '08:00', endTime: '21:00' }, // Friday
    { weekday: 6, startTime: '08:00', endTime: '21:00' }, // Saturday
    { weekday: 0, startTime: '10:00', endTime: '18:00', active: false }, // Sunday - Closed
  ]

  for (const hours of workingHours) {
    await prisma.workingHours.upsert({
      where: { weekday: hours.weekday },
      update: hours,
      create: hours,
    })
    const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][hours.weekday]
    console.log(`✓ Set working hours for ${day}: ${hours.startTime} - ${hours.endTime}${hours.active === false ? ' (Closed)' : ''}`)
  }

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
