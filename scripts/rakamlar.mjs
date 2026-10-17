// Ücretsiz ve anahtarsız resmî/açık kaynaklardan günün rakamlarını çeker, veri/rakamlar.json'a yazar.
// Sabah yazı işleri bu dosyayı "birinci kaynak" olarak kullanır; ikinci kaynakla teyit eder.
// Bir kaynak çökerse diğerleri yine yazılır, çöken kaynak "hatalar" listesine düşer.
//
// Kaynaklar (17 Ekim 2026'da denendi, hiçbiri anahtar istemiyor):
//   TCMB günlük kurlar   https://www.tcmb.gov.tr/kurlar/today.xml      (iş günleri ~15.30'da güncellenir)
//   Frankfurter (ECB)    https://api.frankfurter.dev/v1/latest          (iş günleri ~17.00 CET)
//   CoinGecko            https://api.coingecko.com/api/v3/simple/price  (ücretsiz, dakikada birkaç istek sınırı)
//   gold-api.com         https://api.gold-api.com/price/XAU             (ons altın/gümüş, anlık)
import { readFile, writeFile, mkdir } from "node:fs/promises";

const DOSYA = new URL("../veri/rakamlar.json", import.meta.url);
const ONS_GRAM = 31.1034768;
const zaman = new Date().toISOString();
const sonuc = { olusturma: zaman, not: "Otomatik çekildi. Değişimler bir önceki çalıştırmaya göredir.", kalemler: {}, hatalar: [] };

let onceki = {};
try { onceki = JSON.parse(await readFile(DOSYA, "utf8")).kalemler || {}; } catch {}

async function getir(url, tur = "json") {
  const r = await fetch(url, { headers: { "User-Agent": "finansal-okuryazar/1.0 (+github pages)" }, signal: AbortSignal.timeout(20000) });
  if (!r.ok) throw new Error(`${url} → HTTP ${r.status}`);
  return tur === "json" ? r.json() : r.text();
}

function ekle(anahtar, ad, deger, birim, kaynak, url, ek = {}) {
  if (typeof deger !== "number" || !isFinite(deger)) throw new Error(`${ad}: geçersiz değer`);
  const eski = onceki[anahtar]?.deger;
  const degisimYuzde = typeof eski === "number" && eski ? Number((((deger - eski) / eski) * 100).toFixed(2)) : null;
  sonuc.kalemler[anahtar] = { ad, deger: Number(deger.toFixed(4)), birim, kaynak, url, zaman, degisimYuzde, ...ek };
}

async function dene(ad, is) {
  try { await is(); } catch (e) { sonuc.hatalar.push(`${ad}: ${e.message}`); }
}

await dene("TCMB", async () => {
  const xml = await getir("https://www.tcmb.gov.tr/kurlar/today.xml", "text");
  const tarih = xml.match(/Tarih="([\d.]+)"/)?.[1];
  for (const kod of ["USD", "EUR", "GBP"]) {
    const blok = xml.match(new RegExp(`<Currency[^>]*Kod="${kod}"[\\s\\S]*?</Currency>`))?.[0];
    if (!blok) throw new Error(`${kod} bulunamadı`);
    const al = Number(blok.match(/<ForexBuying>([\d.]+)</)?.[1]);
    const sat = Number(blok.match(/<ForexSelling>([\d.]+)</)?.[1]);
    ekle(`tcmb_${kod.toLowerCase()}`, `${kod}/TRY (TCMB döviz satış)`, sat, "TL", "TCMB gösterge kuru", "https://www.tcmb.gov.tr/kurlar/today.xml", { alis: al, bultenTarihi: tarih });
  }
});

await dene("Frankfurter", async () => {
  const j = await getir("https://api.frankfurter.dev/v1/latest?base=USD&symbols=TRY,EUR");
  ekle("ecb_usdtry", "USD/TRY (ECB referans)", j.rates.TRY, "TL", "Avrupa Merkez Bankası (Frankfurter)", "https://www.frankfurter.app", { gun: j.date });
  ekle("ecb_eurusd", "EUR/USD (ECB referans)", 1 / j.rates.EUR, "$", "Avrupa Merkez Bankası (Frankfurter)", "https://www.frankfurter.app", { gun: j.date });
});

await dene("CoinGecko", async () => {
  const j = await getir("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd,try&include_24hr_change=true");
  ekle("btc_usd", "Bitcoin", j.bitcoin.usd, "$", "CoinGecko", "https://www.coingecko.com/tr/coins/bitcoin", { degisim24sYuzde: Number(j.bitcoin.usd_24h_change.toFixed(2)), tl: j.bitcoin.try });
  ekle("eth_usd", "Ethereum", j.ethereum.usd, "$", "CoinGecko", "https://www.coingecko.com/tr/coins/ethereum", { degisim24sYuzde: Number(j.ethereum.usd_24h_change.toFixed(2)), tl: j.ethereum.try });
});

await dene("gold-api", async () => {
  const xau = await getir("https://api.gold-api.com/price/XAU");
  ekle("ons_altin", "Ons altın", xau.price, "$", "gold-api.com", "https://gold-api.com", { kaynakZamani: xau.updatedAt });
  const xag = await getir("https://api.gold-api.com/price/XAG");
  ekle("ons_gumus", "Ons gümüş", xag.price, "$", "gold-api.com", "https://gold-api.com", { kaynakZamani: xag.updatedAt });
});

// Gram altın: ons fiyatı × dolar kuru ÷ 31,10. Kuyumcu/Kapalıçarşı fiyatı birkaç TL farklı olabilir.
await dene("Gram altın hesabı", async () => {
  const ons = sonuc.kalemler.ons_altin?.deger;
  const kur = sonuc.kalemler.ecb_usdtry?.deger ?? sonuc.kalemler.tcmb_usd?.deger;
  if (!ons || !kur) throw new Error("ons altın veya dolar kuru yok, hesaplanamadı");
  ekle("gram_altin", "Gram altın (hesaplanan)", (ons * kur) / ONS_GRAM, "TL", "Hesap: ons altın × USD/TRY ÷ 31,10", "https://gold-api.com", { hesap: true });
});

await mkdir(new URL("../veri/", import.meta.url), { recursive: true });
await writeFile(DOSYA, JSON.stringify(sonuc, null, 2) + "\n");
const adet = Object.keys(sonuc.kalemler).length;
console.log(`${adet} rakam yazıldı → veri/rakamlar.json`);
for (const h of sonuc.hatalar) console.log("! " + h);
if (adet === 0) process.exit(1);
