# FİNANSAL OKURYAZAR

Paranın dilini sade Türkçeyle anlatan, her sabah kendiliğinden çıkan **ücretsiz** günlük ekonomi gazetesi.
Telefonda uygulama gibi, bilgisayarda gazete gibi okunur.

---

## Her sabah ne oluyor? (hepsi otomatik)

| Saat (İstanbul) | Ne olur | Kim yapar |
|---|---|---|
| 06.30 | Dolar, euro, altın, gümüş, Bitcoin rakamları resmî ve ücretsiz kaynaklardan çekilir (TCMB, Avrupa Merkez Bankası, CoinGecko, gold-api) | GitHub (ücretsiz) |
| 07.00 | Claude haberleri araştırır, her rakamı ikinci bir kaynakla karşılaştırır, sayıyı yazar | Claude aboneliğin (bulutta, bilgisayarın kapalı olabilir) |
| ~07.30 | Sayı **denetimden** geçer. Eksik, hatalı ya da "şunu al" diyen bir şey varsa yayınlanmaz | GitHub (ücretsiz) |
| ~07.35 | Gazete yayında; telefonundaki uygulama açılınca yeni sayı gelir | GitHub Pages (ücretsiz) |

Bir sabah bir şey ters giderse sitede dünkü sayı kalır ve üstte "Bugünkü sayı henüz yayımlanmadı" yazar. Yani yanlış bilgi yerine hiç bilgi yayınlanmaz.

## Aylık maliyet

**0 TL.** GitHub ve GitHub Pages ücretsiz. Sabah yazısını yazan Claude, zaten ödediğin Claude aboneliğinin kullanım hakkından yer. Ayrıca API anahtarı veya ücretli hizmet yok.

## Telefona uygulama gibi kurmak

1. Gazetenin adresini telefonda aç (adres kurulumdan sonra burada yazacak).
2. **iPhone (Safari):** Paylaş düğmesi → "Ana Ekrana Ekle".
   **Android (Chrome):** Sağ üstteki üç nokta → "Ana ekrana ekle" veya "Uygulamayı yükle".
3. Ana ekranda kırmızı-siyah **FO** simgesi çıkar. İnternet yokken bile son açtığın sayıyı okuyabilirsin.

## Gazetede neler var?

1. **Manşet** · günün en önemli haberi, kısaca maddeler, günün özeti, "Bu sayıda" içindekiler
2. **Piyasalar** · her rakamın yanında "neden oynadı, cebine etkisi ne"
3. **Günün Dosyası** · bir konuyu baştan sona sade anlatım, "Bu ne demek?" kutuları
4. **Türkiye ve Dünya** · her haberde "Cebine etkisi" ve kaynak bağlantısı
5. **Yapay Zekâ ve Teknoloji**
6. **Köşe Yazıları** · Sabah Kahvesi, Piyasa Pusulası, Cüzdan Sohbetleri
7. **Bundan Sonra Ne Olabilir?** · iyi giderse / kötü giderse (tavsiye değil)
8. **Ajanda** · yaklaşan önemli tarihler
9. **Sözlük** · günün kavramları
10. **Kaynaklar ve Teyit Notları** · emin olunamayan her şey açıkça yazılır

Üstteki **A− / A+** yazıyı büyütür, **◐** gece/gündüz görünümünü değiştirir, **Arşiv** listesinden eski sayılar açılır.

## Doğruluk nasıl sağlanıyor?

- Kur, altın ve kripto rakamları resmî kaynaklardan **makine ile** çekilir; Claude bunları ikinci bir kaynakla karşılaştırır.
- Her haberin altında tıklanabilir bir kaynak bağlantısı vardır.
- Teyit edilemeyen her bilgi son sayfada "Teyit notları" başlığıyla açıkça yazılır.
- Yayından önce bir **denetleyici** (`sema.js`) her sayıyı kontrol eder: eksik bölüm, bozuk rakam, kaynaksız liste, köşede kişi adı, "hemen alın / kesin kazanç" gibi ifadeler varsa sayı yayınlanmaz.

> Yapay zekâ ile hazırlanan her içerik gibi bu gazete de hata yapabilir. Önemli bir para kararından önce resmî kaynağa bakmak her zaman iyi bir alışkanlık.

---

## Kurulumda senden beklenenler (bir kez)

1. **GitHub hesabı** (ücretsiz): github.com → Sign up. Bu bilgisayarda zaten `adnanakyuz` hesabıyla giriş yapılmış.
2. Claude Code'a "yayınla" demen yeterli. Gerisini o yapar:
   - GitHub'da `finansal-okuryazar` adlı herkese açık bir depo açar ve dosyaları yükler,
   - GitHub Pages'i açar (gazetenin adresi: `https://adnanakyuz.github.io/finansal-okuryazar/`),
   - her sabah 07.00'de çalışan bulut görevini kurar.
3. İsteğe bağlı: claude.ai'deki eski 07.07 görevini kapatmak (claude.ai → Ayarlar → Zamanlanmış görevler). İkisi aynı anda çalışabilir ama gereksiz kullanım hakkı harcar.

## Talimatı veya tasarımı değiştirmek

- **Gazetenin içeriği, tonu, bölümleri:** `PROMPT.md` dosyası. Her sabah Claude bu dosyayı okur.
- **Görünüm:** `index.html`.
- **Denetim kuralları:** `sema.js`.

Bunları kendin değiştirmek zorunda değilsin; Claude Code'a "köşe yazılarını ikiye indir" gibi söylemen yeterli.

## Bilgisayarda denemek (isteğe bağlı)

```bash
powershell -ExecutionPolicy Bypass -File scripts/sunucu.ps1
```

Sonra tarayıcıda `http://localhost:8765` adresini aç.

---

## Dosyalar (meraklısına)

| Dosya | Ne işe yarar |
|---|---|
| `index.html` | Gazetenin kendisi (tasarım + okuma) |
| `sema.js` | Denetleyici: bir sayının kurallara uyup uymadığını kontrol eder |
| `sw.js`, `manifest.webmanifest`, `ikonlar/` | Telefona uygulama gibi kurulum ve internetsiz okuma |
| `sayilar/YYYY-AA-GG.json` | Her günün sayısı. `sayilar/index.json` arşiv listesi |
| `veri/rakamlar.json` | Her sabah otomatik çekilen rakamlar |
| `scripts/rakamlar.mjs` | Rakamları çeken program |
| `scripts/arsiv.mjs`, `scripts/dogrula.mjs` | Arşiv listesini kurar / sayıları denetler |
| `.github/workflows/` | GitHub'ın sabah işleri: rakam çekme, denetleme, yayınlama |
| `PROMPT.md` | Claude'un sabah yazı işleri talimatı |

### Kullanılan ücretsiz veri kaynakları

17 Ekim 2026'da denendi, hiçbiri hesap veya anahtar istemiyor:

| Kaynak | Ne veriyor | Not |
|---|---|---|
| TCMB `today.xml` | Resmî döviz kurları | İş günleri 15.30'da güncellenir |
| Frankfurter (Avrupa Merkez Bankası) | Dolar/TL, euro/dolar | İş günleri akşam güncellenir |
| CoinGecko | Bitcoin, Ethereum | Ücretsiz, dakikada birkaç istek sınırı var |
| gold-api.com | Ons altın, ons gümüş | Anlık; gram altın bundan hesaplanır |

Borsa İstanbul, Brent petrol ve ABD borsaları için ücretsiz ve resmî bir veri servisi yok; bu rakamları Claude her sabah iki haber kaynağından teyit ederek yazar. TCMB EVDS ve FRED de ücretsiz ama hesap ve anahtar istedikleri için kurulumu sade tutmak adına kullanılmadı; istenirse sonradan eklenebilir.
