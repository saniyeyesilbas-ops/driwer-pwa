"use client";

import { useState } from "react";
import { Phone, MapPin, Plus, Trash2, FileText, HelpCircle, Upload, FileCheck } from "lucide-react";
import { mockProfile, mockVehicle, cities } from "@/mock/mockData";
import { Address } from "@/lib/types";

export default function ProfilePage() {
  const [addresses, setAddresses] = useState<Address[]>(mockProfile.addresses);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    title: "",
    fullAddress: "",
    city: "",
    district: "",
  });
  const [selectedCity, setSelectedCity] = useState("");

  // Belge yükleme state
  const [documents, setDocuments] = useState<{
    sigorta: File | null;
    ruhsat: File | null;
  }>({
    sigorta: null,
    ruhsat: null,
  });

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    setNewAddress({ ...newAddress, city: cityName, district: "" });
  };

  const handleAddAddress = () => {
    if (!newAddress.title || !newAddress.fullAddress || !newAddress.city || !newAddress.district) return;

    const address: Address = {
      id: `a${Date.now()}`,
      title: newAddress.title,
      fullAddress: newAddress.fullAddress,
      city: newAddress.city,
      district: newAddress.district,
    };

    setAddresses([...addresses, address]);
    setNewAddress({ title: "", fullAddress: "", city: "", district: "" });
    setSelectedCity("");
    setShowAddForm(false);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  const handleFileUpload = (type: "sigorta" | "ruhsat", file: File | null) => {
    setDocuments({ ...documents, [type]: file });
  };

  const selectedCityData = cities.find((c) => c.name === selectedCity);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold text-gray-900">Profil</h1>

      {/* Sözleşme Özeti */}
      {mockProfile.contract && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-primary-600" />
            <h2 className="font-semibold text-gray-900">Kiralama Bilgileri</h2>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Şirket</span>
              <span className="font-medium">{mockProfile.contract.companyName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Süre</span>
              <span className="font-medium">{mockProfile.contract.duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">KM Limiti</span>
              <span className="font-medium">
                {mockProfile.contract.kmLimit.toLocaleString("tr-TR")} km
              </span>
            </div>
            <a
              href={`tel:${mockProfile.contract.companyPhone.replace(/\s/g, "")}`}
              className="flex items-center justify-center gap-2 w-full mt-3 bg-primary-50 text-primary-700 py-2 rounded-lg text-sm font-medium hover:bg-primary-100 transition-colors"
            >
              <Phone className="w-4 h-4" />
              {mockProfile.contract.companyPhone}
            </a>
          </div>
        </div>
      )}

      {/* Adreslerim */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary-600" />
            <h2 className="font-semibold text-gray-900">Adreslerim</h2>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1 text-sm text-primary-600 font-medium hover:text-primary-700"
          >
            <Plus className="w-4 h-4" />
            Ekle
          </button>
        </div>

        {showAddForm && (
          <div className="bg-gray-50 rounded-lg p-3 mb-3 space-y-2">
            <input
              type="text"
              placeholder="Adres Başlığı (örn: Ev, İş)"
              value={newAddress.title}
              onChange={(e) =>
                setNewAddress({ ...newAddress, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            
            {/* İl Dropdown */}
            <select
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              <option value="">İl Seçin</option>
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>

            {/* İlçe Dropdown */}
            <select
              value={newAddress.district}
              onChange={(e) =>
                setNewAddress({ ...newAddress, district: e.target.value })
              }
              disabled={!selectedCity}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white disabled:bg-gray-100 disabled:text-gray-400"
            >
              <option value="">{selectedCity ? "İlçe Seçin" : "Önce il seçin"}</option>
              {selectedCityData?.districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>

            <textarea
              placeholder="Tam Adres"
              value={newAddress.fullAddress}
              onChange={(e) =>
                setNewAddress({ ...newAddress, fullAddress: e.target.value })
              }
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddAddress}
                className="flex-1 bg-primary-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                Kaydet
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setSelectedCity("");
                  setNewAddress({ title: "", fullAddress: "", city: "", district: "" });
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
              >
                İptal
              </button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {addresses.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">
              Henüz adres eklenmemiş.
            </p>
          ) : (
            addresses.map((address) => (
              <div
                key={address.id}
                className="flex items-start justify-between bg-gray-50 rounded-lg p-3"
              >
                <div>
                  <p className="font-medium text-gray-900">{address.title}</p>
                  <p className="text-sm text-gray-600">{address.fullAddress}</p>
                  <p className="text-xs text-gray-400">
                    {address.district}, {address.city}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteAddress(address.id)}
                  className="text-gray-400 hover:text-danger-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* İletişim */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Phone className="w-5 h-5 text-primary-600" />
          <h2 className="font-semibold text-gray-900">İletişim</h2>
        </div>
        <div className="space-y-2">
          <a
            href="tel:08501234567"
            className="flex items-center justify-between w-full bg-primary-50 text-primary-700 px-4 py-3 rounded-lg text-sm font-medium hover:bg-primary-100 transition-colors"
          >
            <span>Destek Hattı</span>
            <span>0850 123 45 67</span>
          </a>
          <a
            href="tel:08501234568"
            className="flex items-center justify-between w-full bg-danger-50 text-danger-700 px-4 py-3 rounded-lg text-sm font-medium hover:bg-danger-100 transition-colors"
          >
            <span>Acil Yol Yardım</span>
            <span>0850 123 45 68</span>
          </a>
        </div>
      </div>

      {/* Belge Yükleme */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Upload className="w-5 h-5 text-primary-600" />
          <h2 className="font-semibold text-gray-900">Belge Yükle</h2>
        </div>
        <div className="space-y-3">
          {/* Trafik Sigortası */}
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium">Trafik Sigortası</span>
              </div>
              {documents.sigorta && (
                <span className="text-xs text-success-600 bg-success-50 px-2 py-1 rounded-full">
                  Yüklendi
                </span>
              )}
            </div>
            <label className="mt-2 flex items-center justify-center w-full h-10 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => handleFileUpload("sigorta", e.target.files?.[0] || null)}
              />
              <span className="text-sm text-gray-500">
                {documents.sigorta ? documents.sigorta.name : "Dosya seçin"}
              </span>
            </label>
          </div>

          {/* Ruhsat */}
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium">Ruhsat</span>
              </div>
              {documents.ruhsat && (
                <span className="text-xs text-success-600 bg-success-50 px-2 py-1 rounded-full">
                  Yüklendi
                </span>
              )}
            </div>
            <label className="mt-2 flex items-center justify-center w-full h-10 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => handleFileUpload("ruhsat", e.target.files?.[0] || null)}
              />
              <span className="text-sm text-gray-500">
                {documents.ruhsat ? documents.ruhsat.name : "Dosya seçin"}
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Yardım */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="w-5 h-5 text-primary-600" />
          <h2 className="font-semibold text-gray-900">Yardım</h2>
        </div>
        <p className="text-sm text-gray-600">
          Uygulama kullanımı ile ilgili sorularınız için destek hattını
          arayabilir veya e-posta gönderebilirsiniz.
        </p>
      </div>
    </div>
  );
}
