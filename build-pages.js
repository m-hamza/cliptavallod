/* تولید خودکار صفحات سئو: ۱۲ ماه، روزهای هفته، مناسبت‌ها و لندینگ‌پیج‌ها
   اجرا: node build-pages.js  */
const fs = require("fs"), path = require("path");

const MONTHS = [
  ["frorddin","فروردین","🌱","بهار"], ["ardibehesht","اردیبهشت","🌸","بهار"], ["khordad","خرداد","🍒","بهار"],
  ["tir","تیر","☀️","تابستان"], ["mordad","مرداد","🌻","تابستان"], ["shahrivar","شهریور","🍉","تابستان"],
  ["mehr","مهر","🍂","پاییز"], ["aban","آبان","🌰","پاییز"], ["azar","آذر","🕯","پاییز"],
  ["day","دی","❄️","زمستان"], ["bahman","بهمن","⛄","زمستان"], ["esfund","اسفند","🎇","زمستان"]
];
const DAYS = [["shanbe","شنبه"],["yekshanbe","یکشنبه"],["doshanbe","دوشنبه"],["seshanbe","سه‌شنبه"],["chaharshanbe","چهارشنبه"],["panjshanbe","پنجشنبه"],["jome","جمعه"]];
const OCCASIONS = [["eed-fetr","عید فطر","🌙"],["valentine","ولنتاین","❤️"],["rooz-moalem","روز معلم","📚"],["rooz-dokhtaran","روز دختران","🎀"],["defa-moghaddas","دهه فجر","🇮🇷"],["rooz-pedar","روز پدر","🎩"],["rooz-madar","روز مادر","💐"]];

function tpl({title, desc, canon, h1, intro, gallerySeed, faq, dirUp}) {
  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="https://cliptavalod.ir/${canon}">
<meta property="og:title" content="${title}"><meta property="og:description" content="${desc}">
<meta property="og:image" content="https://cliptavalod.ir/img/cake.svg"><meta property="og:type" content="article">
<meta name="robots" content="index, follow">
<link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet">
<link rel="stylesheet" href="${dirUp}css/style.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"CollectionPage","name":"${h1}","description":"${desc}","url":"https://cliptavalod.ir/${canon}","breadcrumb":{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"خانه","item":"https://cliptavalod.ir/"},{"@type":"ListItem","position":2,"name":"دسته‌بندی‌ها","item":"https://cliptavalod.ir/categories.html"},{"@type":"ListItem","position":3,"name":"${h1}"}]}}</script>
</head>
<body>
<div id="loader"><img src="${dirUp}img/cake.svg" width="110" alt=""><p>در حال آماده‌سازی…</p></div>
<header class="navbar">
  <div class="container nav-inner">
    <a class="brand" href="${dirUp}index.html"><img src="${dirUp}img/cake.svg" alt="لوگو کلیپ تولد" width="44" height="44"><span>کلیپ<span class="gold-text">تولد</span></span></a>
    <nav class="nav-links"><a href="${dirUp}index.html">خانه</a><a href="${dirUp}services.html">خدمات</a><a href="${dirUp}portfolio.html">نمونه کارها</a><a href="${dirUp}categories.html">دسته‌بندی‌ها</a><a href="${dirUp}blog/index.html">وبلاگ</a><a href="${dirUp}about.html">درباره ما</a><a href="${dirUp}contact.html">تماس</a></nav>
    <a href="${dirUp}order.html" class="btn btn-primary btn-sm nav-cta">🎂 سفارش آنلاین</a>
    <button class="burger" aria-label="منو"><span></span><span></span><span></span></button>
  </div>
  <nav class="mobile-menu"><a href="${dirUp}index.html">خانه</a><a href="${dirUp}services.html">خدمات</a><a href="${dirUp}categories.html">دسته‌بندی‌ها</a><a href="${dirUp}order.html">سفارش</a></nav>
</header>
<main class="container">
<nav class="breadcrumb"><a href="${dirUp}index.html">خانه</a> / <a href="${dirUp}categories.html">دسته‌بندی‌ها</a> / <span>${h1}</span></nav>
<section class="section" style="padding-top:16px">
  <h1 class="section-title">${h1}</h1>
  ${intro}
  <h2 style="margin-bottom:16px">🎬 گالری کلیپ‌های ${h1.replace(/^[^ا-ي]+ ?/,'')}</h2>
  <div class="grid grid-3">
    ${["🎂","🎈","🎁","🕯️","🌹","✨"].map((e,i)=>`<div class="work reveal" data-cat="g" data-title="${h1} — نمونه ${i+1}"><span class="emoji">${e}</span><div class="overlay"><b>نمونه ${i+1}</b><span>FullHD • ۳۰ تا ۶۰ ثانیه</span></div></div>`).join("\n    ")}
  </div>
  <h2 style="margin:36px 0 14px">🔥 پربازدیدترین‌ها</h2>
  <div class="grid grid-3">
    <div class="card reveal"><div class="card-icon">👑</div><h3>کلیپ VIP متحرک</h3><p>با اسم و تاریخ روی تم اختصاصی.</p><div class="price">از ۲۰۰,۰۰۰ تومان</div><a href="${dirUp}order.html" class="btn btn-primary btn-sm">سفارش</a></div>
    <div class="card reveal"><div class="card-icon">💖</div><h3>کلیپ احساسی خانوادگی</h3><p>گالری عکس + موزیک نوستالژی.</p><div class="price">از ۱۰۰,۰۰۰ تومان</div><a href="${dirUp}order.html" class="btn btn-primary btn-sm">سفارش</a></div>
    <div class="card reveal"><div class="card-icon">⚡</div><h3>تحویل فوری ۲۴ ساعته</h3><p>برای جشن‌های امشب!</p><div class="price">از ۸۰,۰۰۰ تومان</div><a href="${dirUp}order.html" class="btn btn-gold btn-sm">فوری بخرید</a></div>
  </div>
  <div class="share-row" style="justify-content:center;margin-top:30px">
    <button class="like-btn" data-id="${canon}" data-likes="${gallerySeed}">🤍 ${new Intl.NumberFormat("fa-IR").format(gallerySeed)}</button>
    <button class="chip" data-share="rubika">اشتراک روبیکا 📣</button>
    <button class="chip" data-share="telegram">تلگرام ✈️</button>
    <button class="chip" data-share="copy">کپی لینک 🔗</button>
  </div>
  <p style="text-align:center;margin-top:34px"><a href="${dirUp}order.html" class="btn btn-primary" style="font-size:1.1rem;padding:16px 40px">🎂 سفارش کلیپ ${h1.replace(/^[^ا-ي]+ ?/,'')}</a></p>
  <section class="section faq">
    <h2 class="section-title">سوالات متداول</h2>
    ${faq.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join("\n    ")}
  </section>
  <p style="color:var(--muted);font-size:.9rem;text-align:center;margin-top:20px">صفحات مرتبط: <a href="${dirUp}services.html" style="color:var(--pink)">خدمات کلیپ تولد</a> • <a href="${dirUp}categories.html" style="color:var(--pink)">همه دسته‌بندی‌ها</a> • <a href="${dirUp}portfolio.html" style="color:var(--pink)">نمونه کارها</a></p>
</section>
</main>
<!-- Lightbox -->
<div id="lightbox" role="dialog" aria-modal="true"><button class="close" aria-label="بستن">×</button><div class="lb-stage"><span>🎬</span><span class="lb-watermark">clipTavalod.ir</span></div><h3 class="lb-title" style="color:#fff"></h3><div style="display:flex;gap:12px"><button class="btn btn-gold lb-download">⬇ دانلود نمونه</button></div></div>
<footer class="footer"><div class="container footer-bottom">© ۱۴۰۵ کلیپ تولد | <a href="https://rubika.ir/cliptavallod" target="_blank" rel="noopener">کانال روبیکا</a></div></footer>
<button id="backTop" aria-label="بازگشت به بالا">↑</button>
<button id="chatBtn" aria-label="چت آنلاین">💬</button>
<div id="chatBox"><header>پشتیبانی آنلاین 🎂</header><div class="chat-body"></div><form class="chat-input"><input placeholder="پیام…" aria-label="پیام"><button type="submit">ارسال</button></form></div>
<div id="toasts"></div>
<script src="${dirUp}js/main.js" defer></script>
</body>
</html>`;
}

let count = 0;
function write(file, html){ fs.mkdirSync(path.dirname(file),{recursive:true}); fs.writeFileSync(file, html); count++; }

// ---- ۱۲ صفحه ماه ----
MONTHS.forEach(([slug,fa,emo,season],i)=>write(`category/month/${slug}.html`, tpl({
  title:`کلیپ تولد ${fa} | تبریک تولد متولدین ${fa} — خاص و اختصاصی`,
  desc:`گالری و سفارش کلیپ تبریک تولد مخصوص متولدین ماه ${fa} (${season}). طراحی اختصاصی با اسم، کیفیت FullHD و تحویل فوری ۲۴ ساعته. قیمت از ۵۰,۰۰۰ تومان.`,
  canon:`category/month/${slug}.html`,
  h1:`${emo} کلیپ تولد ${fa}`,
  intro:`<p class="section-sub">متولدین خوش‌ذوق ${fa} (${season}) لایق خاص‌ترین تبریک هستند! در این صفحه مجموعه‌ای از کلیپ‌های تبریک تولد اختصاصی ماه <b>${fa}</b> با تم، رنگ و موزیک متناسب با حال‌وهوای این ماه گردآوری شده است. کافیست نام و عکس مخاطب را بفرستید تا کلیپی منحصر‌به‌فرد با نام ایشان در کمتر از ۲۴ ساعت تحویل بگیرید.</p>`,
  gallerySeed: 300+i*37,
  faq:[
    [`ویژگی کلیپ تولد ${fa} چیست؟`,`رنگ‌بندی و المان‌های بصری کلیپ با حال‌وهوای ${season} و نمادهای ماه ${fa} هماهنگ می‌شود.`],
    [`آیا امکان درج اسم متولد ${fa} وجود دارد؟`,`بله، تایپوگرافی متحرک اسم + سن + تاریخ تولد کاملاً رایگان است.`],
    [`زمان تحویل چقدر است؟`,`استاندارد ۴۸ ساعت؛ فوری ۲۴ ساعته با هزینه اضافه ۳۰٪.`]
  ], dirUp:"../../"
})));

// ---- صفحات روز هفته ----
DAYS.forEach(([slug,fa],i)=>write(`category/day/${slug}.html`, tpl({
  title:`کلیپ تولد ${fa} | تبریک تولد متولدین ${fa}`,
  desc:`کلیپ‌های تبریک تولد مخصوص متولدین روز ${fa} — انتخاب تم و موزیک بر اساس شخصیت روز تولد، تحویل سریع و قیمت مناسب.`,
  canon:`category/day/${slug}.html`,
  h1:`📅 کلیپ تولد ${fa}`,
  intro:`<p class="section-sub">می‌گویند متولدین هر روز هفته روحیه‌ای متفاوت دارند! برای متولدین روز <b>${fa}</b> تم‌ها و سبک‌های ویژه‌ای آماده کرده‌ایم که با انرژی همین روز سازگار است.</p>`,
  gallerySeed: 120+i*23,
  dirUp:"../../",
  faq:[[`کلیپ ${fa} چه فرقی دارد؟`,`پالت رنگ، ریتم موزیک و ترنزیشن‌ها بر اساس انرژی روز ${fa} تنظیم می‌شود.`],[`آیا سفارش آن ممکن است؟`,`بله — دقیقاً مانند سایر کلیپ‌ها با تحویل ۴۸ ساعته.`]]
})));

// ---- مناسبت‌ها ----
OCCASIONS.forEach(([slug,fa,emo],i)=>write(`category/monasebat/${slug}.html`, tpl({
  title:`کلیپ ${fa} | تبریک ${fa} به‌صورت اختصاصی — کلیپ تولد`,
  desc:`سفارش کلیپ و تصویر تبریک ${fa} با اسم و پیام اختصاصی، موزیک دلخواه و تحویل فوری. مطابق موازین فرهنگی و قوانین جمهوری اسلامی ایران.`,
  canon:`category/monasebat/${slug}.html`,
  h1:`${emo} کلیپ ${fa}`,
  intro:`<p class="section-sub">مناسبت <b>${fa}</b> را با یک کلیپ اختصاصی که فقط برای شما ساخته شده جشن بگیرید؛ شامل درج نام، پیام تبریک و موزیک دلخواه — کاملاً سالم و متناسب با فرهنگ ایرانی-اسلامی.</p>`,
  gallerySeed: 200+i*41,
  dirUp:"../../",
  faq:[[`آیا محتوا با قوانین کشور سازگار است؟`,`بله، تمام کلیپ‌ها با رعایت کامل موازین اخلاقی و قوانین ج.ا. ایران تولید می‌شوند.`],[`برای گروه و خانواده هم مناسب است؟`,`بله خروجی برای واتساپ، روبیکا، تلگرام و نمایش در جمع آماده است.`]]
})));


// ---- روزهای ۱ تا ۳۱ (لندینگ ساده از ریشه) ----
for(let d=1;d<=31;d++){
  const fa=n=>String(n).replace(/\d/g,x=>"۰۱۲۳۴۵۶۷۸۹"[x]);
  write(`day-${d}.html`, tpl({
    title:`کلیپ تولد روز ${fa(d)} | تبریک متولدین ${fa(d)} ماه`,
    desc:`گالری و سفارش کلیپ تبریک تولد مخصوص متولدین روز ${fa(d)} — طراحی اختصاصی با اسم، تحویل فوری، قیمت از ۵۰,۰۰۰ تومان.`,
    canon:`day-${d}.html`,
    h1:`🎂 متولدین روز ${fa(d)}`,
    intro:`<p class="section-sub">متولدین روز <b>${fa(d)}</b> عزیز، این صفحه مخصوص شماست! نمونه‌کلیپ‌های پرطرفدار روز تولد خود را ببینید و با چند کلیک سفارش دهید.</p>`,
    gallerySeed: 50+d*11,
    faq:[[`ویژه روز ${fa(d)} است؟`,`تم پیشنهادی این صفحه بر اساس آمار سلیقه متولدین همین روز انتخاب شده است.`],[`چطور سفارش دهم؟`,`روی دکمه «سفارش» کلیک کنید و فرم دو دقیقه‌ای را پر نمایید.`]],
    dirUp:""
  }));
}

console.log(count+" page generated ✅");
