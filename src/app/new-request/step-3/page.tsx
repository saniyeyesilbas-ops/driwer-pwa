"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, CheckCircle } from "lucide-react";
import { requestTypes, mockVehicle } from "@/mock/mockData";
import { RequestType } from "@/lib/types";

function Step3Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);

  const type = searchParams.get("type") as RequestType;
  const date = searchParams.get("date") || "";
  const region = searchParams.get("region") || "";
  const km = searchParams.get("km") || "";
  const detailsStr = searchParams.get("details") || "{}";
  const details = JSON.parse(detailsStr);

  const typeLabel = requestTypes.find((rt) => rt.value === type)?.label || type;

  const handleSubmit = () => {
    // Mock submit - local state'e yazma simülasyonu
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg text-center max-w-sm w-full">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-success-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Talebiniz Alındı!
          </h2>
          <p className="text-gray-600 mb-6">
            {typeLabel} talebiniz başarıyla oluşturuldu.
          </p>
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              Aracıma Dön
            </Link>
            <Link
              href="/notifications"
              className="block w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Bildirimlerime Git
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const renderDetails = () => {
    const detailItems: { label: string; value: string }[] = [];

    if (details.maintenanceType) {
      detailItems.push({ label: "Bakım Tipi", value: details.maintenanceType });
    }
    if (details.note) {
      detailItems.push({ label: "Not", value: details.note });
    }
    if (details.damageType) {
      detailItems.push({ label: "Hasar Tipi", value: details.damageType });
    }
    if (details.description) {
      detailItems.push({ label: "Açıklama", value: details.description });
    }
    if (details.drivable !== undefined) {
      detailItems.push({
        label: "Araç Kullanılabilir",
        value: details.drivable ? "Evet" : "Hayır",
      });
    }
    if (details.tireType) {
      detailItems.push({ label: "Lastik Tipi", value: details.tireType });
    }
    if (details.tireReason) {
      detailItems.push({ label: "Değişim Nedeni", value: details.tireReason });
    }
    if (details.inspectionType) {
      detailItems.push({ label: "Muayene Durumu", value: details.inspectionType });
    }

    return detailItems;
  };

  const detailItems = renderDetails();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center px-4 h-14 max-w-md mx-auto">
          <Link
            href="/new-request/step-2"
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
                step === 3
                  ? "bg-primary-600 text-white"
                  : step < 3
                  ? "bg-success-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step < 3 ? "✓" : step}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">
          Adım 3: Özet + Gönder
        </p>
      </div>

      {/* Summary */}
      <div className="p-4 max-w-md mx-auto space-y-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-4">Talep Özeti</h2>

          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Talep Türü</span>
              <span className="font-medium">{typeLabel}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Plaka</span>
              <span className="font-medium">{mockVehicle.plate}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Talep Tarihi</span>
              <span className="font-medium">{date}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Bölge</span>
              <span className="font-medium">{region}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">KM</span>
              <span className="font-medium">
                {parseInt(km).toLocaleString("tr-TR")} km
              </span>
            </div>

            {detailItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between py-2 border-b border-gray-100"
              >
                <span className="text-gray-500">{item.label}</span>
                <span className="font-medium text-right max-w-[60%]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-success-600 text-white py-3.5 rounded-xl text-lg font-semibold hover:bg-success-700 transition-colors shadow-lg"
        >
          Talebi Gönder
        </button>
      </div>
    </div>
  );
}

export default function Step3Page() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Yükleniyor...</div>}>
      <Step3Content />
    </Suspense>
  );
}
