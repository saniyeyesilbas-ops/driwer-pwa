"use client";

import { useState } from "react";

interface FilterBarProps {
  months: string[];
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

export default function FilterBar({
  months,
  selectedMonth,
  onMonthChange,
}: FilterBarProps) {
  return (
    <div className="flex gap-3">
      <select
        value={selectedMonth}
        onChange={(e) => onMonthChange(e.target.value)}
        className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <option value="">Ay Seç</option>
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
}
