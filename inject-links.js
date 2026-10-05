/* inject-links.js — افزودن بلوک «دسته‌بندی‌های مرتبط» به صفحات اصلی + لینک‌دهی کارت‌های خدمات
   اجرا: node inject-links.js  (idempotent: در اجرای مجدد تکرار ایجاد نمی‌شود) */
const fs = require("fs"), path = require("path");

/* نگاشت عنوان کارت خدمات → آدرس صفحهٔ اختصاصی آن سرویس */
const SERVICE_MAP = {
  "کلیپ تولد برای رفیق": "service/klip-refiq.html",
  "کلیپ تولد برای مادر": "service/klip-madar.html",
  "کلیپ تولد برای پدر": "service/klip-pedar.html",
  "کلیپ تولد دخترانه": "service/klip-dokhtar.html",
  "کلیپ تولد پسرانه": "service/klip-pesar.html",
  "کلیپ تولد خواهر": "service/klip-khahar.html",
  "کلیپ تولد برادر": "service/klip-baradar.html",
  "کلیپ تولد همسر": "service/klip-hamser.html",
  "کلیپ تولد عشقم": "service/klip-eshgham.html",
  "کلیپ سالگرد ازدواج": "service/klip-salgard.html",
  "مناسبت‌های خاص": "service/klip-monasebat.html",
  "کلیپ تولد کودک": "service/klip-koodak.html",
  "کارت تبریک دیجیتال": "service/kart-taborik.html",
  "پوستر تولد": "service/poster-tavalod.html",
  "استوری اینستاگرام": "service/story-instagram.html",
  "بنر تبریک": "service/banner-taborik.html",
  "ویرایش ویدیو": "service/video-edit.html",
  "اضافه کردن موزیک دلخواه": "service/music-add.html",
  "متن و اسم اختصاصی": "service/text-name.html",
  "افکت ویژه + تحویل فوری": "service/effects.html",
};

function linkServiceCards(html) {
  let n = 0;
  const lines = html.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const L = lines[i];
    if (!L.includes('<div class="card') || !L.includes('reveal">') || L.includes("جزئیات و نمونه")) continue;
    const h3 = L.match(/<h3>([^<]+)<\/h3>/);
    if (!h3) continue;
    const href = SERVICE_MAP[h3[1]];
    if (!href) continue;
    const btn = L.match(/<a href="(?:\.\.\/)?order\.html"[^>]*class="btn[^"]*btn-sm">[^<]*<\/a>/);
    if (!btn) continue;
    lines[i] = L.replace(btn[0], `<span style="display:inline-flex;gap:8px;flex-wrap:wrap">${btn[0]}<a href="${href}" class="btn btn-outline btn-sm">جزئیات و نمونه ←</a></span>`);
    n++;
  }
  // تبدیل لینک‌های نادرست ../ در همین صفحه (services.html ریشه‌ای است)
  html = lines.join("\n").replace(/href="\.\.\//g, 'href="').replace(/src="\.\.\//g, 'src="');
  return [html, n];
}

/* بلوک لینک‌سازی داخلی مرتبط (قبل از </main> تزریق می‌شود) */
const RELATED_BLOCK = `
<section class="section related" id="related-topics" aria-label="موضوعات مرتبط">
  <h2 class="section-title">🧩 موضوعات <span class="grad-text">مرتبط</span></h2>
  <p class="section-sub">مسیرهای پرطرفدار برای ادامهٔ بازدید در سایت کلیپ تولد</p>
  <div class="grid grid-4">
    <a href="landing-page/klip-tavalod-baraye-madar.html" class="card reveal"><div class="card-icon">🤩</div><h3>کلیپ تولد مادر</h3><p>احساسی و ماندگار</p></a>
    <a href="landing-page/klip-tavalod-baraye-pedar.html" class="card reveal"><div class="card-icon">💪</div><h3>کلیپ تولد پدر</h3><p>حماسی و باشکوه</p></a>
    <a href="landing-page/klip-tavalod-baraye-refiq.html" class="card reveal"><div class="card-icon">👥</div><h3>کلیپ تولد رفیق</h3><p>صمیمی و خلاقانه</p></a>
    <a href="landing-page/klip-tavalod-baraye-hamser.html" class="card reveal"><div class="card-icon">🥰</div><h3>کلیپ تولد همسر</h3><p>خاطرات دو نفره</p></a>
    <a href="landing-page/klip-tavalod-baraye-koodak.html" class="card reveal"><div class="card-icon">🧒</div><h3>کلیپ تولد کودک</h3><p>تم کارتونی شاد</p></a>
    <a href="landing-page/klip-salgard-ezdavaj.html" class="card reveal"><div class="card-icon">💍</div><h3>سالگرد ازدواج</h3><p>فیلم کوتاه عاشقانه</p></a>
    <a href="landing-page/klip-yalda.html" class="card reveal"><div class="card-icon">🍉</div><h3>شب یلدا</h3><p>انار، حافظ، شب چله</p></a>
    <a href="landing-page/klip-nowruz.html" class="card reveal"><div class="card-icon">🌱</div><h3>نوروز</h3><p>هفت‌سین و تحویل سال</p></a>
    <a href="pricing.html" class="card reveal"><div class="card-icon">💰</div><h3>تعرفه‌ها</h3><p>جدول کامل قیمت‌ها</p></a>
    <a href="faq.html" class="card reveal"><div class="card-icon">❓</div><h3>سوالات متداول</h3><p>پاسخ همه پرسش‌ها</p></a>
    <a href="track-order.html" class="card reveal"><div class="card-icon">📦</div><h3>پیگیری سفارش</h3><p>وضعیت لحظه‌ای سفارش</p></a>
    <a href="blog/index.html" class="card reveal"><div class="card-icon">📝</div><h3>وبلاگ</h3><p>ایده، آهنگ و متن تبریک</p></a>
  </div>
  <p style="text-align:center;margin-top:26px">
    <a href="categories.html" class="chip">کلیپ بر اساس ماه ⚡</a>
    <a href="category/day/jome.html" class="chip">متولدین جمعه 🎉</a>
    <a href="party-supplies/index.html" class="chip">وسایل و تزیینات تولد 🎈</a>
    <a href="advertising.html" class="chip">تبلیغات در کانال 📣</a>
    <a href="earning.html" class="chip">درآمدزایی با ما 🤝</a>
    <a href="search.html" class="chip">جستجوی هوشمند 🔍</a>
  </p>
</section>
`;

const targets = ["services.html", "portfolio.html", "about.html", "contact.html", "advertising.html", "earning.html", "terms.html", "privacy.html", "order.html", "categories.html"];
for (const t of targets) {
  let html = fs.readFileSync(t, "utf8");
  if (!html.includes("related-topics")) {
    html = html.replace("</main>", RELATED_BLOCK + "</main>");
    console.log("➕ related block → " + t);
  } else console.log("⏭ already has block → " + t);
  if (t === "services.html") {
    const [linked, n] = linkServiceCards(html);
    html = linked;
    console.log(`🔗 ${n} service cards linked`);
  }
  fs.writeFileSync(t, html);
}
