import NotificationItem from "@/components/NotificationItem";
import { mockNotifications } from "@/mock/mockData";

export default function NotificationsPage() {
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Bildirimlerim</h1>
        {unreadCount > 0 && (
          <span className="bg-danger-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
            {unreadCount} yeni
          </span>
        )}
      </div>

      {mockNotifications.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Henüz bildirim bulunmuyor.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {mockNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      )}
    </div>
  );
}
