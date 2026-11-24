"use client";
import Image from "next/image";
import { Mail, Leaf } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import bannerImage from "@/Images/benner.jpg";
import donationImage from "@/Images/Gemini_Generated_Image_clt2quclt2quclt2 (1).jpg";
import educationImage from "@/Images/Gemini_Generated_Image_clt2quclt2quclt2 (2).jpg";
import cleanupImage from "@/Images/Gemini_Generated_Image_clt2quclt2quclt2 (3).jpg";
import communityImage from "@/Images/image.png";

const GALLERY = [
  {
    image: cleanupImage,
    alt: "Volunteers cleaning up a riverside together",
  },
  {
    image: educationImage,
    alt: "Children taking part in a community learning session",
  },
  {
    image: donationImage,
    alt: "Volunteers helping the community",
  },
  {
    image: bannerImage,
    alt: "Community members planting a sapling",
  },
  {
    image: communityImage,
    alt: "TogetherWe community members",
  },
] as const;

interface CommunityGallerySectionProps {
  className?: string;
}

export function CommunityGallerySection({
  className,
}: CommunityGallerySectionProps) {
  return (
    <section
      aria-labelledby="community-gallery-title"
      className={cn("bg-[#fdfbf7] px-4 py-8 sm:px-6 lg:px-8", className)}
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Gallery Heading */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-green-600 sm:w-16" />

            <Leaf className="size-5 fill-green-700 text-green-700" />

            <span className="h-px w-12 bg-gradient-to-l from-transparent to-green-600 sm:w-16" />
          </div>

          <h2
            id="community-gallery-title"
            className="mt-2 text-2xl font-bold tracking-tight text-[#064e2b] sm:text-3xl"
          >
            Our Community Gallery
          </h2>

          <p className="mt-1 text-sm text-gray-600 sm:text-base">
            Moments that inspire change
          </p>
        </div>

        {/* Gallery Images */}
        <Card className="gap-0 overflow-hidden rounded-2xl bg-transparent py-0 shadow-none">
          <CardHeader className="hidden">
            <CardTitle>Community Gallery Images</CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {GALLERY.map(({ image, alt }) => (
                <div
                  key={alt}
                  className="group relative aspect-[8/5] overflow-hidden rounded-xl"
                >
                  <Image
                    src={image}
                    alt={alt}
                    placeholder="blur"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </CardContent>

          {/* Newsletter Section */}
          <CardFooter className="mt-8 p-0">
            <div className="relative flex w-full flex-col items-center justify-between gap-5 overflow-hidden rounded-2xl bg-gradient-to-r from-[#064e2b] via-[#086332] to-[#064e2b] px-5 py-7 text-white sm:px-8 lg:flex-row lg:px-10">
              {/* Decorative Leaves */}
              <Leaf className="absolute -bottom-5 -left-3 size-24 rotate-[-35deg] text-green-400/20" />
              <Leaf className="absolute -bottom-7 left-8 size-16 rotate-[-15deg] text-green-400/15" />

              {/* Newsletter Content */}
              <div className="relative z-10 flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/15 sm:size-14">
                  <Mail
                    className="size-7 text-white sm:size-8"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold sm:text-xl">
                    Subscribe to Our Newsletter
                  </h3>

                  <p className="mt-1 text-xs text-green-100 sm:text-sm">
                    Get the latest updates about our events and community
                    activities.
                  </p>
                </div>
              </div>

              {/* Subscribe Form */}
              <form
                className="relative z-10 flex w-full max-w-md items-center rounded-full bg-white p-1"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input
                  type="email"
                  required
                  aria-label="Email address"
                  placeholder="Enter your email address"
                  className="h-10 min-w-0 flex-1 rounded-full border-0 bg-transparent px-4 text-sm text-gray-800 shadow-none placeholder:text-gray-500 focus-visible:ring-0"
                />

                <Button
                  type="submit"
                  className="h-10 shrink-0 rounded-full border border-green-700 bg-[#ffad19] px-5 text-sm font-semibold text-green-950 hover:bg-[#f59e0b]"
                >
                  Subscribe
                </Button>
              </form>

              {/* Decorative Icon */}
              <div className="absolute right-4 top-4 flex rotate-12 flex-col gap-1 text-yellow-400">
                <span className="h-5 w-1 rounded-full bg-yellow-400" />
                <span className="ml-3 h-3 w-1 rounded-full bg-yellow-400" />
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
