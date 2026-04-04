import Link from "next/link";
import { Plus } from "lucide-react";
import VehicleHeader from "@/components/VehicleHeader";
import MetricCard from "@/components/MetricCard";
import AlertBanner from "@/components/AlertBanner";
import { mockVehicle } from "@/mock/mockData";

export default function HomePage() {
  const vehicle = mockVehicle;

  const getRentalKmColor = () => {
    if (!vehicle.rental) return null;
    const percentage = (vehicle.km / vehicle.rental.totalKm) * 100;
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

      {/* Güncel KM */}
      <MetricCard
        label="Güncel KM"
        value={vehicle.km.toLocaleString("tr-TR")}
        subtext={`Son güncelleme: ${vehicle.kmUpdatedAt}`}
      />

      {/* Araç Durumu */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <p className="text-sm text-gray-500 mb-2">Araç Durumu</p>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            vehicle.status === "Kullanıcıda"
              ? "bg-success-50 text-success-700"
              : vehicle.status === "Serviste"
              ? "bg-warning-50 text-warning-700"
              : "bg-primary-50 text-primary-700"
          }`}
        >
          {vehicle.status}
        </span>
      </div>

      {/* Kiralık Araç KM Barı */}
      {vehicle.rental && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-500">Kalan KM</p>
            <span className={`text-sm font-semibold ${getRentalKmColor()}`}>
              {vehicle.rental.remainingKm.toLocaleString("tr-TR")} km
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${
                (vehicle.km / vehicle.rental.totalKm) * 100 >= 90
                  ? "bg-danger-500"
                  : (vehicle.km / vehicle.rental.totalKm) * 100 >= 80
                  ? "bg-warning-500"
                  : "bg-success-500"
              }`}
              style={{
                width: `${Math.min(
                  (vehicle.km / vehicle.rental.totalKm) * 100,
                  100
                )}%`,
              }}
            ></div>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Limit: {vehicle.rental.totalKm.toLocaleString("tr-TR")} km
          </p>
        </div>
      )}

      {/* Metrikler Grid */}
      <div className="grid grid-cols-2 gap-3">
        {vehicle.fuelAvgLPer100 && (
          <MetricCard
            label="Ort. Yakıt"
            value={vehicle.fuelAvgLPer100}
            unit="L/100km"
          />
        )}
        {vehicle.carbonFootprintLevel && (
          <MetricCard
            label="Karbon Ayak İzi"
            value={vehicle.carbonFootprintLevel}
          />
        )}
        {vehicle.drivingScore && (
          <MetricCard label="Sürüş Skoru" value={vehicle.drivingScore} unit="/100" />
        )}
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
