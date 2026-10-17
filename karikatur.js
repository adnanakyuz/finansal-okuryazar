// FİNANSAL OKURYAZAR · Günün Karikatürü çizim kütüphanesi.
// Sabah yazı işleri yalnızca senaryoyu (JSON) yazar; çizim bu dosyadaki sabit karakterlerle,
// sahnelerle ve eşyalarla tarayıcıda kurulur. Böylece karakterler her gün birebir aynı kalır,
// konuşma balonlarındaki Türkçe yazılar da tertemiz görünür.

export const KARAKTERLER = ["ahmet", "kemal", "zeynep"];
export const SAHNELER = ["kahve", "sokak", "market", "ev", "banka", "bos"];
export const YERLER = ["sol", "orta", "sag"];
export const IFADELER = ["normal", "konus", "bagir", "gul", "endise", "sasir"];
export const POZLAR = ["normal", "eller-havada", "isaret", "kafa-kasi", "gazete", "telefon"];
export const EFEKTLER = ["yok", "ter", "soru", "unlem", "sok"];
export const NESNELER = ["yok", "cay", "defter", "grafik-yukari", "grafik-asagi", "fiyat", "ev", "araba", "altin", "cuzdan", "kumbara", "domates"];

const C = 'stroke="#16181D" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round" filter="url(#kr-el)"';

// Karakterlerin, ağızların ve dokuların tanımları (sayfaya bir kez eklenir).
const TANIMLAR = `
<filter id="kr-el" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="3.2"/></filter>
<pattern id="kr-tara" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><path d="M0 0 V7" stroke="#16181D" stroke-width="1.3" opacity=".35"/></pattern>

<symbol id="kr-ahmet-govde" viewBox="0 0 200 250" overflow="visible"><g ${C}>
  <path d="M70 200 L66 244 H92 L96 206 M112 206 L114 244 H140 L134 200" fill="#3B3F4A"/>
  <path d="M44 92 Q100 70 156 92 L166 210 Q100 222 34 210 Z" fill="#2B3A5C"/><path d="M44 92 Q100 70 156 92 L166 210 Q100 222 34 210 Z" fill="url(#kr-tara)" opacity=".5"/>
  <path d="M84 84 L100 150 L116 84 Z" fill="#FFFFFF"/>
  <path d="M94 92 L106 92 L110 104 L104 160 L100 168 L96 160 L90 104 Z" fill="#C0262D"/>
  <path d="M92 104 L108 114 M91 124 L107 134 M93 144 L105 152" stroke="#8E1B20" stroke-width="2"/>
  <path d="M84 84 L74 128 L100 150 M116 84 L126 128 L100 150" fill="none"/>
  <path d="M44 100 Q22 150 36 196 L52 194 Q44 150 58 112" fill="#2B3A5C"/><path d="M156 100 Q178 150 164 196 L148 194 Q156 150 142 112" fill="#2B3A5C"/>
  <circle cx="44" cy="200" r="11" fill="#F0BE98"/><circle cx="156" cy="200" r="11" fill="#F0BE98"/>
  <path d="M128 120 h18" stroke="#E7E1D6" stroke-width="4"/></g></symbol>
<symbol id="kr-ahmet-kafa" viewBox="0 0 220 220" overflow="visible"><g ${C}>
  <ellipse cx="34" cy="112" rx="16" ry="22" fill="#EDB58E"/><ellipse cx="186" cy="112" rx="16" ry="22" fill="#EDB58E"/>
  <path d="M40 96 Q36 24 110 20 Q184 24 180 96 Q186 168 150 190 Q110 210 70 190 Q34 168 40 96 Z" fill="#F3C6A0"/>
  <path d="M42 112 Q28 80 46 62 Q50 84 58 92 M178 112 Q192 80 174 62 Q170 84 162 92" fill="#E9E6E0"/>
  <path d="M78 34 Q96 26 112 30" fill="none" stroke-width="2.2"/>
  <path d="M62 64 Q78 52 96 60 M124 60 Q142 52 158 64" fill="none" stroke-width="5"/>
  <circle cx="82" cy="84" r="20" fill="#FFFFFF" fill-opacity=".55"/><circle cx="138" cy="84" r="20" fill="#FFFFFF" fill-opacity=".55"/>
  <path d="M102 82 Q110 76 118 82" fill="none"/>
  <circle cx="84" cy="86" r="5" fill="#16181D" stroke="none"/><circle cx="136" cy="86" r="5" fill="#16181D" stroke="none"/>
  <path d="M86 112 Q72 140 94 150 Q110 160 126 150 Q148 140 134 112 Q122 94 110 96 Q98 94 86 112 Z" fill="#E98E77"/>
  <path d="M64 156 Q86 146 110 156 Q134 146 156 156 Q150 170 132 166 Q120 176 110 166 Q100 176 88 166 Q70 170 64 156 Z" fill="#DCD8D0"/>
  <path d="M56 70 Q50 78 54 88 M164 70 Q170 78 166 88" fill="none" stroke-width="2"/></g></symbol>

<symbol id="kr-kemal-govde" viewBox="0 0 220 250" overflow="visible"><g ${C}>
  <path d="M74 206 L70 244 H98 L102 210 M120 210 L122 244 H150 L146 206" fill="#3A3A3A"/>
  <path d="M50 96 Q110 76 170 96 Q206 150 178 214 Q110 230 42 214 Q14 150 50 96 Z" fill="#5E8C3F"/>
  <path d="M70 104 Q110 96 150 104 Q170 158 150 214 Q110 222 70 214 Q50 158 70 104 Z" fill="#FFFFFF"/>
  <path d="M70 104 Q110 96 150 104 Q170 158 150 214 Q110 222 70 214 Q50 158 70 104 Z" fill="url(#kr-tara)" opacity=".25"/>
  <path d="M96 150 h28 v20 h-28 z" fill="none" stroke-width="2.4"/>
  <path d="M48 104 Q24 140 34 186 L52 186 Q46 150 64 118" fill="#5E8C3F"/><path d="M172 104 Q196 140 186 186 L168 186 Q174 150 156 118" fill="#5E8C3F"/>
  <circle cx="44" cy="190" r="12" fill="#D99C74"/><circle cx="176" cy="190" r="12" fill="#D99C74"/></g></symbol>
<symbol id="kr-kemal-kafa" viewBox="0 0 220 220" overflow="visible"><g ${C}>
  <ellipse cx="38" cy="116" rx="15" ry="20" fill="#D99C74"/><ellipse cx="182" cy="116" rx="15" ry="20" fill="#D99C74"/>
  <path d="M42 106 Q40 34 110 30 Q180 34 178 106 Q182 170 150 196 Q110 214 70 196 Q38 170 42 106 Z" fill="#E4A882"/>
  <path d="M44 92 Q40 40 110 34 Q180 40 176 92 Q160 58 110 56 Q60 58 44 92 Z" fill="#232323"/>
  <path d="M60 80 Q82 66 100 80 M120 80 Q138 66 160 80" fill="none" stroke-width="7"/>
  <circle cx="82" cy="96" r="5.5" fill="#16181D" stroke="none"/><circle cx="138" cy="96" r="5.5" fill="#16181D" stroke="none"/>
  <path d="M94 108 Q84 136 102 142 Q110 146 118 142 Q136 136 126 108 Q118 98 110 100 Q102 98 94 108 Z" fill="#D2876A"/>
  <path d="M58 156 Q74 132 110 148 Q146 132 162 156 Q150 162 140 156 Q130 168 110 160 Q90 168 80 156 Q70 162 58 156 Z" fill="#161616"/>
  <path d="M58 120 Q62 132 72 136 M162 120 Q158 132 148 136" fill="none" stroke-width="2" opacity=".6"/></g></symbol>

<symbol id="kr-zeynep-govde" viewBox="0 0 200 250" overflow="visible"><g ${C}>
  <path d="M78 200 L74 244 H96 L100 204 M106 204 L110 244 H132 L126 200" fill="#2F3B55"/>
  <path d="M56 92 Q100 76 144 92 L152 206 Q100 216 48 206 Z" fill="#B3121B"/><path d="M56 92 Q100 76 144 92 L152 206 Q100 216 48 206 Z" fill="url(#kr-tara)" opacity=".35"/>
  <path d="M80 86 Q100 100 120 86" fill="none"/>
  <path d="M56 100 Q36 146 50 188 L66 186 Q58 146 70 114" fill="#B3121B"/><path d="M144 100 Q164 146 150 188 L134 186 Q142 146 130 114" fill="#B3121B"/>
  <circle cx="58" cy="190" r="10" fill="#F2C7A6"/><circle cx="142" cy="190" r="10" fill="#F2C7A6"/></g></symbol>
<symbol id="kr-zeynep-kafa" viewBox="0 0 220 220" overflow="visible"><g ${C}>
  <circle cx="110" cy="22" r="26" fill="#6B3E22"/>
  <path d="M44 110 Q38 34 110 34 Q182 34 176 110 Q178 168 146 192 Q110 210 74 192 Q42 168 44 110 Z" fill="#F6D2B4"/>
  <path d="M42 112 Q36 40 110 36 Q184 40 178 112 Q170 70 140 60 Q120 78 82 66 Q54 76 42 112 Z" fill="#6B3E22"/>
  <ellipse cx="84" cy="106" rx="16" ry="19" fill="#FFFFFF"/><ellipse cx="136" cy="106" rx="16" ry="19" fill="#FFFFFF"/>
  <circle cx="86" cy="110" r="7.5" fill="#16181D" stroke="none"/><circle cx="134" cy="110" r="7.5" fill="#16181D" stroke="none"/>
  <circle cx="89" cy="106" r="2.4" fill="#fff" stroke="none"/><circle cx="137" cy="106" r="2.4" fill="#fff" stroke="none"/>
  <path d="M66 80 Q82 72 98 82 M122 82 Q138 72 154 80" fill="none" stroke-width="3.4"/>
  <path d="M106 124 Q112 142 104 146" fill="none" stroke-width="2.6"/>
  <ellipse cx="66" cy="140" rx="11" ry="7" fill="#F2A6A0" stroke="none" opacity=".7"/><ellipse cx="154" cy="140" rx="11" ry="7" fill="#F2A6A0" stroke="none" opacity=".7"/></g></symbol>

<symbol id="kr-agiz-normal" viewBox="0 0 220 220" overflow="visible"><path d="M98 172 Q110 176 122 172" fill="none" stroke="#16181D" stroke-width="3.2" stroke-linecap="round" filter="url(#kr-el)"/></symbol>
<symbol id="kr-agiz-konus" viewBox="0 0 220 220" overflow="visible"><path d="M96 170 Q110 192 124 170 Q110 176 96 170 Z" fill="#7A1F1F" stroke="#16181D" stroke-width="3" filter="url(#kr-el)"/></symbol>
<symbol id="kr-agiz-bagir" viewBox="0 0 220 220" overflow="visible"><path d="M88 168 Q110 214 132 168 Q110 176 88 168 Z" fill="#7A1F1F" stroke="#16181D" stroke-width="3" filter="url(#kr-el)"/><path d="M98 190 Q110 200 122 190" fill="#E06A6A"/></symbol>
<symbol id="kr-agiz-gul" viewBox="0 0 220 220" overflow="visible"><path d="M86 166 Q110 204 134 166 Q110 174 86 166 Z" fill="#7A1F1F" stroke="#16181D" stroke-width="3" filter="url(#kr-el)"/><path d="M92 168 Q110 176 128 168 L126 174 Q110 180 94 174 Z" fill="#fff"/></symbol>
<symbol id="kr-agiz-endise" viewBox="0 0 220 220" overflow="visible"><path d="M92 176 Q101 168 110 176 Q119 184 128 174" fill="none" stroke="#16181D" stroke-width="3.4" stroke-linecap="round" filter="url(#kr-el)"/></symbol>
<symbol id="kr-agiz-sasir" viewBox="0 0 220 220" overflow="visible"><ellipse cx="110" cy="176" rx="9" ry="12" fill="#7A1F1F" stroke="#16181D" stroke-width="3" filter="url(#kr-el)"/></symbol>
`;

// Her karakterin ağız yüksekliği, ceket ve ten rengi.
const K = {
  ahmet: { agizY: 4, ceket: "#2B3A5C", ten: "#F0BE98", govdeG: 200 },
  kemal: { agizY: 0, ceket: "#5E8C3F", ten: "#D99C74", govdeG: 220 },
  zeynep: { agizY: -4, ceket: "#B3121B", ten: "#F2C7A6", govdeG: 200 },
};

const SAHNE = {
  kahve: `<rect width="560" height="420" fill="#F4EBDD"/><rect x="0" y="300" width="560" height="120" fill="#D9C7A8"/>
    <g ${C}><rect x="380" y="40" width="150" height="110" fill="#BFD9E6"/><path d="M455 40 V150 M380 95 H530"/><path d="M30 70 H210" stroke-width="4"/></g>
    <g fill="#F7EFE2" stroke="#16181D" stroke-width="2"><path d="M44 46 l4 22 h12 l4 -22 z M94 46 l4 22 h12 l4 -22 z M144 46 l4 22 h12 l4 -22 z"/></g>`,
  sokak: `<rect width="560" height="420" fill="#CFE4EF"/><rect x="0" y="300" width="560" height="120" fill="#B9B4AA"/>
    <g ${C}><path d="M0 300 V120 H120 V300 M130 300 V70 H250 V300 M400 300 V100 H560 V300" fill="#E8D3B5"/>
    <path d="M20 150 h30 v34 h-30 z M70 150 h30 v34 h-30 z M20 210 h30 v34 h-30 z M150 100 h30 v34 h-30 z M200 100 h30 v34 h-30 z M150 170 h30 v34 h-30 z M420 130 h34 v36 h-34 z M480 130 h34 v36 h-34 z" fill="#BFD9E6"/></g>`,
  market: `<rect width="560" height="420" fill="#F1EEE6"/><rect x="0" y="300" width="560" height="120" fill="#D6D0C2"/>
    <g ${C}><rect x="20" y="40" width="520" height="250" fill="#EDE3D2"/><path d="M20 120 H540 M20 205 H540" stroke-width="4"/></g>
    <g fill="#F7F3EA" stroke="#16181D" stroke-width="2"><rect x="40" y="80" width="40" height="40"/><rect x="96" y="72" width="36" height="48"/><rect x="380" y="80" width="44" height="40"/><rect x="440" y="70" width="40" height="50"/><rect x="60" y="165" width="44" height="40"/><rect x="420" y="160" width="50" height="45"/></g>`,
  ev: `<rect width="560" height="420" fill="#EFE3EC"/><rect x="0" y="300" width="560" height="120" fill="#C9A98A"/>
    <g ${C}><rect x="200" y="40" width="160" height="120" fill="#BFD9E6"/><path d="M280 40 V160 M200 100 H360"/><path d="M196 36 h168" stroke="#8A5A3B" stroke-width="8"/>
    <path d="M30 300 V230 Q30 210 50 210 H150 Q170 210 170 230 V300" fill="#C46A4A"/></g>`,
  banka: `<rect width="560" height="420" fill="#E7ECF0"/><rect x="0" y="300" width="560" height="120" fill="#C9CFD6"/>
    <g ${C}><rect x="180" y="30" width="200" height="54" fill="#2B3A5C"/><path d="M40 300 V110 M520 300 V110" stroke-width="10" stroke="#B7BEC7"/></g>
    <text x="280" y="68" text-anchor="middle" font-family="Kalam, cursive" font-weight="700" font-size="30" fill="#F3E6D3">BANKA</text>`,
  bos: `<rect width="560" height="420" fill="#F4EBDD"/><rect x="0" y="300" width="560" height="120" fill="#D9C7A8"/>`,
};

// Eşyalar: (x) merkezde, zemine (y=300) oturur.
function nesne(ad, x) {
  const g = (ic) => `<g transform="translate(${x - 60} 186)" ${C}>${ic}</g>`;
  switch (ad) {
    case "cay": return g(`<path d="M10 114 h100 v-30 h-100 z" fill="#8A5A3B"/><path d="M48 50 Q42 68 50 84 H70 Q78 68 72 50 Z" fill="#F7EFE2"/><path d="M50 60 Q46 70 52 82 H68 Q74 70 70 60 Z" fill="#B24A1E" stroke="none"/>`);
    case "defter": return g(`<rect x="-10" y="0" width="140" height="104" rx="5" fill="#7A2E1F"/><rect x="-2" y="8" width="124" height="88" fill="#F7F0E1"/><path d="M60 8 V96"/><text x="4" y="32" font-family="Kalam" font-weight="700" font-size="15" fill="#B3121B" stroke="none">VERESİYE</text><path d="M4 48 H54 M4 62 H54 M4 76 H54 M68 34 H116 M68 48 H116 M68 62 H116 M68 76 H116" stroke-width="1.6" opacity=".6"/>`);
    case "grafik-yukari": return g(`<path d="M20 114 L40 0 M100 114 L80 0" stroke-width="5"/><rect x="-10" y="-20" width="140" height="96" fill="#FFFFFF"/><path d="M4 62 L34 44 L56 54 L96 10" stroke="#1C7A49" stroke-width="6" fill="none"/><path d="M84 8 L102 4 L98 22 Z" fill="#1C7A49"/>`);
    case "grafik-asagi": return g(`<path d="M20 114 L40 0 M100 114 L80 0" stroke-width="5"/><rect x="-10" y="-20" width="140" height="96" fill="#FFFFFF"/><path d="M4 0 L34 20 L56 12 L96 58" stroke="#B3121B" stroke-width="6" fill="none"/><path d="M84 60 L102 64 L100 46 Z" fill="#B3121B"/>`);
    case "fiyat": return g(`<path d="M0 30 L30 0 H120 V70 H30 Z" fill="#FFE65C"/><circle cx="26" cy="35" r="6" fill="#fff"/><text x="44" y="48" font-family="Kalam" font-weight="700" font-size="30" fill="#B3121B" stroke="none">₺₺₺</text><path d="M60 70 V114" stroke-width="4"/>`);
    case "ev": return g(`<path d="M10 114 V54 L60 14 L110 54 V114 Z" fill="#E8D3B5"/><path d="M0 60 L60 6 L120 60" fill="none" stroke-width="6" stroke="#B3121B"/><rect x="48" y="78" width="24" height="36" fill="#8A5A3B"/><path d="M80 30 l30 -26 h30 v24 h-30 z" fill="#FFE65C"/><text x="112" y="23" font-family="Kalam" font-weight="700" font-size="15" fill="#B3121B" stroke="none">₺₺₺</text>`);
    case "araba": return g(`<path d="M-6 96 V70 Q-6 60 6 58 L26 30 Q32 24 44 24 H86 Q96 24 102 32 L120 58 Q130 60 130 70 V96 Z" fill="#B3121B"/><path d="M34 34 H58 V58 H18 Z M66 34 H92 L108 58 H66 Z" fill="#BFD9E6"/><circle cx="22" cy="100" r="15" fill="#16181D"/><circle cx="104" cy="100" r="15" fill="#16181D"/><circle cx="22" cy="100" r="5" fill="#ccc"/><circle cx="104" cy="100" r="5" fill="#ccc"/>`);
    case "altin": return g(`<path d="M10 114 L22 84 H64 L76 114 Z M48 114 L60 84 H102 L114 114 Z M30 84 L42 54 H84 L96 84 Z" fill="#F2C744"/><path d="M44 60 h30 M26 90 h30 M64 90 h30" stroke="#FFF3B0" stroke-width="3"/>`);
    case "cuzdan": return g(`<rect x="10" y="40" width="100" height="70" rx="10" fill="#7A4A2A"/><path d="M10 60 H110" /><path d="M80 34 q8 -16 18 -6 q-4 10 -18 6 z M80 34 q-10 -14 -20 -2 q6 8 20 2 z" fill="#EDE6D6" stroke-width="2"/><circle cx="80" cy="34" r="3" fill="#16181D"/>`);
    case "kumbara": return g(`<ellipse cx="60" cy="74" rx="56" ry="38" fill="#F2A6B8"/><circle cx="110" cy="70" r="12" fill="#F2A6B8"/><path d="M50 40 h22" stroke-width="5"/><path d="M28 108 v8 M88 108 v8" stroke-width="7"/><circle cx="80" cy="64" r="4" fill="#16181D" stroke="none"/>`);
    case "domates": return g(`<path d="M0 114 V66 H120 V114 Z" fill="#B88A55"/><path d="M0 84 H120" stroke-width="2"/><circle cx="26" cy="56" r="18" fill="#D93A2B"/><circle cx="60" cy="50" r="20" fill="#D93A2B"/><circle cx="94" cy="56" r="18" fill="#D93A2B"/><path d="M54 30 l6 6 l6 -6 M20 38 l6 4 l6 -4 M88 38 l6 4 l6 -4" stroke="#3E8A3E" stroke-width="3"/>`);
    default: return "";
  }
}

// Kollar ve eşya tutma pozları.
function poz(ad, kim, cx, ust, s) {
  const k = K[kim]; const omuzY = ust + 228 * s;
  const kol = (d) => `<path d="${d}" fill="none" stroke="#16181D" stroke-width="${27 * s}" stroke-linecap="round" filter="url(#kr-el)"/><path d="${d}" fill="none" stroke="${k.ceket}" stroke-width="${20 * s}" stroke-linecap="round"/>`;
  const el = (x, y) => `<circle cx="${x}" cy="${y}" r="${13 * s}" fill="${k.ten}" stroke="#16181D" stroke-width="3" filter="url(#kr-el)"/>`;
  const sx = (d) => cx + d * s, sy = (d) => ust + d * s;
  switch (ad) {
    case "eller-havada":
      return kol(`M${sx(-56)} ${omuzY} Q${sx(-120)} ${sy(170)} ${sx(-104)} ${sy(40)}`) + el(sx(-104), sy(34)) + kol(`M${sx(56)} ${omuzY} Q${sx(120)} ${sy(170)} ${sx(104)} ${sy(40)}`) + el(sx(104), sy(34));
    case "isaret":
      return kol(`M${sx(56)} ${omuzY} Q${sx(120)} ${sy(180)} ${sx(106)} ${sy(50)}`) + el(sx(106), sy(44)) + `<path d="M${sx(106)} ${sy(32)} V${sy(6)}" stroke="#16181D" stroke-width="${7 * s}" stroke-linecap="round"/>`;
    case "kafa-kasi":
      return kol(`M${sx(56)} ${omuzY} Q${sx(140)} ${sy(170)} ${sx(96)} ${sy(50)}`) + el(sx(96), sy(46)) + `<text x="${sx(70)}" y="${sy(-6)}" font-family="Kalam" font-weight="700" font-size="${40 * s}" fill="#16181D">?</text>`;
    case "gazete":
      return `<g transform="translate(${sx(10)} ${sy(156)}) rotate(-6) scale(${s})" ${C}><rect width="150" height="104" fill="#FBFAF8"/><rect x="10" y="10" width="130" height="13" fill="#16181D" stroke="none"/><rect x="10" y="30" width="70" height="8" fill="#F2C744" stroke="none"/><path d="M10 50 H140 M10 62 H140 M10 74 H100" stroke-width="2" opacity=".6"/><path d="M96 94 L110 80 L120 86 L138 62" stroke="#B3121B" stroke-width="4" fill="none"/></g>` + el(sx(12), sy(256)) + el(sx(158), sy(240));
    case "telefon":
      return kol(`M${sx(56)} ${omuzY} Q${sx(112)} ${sy(220)} ${sx(86)} ${sy(140)}`) + `<g ${C}><rect x="${sx(74)}" y="${sy(92)}" width="${24 * s}" height="${44 * s}" rx="4" fill="#16181D"/><rect x="${sx(78)}" y="${sy(97)}" width="${16 * s}" height="${32 * s}" fill="#7FB2E5" stroke="none"/></g>` + el(sx(86), sy(140));
    default: return "";
  }
}

function efekt(ad, cx, ust, s) {
  const sx = (d) => cx + d * s, sy = (d) => ust + d * s;
  switch (ad) {
    case "ter": return `<path d="M${sx(92)} ${sy(50)} q${10 * s} ${18 * s} 0 ${26 * s} q${-10 * s} ${-8 * s} 0 ${-26 * s} z M${sx(-96)} ${sy(64)} q${8 * s} ${14 * s} 0 ${20 * s} q${-8 * s} ${-6 * s} 0 ${-20 * s} z" fill="#7FB2E5" stroke="#16181D" stroke-width="2"/>`;
    case "soru": return `<text x="${sx(80)}" y="${sy(10)}" font-family="Kalam" font-weight="700" font-size="${46 * s}" fill="#16181D">?</text><text x="${sx(108)}" y="${sy(-6)}" font-family="Kalam" font-weight="700" font-size="${32 * s}" fill="#16181D">?</text>`;
    case "unlem": return `<text x="${sx(84)}" y="${sy(10)}" font-family="Kalam" font-weight="700" font-size="${52 * s}" fill="#B3121B">!</text>`;
    case "sok": return `<g stroke="#E85D4F" stroke-width="5" stroke-linecap="round"><path d="M${sx(-120)} ${sy(80)} l${-40 * s} ${-14 * s} M${sx(-124)} ${sy(120)} l${-44 * s} ${4 * s} M${sx(-100)} ${sy(36)} l${-26 * s} ${-30 * s} M${sx(120)} ${sy(80)} l${40 * s} ${-14 * s} M${sx(124)} ${sy(120)} l${44 * s} ${4 * s} M${sx(100)} ${sy(36)} l${26 * s} ${-30 * s}"/></g>`;
    default: return "";
  }
}

let tanimlarEklendi = false;
function tanimlariEkle() {
  if (tanimlarEklendi) return;
  const d = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  d.setAttribute("width", "0"); d.setAttribute("height", "0"); d.setAttribute("aria-hidden", "true");
  d.style.position = "absolute";
  d.innerHTML = `<defs>${TANIMLAR}</defs>`;
  document.body.prepend(d);
  tanimlarEklendi = true;
}

const UST = 132; // kafaların tepesi; üstteki boşluk balonlara kalır

// Bir kareyi çizer: arka plan + eşya + karakterler + efektler; balonlar HTML olarak üstte.
function kareCiz(k, no) {
  const kisiler = Array.isArray(k.karakterler) ? k.karakterler.slice(0, 3) : [];
  const uc = kisiler.length === 3;
  const s = uc ? 0.8 : 1;
  const X = uc ? { sol: 100, orta: 280, sag: 460 } : { sol: 150, orta: 280, sag: 410 };
  const ust = UST + (uc ? 30 : 0);
  let svg = SAHNE[k.sahne] || SAHNE.bos;
  if (k.nesne && k.nesne !== "yok") svg += nesne(k.nesne, X[k.nesneYer] ?? X.orta);
  for (const c of kisiler) {
    if (!K[c.kim]) continue;
    const cx = X[c.yer] ?? X.orta, gG = K[c.kim].govdeG * s;
    svg += `<use href="#kr-${c.kim}-govde" x="${cx - gG / 2}" y="${ust + 128 * s}" width="${gG}" height="${250 * s}"/>`;
    svg += `<use href="#kr-${c.kim}-kafa" x="${cx - 110 * s}" y="${ust}" width="${220 * s}" height="${220 * s}"/>`;
    svg += `<use href="#kr-agiz-${IFADELER.includes(c.ifade) ? c.ifade : "normal"}" x="${cx - 110 * s}" y="${ust + K[c.kim].agizY * s}" width="${220 * s}" height="${220 * s}"/>`;
    svg += poz(c.poz, c.kim, cx, ust, s) + efekt(c.efekt, cx, ust, s);
  }
  const kare = document.createElement("div");
  kare.className = "kr-kare";
  kare.innerHTML = `<span class="kr-no">${no}</span><svg viewBox="0 0 560 420" role="img" aria-label="Karikatür karesi ${no}">${svg}</svg>`;

  // Balonlar: tek balon konuşanın üstünde ortalanır; iki balon varsa ilki solda, ikincisi sağda.
  const balonlar = Array.isArray(k.balonlar) ? k.balonlar.slice(0, 2) : [];
  const aciklama = [];
  balonlar.forEach((b, i) => {
    const konusan = kisiler.find((c) => c.kim === b.kim);
    const cxYuzde = ((konusan ? X[konusan.yer] ?? X.orta : 280) / 560) * 100;
    const gen = balonlar.length === 1 ? 62 : 47;
    let sol = balonlar.length === 1 ? cxYuzde - gen / 2 : i === 0 ? 2 : 51;
    sol = Math.max(2, Math.min(98 - gen, sol));
    const kuyruk = Math.max(14, Math.min(86, ((cxYuzde - sol) / gen) * 100));
    const el = document.createElement("div");
    el.className = "kr-balon";
    el.style.cssText = `left:${sol}%;width:${gen}%;--x:${kuyruk}%;--e:${cxYuzde < sol + gen / 2 ? "-18deg" : "18deg"}`;
    el.textContent = String(b.metin || "");
    kare.append(el);
    aciklama.push(`${b.kim === "ahmet" ? "Ahmet Amca" : b.kim === "kemal" ? "Esnaf Kemal" : "Zeynep"}: ${b.metin}`);
  });
  if (aciklama.length) kare.querySelector("svg").setAttribute("aria-label", `Kare ${no}. ${aciklama.join(" ")}`);
  return kare;
}

// Günün karikatürünü kurar ve bir HTML öğesi olarak döndürür.
export function karikaturCiz(spec) {
  tanimlariEkle();
  const kap = document.createElement("div");
  kap.className = "kr-bant";
  (Array.isArray(spec?.kareler) ? spec.kareler : []).forEach((k, i) => kap.append(kareCiz(k, i + 1)));
  return kap;
}
