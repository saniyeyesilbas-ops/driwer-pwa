"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { requestTypes, regions, mockVehicle } from "@/mock/mockData";
import { RequestType } from "@/lib/types";

export default function Step1Page() {
  const router = useRouter();
  const [type, setType] = useState<RequestType>("BAKIM");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [region, setRegion] = useState(regions[0]);

  const handleContinue = () => {
    const params = new URLSearchParams();
    params.set("type", type);
    params.set("date", date);
    params.set("region", region);
    router.push(`/new-request/step-2?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center px-4 h-14 max-w-md mx-auto">
          <Link
            href="/"
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">İptal</span>
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
                step === 1
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">
          Adım 1: Tür + Tarih + Bölge
        </p>
      </div>

      {/* Form */}
      <div className="p-4 max-w-md mx-auto space-y-4">
        {/* Talep Türü */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Talep Türü
          </label>
          <div className="grid grid-cols-2 gap-2">
            {requestTypes.map((rt) => (
              <button
                key={rt.value}
                onClick={() => setType(rt.value as RequestType)}
                className={`py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                  type === rt.value
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {rt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Plaka */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Plaka
          </label>
          <input
            type="text"
            value={mockVehicle.plate}
            disabled
            className="w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
          />
          <p className="text-xs text-gray-400 mt-1">Plaka değiştirilemez.</p>
        </div>

        {/* Tarih */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Talep Edilen Tarih
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Bölge */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bölge
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Devam Butonu */}
        <button
          onClick={handleContinue}
          className="w-full bg-primary-600 text-white py-3.5 rounded-xl text-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
        >
          Devam
        </button>
      </div>
    </div>
  );
}
