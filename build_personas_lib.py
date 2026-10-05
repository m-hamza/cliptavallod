# -*- coding: utf-8 -*-
"""سازنده صفحات لندینگ مخاطب‌محور «کلیپ تولد» — personas + messages + styles"""
import os, json

SITE = "https://cliptavalod.ir"
OUT_DIRS = ["landing-page", "messages", "styles"]

FA = str.maketrans("0123456789", "۰۱۲۳۴۵۶۷۸۹")
def fa(n): return str(n).translate(FA)

CSS = {
    "landing-page": "../css/style.css", "messages": "../css/style.css",
    "styles": "../css/style.css", ".": "css/style.css",
}
ROOT = {
    "landing-page": "..", "messages": "..", "styles": "..", ".": "",
}

NAV_LINKS = [("index.html","خانه"),("services.html","خدمات"),("portfolio.html","نمونه کارها"),
             ("categories.html","دسته‌بندی‌ها"),("blog/index.html","وبلاگ"),("tools/age-calculator.html","محاسبه سن"),("contact.html","تماس")]

def nav(r):
    links = "".join(f'<a href="{r}/{h}">{t}</a>' for h,t in NAV_LINKS)
    mob = '<a href="{0}/index.html">خانه</a><a href="{0}/services.html">خدمات</a><a href="{0}/categories.html">دسته‌بندی‌ها</a><a href="{0}/order.html">سفارش</a><a href="{0}/tools/age-calculator.html">محاسبه سن</a>'.format(r)
    return f'''<header class="navbar">
  <div class="container nav-inner">
    <a class="brand" href="{r}/index.html"><img src="{r}/img/cake.svg" alt="لوگو کلیپ تولد" width="44" height="44"><span>کلیپ<span class="gold-text">تولد</span></span></a>
    <nav class="nav-links">{links}</nav>
    <a href="{r}/order.html" class="btn btn-primary btn-sm nav-cta">🎂 سفارش آنلاین</a>
    <button class="burger" aria-label="منو"><span></span><span></span><span></span></button>
  </div>
  <nav class="mobile-menu">{mob}</nav>
</header>'''

FOOTER = '''<footer class="footer">
 <div class="container footer-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:22px;padding:30px 0">
  <div><h4 style="color:#fff">کلیپ تولد 🎂</h4><p style="color:#cbb8ff;font-size:.88rem">تولید کلیپ و تصویر اختصاصی تبریک تولد و مناسبت‌ها؛ تحویل فوری، قیمت مناسب.</p><a href="https://rubika.ir/cliptavallod" target="_blank" rel="noopener" class="btn btn-gold btn-sm">عضویت در کانال روبیکا</a></div>
  <div><h4 style="color:#fff">دسترسی سریع</h4><p><a href="{r}/order.html" style="color:#eee">سفارش آنلاین</a><br><a href="{r}/pricing.html" style="color:#eee">تعرفه‌ها</a><br><a href="{r}/portfolio.html" style="color:#eee">نمونه کارها</a><br><a href="{r}/track-order.html" style="color:#eee">پیگیری سفارش</a></p></div>
  <div><h4 style="color:#fff">محبوب‌ترین‌ها</h4><p><a href="{r}/landing-page/klip-tavalod-baraye-madar.html" style="color:#eee">کلیپ تولد مادر</a><br><a href="{r}/landing-page/klip-tavalod-baraye-refiq.html" style="color:#eee">کلیپ تولد رفیق</a><br><a href="{r}/messages/index.html" style="color:#eee">متن تبریک تولد</a><br><a href="{r}/tools/age-calculator.html" style="color:#eee">محاسبه سن</a></p></div>
  <div><h4 style="color:#fff">ابزارها</h4><p><a href="{r}/calendar/index.html" style="color:#eee">تقویم تولد ۳۶۵ روز</a><br><a href="{r}/party-supplies/" style="color:#eee">وسایل و تزیینات تولد</a><br><a href="{r}/faq.html" style="color:#eee">سوالات متداول</a><br><a href="{r}/terms.html" style="color:#eee">قوانین</a> | <a href="{r}/privacy.html" style="color:#eee">حریم خصوصی</a></p></div>
 </div>
 <div class="container footer-bottom">© {y} کلیپ تولد | <a href="https://rubika.ir/cliptavallod" target="_blank" rel="noopener">کانال روبیکا</a> | <a href="{r}/terms.html">قوانین و مقررات</a> | <a href="{r}/privacy.html">حریم خصوصی</a></div>
</footer>'''

COMMON_KW = "کلیپ تولد, کلیپ تبریک تولد, کلیپ تولد خاص, متن تبریک تولد, تبریک تولد, سفارش کلیپ تولد, آهنگ تولد, کیک تولد"

CHIPS = ['"تبریک تولد"','"متن تبریک تولد"','"کلیپ تولد"','"کیک تولد"','"آهنگ تولد"','"هدیه تولد"','"جشن تولد"','"تولد چیست"','"چرا تولد میگیریم"','"چطور تولد رو تبریک بگیم"','"انسان قبل از تولد کجا بوده"']

def page(folder, slug, title, desc, keywords, h1, sub, body_html, related, canonical=None, faq=None, extra_head=""):
    r = ROOT[folder]
    y = "۱۴۰۵"
    footer = FOOTER.format(r=r, y=y)
    breadcrumb_items = '<a href="%s/index.html">خانه</a> / <a href="%s/%s/index.html">%s</a> / <span>%s</span>' % (
        r, r, folder if folder != "." else "", {"landing-page":"لندینگ‌پیج","messages":"متن و پیام تبریک","styles":"ایده و سبک تولد",".":"فهرست"}.get(folder,"فهرست"), h1.replace("<span class=\"grad-text\">","").replace("</span>",""))
    if folder == ".":
        breadcrumb_items = '<a href="index.html">خانه</a> / <span>%s</span>' % h1
    ld = {"@context":"https://schema.org","@type":"CollectionPage","name":title.split("|")[0].strip(),"description":desc,"url":canonical or f"{SITE}/{folder}/{slug}.html" if folder!="." else f"{SITE}/{slug}.html"}
    html = f'''<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="keywords" content="{keywords}">
<link rel="canonical" href="{canonical or (SITE + '/' + folder + '/' + slug + '.html' if folder!='.' else SITE + '/' + slug + '.html')}">
<meta property="og:type" content="article"><meta property="og:title" content="{title.split('|')[0].strip()}">
<meta property="og:description" content="{desc[:150]}"><meta property="og:image" content="{SITE}/img/cake.svg"><meta property="og:locale" content="fa_IR">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{title.split('|')[0].strip()}"><meta name="twitter:description" content="{desc[:150]}">
<meta name="robots" content="index, follow">
<link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet">
<link rel="stylesheet" href="{CSS[folder]}">
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
{extra_head}
</head>
<body>
<div id="loader"><img src="{r}/img/cake.svg" width="110" alt="کیک تولد"><p>در حال آماده‌سازی…</p></div>
{nav(r)}
<main class="container">
<nav class="breadcrumb">{breadcrumb_items}</nav>
<section class="hero" style="min-height:auto;border-radius:26px;margin-top:8px">
  <div class="container hero-grid" style="padding:44px 0">
    <div>
      <h1>{h1}</h1>
      <p class="lead">{sub}</p>
      <div class="hero-actions">
        <a href="{r}/order.html" class="btn btn-primary">💝 ثبت سفارش کلیپ اختصاصی</a>
        <a href="{r}/portfolio.html" class="btn btn-outline">🎬 مشاهده نمونه کارها</a>
        <span class="price" style="align-self:center">از ۵۰,۰۰۰ تومان • ⏱ تحویل ۲۴ ساعته</span>
      </div>
    </div>
    <div class="hero-cake"><img src="{r}/img/cake.svg" alt="کیک تولد با شمع" width="260"></div>
  </div>
</section>
{body_html}
<section class="section faq">
  <h2 class="section-title">❓ سوالات متداول</h2>
  {(faq or DEFAULT_FAQ).replace('%R%', r)}
  <p style="text-align:center;margin-top:26px"><a href="{r}/order.html" class="btn btn-gold" style="font-size:1.05rem;padding:15px 40px">🎁 سفارش دهید + کد تخفیف BIRTHDAY20</a></p>
  <p style="color:var(--muted);font-size:.92rem;text-align:center;margin-top:22px">صفحات مرتبط: {related.replace('%R%', r)}</p>
</section>
</main>
<div id="lightbox" role="dialog" aria-modal="true"><button class="close" aria-label="بستن">×</button><div class="lb-stage"><span>🎬</span><span class="lb-watermark">clipTavalod.ir</span></div><h3 class="lb-title" style="color:#fff"></h3><div style="display:flex;gap:12px"><button class="btn btn-gold lb-download">⬇ دانلود نمونه واترمارک‌دار</button></div></div>
{footer}
<button id="backTop" aria-label="بازگشت به بالا">↑</button>
<button id="chatBtn" aria-label="چت آنلاین">💬</button>
<div id="chatBox"><header>پشتیبانی آنلاین 🎂</header><div class="chat-body"></div><form class="chat-input"><input placeholder="پیام…" aria-label="پیام"><button type="submit">ارسال</button></form></div>
<div id="toasts"></div>
<script src="{r}/js/main.js" defer></script>
</body>
</html>'''
    path = os.path.join(folder, slug + ".html")
    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    return path

DEFAULT_FAQ = '''<details><summary>برای ساخت کلیپ چه چیزهایی لازم است؟</summary><p>فقط ۶ تا ۱۵ عکس باکیفیت + نام شخص و مناسبت. بقیه (موزیک، افکت، تایپوگرافی) با تیم «کلیپ تولد» است.</p></details>
<details><summary>تحویل چقدر طول می‌کشد؟</summary><p>کلیپ ساده حدود ۲۴ ساعت، حرفه‌ای ۴۸ ساعت و گزینه فوری برای جشن‌های امشب موجود است.</p></details>
<details><summary>قیمت کلیپ تولد چقدر است؟</summary><p>کلیپ ساده از ۵۰,۰۰۰ تومان، حرفه‌ای از ۱۰۰,۰۰۰ تومان، VIP از ۲۰۰,۰۰۰ تومان و پکیج کامل از ۲۵۰,۰۰۰ تومان. جزئیات در <a href="%R%/pricing.html">صفحه تعرفه‌ها</a>.</p></details>
<details><summary>چطور تولد رو تبریک بگیم که خاص باشد؟</summary><p>ترکیب یک «متن تبریک تولد» صمیمی با «کلیپ تولد اختصاصی» و «آهنگ تولد» موردعلاقه، بهترین فرمول غافلگیری است.</p></details>'''

def cards(items, per_row=3):
    out = []
    for t, d, emoji, href in items:
        out.append(f'<a class="card reveal" href="{href}" style="text-decoration:none;color:inherit"><div class="card-icon">{emoji}</div><h3>{t}</h3><p>{d}</p><span style="color:var(--pink);font-weight:700">مشاهده ←</span></a>')
    return '<div class="grid grid-%d">%s</div>' % (per_row, "\n".join(out))

def kw_chips(title, kws):
    from urllib.parse import quote
    chips = "".join(f'<a class="chip" href="%R%/search.html?q={quote(kw)}" style="text-decoration:none">{kw}</a>' for kw in kws)
    return f'''<section class="section"><h2 class="section-title">🔑 {title}</h2><div style="display:flex;flex-wrap:wrap;gap:10px">{chips}</div></section>'''

def sample_gallery(label):
    em = ["🎂","🎈","🎁","🕯️","🌹","✨"]
    works = "".join(f'<div class="work reveal" data-cat="g" data-title="{label} — نمونه {i+1}"><span class="emoji">{e}</span><div class="overlay"><b>نمونه {fa(i+1)}</b><span>FullHD • ۳۰ تا ۶۰ ثانیه</span></div></div>' for i,e in enumerate(em))
    return f'<h2 style="margin:30px 0 16px;text-align:center">🎬 نمونه‌کارهای «{label}»</h2><div class="grid grid-3">{works}</div>'

def price_table(rows, label="کلیپ تولد"):
    tr = "".join(f"<tr><td>{a}</td><td>{b}</td><td>{c}</td><td>{d}</td><td><a class='btn btn-primary btn-sm' href='%R%/order.html'>سفارش</a></td></tr>" for a,b,c,d in rows)
    return f'''<section class="section"><h2 class="section-title">💰 تعرفه «{label}»</h2>
<div style="overflow-x:auto"><table class="tbl" style="width:100%;border-collapse:collapse;text-align:center">
<thead><tr style="background:rgba(255,255,255,.08)"><th style="padding:12px">خدمت</th><th style="padding:12px">زمان تحویل</th><th style="padding:12px">قیمت از (تومان)</th><th style="padding:12px">خروجی</th><th style="padding:12px">—</th></tr></thead>
<tbody>{tr}</tbody></table></div></section>'''

def seo_text(h1, paras):
    blocks = "".join(f"<p>{p}</p>" for p in paras)
    return f'<section class="section"><h2 class="section-title">✍️ راهنمای کامل {h1}</h2>{blocks}</section>'

def msg_section(title, msgs):
    lis = "".join(f'<div class="card reveal" style="margin-bottom:12px"><p style="margin:0;line-height:2">“{m}”</p></div>' for m in msgs)
    return f'<section class="section"><h2 class="section-title">{title}</h2>{lis}</section>'

