# Canlanan Türkçe Sözlüğüm

Elma ve Ağaç için QR kodsuz, basılı görsel tanıyan iki kelimelik WebAR eğitim prototipi. MindAR 1.2.5 + A-Frame 1.5.0, iki GLB model, tanımlar, örnek cümleler ve sorular içerir.

[Kurulum](KURULUM_REHBERI.md) · [Samsung A52 testi](SAMSUNG_A52_ILK_TEST.md) · [Test raporu](TEST_RAPORU.md) · [Sorun giderme](SORUN_GIDERME.md)

GitHub Pages için hazır statik dosyalar. Derleme veya sunucu kurulumu gerekmez. index.html depo kökünde olmalıdır. Yollar depo alt dizininde çalışacak şekilde göreli tutuldu. .nojekyll dahildir.

assets/targets/sozluk.mind hazır: hedef 0 Elma, hedef 1 Ağaç. Kaynak ve çıktı özetleri assets/targets/target-manifest.json içindedir. Görseller değiştirilirse aynı sırayla yeniden derleyin.

Masaüstü Edge/Chromium'da gerçek MindAR hattı yapay kamera görselleriyle iki hedefi tanıdı. Samsung Galaxy A52 ve fiziksel baskı testi bekleniyor; cihaz uyumluluğu henüz doğrulanmadı.

HTTPS, kamera izni, WebGL ve CDN kütüphaneleri için internet gerekir. ARCore veya ayrı uygulama kurulumu gerekmez. onizleme.html kamerasız model inceleme sayfasıdır.

[Basılabilir A4 PDF](print/Sozluk_Sayfalari_A4.pdf). Yalnızca özgün hedef görseller tanınır; herhangi bir elma/ağaç fotoğrafı hedef değildir.

Resmî kaynaklar: [MindAR](https://github.com/hiukim/mind-ar-js/tree/v1.2.5), [derleyici](https://hiukim.github.io/mind-ar-js-doc/tools/compile/), [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).
