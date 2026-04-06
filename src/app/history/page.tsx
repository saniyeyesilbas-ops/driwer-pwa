"use client";

import { useState, useMemo } from "react";
import FilterBar from "@/components/FilterBar";
import { mockHistory } from "@/mock/mockData";
import { Wrench, AlertTriangle, Fuel, CircleDollarSign, LayoutGrid } from "lucide-react";

type TabType = "all" | "maintenances" | "fines" | "fuels" | "damages";

const tabs = [
  { id: "all" as TabType, label: "Tumu", icon: LayoutGrid },
  { id: "maintenances" as TabType, label: "Bakim", icon: Wrench },
  { id: "damages" as TabType, label: "Hasar", icon: AlertTriangle },
  { id: "fines" as TabType, label: "Ceza", icon: CircleDollarSign },
  { id: "fuels" as TabType, label: "Yakit", icon: Fuel },
];

export default function HistoryPage() {
  const [selectedMonth, setSelectedMonth] = useState("2026-04");
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const months = Object.keys(mockHistory).sort().reverse();
  const currentData = mockHistory[selectedMonth] || {
    maintenances: [],
    hgs: [],
    fines: [],
    fuels: [],
    kmLogs: [],
  };

  // Toplam maliyet hesaplama
  const totalCost = useMemo(() => {
    let total = 0;
    
    if (activeTab === "all" || activeTab === "maintenances") {
      total += currentData.maintenances.reduce((sum, item) => sum + (item.amount || 0), 0);
    }
    
    if (activeTab === "all" || activeTab === "fines") {
      total += currentData.fines.reduce((sum, item) => sum + (item.amount || 0), 0);
    }
    
    if (activeTab === "all" || activeTab === "fuels") {
      total += currentData.fuels.reduce((sum, item) => sum + (item.amount || 0), 0);
    }
    
    // Hasar icin mock data yok, 0 olarak kalir
    
    return total;
  }, [currentData, activeTab]);

  const renderContent = () => {
    const items: JSX.Element[] = [];

    if (activeTab === "all" || activeTab === "maintenances") {
      currentData.maintenances.forEach((item) => {
        items.push(
          <div key={`m-${item.id}`} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
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
        );
      });
    }

    if (activeTab === "all" || activeTab === "fines") {
      currentData.fines.forEach((item) => {
        items.push(
          <div key={`f-${item.id}`} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
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
        );
      });
    }

    if (activeTab === "all" || activeTab === "fuels") {
      currentData.fuels.forEach((item) => {
        items.push(
          <div key={`fu-${item.id}`} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
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
        );
      });
    }

    if (activeTab === "damages") {
      items.push(
        <p key="no-damage" className="text-gray-500 text-center py-8">Bu ay hasar kaydi yok.</p>
      );
    }

    if (items.length === 0) {
      return <p className="text-gray-500 text-center py-8">Bu ay kayit yok.</p>;
    }

    return <div className="space-y-3">{items}</div>;
  };

  return (
    <div className="p-4 space-y-4">
      {/* Baslik ve Toplam Maliyet */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Gecmisim</h1>
        <div className="bg-primary-50 border border-primary-200 rounded-xl px-4 py-2">
          <p className="text-xs text-primary-600">Toplam Maliyet</p>
          <p className="text-lg font-bold text-primary-700">
            {totalCost.toLocaleString("tr-TR")} TL
          </p>
        </div>
      </div>

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
