/* ============================================================
   کلیپ تولد — فایل مشترک هدر، فوتر و موبایل‌بار (Single Source)
   این فایل در تمام صفحات با <script src="...includes.js"> لود شده و
   بخش‌های تکراری را به‌صورت خودکار تزریق می‌کند.
   برای ویرایش منو/فوتر فقط همین فایل را تغییر دهید.
   ============================================================ */
(function () {
  'use strict';

  // تشخیص ریشه سایت از محل اسکریپت (سازگار با /tools/ ،/messages/ ،/service/ ...)
  var script = document.currentScript;
  var root = '/';
  if (script && script.src) {
    var u = new URL(script.src, location.href);
    root = u.pathname.replace(/includes\.js$/, '');
  } else {
    root = location.pathname.replace(/[^/]*\.html?$/, '') || '/';
  }
  window.__SITE_ROOT__ = root;

  function R(p) { return root + p; }

  /* ---------- هدر / ناوبری چسبنده ---------- */
  var headerHTML = '' +
  '<header class="navbar">' +
    '<div class="container nav-inner">' +
      '<a class="brand" href="' + R('index.html') + '"><img src="' + R('img/cake.svg') + '" alt="لوگوی کلیپ تولد - کیک تولد با شمع" width="44" height="44"><span>کلیپ<span class="gold-text">تولد</span></span></a>' +
      '<nav class="nav-links" aria-label="منوی اصلی">' +
        '<a href="' + R('index.html') + '">خانه</a>' +
        '<a href="' + R('services.html') + '">خدمات</a>' +
        '<a href="' + R('portfolio.html') + '">نمونه کارها</a>' +
        '<a href="' + R('categories.html') + '">دسته‌بندی‌ها</a>' +
        '<a href="' + R('pricing.html') + '">تعرفه‌ها</a>' +
        '<a href="' + R('blog/index.html') + '">وبلاگ</a>' +
        '<a href="' + R('about.html') + '">درباره ما</a>' +
        '<a href="' + R('contact.html') + '">تماس</a>' +
      '</nav>' +
      '<a href="' + R('order.html') + '" class="btn btn-primary btn-sm nav-cta">🎂 سفارش آنلاین</a>' +
      '<button class="burger" aria-label="باز کردن منو" aria-expanded="false"><span></span><span></span><span></span></button>' +
    '</div>' +
    '<nav class="mobile-menu" aria-label="منوی موبایل">' +
      '<a href="' + R('index.html') + '">خانه</a><a href="' + R('services.html') + '">خدمات</a><a href="' + R('portfolio.html') + '">نمونه کارها</a>' +
      '<a href="' + R('categories.html') + '">دسته‌بندی‌ها</a><a href="' + R('party-supplies/index.html') + '">وسایل و تزیینات تولد</a>' +
      '<a href="' + R('blog/index.html') + '">وبلاگ</a><a href="' + R('advertising.html') + '">تعرفه تبلیغات</a><a href="' + R('earning.html') + '">روش‌های درآمدزایی</a>' +
      '<a href="' + R('tools/age-calculator.html') + '">محاسبه سن و شمع تولد</a><a href="' + R('calendar/index.html') + '">تقویم تولد ۱۴۰۵</a>' +
      '<a href="' + R('about.html') + '">درباره ما</a><a href="' + R('contact.html') + '">تماس با ما</a><a href="' + R('terms.html') + '">قوانین</a>' +
      '<a href="' + R('order.html') + '">🎂 سفارش آنلاین</a>' +
    '</nav>' +
  '</header>';

  /* ---------- فوتر ---------- */
  var footerHTML = '' +
  '<footer class="footer">' +
    '<div class="container footer-grid">' +
      '<div>' +
        '<a class="brand" href="' + R('index.html') + '"><img src="' + R('img/cake.svg') + '" alt="کیک تولد" width="44" height="44"><span>کلیپ<span class="gold-text">تولد</span></span></a>' +
        '<p style="color:var(--muted);margin-top:14px;font-size:.92rem">استودیو تولید کلیپ و تصویر اختصاصی تبریک تولد و مناسبت‌ها. مطابق با ارزش‌ها و قوانین جمهوری اسلامی ایران 🇮🇷</p>' +
        '<div class="socials">' +
          '<a href="https://rubika.ir/cliptavallod" target="_blank" rel="noopener" aria-label="روبیکا">📣</a>' +
          '<a href="https://instagram.com/cliptavallod" target="_blank" rel="noopener" aria-label="اینستاگرام">📸</a>' +
          '<a href="https://t.me/cliptavallod" target="_blank" rel="noopener" aria-label="تلگرام">✈️</a>' +
          '<a href="https://wa.me/989120000000" target="_blank" rel="noopener" aria-label="واتساپ">💬</a>' +
        '</div>' +
      '</div>' +
      '<div>' +
        '<h4>دسترسی سریع</h4>' +
        '<a href="' + R('services.html') + '">خدمات</a><a href="' + R('portfolio.html') + '">نمونه کارها</a><a href="' + R('order.html') + '">سفارش آنلاین</a><a href="' + R('pricing.html') + '">تعرفه‌ها (۱۴۰۵)</a><a href="' + R('categories.html') + '">دسته‌بندی‌ها</a><a href="' + R('faq.html') + '">سوالات متداول</a>' +
      '</div>' +
      '<div>' +
        '<h4>محبوب‌ترین خدمات</h4>' +
        '<a href="' + R('landing-page/klip-tavalod-baraye-madar.html') + '">کلیپ تولد مادر</a>' +
        '<a href="' + R('landing-page/klip-tavalod-baraye-pedar.html') + '">کلیپ تولد پدر</a>' +
        '<a href="' + R('landing-page/klip-tavalod-baraye-hamser.html') + '">کلیپ تولد همسر</a>' +
        '<a href="' + R('landing-page/klip-tavalod-baraye-refiq.html') + '">کلیپ تولد رفیق</a>' +
        '<a href="' + R('landing-page/klip-salgard-ezdavaj.html') + '">کلیپ سالگرد ازدواج</a>' +
        '<a href="' + R('messages/index.html') + '">متن و پیام تبریک تولد</a>' +
        '<a href="' + R('tools/age-calculator.html') + '">محاسبه سن و تاریخ تولد</a>' +
      '</div>' +
      '<div>' +
        '<h4>صفحات</h4>' +
        '<a href="' + R('about.html') + '">درباره ما</a><a href="' + R('contact.html') + '">تماس با ما</a><a href="' + R('advertising.html') + '">تبلیغات</a><a href="' + R('earning.html') + '">درآمدزایی</a><a href="' + R('party-supplies/index.html') + '">وسایل تولد</a><a href="' + R('calendar/index.html') + '">تقویم تولد</a><a href="' + R('terms.html') + '">قوانین و مقررات</a><a href="' + R('privacy.html') + '">حریم خصوصی</a>' +
      '</div>' +
      '<div>' +
        '<h4>ارتباط با ما</h4>' +
        '<a href="tel:09120000000">📞 ۰۹۱۲-۰۰۰-۰۰۰۰</a>' +
        '<a href="mailto:info@cliptavalod.ir">✉️ info@cliptavalod.ir</a>' +
        '<a href="https://rubika.ir/cliptavallod">💬 روبیکا: @cliptavallod</a>' +
        '<p style="color:var(--muted);font-size:.88rem;margin-top:10px">🕘 پاسخگویی: هر روز ۹ تا ۲۱</p>' +
      '</div>' +
    '</div>' +
    '<div class="footer-bottom container">© ۱۴۰۵ کلیپ تولد — تمامی حقوق محفوظ است. | طراحی با 💜 در ایران</div>' +
  '</footer>';

  /* ---------- دکمه بازگشت به بالا + موبایل‌بار ---------- */
  var extrasHTML = '' +
  '<button id="backTop" aria-label="بازگشت به بالا">↑</button>' +
  '<nav class="mobilebar" aria-label="نوار دسترسی سریع">' +
    '<a href="' + R('order.html') + '"><span>🛒</span>سفارش</a>' +
    '<a href="' + R('portfolio.html') + '"><span>🎬</span>نمونه</a>' +
    '<a href="https://rubika.ir/cliptavallod" target="_blank" rel="noopener"><span>📣</span>روبیکا</a>' +
    '<a href="' + R('tools/age-calculator.html') + '"><span>🎂</span>سن من</a>' +
  '</nav>';

  /* ---------- تزریق ---------- */
  function mount() {
    var oldH = document.querySelector('header.navbar');
    if (oldH) oldH.outerHTML = headerHTML; else document.body.insertAdjacentHTML('afterbegin', headerHTML);

    var oldF = document.querySelector('footer.footer');
    if (oldF) oldF.outerHTML = footerHTML; else document.body.insertAdjacentHTML('beforeend', footerHTML + extrasHTML);
    if (!document.getElementById('backtop')) document.body.insertAdjacentHTML('beforeend', extrasHTML);

    // فعال‌سازی لینک جاری در منو
    var here = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      var f = a.getAttribute('href').split('/').pop();
      if (f === here) a.classList.add('active');
    });

    document.dispatchEvent(new CustomEvent('site:chrome-ready'));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
