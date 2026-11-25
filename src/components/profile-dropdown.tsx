"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import {
  UserRound,
  CalendarDays,
  Users,
  Plus,
  Settings,
  Moon,
  LogOut,
  ChevronDown,
  Bell,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    label: "My Profile",
    href: "/profile",
    icon: UserRound,
    active: true,
  },
  {
    label: "My Events",
    href: "/my-events",
    icon: CalendarDays,
  },
  {
    label: "Joined Events",
    href: "/joined-events",
    icon: Users,
  },
  {
    label: "Create Event",
    href: "/create-event",
    icon: Plus,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function ProfileDropdown() {
  const { setTheme } = useTheme();
  // Better Auth session
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  if (isPending) {
    return (
      <header className="sticky top-0 z-50 h-18 w-full border-b bg-white" />
    );
  }

  // const router = useRouter();
  const handleLogOutBtn = async () => {
    // router.refresh();
    await authClient.signOut();
  };

  return (
    <div className="flex items-center gap-5">
      {/* Notification */}
      <button className="relative text-gray-700">
        <Bell className="h-7 w-7" />

        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
          3
        </span>
      </button>

      {/* Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-3 rounded-full bg-green-50 px-4 py-2 outline-none transition hover:bg-green-100">
            <Avatar className="h-9 w-9 bg-green-700">
              <AvatarImage src="/profile.jpg" alt="Hasan" />
              <AvatarFallback>HM</AvatarFallback>
            </Avatar>

            <span className="text-sm font-semibold text-green-900">
              {session?.user.name}
            </span>

            <ChevronDown className="h-4 w-4 text-green-800" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={12}
          className="w-[290px] rounded-xl border border-gray-100 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-gray-900"
        >
          {/* User Information */}
          <div className="flex items-center gap-3 px-3 py-3">
            <Avatar className="h-14 w-14">
              <AvatarImage src="/profile.jpg" alt="Hasan Mahamud" />
              <AvatarFallback>HM</AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-1">
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {session?.user.name}
              </p>

              <p className="text-xs text-gray-500">{session?.user.email}</p>
            </div>
          </div>

          <DropdownMenuSeparator />

          {/* Menu Items */}
          <div className="space-y-1 py-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <DropdownMenuItem
                  key={item.label}
                  asChild
                  className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                    item.active
                      ? "bg-green-100 text-green-800 focus:bg-green-100 focus:text-green-800"
                      : "text-gray-800 focus:bg-green-50 dark:text-gray-200 dark:focus:bg-gray-800"
                  }`}
                >
                  <Link href={item.href} className=" flex gap-2">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </div>

          <DropdownMenuSeparator />

          {/* Dark Mode */}
          <DropdownMenuItem
            onSelect={() => setTheme("dark")}
            className="flex cursor-pointer gap-3 rounded-lg px-3 py-2.5 text-sm font-medium"
          >
            <Moon className="h-4 w-4" />
            Toggle Dark Mode
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Logout */}
          <DropdownMenuItem
            onClick={handleLogOutBtn}
            className="flex cursor-pointer gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-500 focus:bg-red-50 focus:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
