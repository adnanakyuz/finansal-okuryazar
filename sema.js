// FİNANSAL OKURYAZAR: bir sayının (günlük JSON dosyasının) doğrulayıcısı.
// Hem tarayıcıda (index.html) hem Node'da (scripts/dogrula.mjs) aynı kurallar çalışır.
// dogrula(sayi) → { hatalar: [...], uyarilar: [...] }. Hata varsa sayı yayınlanmaz.

export const KOSELER = {
  "Sabah Kahvesi": "Başyazı · Yazı İşleri",
  "Piyasa Pusulası": "Piyasalar Masası",
  "Cüzdan Sohbetleri": "Kişisel Finans Masası",
};

// Al/sat tavsiyesi ve abartı sayılan ifadeler.
const YASAK = [
  /almanızı\s+öneri/i, /satmanızı\s+öneri/i, /hemen\s+(alın|satın|satın alın)/i,
  /kesin\s+kazanç/i, /garantili\s+(getiri|kazanç)/i, /kaçırmayın/i, /\balım fırsatı\b/i,
  /lorem ipsum/i, /\bTODO\b/, /\bXXX\b/, /\{\{|\}\}/, /<\s*script/i,
];

const TARIH = /^\d{4}-\d{2}-\d{2}$/;

// Karikatür seçenekleri (karikatur.js ile aynı olmalı).
const KR_KIM = ["ahmet", "kemal", "zeynep"];
const KR_SAHNE = ["kahve", "sokak", "market", "ev", "banka", "bos"];
const KR_YER = ["sol", "orta", "sag"];
const KR_IFADE = ["normal", "konus", "bagir", "gul", "endise", "sasir"];
const KR_POZ = ["normal", "eller-havada", "isaret", "kafa-kasi", "gazete", "telefon"];
const KR_EFEKT = ["yok", "ter", "soru", "unlem", "sok"];
const KR_NESNE = ["yok", "cay", "defter", "grafik-yukari", "grafik-asagi", "fiyat", "ev", "araba", "altin", "cuzdan", "kumbara", "domates"];

export function dogrula(d) {
  const hatalar = [], uyarilar = [];
  const hata = (m) => hatalar.push(m), uyari = (m) => uyarilar.push(m);
  const metin = (v, yer, min = 1) => {
    if (typeof v !== "string" || v.trim().length < min) { hata(`${yer}: en az ${min} karakterlik metin olmalı`); return false; }
    return true;
  };
  const dizi = (v, yer, min, max) => {
    if (!Array.isArray(v)) { hata(`${yer}: liste olmalı`); return []; }
    if (v.length < min) hata(`${yer}: en az ${min} öğe olmalı (şu an ${v.length})`);
    if (max != null && v.length > max) hata(`${yer}: en fazla ${max} öğe olmalı (şu an ${v.length})`);
    return v;
  };
  const nesne = (v, yer) => {
    if (!v || typeof v !== "object" || Array.isArray(v)) { hata(`${yer}: nesne olmalı`); return {}; }
    return v;
  };

  if (!d || typeof d !== "object") return { hatalar: ["Sayı bir JSON nesnesi değil"], uyarilar };

  if (typeof d.tarih !== "string" || !TARIH.test(d.tarih) || isNaN(Date.parse(d.tarih))) hata("tarih: YYYY-AA-GG biçiminde olmalı");
  metin(d.tarihMetni, "tarihMetni", 8);
  if (!Number.isInteger(d.sayi) || d.sayi < 1) hata("sayi: 1 veya daha büyük tam sayı olmalı");
  if (d.notlar != null) metin(d.notlar, "notlar");
  metin(d.gununOzeti, "gununOzeti", 60);

  const M = nesne(d.manset, "manset");
  metin(M.ustBaslik, "manset.ustBaslik"); metin(M.baslik, "manset.baslik", 10); metin(M.spot, "manset.spot", 40);
  dizi(M.ozet, "manset.ozet", 2, 5).forEach((x, i) => metin(x, `manset.ozet[${i}]`, 10));

  dizi(d.ikinciMansetler, "ikinciMansetler", 2, 3).forEach((a, i) => {
    metin(a?.ustBaslik, `ikinciMansetler[${i}].ustBaslik`); metin(a?.baslik, `ikinciMansetler[${i}].baslik`, 8); metin(a?.spot, `ikinciMansetler[${i}].spot`, 20);
  });

  dizi(d.piyasalar, "piyasalar", 6, 16).forEach((m, i) => {
    const y = `piyasalar[${i}]`;
    metin(m?.ad, `${y}.ad`); metin(m?.deger, `${y}.deger`); metin(m?.degisim, `${y}.degisim`); metin(m?.neden, `${y}.neden`, 20);
    if (!["up", "down", "flat"].includes(m?.yon)) hata(`${y}.yon: up, down veya flat olmalı`);
    if (typeof m?.deger === "string" && !/\d/.test(m.deger)) hata(`${y}.deger: rakam içermiyor`);
  });

  dizi(d.faiz, "faiz", 1, 5).forEach((f, i) => {
    metin(f?.kurum, `faiz[${i}].kurum`); metin(f?.mevcut, `faiz[${i}].mevcut`); metin(f?.beklenti, `faiz[${i}].beklenti`);
  });

  const D = nesne(d.dosya, "dosya");
  metin(D.ustBaslik, "dosya.ustBaslik"); metin(D.baslik, "dosya.baslik", 10);
  dizi(D.paragraflar, "dosya.paragraflar", 3, 8).forEach((p, i) => metin(p, `dosya.paragraflar[${i}]`, 80));
  if (D.kutular != null) dizi(D.kutular, "dosya.kutular", 0, 4).forEach((k, i) => { metin(k?.baslik, `dosya.kutular[${i}].baslik`); metin(k?.metin, `dosya.kutular[${i}].metin`, 20); });

  const haber = (liste, ad, min, max, ekAlan) => dizi(liste, ad, min, max).forEach((g, i) => {
    const y = `${ad}[${i}]`;
    metin(g?.etiket, `${y}.etiket`); metin(g?.baslik, `${y}.baslik`, 8); metin(g?.metin, `${y}.metin`, 40); metin(g?.[ekAlan], `${y}.${ekAlan}`, 15);
    if (g?.kaynak == null) uyari(`${y}: kaynak bağlantısı yok`);
    else if (!/^https:\/\//.test(g.kaynak?.url || "")) hata(`${y}.kaynak.url: https:// ile başlamalı`);
  });
  haber(d.gundem, "gundem", 3, 8, "etki");
  haber(d.teknoloji, "teknoloji", 0, 4, "neden");

  // Fiyat beklentileri: 18 Ekim 2026 sayısından itibaren zorunlu. Her beklentinin "kim diyor" ve kaynağı olmalı.
  if (d.beklentiler == null) {
    if (typeof d.tarih === "string" && d.tarih >= "2026-10-18") hata("beklentiler: bu bölüm zorunlu (en az 4 konu)");
  } else dizi(d.beklentiler, "beklentiler", 4, 8).forEach((b, i) => {
    const y = `beklentiler[${i}]`;
    metin(b?.konu, `${y}.konu`); metin(b?.ozet, `${y}.ozet`, 30); metin(b?.neden, `${y}.neden`, 20); metin(b?.kimDiyor, `${y}.kimDiyor`, 5); metin(b?.vade, `${y}.vade`);
    if (!["yukari", "asagi", "yatay", "belirsiz"].includes(b?.yon)) hata(`${y}.yon: yukari, asagi, yatay veya belirsiz olmalı`);
    if (!/^https:\/\//.test(b?.kaynak?.url || "")) hata(`${y}.kaynak.url: her beklentinin https:// ile başlayan bir kaynağı olmalı`);
  });

  // Günün karikatürü: 19 Ekim 2026 sayısından itibaren zorunlu.
  if (d.karikatur == null) {
    if (typeof d.tarih === "string" && d.tarih >= "2026-10-19") hata("karikatur: bu bölüm zorunlu (4-7 kare)");
  } else {
    const KR = nesne(d.karikatur, "karikatur");
    metin(KR.baslik, "karikatur.baslik", 3); metin(KR.dayanak, "karikatur.dayanak", 20);
    dizi(KR.kareler, "karikatur.kareler", 4, 7).forEach((k, i) => {
      const y = `karikatur.kareler[${i}]`;
      if (!KR_SAHNE.includes(k?.sahne)) hata(`${y}.sahne: ${KR_SAHNE.join(", ")} olmalı`);
      if (k?.nesne != null && !KR_NESNE.includes(k.nesne)) hata(`${y}.nesne: ${KR_NESNE.join(", ")} olmalı`);
      if (k?.nesneYer != null && !KR_YER.includes(k.nesneYer)) hata(`${y}.nesneYer: sol, orta veya sag olmalı`);
      const kisiler = dizi(k?.karakterler, `${y}.karakterler`, 1, 3);
      const yerler = new Set(), kimler = new Set();
      kisiler.forEach((c, j) => {
        const z = `${y}.karakterler[${j}]`;
        if (!KR_KIM.includes(c?.kim)) hata(`${z}.kim: ${KR_KIM.join(", ")} olmalı`);
        if (!KR_YER.includes(c?.yer)) hata(`${z}.yer: sol, orta veya sag olmalı`);
        if (yerler.has(c?.yer)) hata(`${z}.yer: aynı karede iki karakter aynı yerde olamaz`);
        if (kimler.has(c?.kim)) hata(`${z}.kim: aynı karede bir karakter iki kez olamaz`);
        yerler.add(c?.yer); kimler.add(c?.kim);
        if (c?.ifade != null && !KR_IFADE.includes(c.ifade)) hata(`${z}.ifade: ${KR_IFADE.join(", ")} olmalı`);
        if (c?.poz != null && !KR_POZ.includes(c.poz)) hata(`${z}.poz: ${KR_POZ.join(", ")} olmalı`);
        if (c?.efekt != null && !KR_EFEKT.includes(c.efekt)) hata(`${z}.efekt: ${KR_EFEKT.join(", ")} olmalı`);
      });
      if (k?.nesne && k.nesne !== "yok" && yerler.has(k.nesneYer || "orta")) uyari(`${y}: eşya bir karakterle aynı yerde, üst üste binebilir`);
      const balonlar = dizi(k?.balonlar, `${y}.balonlar`, 0, 2);
      balonlar.forEach((b, j) => {
        const z = `${y}.balonlar[${j}]`;
        if (!kimler.has(b?.kim)) hata(`${z}.kim: konuşan karakter bu karede olmalı`);
        const sinir = balonlar.length === 1 ? 110 : 70;
        if (metin(b?.metin, `${z}.metin`, 2) && b.metin.length > sinir) hata(`${z}.metin: en fazla ${sinir} karakter olmalı (şu an ${b.metin.length}); balona sığmaz`);
      });
    });
  }

  const goruldu = new Set();
  dizi(d.koseYazilari, "koseYazilari", 1, 3).forEach((c, i) => {
    const y = `koseYazilari[${i}]`;
    if (!(c?.kose in KOSELER)) hata(`${y}.kose: ${Object.keys(KOSELER).join(" / ")} olmalı`);
    else {
      if (c.imza !== KOSELER[c.kose]) hata(`${y}.imza: "${KOSELER[c.kose]}" olmalı (köşelerde kişi adı kullanılmaz)`);
      if (goruldu.has(c.kose)) hata(`${y}.kose: aynı köşe iki kez var`);
      goruldu.add(c.kose);
    }
    metin(c?.baslik, `${y}.baslik`, 8);
    dizi(c?.paragraflar, `${y}.paragraflar`, 2, 4).forEach((p, j) => metin(p, `${y}.paragraflar[${j}]`, 40));
  });

  const S = nesne(d.senaryolar, "senaryolar");
  dizi(S.olumlu, "senaryolar.olumlu", 1, 5).forEach((x, i) => metin(x, `senaryolar.olumlu[${i}]`, 10));
  dizi(S.olumsuz, "senaryolar.olumsuz", 1, 5).forEach((x, i) => metin(x, `senaryolar.olumsuz[${i}]`, 10));
  if (S.riskler != null) metin(S.riskler, "senaryolar.riskler");
  if (typeof S.uyari !== "string" || !/yatırım tavsiyesi değildir/i.test(S.uyari)) hata('senaryolar.uyari: "yatırım tavsiyesi değildir" ifadesini içermeli');

  dizi(d.ajanda, "ajanda", 1, 12).forEach((a, i) => {
    metin(a?.gun, `ajanda[${i}].gun`); metin(a?.olay, `ajanda[${i}].olay`, 5);
    if (!["yuksek", "orta"].includes(a?.onem)) hata(`ajanda[${i}].onem: yuksek veya orta olmalı`);
  });

  dizi(d.sozluk, "sozluk", 2, 6).forEach((s, i) => { metin(s?.terim, `sozluk[${i}].terim`); metin(s?.aciklama, `sozluk[${i}].aciklama`, 30); });

  dizi(d.teyitNotlari, "teyitNotlari", 0, 15).forEach((n, i) => metin(n, `teyitNotlari[${i}]`, 10));

  const urller = new Set();
  dizi(d.kaynaklar, "kaynaklar", 8, 60).forEach((k, i) => {
    metin(k?.baslik, `kaynaklar[${i}].baslik`);
    if (!/^https:\/\/[^\s]+\.[^\s]+/.test(k?.url || "")) hata(`kaynaklar[${i}].url: geçerli bir https:// adresi olmalı`);
    else if (urller.has(k.url)) uyari(`kaynaklar[${i}]: aynı adres iki kez var`);
    else urller.add(k.url);
  });

  // Haber kaynakları, kaynaklar listesinde de yer almalı.
  for (const g of ["gundem", "teknoloji", "beklentiler"].flatMap((k) => (Array.isArray(d[k]) ? d[k] : []))) {
    if (g?.kaynak?.url && !urller.has(g.kaynak.url)) uyari(`"${g.baslik || g.konu}": kaynak adresi kaynaklar listesinde yok`);
  }

  // Tüm metinlerde yasak ifade taraması.
  const metinler = [];
  (function topla(v) {
    if (typeof v === "string") metinler.push(v);
    else if (v && typeof v === "object") Object.values(v).forEach(topla);
  })(d);
  for (const r of YASAK) {
    const m = metinler.find((s) => r.test(s));
    if (m) hata(`Yasak ifade (${r}) şu metinde: "${m.slice(0, 80)}…"`);
  }

  // Kaldırılan eski alanlar artık kullanılmıyor.
  for (const k of ["shorts", "isFikirleri", "kisiselGelisim"]) if (k in d) uyari(`${k}: bu alan kaldırıldı, sayfada gösterilmez`);
  if (S.seviyeler) uyari("senaryolar.seviyeler: bu alan kaldırıldı, sayfada gösterilmez");

  return { hatalar, uyarilar };
}
