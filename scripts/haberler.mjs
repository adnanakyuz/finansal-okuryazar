// Ücretsiz ve herkese açık haber akışlarından (RSS/Atom) son 72 saatin haberlerini çeker,
// veri/haberler.json'a yazar. Sabah yazı işlerinin bulut ortamı haber sitelerini açamadığında
// bu dosya kaynak görevi görür: her haberin başlığı, özeti, tarihi ve gerçek bağlantısı burada.
// Bir kaynak çökerse diğerleri yine yazılır; çöken kaynak "hatalar" listesine düşer.
import { writeFile, mkdir } from "node:fs/promises";

const KAYNAKLAR = [
  ["AA Ekonomi", "https://www.aa.com.tr/tr/rss/default?cat=ekonomi"],
  ["Bloomberg HT", "https://www.bloomberght.com/rss"],
  ["NTV Ekonomi", "https://www.ntv.com.tr/ekonomi.rss"],
  ["Habertürk Ekonomi", "https://www.haberturk.com/rss/ekonomi.xml"],
  ["TRT Haber Ekonomi", "https://www.trthaber.com/ekonomi_articles.rss"],
  ["Dünya", "https://www.dunya.com/rss"],
  ["Ekonomim", "https://www.ekonomim.com/export/rss"],
  ["CNBC-e", "https://www.cnbce.com/rss"],
  ["Investing.com Türkiye", "https://tr.investing.com/rss/news.rss"],
  ["BBC Türkçe", "https://feeds.bbci.co.uk/turkce/rss.xml"],
  ["DW Türkçe", "https://rss.dw.com/rdf/rss-tur-all"],
  ["CNBC (ABD)", "https://www.cnbc.com/id/10001147/device/rss/rss.html"],
  ["BBC Business", "https://feeds.bbci.co.uk/news/business/rss.xml"],
];
const PENCERE_SAAT = 72;      // hafta sonu da kapsansın diye 3 gün
const KAYNAK_BASI = 40;

const sonuc = { olusturma: new Date().toISOString(), not: `Son ${PENCERE_SAAT} saatin haberleri, ücretsiz RSS akışlarından otomatik çekildi.`, haberler: [], kaynaklar: [], hatalar: [] };

const varlik = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
function temizle(s) {
  return String(s || "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(#x?[0-9a-f]+|\w+);/gi, (m, k) => k[0] === "#" ? String.fromCodePoint(k[1].toLowerCase() === "x" ? parseInt(k.slice(2), 16) : parseInt(k.slice(1), 10)) : varlik[k.toLowerCase()] ?? m)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ").trim();
}
const etiket = (blok, ad) => blok.match(new RegExp(`<${ad}(?:\\s[^>]*)?>([\\s\\S]*?)</${ad}>`, "i"))?.[1];

function ayikla(xml) {
  const ogeler = [...xml.matchAll(/<(item|entry)[\s>][\s\S]*?<\/\1>/gi)].map((m) => m[0]);
  return ogeler.map((b) => {
    let link = temizle(etiket(b, "link"));
    if (!link) link = b.match(/<link[^>]*href="([^"]+)"/i)?.[1] || temizle(etiket(b, "guid"));
    const tarih = temizle(etiket(b, "pubDate") || etiket(b, "dc:date") || etiket(b, "published") || etiket(b, "updated"));
    return {
      baslik: temizle(etiket(b, "title")),
      ozet: temizle(etiket(b, "description") || etiket(b, "summary") || etiket(b, "content")).slice(0, 500),
      url: link,
      tarih: isNaN(Date.parse(tarih)) ? null : new Date(tarih).toISOString(),
    };
  }).filter((h) => h.baslik && /^https?:\/\//.test(h.url));
}

const sinir = Date.now() - PENCERE_SAAT * 3600e3;
const gorulen = new Set();
for (const [ad, url] of KAYNAKLAR) {
  try {
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (finansal-okuryazar; +https://adnanakyuz.github.io/finansal-okuryazar/)" }, signal: AbortSignal.timeout(20000) });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const hepsi = ayikla(await r.text());
    const taze = hepsi.filter((h) => !h.tarih || Date.parse(h.tarih) >= sinir).slice(0, KAYNAK_BASI);
    let eklenen = 0;
    for (const h of taze) {
      const anahtar = h.url.replace(/[?#].*$/, "");
      if (gorulen.has(anahtar)) continue;
      gorulen.add(anahtar);
      sonuc.haberler.push({ kaynak: ad, ...h });
      eklenen++;
    }
    sonuc.kaynaklar.push({ ad, url, haber: eklenen });
  } catch (e) {
    sonuc.hatalar.push(`${ad}: ${e.message}`);
  }
}
sonuc.haberler.sort((a, b) => (b.tarih || "").localeCompare(a.tarih || ""));

await mkdir(new URL("../veri/", import.meta.url), { recursive: true });
await writeFile(new URL("../veri/haberler.json", import.meta.url), JSON.stringify(sonuc, null, 1) + "\n");
console.log(`${sonuc.haberler.length} haber, ${sonuc.kaynaklar.length} kaynak → veri/haberler.json`);
for (const h of sonuc.hatalar) console.log("! " + h);
if (!sonuc.haberler.length) process.exit(1);
