import type { Metadata } from "next"

import { AddEventForm } from "@/components/add-event-form"

export const metadata: Metadata = {
  title: "Create a New Event | TogetherWe",
  description:
    "Create a community event, add the details, and preview it live before publishing.",
}

export default function AddNewEventPage() {
  return (
    <main className="flex flex-1 flex-col bg-[#f7f8f4]">
      <AddEventForm />
    </main>
  )
}
