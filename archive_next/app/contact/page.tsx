"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube, Linkedin, Send, HelpCircle } from "lucide-react"

const contactInfo = [
  { icon: MapPin, title: "Visit Our Showroom", content: "888 Luxury Avenue, Beverly Hills, CA 90210" },
  { icon: Phone, title: "Call Us", content: "+1 (888) 555-LUXE" },
  { icon: Mail, title: "Email Us", content: "info@veluxemotors.com" },
  { icon: Clock, title: "Business Hours", content: "Mon - Sat: 9AM - 7PM | Sun: By Appointment" },
]

const socials = [
  { icon: Facebook, label: "Facebook" },
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "Twitter" },
  { icon: Youtube, label: "YouTube" },
  { icon: Linkedin, label: "LinkedIn" },
]

const faqs = [
  { question: "How do I schedule a test drive?", answer: "Simply fill out our contact form or call us directly. Our team will work with your schedule to arrange a private test drive experience at your convenience." },
  { question: "Do you offer financing options?", answer: "Yes, we partner with premium financial institutions to offer competitive financing and leasing options tailored to your needs." },
  { question: "Can I trade in my current vehicle?", answer: "Absolutely. We offer fair market valuations for trade-ins and can apply the value directly to your new purchase." },
  { question: "Do you ship vehicles internationally?", answer: "Yes, we have experience delivering vehicles to clients worldwide. Our logistics team handles all documentation and shipping arrangements." },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: "", email: "", phone: "", interest: "", message: "" })
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">
        <PageHero
          image="/assets/showroom.jpg"
          subtitle="Get in Touch"
          title="Contact"
          titleHighlight="Us"
          description="We would love to hear from you. Reach out to schedule a viewing or discuss your dream car."
        />

        {/* Contact Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-6">
                  Let&apos;s Start a <span className="text-primary">Conversation</span>
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Whether you&apos;re looking for your dream car, want to schedule a test drive, 
                  or simply have questions about our collection, our team of specialists is here 
                  to provide you with an exceptional experience.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <item.icon className="text-primary" size={22} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                        <p className="text-muted-foreground text-sm mt-1">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
                  <div className="flex items-center gap-3">
                    {socials.map((social) => (
                      <a
                        key={social.label}
                        href="#"
                        aria-label={social.label}
                        className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
                      >
                        <social.icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card rounded-xl border border-border/50 p-6 md:p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="text-green-500" size={28} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. Our team will get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
