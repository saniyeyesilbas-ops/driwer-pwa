"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { mockVehicle } from "@/mock/mockData";
import { RequestType } from "@/lib/types";

function Step2Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [km, setKm] = useState(mockVehicle.km.toString());
  const [kmError, setKmError] = useState("");

  const type = searchParams.get("type") as RequestType;
  const date = searchParams.get("date") || "";
  const region = searchParams.get("region") || "";

  const [details, setDetails] = useState<Record<string, any>>({});

  const validateKm = (value: string) => {
    const numKm = parseInt(value, 10);
    if (isNaN(numKm)) {
      setKmError("Geçerli bir km giriniz.");
      return false;
    }
    if (numKm < mockVehicle.km) {
      setKmError(
        `Girilen km, son kayıtlı km'den (${mockVehicle.km.toLocaleString(
          "tr-TR"
        )}) düşük olamaz.`
      );
      return false;
    }
    setKmError("");
    return true;
  };

  const handleKmChange = (value: string) => {
    setKm(value);
    if (value) {
      validateKm(value);
    } else {
      setKmError("");
    }
  };

  const handleContinue = () => {
    if (!validateKm(km)) return;

    const params = new URLSearchParams();
    params.set("type", type);
    params.set("date", date);
    params.set("region", region);
    params.set("km", km);
    params.set("details", JSON.stringify(details));
    router.push(`/new-request/step-3?${params.toString()}`);
  };

  const renderTypeSpecificFields = () => {
    switch (type) {
      case "BAKIM":
        return (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Bakım Tipi
              </label>
              <div className="flex gap-2">
                {["Periyodik", "Arıza kaynaklı"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setDetails({ ...details, maintenanceType: t })}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                      details.maintenanceType === t
                        ? "bg-primary-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Not
              </label>
              <textarea
                value={details.note || ""}
                onChange={(e) => setDetails({ ...details, note: e.target.value })}
                placeholder="Eklemek istediğiniz not..."
                rows={3}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>
          </>
        );

      case "HASAR_KAZA":
        return (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Hasar Tipi
              </label>
              <div className="flex gap-2">
                {["Kaza", "Park hasarı"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setDetails({ ...details, damageType: t })}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                      details.damageType === t
                        ? "bg-primary-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Fotoğraf Ekle (Mock)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <p className="text-sm text-gray-500">Fotoğraf yüklemek için tıklayın</p>
                <p className="text-xs text-gray-400 mt-1">(Mock - gerçek yükleme yok)</p>
              </div>
            </div>
          </>
        );

      case "ARIZA":
        return (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Arıza Açıklaması
              </label>
              <textarea
                value={details.description || ""}
                onChange={(e) =>
                  setDetails({ ...details, description: e.target.value })
                }
                placeholder="Arızayı kısaca açıklayın..."
                rows={3}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Araç Kullanılabilir mi?
              </label>
              <div className="flex gap-2">
                {[
                  { value: true, label: "Evet" },
                  { value: false, label: "Hayır" },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() =>
                      setDetails({ ...details, drivable: opt.value })
                    }
                    className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                      details.drivable === opt.value
                        ? "bg-primary-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        );

      case "LASTIK":
        return (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Lastik Tipi
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Yaz", "Kış", "Mevsim"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setDetails({ ...details, tireType: t })}
                    className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                      details.tireType === t
                        ? "bg-primary-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Değişim Nedeni
              </label>
              <div className="flex gap-2">
                {["Mevsim", "Aşınma", "Hasar"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setDetails({ ...details, tireReason: t })}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                      details.tireReason === t
                        ? "bg-primary-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </>
        );

      case "MUAYENE":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Muayene Durumu
            </label>
            <div className="flex gap-2">
              {["Randevu talebi", "Süre geçti"].map((t) => (
                <button
                  key={t}
                  onClick={() => setDetails({ ...details, inspectionType: t })}
                  className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                    details.inspectionType === t
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        );

      case "DIGER":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Açıklama
            </label>
            <textarea
              value={details.description || ""}
              onChange={(e) =>
                setDetails({ ...details, description: e.target.value })
              }
              placeholder="Talebinizi açıklayın..."
              rows={4}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center px-4 h-14 max-w-md mx-auto">
          <Link
            href="/new-request/step-1"
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">Geri</span>
          </Link>
          <h1 className="flex-1 text-center font-semibold text-gray-900">
            Yeni Talep
          </h1>
          <div className="w-16"></div>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-center gap-2 max-w-md mx-auto">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === 2
                  ? "bg-primary-600 text-white"
                  : step < 2
                  ? "bg-success-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step < 2 ? "✓" : step}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">
          Adım 2: KM + Detaylar
        </p>
      </div>

      {/* Form */}
      <div className="p-4 max-w-md mx-auto space-y-4">
        {/* KM */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Güncel KM *
          </label>
          <input
            type="number"
            value={km}
            onChange={(e) => handleKmChange(e.target.value)}
            placeholder="KM giriniz"
            className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 ${
              kmError
                ? "border-danger-500 focus:ring-danger-500"
                : "border-gray-300 focus:ring-primary-500"
            }`}
          />
          <p className="text-xs text-gray-400 mt-1">
            Son kayıtlı: {mockVehicle.km.toLocaleString("tr-TR")} km
          </p>
          {kmError && (
            <p className="text-sm text-danger-600 mt-2">{kmError}</p>
          )}
        </div>

        {/* Tür Bazlı Detaylar */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-4">
          <h3 className="font-medium text-gray-900">Talep Detayları</h3>
          {renderTypeSpecificFields()}
        </div>

        {/* Devam Butonu */}
        <button
          onClick={handleContinue}
          disabled={!!kmError || !km}
          className="w-full bg-primary-600 text-white py-3.5 rounded-xl text-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Devam
        </button>
      </div>
    </div>
  );
}

export default function Step2Page() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Yükleniyor...</div>}>
      <Step2Content />
    </Suspense>
  );
}
