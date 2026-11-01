# GitHub hesabından ilk yayına

1 Kasım 2026. Henüz GitHub hesabı olmadığı için giriş ve yayımlama bekliyor. Parolanızı veya doğrulama kodunuzu sohbetle paylaşmayın.

## 1. Hesap açın

1. Bilgisayarda https://github.com/ adresini açın. Sign up ile hesap oluşturun.
2. E-posta doğrulamasını tamamlayın, Sign in ile giriş yapın. Kullanıcı adınızı not edin.

## 2. Depo oluşturun

1. Sağ üstte + → New repository seçin.
2. Adını canlanan-turkce-sozlugum yapın.
3. Public seçin. GitHub Free ile bu yöntemde açık depo gerekir.
4. Add README seçeneğini açıp Create repository düğmesine basın.

## 3. Dosyaları yükleyin

1. Hazır ZIP kullanıyorsanız önce ayrı bir klasöre çıkarın.
2. Depoda Add file → Upload files seçin.
3. Proje klasörünün İÇİNDEKİLERİ sürükleyin: assets, css, data, js, print, HTML/Markdown dosyaları ve .nojekyll.
4. ZIP'i veya fazladan bir üst klasörü yüklemeyin. Depo açılınca doğrudan index.html görünmelidir.
5. Commit changes ile tamamlayın. README sorulursa paketteki yeni sürümü kullanın.
6. assets/targets/sozluk.mind (840.601 bayt) ve assets/models içindeki iki GLB'nin yüklendiğini kontrol edin.
7. .nojekyll görünmüyorsa Add file → Create new file ile bu isimde dosya oluşturun; içine boş satır ekleyip kaydedin.

Yedekleri, araç klasörünü veya node_modules klasörünü yüklemeyin. Hazır yayın paketinde bu araçlar bulunmaz.

## 4. Pages'i açın

1. Settings → Pages bölümüne gidin.
2. Build and deployment → Source: Deploy from a branch seçin.
3. Branch: main, klasör: /(root) seçip Save düğmesine basın.
4. Birkaç dakika bekleyin. GitHub belgeleri yayının 10 dakikaya kadar sürebileceğini belirtir.
5. Aynı ekrandaki Visit site bağlantısını açın. Adres biçimi:
   https://KULLANICI_ADINIZ.github.io/canlanan-turkce-sozlugum/

Kullanıcı adı bir yer tutucudur. Gerçek adresi Pages ekranından kopyalayın.

## 5. İlk kontrol

1. Ana sayfada Hazır! mesajını görün.
2. Kamerasız 3D modelleri incele bağlantısında iki modeli açın.
3. PDF'nin iki sayfasını yazdırın.
4. Aynı HTTPS adresini Samsung A52'de Chrome'a yazın. SAMSUNG_A52_ILK_TEST.md rehberini izleyin. QR kod gerekmez.

Henüz depo, canlı URL veya uzaktan yayın testi oluşturulmadı.

Resmî kaynak: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
