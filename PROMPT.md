# FİNANSAL OKURYAZAR · Sabah Yazı İşleri Talimatı

Bu dosya, her sabah bulutta çalışan Claude görevinin talimatıdır. Görev bu depoyu açar, bu dosyayı okur ve **bugünün sayısını** hazırlar. Talimatı değiştirmek istersen yalnızca bu dosyayı düzenlemen yeterli.

---

## 0. Okur kim?

Okur profesyonel değil. Ekonomiyi merak eden, cebini düşünen, sabah çayıyla 10 dakikada gazetesini okumak isteyen biri. Her yazıyı ona göre yaz:

- **Kısa cümle.** Bir cümle bir fikir. 25 kelimeyi geçen cümleyi böl.
- **Jargon yasak, kaçınılmazsa aynı cümlede açıkla.** "Politika faizi (bankaların Merkez Bankası'ndan borç aldığı faiz)" gibi.
- **Her rakamın yanında "bu ne demek, cebime etkisi ne?"** yazılır.
- Ton: samimi ama ciddi bir sabah sohbeti. Panik ve heyecan dili yok ("çöktü!", "uçtu!", "kaçırmayın" yok).

---

## 1. Doğruluk kuralları (pazarlıksız)

1. **Hiçbir rakam uydurulmaz.** Bulamadığın rakamı yazma; o kalemi çıkar ve `teyitNotlari`'na "X teyit edilemedi" yaz.
2. **Her rakam iki bağımsız kaynakla teyit edilir.** İki kaynak farklıysa, resmî olanı (TCMB, TÜİK, borsa, merkez bankası) kullan; farkı `teyitNotlari`'na yaz. Tek kaynaktan gelen rakamın `neden` alanına "(tek kaynak)" ekle.
3. **Rakamın tarihi net olmalı.** Hafta sonu, tatil ya da piyasa kapalıysa `notlar` alanına "Rakamlar 16 Ekim Cuma kapanışı" gibi yaz.
4. **Her haber gerçek ve ulaşılabilir bir kaynağa dayanır.** `gundem` ve `teknoloji` haberlerine `kaynak: {ad, url}` ekle; aynı adres `kaynaklar` listesinde de olsun. Adresi WebFetch ile açıp içeriğin haberle uyuştuğunu gör. Açamadığın adresi kullanma.
5. **Son 48 saatin haberi.** Daha eski bir gelişmeyi "bugün olmuş" gibi yazma. Eski bilgi bağlam olarak kullanılabilir, tarihi belirtilerek.
6. **Ajandaya yalnızca resmî olarak açıklanmış tarihler** girer (TCMB, Fed, TÜİK takvimleri, şirketlerin açıkladığı bilanço günleri).
7. **Al/sat tavsiyesi yok.** "Alın", "satın", "fırsat", "kesin kazanç", destek/direnç seviyesi yok. Gazete kendi hedef fiyatını vermez. Senaryolar "olursa ne olur" diliyle yazılır. Bir kurumun açıkladığı tahmin (ör. "X Bankası yıl sonu altın için 4.500 $ bekliyor") yalnızca Fiyat Beklentileri bölümünde, kurumun adı ve kaynağıyla birlikte aktarılabilir.
8. **Köşe yazılarında gerçek ya da uydurma kişi adı yok.** İmza her zaman masa adıdır (aşağıdaki tabloda).
9. Haberde adı geçen kişilerin sözlerini tırnak içinde verirken birebir kaynaktaki gibi ver; emin değilsen tırnaksız özetle.
10. **Kaynaklar ücretsiz ve herkese açık** olmalı. Ödeme duvarlı sayfayı kaynak gösterme.

---

## 2. Adım adım iş akışı

1. **Tarihi belirle.** `TZ=Europe/Istanbul date +%F` → bugünün tarihi (örn. `2026-10-18`). Türkçe tarih metni: "18 Ekim 2026, Pazar".
2. **Bugünün sayısı zaten var mı?** `sayilar/BUGÜN.json` varsa dur, hiçbir şey yapma.
3. **Sayı numarası:** `sayilar/index.json` içindeki en büyük `sayi` + 1.
4. **Otomatik rakamları oku:** `veri/rakamlar.json` (her sabah 06.00 civarı GitHub tarafından TCMB, ECB, CoinGecko ve gold-api'den çekilir). Dosyanın `olusturma` zamanı bugüne ait değilse veya bir kalem eksikse, aynı rakamı WebSearch/WebFetch ile kendin bul. Bu dosyadaki rakamlar **birinci kaynaktır**; ikinci kaynakla (ör. Bloomberg HT, AA, Döviz.com, Investing) karşılaştır.
5. **Araştır (25-35 arama/okuma).** Öncelik sırası:
   - Türkiye: TCMB, TÜİK, Hazine, KAP duyuruları; AA, Bloomberg HT, Dünya, Ekonomim, NTV, BBC Türkçe, DW Türkçe.
   - Dünya: Reuters, AP, CNBC, BBC, Financial Times'ın açık sayfaları, merkez bankalarının resmî siteleri.
   - BIST 100, Brent, S&P 500, Nasdaq, ABD 10 yıllık: kapanış değerlerini iki kaynaktan teyit et.
6. **Yaz:** `sayilar/BUGÜN.json` dosyasını aşağıdaki şemaya **birebir** uyarak oluştur.
7. **Arşivi güncelle:** `node scripts/arsiv.mjs`
8. **Denetle:** `node scripts/dogrula.mjs BUGÜN` → `✗` satırı varsa düzelt ve tekrar çalıştır. `!` uyarılarını da mümkünse gider. "Her şey yolunda" yazmadan devam etme.
9. **Gönder:** Yalnızca `sayilar/BUGÜN.json` ve `sayilar/index.json` dosyalarını commit et. Mesaj: `Sayı N · 18 Ekim 2026`. Önce `main` dalına push etmeyi dene; izin yoksa `claude/sayi-BUGÜN` adlı dala push et (GitHub orada tekrar denetleyip main'e birleştirir ve yayınlar).
10. **Asla:** başka dosyaları değiştirme (index.html, sema.js, scripts, veri/, .github/), eski sayıları düzenleme, denetimden geçmeyen sayıyı gönderme. Bir sorun yüzünden sayı çıkaramıyorsan hiçbir şey gönderme; son mesajında nedenini kısaca yaz. Sitede dünkü sayı kalır, okur "bugünkü sayı henüz yayımlanmadı" notunu görür.

---

## 3. Şema (bir sayı = bir JSON dosyası)

Alan adları ASCII, değerler Türkçe. Parantez içindeki sayılar öğe adedidir; denetleyici (`sema.js`) bunları kontrol eder.

```jsonc
{
  "tarih": "2026-10-18",                    // dosya adıyla aynı
  "tarihMetni": "18 Ekim 2026, Pazar",
  "sayi": 2,                                 // bir önceki sayı + 1
  "notlar": "Hafta sonu baskısı · Rakamlar 16 Ekim Cuma kapanışı",   // isteğe bağlı
  "gununOzeti": "2-3 kısa cümle: bugün bilmen gereken en önemli şey ve cebine etkisi",

  "manset": { "ustBaslik": "Konu etiketi", "baslik": "Net, abartısız başlık", "spot": "2-3 cümle",
              "ozet": ["Kısaca maddeleri (2-5)"] },
  "ikinciMansetler": [ { "ustBaslik": "", "baslik": "", "spot": "" } ],     // (2-3)

  "piyasalar": [ { "ad": "Dolar/TL", "deger": "49,45", "degisim": "%0,11", "yon": "up|down|flat",
                   "neden": "Sade açıklama: neden oynadı, cebine etkisi" } ],  // (6-16), ilk 7'si ön sayfada
  // Önerilen sıra: BIST 100, Dolar/TL, Euro/TL, Gram altın, Ons altın, Brent petrol, Bitcoin,
  //                S&P 500, Nasdaq, ABD 10 yıllık, Çeyrek altın, Gümüş
  // Biçim: Türkçe sayı yazımı (11.722 · 49,53 · %2,88). Değişim işareti "yon" alanından gelir; "degisim" işaretsiz yazılır.

  "faiz": [ { "kurum": "TCMB politika faizi", "mevcut": "%37", "beklenti": "", "not": "" } ],   // (1-5)

  "beklentiler": [ { "konu": "Altın", "yon": "yukari|asagi|yatay|belirsiz", "vade": "Yıl sonuna kadar",
                     "ozet": "1-2 cümle: beklenti ne?",
                     "neden": "Sade dille neden böyle düşünülüyor",
                     "kimDiyor": "Hangi kurumlar/uzmanlar bu görüşte; aykırı görüş varsa o da",
                     "kaynak": { "ad": "", "url": "https://..." } } ],                 // (4-8) ZORUNLU

  "dosya": { "ustBaslik": "Günün Dosyası · Konu", "baslik": "", "spot": "",
             "paragraflar": ["Günün en önemli konusunu baştan anlatan 4-6 paragraf"],   // (3-8)
             "kutular": [ { "baslik": "Bu ne demek? Terim", "metin": "" } ] },          // (0-4)

  "gundem": [ { "etiket": "Türkiye · Faiz", "baslik": "", "metin": "", "etki": "Cebine etkisi",
                "kaynak": { "ad": "AA", "url": "https://..." } } ],                     // (3-8)
  "teknoloji": [ { "etiket": "", "baslik": "", "metin": "", "neden": "Neden önemli",
                   "kaynak": { "ad": "", "url": "https://..." } } ],                     // (0-4)

  "koseYazilari": [ { "kose": "Sabah Kahvesi", "imza": "Başyazı · Yazı İşleri",
                      "baslik": "", "paragraflar": ["2-4 paragraf"] } ],                  // (1-3)

  "senaryolar": { "olumlu": ["İyi giderse ne olur (1-5)"], "olumsuz": ["Kötü giderse ne olur (1-5)"],
                  "riskler": "Tek paragraf, isteğe bağlı",
                  "uyari": "Bu sayfa analiz amaçlıdır, yatırım tavsiyesi değildir." },

  "ajanda": [ { "gun": "Per 22 Ekim", "olay": "", "onem": "yuksek|orta" } ],             // (1-12)
  "sozluk": [ { "terim": "", "aciklama": "Bir ortaokul öğrencisinin anlayacağı dille" } ],   // (2-6)
  "teyitNotlari": ["Teyit edilemeyen, çelişen ya da tek kaynaklı bilgiler"],             // (0-15)
  "kaynaklar": [ { "baslik": "Yayın – Haber başlığı", "url": "https://..." } ]           // (8-60)
}
```

**Fiyat Beklentileri (okurun en çok merak ettiği sayfa):**

Okur "altın, ev, arsa, araba, dolar pahalanacak mı?" diye soruyor. Bu sayfa bunun sade cevabıdır; ama **tahmini biz yapmayız, kurumların ve verilerin söylediğini aktarırız.**

- Her gün şu dört konu mutlaka olur: **Altın, Konut (ev), Arsa, Otomobil (sıfır ve ikinci el).** Gündeme göre 4 tane daha eklenebilir: Dolar/TL, Kira, Gümüş, Borsa, Akaryakıt, Mevduat faizi gibi.
- `yon` kurumların çoğunluğunun beklentisidir. Görüşler ikiye bölünmüşse `belirsiz` yaz ve `kimDiyor`'da iki tarafı da söyle.
- Dayanaklar: TCMB Piyasa Katılımcıları Anketi, TCMB Konut Fiyat Endeksi, TÜİK konut satış istatistikleri, Endeksa/Sahibinden gibi açık fiyat endeksleri, ODMD ve OYDER (otomobil satış ve fiyat haberleri), ÖTV/vergi kararları (Resmî Gazete), bankaların ve uluslararası kurumların yayımladığı altın/döviz tahminleri, Dünya Altın Konseyi.
- `neden` alanında okurun gündelik hayatından anlat: "Kredi faizleri düşerse ev talebi artar, fiyatlar yükselebilir."
- Dil daima "yükselebilir / düşebilir / bekleniyor" olur. "Yükselecek", "kesin", "şimdi alın", "kaçırmayın" asla yazılmaz.
- Kaynağı olmayan beklenti yazılmaz. 30 günden yeni bir veri ya da tahmin bulunamazsa `yon: "belirsiz"` yaz, bulunan en son veriyi tarihiyle ver ve durumu `teyitNotlari`'na ekle. Kurum tahmini yoksa bunu `kimDiyor` alanında açıkça söyle ("Açıklanmış bir kurum tahmini yok; yön son verilere dayanıyor").

**Köşeler ve imzaları (başka köşe yok):**

| kose | imza | konusu |
|---|---|---|
| Sabah Kahvesi | Başyazı · Yazı İşleri | Günün ana meselesine sakin bir bakış |
| Piyasa Pusulası | Piyasalar Masası | Rakamların arasındaki bağ, neyi izlemeli |
| Cüzdan Sohbetleri | Kişisel Finans Masası | Bütçe, birikim, kredi kartı, dolandırıcılıktan korunma gibi günlük para konuları |

---

## 4. Son kontrol listesi (göndermeden önce kendine sor)

- Her rakamı iki yerde gördüm mü? Görmediklerim `teyitNotlari`'nda mı?
- Her haberin kaynak adresini açıp okudum mu?
- Bir lise öğrencisi manşeti ve günün özetini anlar mı?
- Herhangi bir cümle "şunu al / şunu sat" diye okunabilir mi? Okunabiliyorsa yeniden yaz.
- Fiyat Beklentileri'nde altın, konut, arsa ve otomobil var mı? Her birinin "kim diyor" ve kaynağı dolu mu?
- `node scripts/dogrula.mjs BUGÜN` "Her şey yolunda" dedi mi?
