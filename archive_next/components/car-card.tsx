"use client"

import Image from "next/image"
import { Car } from "@/lib/cars-data"
import { Zap, Gauge, Timer } from "lucide-react"

interface CarCardProps {
  car: Car
  onViewDetails: (car: Car) => void
}

export function CarCard({ car, onViewDetails }: CarCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="group bg-card rounded-lg overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {car.badge && (
          <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full ${
            car.badge === "Electric" 
              ? "bg-green-500/90 text-white" 
              : car.badge === "Ultra Rare"
              ? "bg-red-500/90 text-white"
              : "bg-primary/90 text-primary-foreground"
          }`}>
            {car.badge}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button
          onClick={() => onViewDetails(car)}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary/90"
        >
          View Details
        </button>
      </div>

      {/* Info */}
      <div className="p-4 md:p-5">
        <span className="text-xs text-primary font-medium uppercase tracking-wider">{car.brand}</span>
        <h3 className="text-lg font-semibold text-foreground mt-1 mb-3">{car.model}</h3>
        
        {/* Specs */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-2 bg-secondary/50 rounded-md">
            <div className="flex items-center justify-center gap-1 text-primary mb-1">
              <Zap size={14} />
            </div>
            <span className="text-xs font-semibold text-foreground">{car.power} HP</span>
            <span className="text-xs text-muted-foreground block">Power</span>
          </div>
          <div className="text-center p-2 bg-secondary/50 rounded-md">
            <div className="flex items-center justify-center gap-1 text-primary mb-1">
              <Gauge size={14} />
            </div>
            <span className="text-xs font-semibold text-foreground">{car.topSpeed} mph</span>
            <span className="text-xs text-muted-foreground block">Top Speed</span>
          </div>
          <div className="text-center p-2 bg-secondary/50 rounded-md">
            <div className="flex items-center justify-center gap-1 text-primary mb-1">
              <Timer size={14} />
            </div>
            <span className="text-xs font-semibold text-foreground">{car.acceleration}s</span>
            <span className="text-xs text-muted-foreground block">0-60 mph</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <span className="text-lg font-bold text-primary">{formatPrice(car.price)}</span>
          <button
            onClick={() => onViewDetails(car)}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Learn more
          </button>
        </div>
      </div>
    </div>
  )
}
