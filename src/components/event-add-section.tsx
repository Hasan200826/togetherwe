
import Link from "next/link";
import {
  CalendarDays,
  Plus,
  ArrowRight,
  Leaf,
} from "lucide-react";

export default function AddEventBtn() {
  return (
    <section className="relative mb-10 flex min-h-[100px] w-full items-center justify-between gap-3 overflow-hidden rounded-xl border border-green-100 bg-gradient-to-r from-[#e1f6c9] via-[#f3ffe8] to-[#d9f5b9] px-4 py-4 shadow-sm sm:px-6 sm:py-5 md:px-8 md:py-6 lg:px-10 lg:py-7">

      {/* Left Leaf Decoration */}
      <div className="pointer-events-none absolute -left-2 -top-3 text-green-600/60">
        <Leaf
          size={35}
          className="fill-green-500/40 sm:h-[45px] sm:w-[45px] -rotate-45"
        />
        <Leaf
          size={28}
          className="ml-5 -mt-5 rotate-45 fill-green-600/40 sm:h-[35px] sm:w-[35px]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-w-0 items-center gap-2 sm:gap-4">

        {/* Calendar Icon */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center text-green-800 sm:h-11 sm:w-11 md:h-14 md:w-14">
          <CalendarDays
            size={25}
            strokeWidth={2.8}
            className="sm:h-8 sm:w-8 md:h-9 md:w-9"
          />
        </div>

        {/* Text */}
        <div className="min-w-0">
          <h2 className="my-1 text-sm font-bold leading-tight text-green-950 sm:text-lg md:text-xl lg:text-2xl">
            Want to Organize an Event?
          </h2>

          <p className="text-[10px] leading-relaxed text-gray-800 sm:text-xs md:text-sm">
            Create your own event and inspire others to join.
          </p>
        </div>
      </div>

      {/* Button */}
      <Link
        href="/upcoming-events/add-newevent"
        className="relative z-10 flex shrink-0 items-center gap-1 rounded-full bg-green-900 px-2.5 py-2 text-[9px] font-semibold text-white shadow-sm transition-all hover:bg-green-800 hover:shadow-md sm:gap-1.5 sm:px-4 sm:py-2.5 sm:text-xs md:px-5 md:text-sm"
      >
        <Plus size={12} className="sm:h-4 sm:w-4" />
        <span>Create Event</span>
        <ArrowRight size={12} className="sm:h-4 sm:w-4" />
      </Link>

      {/* Right Leaf Decoration */}
      <div className="pointer-events-none absolute -bottom-5 -right-2 text-green-600/50">
        <Leaf
          size={32}
          className="rotate-45 fill-green-500/40 sm:h-10 sm:w-10"
        />
        <Leaf
          size={25}
          className="-ml-4 -mt-5 -rotate-45 fill-green-600/40 sm:h-[30px] sm:w-[30px]"
        />
      </div>
    </section>
  );
}
