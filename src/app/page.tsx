import Link from "next/link";
import { Plus, Wrench, AlertCircle } from "lucide-react";
import VehicleHeader from "@/components/VehicleHeader";
import MetricCard from "@/components/MetricCard";
import AlertBanner from "@/components/AlertBanner";
import { mockVehicle, mockOpenRequests, requestTypes } from "@/mock/mockData";
import { formatDateTr } from "@/lib/format";
import { NewRequestData } from "@/lib/types";

function getRequestIcon(type: string) {
  switch (type) {
    case "BAKIM":
      return <Wrench className="w-5 h-5" />;
    case "HASAR_KAZA":
    case "ARIZA":
      return <AlertCircle className="w-5 h-5" />;
    default:
      return <AlertCircle className="w-5 h-5" />;
  }
}

function getRequestLabel(type: string) {
  return requestTypes.find((rt) => rt.value === type)?.label || type;
}

export default function HomePage() {
  const vehicle = mockVehicle;
  const openRequests = mockOpenRequests.filter((req) => req.status === "ACIK");

  // Rental alan adlari icin guvenli fallback (TypeScript hatasi icin any cast)
  const rental = vehicle.rental as any;
  const totalKm = rental?.totalKm ?? rental?.kmLimit ?? 0;
  const remainingKm = rental?.remainingKm ?? rental?.kmRemaining ?? 0;
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

      {/* Arac Bilgi Karti */}
      <VehicleHeader vehicle={vehicle} />

      {/* Kiralik Arac KM Bari - sadece gecerli totalKm varsa goster */}
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
          label="Guncel KM"
          value={vehicle.km.toLocaleString("tr-TR")}
          subtext={`Son: ${formatDateTr(vehicle.kmUpdatedAt)}`}
        />
        <MetricCard
          label="Ort. Yakit"
          value={vehicle.fuelAvgLPer100 ?? "—"}
          unit={vehicle.fuelAvgLPer100 ? "L/100km" : ""}
        />
        <MetricCard
          label="Karbon Ayak Izi"
          value={vehicle.carbonFootprintLevel ?? "—"}
        />
        <MetricCard
          label="Surus Skoru"
          value={vehicle.drivingScore ?? "—"}
          unit={vehicle.drivingScore ? "/100" : ""}
        />
      </div>

      {/* Acik Talepler - 2x2 Gridin altinda */}
      {openRequests.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Acik Taleplerim</h3>
          <div className="grid grid-cols-1 gap-3">
            {openRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-xl border border-warning-200 p-4 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-warning-50 rounded-lg text-warning-600">
                    {getRequestIcon(request.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">
                        {getRequestLabel(request.type)}
                      </span>
                      <span className="text-xs bg-warning-100 text-warning-700 px-2 py-1 rounded-full">
                        Acik
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {request.region} • {formatDateTr(request.date)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Kritik Uyarilar */}
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
