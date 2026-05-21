"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { CarCard } from "@/components/car-card"
import { CarDetailsModal } from "@/components/car-details-modal"
import { carsData, Car } from "@/lib/cars-data"
import { Search, X, Rocket, Flag, Crown, Zap, LayoutGrid } from "lucide-react"

const categories = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "supercar", label: "Supercars", icon: Rocket },
  { id: "sports", label: "Sports", icon: Flag },
  { id: "luxury", label: "Luxury", icon: Crown },
  { id: "electric", label: "Electric", icon: Zap },
]

export default function CarsPage() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCars = carsData.filter((car) => {
    const matchesCategory = activeCategory === "all" || car.category.includes(activeCategory)
    const matchesSearch = 
      car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">
        <PageHero
          image="/assets/cars/lamborghini-aventador.jpg"
          subtitle="Our Collection"
          title="Luxury"
          titleHighlight="Cars"
          description="Discover the finest selection of premium automobiles from the world's most prestigious brands"
          stats={[
            { value: "50+", label: "Premium Cars" },
            { value: "15", label: "Luxury Brands" },
            { value: "100%", label: "Verified" },
          ]}
        />

        {/* Cars Section */}
        <section className="py-12 md:py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Filters */}
            <div className="mb-8 space-y-4">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeCategory === cat.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    <cat.icon size={16} />
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by brand or model..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  Showing {filteredCars.length} vehicle{filteredCars.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Cars Grid */}
            {filteredCars.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onViewDetails={setSelectedCar}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No cars found matching your criteria.</p>
                <button
                  onClick={() => {
                    setActiveCategory("all")
                    setSearchQuery("")
                  }}
                  className="mt-4 text-primary hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      {/* Car Details Modal */}
      <CarDetailsModal car={selectedCar} onClose={() => setSelectedCar(null)} />
    </>
  )
}
