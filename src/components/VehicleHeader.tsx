import { Vehicle } from "@/lib/types";

interface VehicleHeaderProps {
  vehicle: Vehicle;
}

export default function VehicleHeader({ vehicle }: VehicleHeaderProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary-50 border-2 border-primary-600 rounded-lg px-4 py-2">
            <span className="text-xl font-bold text-gray-900 tracking-wider">
              {vehicle.plate}
            </span>
          </div>
          <div className="text-gray-600 text-sm">
            <span className="font-medium">{vehicle.modelYear}</span>
            <span className="mx-1">•</span>
            <span className="font-medium">{vehicle.brand}</span>
            <span className="mx-1">•</span>
            <span className="font-medium">{vehicle.model}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
