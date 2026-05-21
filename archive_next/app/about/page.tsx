import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { Car, Gem, Handshake, Heart } from "lucide-react"

const timeline = [
  { year: "2001", title: "The Beginning", description: "Veluxe Motors opens its first showroom in Beverly Hills with a collection of 12 premium vehicles." },
  { year: "2008", title: "European Expansion", description: "Partnership established with leading European manufacturers, expanding our exotic collection." },
  { year: "2015", title: "Award Recognition", description: "Named \"Best Luxury Dealership\" by Premium Auto Magazine for the third consecutive year." },
  { year: "2020", title: "Digital Evolution", description: "Launch of our state-of-the-art virtual showroom experience, bringing luxury to clients worldwide." },
  { year: "2024", title: "Electric Future", description: "Introduction of our exclusive electric supercar collection, embracing sustainable luxury." },
]

const team = [
  { initials: "RM", name: "Richard Morrison", role: "Founder & CEO" },
  { initials: "EV", name: "Elena Vasquez", role: "Head of Sales" },
  { initials: "DK", name: "David Kim", role: "Master Technician" },
  { initials: "SC", name: "Sarah Chen", role: "Client Experience Director" },
]

const values = [
  { icon: Gem, title: "Excellence", description: "We pursue perfection in every detail, from the vehicles we select to the service we provide." },
  { icon: Handshake, title: "Integrity", description: "Transparency and honesty form the foundation of every client relationship we build." },
  { icon: Heart, title: "Passion", description: "Our love for exceptional automobiles drives us to exceed expectations every day." },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">
        <PageHero
          image="/assets/showroom.jpg"
          subtitle="Our Story"
          title="About"
          titleHighlight="Veluxe Motors"
          description="A legacy of excellence in luxury automotive curation since 2001"
        />

        {/* Story Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-6">
                  Redefining <span className="text-primary">Luxury</span> Automotive
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Founded in 2001, Veluxe Motors emerged from a singular vision: to create an 
                    automotive experience that transcends the ordinary. We believed that acquiring 
                    a luxury vehicle should be as extraordinary as the cars themselves.
                  </p>
                  <p>
                    Today, we stand as a beacon of excellence in the premium automotive industry, 
                    offering an unparalleled selection of the world\'s most prestigious vehicles. 
                    Our commitment to exceptional service, combined with our deep understanding 
                    of luxury automobiles, has made us the destination of choice for discerning collectors and enthusiasts.
                  </p>
                  <p>
                    Every vehicle in our collection is meticulously selected and inspected to meet 
                    the exacting standards our clients expect. From rare supercars to elegant sedans, 
                    we curate only the finest examples of automotive artistry.
                  </p>
                </div>
                <Link
                  href="/cars"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Car size={20} />
                  View Our Collection
                </Link>
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src="/assets/showroom.jpg"
                  alt="Veluxe Motors Showroom"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 md:py-24 px-4 bg-[oklch(0.15_0_0)]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                Our <span className="text-primary">Journey</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Milestones that shaped our legacy of excellence
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

              {/* Timeline Items */}
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div 
                    key={item.year}
                    className={`relative flex items-start gap-6 md:gap-0 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1.5 mt-2 md:-translate-x-1.5 z-10" />
                    
                    {/* Content */}
                    <div className={`ml-10 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <div className="p-6 bg-card rounded-xl border border-border/50">
                        <span className="text-primary font-bold text-lg">{item.year}</span>
                        <h3 className="text-lg font-semibold text-foreground mt-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                Meet Our <span className="text-primary">Team</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Passionate experts dedicated to delivering exceptional experiences
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div 
                  key={member.name}
                  className="p-6 bg-card rounded-xl border border-border/50 text-center"
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-primary">{member.initials}</span>
                  </div>
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 px-4 bg-[oklch(0.15_0_0)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                Our <span className="text-primary">Values</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                The principles that guide every interaction
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {values.map((value) => (
                <div 
                  key={value.title}
                  className="p-8 bg-card rounded-xl border border-border/50 text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="text-primary" size={28} />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
