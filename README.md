# Sürücü PWA

Next.js + TypeScript + Tailwind CSS ile geliştirilmiş Sürücü PWA uygulaması.

## Özellikler

- 4 ana sekme: Aracım, Bildirimlerim, Geçmişim, Profil
- Yeni Talep akışı (3 adım)
- Mock veri ile çalışan demo
- PWA desteği

## Kurulum

```bash
npm install
npm run dev
```

## Acceptance Criteria Checklist

- [x] 4 sekme çalışıyor; alt nav ile sayfalar arası geçiş var
- [x] Home'da "Acil Yol Yardım" + "+ Yeni Talep" mevcut
- [x] Yeni Talep 3 adım akıyor; ceza/HGS talep türü yok
- [x] Sürücü düşük km girerse step-2'de blok mesajı çıkıyor
- [x] Bildirimler tek aksiyonlu (tek buton)
- [x] Geçmişim salt okunur; ay filtresi var
- [x] Profilde sözleşme özeti (kiralıksa) + adres ekleme var
- [x] Tüm ekranlar mockData'dan besleniyor; gerçek API yok
- [x] Türkçe metinler doğru (Aracım/Bildirimlerim/Geçmişim/Profil)
