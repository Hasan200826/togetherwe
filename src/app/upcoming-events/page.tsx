import type { Metadata } from "next"

import { UpcomingEventsHero } from "@/components/upcoming-events-hero"
import { UpcomingEventsSection } from "@/components/upcoming-events-section"
import AddEventBtn from "@/components/event-add-section"

export const metadata: Metadata = {
  title: "Upcoming Events | TogetherWe",
  description:
    "Be a part of our upcoming community events and make a difference together.",
}

export default function UpcomingEventsPage() {
  return (
    <main className="flex flex-1 flex-col bg-white">
      <UpcomingEventsHero />
      <UpcomingEventsSection />
      <AddEventBtn/>
    </main>
  )
}