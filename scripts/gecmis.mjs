// Son 90 günün fiyat geçmişini çeker, veri/gecmis.json'a yazar; Piyasalar sayfasındaki grafikler bunu çizer.
// Kaynaklar (anahtarsız, ücretsiz):
//   Dolar/TL, Euro/TL   Frankfurter (Avrupa Merkez Bankası referans kurları, iş günleri)
//   Ons altın           CoinGecko'daki PAX Gold (1 token = 1 ons altın). Seri, gold-api.com'un
//                       anlık ons fiyatına göre ölçeklenir; böylece eğri gerçek ons fiyatıyla biter.
//   Gram altın          ons × dolar/TL ÷ 31,10 (aynı gün)
//   Bitcoin             CoinGecko
import { writeFile, mkdir } from "node:fs/promises";

const GUN = 90;
const ONS_GRAM = 31.1034768;
const gun = (t) => new Date(t).toISOString().slice(0, 10);
const bas = gun(Date.now() - GUN * 864e5);
const sonuc = { olusturma: new Date().toISOString(), gun: GUN, seriler: {}, hatalar: [] };

async function getir(url) {
  const r = await fetch(url, { headers: { "User-Agent": "finansal-okuryazar/1.0" }, signal: AbortSignal.timeout(25000) });
  if (!r.ok) throw new Error(`${url} → HTTP ${r.status}`);
  return r.json();
}
async function dene(ad, is) { try { await is(); } catch (e) { sonuc.hatalar.push(`${ad}: ${e.message}`); } }
const yuvarla = (v, b) => Number(v.toFixed(b));

let usdtry = new Map();
await dene("Frankfurter", async () => {
  const j = await getir(`https://api.frankfurter.dev/v1/${bas}..?base=USD&symbols=TRY,EUR`);
  const dolar = [], euro = [];
  for (const [t, r] of Object.entries(j.rates).sort()) {
    usdtry.set(t, r.TRY);
    dolar.push([t, yuvarla(r.TRY, 4)]);
    euro.push([t, yuvarla(r.TRY / r.EUR, 4)]);
  }
  sonuc.seriler.dolar = { ad: "Dolar/TL", birim: "TL", ondalik: 2, kaynak: "Avrupa Merkez Bankası (Frankfurter)", noktalar: dolar };
  sonuc.seriler.euro = { ad: "Euro/TL", birim: "TL", ondalik: 2, kaynak: "Avrupa Merkez Bankası (Frankfurter)", noktalar: euro };
});

await dene("Altın", async () => {
  const j = await getir(`https://api.coingecko.com/api/v3/coins/pax-gold/market_chart?vs_currency=usd&days=${GUN}&interval=daily`);
  const gunluk = new Map(j.prices.map(([t, v]) => [gun(t), v]));
  let carpan = 1;
  try {
    const spot = (await getir("https://api.gold-api.com/price/XAU")).price;
    const son = [...gunluk.values()].at(-1);
    if (spot && son && Math.abs(spot / son - 1) < 0.05) carpan = spot / son;
  } catch {}
  const ons = [...gunluk.entries()].sort().map(([t, v]) => [t, yuvarla(v * carpan, 1)]);
  sonuc.seriler.ons = { ad: "Ons altın", birim: "$", ondalik: 0, kaynak: "CoinGecko PAX Gold, gold-api.com anlık fiyatına göre ölçeklendi", noktalar: ons };
  const onsMap = new Map(ons);
  const gram = [...usdtry.entries()].sort().filter(([t]) => onsMap.has(t)).map(([t, kur]) => [t, yuvarla((onsMap.get(t) * kur) / ONS_GRAM, 0)]);
  if (gram.length) sonuc.seriler.gram = { ad: "Gram altın", birim: "TL", ondalik: 0, kaynak: "Hesap: ons altın × dolar/TL ÷ 31,10", noktalar: gram };
});

await dene("Bitcoin", async () => {
  const j = await getir(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${GUN}&interval=daily`);
  const m = new Map(j.prices.map(([t, v]) => [gun(t), yuvarla(v, 0)]));
  sonuc.seriler.bitcoin = { ad: "Bitcoin", birim: "$", ondalik: 0, kaynak: "CoinGecko", noktalar: [...m.entries()].sort() };
});

// Sayfadaki sıra
const SIRA = ["dolar", "euro", "gram", "ons", "bitcoin"];
sonuc.seriler = Object.fromEntries(SIRA.filter((k) => sonuc.seriler[k]).map((k) => [k, sonuc.seriler[k]]));

await mkdir(new URL("../veri/", import.meta.url), { recursive: true });
await writeFile(new URL("../veri/gecmis.json", import.meta.url), JSON.stringify(sonuc) + "\n");
console.log(`${Object.keys(sonuc.seriler).length} seri → veri/gecmis.json (${Object.values(sonuc.seriler).map((s) => `${s.ad}: ${s.noktalar.length}`).join(", ")})`);
for (const h of sonuc.hatalar) console.log("! " + h);
if (!Object.keys(sonuc.seriler).length) process.exit(1);
