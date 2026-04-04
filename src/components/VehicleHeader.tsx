import { Vehicle } from "@/lib/types";

interface VehicleHeaderProps {
  vehicle: Vehicle;
}

export default function VehicleHeader({ vehicle }: VehicleHeaderProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="text-center mb-3">
        <div className="inline-flex items-center justify-center bg-primary-50 border-2 border-primary-600 rounded-lg px-6 py-3">
          <span className="text-2xl font-bold text-gray-900 tracking-wider">
            {vehicle.plate}
          </span>
        </div>
      </div>
      <div className="text-center text-gray-600">
        <span className="font-medium">{vehicle.modelYear}</span>
        <span className="mx-2">•</span>
        <span className="font-medium">{vehicle.brand}</span>
        <span className="mx-2">•</span>
        <span className="font-medium">{vehicle.model}</span>
      </div>
    </div>
  );
}
