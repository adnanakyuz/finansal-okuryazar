// Çevrimdışı okuma: her dosya önce internetten istenir, gelen kopya cihaza kaydedilir;
// internet yoksa cihazdaki son kopya okunur. Sürüm değişince eski önbellek silinir.
const SURUM = "fo-v5";
const ISKELET = ["./", "index.html", "sema.js", "manifest.webmanifest", "ikonlar/ikon.svg", "ikonlar/ikon-192.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(SURUM).then((c) => c.addAll(ISKELET)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== SURUM).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

async function onceAg(req) {
  const c = await caches.open(SURUM);
  try {
    // no-cache: tarayıcının 10 dakikalık kopyasına güvenme, sunucuya "yeni sürüm var mı?" diye sor.
    const r = await fetch(req.mode === "navigate" ? req.url : req, { cache: "no-cache" });
    if (r.ok) c.put(req, r.clone());
    return r;
  } catch {
    return (await c.match(req, { ignoreSearch: true })) || Response.error();
  }
}

async function onceOnbellek(req) {
  const c = await caches.open(SURUM);
  const eski = await c.match(req);
  const yeni = fetch(req).then((r) => { if (r.ok || r.type === "opaque") c.put(req, r.clone()); return r; }).catch(() => eski);
  return eski || yeni;
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const u = new URL(req.url);
  // Sitenin kendi dosyaları: her zaman en yenisini dene, internet yoksa cihazdakini ver.
  if (u.origin === location.origin) { e.respondWith(onceAg(req)); return; }
  // Google yazı tipleri: bir kez indirilsin, sonra cihazdan gelsin.
  if (u.hostname === "fonts.googleapis.com" || u.hostname === "fonts.gstatic.com") e.respondWith(onceOnbellek(req));
});
