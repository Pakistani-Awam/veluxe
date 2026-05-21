import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Gem, Shield, Handshake, Wallet, Star, Car, Users, Award } from "lucide-react"

const features = [
  {
    icon: Gem,
    title: "Curated Selection",
    description: "Hand-picked masterpieces from the world's most prestigious brands, each verified for excellence."
  },
  {
    icon: Shield,
    title: "Certified Quality",
    description: "Every vehicle undergoes a rigorous 200-point inspection ensuring peak performance and condition."
  },
  {
    icon: Handshake,
    title: "White Glove Service",
    description: "Personal concierge service from initial inquiry to doorstep delivery, wherever you are."
  },
  {
    icon: Wallet,
    title: "Flexible Financing",
    description: "Tailored financial solutions with competitive rates designed for discerning collectors."
  }
]

const featuredCars = [
  {
    brand: "Lamborghini",
    model: "Aventador SVJ",
    power: "770 HP",
    topSpeed: "217 mph",
    acceleration: "2.8s",
    price: "$573,966",
    image: "/assets/cars/lamborghini-aventador.jpg",
    badge: "New Arrival"
  },
  {
    brand: "Porsche",
    model: "911 Turbo S",
    power: "640 HP",
    topSpeed: "205 mph",
    acceleration: "2.6s",
    price: "$216,100",
    image: "/assets/cars/porsche-911.jpg"
  },
  {
    brand: "Ferrari",
    model: "SF90 Stradale",
    power: "986 HP",
    topSpeed: "211 mph",
    acceleration: "2.5s",
    price: "$625,000",
    image: "/assets/cars/ferrari-sf90.jpg",
    badge: "Exclusive"
  }
]

const stats = [
  { icon: Star, value: "25+", label: "Years of Excellence" },
  { icon: Car, value: "1,500+", label: "Cars Sold" },
  { icon: Users, value: "2,000+", label: "Happy Clients" },
  { icon: Award, value: "15", label: "Industry Awards" }
]

const brands = ["FERRARI", "LAMBORGHINI", "PORSCHE", "MCLAREN", "ROLLS ROYCE", "BENTLEY", "ASTON MARTIN", "MERCEDES", "BMW", "BUGATTI"]

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <Image
            src="/assets/hero-bg.jpg"
            alt="Luxury Car Showroom"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
          
          <div className="relative z-10 text-center px-4 py-20 max-w-5xl mx-auto">
            <span className="inline-block text-sm text-primary font-medium uppercase tracking-widest mb-4 animate-fade-in">
              Welcome to Veluxe Motors
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-tight">
              Experience Automotive{" "}
              <span className="text-primary">Luxury</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover an exclusive collection of the world\'s most prestigious automobiles. 
              Where elegance meets performance, and every drive becomes extraordinary.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/cars"
                className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Car size={20} />
                Explore Collection
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-secondary transition-colors"
              >
                Book a Test Drive
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs uppercase tracking-wider">Scroll</span>
            <div className="w-5 h-8 border-2 border-muted-foreground/50 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
            </div>
          </div>
        </section>

        {/* Brand Marquee */}
        <section className="bg-[oklch(0.15_0_0)] py-4 overflow-hidden border-y border-border/50">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...brands, ...brands].map((brand, i) => (
              <span key={i} className="mx-8 text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Star size={12} className="text-primary" /> {brand}
              </span>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <span className="inline-block text-sm text-primary font-medium uppercase tracking-wider mb-3">
                Why Veluxe
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                The <span className="text-primary">Ultimate</span> Luxury Experience
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                We deliver more than just cars. We deliver dreams, status, and unparalleled driving experiences.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div 
                  key={feature.title}
                  className="group p-6 bg-card rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="text-primary" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Cars */}
        <section className="py-16 md:py-24 px-4 bg-[oklch(0.15_0_0)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <span className="inline-block text-sm text-primary font-medium uppercase tracking-wider mb-3">
                Our Collection
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Featured <span className="text-primary">Collection</span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Handpicked masterpieces from the world\'s most prestigious automotive brands
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCars.map((car) => (
                <div 
                  key={car.model}
                  className="group bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {car.badge && (
                      <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-full">
                        {car.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-primary font-medium uppercase tracking-wider">{car.brand}</span>
                    <h3 className="text-lg font-semibold text-foreground mt-1 mb-3">{car.model}</h3>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="text-center p-2 bg-secondary/50 rounded-md">
                        <span className="text-xs font-semibold text-foreground block">{car.power}</span>
                        <span className="text-xs text-muted-foreground">Power</span>
                      </div>
                      <div className="text-center p-2 bg-secondary/50 rounded-md">
                        <span className="text-xs font-semibold text-foreground block">{car.topSpeed}</span>
                        <span className="text-xs text-muted-foreground">Top Speed</span>
                      </div>
                      <div className="text-center p-2 bg-secondary/50 rounded-md">
                        <span className="text-xs font-semibold text-foreground block">{car.acceleration}</span>
                        <span className="text-xs text-muted-foreground">0-60 mph</span>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-primary">{car.price}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/cars"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-secondary transition-colors"
              >
                View All Cars
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-6 bg-card rounded-xl border border-border/50">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="text-primary" size={24} />
                  </div>
                  <span className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</span>
                  <span className="block text-sm text-muted-foreground mt-2">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 md:py-28 px-4 overflow-hidden">
          <Image
            src="/assets/showroom.jpg"
            alt="Showroom"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <span className="inline-block text-sm text-primary font-medium uppercase tracking-wider mb-4">
              Experience
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground">
              Feel the <span className="text-primary">Power</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Step into a world where engineering excellence meets artistic design. 
              Every curve, every detail, crafted for those who demand perfection.
            </p>
            <Link
              href="/cars"
              className="inline-flex items-center gap-2 mt-8 px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Explore Now
            </Link>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </>
  )
}
