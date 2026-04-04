"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Car, Bell, History, User } from "lucide-react";

const navItems = [
  { href: "/", label: "Aracım", icon: Car },
  { href: "/notifications", label: "Bildirimlerim", icon: Bell },
  { href: "/history", label: "Geçmişim", icon: History },
  { href: "/profile", label: "Profil", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                isActive
                  ? "text-primary-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
