import Image from "next/image"

interface PageHeroProps {
  image: string
  subtitle?: string
  title: string
  titleHighlight?: string
  description?: string
  stats?: Array<{ value: string; label: string }>
}

export function PageHero({ image, subtitle, title, titleHighlight, description, stats }: PageHeroProps) {
  return (
    <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={image}
        alt="Hero background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 py-20 md:py-28 max-w-4xl mx-auto">
        {subtitle && (
          <span className="inline-block text-sm text-primary font-medium uppercase tracking-wider mb-4">
            {subtitle}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight">
          {title}{" "}
          {titleHighlight && <span className="text-primary">{titleHighlight}</span>}
        </h1>
        {description && (
          <p className="mt-4 md:mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div className="mt-8 md:mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</span>
                <span className="block text-sm text-muted-foreground mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
