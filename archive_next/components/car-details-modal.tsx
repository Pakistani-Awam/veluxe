"use client"

import { useEffect } from "react"
import Image from "next/image"
import { Car } from "@/lib/cars-data"
import { X, Zap, Gauge, Timer, Cog, Settings2, CircleDot, Fuel, Weight } from "lucide-react"

interface CarDetailsModalProps {
  car: Car | null
  onClose: () => void
}

export function CarDetailsModal({ car, onClose }: CarDetailsModalProps) {
  useEffect(() => {
    if (car) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [car])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  if (!car) return null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const specs = [
    { icon: Cog, label: "Engine", value: car.engine },
    { icon: Settings2, label: "Transmission", value: car.transmission },
    { icon: CircleDot, label: "Drivetrain", value: car.drivetrain },
    { icon: Zap, label: "Power", value: `${car.power} HP` },
    { icon: Gauge, label: "Torque", value: `${car.torque} lb-ft` },
    { icon: Gauge, label: "Top Speed", value: `${car.topSpeed} mph` },
    { icon: Timer, label: "0-60 mph", value: `${car.acceleration}s` },
    { icon: Fuel, label: "Fuel Economy", value: car.fuel },
    { icon: Weight, label: "Weight", value: `${car.weight.toLocaleString()} lbs` },
  ]

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-card rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-background/80 hover:bg-background rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="overflow-y-auto max-h-[90vh]">
          {/* Image */}
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            <Image
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            {car.badge && (
              <span className={`absolute top-4 left-4 px-4 py-1.5 text-sm font-medium rounded-full ${
                car.badge === "Electric" 
                  ? "bg-green-500/90 text-white" 
                  : car.badge === "Ultra Rare"
                  ? "bg-red-500/90 text-white"
                  : "bg-primary/90 text-primary-foreground"
              }`}>
                {car.badge}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 -mt-16 relative">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <span className="text-sm text-primary font-medium uppercase tracking-wider">{car.brand}</span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mt-1">{car.model}</h2>
                <span className="text-muted-foreground text-sm">{car.year} Model Year</span>
              </div>
              <div className="text-right">
                <span className="text-3xl md:text-4xl font-bold text-primary">{formatPrice(car.price)}</span>
              </div>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {specs.map(({ icon: Icon, label, value }) => (
                <div key={label} className="p-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Icon size={18} />
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
                  </div>
                  <span className="text-sm md:text-base font-semibold text-foreground">{value}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                className="flex-1 py-3 px-6 bg-primary text-primary-foreground font-medium text-center rounded-lg hover:bg-primary/90 transition-colors"
              >
                Schedule Test Drive
              </a>
              <a
                href="/contact"
                className="flex-1 py-3 px-6 border border-border text-foreground font-medium text-center rounded-lg hover:bg-secondary transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
