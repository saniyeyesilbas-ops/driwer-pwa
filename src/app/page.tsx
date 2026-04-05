import Link from "next/link";
import { Plus } from "lucide-react";
import VehicleHeader from "@/components/VehicleHeader";
import MetricCard from "@/components/MetricCard";
import AlertBanner from "@/components/AlertBanner";
import { mockVehicle } from "@/mock/mockData";
import { formatDateTr } from "@/lib/format";

export default function HomePage() {
  const vehicle = mockVehicle;

  // Rental alan adları için güvenli fallback
  const totalKm = vehicle.rental?.totalKm ?? vehicle.rental?.kmLimit ?? 0;
  const remainingKm = vehicle.rental?.remainingKm ?? vehicle.rental?.kmRemaining ?? 0;
  const hasValidRental = totalKm > 0;

  const getRentalKmColor = () => {
    if (!hasValidRental) return null;
    const percentage = (vehicle.km / totalKm) * 100;
    if (percentage >= 90) return "text-danger-600";
    if (percentage >= 80) return "text-warning-600";
    return "text-success-600";
  };

  return (
    <div className="p-4 space-y-4">
      {/* Yeni Talep Butonu */}
      <Link
        href="/new-request/step-1"
        className="flex items-center justify-center gap-2 w-full bg-primary-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
      >
        <Plus className="w-6 h-6" />
        Yeni Talep
      </Link>

      {/* Araç Bilgi Kartı */}
      <VehicleHeader vehicle={vehicle} />

      {/* Kiralık Araç KM Barı - sadece geçerli totalKm varsa göster */}
      {vehicle.rental && hasValidRental && (
        <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-500">Kalan KM</p>
            <span className={`text-sm font-semibold ${getRentalKmColor()}`}>
              {remainingKm.toLocaleString("tr-TR")} km
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                (vehicle.km / totalKm) * 100 >= 90
                  ? "bg-danger-500"
                  : (vehicle.km / totalKm) * 100 >= 80
                  ? "bg-warning-500"
                  : "bg-success-500"
              }`}
              style={{
                width: `${Math.min(
                  (vehicle.km / totalKm) * 100,
                  100
                )}%`,
              }}
            ></div>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Limit: {totalKm.toLocaleString("tr-TR")} km
          </p>
        </div>
      )}

      {/* Metrikler Grid - 2x2 (her zaman 4 kutu) */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          label="Güncel KM"
          value={vehicle.km.toLocaleString("tr-TR")}
          subtext={`Son: ${formatDateTr(vehicle.kmUpdatedAt)}`}
        />
        <MetricCard
          label="Ort. Yakıt"
          value={vehicle.fuelAvgLPer100 ?? "—"}
          unit={vehicle.fuelAvgLPer100 ? "L/100km" : ""}
        />
        <MetricCard
          label="Karbon Ayak İzi"
          value={vehicle.carbonFootprintLevel ?? "—"}
        />
        <MetricCard
          label="Sürüş Skoru"
          value={vehicle.drivingScore ?? "—"}
          unit={vehicle.drivingScore ? "/100" : ""}
        />
      </div>

      {/* Kritik Uyarılar */}
      {vehicle.criticalAlerts && vehicle.criticalAlerts.length > 0 && (
        <div className="space-y-2">
          {vehicle.criticalAlerts.map((alert, index) => (
            <AlertBanner key={index} message={alert} type="error" />
          ))}
        </div>
      )}
    </div>
  );
}
