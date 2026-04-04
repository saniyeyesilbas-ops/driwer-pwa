"use client";

import Link from "next/link";
import { Notification } from "@/lib/types";

interface NotificationItemProps {
  notification: Notification;
}

export default function NotificationItem({ notification }: NotificationItemProps) {
  return (
    <div
      className={`bg-white rounded-xl border p-4 shadow-sm ${
        notification.read ? "border-gray-200" : "border-primary-500 bg-primary-50/30"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{notification.title}</h3>
          {notification.body && (
            <p className="text-sm text-gray-600 mt-1">{notification.body}</p>
          )}
          <p className="text-xs text-gray-400 mt-2">{notification.createdAt}</p>
        </div>
      </div>
      <div className="mt-3">
        <Link
          href={notification.actionHref}
          className="inline-flex items-center justify-center w-full bg-primary-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
        >
          {notification.actionLabel}
        </Link>
      </div>
    </div>
  );
}
