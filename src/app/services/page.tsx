"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Scissors, Palette, Sparkles, Star, Clock, DollarSign } from "lucide-react"

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Services", icon: Star },
    { id: "haircuts", name: "Haircuts", icon: Scissors },
    { id: "color", name: "Color & Highlights", icon: Palette },
    { id: "styling", name: "Styling", icon: Sparkles },
  ]

  const services = [
    {
      category: "haircuts",
      name: "Women's Haircut",
      description: "Precision cut tailored to your face shape and style preferences with expert consultation.",
      price: 85,
      duration: "60 min",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80",
      popular: true
    },
    {
      category: "haircuts",
      name: "Men's Haircut",
      description: "Classic or contemporary styles executed with precision and attention to detail.",
      price: 65,
      duration: "45 min",
      image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80",
      popular: false
    },
    {
      category: "haircuts",
      name: "Bang/Fringe Trim",
      description: "Quick refresh of your bangs or fringe to maintain your style between full cuts.",
      price: 25,
      duration: "15 min",
      image: "https://images.unsplash.com/photo-1595475884562-073c30d45670?w=600&q=80",
      popular: false
    },
    {
      category: "color",
      name: "Full Color",
      description: "Complete color transformation using premium products for vibrant, long-lasting results.",
      price: 150,
      duration: "120 min",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
      popular: true
    },
    {
      category: "color",
      name: "Balayage",
      description: "Hand-painted highlights for a natural, sun-kissed look with beautiful dimension.",
      price: 200,
      duration: "150 min",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80",
      popular: true
    },
    {
      category: "color",
      name: "Root Touch-Up",
      description: "Maintain your color with seamless root coverage between full color appointments.",
      price: 95,
      duration: "75 min",
      image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&q=80",
      popular: false
    },
    {
      category: "color",
      name: "Highlights",
      description: "Traditional foil highlights for precise, controlled lightening and dimension.",
      price: 175,
      duration: "135 min",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
      popular: false
    },
    {
      category: "styling",
      name: "Blowout",
      description: "Professional blow dry and styling for smooth, voluminous results that last.",
      price: 55,
      duration: "45 min",
      image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80",
      popular: true
    },
    {
      category: "styling",
      name: "Special Event Styling",
      description: "Elegant updo or sophisticated styling for weddings, proms, and special occasions.",
      price: 120,
      duration: "90 min",
      image: "https://images.unsplash.com/photo-1605980413291-5dd14e8e0d71?w=600&q=80",
      popular: false
    },
    {
      category: "styling",
      name: "Keratin Treatment",
      description: "Smoothing treatment that reduces frizz and enhances shine for up to 12 weeks.",
      price: 300,
      duration: "180 min",
      image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&q=80",
      popular: false
    },
    {
      category: "styling",
      name: "Deep Conditioning",
      description: "Intensive hydration treatment to restore moisture, shine, and manageability.",
      price: 45,
      duration: "30 min",
      image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&q=80",
      popular: false
    },
  ]

  const filteredServices = selectedCategory === "all" 
    ? services 
    : services.filter(service => service.category === selectedCategory)

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
              Our Services
            </h1>
            <p className="text-white/90 text-xl lg:text-2xl leading-relaxed">
              Discover our comprehensive range of premium hair services, from precision 
              cuts to stunning color transformations.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Category Tabs */}
          <div className="mb-12">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto gap-2 bg-transparent">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="rounded-full px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    <category.icon className="h-4 w-4 mr-2" />
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {service.popular && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary text-white border-0 rounded-full px-3 py-1">
                        Popular
                      </Badge>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xl font-bold text-primary">
                      <DollarSign className="h-5 w-5" />
                      <span>{service.price}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-primary hover:bg-primary/90 rounded-full font-semibold">
                    Book Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold mb-4 text-center"
          >
            Service Packages
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground text-lg text-center mb-16 max-w-3xl mx-auto"
          >
            Save more with our curated packages designed for complete transformations.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Essential",
                price: 135,
                savings: "Save $15",
                services: ["Women's Haircut", "Blowout", "Deep Conditioning"],
                color: "bg-[#E8DDD0]"
              },
              {
                name: "Transformation",
                price: 320,
                savings: "Save $35",
                services: ["Full Color", "Haircut", "Blowout", "Deep Conditioning"],
                color: "bg-primary",
                popular: true
              },
              {
                name: "Luxury",
                price: 450,
                savings: "Save $50",
                services: ["Balayage", "Haircut", "Keratin Treatment", "Blowout"],
                color: "bg-[#8B6F47]"
              }
            ].map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`rounded-3xl p-8 ${pkg.color} text-white relative overflow-hidden ${
                  pkg.popular ? "ring-4 ring-primary/50 scale-105" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white text-primary border-0 rounded-full px-3 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="text-sm mb-4 opacity-90">{pkg.savings}</div>
                <div className="text-5xl font-bold mb-6">
                  ${pkg.price}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.services.map((service, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                      <span className="text-white/90">{service}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full rounded-full font-semibold ${
                    pkg.popular 
                      ? "bg-white text-primary hover:bg-white/90" 
                      : "bg-white/20 text-white hover:bg-white/30 border-2 border-white/40"
                  }`}
                >
                  Book Package
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary rounded-3xl overflow-hidden"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="p-8 lg:p-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Ready for Your Transformation?
                </h2>
                <p className="text-white/90 text-lg mb-8">
                  Book your appointment today and experience the MINERVA difference. 
                  Our expert stylists are ready to bring your vision to life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-white text-primary hover:bg-white/90 rounded-full px-8 h-12 font-semibold">
                    Book Appointment
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-2 border-white text-white hover:bg-white/10 rounded-full px-8 h-12 font-semibold"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
              
              <div className="relative aspect-square lg:aspect-auto lg:h-full min-h-[400px]">
                <Image
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"
                  alt="Salon Experience"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
