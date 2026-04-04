export type VehicleStatus = "Kullanıcıda" | "Serviste" | "Yolda";

export type RequestType =
  | "BAKIM"
  | "HASAR_KAZA"
  | "ARIZA"
  | "LASTIK"
  | "MUAYENE"
  | "DIGER";

export type NotificationType =
  | "NEW_TRAFFIC_FINE"
  | "MAINTENANCE_SOON"
  | "KM_REQUIRED"
  | "WINTER_TIRE_REMINDER"
  | "KM_80"
  | "KM_90";

export type MaintenanceType = "Periyodik" | "Arıza kaynaklı";
export type DamageType = "Kaza" | "Park hasarı";
export type TireType = "Yaz" | "Kış" | "Mevsim";
export type TireReason = "Mevsim" | "Aşınma" | "Hasar";
export type InspectionType = "Randevu talebi" | "Süre geçti";

export interface Vehicle {
  plate: string;
  brand: string;
  model: string;
  modelYear: number;
  km: number;
  kmUpdatedAt: string;
  status: VehicleStatus;
  fuelAvgLPer100?: number;
  carbonFootprintLevel?: string;
  drivingScore?: number;
  rental?: {
    remainingKm: number;
    totalKm: number;
    threshold80: number;
    threshold90: number;
    companyName: string;
    companyPhone: string;
    startDate: string;
    endDate: string;
  };
  criticalAlerts?: string[];
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body?: string;
  actionLabel: string;
  actionHref: string;
  createdAt: string;
  read: boolean;
}

export interface MaintenanceRecord {
  id: string;
  date: string;
  description: string;
  amount?: number;
  type: string;
}

export interface HgsRecord {
  id: string;
  date: string;
  location: string;
  amount: number;
}

export interface FineRecord {
  id: string;
  date: string;
  description: string;
  amount: number;
}

export interface FuelRecord {
  id: string;
  date: string;
  station: string;
  amount: number;
  liter: number;
}

export interface KmLog {
  id: string;
  date: string;
  km: number;
}

export interface HistoryMonth {
  maintenances: MaintenanceRecord[];
  hgs: HgsRecord[];
  fines: FineRecord[];
  fuels: FuelRecord[];
  kmLogs: KmLog[];
}

export interface Address {
  id: string;
  title: string;
  fullAddress: string;
  city: string;
  district: string;
}

export interface Profile {
  contract?: {
    duration: string;
    kmLimit: number;
    companyName: string;
    companyPhone: string;
  };
  addresses: Address[];
}

export interface NewRequestData {
  type: RequestType;
  plate: string;
  date: string;
  region: string;
  km: number;
  details: Record<string, any>;
}
