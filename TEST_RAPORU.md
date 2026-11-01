# Test ve teslim raporu — 1 Kasım 2026

## Kaynak ve yedek

Önceki sohbetteki Canlanan_Turkce_Sozlugum_Prototip.zip bulundu ve esas alındı. ZIP'teki 18 dosyanın tamamı mevcut klasörle SHA-256 karşılaştırmasında aynı çıktı. Özgün ZIP ve klasör proje yanındaki tarihli YEDEK klasörüne kopyalandı; özgün ZIP değiştirilmedi.

## Yapılan değişiklikler

- Eksik assets/targets/sozluk.mind gerçek MindAR 1.2.5 tarayıcı derleyicisiyle üretildi. 840.601 bayt, biçim sürümü 2, iki hedef.
- Kesin sıra: elma.png = 0, agac.png = 1; her görsel 1100 × 770 piksel. Her hedefte 10 eşleştirme seviyesi ve 2 takip seviyesi var. SHA-256 kayıtları target-manifest.json dosyasında.
- Kamera başlatma işlemi artık MindAR arReady/arError olaylarını bekliyor. İzin reddinde hata gösteriliyor ve tekrar deneme mümkün. Zaman aşımında yenileme isteniyor, geç gelen kamera akışı kapatılıyor.
- Kamera videosu, 3D sahne ve düğmelerin katman sırası düzeltildi. Modeller küçültüldü, elma dik çevrildi ve ışık eklendi. Kamerasız önizlemede de elmanın yönü düzeltildi.
- Durdurma ve sayfadan ayrılmada kamera akışı kapatılıyor. Sekme arka plana geçince çalışan kamera durduruluyor.
- Eksik hedef/model ve yanlış hedef sırası için başlangıç kontrolleri güçlendirildi. GitHub Pages'e uygun göreli yollar ve .nojekyll korundu.
- Samsung Galaxy A52 rehberi ve güncel GitHub kurulum adımları eklendi.

## Doğrulamalar

| Kontrol | Sonuç |
|---|---|
| JavaScript sözdizimi | Başarılı |
| İki GLB — Khronos glTF Validator | 0 hata, 0 uyarı |
| GLB ek önerileri | Elma 9, Ağaç 14 düşük önem düzeyli bufferView.target önerisi; çalışmayı engellemiyor |
| GLB tarayıcı yükleme ve görsel kontrol | İki model yüklendi ve görüntülendi |
| .mind içeriği | İki hedef ve sürüm doğrulandı |
| Elma → 0 / Ağaç → 1 | Yapay kamera ile gerçek tanıma hattında doğrulandı |
| Hedef kaybı | Model gizlendi, kayıp mesajı geldi |
| Soru yanlış/doğru yanıtı | Başarılı |
| Kamerayı durdurma | Oluşturulan kamera akışının tüm kanalları ended durumunda |
| İzin reddi ve ardından tekrar başlatma | Başarılı |
| Eksik .mind | Açıklayıcı hata; başlatma düğmesi kapalı |
| Kamerasız önizlemede model değiştirme | Başarılı |
| HTML yerel dosya bağlantıları | 14 referans diskte mevcut ve HTTP 200 |
| Proje alt dizini | /canlanan-sozluk/ altında test edildi |
| Tarayıcı hataları / başarısız ağ istekleri | 0 / 0 |

Test ortamı: Windows, Microsoft Edge/Chromium, Playwright, 412 × 915 görünüm ve WebGL SwiftShader. Kamera fiziksel cihaz yerine hedef görsellerinin çizildiği 640 × 480 tuvalden üretildi; gerçek MindAR tanıma, takip ve A-Frame model yükleme kodu çalıştı. Tanıma olayları elle tetiklenmedi. Kullanılan CDN adresleri testte başarıyla yüklendi.

Ekran görüntüleri ve makine tarafından üretilen doğrulama sonuçları verification klasöründedir. Dosya bütünlük listesi DOSYA_BUTUNLUK.json içindedir.

## Bekleyenler ve sınırlar

- Kullanıcının GitHub hesabı açması, e-postasını doğrulaması ve giriş yapması gerekiyor. Depo ve Pages yayını henüz oluşturulmadı; canlı site adresi yok.
- Gerçek Samsung Galaxy A52, Android Chrome, fiziksel baskı, odaklama, telefon GPU'su ve performans testi yapılmadı. Yapay kamera testi bu sonuçların yerine geçmez.
- İzin penceresinin çok geç onaylanması, 90 saniyelik zaman aşımı ve telefonun uygulamalar arasında geçiş davranışı gerçek cihazda ayrıca denenmeli.
- Site CDN kütüphanelerine ve HTTPS kamera iznine bağlı. Kullanım çevrimdışı olarak doğrulanmadı.
- Basılı PDF özgün paketten korundu; yazıcıdan alınmış fiziksel çıktı incelenmedi.

## Sonraki kullanıcı adımı

GitHub hesabınızı açıp giriş yapın. KURULUM_REHBERI.md ile bu klasörün içindekileri public depoya yükleyin, Settings → Pages → main → /(root) üzerinden yayını açın. Ardından SAMSUNG_A52_ILK_TEST.md adımlarını uygulayın.

Resmî belgeler: [MindAR derleyicisi](https://hiukim.github.io/mind-ar-js-doc/tools/compile/), [MindAR 1.2.5 kaynak kodu](https://github.com/hiukim/mind-ar-js/tree/v1.2.5), [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).
