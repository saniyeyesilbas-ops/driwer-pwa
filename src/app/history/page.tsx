"use client";

import { useState } from "react";
import FilterBar from "@/components/FilterBar";
import { mockHistory } from "@/mock/mockData";
import { Wrench, CreditCard, AlertTriangle, Fuel, Gauge } from "lucide-react";

const tabs = [
  { id: "maintenances", label: "Bakımlar", icon: Wrench },
  { id: "hgs", label: "HGS", icon: CreditCard },
  { id: "fines", label: "Cezalar", icon: AlertTriangle },
  { id: "fuels", label: "Yakıt", icon: Fuel },
  { id: "kmLogs", label: "KM", icon: Gauge },
];

export default function HistoryPage() {
  const [selectedMonth, setSelectedMonth] = useState("2026-04");
  const [activeTab, setActiveTab] = useState("maintenances");

  const months = Object.keys(mockHistory).sort().reverse();
  const currentData = mockHistory[selectedMonth] || {
    maintenances: [],
    hgs: [],
    fines: [],
    fuels: [],
    kmLogs: [],
  };

  const renderContent = () => {
    switch (activeTab) {
      case "maintenances":
        return currentData.maintenances.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Bu ay bakım kaydı yok.</p>
        ) : (
          <div className="space-y-3">
            {currentData.maintenances.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{item.description}</p>
                    <p className="text-sm text-gray-500">{item.type}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                  </div>
                  {item.amount && (
                    <span className="font-semibold text-gray-900">
                      {item.amount.toLocaleString("tr-TR")} TL
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      case "hgs":
        return currentData.hgs.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Bu ay HGS kaydı yok.</p>
        ) : (
          <div className="space-y-3">
            {currentData.hgs.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{item.location}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {item.amount.toLocaleString("tr-TR")} TL
                  </span>
                </div>
              </div>
            ))}
          </div>
        );

      case "fines":
        return currentData.fines.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Bu ay ceza kaydı yok.</p>
        ) : (
          <div className="space-y-3">
            {currentData.fines.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{item.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                  </div>
                  <span className="font-semibold text-danger-600">
                    {item.amount.toLocaleString("tr-TR")} TL
                  </span>
                </div>
              </div>
            ))}
          </div>
        );

      case "fuels":
        return currentData.fuels.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Bu ay yakıt kaydı yok.</p>
        ) : (
          <div className="space-y-3">
            {currentData.fuels.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{item.station}</p>
                    <p className="text-sm text-gray-500">{item.liter} L</p>
                    <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {item.amount.toLocaleString("tr-TR")} TL
                  </span>
                </div>
              </div>
            ))}
          </div>
        );

      case "kmLogs":
        return currentData.kmLogs.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Bu ay KM kaydı yok.</p>
        ) : (
          <div className="space-y-3">
            {currentData.kmLogs.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">
                    {item.km.toLocaleString("tr-TR")} km
                  </span>
                  <span className="text-sm text-gray-500">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold text-gray-900">Geçmişim</h1>

      <FilterBar
        months={months}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 scrollbar-hide">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-primary-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div>{renderContent()}</div>
    </div>
  );
}
