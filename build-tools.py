# -*- coding: utf-8 -*-
"""سازنده: فهرست‌های بخش‌ها، ابزار محاسبه سن، تقویم ۳۶۵ روز تولد و صفحات مناسبتی تکمیلی"""
import os, json
from build_personas_lib import page, ROOT, fa, seo_text, kw_chips, price_table, msg_section, sample_gallery, COMMON_KW, cards

os.makedirs("tools", exist_ok=True)
os.makedirs("calendar", exist_ok=True)

# ---------- فهرست لندینگ‌پیج‌ها ----------
PERSONAS = [("برادر","klip-tavalod-baradar","🦁"),("خواهر","klip-tavalod-khahar","🌸"),("پسرعمو","klip-tavalod-pesarcamo","🎮"),
 ("دخترعمو","klip-tavalod-dokhtaramo","🦄"),("دایی","klip-tavalod-daei","🧔"),("عمو","klip-tavalod-amu","👨‍🦳"),
 ("خاله","klip-tavalod-khaleh","🌷"),("عمه","klip-tavalod-ameh","🧕"),("همسر","klip-tavalod-hamser","💍"),
 ("دوست‌دختر","klip-tavalod-dokhtedoost","💖"),("دوست‌پسر","klip-tavalod-pesardoost","😎"),("نامزد","klip-tavalod-namzad","🥂"),
 ("عشق","klip-tavalod-eshgh","❤️"),("پدربزرگ","klip-tavalod-pedarbozorg","👴"),("مادربزرگ","klip-tavalod-madarbozorg","👵"),
 ("دانش‌آموز","klip-tavalod-daneshamooz","🎒"),("کودک","klip-tavalod-koodak","🧸"),("نوجوان","klip-tavalod-nojavan","🛹"),
 ("دانشجو","klip-tavalod-daneshjou","🎓"),("استاد","klip-tavalod-ostad","👨‍🏫"),("همکار","klip-tavalod-hamkar","💼"),
 ("مادر","klip-tavalod-baraye-madar","🤩"),("پدر","klip-tavalod-baraye-pedar","👨"),("رفیق","klip-tavalod-baraye-refiq","🫂"),
 ("لاکچری","klip-tavalod-laqueiri","👑"),("ساده","klip-tavalod-sade","🕯️"),("حرفه‌ای","klip-tavalod-herfei","🎥")]
body = '<section class="section"><h2 class="section-title">🎭 کلیپ تولد برای هر مخاطب</h2><div class="grid grid-3">'
for t, slug, em in PERSONAS:
    body += f'<a class="card reveal" href="{slug}.html" style="text-decoration:none;color:inherit"><div class="card-icon">{em}</div><h3>کلیپ تولد {t}</h3><p>تبریک تولد {t} با کلیپ، تصویر و متن اختصاصی؛ تحویل فوری.</p><span style="color:var(--pink);font-weight:700">سفارش و مشاهده ←</span></a>'
body += '</div></section>'
body += seo_text("لندینگ‌پیج مخاطب‌محور", [
 "بخش «لندینگ‌پیج» سایت «کلیپ تولد» برای هر مخاطب صفحه‌ای مستقل با کلمات کلیدی اختصاصی ساخته است: «کلیپ تولد برای برادر»، «تبریک تولد خواهر»، «کلیپ تولد پسرعمو و دخترعمو»، «تولد دایی، عمو، خاله و عمه»، «کلیپ همسر، نامزد، عشق»، «کلیپ نوه و فرزند».",
 "چرا صفحه جدا؟ چون گوگل کاربردی‌ترین نتیجه را نشان می‌دهد؛ کسی که «متن تبریک تولد مادر» جستجو می‌کند نباید به صفحه عمومی برود. لینک‌سازی داخلی بین این صفحات، ماه‌ها، روزهای تقویم و ابزار محاسبه سن، قدرت سئوی کل مجموعه را بالا می‌برد.",
 "از همین فهرست وارد صفحه موردنظرتان شوید؛ در هر صفحه نمونه‌کار، تعرفه، سوالات متداول و دکمه سفارش آنلاین آماده است."])
page("landing-page", "index",
 "لندینگ پیج کلیپ تولد | صفحات اختصاصی تبریک تولد برای همه مخاطبان",
 "فهرست کامل لندینگ‌پیج‌های کلیپ تولد: مادر، پدر، برادر، خواهر، پسرعمو، دخترعمو، دایی، عمو، خاله، عمه، همسر، عشق، کودک، نوجوان، دانشجو، استاد و همکار.",
 "لندینگ پیج کلیپ تولد, صفحات تبریک تولد, کلیپ تولد برای همه," + COMMON_KW,
 'لندینگ‌پیج‌ها 🎭 <span class="grad-text">صفحه اختصاصی برای هر مخاطب</span>',
 "هر مخاطب، صفحه خودش؛ «کلیپ تولد» از مادر و پدر تا پسرعمو و استاد دانشگاه — با کلمات کلیدی، نمونه‌کار و تعرفه اختصاصی.",
 body, '<a href="%R%/categories.html" style="color:var(--pink)">دسته‌بندی‌ها</a> • <a href="%R%/services.html" style="color:var(--pink)">خدمات</a> • <a href="%R%/order.html" style="color:var(--pink)">سفارش</a>')
print("+ landing-page/index.html")

# ---------- فهرست messages ----------
MSG_LINKS = [("مادر","madar","💗"),("پدر","pedar","🛡"),("عاشقانه","eshgh","❤️"),("رفیق و دوست","refiq","🫂"),("خواهر و برادر","khahar-baradar","👧👦"),("رسمی و اداری","rasmi","🏛"),("جواب تبریک","jwab","🙏")]
body = '<section class="section"><h2 class="section-title">🗂 دسته‌بندی متن‌های تبریک تولد</h2><div class="grid grid-3">'
for t, s, e in MSG_LINKS:
    body += f'<a class="card reveal" href="{s}.html" style="text-decoration:none;color:inherit"><div class="card-icon">{e}</div><h3>متن تبریک تولد {t}</h3><p>مجموعه پیام‌های آماده، تازه و اختصاصی برای کپی کردن.</p><span style="color:var(--pink);font-weight:700">مشاهده ←</span></a>'
body += '</div></section>' + seo_text("بانک متن تبریک تولد", [
 "«متن تبریک تولد» مهم‌ترین مکمل «کلیپ تولد» است. بانک متن ما شامل پیام‌های «باکلاس کوتاه»، عاشقانه، صمیمی، رسمی، غمگین، طنز، دشمنانه (شوخی)، انگلیسی و «جواب تبریک تولد» است.",
 "الهام محتوایی از منابع معتبر متن تبریک مانند farazsms؛ اما با نگارش اختصاصی و به‌روز ۱۴۰۴.",
 "همین متن‌ها را می‌توانید روی کلیپ، کارت تبریک دیجیتال یا استوری سفارشی کنید؛ فقط یک «سفارش آنلاین» فاصله دارید."])
page("messages", "index-list",
 "فهرست متن تبریک تولد | همه دسته‌بندی پیام‌های تبریک",
 "فهرست دسته‌بندی متن تبریک تولد: مادر، پدر، عاشقانه، رفیق، خواهر و برادر، رسمی و جواب تبریک. کپی رایگان + سفارش کلیپ اختصاصی.",
 "فهرست متن تبریک تولد, دسته‌بندی پیام تبریک," + COMMON_KW,
 'متن تبریک تولد 💌 <span class="grad-text">همه دسته‌بندی‌ها یک‌جا</span>',
 "از «متن تبریک تولد باکلاس کوتاه» تا عاشقانه، رسمی و پاسخ تبریک — انتخاب کنید، کپی کنید، یا روی کلیپ حک کنیم.",
 body, '<a href="%R%/blog/birthday-poems.html" style="color:var(--pink)">شعر تولد</a> • <a href="%R%/landing-page/index.html" style="color:var(--pink)">لندینگ مخاطب‌ها</a>')
os.rename("messages/index-list.html", "messages/all.html")
print("+ messages/all.html")

# ---------- فهرست styles ----------
ST_LINKS = [("سالگرد ازدواج","salgyad","💍"),("متولدین ۱۲ ماه","mah-tabakat","♈"),("چارت و تحلیل تولد","tahlil","🌌"),("تقویم و تاریخ تولد","taghvim","📅"),("چی بخرم / چی بپوشم","chica-kada","🎁"),("کجا جشن بگیرم","bazme-kaj","🏰"),("از تولد تا مرگ","az-tavalod-ta-marg","🕊"),("سلبریتی و شخصیت‌ها","namadha","⭐"),("تعبیر و دانستنی","sleep-faq","🔮")]
body = '<section class="section"><h2 class="section-title">🎨 ایده، سبک و موضوعات خاص تولد</h2><div class="grid grid-3">'
for t, s, e in ST_LINKS:
    body += f'<a class="card reveal" href="{s}.html" style="text-decoration:none;color:inherit"><div class="card-icon">{e}</div><h3>{t}</h3><p>راهنمای تخصصی + امکان سفارش کلیپ با تم اختصاصی.</p><span style="color:var(--pink);font-weight:700">مشاهده ←</span></a>'
body += '</div></section>'
page("styles", "all",
 "ایده‌ها و سبک‌های تولد | سالگرد، چارت، تقویم، کادو و سلبریتی",
 "فهرست ایده‌ها و سبک‌های خاص تولد: کلیپ سالگرد ازدواج، متولدین ماه‌ها، چارت تولد، تبدیل تاریخ، کادو، مکان جشن و دانستنی‌ها.",
 "ایده تولد, سبک تولد, تم تولد," + COMMON_KW,
 'سبک‌ها و ایده‌های تولد 🎨 <span class="grad-text">از لاکچری تا ساده</span>',
 "مجموعه راهنماهای تخصصی حول «تولد»؛ هرچه برای جشن، کادو، کلیپ و حتی تحلیل شخصیت لازم دارید.",
 body, '<a href="%R%/calendar/index.html" style="color:var(--pink)">تقویم ۳۶۵ روز</a> • <a href="%R%/tools/age-calculator.html" style="color:var(--pink)">محاسبه سن</a>')
os.remove("styles/index.html") if os.path.exists("styles/index.html") else None
os.rename("styles/all.html", "styles/index.html")
print("+ styles/index.html")

# ---------- ابزار محاسبه سن ----------
AGE_HTML = '''<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>محاسبه سن دقیق | ماشین‌حساب تولد، شمع تولد و تبدیل تاریخ شمسی، میلادی و قمری — کلیپ تولد</title>
<meta name="description" content="ابزار رایگان محاسبه سن دقیق بر مبنای سال، ماه و روز تولد؛ «من چند سالمه؟»، محاسبه تعداد روز تا تولد بعدی، تعداد شمع تولد، تبدیل تاریخ تولد به میلادی و قمری. الگو گرفته از bahesab.ir/time/age">
<meta name="keywords" content="محاسبه سن, من چند سالمه, محاسبه سن دقیق, شمع تولد, تاریخ تولد به میلادی, تولد شمسی به میلادی, چند روز تا تولدم مونده, تبدیل تاریخ تولد, حساب تولد, سن فرزندان">
<link rel="canonical" href="https://cliptavalod.ir/tools/age-calculator.html">
<meta property="og:type" content="website"><meta property="og:title" content="محاسبه سن دقیق و شمع تولد | کلیپ تولد">
<meta property="og:description" content="سن دقیق، روزهای باقی‌مانده تا تولد، تعداد شمع و تبدیل تاریخ شمسی/میلادی/قمری — رایگان."><meta property="og:image" content="https://cliptavalod.ir/img/cake.svg">
<meta name="twitter:card" content="summary_large_image"><meta name="robots" content="index, follow">
<link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet">
<link rel="stylesheet" href="../css/style.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebApplication","name":"محاسبه سن کلیپ تولد","applicationCategory":"UtilityApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"IRT"},"url":"https://cliptavalod.ir/tools/age-calculator.html"}</script>
<style>
.age-box{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:22px;padding:26px;backdrop-filter:blur(10px)}
.age-box label{display:block;margin:12px 0 6px;font-weight:700}
.age-box select,.age-box input{width:100%;padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,.2);background:rgba(0,0,0,.25);color:#fff;font-family:inherit}
.age-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:14px}
.res-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px;margin-top:22px}
.res-card{background:linear-gradient(135deg,rgba(255,105,180,.16),rgba(138,43,226,.16));border-radius:16px;padding:16px;text-align:center;border:1px solid rgba(255,255,255,.12)}
.res-card b{display:block;font-size:1.5rem;color:#ffd700;margin-bottom:4px}
.candles{font-size:1.7rem;line-height:1.6;word-break:break-all;margin-top:8px}
</style>
</head>
<body>
<div id="loader"><img src="../img/cake.svg" width="110" alt="کیک تولد"><p>در حال آماده‌سازی…</p></div>
<header class="navbar">
  <div class="container nav-inner">
    <a class="brand" href="../index.html"><img src="../img/cake.svg" alt="لوگو کلیپ تولد" width="44" height="44"><span>کلیپ<span class="gold-text">تولد</span></span></a>
    <nav class="nav-links"><a href="../index.html">خانه</a><a href="../services.html">خدمات</a><a href="../portfolio.html">نمونه کارها</a><a href="../categories.html">دسته‌بندی‌ها</a><a href="../blog/index.html">وبلاگ</a><a href="age-calculator.html" class="active">محاسبه سن</a><a href="../contact.html">تماس</a></nav>
    <a href="../order.html" class="btn btn-primary btn-sm nav-cta">🎂 سفارش آنلاین</a>
    <button class="burger" aria-label="منو"><span></span><span></span><span></span></button>
  </div>
  <nav class="mobile-menu"><a href="../index.html">خانه</a><a href="../services.html">خدمات</a><a href="age-calculator.html">محاسبه سن</a><a href="../order.html">سفارش</a></nav>
</header>
<main class="container">
<nav class="breadcrumb"><a href="../index.html">خانه</a> / <span>محاسبه سن و شمع تولد</span></nav>
<section class="hero" style="min-height:auto;border-radius:26px;margin-top:8px">
 <div class="container" style="padding:40px 0;text-align:center">
  <h1>محاسبه سن دقیق 🎂 <span class="grad-text">من چند سالمه؟</span></h1>
  <p class="lead">سن دقیق بر اساس سال، ماه و روز تولد • «چند روز تا تولدم مونده؟» • تعداد شمع تولد • تبدیل تاریخ تولد به میلادی و قمری — کاملاً رایگان.</p>
 </div>
</section>
<section class="section">
 <div class="age-box">
  <div class="age-row">
   <div><label for="ay">ماه تولد (شمسی)</label><select id="ay"></select></div>
   <div><label for="rooz">روز تولد</label><select id="rooz"></select></div>
   <div><label for="saal">سال تولد (شمسی)</label><select id="saal"></select></div>
  </div>
  <div style="text-align:center;margin-top:20px"><button id="calcBtn" class="btn btn-gold" style="font-size:1.05rem;padding:14px 44px">🎯 محاسبه کن!</button></div>
  <div class="res-grid" id="results" hidden>
   <div class="res-card"><b id="rAge">—</b>سن شما (تمام‌عمر)</div>
   <div class="res-card"><b id="rDays">—</b>روزهای زندگی</div>
   <div class="res-card"><b id="rNext">—</b>تا تولد بعدی (روز)</div>
   <div class="res-card"><b id="rCand">—</b>شمع‌های امسال 🕯️</div>
   <div class="res-card"><b id="rMil">—</b>میلادی تقریبی تاریخ تولد</div>
   <div class="res-card"><b id="rWeek">—</b>روز هفته تولد</div>
   <div class="res-card"><b id="rMoon">—</b>ماه قمری تقریبی</div>
   <div class="res-card"><b id="rZod">—</b>برج / حیوان سال تولد 🐍</div>
  </div>
  <div id="candleBox" class="candles" style="text-align:center"></div>
  <p id="note" style="color:var(--muted);font-size:.85rem;margin-top:14px">تبدیل قمری و برج/حیوان سال تقریبی و جهت آشنایی است. برای تبدیل دقیق قمری از تقویم رسمی استفاده کنید. الگوی ابزار: <a href="https://www.bahesab.ir/time/age/" target="_blank" rel="nofollow noopener" style="color:var(--pink)">bahesab.ir</a></p>
 </div>
</section>
<section class="section">
 <h2 class="section-title">✍️ راهنمای «محاسبه سن» و «شمع تولد»</h2>
 <p>«محاسبه سن دقیق برمبنای سال و ماه و روز تولد» یعنی بدانید علاوه بر سال‌های تمام، چند ماه و چند روز عمر کرده‌اید؛ سوال «من چند سالمه؟» حالا با یک کلیک جواب دارد. بسیاری همچنین «چقدر تا تولدم مونده» را جستجو می‌کنند که در این ابزار با شمارش روز نمایش داده می‌شود.</p>
 <p>«محاسبه شمع تولد»: تعداد شمع روی کیک معمولاً برابر سن تمام‌شده است؛ بعضی‌ها نمادین یک شمع بزرگ می‌گذارند («اهنگ تولد پس چند تا شمع»). این ابزار تعداد شمع امسال شما را نشان می‌دهد و می‌توانید آن را در «کلیپ تولد» سفارشی هم حک کنید.</p>
 <p>«تاریخ تولد به میلادی» و «تولد شمسی به میلادی» برای مدارک، ایمیل و شبکه‌های اجتماعی کاربرد دارد؛ تبدیل قمری نیز برای مناسبت‌های مذهبی مانند «تولد امام رضا» و «۱۳ رجب تولد حضرت علی» مفید است. «حساب تاریخ تولد» فرزندتان را هم امتحان کنید: «تولد یک سالگی» و «تولد ۵ سالگی» بهترین بهانه برای سفارش کلیپ خاطرات است.</p>
</section>
<section class="section">
 <h2 class="section-title">🎬 بعد از محاسبه، جشن را بسازید!</h2>
 <div class="grid grid-3">
  <a class="card reveal" href="../landing-page/klip-tavalod-koodak.html" style="text-decoration:none;color:inherit"><div class="card-icon">🧸</div><h3>کلیپ کودک</h3><p>یک‌سالگی تا نوجوانی.</p></a>
  <a class="card reveal" href="../landing-page/klip-tavalod-nojavan.html" style="text-decoration:none;color:inherit"><div class="card-icon">🛹</div><h3>کلیپ نوجوان</h3><p>ترند ۱۴۰۴.</p></a>
  <a class="card reveal" href="../calendar/index.html" style="text-decoration:none;color:inherit"><div class="card-icon">📅</div><h3>تقویم تولد</h3><p>۳۶۵ روز، صفحه اختصاصی.</p></a>
 </div>
</section>
<section class="section faq">
 <h2 class="section-title">❓ سوالات متداول</h2>
 <details><summary>سن دقیق چطور محاسبه می‌شود؟</summary><p>اختلاف تاریخ تولد شمسی (تبدیل‌شده به جولین) با تاریخ امروز؛ سال، ماه و روز کامل گزارش می‌شود.</p></details>
 <details><summary>«برای تولد شمع چه سالی را باید فوت کرد؟»</summary><p>عرف: سن تمام‌شده. اگر ۲۵.۷ ساله‌اید، ۲۵ شمع؛ یا یک شمع نمادین به‌عادت مدرن.</p></details>
 <details><summary>تبدیل قمری دقیق است؟</summary><p>تقریبی (میانگین ۲۹.۵۳ روز). برای مناسبت‌های رسمی، تقویم رسمی کشور را مبنا قرار دهید.</p></details>
 <details><summary>«چند شنبه تولد امام رضا است؟» را اینجا می‌توانم حساب کنم؟</summary><p>این ابزار تاریخ شمسی/میلادی شخصی را حساب می‌کند؛ مناسبت‌های مذهبی در صفحه «سلبریتی و شخصیت‌ها» توضیح داده شده‌اند.</p></details>
 <p style="text-align:center;margin-top:22px"><a href="../order.html" class="btn btn-primary" style="font-size:1.05rem;padding:15px 40px">🎁 سفارش کلیپ با تاریخ و سن دقیق شما</a></p>
</section>
</main>
<footer class="footer"><div class="container footer-bottom">© ۱۴۰۵ کلیپ تولد | <a href="https://rubika.ir/cliptavallod" target="_blank" rel="noopener">کانال روبیکا</a> | <a href="../terms.html">قوانین</a></div></footer>
<button id="backTop" aria-label="بازگشت به بالا">↑</button>
<button id="chatBtn" aria-label="چت آنلاین">💬</button>
<div id="chatBox"><header>پشتیبانی آنلاین 🎂</header><div class="chat-body"></div><form class="chat-input"><input placeholder="پیام…" aria-label="پیام"><button type="submit">ارسال</button></form></div>
<div id="toasts"></div>
<script>
const MONTHS=["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"];
const MDAYS=[31,31,31,31,31,31,30,30,30,30,30,29];
const WEEK=["یکشنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"];
const ZODIAC=[["حمل 🐏","قوچ"],["ثور 🐂","گاو"],["جوزا 👥","دوقلو"],["سرطان 🦀","خرچنگ"],["اسد 🦁","شیر"],["سنبله 🌿","دوشیزه"],["میزان ⚖️","ترازو"],["عقرب 🦂","کژدم"],["قوس 🏹","کماندار"],["جدی 🐐","بز"],["حوت 🐟","ماهی"],["حمل 🐏","گوسفند"]];
const CHINESE=["موش 🐭","گاو 🐮","پلنگ 🐆","خرگوش 🐇","اژدها 🐉","مار 🐍","اسب 🐎","گوسفند 🐑","میمون 🐵","خروس 🐓","سگ 🐕","خوک 🐖"];
const ISLAMIC=["محرم","صفر","ربیع‌الاول","ربیع‌الثانی","جمادی‌الاول","جمادی‌الثانی","رجب","شعبان","رمضان","شوال","ذی‌القعده","ذی‌الحجه"];
const FA=s=>String(s).replace(/\d/g,d=>"۰۱۲۳۴۵۶۷۸۹"[d]);
// ---- Jalaali <-> Gregorian (jalaali-js) ----
function div(a,b){return Math.floor(a/b)}
function mod(a,b){return a-b*div(a,b)}
const BREAKS=[-61,9,38,165,385,630,1000,1349,1526,1718,1914,2092,2262,2388,2458,2600];
function jalCal(jy){
 let bl=BREAKS.length,jm=-14,i=1;
 for(;i<bl;i++){ if(jy<BREAKS[i]) break; }
 jm=BREAKS[i-1];
 const jp=(i<bl)?BREAKS[i]:null;
 const cp=jy-jm;
 // leap offsets per cycle length (canonical jalaali data):
 const gap=jp?jp-jm:33;
 const OFF=gap===33?[1,5,9,13,17,22,26,30]:(gap===29?[1,5,9,13,17,22,25,29]:[1,5,9,13,17,21,25,29]);
 const isLeap=OFF.indexOf(cp)>=0;
 let gy=jm+621;
 let marchD=isLeap?20:19;
 if(isLeap&&cp===0){gy+=0;} // first year of cycle is common by definition here
 return {gy,marchD};
}
function g2d(gy,gm,gd){
 let d=div((gy+div(gm-1022,1000))*146097,4)+mod(div(gm-1022,1000)*146097,4)-div(div(gm-1022,1000)*3625,4);
 let k=mod(gm+9,12)+1;
 let sa=div(153*k+2,5)+(k<=6?30:59);
 let yb=gy+1000+div(gm-1022,1000)-div(k,10);
 return d+yb*365+div(yb,4)-div(yb,100)+div(yb,400)-308007+gd;
}
function d2g(jdn){
 let j=4*jdn+139361631,j2,l,n,m,k,gd,gm,gy;
 j=j+div(div(4*jdn+183187720,146097)*3625,4);
 j2=mod(div(j,5),1461);
 l=div(j2,365)*5+div(mod(j2,365),4)+18;
 n=mod(l,153);
 m=div(n,31)+2;
 k=div(m+1,13);
 gd=div(n,31)-k*n+div(k,2)+l+1;
 gm=m+1-12*k;
 gy=div(j,146097)*100+div(k,2)-div(4-k,2)*100;
 return [gy,gm,gd];
}
function j2d(jy,jm,jd){
 const c=jalCal(jy);
 let n=(jm<=6)?(jm-1)*31+(jd-1):(jm-7)*30+185+(jd-1);
 return g2d(c.gy,3,c.marchD)+n;
}
function d2j(jdn){
 let jy=d2g(jdn)[0]-621;
 while(j2d(jy+1,1,1)<=jdn)jy++;
 while(j2d(jy,1,1)>jdn)jy--;
 let n=jdn-j2d(jy,1,1);
 let jm,jd;
 if(n<186){jm=div(n,31)+1;jd=mod(n,31)+1;}
 else{n-=186;jm=div(n,30)+7;jd=mod(n,30)+1;}
 return [jy,jm,jd];
}
function toGregorian(jy,jm,jd){const [gy,gmo,gda]=d2g(j2d(jy,jm,jd));return new Date(Date.UTC(gy,gmo-1,gda));}
function todayJalaali(){const now=new Date();const a=d2j(g2d(now.getFullYear(),now.getMonth()+1,now.getDate()));return {jy:a[0],jm:a[1],jd:a[2]};}
// populate selects
const aySel=document.getElementById("ay"),rdSel=document.getElementById("rooz"),sySel=document.getElementById("saal");
MONTHS.forEach((mn,i)=>{const o=document.createElement("option");o.value=i;o.textContent=FA(i+1)+" "+mn;aySel.appendChild(o);});
function fillDays(m){rdSel.innerHTML="";const n=MDAYS[m];for(let d=1;d<=n;d++){const o=document.createElement("option");o.value=d;o.textContent=FA(d);rdSel.appendChild(o);}}
fillDays(0);
aySel.addEventListener("change",()=>fillDays(+aySel.value));
const ty=todayJalaali()?todayJalaali().jy:1405;
for(let y=ty;y>=1250;y--){const o=document.createElement("option");o.value=y;o.textContent=FA(y);sySel.appendChild(o);}
sySel.value=ty-25;
document.getElementById("calcBtn").addEventListener("click",()=>{
 const m=+aySel.value,d=+rdSel.value,y=+sySel.value;
 const res=document.getElementById("results");res.hidden=false;
 const tj=todayJalaali();
 const dob=toGregorian(y,m+1,d); const now=Date.now();
 const livedMs=now-dob.getTime(); const days=Math.floor(livedMs/86400000);
 let ageY=tj.jy-y,ageM=tj.jm-(m+1),ageD=tj.jd-d;
 if(ageD<0){ageM--;ageD+=30;} if(ageM<0){ageY--;ageM+=12;}
 document.getElementById("rAge").textContent=FA(ageY)+" سال و "+FA(ageM)+" ماه و "+FA(Math.max(ageD,0))+" روز";
 document.getElementById("rDays").textContent=FA(days.toLocaleString("en-US"));
 // next birthday: same jalaali date this or next gregorian year
 let nb=toGregorian(tj.jy,m+1,d);
 if(nb.getTime()<Date.now()) nb=toGregorian(tj.jy+1,m+1,d);
 let dd=Math.round((nb.getTime()-Date.now())/86400000);
 document.getElementById("rNext").textContent=FA(dd)+" روز";
 document.getElementById("rCand").textContent=FA(ageY)+" 🕯️";
 document.getElementById("rMil").textContent=FA(dob.getUTCDate())+"/"+FA(dob.getUTCMonth()+1)+"/"+FA(dob.getUTCFullYear());
 document.getElementById("rWeek").textContent=WEEK[dob.getUTCDay()];
 const lm=Math.floor(((dob.getTime()/86400000+2440588-2445189)%354.37)/29.53);
 document.getElementById("rMoon").textContent=ISLAMIC[((lm%12)+12)%12]+" (تقریبی)";
 const z=ZODIAC[m]; const ch=CHINESE[(y-4)%12<0?((y-4)%12+12):((y-4)%12)];
 document.getElementById("rZod").textContent=z[0]+" / "+ch;
 const cb=document.getElementById("candleBox");
 const nC=Math.min(ageY,50);
 cb.textContent=nC>0?("🕯️".repeat(nC)+(ageY>50?" …+":"")):"🎂 نوزاد!";
});
</script>
<script src="../js/main.js" defer></script>
</body>
</html>'''
with open("tools/age-calculator.html", "w", encoding="utf-8") as f:
    f.write(AGE_HTML)
print("+ tools/age-calculator.html")
