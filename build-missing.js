/* ============================================================
   build-missing.js — تولید خودکار صفحات تکمیلی و سئو-محور
   اجرا:  node build-missing.js
   - لندینگ‌پیج‌های مخاطب‌محور (رفیق، دختر، پسر، همسر، عشقم، خواهر، برادر، کودک)
   - مناسبت‌های جاافتاده (روز پدر، روز مادر، عید قربان در category/monasebat)
   - صفحه تعرفه‌ها (pricing.html) + سوالات متداول (faq.html)
   - صفحات خدمات تکی (service/*.html) برای لینک‌سازی داخلی عمیق
   - صفحات تعاملی (account, order-success, track-order, search)
   - sitemap.xml + robots.txt
   ============================================================ */
const fs = require("fs"), path = require("path");
const ROOT = __dirname;
const SITE = "https://cliptavalod.ir";

let count = 0;
function write(file, html) {
  const p = path.join(ROOT, file);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, html);
  count++;
  console.log("✔ " + file);
}

/* ---------- قالب عمومی ---------- */
function shell({ title, desc, canon, dirUp, h1, intro, body, schemaType = "WebPage", extraHead = "", breadcrumb }) {
  const up = dirUp || "";
  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="keywords" content="کلیپ تولد, کلیپ تبریک تولد, کلیپ تولد خاص, ${h1.replace(/^[^ا-ي]+ ?/, "")}">
<meta name="robots" content="index, follow">
<meta name="author" content="کلیپ تولد">
<link rel="canonical" href="${SITE}/${canon}">
<link rel="icon" type="image/svg+xml" href="${up}img/cake.svg">
<meta property="og:type" content="article">
<meta property="og:site_name" content="کلیپ تولد">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${SITE}/img/cake.svg">
<meta property="og:url" content="${SITE}/${canon}">
<meta property="og:locale" content="fa_IR">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${SITE}/img/cake.svg">
<link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet">
<link rel="preload" as="style" href="${up}css/style.css">
<link rel="stylesheet" href="${up}css/style.css">
${extraHead}
<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": schemaType,
    "name": h1,
    "description": desc,
    "url": `${SITE}/${canon}`,
    "image": `${SITE}/img/cake.svg`,
    "inLanguage": "fa-IR",
    "brand": { "@type": "Organization", "name": "کلیپ تولد", "url": SITE + "/", "sameAs": ["https://rubika.ir/cliptavallod"] },
    "offers": { "@type": "Offer", "priceCurrency": "IRT", "availability": "https://schema.org/InStock" }
}, null, 1)}</script>
</head>
<body>
<div id="loader"><img src="${up}img/cake.svg" width="110" alt="کیک تولد با شمع"><p>در حال آماده‌سازی جشن… 🎂</p></div>
<header class="navbar">
  <div class="container nav-inner">
    <a class="brand" href="${up}index.html"><img src="${up}img/cake.svg" alt="لوگوی کلیپ تولد - کیک تولد با شمع" width="44" height="44"><span>کلیپ<span class="gold-text">تولد</span></span></a>
    <nav class="nav-links" aria-label="منوی اصلی">
      <a href="${up}index.html">خانه</a><a href="${up}services.html">خدمات</a><a href="${up}portfolio.html">نمونه کارها</a>
      <a href="${up}categories.html">دسته‌بندی‌ها</a><a href="${up}party-supplies/index.html">وسایل تولد</a>
      <a href="${up}blog/index.html">وبلاگ</a><a href="${up}pricing.html">تعرفه‌ها</a><a href="${up}about.html">درباره ما</a><a href="${up}contact.html">تماس</a>
    </nav>
    <a href="${up}order.html" class="btn btn-primary btn-sm nav-cta">🎂 سفارش آنلاین</a>
    <button class="burger" aria-label="باز کردن منو" aria-expanded="false"><span></span><span></span><span></span></button>
  </div>
  <nav class="mobile-menu" aria-label="منوی موبایل">
    <a href="${up}index.html">خانه</a><a href="${up}services.html">خدمات</a><a href="${up}portfolio.html">نمونه کارها</a>
    <a href="${up}categories.html">دسته‌بندی‌ها</a><a href="${up}pricing.html">تعرفه‌ها</a><a href="${up}party-supplies/index.html">وسایل تولد</a>
    <a href="${up}blog/index.html">وبلاگ</a><a href="${up}order.html">🎂 سفارش آنلاین</a>
  </nav>
</header>
<main class="container">
<nav class="breadcrumb" aria-label="مسیر صفحه">${breadcrumb || `<a href="${up}index.html">خانه</a> / <span>${h1}</span>`}</nav>
<section class="section" style="padding-top:16px">
  <h1 class="section-title">${h1}</h1>
  ${intro}
  ${body}
</section>
</main>
<footer class="footer">
  <div class="container footer-grid">
    <div>
      <a class="brand" href="${up}index.html"><img src="${up}img/cake.svg" alt="کیک تولد" width="44" height="44"><span>کلیپ<span class="gold-text">تولد</span></span></a>
      <p style="color:var(--muted);margin-top:14px;font-size:.92rem">استودیو تولید کلیپ و تصویر اختصاصی تبریک تولد و مناسبت‌ها — مطابق با ارزش‌ها و قوانین جمهوری اسلامی ایران 🇮🇷</p>
      <div class="socials">
        <a href="https://rubika.ir/cliptavallod" target="_blank" rel="noopener" aria-label="روبیکا">📣</a>
        <a href="https://instagram.com/cliptavallod" target="_blank" rel="noopener" aria-label="اینستاگرام">📸</a>
        <a href="https://t.me/cliptavallod" target="_blank" rel="noopener" aria-label="تلگرام">✈️</a>
        <a href="https://wa.me/989120000000" target="_blank" rel="noopener" aria-label="واتساپ">💬</a>
      </div>
    </div>
    <div><h4>دسترسی سریع</h4><a href="${up}services.html">خدمات</a><a href="${up}portfolio.html">نمونه کارها</a><a href="${up}order.html">سفارش آنلاین</a><a href="${up}pricing.html">تعرفه‌ها</a><a href="${up}categories.html">دسته‌بندی‌ها</a></div>
    <div><h4>صفحات</h4><a href="${up}about.html">درباره ما</a><a href="${up}contact.html">تماس با ما</a><a href="${up}advertising.html">تبلیغات</a><a href="${up}earning.html">درآمدزایی</a><a href="${up}faq.html">سوالات متداول</a><a href="${up}terms.html">قوانین</a><a href="${up}privacy.html">حریم خصوصی</a></div>
    <div><h4>ارتباط با ما</h4><a href="tel:09120000000">📞 ۰۹۱۲-۰۰۰-۰۰۰۰</a><a href="mailto:info@cliptavalod.ir">✉️ info@cliptavalod.ir</a><a href="https://rubika.ir/cliptavallod">💬 روبیکا: @cliptavallod</a></div>
  </div>
  <div class="footer-bottom container">© ۱۴۰۵ کلیپ تولد — تمامی حقوق محفوظ است. | طراحی با 💜 در ایران</div>
</footer>
<button id="backTop" aria-label="بازگشت به بالا">↑</button>
<button id="chatBtn" aria-label="چت آنلاین">💬</button>
<div id="chatBox"><header>پشتیبانی آنلاین کلیپ تولد 🎂</header><div class="chat-body"></div><form class="chat-input"><input placeholder="پیام خود را بنویسید…" aria-label="پیام"><button type="submit">ارسال</button></form></div>
<div id="toasts"></div>
<script src="${up}js/main.js" defer></script>
</body>
</html>`;
}

/* ============================================================
   ۱) لندینگ‌پیج‌های مخاطب‌محور (کلمات کلیدی Long-tail)
   ============================================================ */
const AUDIENCES = [
  ["refiq", "رفیق", "👥", "کلیپ تولد برای رفیق صمیمی", "خلاقانه، صمیمی و کمی شیطنت‌آمیز (در چارچوب ادب)", "رفیق", "دوست صمیمی"],
  ["dokhtar", "دختر", "🧕", "کلیپ تولد دخترانه خاص", "تم‌های صورتی، گل، بالون و تایپوگرافی ظریف", "دختر", "فرزند دختـر"],
  ["pesar", "پسر", "🙋", "کلیپ تولد پسرانه شیک", "تم اسپرت، ماشین، فوتبال و گرافیک مردانه", "پسر", "فرزند پسـر"],
  ["hamser", "همسر", "🥰", "کلیپ تولد برای همسر", "رمانتیک، خاطرات دو نفره و پیام عاشقانه محترمانه", "همسر", "خانم/آقای خانه"],
  ["eshgham", "عشقم", "❤️", "کلیپ تولد برای عشقم", "حس خوب، موزیک ملایم و اسلاید عکس‌های دونفره", "عشق زندگی", "نامزد/همسر"],
  ["khahar", "خواهر", "🌹", "کلیپ تولد برای خواهر", "صمیمی، رنگی و احساسی — «گلِ خانواده»", "خواهر", "خواهر عزیز"],
  ["baradar", "برادر", "🌹", "کلیپ تولد برای برادر", "حماسی، مردانه و پرانرژی", "برادر", "برادر گرامی"],
  ["koodak", "کودک", "🧒", "کلیپ تولد کودک", "تم عروسک، کارتونی، شاد و رنگارنگ (بدون محتوای نامناسب)", "کودک", "فرزند کوچک"],
];

AUDIENCES.forEach(([slug, fa, emo, kw, styleDesc, who, whoAlt], i) => {
  const title = `${kw} | ${emo} کلیپ تبریک تولد ${fa} — کلیپ تولد`;
  const desc = `سفارش ${kw} با طراحی اختصاصی: ${styleDesc}. تحویل فوری ۲۴ ساعته، کیفیت FullHD، درج اسم و موزیک دلخواه. قیمت از ۵۰,۰۰۰ تومان.`;
  const canon = `landing-page/klip-tavalod-baraye-${slug === "eshgham" ? "eshgham" : slug}.html`;
  const h1 = `${emo} ${kw}`;
  const intro = `<p class="section-sub">تولد <b>${who}</b> بهانه‌ای است برای ساختن یک یادگاری ماندگار. در این صفحه نمونه‌کلیپ‌های اختصاصی «${fa}» را مشاهده می‌کنید؛ هر کلیپ فقط با عکس، نام و داستان خودِ شما ساخته می‌شود — کاملاً سالم و متناسب با فرهنگ ایرانی.</p>`;

  const gallery = ["🎂", "🎈", "🎁", "🌸", "✨", "🕯️"].map((e, k) =>
    `<div class="work reveal" data-cat="g" data-title="${kw} — نمونه ${k + 1}"><span class="emoji">${e}</span><div class="overlay"><b>نمونه ${k + 1}</b><span>FullHD • ۳۰ تا ۶۰ ثانیه</span></div></div>`).join("\n    ");

  const features = [
    ["🖼", "گالری عکس شخصی", `تا ۲۵ عکس از خاطرات مشترک با ${whoAlt} در یک تدوین ریتمیک.`],
    ["⌨️", "تایپوگرافی اسم", "نام مخاطب با فونت فارسی زیبا و انیمیشن اختصاصی روی کلیپ درج می‌شود."],
    ["🎵", "موزیک دلخواه", "آهنگ شاد یا احساسی مورد علاقهٔ ایشان — رایگان روی کلیپ قرار می‌گیرد."],
    ["📱", "خروجی چندفرمت", "افقی (۱۶:۹) برای پروژکتور + عمودی (۹:۱۶) برای استوری و وضعیت واتساپ/روبیکا."],
  ].map(([ic, t, d]) => `<div class="card reveal"><div class="card-icon">${ic}</div><h3>${t}</h3><p>${d}</p></div>`).join("\n      ");

  const plans = [
    ["برنزی", "کلیپ ساده ۳۰ ثانیه", "50000", false],
    ["نقره‌ای", "کلیپ حرفه‌ای + تصویر تبریک", "100000", false],
    ["طلایی", "کلیپ VIP + تصویر + موزیک دلخواه", "250000", true],
  ].map(([n, d, p, hot]) => `<div class="plan card reveal${hot ? " hot" : ""}">${hot ? '<span class="badge">پرطرفدار</span>' : ""}<h3>پکیج ${n}</h3><p>${d}</p><div class="price">از ${new Intl.NumberFormat("fa-IR").format(+p)} تومان</div><a href="../order.html?plan=${n}" class="btn ${hot ? "btn-gold" : "btn-primary"} btn-sm">انتخاب و سفارش</a></div>`).join("\n      ");

  const faq = [
    [`حداقل تعداد عکس برای ساخت کلیپ ${fa} چند تاست؟`, `۵ عکس با کیفیت کافیست؛ اما برای نتیجهٔ حرفه‌ای ۱۲ تا ۲۰ عکس پیشنهاد می‌شود.`],
    [`آیا امکان درج نام ${who} به‌صورت متحرک وجود دارد؟`, "بله، تایپوگرافی سه‌بعدی اسم + سن + تاریخ تولد بدون هزینهٔ اضافه انجام می‌شود."],
    [`زمان تحویل چقدر است؟`, "استاندارد ۴۸ ساعت؛ گزینهٔ فوری ۲۴ ساعته (با ۳۰٪ هزینهٔ اضافه) نیز فعال است."],
    [`اگر کلیپ را دوست نداشتیم چه؟`, `تا ۳ بار ویرایش رایگان دارید؛ اگر باز راضی نبودید کل مبلغ بازگردانده می‌شود.`],
  ];

  const related = [
    ["../services.html", "همه خدمات استودیو"],
    ["../portfolio.html", "نمونه کارهای واقعی"],
    ["../categories.html", "کلیپ تولد بر اساس ماه"],
    ["../pricing.html", "جدول تعرفه‌ها"],
  ].map(([h, t]) => `<a href="${h}" class="chip">${t}</a>`).join(" ");

  const body = `
  <h2 style="margin:26px 0 16px">🎬 نمونه‌کارهای ${kw}</h2>
  <div class="grid grid-3">
    ${gallery}
  </div>

  <h2 style="margin:44px 0 16px">✨ ویژگی‌های کلیپ «${fa}»</h2>
  <div class="grid grid-4">
      ${features}
  </div>

  <h2 style="margin:44px 0 16px">💎 پکیج‌ها و قیمت ${kw}</h2>
  <div class="grid grid-3">
      ${plans}
  </div>

  <div class="share-row" style="justify-content:center;margin-top:30px">
    <button class="like-btn" data-id="${canon}" data-likes="${320 + i * 47}">🤍 ${new Intl.NumberFormat("fa-IR").format(320 + i * 47)}</button>
    <button class="chip" data-share="rubika">اشتراک روبیکا 📣</button>
    <button class="chip" data-share="telegram">تلگرام ✈️</button>
    <button class="chip" data-share="copy">کپی لینک 🔗</button>
  </div>

  <p style="text-align:center;margin-top:34px"><a href="../order.html?type=klip-${slug}" class="btn btn-primary" style="font-size:1.1rem;padding:16px 40px">🎂 سفارش ${kw}</a></p>

  <section class="section faq">
    <h2 class="section-title">سوالات متداول</h2>
    ${faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("\n    ")}
  </section>

  <p style="color:var(--muted);font-size:.9rem;text-align:center;margin-top:20px">لینک‌های مرتبط: ${related}</p>
  `;

  const schemaFaq = JSON.stringify({
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": faq.map(([q, a]) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a } }))
  });

  write(canon, shell({
    title, desc, canon, dirUp: "../", h1, intro, body, schemaType: "LandingPage",
    extraHead: `<script type="application/ld+json">${schemaFaq}</script>`,
    breadcrumb: `<a href="../index.html">خانه</a> / <a href="../services.html">خدمات</a> / <span>${kw}</span>`
  }));
});

/* ============================================================
   ۲) مناسبت‌های جاافتاده در category/monasebat
   ============================================================ */
const EXTRA_OCCASIONS = [
  ["rooz-pedar", "روز پدر", "🎩", "تقدیر از تکیه‌گاه و قهرمان بی‌ادعای زندگی با کلیپی حماسی و احساسی."],
  ["rooz-madar", "روز مادر", "💐", "مهربان‌ترین قلب جهان لایق زیباترین تبریک است؛ کلیپی که اشک شوق می‌آورد."],
  ["eed-ghorban", "عید قربان", "🐑", "کلیپ و تصویر تبریک عید سعید قربان با تم معنوی و سنتی."],
  ["nowruz", "نوروز", "🌱", "هفت‌سین، سبزه، ماهی و تحویل سال — کلیپ سال نو مخصوص عزیزانتان."],
  ["yalda", "شب یلدا", "🍉", "بلندترین شب سال با انار، حافظ و کلیپ گرم خانوادگی."],
  ["charshanbe-suri", "چهارشنبه‌سوری", "🔥", "آتش، شادی و سنت کهن ایرانی در قالب کلیپی پرانرژی و سالم."],
  ["rooz-nan", "روز نان", "🥖", "مناسبت‌های تقویمی کمتر دیده‌شده را با ما جشن بگیرید."],
  ["tavalod-imam", "تولد امام رضا(ع)", "🕊", "کلیپ معنوی و مذهبی تبریک مناسبت‌های مذهبی با رعایت کامل موازین."],
];

EXTRA_OCCASIONS.forEach(([slug, fa, emo, blurb], i) => {
  const exists = fs.existsSync(path.join(ROOT, "category/monasebat", slug + ".html"));
  if (exists && !["eed-ghorban", "nowruz", "yalda", "charshanbe-suri", "rooz-nan", "tavalod-imam"].includes(slug)) return;
  // rooz-pedar و rooz-madar در build-pages.js ساخته نشده بودند → بساز
  if (fs.existsSync(path.join(ROOT, "category/monasebat", slug + ".html")) && ["rooz-pedar", "rooz-madar"].includes(slug)) { /* overwrite ok */ }

  const title = `کلیپ ${fa} | تبریک ${fa} اختصاصی — کلیپ تولد`;
  const desc = `${blurb} طراحی با اسم و پیام اختصاصی، موزیک دلخواه، تحویل فوری ۲۴ ساعته. مطابق فرهنگ و قوانین جمهوری اسلامی ایران.`;
  const canon = `category/monasebat/${slug}.html`;
  const h1 = `${emo} کلیپ ${fa}`;
  const intro = `<p class="section-sub">${blurb} در این صفحه مجموعهٔ نمونه‌کارها، پکیج‌ها و شرایط سفارش «${fa}» گردآوری شده است.</p>`;
  const gallery = ["🎂", "🎈", "🎁", "🕯️", "🌹", "✨"].map((e, k) =>
    `<div class="work reveal" data-cat="g" data-title="${fa} — نمونه ${k + 1}"><span class="emoji">${e}</span><div class="overlay"><b>نمونه ${k + 1}</b><span>FullHD • ۳۰ تا ۶۰ ثانیه</span></div></div>`).join("\n    ");
  const faq = [
    [`آیا محتوای ${fa} با قوانین کشور سازگار است؟`, "بله، تمام کلیپ‌ها با رعایت کامل موازین اخلاقی و قوانین جمهوری اسلامی ایران تولید می‌شوند."],
    [`برای ارسال در گروه خانوادگی مناسب است؟`, "بله؛ خروجی افقی و عمودی هر دو آماده است و حجم بهینه برای واتساپ/روبیکا/تلگرام دارد."],
    [`قیمت کلیپ ${fa} چقدر است؟`, "از ۵۰٬۰۰۰ تومان (برنزی) تا ۲۵۰٬۰۰۰ تومان (طلایی VIP)."],
  ];
  const body = `
  <h2 style="margin:26px 0 16px">🎬 گالری ${fa}</h2>
  <div class="grid grid-3">
    ${gallery}
  </div>
  <h2 style="margin:44px 0 16px">💎 پکیج‌ها</h2>
  <div class="grid grid-3">
    <div class="card reveal"><div class="card-icon">🎬</div><h3>کلیپ ساده</h3><p>۳۰ ثانیه با اسم و عکس.</p><div class="price">از ۵۰٬۰۰۰ تومان</div><a href="../../order.html" class="btn btn-primary btn-sm">سفارش</a></div>
    <div class="card reveal"><div class="card-icon">💖</div><h3>کلیپ حرفه‌ای</h3><p>گالری عکس + موزیک دلخواه.</p><div class="price">از ۱۰۰٬۰۰۰ تومان</div><a href="../../order.html" class="btn btn-primary btn-sm">سفارش</a></div>
    <div class="card reveal"><div class="card-icon">👑</div><h3>کلیپ VIP</h3><p>کلیپ + تصویر + موزیک + افکت.</p><div class="price">از ۲۵۰٬۰۰۰ تومان</div><a href="../../order.html" class="btn btn-gold btn-sm">فوری بخرید</a></div>
  </div>
  <p style="text-align:center;margin-top:34px"><a href="../../order.html?type=${slug}" class="btn btn-primary" style="font-size:1.1rem;padding:16px 40px">🎂 سفارش کلیپ ${fa}</a></p>
  <section class="section faq"><h2 class="section-title">سوالات متداول</h2>
    ${faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("\n    ")}
  </section>
  <p style="color:var(--muted);font-size:.9rem;text-align:center;margin-top:20px">مرتبط: <a href="../../categories.html" style="color:var(--pink)">همه مناسبت‌ها</a> • <a href="../../services.html" style="color:var(--pink)">خدمات</a> • <a href="../../landing-page/klip-yalda.html" style="color:var(--pink)">یلدا</a> • <a href="../../landing-page/klip-nowruz.html" style="color:var(--pink)">نوروز</a></p>`;
  const schemaFaq = JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) });
  write(canon, shell({ title, desc, canon, dirUp: "../../", h1, intro, body, schemaType: "CollectionPage", extraHead: `<script type="application/ld+json">${schemaFaq}</script>`,
    breadcrumb: `<a href="../../index.html">خانه</a> / <a href="../../categories.html">دسته‌بندی‌ها</a> / <span>${fa}</span>` }));
});

/* ============================================================
   ۳) pricing.html — جدول تعرفه‌ها
   ============================================================ */
{
  const title = "تعرفه‌ها و قیمت کلیپ تولد ۱۴۰۵ | لیست قیمت بسته‌ها — کلیپ تولد";
  const desc = "جدول کامل قیمت کلیپ تبریک تولد، تصویر، پکیج‌های برنزی/نقره‌ای/طلایی، خدمات جانبی و تحویل فوری. شفاف، بدون هزینه پنهان، از ۵۰٬۰۰۰ تومان.";
  const canon = "pricing.html";
  const rows = [
    ["کلیپ ساده (برنزی)", "۳۰ ثانیه، تا ۸ عکس، موزیک آماده", "۴۸ ساعت", "۵۰٬۰۰۰", `<a href="order.html?type=sade" class="btn btn-primary btn-sm">سفارش</a>`],
    ["کلیپ حرفه‌ای (نقره‌ای)", "۶۰ ثانیه، تا ۲۰ عکس، تایپوگرافی اسم", "۴۸ ساعت", "۱۰۰٬۰۰۰", `<a href="order.html?type=herfei" class="btn btn-primary btn-sm">سفارش</a>`],
    ["کلیپ VIP (طلایی)", "کلیپ + تصویر + موزیک دلخواه + افکت", "۲۴ ساعت", "۲۰۰٬۰۰۰", `<a href="order.html?type=vip" class="btn btn-gold btn-sm">سفارش</a>`],
    ["پکیج کامل جشن", "کلیپ VIP + ۲ تصویر + استوری + بنر", "۲۴ ساعت", "۲۵۰٬۰۰۰", `<a href="order.html?type=package" class="btn btn-gold btn-sm">سفارش</a>`],
    ["تصویر تبریک (کارت دیجیتال)", "PSD، خروجی JPG/PNG با کیفیت چاپ", "۲۴ ساعت", "۳۰٬۰۰۰", `<a href="order.html?type=image" class="btn btn-outline btn-sm">سفارش</a>`],
    ["پوستر تولد", "A3 قابل چاپ ۳۰۰dpi", "۴۸ ساعت", "۴۵٬۰۰۰", `<a href="order.html?type=poster" class="btn btn-outline btn-sm">سفارش</a>`],
    ["استوری اینستاگرام/روبیکا", "عمودی ۹:۱۶، متحرک", "۲۴ ساعت", "۴۰٬۰۰۰", `<a href="order.html?type=story" class="btn btn-outline btn-sm">سفارش</a>`],
    ["بنر تبریک (افقی)", "برای نمایش در جشن/پروژکتور", "۴۸ ساعت", "۶۰٬۰۰۰", `<a href="order.html?type=banner" class="btn btn-outline btn-sm">سفارش</a>`],
    ["تحویل فوری (< ۱۲ ساعت)", "اورژانسی، اولویت دار", "۱۲ ساعت", "+۵۰٪", `<a href="order.html?rush=1" class="btn btn-primary btn-sm">فوری</a>`],
    ["ویرایش ویدیو (از فایل شما)", "حذف/اضافه، اصلاح رنگ", "۴۸ ساعت", "از ۴۰٬۰۰۰", `<a href="order.html?type=edit" class="btn btn-outline btn-sm">سفارش</a>`],
    ["اضافه کردن موزیک دلخواه", "روی کلیپ موجود", "۲۴ ساعت", "۲۰٬۰۰۰", `<a href="order.html?type=music" class="btn btn-outline btn-sm">سفارش</a>`],
    ["افکت ویژه (نئون، ذرات، سه‌بعدی)", "پکیج تکمیلی", "۴۸ ساعت", "از ۳۵٬۰۰۰", `<a href="order.html?type=fx" class="btn btn-outline btn-sm">سفارش</a>`],
  ];
  const table = `
  <div class="table-wrap reveal">
    <table class="pricing-table">
      <thead><tr><th>خدمت / محصول</th><th>جزئیات</th><th>زمان تحویل</th><th>قیمت (تومان)</th><th>سفارش</th></tr></thead>
      <tbody>${rows.map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td class="price-cell">${r[3]}</td><td>${r[4]}</td></tr>`).join("")}</tbody>
    </table>
  </div>`;
  const note = `<p style="color:var(--muted);font-size:.9rem;margin-top:14px">* قیمت‌ها شروع هستند و بر اساس تعداد عکس، مدت و پیچیدگی ممکن است تغییر کنند. تخفیف اولین سفارش: <b>۱۰٪</b> با کد <code>FIRST10</code>. تخفیف مناسبتی (یلدا/نوروز): تا <b>۲۰٪</b>.</p>`;
  const plans = ["برنزی", "نقره‌ای", "طلایی"].map((n, k) => `
    <div class="plan card reveal${k === 2 ? " hot" : ""}">${k === 2 ? '<span class="badge">بهترین انتخاب</span>' : ""}
      <h3>پکیج ${n}</h3>
      <ul class="prose" style="list-style:none;padding:0;color:var(--muted);font-size:.9rem">
        ${k === 0 ? "<li>✔ کلیپ ۳۰ ثانیه</li><li>✔ تا ۸ عکس</li><li>✔ موزیک آماده</li>" : ""}
        ${k === 1 ? "<li>✔ کلیپ ۶۰ ثانیه</li><li>✔ تا ۲۰ عکس</li><li>✔ تایپوگرافی اسم</li><li>✔ یک تصویر تبریک</li>" : ""}
        ${k === 2 ? "<li>✔ کلیپ VIP + افکت</li><li>✔ موزیک دلخواه</li><li>✔ ۲ تصویر + استوری</li><li>✔ تحویل ۲۴ ساعته</li><li>✔ ۳ ویرایش رایگان</li>" : ""}
      </ul>
      <div class="price">از ${new Intl.NumberFormat("fa-IR").format([50000, 100000, 250000][k])} تومان</div>
      <a href="order.html?plan=${n}" class="btn ${k === 2 ? "btn-gold" : "btn-primary"} btn-sm">انتخاب پکیج</a>
    </div>`).join("");
  const faq = [
    ["روش‌های پرداخت چیست؟", "درگاه امن (زرین‌پال/ملت/سامان) و کارت‌به‌کارت؛ بعد از ثبت سفارش لینک پرداخت ارسال می‌شود."],
    ["آیا امکان پرداخت اقساطی هست؟", "برای پکیج‌های بالای ۵۰۰ هزار تومان بله، با هماهنگی پشتیبانی."],
    ["اگر از خروجی راضی نبودم؟", "تا ۳ ویرایش رایگان + ضمانت بازگشت وجه تا ۴۸ ساعت پس از تحویل."],
    ["مالیات و هزینه درگاه بر عهده کیست؟", "همه قیمت‌ها نهایی و بدون هزینه پنهان است."],
  ];
  const body = `
  ${table}${note}
  <h2 style="margin:44px 0 16px">💎 مقایسه پکیج‌ها</h2>
  <div class="grid grid-3">${plans}</div>
  <h2 style="margin:44px 0 16px">🎁 کدهای تخفیف فعال</h2>
  <div class="grid grid-3">
    <div class="card reveal"><div class="card-icon">🏷</div><h3>FIRST10</h3><p>۱۰٪ تخفیف اولین سفارش</p><div class="price">اعتبار: دائمی</div></div>
    <div class="card reveal"><div class="card-icon">🎂</div><h3>BIRTHDAY20</h3><p>۲۰٪ تخفیف هفتهٔ تولد شما</p><div class="price">شرط: ثبت نام تولد</div></div>
    <div class="card reveal"><div class="card-icon">👑</div><h3>RUBIKA15</h3><p>۱۵٪ برای اعضای کانال روبیکا</p><div class="price"><a href="https://rubika.ir/cliptavallod" target="_blank" rel="noopener" style="color:var(--gold)">عضویت در روبیکا</a></div></div>
  </div>
  <section class="section faq"><h2 class="section-title">سوالات متداول دربارهٔ قیمت</h2>
    ${faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("\n    ")}
  </section>
  <p style="text-align:center;margin-top:20px"><a href="order.html" class="btn btn-primary" style="font-size:1.1rem;padding:16px 40px">🛒 ثبت سفارش آنلاین</a></p>
  <p style="color:var(--muted);font-size:.9rem;text-align:center;margin-top:14px">مرتبط: <a href="services.html" style="color:var(--pink)">خدمات</a> • <a href="portfolio.html" style="color:var(--pink)">نمونه کارها</a> • <a href="advertising.html" style="color:var(--pink)">تعرفه تبلیغات</a></p>`;
  const schemaFaq = JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) });
  const offerSchema = JSON.stringify({
    "@context": "https://schema.org", "@type": "Service",
    "name": "تولید کلیپ تبریک تولد",
    "serviceType": "کلیپ تولد، تصویر تبریک، پکیج جشن",
    "provider": { "@type": "Organization", "name": "کلیپ تولد", "url": SITE, "sameAs": ["https://rubika.ir/cliptavallod"] },
    "areaServed": "IR",
    "hasOfferCatalog": {
      "@type": "OfferCatalog", "name": "تعرفه‌ها",
      "itemListElement": rows.slice(0, 8).map(r => ({ "@type": "Offer", "itemOffered": { "@type": "Service", "name": r[0] }, "price": r[3].replace(/[^\d]/g, "") || "50000", "priceCurrency": "IRT" }))
    }
  });
  write(canon, shell({ title, desc, canon, dirUp: "", h1: "💰 تعرفه‌ها و قیمت‌ها", intro: `<p class="section-sub">قیمت‌ها شفاف، بدون هزینه پنهان و قابل تنظیم بر اساس نیاز شما. در جدول زیر همهٔ خدمات و پکیج‌ها را ببینید.</p>`, body, schemaType: "WebPage",
    extraHead: `<script type="application/ld+json">${schemaFaq}</script>\n<script type="application/ld+json">${offerSchema}</script>`,
    breadcrumb: `<a href="index.html">خانه</a> / <span>تعرفه‌ها</span>` }));
}

/* ============================================================
   ۴) faq.html — مرکز سوالات متداول
   ============================================================ */
{
  const faq = [
    ["چطور سفارش دهم؟", "وارد صفحهٔ سفارش شوید، فرم ۲ دقیقه‌ای را پر کنید و فایلتان را پرداخت نمایید. کد رهگیری بلافاصله پیامک می‌شود."],
    ["حداقل تعداد عکس برای ساخت کلیپ چند تاست؟", "۵ عکس با کیفیت حداقل ۱۰۸۰px کافیست؛ بهترین نتیجه با ۱۲ تا ۲۰ عکس حاصل می‌شود."],
    ["کیفیت خروجی چیست؟", "FullHD 1080p پیش‌فرض؛ 4K با درخواست قبلی و هزینهٔ اندک اضافه."],
    ["آیا امکان ویرایش وجود دارد؟", "بله تا ۳ بار ویرایش رایگان؛ ویرایش بیشتر با ۲۰٪ هزینهٔ هر بار."],
    ["آیا محتوا با قوانین جمهوری اسلامی ایران سازگار است؟", "بله. ما از هرگونه محتوای غیراخلاقی، موزیک نامناسب و تصاویر مغایر با فرهنگ ایرانی-اسلامی خودداری می‌کنیم."],
    ["مدت زمان تحویل چقدر است؟", "استاندارد ۴۸ ساعت؛ فوری ۲۴ ساعت (+۳۰٪)؛ اورژانسی ۱۲ ساعت (+۵۰٪)."],
    ["روش‌های پرداخت؟", "درگاه امن زرین‌پال/ملت/سامان + کارت‌به‌کارت. فاکتور رسمی صادر می‌شود."],
    ["ضمانت بازگشت وجه دارید؟", "بله، تا ۴۸ ساعت پس از تحویل در صورت عدم رضایت کامل."],
    ["می‌توانم موزیک خودم را بفرستم؟", "بله. لینک یا فایل MP3 را در فرم سفارش آپلود کنید."],
    ["کلیپ برای استوری و واتساپ هم مناسب است؟", "بله، خروجی عمودی ۹:۱۶ و افقی ۱۶:۹ هر دو آماده می‌شود."],
    ["حق نشر موسیقی چه می‌شود؟", "ما فقط از آهنگ‌های آزاد یا دارای مجوز استفاده می‌کنیم؛ اگر فایل خودتان است مسئولیت آن با سفارش‌دهنده است."],
    ["کد تخفیف مناسبتی دارید؟", "بله: FIRST10، BIRTHDAY20، RUBIKA15 (اعضای کانال روبیکا)."],
    ["نمایندگی یا همکاری در فروش دارید؟", "بله. صفحهٔ درآمدزایی را ببینید و درخواست خود را ثبت کنید."],
    ["برای سفارش عمده (مراسم/شرکت) تخفیف دارید؟", "بالای ۵ سفارش: ۱۵٪؛ بالای ۲۰ سفارش: ۲۵٪ + مدیر پروژه اختصاصی."],
    ["چطور سفارشم را پیگیری کنم؟", "از طریق صفحهٔ پیگیری سفارش با وارد کردن کد رهگیری."],
  ];
  const groups = [
    ["🎬 سفارش و تولید", faq.slice(0, 4)],
    ["🛡 قوانین و امنیت", faq.slice(4, 8)],
    ["💳 پرداخت و تخفیف", faq.slice(8, 12)],
    ["🤝 همکاری و پیگیری", faq.slice(12)],
  ];
  const body = groups.map(([g, items]) => `
    <h2 style="margin:36px 0 14px">${g}</h2>
    <section class="faq">
      ${items.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("\n      ")}
    </section>`).join("\n") + `
    <p style="text-align:center;margin-top:34px"><a href="contact.html" class="btn btn-primary">❓ سوال دیگری دارید؟ تماس بگیرید</a></p>
    <p style="color:var(--muted);font-size:.9rem;text-align:center;margin-top:14px">مرتبط: <a href="terms.html" style="color:var(--pink)">قوانین</a> • <a href="privacy.html" style="color:var(--pink)">حریم خصوصی</a> • <a href="services.html" style="color:var(--pink)">خدمات</a></p>`;
  const schemaFaq = JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) });
  write("faq.html", shell({
    title: "سوالات متداول کلیپ تولد | پاسخ به همه پرسش‌های شما",
    desc: "پاسخ کامل به سوالات دربارهٔ سفارش کلیپ تولد، زمان تحویل، پرداخت، ویرایش، قوانین، کد تخفیف و نمایندگی.",
    canon: "faq.html",
    h1: "❓ سوالات متداول",
    intro: `<p class="section-sub">اگر پاسخ سوالتان را اینجا پیدا نکردید، در روبیکا یا واتساپ پیام دهید؛ میانگین زمان پاسخ ما کمتر از ۱۰ دقیقه است.</p>`,
    body, schemaType: "FAQPage",
    extraHead: `<script type="application/ld+json">${schemaFaq}</script>`,
    breadcrumb: `<a href="index.html">خانه</a> / <span>سوالات متداول</span>`
  }));
}

/* ============================================================
   ۵) service/*.html — صفحات تکی خدمات (لینک‌سازی عمیق + SEO)
   ============================================================ */
const SERVICES = [
  ["klip-refiq", "کلیپ تولد رفیق", "👥", "کلیپ صمیمی و خلاقانه برای دوست صمیمی با تم‌های نئون، گنگ و فان."],
  ["klip-madar", "کلیپ تولد مادر", "🤩", "احساسی، شاعرانه و ماندگار؛ کلیپی که اشک شوق به چشم مادر می‌آورد."],
  ["klip-pedar", "کلیپ تولد پدر", "💪", "حماسی و مردانه؛ تقدیر از تکیه‌گاه زندگی با تم سنگین و باشکوه."],
  ["klip-dokhtar", "کلیپ تولد دخترانه", "🧕", "صورتی، بنفش، گل و ستاره؛ تایپوگرافی ظریف و موزیک ملایم."],
  ["klip-pesar", "کلیپ تولد پسرانه", "🙋", "اسپرت، ماشین، فوتبال و افکت‌های اکشن برای پسربچه‌ها و جوان‌ها."],
  ["klip-khahar", "کلیپ تولد خواهر", "🌹", "گل‌آرایی، خاطرات کودکی و پیام خواهرانه؛ صمیمی و رنگی."],
  ["klip-baradar", "کلیپ تولد برادر", "🌹", "برادری، رفاقت و انرژی؛ تم مشکی-طلایی با تایپوگرافی قدرتمند."],
  ["klip-hamser", "کلیپ تولد همسر", "🥰", "خاطرات دو نفره، موسیقی عاشقانه و پیام محترمانهٔ عشق."],
  ["klip-eshgham", "کلیپ تولد عشقم", "❤️", "رمانتیک، هنری و شخصی‌سازی‌شده با جزئیات رابطهٔ شما."],
  ["klip-salgard", "کلیپ سالگرد ازدواج", "💍", "مسیر زندگی مشترک در قالب یک فیلم کوتاه خاطره‌انگیز."],
  ["klip-monasebat", "کلیپ مناسبت‌های خاص", "🎊", "یلدا، نوروز، چهارشنبه‌سوری، اعیاد مذهبی و ملی — با رعایت کامل موازین."],
  ["klip-koodak", "کلیپ تولد کودک", "🧒", "تم عروسک، دایناسور، پرنسس و کارتونی؛ شاد و بی‌خطر."],
  ["kart-taborik", "کارت تبریک دیجیتال", "💌", "کارت متحرک با اسم و پیام شما — آمادهٔ ارسال در روبیکا/واتساپ."],
  ["poster-tavalod", "پوستر تولد", "🖼", "پوستر A3 قابل چاپ با عکس و اسم شخص؛ یادگاری ماندگار."],
  ["story-instagram", "استوری اینستاگرام", "📱", "طراحی عمودی ۹:۱۶ با المان‌های ترند و قابل ویرایش."],
  ["banner-taborik", "بنر تبریک", "🎏", "بنر بزرگ برای نمایش در تالار، پروژکتور یا چاپ روی بنر پارچه‌ای."],
  ["video-edit", "ویرایش ویدیو", "✂️", "کات، اصلاح رنگ، حذف نویز، زیرنویس و خروجی بهینه برای شبکه‌های اجتماعی."],
  ["music-add", "اضافه کردن موزیک دلخواه", "🎵", "تنظیم دقیق بیت با ترنزیشن‌ها و میکس صدا."],
  ["text-name", "درج متن و اسم اختصاصی", "⌨️", "تایپوگرافی فارسی سه‌بعدی، متحرک و هماهنگ با تم کلیپ."],
  ["effects", "افکت‌های ویژه", "✨", "ذرات، نور، نئون، آتش، دود و ترنزیشن‌های سینمایی."],
  ["express-delivery", "تحویل فوری ۲۴ ساعته", "⚡", "اولویت در صف تولید + تحویل در کمترین زمان ممکن."],
];
SERVICES.forEach(([slug, name, emo, short], idx) => {
  const title = `${name} | ${short.split("؛")[0]} — کلیپ تولد`;
  const desc = `${short} قیمت از ۵۰٬۰۰۰ تومان، تحویل ۲۴ تا ۴۸ ساعت، ویرایش رایگان. سفارش آنلاین: کلیپ تولد.`;
  const canon = `service/${slug}.html`;
  const steps = [
    ["۱. ارسال اطلاعات", "فرم سفارش را پر کنید: نام، عکس‌ها، مناسبت و توضیحات."],
    ["۲. پرداخت امن", "درگاه زرین‌پال/ملت یا کارت‌به‌کارت."],
    ["۳. تولید توسط تیم", "استوری‌برد + تدوین + تایپوگرافی + صداگذاری."],
    ["۴. پیش‌نمایش و ویرایش", "نسخهٔ اولیه با واترمارک برای تأیید شما."],
    ["۵. تحویل نهایی", "فایل بدون واترمارک در واتساپ/روبیکا + لینک دانلود."],
  ];
  const why = [
    ["🎨", "اختصاصی", "هیچ الگوی آماده‌ای؛ فقط عکس و داستان شما."],
    ["⚡", "سریع", "میانگین زمان تحویل ۲۲ ساعت."],
    ["🎧", "موزیک دلخواه", "آهنگ مورد علاقهٔ شما روی کلیپ."],
    ["🛡", "تضمینی", "ضمانت بازگشت وجه و ویرایش رایگان."],
  ];
  const body = `
  <h2 style="margin:26px 0 16px">🎬 نمونه‌کارهای ${name}</h2>
  <div class="grid grid-3">
    ${["🎂", "🎈", "🎁", "🌸", "✨", "🕯️"].map((e, k) => `<div class="work reveal" data-cat="g" data-title="${name} — نمونه ${k + 1}"><span class="emoji">${e}</span><div class="overlay"><b>نمونه ${k + 1}</b><span>FullHD</span></div></div>`).join("\n    ")}
  </div>
  <h2 style="margin:44px 0 16px">🛠 مراحل سفارش ${name}</h2>
  <ol class="prose steps">
    ${steps.map(([t, d]) => `<li><b>${t}</b><br><span style="color:var(--muted)">${d}</span></li>`).join("\n    ")}
  </ol>
  <h2 style="margin:44px 0 16px">💎 پکیج‌ها</h2>
  <div class="grid grid-3">
    <div class="card reveal"><div class="card-icon">🥉</div><h3>برنزی</h3><p>کلیپ ساده ۳۰ ثانیه</p><div class="price">از ۵۰٬۰۰۰ تومان</div><a href="../order.html?plan=bronze&type=${slug}" class="btn btn-primary btn-sm">سفارش</a></div>
    <div class="card reveal"><div class="card-icon">🥈</div><h3>نقره‌ای</h3><p>کلیپ حرفه‌ای + تصویر</p><div class="price">از ۱۰۰٬۰۰۰ تومان</div><a href="../order.html?plan=silver&type=${slug}" class="btn btn-primary btn-sm">سفارش</a></div>
    <div class="card reveal hot"><div class="card-icon">🥇</div><h3>طلایی</h3><p>کلیپ VIP + تصویر + موزیک</p><div class="price">از ۲۵۰٬۰۰۰ تومان</div><a href="../order.html?plan=gold&type=${slug}" class="btn btn-gold btn-sm">سفارش VIP</a></div>
  </div>
  <h2 style="margin:44px 0 16px">✅ چرا ${name} از کلیپ تولد؟</h2>
  <div class="grid grid-4">
    ${why.map(([ic, t, d]) => `<div class="card reveal"><div class="card-icon">${ic}</div><h3>${t}</h3><p>${d}</p></div>`).join("\n    ")}
  </div>
  <p style="text-align:center;margin-top:34px"><a href="../order.html?type=${slug}" class="btn btn-primary" style="font-size:1.1rem;padding:16px 40px">🎂 سفارش ${name}</a></p>
  <section class="section faq">
    <h2 class="section-title">سوالات متداول</h2>
    <details><summary>هزینهٔ ${name} چقدر است؟</summary><p>از ۵۰٬۰۰۰ تومان (برنزی) تا ۲۵۰٬۰۰۰ تومان (طلایی VIP).</p></details>
    <details><summary>زمان تحویل؟</summary><p>استاندارد ۴۸ ساعت؛ فوری ۲۴ ساعت؛ اورژانسی ۱۲ ساعت.</p></details>
    <details><summary>آیا ویرایش رایگان است؟</summary><p>بله، تا ۳ بار ویرایش بدون هزینه.</p></details>
  </section>
  <p style="color:var(--muted);font-size:.9rem;text-align:center;margin-top:20px">مرتبط: <a href="../services.html" style="color:var(--pink)">همه خدمات</a> • <a href="../portfolio.html" style="color:var(--pink)">نمونه کارها</a> • <a href="../pricing.html" style="color:var(--pink)">تعرفه‌ها</a> • <a href="../categories.html" style="color:var(--pink)">دسته‌بندی‌ها</a></p>`;
  const schemaFaq = JSON.stringify({
    "@context": "https://schema.org", "@type": "Service",
    "name": name, "description": desc, "provider": { "@type": "Organization", "name": "کلیپ تولد", "url": SITE },
    "areaServed": "IR", "serviceType": name,
    "offers": { "@type": "AggregateOffer", "lowPrice": "50000", "highPrice": "250000", "priceCurrency": "IRT", "offerCount": "3" }
  });
  write(canon, shell({ title, desc, canon, dirUp: "../", h1: `${emo} ${name}`,
    intro: `<p class="section-sub">${short}</p>`, body, schemaType: "Service",
    extraHead: `<script type="application/ld+json">${schemaFaq}</script>`,
    breadcrumb: `<a href="../index.html">خانه</a> / <a href="../services.html">خدمات</a> / <span>${name}</span>` }));
});

/* ============================================================
   ۶) صفحات تعاملی: حساب کاربری، موفقیت سفارش، پیگیری، جستجو
   ============================================================ */
// account.html
write("account.html", shell({
  title: "پنل کاربری | ورود و ثبت‌نام — کلیپ تولد",
  desc: "ثبت‌نام، ورود، تاریخچه سفارشات، امتیازها و کدهای تخفیف اختصاصی شما.",
  canon: "account.html", h1: "👤 پنل کاربری",
  intro: `<p class="section-sub">با ساخت حساب، سفارشات قبلی، وضعیت سفارش جاری و امتیاز وفاداری خود را ببینید.</p>`,
  body: `
  <div class="grid grid-2">
    <div class="form-card card reveal">
      <h2 style="margin-bottom:14px">🔑 ورود</h2>
      <form id="loginForm" novalidate>
        <label class="field"><span>موبایل یا ایمیل</span><input type="text" name="id" required autocomplete="username"></label>
        <label class="field"><span>رمز عبور</span><input type="password" name="pass" required autocomplete="current-password"></label>
        <button class="btn btn-primary" type="submit">ورود</button>
      </form>
    </div>
    <div class="form-card card reveal">
      <h2 style="margin-bottom:14px">✨ ثبت‌نام</h2>
      <form id="registerForm" novalidate>
        <label class="field"><span>نام و نام خانوادگی</span><input type="text" name="name" required></label>
        <label class="field"><span>موبایل (مثلاً ۰۹۱۲۱۲۳۴۵۶۷)</span><input type="tel" name="phone" pattern="^09\\d{9}$" required></label>
        <label class="field"><span>رمز عبور</span><input type="password" name="pass" minlength="6" required></label>
        <button class="btn btn-gold" type="submit">ساخت حساب + دریافت ۱۰٪ تخفیف</button>
      </form>
    </div>
  </div>
  <section style="margin-top:40px">
    <h2>📦 تاریخچه سفارشات</h2>
    <div class="table-wrap"><table><thead><tr><th>کد رهگیری</th><th>خدمت</th><th>تاریخ</th><th>وضعیت</th><th>عملیات</th></tr></thead>
      <tbody><tr><td colspan="5" style="text-align:center;color:var(--muted)">برای مشاهده، وارد حساب شوید.</td></tr></tbody></table></div>
  </section>
  <p style="text-align:center;margin-top:20px"><a href="track-order.html" class="btn btn-outline">پیگیری سفارش بدون عضویت</a></p>`,
  schemaType: "WebApplication",
  breadcrumb: `<a href="index.html">خانه</a> / <span>پنل کاربری</span>`
}));

// order-success.html
write("order-success.html", shell({
  title: "سفارش شما ثبت شد ✅ | کلیپ تولد",
  desc: "سفارش شما با موفقیت ثبت شد. کد رهگیری و زمان تقریبی تحویل را اینجا ببینید.",
  canon: "order-success.html", h1: "✅ سفارش شما ثبت شد!",
  intro: `<p class="section-sub">از اعتماد شما سپاسگزاریم. جزئیات سفارش طی چند دقیقه از طریق پیامک و روبیکا ارسال می‌شود.</p>`,
  body: `
  <div class="card reveal" style="max-width:640px;margin:0 auto;text-align:center;padding:36px">
    <div style="font-size:64px">🎉</div>
    <h2>کد رهگیری: <span class="grad-text" id="orderId">—</span></h2>
    <p style="color:var(--muted)">زمان تقریبی تحویل: <b>۲۴ تا ۴۸ ساعت</b> آینده.</p>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:22px">
      <a href="track-order.html" class="btn btn-primary">پیگیری سفارش</a>
      <a href="portfolio.html" class="btn btn-outline">دیدن نمونه کارها</a>
      <a href="https://rubika.ir/cliptavallod" target="_blank" rel="noopener" class="btn btn-gold">عضویت در روبیکا</a>
    </div>
    <p style="color:var(--muted);font-size:.85rem;margin-top:18px">برای دریافت کد تخفیف ۱۰٪ سفارش بعدی، عضو خبرنامه شوید ↓</p>
    <form novalidate style="display:flex;gap:8px;justify-content:center;margin-top:10px"><input type="email" placeholder="ایمیل شما…" aria-label="ایمیل" required><button class="btn btn-gold" type="submit">عضویت</button></form>
  </div>
  <script>
    const p=new URLSearchParams(location.search);
    document.getElementById('orderId').textContent=p.get('id')||'CLIP-'+Math.floor(10000+Math.random()*89999);
    if(window.confetti) setTimeout(()=>confetti(120),400);
  </script>`,
  schemaType: "WebPage",
  breadcrumb: `<a href="index.html">خانه</a> / <a href="order.html">سفارش</a> / <span>ثبت موفق</span>`
}));

// track-order.html
write("track-order.html", shell({
  title: "پیگیری سفارش | کلیپ تولد",
  desc: "با وارد کردن کد رهگیری، وضعیت لحظه‌ای سفارش کلیپ تولد خود را ببینید.",
  canon: "track-order.html", h1: "🔎 پیگیری سفارش",
  intro: `<p class="section-sub">کد رهگیری ۶ رقمی که هنگام ثبت سفارش دریافت کرده‌اید را وارد کنید.</p>`,
  body: `
  <div class="form-card card reveal" style="max-width:560px;margin:0 auto">
    <form id="trackForm" novalidate>
      <label class="field"><span>کد رهگیری</span><input name="code" required placeholder="مثلاً CLIP-12345"></label>
      <button class="btn btn-primary" type="submit">پیگیری</button>
    </form>
    <div id="trackResult" style="margin-top:18px;display:none">
      <div class="timeline">
        <div class="step done"><b>دریافت سفارش</b><small>۲ ساعت پیش</small></div>
        <div class="step done"><b>پرداخت تأیید شد</b><small>۱ ساعت پیش</small></div>
        <div class="step active"><b>در حال تولید</b><small>همین الان</small></div>
        <div class="step"><b>تحویل</b><small>حدوداً ۲۴ ساعت دیگر</small></div>
      </div>
    </div>
  </div>
  <script>
    document.getElementById('trackForm').addEventListener('submit',e=>{
      e.preventDefault();
      const v=e.target.code.value.trim();
      if(!v){window.toast&&toast('کد را وارد کنید','error');return;}
      document.getElementById('trackResult').style.display='block';
      window.toast&&toast('وضعیت سفارش بروزرسانی شد ✔','success');
    });
  </script>`,
  schemaType: "WebPage",
  breadcrumb: `<a href="index.html">خانه</a> / <span>پیگیری سفارش</span>`
}));

// search.html
write("search.html", shell({
  title: "جستجو در سایت | کلیپ تولد",
  desc: "جستجوی هوشمند در خدمات، نمونه‌کارها، مقالات وبلاگ و دسته‌بندی‌های کلیپ تولد.",
  canon: "search.html", h1: "🔍 جستجوی هوشمند",
  intro: `<p class="section-sub">کلیدواژه را وارد کنید؛ بین خدمات، نمونه‌کارها و مقالات جستجو می‌کنیم.</p>`,
  body: `
  <div class="card reveal" style="max-width:640px;margin:0 auto">
    <form id="searchForm">
      <label class="field"><span>چی دنبال می‌گردید؟</span><input name="q" list="suggest" placeholder="مثلاً: کلیپ تولد مادر" required></label>
      <datalist id="suggest">
        <option value="کلیپ تولد مادر"><option value="کلیپ تولد پدر"><option value="کلیپ تولد رفیق">
        <option value="کلیپ سالگرد ازدواج"><option value="کلیپ تولد دخترانه"><option value="کلیپ تولد پسرانه">
        <option value="تعرفه‌ها"><option value="نمونه کارها"><option value="پکیج طلایی"><option value="یلدا"><option value="نوروز">
      </datalist>
      <button class="btn btn-primary" type="submit">جستجو</button>
    </form>
  </div>
  <h2 style="margin-top:36px">🔗 دسترسی سریع</h2>
  <div class="filters" style="margin-top:14px">
    <a href="services.html" class="chip">خدمات</a><a href="portfolio.html" class="chip">نمونه کارها</a>
    <a href="categories.html" class="chip">دسته‌بندی‌ها</a><a href="pricing.html" class="chip">تعرفه‌ها</a>
    <a href="blog/index.html" class="chip">مقالات</a><a href="party-supplies/index.html" class="chip">وسایل تولد</a>
    <a href="advertising.html" class="chip">تبلیغات</a><a href="earning.html" class="chip">درآمدزایی</a>
    <a href="faq.html" class="chip">سوالات متداول</a><a href="about.html" class="chip">درباره ما</a>
  </div>`,
  schemaType: "WebSite",
  breadcrumb: `<a href="index.html">خانه</a> / <span>جستجو</span>`
}));

/* ============================================================
   ۷) sitemap.xml + robots.txt
   ============================================================ */
function walk(dir, base = "") {
  const out = [];
  for (const f of fs.readdirSync(dir)) {
    if (f.startsWith(".")) continue;
    const full = path.join(dir, f);
    const rel = base ? base + "/" + f : f;
    if (fs.statSync(full).isDirectory()) out.push(...walk(full, rel));
    else if (/\.(html|xml)$/i.test(f)) out.push(rel);
  }
  return out;
}
const files = walk(ROOT).filter(f => !/\.git/.test(f));
const today = new Date().toISOString().slice(0, 10);
const urls = files.map(f => {
  const loc = f.endsWith("index.html") ? f.replace(/index\.html$/, "") : f;
  const priority = f === "index.html" ? "1.0" : /^landing-page\/|^service\/|^pricing\.html|^category\//.test(f) ? "0.9" : "0.7";
  const freq = f === "index.html" ? "daily" : "weekly";
  return `  <url><loc>${SITE}/${loc}</loc><lastmod>${today}</lastmod><changefreq>${freq}</changefreq><priority>${priority}</priority></url>`;
}).join("\n");
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
write("robots.txt", `User-agent: *\nAllow: /\nDisallow: /account.html\nDisallow: /order-success.html\nSitemap: ${SITE}/sitemap.xml\nHost: ${SITE}\n`);

console.log(`\n✅ ${count} file generated.`);
