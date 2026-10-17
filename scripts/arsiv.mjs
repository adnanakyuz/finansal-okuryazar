// sayilar/ klasöründeki bütün günlük dosyalardan arşiv listesini (sayilar/index.json) yeniden kurar.
// Elle düzenlemeye gerek yok: yeni sayı eklenince bu betik çalıştırılır.
import { readdir, readFile, writeFile } from "node:fs/promises";

const KLASOR = new URL("../sayilar/", import.meta.url);
const dosyalar = (await readdir(KLASOR)).filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f)).sort().reverse();

const sayilar = [];
for (const f of dosyalar) {
  const d = JSON.parse(await readFile(new URL(f, KLASOR), "utf8"));
  sayilar.push({ tarih: d.tarih, tarihMetni: d.tarihMetni, sayi: d.sayi, baslik: d.manset?.baslik ?? "" });
}

await writeFile(new URL("index.json", KLASOR), JSON.stringify({ sayilar }, null, 2) + "\n");
console.log(`Arşiv güncellendi: ${sayilar.length} sayı. En yeni: ${sayilar[0]?.tarih ?? "yok"}`);
