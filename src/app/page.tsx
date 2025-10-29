"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import ServiceCard from "@/components/ServiceCard"
import ProductCard from "@/components/ProductCard"
import TeamCard from "@/components/TeamCard"
import BookingCalendar from "@/components/BookingCalendar"
import StatsCounter from "@/components/StatsCounter"
import FeatureCard from "@/components/FeatureCard"
import { Award, Users, Clock, Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export default function Home() {
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0)

  const products = [
    { name: "Volumize Duo 18", price: 32, image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80" },
    { name: "Hot Air Comb", price: 325, image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&q=80" },
    { name: "Almond Repair Lotion", price: 48, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80" },
    { name: "Volume Conditioner", price: 68, image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&q=80" },
  ]

  const team = [
    { name: "Olivia Smith", role: "Hairstylist", image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&q=80" },
    { name: "Amelia Brown", role: "Hairstylist", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&q=80" },
    { name: "Emily Walker", role: "Makeup Artist", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
    { name: "Sophia Davis", role: "Nail Specialist", image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=400&q=80" },
  ]

  const visibleTeam = team.slice(currentTeamIndex, currentTeamIndex + 3)

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section
        className="relative min-h-screen overflow-hidden bg-[#6B5344]"
        style={{
          backgroundImage: "url(/herobg2.jpg)",
          backgroundSize: "auto 108vh",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right bottom",
          backgroundColor: "#6B5344"
        }}
      >
        {/* Left gradient overlay to enhance text contrast */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-[#6B5344] via-[#6B5344]/80 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 pt-24 lg:pt-32 pb-16">
          <div className="grid grid-cols-1 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 lg:space-y-8 z-10"
            >
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                Get Hair Style<br />You Deserve
              </h1>
              <p className="text-white/90 text-base lg:text-lg max-w-lg leading-relaxed">
                Discover a world of sophistication and personalized beauty at MINERVA. Our team's more than a place for haircuts. 
                It's a haven where your unique sense of style meets expert care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 text-base font-semibold shadow-lg">
                  Book Appointment
                </Button>
              </div>

              {/* New Arrivals Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="grid grid-cols-2 gap-4 max-w-md mt-8"
              >
                <div className="bg-white rounded-2xl p-4 shadow-lg">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm font-semibold text-[#2A1810]">New Arrivals</span>
                    <div className="w-6 h-6 rounded-full bg-[#2A1810] flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="aspect-square bg-[#F5EFE7] rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&q=80"
                      alt="Hair Dryer"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="bg-[#E8DDD0] rounded-2xl p-4 shadow-lg flex flex-col justify-center items-center text-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
                    <Image
                      src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&q=80"
                      alt="Hairstyle"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-primary text-2xl font-bold mb-1">50% OFF</div>
                  <div className="text-xs text-[#2A1810] font-medium">for first time</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section id="services" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-5xl font-bold mb-4"
            >
              Our Services
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-muted-foreground text-lg"
            >
              Beyond haircuts, discover a comprehensive range of services, from coloring to extensions.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              title="Haircuts"
              image="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80"
              bgColor="#A94442"
              delay={0}
            />
            <ServiceCard
              title="Hairstyles"
              image="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80"
              bgColor="#E8DDD0"
              delay={0.1}
            />
            <ServiceCard
              title="Coloring"
              image="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80"
              bgColor="#A94442"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold mb-4"
          >
            Booking
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground text-lg mb-12"
          >
            Ready for a transformation? Select your appointment date and we will call or email to confirm.
          </motion.p>

          <BookingCalendar />

          {/* Booking Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-8 rounded-3xl overflow-hidden aspect-[21/9] relative"
          >
            <Image
              src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1200&q=80"
              alt="Salon Interior"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Our Products */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl lg:text-5xl font-bold mb-4"
              >
                Our products
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-muted-foreground text-lg"
              >
                Experience the difference with top hair products that<br />enhance the wellness and health of your hair.
              </motion.p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 rounded-full px-8 h-12 font-semibold">
              SHOP NOW
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold mb-16 text-white text-center"
          >
            Why Choose Us
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
            <FeatureCard
              icon={Award}
              title="Expert Stylists"
              description="Lorem ipsum is simply dummy text of the printing and typesetting industry."
              delay={0}
            />
            <FeatureCard
              icon={Users}
              title="Premium Products"
              description="Lorem ipsum is simply dummy text of the printing and typesetting industry."
              delay={0.1}
            />
            <FeatureCard
              icon={Clock}
              title="Flexible Hours"
              description="We are just finishing those, and then they are heading out shortly. We are almost done."
              delay={0.2}
            />
            <FeatureCard
              icon={Star}
              title="5-Star Service"
              description="We believe in using only the very best brands to ensure results are stunning."
              delay={0.3}
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
            <StatsCounter value={30} label="Satisfied clients" suffix="k" delay={0} />
            <StatsCounter value={15} label="Salons around the city" delay={0.2} />
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl lg:text-5xl font-bold mb-4"
              >
                Our Team
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-muted-foreground text-lg"
              >
                Elevate your looks to our team of seasoned professionals<br />dedicated to making hair dreams a reality!
              </motion.p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setCurrentTeamIndex(Math.max(0, currentTeamIndex - 1))}
                disabled={currentTeamIndex === 0}
                variant="outline"
                size="icon"
                className="rounded-full bg-primary text-white border-0 hover:bg-primary/90 disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                onClick={() => setCurrentTeamIndex(Math.min(team.length - 3, currentTeamIndex + 1))}
                disabled={currentTeamIndex >= team.length - 3}
                variant="outline"
                size="icon"
                className="rounded-full bg-primary text-white border-0 hover:bg-primary/90 disabled:opacity-50"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTeam.map((member, index) => (
              <TeamCard key={index} {...member} delay={index * 0.1} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <Button className="bg-primary hover:bg-primary/90 rounded-full px-8 h-12 font-semibold">
              Join Our Team
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}