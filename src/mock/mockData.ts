import {
  Vehicle,
  Notification,
  HistoryMonth,
  Profile,
  MaintenanceRecord,
  HgsRecord,
  FineRecord,
  FuelRecord,
  KmLog,
  NewRequestData,
} from "@/lib/types";

export const mockVehicle: Vehicle = {
  plate: "34 ABC 123",
  brand: "Renault",
  model: "Megane",
  modelYear: 2022,
  km: 45230,
  kmUpdatedAt: "2026-03-15",
  status: "Kullanıcıda",
  fuelAvgLPer100: 6.8,
  carbonFootprintLevel: "B",
  drivingScore: 85,
  rental: {
    remainingKm: 5470,
    totalKm: 50000,
    threshold80: 40000,
    threshold90: 45000,
    companyName: "Avis Filo Kiralama",
    companyPhone: "0850 123 45 67",
    startDate: "2025-01-01",
    endDate: "2027-01-01",
  },
  criticalAlerts: ["Periyodik bakım süresi geçti"],
};

export const mockOpenRequests: NewRequestData[] = [
  {
    id: "req-1",
    type: "BAKIM",
    plate: "34 ABC 123",
    date: "2026-04-10",
    region: "İstanbul Avrupa",
    km: 45230,
    details: { maintenanceType: "Periyodik", note: "Periyodik bakım talebi" },
    status: "ACIK",
    createdAt: "2026-04-05",
  },
  {
    id: "req-2",
    type: "LASTIK",
    plate: "34 ABC 123",
    date: "2026-04-08",
    region: "İstanbul Anadolu",
    km: 45230,
    details: { tireType: "Yaz", tireReason: "Mevsim" },
    status: "ACIK",
    createdAt: "2026-04-03",
  },
];

export const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "NEW_TRAFFIC_FINE",
    title: "Yeni trafik cezası",
    body: "34 ABC 123 plakalı aracınıza yeni bir ceza kaydedildi.",
    actionLabel: "Detayı Gör",
    actionHref: "/history",
    createdAt: "2026-04-01",
    read: false,
  },
  {
    id: "2",
    type: "MAINTENANCE_SOON",
    title: "Bakım zamanı yaklaşıyor",
    body: "Periyodik bakımınız 500 km içinde.",
    actionLabel: "Bakımı Gör",
    actionHref: "/history",
    createdAt: "2026-03-28",
    read: false,
  },
  {
    id: "3",
    type: "KM_REQUIRED",
    title: "Km girmeniz gerekiyor",
    body: "Güncel km bilginizi girmelisiniz.",
    actionLabel: "Km Gir",
    actionHref: "/new-request/step-2",
    createdAt: "2026-03-25",
    read: true,
  },
  {
    id: "4",
    type: "WINTER_TIRE_REMINDER",
    title: "Kış lastiği zamanı geldi",
    body: "Kış lastiği değişim zamanınız geldi.",
    actionLabel: "Bilgi Al",
    actionHref: "/",
    createdAt: "2026-03-20",
    read: true,
  },
  {
    id: "5",
    type: "KM_90",
    title: "Km %90 seviyesine ulaştı",
    body: "Kiralama km limitinizin %90'ını kullandınız.",
    actionLabel: "Aracımı Gör",
    actionHref: "/",
    createdAt: "2026-03-15",
    read: false,
  },
];

const hgsRecords: HgsRecord[] = [
  { id: "h1", date: "2026-04-02", location: "15 Temmuz Şehitler Köprüsü", amount: 19.25 },
  { id: "h2", date: "2026-04-01", location: "FSM Köprüsü", amount: 45.5 },
  { id: "h3", date: "2026-03-28", location: "Avrasya Tüneli", amount: 82.0 },
  { id: "h4", date: "2026-03-25", location: "Osmangazi Köprüsü", amount: 184.5 },
];

const fineRecords: FineRecord[] = [
  { id: "f1", date: "2026-03-30", description: "Hız ihlali (82 km/saat)", amount: 951.0 },
  { id: "f2", date: "2026-03-15", description: "Park ihlali", amount: 320.0 },
];

const maintenanceRecords: MaintenanceRecord[] = [
  { id: "m1", date: "2026-03-10", description: "20.000 km bakımı", amount: 2500.0, type: "Periyodik" },
  { id: "m2", date: "2025-09-15", description: "10.000 km bakımı", amount: 1800.0, type: "Periyodik" },
];

const fuelRecords: FuelRecord[] = [
  { id: "fu1", date: "2026-04-01", station: "Shell", amount: 850.0, liter: 42.5 },
  { id: "fu2", date: "2026-03-25", station: "BP", amount: 920.0, liter: 46.0 },
  { id: "fu3", date: "2026-03-18", station: "Total", amount: 780.0, liter: 39.0 },
];

const kmLogs: KmLog[] = [
  { id: "k1", date: "2026-03-15", km: 45230 },
  { id: "k2", date: "2026-02-15", km: 42500 },
  { id: "k3", date: "2026-01-15", km: 39800 },
];

export const mockHistory: Record<string, HistoryMonth> = {
  "2026-04": {
    maintenances: [],
    hgs: [hgsRecords[0]],
    fines: [],
    fuels: [fuelRecords[0]],
    kmLogs: [],
  },
  "2026-03": {
    maintenances: [maintenanceRecords[0]],
    hgs: [hgsRecords[1], hgsRecords[2], hgsRecords[3]],
    fines: [fineRecords[0], fineRecords[1]],
    fuels: [fuelRecords[1], fuelRecords[2]],
    kmLogs: [kmLogs[0]],
  },
  "2026-02": {
    maintenances: [],
    hgs: [],
    fines: [],
    fuels: [],
    kmLogs: [kmLogs[1]],
  },
  "2026-01": {
    maintenances: [maintenanceRecords[1]],
    hgs: [],
    fines: [],
    fuels: [],
    kmLogs: [kmLogs[2]],
  },
};

export const mockProfile: Profile = {
  contract: {
    duration: "24 ay",
    kmLimit: 50000,
    companyName: "Avis Filo Kiralama",
    companyPhone: "0850 123 45 67",
  },
  addresses: [
    {
      id: "a1",
      title: "Ev Adresi",
      fullAddress: "Atatürk Mah. Cumhuriyet Cad. No:123 D:5",
      city: "İstanbul",
      district: "Kadıköy",
    },
    {
      id: "a2",
      title: "İş Adresi",
      fullAddress: "Levent Mah. E-5 Yanyol No:456 Kat:3",
      city: "İstanbul",
      district: "Şişli",
    },
  ],
};

export const regions = [
  "İstanbul Avrupa",
  "İstanbul Anadolu",
  "Ankara",
  "İzmir",
  "Bursa",
  "Antalya",
  "Adana",
  "Konya",
  "Kocaeli",
  "Diğer",
];

export const requestTypes = [
  { value: "BAKIM", label: "Bakım" },
  { value: "HASAR_KAZA", label: "Hasar-Kaza" },
  { value: "ARIZA", label: "Arıza" },
  { value: "LASTIK", label: "Lastik" },
  { value: "MUAYENE", label: "Muayene" },
  { value: "DIGER", label: "Diğer" },
];
