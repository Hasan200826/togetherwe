"use client"

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
} from "react"
import Image from "next/image"
import {
  Broom,
  CalendarDays,
  CheckCircle2,
  CloudUpload,
  Gift,
  Leaf,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Sprout,
  Stethoscope,
  Tag,
  Trash2,
  UsersRound,
  type LucideIcon,
} from "lucide-react"

import { EventPreviewCard } from "@/components/event-preview-card"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type FormState = {
  title: string
  category: string
  description: string
  date: string
  location: string
}

type FormErrors = Partial<Record<keyof FormState | "image", string>>

type UploadedImage = {
  url: string
  name: string
  file: File
}

const INITIAL_FORM: FormState = {
  title: "",
  category: "",
  description: "",
  date: "",
  location: "",
}

const CATEGORIES: { value: string; icon: LucideIcon }[] = [
  { value: "Cleanup", icon: Broom },
  { value: "Plantation", icon: Sprout },
  { value: "Donation", icon: Gift },
  { value: "Health", icon: Stethoscope },
  { value: "Environment", icon: Leaf },
  { value: "Social", icon: UsersRound },
  { value: "Others", icon: Tag },
]

const FIELD_ORDER: (keyof FormState | "image")[] = [
  "title",
  "category",
  "description",
  "date",
  "location",
  "image",
]

const MAX_IMAGE_SIZE = 5 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"]

function getTodayISO() {
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")

  return `${today.getFullYear()}-${month}-${day}`
}

export function AddEventForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [image, setImage] = useState<UploadedImage | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const objectUrlRef = useRef<string | null>(null)
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current)
      }
    }
  }, [])

  function updateField(field: keyof FormState, value: string) {
    setForm((previous) => ({ ...previous, [field]: value }))
    setErrors((previous) => {
      if (!previous[field]) {
        return previous
      }

      const next = { ...previous }
      delete next[field]
      return next
    })

    if (isSubmitted) {
      setIsSubmitted(false)
    }
  }

  function handleImageFile(file: File) {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setErrors((previous) => ({
        ...previous,
        image: "Please choose a PNG, JPG or WebP image.",
      }))
      return
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setErrors((previous) => ({
        ...previous,
        image: "That image is too large. Please choose a file under 5MB.",
      }))
      return
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
    }

    const url = URL.createObjectURL(file)
    objectUrlRef.current = url
    setImage({ url, name: file.name, file })
    setErrors((previous) => {
      const next = { ...previous }
      delete next.image
      return next
    })
    setIsSubmitted(false)
  }

  function handleFileInput(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (file) {
      handleImageFile(file)
    }

    event.target.value = ""
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragging(false)

    const file = event.dataTransfer.files?.[0]

    if (file) {
      handleImageFile(file)
    }
  }

  function removeImage() {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
      objectUrlRef.current = null
    }

    setImage(null)
    setIsSubmitted(false)
  }

  function validate() {
    const next: FormErrors = {}
    const title = form.title.trim()
    const description = form.description.trim()
    const location = form.location.trim()

    if (title.length < 3) {
      next.title = "Please enter an event title with at least 3 characters."
    }

    if (!form.category) {
      next.category = "Please choose a category for your event."
    }

    if (description.length < 10) {
      next.description =
        "Please describe your event with at least 10 characters."
    }

    if (!form.date) {
      next.date = "Please choose a date for your event."
    } else if (form.date < getTodayISO()) {
      next.date = "Please choose today or a future date."
    }

    if (!location) {
      next.location = "Please add a location for your event."
    }

    return next
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)

    const firstInvalidField = FIELD_ORDER.find((field) => nextErrors[field])

    if (firstInvalidField) {
      setIsSubmitted(false)
      document.getElementById(`event-${firstInvalidField}`)?.focus()
      return
    }

    const eventData = {
      title: form.title.trim(),
      category: form.category,
      description: form.description.trim(),
      date: form.date,
      location: form.location.trim(),
      image: image?.file ?? null,
    }

    console.log("Create Event:", eventData)

    setIsSubmitted(true)
    requestAnimationFrame(() => {
      successRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
      successRef.current?.focus({ preventScroll: true })
    })
  }

  function handleReset() {
    setForm(INITIAL_FORM)
    setErrors({})
    setIsSubmitted(false)
    removeImage()
    document.getElementById("event-title")?.focus()
  }

  return (
    <div className="flex flex-1 flex-col bg-[#f7f8f4]">
      <section className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-10 lg:py-12">
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem] xl:gap-8">
          <form
            id="create-event-form"
            noValidate
            onSubmit={handleSubmit}
            className="flex min-w-0 flex-col gap-5"
          >
            {isSubmitted ? (
              <div
                ref={successRef}
                role="status"
                tabIndex={-1}
                className="flex items-start gap-3 rounded-2xl border border-brand/25 bg-brand-soft px-4 py-3.5 text-brand-strong shadow-sm outline-none"
              >
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-brand"
                />
                <div>
                  <p className="text-sm font-semibold">Your event is ready!</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-brand-strong/75">
                    &quot;{form.title.trim()}&quot; was created successfully.
                    Check the preview, or reset the form to create another
                    event.
                  </p>
                </div>
              </div>
            ) : null}

            <Card className="gap-0 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_18px_40px_-30px_rgba(12,81,38,0.35)] ring-0">
              <CardHeader className="border-b border-zinc-100 px-5 py-5 sm:px-6">
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                    <CalendarDays aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <CardTitle className="font-heading text-xl font-bold text-brand-strong">
                      Event Information
                    </CardTitle>
                    <CardDescription className="mt-1 text-sm leading-relaxed">
                      Tell people what your event is about, when it happens, and
                      where to find you.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-5 px-5 py-5 sm:space-y-6 sm:px-6 sm:py-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <Label
                      htmlFor="event-title"
                      className="text-[0.82rem] font-semibold text-zinc-800"
                    >
                      Event Title
                      <span aria-hidden="true" className="text-brand">
                        *
                      </span>
                      <span className="sr-only">(required)</span>
                    </Label>
                    <span className="text-[0.7rem] text-zinc-400">
                      {form.title.length}/80
                    </span>
                  </div>
                  <Input
                    id="event-title"
                    name="title"
                    value={form.title}
                    maxLength={80}
                    placeholder="e.g. Beach Cleanup Drive"
                    aria-invalid={Boolean(errors.title)}
                    aria-describedby={
                      errors.title ? "event-title-error" : undefined
                    }
                    onChange={(event) =>
                      updateField("title", event.target.value)
                    }
                    className="h-10 rounded-xl border-zinc-200 bg-white px-3.5 text-sm shadow-none focus-visible:border-brand focus-visible:ring-brand/20 sm:h-11"
                  />
                  {errors.title ? (
                    <p
                      id="event-title-error"
                      className="text-xs font-medium text-destructive"
                    >
                      {errors.title}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Label
                    id="event-category-label"
                    className="text-[0.82rem] font-semibold text-zinc-800"
                  >
                    Category
                    <span aria-hidden="true" className="text-brand">
                      *
                    </span>
                    <span className="sr-only">(required)</span>
                  </Label>
                  <div
                    id="event-category"
                    role="group"
                    aria-labelledby="event-category-label"
                    aria-describedby={
                      errors.category ? "event-category-error" : undefined
                    }
                    tabIndex={-1}
                    className="flex flex-wrap gap-2 rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-brand/20"
                  >
                    {CATEGORIES.map(({ value, icon: Icon }) => {
                      const active = form.category === value

                      return (
                        <button
                          key={value}
                          type="button"
                          aria-pressed={active}
                          onClick={() => updateField("category", value)}
                          className={cn(
                            "inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:outline-none",
                            active
                              ? "border-brand bg-brand text-white shadow-sm"
                              : "border-zinc-200 bg-white text-zinc-600 hover:border-brand/40 hover:bg-brand-soft hover:text-brand-strong"
                          )}
                        >
                          <Icon aria-hidden="true" className="size-3.5" />
                          {value}
                        </button>
                      )
                    })}
                  </div>
                  <input
                    type="hidden"
                    name="category"
                    value={form.category}
                  />
                  {errors.category ? (
                    <p
                      id="event-category-error"
                      className="text-xs font-medium text-destructive"
                    >
                      {errors.category}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <Label
                      htmlFor="event-description"
                      className="text-[0.82rem] font-semibold text-zinc-800"
                    >
                      Description
                      <span aria-hidden="true" className="text-brand">
                        *
                      </span>
                      <span className="sr-only">(required)</span>
                    </Label>
                    <span className="text-[0.7rem] text-zinc-400">
                      {form.description.length}/300
                    </span>
                  </div>
                  <Textarea
                    id="event-description"
                    name="description"
                    value={form.description}
                    maxLength={300}
                    rows={4}
                    placeholder="What is this event about? Share the purpose, who can join, and what to bring."
                    aria-invalid={Boolean(errors.description)}
                    aria-describedby={
                      errors.description
                        ? "event-description-error"
                        : undefined
                    }
                    onChange={(event) =>
                      updateField("description", event.target.value)
                    }
                    className="min-h-[7.5rem] resize-y rounded-xl border-zinc-200 bg-white px-3.5 py-3 text-sm shadow-none focus-visible:border-brand focus-visible:ring-brand/20"
                  />
                  {errors.description ? (
                    <p
                      id="event-description-error"
                      className="text-xs font-medium text-destructive"
                    >
                      {errors.description}
                    </p>
                  ) : null}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="event-date"
                      className="text-[0.82rem] font-semibold text-zinc-800"
                    >
                      Event Date
                      <span aria-hidden="true" className="text-brand">
                        *
                      </span>
                      <span className="sr-only">(required)</span>
                    </Label>
                    <Input
                      id="event-date"
                      name="date"
                      type="date"
                      value={form.date}
                      aria-invalid={Boolean(errors.date)}
                      aria-describedby={
                        errors.date ? "event-date-error" : undefined
                      }
                      onChange={(event) =>
                        updateField("date", event.target.value)
                      }
                      className="h-10 rounded-xl border-zinc-200 bg-white px-3.5 text-sm shadow-none focus-visible:border-brand focus-visible:ring-brand/20 sm:h-11"
                    />
                    {errors.date ? (
                      <p
                        id="event-date-error"
                        className="text-xs font-medium text-destructive"
                      >
                        {errors.date}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="event-location"
                      className="text-[0.82rem] font-semibold text-zinc-800"
                    >
                      Location
                      <span aria-hidden="true" className="text-brand">
                        *
                      </span>
                      <span className="sr-only">(required)</span>
                    </Label>
                    <Input
                      id="event-location"
                      name="location"
                      value={form.location}
                      maxLength={80}
                      placeholder="e.g. Cox's Bazar, Chattogram"
                      aria-invalid={Boolean(errors.location)}
                      aria-describedby={
                        errors.location ? "event-location-error" : undefined
                      }
                      onChange={(event) =>
                        updateField("location", event.target.value)
                      }
                      className="h-10 rounded-xl border-zinc-200 bg-white px-3.5 text-sm shadow-none focus-visible:border-brand focus-visible:ring-brand/20 sm:h-11"
                    />
                    {errors.location ? (
                      <p
                        id="event-location-error"
                        className="text-xs font-medium text-destructive"
                      >
                        {errors.location}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <Label className="text-[0.82rem] font-semibold text-zinc-800">
                      Event Image
                    </Label>
                    <span className="text-[0.7rem] font-medium text-zinc-400">
                      Optional · Max 5MB
                    </span>
                  </div>

                  <input
                    ref={fileInputRef}
                    id="event-image"
                    name="image"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    aria-describedby={
                      errors.image ? "event-image-error" : undefined
                    }
                    className="sr-only"
                    onChange={handleFileInput}
                  />

                  {image ? (
                    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                      <div className="relative aspect-[16/9] w-full bg-zinc-100">
                        <Image
                          src={image.url}
                          alt={`Preview of ${image.name}`}
                          fill
                          unoptimized
                          sizes="(min-width: 1024px) 640px, 100vw"
                          className="object-cover"
                        />
                        <div className="absolute right-2.5 bottom-2.5 flex items-center gap-2">
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                            className="h-8 rounded-full bg-white/95 px-3 text-xs text-zinc-800 shadow-sm hover:bg-white"
                          >
                            Replace
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon-sm"
                            aria-label="Remove selected image"
                            onClick={removeImage}
                            className="rounded-full bg-white/95 text-red-600 shadow-sm hover:bg-white"
                          >
                            <Trash2 aria-hidden="true" className="size-3.5" />
                          </Button>
                        </div>
                      </div>
                      <p className="truncate border-t border-zinc-100 px-3.5 py-2 text-[0.7rem] text-zinc-500">
                        {image.name}
                      </p>
                    </div>
                  ) : (
                    <div
                      onDragEnter={(event) => {
                        event.preventDefault()
                        setIsDragging(true)
                      }}
                      onDragOver={(event) => {
                        event.preventDefault()
                        setIsDragging(true)
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      className={cn(
                        "rounded-2xl border-2 border-dashed transition-colors",
                        isDragging
                          ? "border-brand bg-brand-soft"
                          : "border-zinc-200 bg-white hover:border-brand/40 hover:bg-brand-soft/40"
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl px-6 py-8 text-center focus-visible:ring-3 focus-visible:ring-brand/25 focus-visible:outline-none"
                      >
                        <span className="grid size-11 place-items-center rounded-full bg-brand-soft text-brand">
                          <CloudUpload
                            aria-hidden="true"
                            className="size-5"
                          />
                        </span>
                        <span className="text-sm font-semibold text-zinc-700">
                          Click to upload or drag and drop
                        </span>
                        <span className="text-xs text-zinc-400">
                          PNG, JPG or WebP — up to 5MB
                        </span>
                      </button>
                    </div>
                  )}

                  {errors.image ? (
                    <p
                      id="event-image-error"
                      className="text-xs font-medium text-destructive"
                    >
                      {errors.image}
                    </p>
                  ) : null}
                </div>
              </CardContent>

              <CardFooter className="flex flex-col-reverse gap-3 border-t border-zinc-100 bg-[#fbfcf8] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <p className="text-[0.7rem] text-zinc-400">
                  <span className="text-brand">*</span> Required fields
                </p>
                <div className="flex w-full gap-2 sm:w-auto">
                  <Button
                    type="button"
                    variant="outline"
                    size="pill"
                    onClick={handleReset}
                    className="h-10 flex-1 border-zinc-200 px-5 text-zinc-600 hover:border-brand/30 hover:bg-brand-soft hover:text-brand-strong sm:flex-none"
                  >
                    <RotateCcw aria-hidden="true" className="size-4" />
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    variant="brand"
                    size="pill"
                    className="h-10 flex-1 px-5 sm:flex-none"
                  >
                    <Sparkles aria-hidden="true" className="size-4" />
                    Create Event
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </form>

          <div className="lg:sticky lg:top-24">
            <EventPreviewCard
              data={{
                title: form.title.trim(),
                category: form.category,
                description: form.description.trim(),
                date: form.date,
                location: form.location.trim(),
                imageUrl: image?.url ?? null,
              }}
            />
          </div>
        </div>

        <aside
          aria-label="Tip for creating an event"
          className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200/70 bg-amber-50/70 px-4 py-3.5 sm:mt-8 sm:items-center sm:px-5"
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-amber-100 text-amber-600">
            <Lightbulb aria-hidden="true" className="size-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-amber-900">
              Make your event stand out
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-amber-800/80">
              A clear title, a friendly description, and a bright cover image
              help more people find and join your event.
            </p>
          </div>
        </aside>
      </section>
    </div>
  )
}
