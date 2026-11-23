import {CommunityGallerySection}  from "@/components/community-gallery-section"
import { EventsSection } from "@/components/events-section"
import { FeaturesSection } from "@/components/features-section"
import { HeroSession } from "@/components/hero-session"

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-white">
      <HeroSession />
      <FeaturesSection />
      <EventsSection />
      <CommunityGallerySection/>
    </main>
  )
}
