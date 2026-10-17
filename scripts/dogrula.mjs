// Bütün sayıları ve arşiv listesini denetler. Bir hata bile varsa çıkış kodu 1 olur
// ve GitHub Actions yayını durdurur; okur hatalı sayıyı hiç görmez.
// Kullanım: node scripts/dogrula.mjs            → hepsini denetle
//           node scripts/dogrula.mjs 2026-10-18 → yalnızca o günü denetle (arşiv yine kontrol edilir)
import { readdir, readFile } from "node:fs/promises";
import { dogrula } from "../sema.js";

const KLASOR = new URL("../sayilar/", import.meta.url);
const hedef = process.argv[2];
let dosyalar = (await readdir(KLASOR)).filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f)).sort();
let hataVar = false;
const yaz = (isaret, m) => console.log(`${isaret} ${m}`);

const sayiNo = new Map();
for (const f of dosyalar) {
  const tarih = f.slice(0, 10);
  let d;
  try { d = JSON.parse(await readFile(new URL(f, KLASOR), "utf8")); }
  catch (e) { yaz("✗", `${f}: JSON okunamadı (${e.message})`); hataVar = true; continue; }
  sayiNo.set(tarih, d.sayi);
  if (hedef && tarih !== hedef) continue;
  const { hatalar, uyarilar } = dogrula(d);
  if (d.tarih !== tarih) hatalar.push(`tarih alanı (${d.tarih}) dosya adıyla (${tarih}) aynı değil`);
  for (const h of hatalar) yaz("✗", `${f}: ${h}`);
  for (const u of uyarilar) yaz("!", `${f}: ${u}`);
  if (hatalar.length) hataVar = true;
  else yaz("✓", `${f}: denetimden geçti${uyarilar.length ? ` (${uyarilar.length} uyarı)` : ""}`);
}

// Sayı numaraları her gün bir artmalı ve tekrar etmemeli.
const sirali = [...sayiNo.entries()].sort();
for (let i = 1; i < sirali.length; i++) {
  const [t0, n0] = sirali[i - 1], [t1, n1] = sirali[i];
  if (n1 <= n0) { yaz("✗", `${t1}: sayı numarası (${n1}) bir önceki sayıdan (${t0}: ${n0}) büyük olmalı`); hataVar = true; }
}

// Arşiv listesi dosyalarla birebir aynı olmalı.
try {
  const idx = JSON.parse(await readFile(new URL("index.json", KLASOR), "utf8"));
  const listede = new Set((idx.sayilar || []).map((x) => x.tarih));
  const eksik = [...sayiNo.keys()].filter((t) => !listede.has(t));
  const fazla = [...listede].filter((t) => !sayiNo.has(t));
  if (eksik.length || fazla.length) { yaz("✗", `index.json güncel değil (eksik: ${eksik.join(", ") || "-"}, fazla: ${fazla.join(", ") || "-"}). Çözüm: node scripts/arsiv.mjs`); hataVar = true; }
} catch { yaz("✗", "sayilar/index.json okunamadı. Çözüm: node scripts/arsiv.mjs"); hataVar = true; }

if (hataVar) { console.log("\nYAYIN DURDURULDU: yukarıdaki ✗ satırlarını düzeltin."); process.exit(1); }
console.log("\nHer şey yolunda: yayına hazır.");
