"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import StatsCounter from "@/components/StatsCounter"
import TeamCard from "@/components/TeamCard"
import { Award, Heart, Users, Sparkles, Target, Lightbulb, TrendingUp, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  const timeline = [
    { year: "2010", title: "Foundation", description: "MINERVA was founded with a vision to revolutionize hair styling." },
    { year: "2013", title: "Expansion", description: "Opened 5 new locations across the city with expert teams." },
    { year: "2017", title: "Innovation", description: "Introduced cutting-edge styling techniques and organic products." },
    { year: "2020", title: "Recognition", description: "Awarded Best Salon Chain by Beauty Excellence Awards." },
    { year: "2024", title: "Excellence", description: "15+ locations serving 30,000+ satisfied clients annually." },
  ]

  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "We love what we do and it shows in every service we provide."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to delivering the highest quality in every detail."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building lasting relationships with our clients and team."
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "Always exploring new techniques and trending styles."
    }
  ]

  const process = [
    {
      icon: Target,
      title: "Consultation",
      description: "Understanding your vision and hair needs through detailed discussion."
    },
    {
      icon: Lightbulb,
      title: "Customization",
      description: "Creating a personalized plan tailored to your unique style."
    },
    {
      icon: TrendingUp,
      title: "Transformation",
      description: "Expert execution using premium products and advanced techniques."
    },
    {
      icon: Shield,
      title: "Care",
      description: "Providing aftercare guidance to maintain your stunning results."
    }
  ]

  const team = [
    { name: "Olivia Smith", role: "Lead Stylist & Founder", image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&q=80" },
    { name: "Amelia Brown", role: "Senior Hairstylist", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&q=80" },
    { name: "Emily Walker", role: "Makeup Artist", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
    { name: "Sophia Davis", role: "Color Specialist", image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=400&q=80" },
    { name: "Isabella Martinez", role: "Style Director", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80" },
    { name: "Charlotte Wilson", role: "Bridal Specialist", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80" },
  ]

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
              About Us
            </h1>
            <p className="text-white/90 text-xl lg:text-2xl leading-relaxed">
              Where passion meets expertise. Discover the story behind MINERVA, 
              a sanctuary of beauty and transformation.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Our Story */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Founded in 2010, MINERVA began as a small boutique salon with a big dream: 
                  to create a space where beauty, artistry, and personalized care converge.
                </p>
                <p>
                  What started as a single location has blossomed into a network of 15+ 
                  premium salons, each dedicated to delivering exceptional experiences and 
                  stunning transformations.
                </p>
                <p>
                  Our team of award-winning stylists combines technical mastery with artistic 
                  vision, staying ahead of trends while honoring timeless elegance. We believe 
                  every client deserves to feel confident, beautiful, and truly themselves.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"
                alt="Salon Interior"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold mb-16 text-center"
          >
            Our Journey
          </motion.h2>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 hidden lg:block" />

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex items-center mb-12 last:mb-0 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? "lg:text-right lg:pr-12" : "lg:text-left lg:pl-12"}`}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-primary font-bold text-2xl mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>

                <div className="hidden lg:flex w-2/12 justify-center relative z-10">
                  <div className="w-6 h-6 rounded-full bg-primary border-4 border-white shadow-lg" />
                </div>

                <div className="hidden lg:block w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold mb-16 text-white text-center"
          >
            Our Impact
          </motion.h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatsCounter value={30} label="Satisfied clients" suffix="k" delay={0} />
            <StatsCounter value={15} label="Locations" suffix="+" delay={0.1} />
            <StatsCounter value={50} label="Expert stylists" suffix="+" delay={0.2} />
            <StatsCounter value={10} label="Years of excellence" suffix="+" delay={0.3} />
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold mb-16 text-center"
          >
            Our Values
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold mb-6 text-center"
          >
            Our Process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground text-lg text-center mb-16 max-w-3xl mx-auto"
          >
            Every transformation follows our proven four-step process, designed to deliver 
            exceptional results while ensuring your complete satisfaction.
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-3xl p-8 shadow-lg h-full">
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl shadow-lg">
                    {index + 1}
                  </div>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-5xl font-bold mb-4"
            >
              Meet the Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-muted-foreground text-lg max-w-3xl mx-auto"
            >
              Our talented team of stylists, colorists, and beauty experts are passionate 
              about bringing your vision to life.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {team.map((member, index) => (
              <TeamCard key={index} {...member} delay={index * 0.1} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Button className="bg-primary hover:bg-primary/90 rounded-full px-8 h-12 font-semibold text-base">
              Join Our Team
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Our Culture</h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed mb-8">
                <p>
                  At MINERVA, we've cultivated a culture of creativity, collaboration, and 
                  continuous growth. Our team thrives in an environment that encourages 
                  innovation and celebrates individual artistry.
                </p>
                <p>
                  We invest in ongoing education, ensuring our stylists stay at the forefront 
                  of industry trends and techniques. Regular training sessions, workshops, and 
                  industry events keep our team inspired and skilled.
                </p>
                <p>
                  But it's not just about technical excellence. We believe in work-life balance, 
                  fostering a supportive community where everyone feels valued and empowered to 
                  bring their best selves to work every day.
                </p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 rounded-full px-8 h-12 font-semibold">
                Learn More
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2 grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="aspect-square rounded-3xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=400&q=80"
                    alt="Team Culture 1"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80"
                    alt="Team Culture 2"
                    width={400}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&q=80"
                    alt="Team Culture 3"
                    width={400}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-3xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&q=80"
                    alt="Team Culture 4"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
