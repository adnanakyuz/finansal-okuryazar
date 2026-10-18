// FİNANSAL OKURYAZAR · Piyasalar sayfasındaki fiyat grafikleri.
// veri/gecmis.json'daki her seri için küçük bir çizgi grafik çizer (aynı ölçek yok: her varlık kendi kartında).
// Üstte tek satır aralık seçici (1 ay / 3 ay), her kartta son değer ve dönem değişimi,
// üzerine gelince ya da dokununca tarih + değer gösteren çizgi; altta tablo görünümü.

const NS = "http://www.w3.org/2000/svg";
const AYLAR = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
const tarihYaz = (t) => { const [, a, g] = t.split("-"); return `${Number(g)} ${AYLAR[Number(a) - 1]}`; };
const sayi = (v, o) => v.toLocaleString("tr-TR", { minimumFractionDigits: o, maximumFractionDigits: o });
const deger = (v, s) => (s.birim === "$" ? `${sayi(v, s.ondalik)} $` : `${sayi(v, s.ondalik)} TL`);
const kisa = (v, s) => {
  const o = v >= 10000 ? 0 : s.ondalik;
  const t = v >= 100000 ? `${sayi(v / 1000, 0)} B` : sayi(v, o);
  return s.birim === "$" ? `${t} $` : t;
};

function h(tag, attrs, ...kids) {
  const e = document.createElement(tag);
  if (attrs) for (const k in attrs) k === "class" ? (e.className = attrs[k]) : k === "text" ? (e.textContent = attrs[k]) : e.setAttribute(k, attrs[k]);
  for (const k of kids) if (k != null) e.append(k.nodeType ? k : document.createTextNode(String(k)));
  return e;
}
function s(tag, attrs) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  return e;
}

const W = 320, H = 132, SOL = 4, SAG = 52, UST = 10, ALT = 22;

function kart(seri, gun) {
  const tum = seri.noktalar;
  const sinir = new Date(Date.parse(tum.at(-1)[0]) - gun * 864e5).toISOString().slice(0, 10);
  const p = tum.filter(([t]) => t >= sinir);
  const ilk = p[0][1], son = p.at(-1)[1];
  const fark = ((son - ilk) / ilk) * 100;
  const yon = Math.abs(fark) < 0.05 ? "flat" : fark > 0 ? "up" : "down";
  let min = Math.min(...p.map((x) => x[1])), max = Math.max(...p.map((x) => x[1]));
  const pay = (max - min) * 0.08 || max * 0.01;
  const y0 = min - pay, y1 = max + pay;
  const X = (i) => SOL + (i / (p.length - 1)) * (W - SOL - SAG);
  const Y = (v) => UST + (1 - (v - y0) / (y1 - y0)) * (H - UST - ALT);

  const svg = s("svg", { viewBox: `0 0 ${W} ${H}`, class: "gr-svg", role: "img", "aria-label": `${seri.ad}, son ${gun} gün: ${deger(ilk, seri)} → ${deger(son, seri)}` });
  // En yüksek ve en düşük seviye çizgileri + etiketleri (sağda)
  for (const v of [max, min]) {
    svg.append(s("line", { x1: SOL, x2: W - SAG + 4, y1: Y(v), y2: Y(v), class: "gr-izgara" }));
    const t = s("text", { x: W - SAG + 8, y: Y(v) + 4, class: "gr-eksen" }); t.textContent = kisa(v, seri); svg.append(t);
  }
  // Tarih etiketleri (başlangıç ve son)
  const t1 = s("text", { x: SOL, y: H - 5, class: "gr-eksen" }); t1.textContent = tarihYaz(p[0][0]);
  const t2 = s("text", { x: W - SAG, y: H - 5, class: "gr-eksen", "text-anchor": "end" }); t2.textContent = tarihYaz(p.at(-1)[0]);
  svg.append(t1, t2);
  // Alan ve çizgi
  const yol = p.map(([, v], i) => `${i ? "L" : "M"}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join(" ");
  svg.append(s("path", { d: `${yol} L${X(p.length - 1).toFixed(1)} ${H - ALT} L${SOL} ${H - ALT} Z`, class: "gr-alan" }));
  svg.append(s("path", { d: yol, class: "gr-cizgi" }));
  svg.append(s("circle", { cx: X(p.length - 1), cy: Y(son), r: 4, class: "gr-uc" }));
  // Üzerine gelme katmanı
  const dikey = s("line", { y1: UST, y2: H - ALT, class: "gr-dikey", visibility: "hidden" });
  const nokta = s("circle", { r: 4, class: "gr-uc", visibility: "hidden" });
  const alan = s("rect", { x: 0, y: 0, width: W, height: H, fill: "transparent", tabindex: "0", class: "gr-hedef", "aria-label": `${seri.ad} grafiğinde gezin (sol/sağ ok tuşları)` });
  svg.append(dikey, nokta, alan);

  const ipucu = h("div", { class: "gr-ipucu", hidden: "" });
  const goster = (i) => {
    i = Math.max(0, Math.min(p.length - 1, i));
    const x = X(i), y = Y(p[i][1]);
    dikey.setAttribute("x1", x); dikey.setAttribute("x2", x); dikey.setAttribute("visibility", "visible");
    nokta.setAttribute("cx", x); nokta.setAttribute("cy", y); nokta.setAttribute("visibility", "visible");
    ipucu.textContent = "";
    ipucu.append(h("b", { text: deger(p[i][1], seri) }), h("span", { text: tarihYaz(p[i][0]) }));
    ipucu.hidden = false;
    ipucu.style.left = `${(x / W) * 100}%`;
    ipucu.classList.toggle("sagda", x > W * 0.6);
    return i;
  };
  const gizle = () => { dikey.setAttribute("visibility", "hidden"); nokta.setAttribute("visibility", "hidden"); ipucu.hidden = true; };
  const sira = (ev) => { const r = svg.getBoundingClientRect(); const x = ((ev.clientX - r.left) / r.width) * W; return Math.round(((x - SOL) / (W - SOL - SAG)) * (p.length - 1)); };
  let secili = p.length - 1;
  alan.addEventListener("pointermove", (e) => { secili = goster(sira(e)); });
  alan.addEventListener("pointerdown", (e) => { secili = goster(sira(e)); });
  alan.addEventListener("pointerleave", gizle);
  alan.addEventListener("focus", () => { secili = goster(secili); });
  alan.addEventListener("blur", gizle);
  alan.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { secili = goster(secili - 1); e.preventDefault(); }
    if (e.key === "ArrowRight") { secili = goster(secili + 1); e.preventDefault(); }
  });

  const ok = yon === "up" ? "▲" : yon === "down" ? "▼" : "■";
  return h("figure", { class: "gr-kart" },
    h("figcaption", null,
      h("span", { class: "gr-ad", text: seri.ad }),
      h("span", { class: "gr-deger num" }, deger(son, seri), " ", h("span", { class: `gr-fark ${yon}`, text: `${ok} %${sayi(Math.abs(fark), 1)}` })),
      h("span", { class: "gr-donem", text: `${gun === 30 ? "1 ayda" : "3 ayda"} · en düşük ${kisa(min, seri)}, en yüksek ${kisa(max, seri)}` })),
    h("div", { class: "gr-cerceve" }, svg, ipucu));
}

function tablo(veri) {
  const seriler = Object.values(veri.seriler);
  const tarihler = [...new Set(seriler.flatMap((x) => x.noktalar.map((n) => n[0])))].sort().reverse();
  const haftalik = tarihler.filter((_, i) => i % 7 === 0).slice(0, 13);
  const tb = h("tbody");
  for (const t of haftalik) {
    tb.append(h("tr", null, h("td", { text: tarihYaz(t) }), ...seriler.map((x) => {
      const n = x.noktalar.find((k) => k[0] === t) || x.noktalar.filter((k) => k[0] <= t).at(-1);
      return h("td", { class: "num", text: n ? deger(n[1], x) : "—" });
    })));
  }
  return h("details", { class: "gr-tablo" }, h("summary", { text: "Rakamları tablo olarak göster (haftalık)" }),
    h("div", { class: "tblwrap" }, h("table", { class: "mkt gr-tbl" }, h("thead", null, h("tr", null, h("th", { text: "Tarih" }), ...seriler.map((x) => h("th", { text: x.ad, style: "text-align:right" })))), tb)));
}

// Grafik bölümünü kurar. veri: veri/gecmis.json içeriği.
export function grafiklerCiz(veri) {
  const kap = h("section", { class: "gr-bolum", "aria-labelledby": "gr-baslik" });
  const izgara = h("div", { class: "gr-izgara-kap" });
  const dugmeler = [[30, "1 ay"], [90, "3 ay"]].map(([g, ad]) => {
    const b = h("button", { type: "button", "aria-pressed": g === 90 ? "true" : "false", text: ad });
    b.onclick = () => { dugmeler.forEach((x) => x.setAttribute("aria-pressed", String(x === b))); ciz(g); };
    return b;
  });
  const ciz = (g) => { izgara.textContent = ""; Object.values(veri.seriler).forEach((x) => { if (x.noktalar.length > 2) izgara.append(kart(x, g)); }); };
  const guncel = new Date(veri.olusturma).toLocaleDateString("tr-TR", { day: "numeric", month: "long", timeZone: "Europe/Istanbul" });
  kap.append(
    h("div", { class: "gr-ust" }, h("h3", { id: "gr-baslik", text: "Fiyatların seyri" }), h("div", { class: "gr-aralik", role: "group", "aria-label": "Zaman aralığı" }, ...dugmeler)),
    izgara,
    tablo(veri),
    h("p", { class: "gr-kaynak", text: `Grafikler her sabah güncellenir (son: ${guncel}). Kaynaklar: ${[...new Set(Object.values(veri.seriler).map((x) => x.kaynak))].join(" · ")}. Döviz grafikleri iş günü kapanışlarını gösterir.` }));
  ciz(90);
  return kap;
}
