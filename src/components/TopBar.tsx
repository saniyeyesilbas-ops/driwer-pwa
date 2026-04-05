"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import Image from "next/image";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 h-14 max-w-md mx-auto">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="VERO"
            width={80}
            height={32}
            className="h-8 w-auto"
          />
        </div>
        <Link
          href="tel:08501234567"
          className="flex items-center gap-1.5 bg-danger-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-danger-600 transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span>Acil Yol Yardim</span>
        </Link>
      </div>
    </header>
  );
}
