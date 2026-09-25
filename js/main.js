/* ============================================================
   کلیپ تولد | ClipTavalod — اسکریپت اصلی سایت
   شامل: لودینگ، منو، Toast، چت ربات، اسکرول، کاروسل، فرم‌ها،
   اعتبارسنجی + Sanitization، کد تخفیف، امتیازدهی، confetti و...
   ============================================================ */
"use strict";

const SITE = {
  name: "کلیپ تولد",
  rubika: "https://rubika.ir/cliptavallod",
  phone: "0912-000-0000",
  email: "info@cliptavalod.ir"
};

/* ---------------- Sanitization (محافظت XSS) ---------------- */
function sanitize(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;")
    .replace(/javascript:/gi, "").replace(/on\w+=/gi, "");
}

/* ---------------- Toast Notifications ---------------- */
function toast(msg, type = "info", ms = 3800) {
  let box = document.getElementById("toasts");
  if (!box) { box = document.createElement("div"); box.id = "toasts"; document.body.appendChild(box); }
  const t = document.createElement("div");
  t.className = "toast " + type;
  t.setAttribute("role", "status");
  t.textContent = msg;
  box.appendChild(t);
  setTimeout(() => { t.style.opacity = "0"; t.style.transition = ".4s"; setTimeout(() => t.remove(), 400); }, ms);
}

/* ---------------- Confetti ---------------- */
function confetti(count = 60) {
  const colors = ["#ec4899", "#a855f7", "#f97316", "#fbbf24", "#22d3ee", "#22c55e"];
  for (let i = 0; i < count; i++) {
    const c = document.createElement("i");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[i % colors.length];
    c.style.animationDuration = (2 + Math.random() * 2.5) + "s";
    c.style.animationDelay = Math.random() * 1.2 + "s";
    c.style.borderRadius = Math.random() > .5 ? "50%" : "2px";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 6000);
  }
}

/* ---------------- اعداد فارسی / قیمت ---------------- */
const faNum = n => String(n).replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);
const price = n => faNum(n.toLocaleString("en-US")) + " تومان";

/* ---------------- Loading Screen ---------------- */
window.addEventListener("load", () => {
  const l = document.getElementById("loader");
  if (l) setTimeout(() => l.classList.add("hide"), 500);
});

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- منوی موبایل ---------- */
  const burger = document.querySelector(".burger"), mm = document.querySelector(".mobile-menu");
  if (burger && mm) burger.addEventListener("click", () => {
    mm.classList.toggle("open");
    burger.setAttribute("aria-expanded", mm.classList.contains("open"));
  });

  /* ---------- Back to top + Navbar shadow ---------- */
  const top = document.getElementById("backTop");
  window.addEventListener("scroll", () => {
    if (top) top.classList.toggle("show", scrollY > 500);
  }, { passive: true });
  top?.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Reveal on Scroll ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
  }), { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  /* ---------- شمارنده آمار ---------- */
  const statIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count, dur = 1600, t0 = performance.now();
    (function tick(t) {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = faNum(Math.floor(target * (1 - Math.pow(1 - p, 3)))).toLocaleString?.("fa") || faNum(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      el.textContent = faNum(new Intl.NumberFormat("fa-IR").format(Math.floor(target * (1 - Math.pow(1 - p, 3)))));
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
    statIO.unobserve(el);
  }), { threshold: .6 });
  document.querySelectorAll("[data-count]").forEach(el => statIO.observe(el));

  /* ---------- بادکنک‌ها و ستاره‌ها در Hero ---------- */
  const hero = document.querySelector(".hero");
  if (hero) {
    const cols = ["#ec4899", "#a855f7", "#f97316", "#fbbf24", "#22d3ee"];
    for (let i = 0; i < 7; i++) {
      const b = document.createElement("span");
      b.className = "balloon";
      b.style.left = (5 + Math.random() * 90) + "%";
      b.style.background = `radial-gradient(circle at 35% 30%, #fff8, ${cols[i % cols.length]})`;
      b.style.animationDuration = (9 + Math.random() * 10) + "s";
      b.style.animationDelay = (Math.random() * 8) + "s";
      b.style.setProperty("--sway", (Math.random() * 80 - 40) + "px");
      hero.appendChild(b);
    }
    for (let i = 0; i < 14; i++) {
      const s = document.createElement("i");
      s.className = "star"; s.textContent = "✦";
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 100 + "%";
      s.style.animationDelay = Math.random() * 2 + "s";
      hero.appendChild(s);
    }
  }

  /* ---------- Carousel ---------- */
  document.querySelectorAll("[data-carousel]").forEach(car => {
    const track = car.querySelector(".carousel-track");
    const slides = track.children.length;
    const dotsBox = car.querySelector(".dots");
    let idx = 0, timer;
    for (let i = 0; i < slides; i++) {
      const d = document.createElement("button");
      d.className = "dot" + (i ? "" : " active");
      d.setAttribute("aria-label", "اسلاید " + (i + 1));
      d.onclick = () => go(i);
      dotsBox.appendChild(d);
    }
    function go(i) {
      idx = (i + slides) % slides;
      track.style.transform = `translateX(${idx * 100}%)`; // RTL
      dotsBox.querySelectorAll(".dot").forEach((d, j) => d.classList.toggle("active", j === idx));
    }
    car.querySelector(".next")?.addEventListener("click", () => { go(idx + 1); reset(); });
    car.querySelector(".prev")?.addEventListener("click", () => { go(idx - 1); reset(); });
    function reset() { clearInterval(timer); timer = setInterval(() => go(idx + 1), 4500); }
    reset();
  });

  /* ---------- فیلتر نمونه‌کارها ---------- */
  const chips = document.querySelectorAll(".filters .chip");
  chips.forEach(ch => ch.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    ch.classList.add("active");
    const f = ch.dataset.filter;
    document.querySelectorAll(".work").forEach(w => {
      w.classList.toggle("hidden", f !== "all" && w.dataset.cat !== f);
    });
  }));

  /* ---------- Lightbox ---------- */
  const lb = document.getElementById("lightbox");
  if (lb) {
    document.querySelectorAll(".work").forEach(w => w.addEventListener("click", () => {
      lb.querySelector(".lb-stage span").textContent = w.querySelector(".emoji")?.textContent || "🎬";
      lb.querySelector(".lb-title").textContent = w.dataset.title || "نمونه کار";
      lb.classList.add("open");
    }));
    lb.addEventListener("click", e => { if (e.target === lb || e.target.closest(".close")) lb.classList.remove("open"); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") lb.classList.remove("open"); });
    lb.querySelector(".lb-download")?.addEventListener("click", () => {
      toast("دانلود نسخه واترمارک‌دار نمونه آغاز شد…", "success");
      confetti(25);
    });
  }

  /* ---------- لایک و اشتراک‌گذاری ---------- */
  document.querySelectorAll(".like-btn").forEach(btn => btn.addEventListener("click", () => {
    const liked = btn.classList.toggle("liked");
    let n = +btn.dataset.likes + (liked ? 1 : -1);
    btn.dataset.likes = n;
    btn.innerHTML = (liked ? "❤️" : "🤍") + " " + faNum(n);
    localStorage.setItem("likes_" + btn.dataset.id, liked ? "1" : "0");
    if (liked) confetti(18);
  }));
  document.querySelectorAll("[data-share]").forEach(btn => btn.addEventListener("click", async () => {
    const url = SITE.rubika, title = document.title;
    const net = btn.dataset.share;
    const links = {
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
      rubika: url,
      copy: null
    };
    if (net === "copy") {
      try { await navigator.clipboard.writeText(url + " | " + title); toast("لینک کپی شد ✔", "success"); }
      catch { toast("کپی ناموفق بود", "error"); }
    } else {
      window.open(links[net], "_blank", "noopener,width=600,height=500");
    }
  }));

  /* ---------- اعتبارسنجی فرم سفارش ---------- */
  const IR_MOBILE = /^0?9\d{9}$/;
  const form = document.getElementById("orderForm") || document.getElementById("contactForm") || document.getElementById("suppliesOrder");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      let ok = true;
      form.querySelectorAll("[required]").forEach(inp => {
        const field = inp.closest(".field");
        let bad = !inp.value.trim();
        if (inp.name === "phone" && inp.value && !IR_MOBILE.test(inp.value.replace(/[- ]/g, ""))) bad = true;
        if (inp.type === "email" && inp.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value)) bad = true;
        if (inp.name === "age" && inp.value && (+inp.value < 1 || +inp.value > 120)) bad = true;
        field?.classList.toggle("invalid", bad);
        if (bad) ok = false;
      });
      if (!ok) { toast("لطفاً خطاهای فرم را برطرف کنید ⚠️", "error"); return; }
      // CSRF token شبیه‌سازی‌شده + ذخیره محلی برای پیگیری
      const data = Object.fromEntries(new FormData(form).entries());
      Object.keys(data).forEach(k => data[k] = sanitize(data[k]));
      data.id = "CT-" + Date.now().toString(36).toUpperCase();
      data.status = "در حال بررسی";
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      orders.push(data);
      localStorage.setItem("orders", JSON.stringify(orders));
      confetti(90);
      toast(`✅ سفارش شما با کد رهگیری ${data.id} ثبت شد. به‌زودی تماس می‌گیریم!`, "success", 7000);
      form.reset();
      document.getElementById("trackResult")?.classList.remove("show");
    });
    form.querySelectorAll("input,select,textarea").forEach(i =>
      i.addEventListener("input", () => i.closest(".field")?.classList.remove("invalid")));
  }

  /* ---------- پیگیری سفارش ---------- */
  document.getElementById("trackBtn")?.addEventListener("click", () => {
    const code = sanitize(document.getElementById("trackCode").value).trim().toUpperCase();
    const res = document.getElementById("trackResult");
    const o = JSON.parse(localStorage.getItem("orders") || "[]").find(x => x.id === code);
    if (res) {
      res.classList.add("show");
      res.innerHTML = o
        ? `<strong>کد رهگیری:</strong> ${o.id}<br><strong>وضعیت:</strong> ${o.status}<br><strong>نوع سفارش:</strong> ${o.orderType || "—"}`
        : "سفارشی با این کد یافت نشد. در صورت ثبت سفارش آنلاین، کد رهگیری به شما پیامک می‌شود.";
    }
  });

  /* ---------- کد تخفیف ---------- */
  const DISCOUNTS = { "BIRTHDAY20": 20, "FIRST10": 10, "CLIPVIP": 30, "YALDA15": 15 };
  document.getElementById("applyCoupon")?.addEventListener("click", () => {
    const code = sanitize(document.getElementById("coupon").value).trim().toUpperCase();
    const out = document.getElementById("couponResult");
    if (DISCOUNTS[code]) {
      out.innerHTML = `🎉 کد «${code}» اعمال شد — <b class="gold-text">${faNum(DISCOUNTS[code])}٪ تخفیف!</b>`;
      toast("کد تخفیف با موفقیت اعمال شد 🎁", "success");
      confetti(40);
    } else {
      out.innerHTML = "❌ کد تخفیف نامعتبر است.";
      toast("کد تخفیف نامعتبر است", "error");
    }
  });

  /* ---------- انتخاب پکیج → پر کردن فرم ---------- */
  document.querySelectorAll("[data-plan]").forEach(btn => btn.addEventListener("click", () => {
    const sel = document.querySelector('select[name="orderType"]');
    if (sel) { sel.value = btn.dataset.plan; sel.dispatchEvent(new Event("change")); }
    toast(`پکیج «${btn.dataset.plan}» انتخاب شد 👌`, "success");
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  }));

  /* ---------- خبرنامه ---------- */
  document.querySelectorAll(".newsletter form").forEach(f => f.addEventListener("submit", e => {
    e.preventDefault();
    const email = f.querySelector("input[type=email]").value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast("ایمیل معتبر وارد کنید", "error"); return; }
    const subs = JSON.parse(localStorage.getItem("newsletter") || "[]");
    subs.push(email); localStorage.setItem("newsletter", JSON.stringify(subs));
    f.reset(); toast("✅ عضویت در خبرنامه باموفقیت انجام شد — کد FIRST10 هدیه شماست!", "success", 6000);
  }));

  /* ---------- چت ربات پشتیبانی ---------- */
  const chatBtn = document.getElementById("chatBtn"), chatBox = document.getElementById("chatBox");
  if (chatBtn && chatBox) {
    const body = chatBox.querySelector(".chat-body");
    const botReply = txt => {
      const t = txt.toLowerCase();
      if (/قیمت|تعرفه|هزینه/.test(t)) return "قیمت‌ها از ۵۰,۰۰۰ تومان (کلیپ ساده) شروع می‌شود. پکیج طلایی کامل: ۲۵۰,۰۰۰ تومان. جزئیات در صفحه خدمات 💎";
      if (/زمان|تحویل|چقدر|مدت/.test(t)) return "تحویل استاندارد ۴۸ ساعت و تحویل فوری ۲۴ ساعته (با هزینه اضافه) انجام می‌شود ⏱️";
      if (/سفارش|خرید/.test(t)) return "از دکمه «سفارش آنلاین» در همان صفحه استفاده کنید یا به کانال روبیکا سر بزنید: " + SITE.rubika + " 🎂";
      if (/روبیکا|کانال/.test(t)) return "آدرس کانال روبیکا ما: " + SITE.rubika + " 🔗";
      if (/سلام|درود|hi/.test(t)) return "سلام و احترام! 😊 چطور می‌تونم کمکتون کنم؟ سوالات رایج: قیمت، زمان تحویل، سفارش";
      if (/موزیک|آهنگ|music/.test(t)) return "می‌تونید موزیک دلخواه خودتون رو بفرستید تا روی کلیپ بذاریم 🎵";
      if (/ساعت|کاری/.test(t)) return "ساعت پاسخگویی: هر روز ۹ تا ۲۱ 🕘";
      return "ممنون از پیامتون! کارشناس ما به‌زودی پاسخ می‌ده. برای ارتباط سریع: " + SITE.rubika + " 💬";
    };
    const push = (txt, who) => {
      const m = document.createElement("div");
      m.className = "chat-msg " + who; m.textContent = txt;
      body.appendChild(m); body.scrollTop = body.scrollHeight;
    };
    chatBtn.addEventListener("click", () => {
      chatBox.classList.toggle("open");
      if (chatBox.classList.contains("open") && !chatBox.dataset.started) {
        chatBox.dataset.started = "1";
        setTimeout(() => push("سلام! 👋 من ربات پشتیبانی «کلیپ تولد» هستم. سوالتون رو بپرسید.", "bot"), 400);
      }
    });
    chatBox.querySelector(".chat-input").addEventListener("submit", e => {
      e.preventDefault();
      const inp = chatBox.querySelector("input");
      const v = sanitize(inp.value).trim();
      if (!v) return;
      push(v, "user"); inp.value = "";
      setTimeout(() => push(botReply(v), "bot"), 700);
    });
  }

  /* ---------- امتیازدهی ستاره‌ای ---------- */
  document.querySelectorAll(".rating").forEach(r => {
    r.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
      const v = +b.dataset.star;
      r.dataset.value = v;
      r.querySelectorAll("button").forEach(x => x.style.color = +x.dataset.star <= v ? "#fbbf24" : "#6b7280");
      toast(`${faNum(v)} ستاره — ممنون از امتیاز شما ⭐`, "success");
    }));
  });

  /* ---------- جستجوی هوشمند (autocomplete ساده) ---------- */
  const search = document.getElementById("siteSearch");
  if (search) {
    const pages = [
      ["کلیپ تولد برای مادر", "landing-page/klip-tavalod-baraye-madar.html"],
      ["کلیپ تولد برای پدر", "landing-page/klip-tavalod-baraye-pedar.html"],
      ["کلیپ سالگرد ازدواج", "landing-page/klip-salgard-ezdavaj.html"],
      ["کلیپ تولد قربان", "landing-page/klip-tavalod-baraye-ghorban.html"],
      ["خدمات", "services.html"], ["نمونه کارها", "portfolio.html"],
      ["تعرفه تبلیغات", "advertising.html"], ["وسایل تولد", "party-supplies.html"],
      ["وبلاگ", "blog/index.html"], ["سفارش آنلاین", "order.html"],
    ];
    const box = document.createElement("div");
    box.style.cssText = "position:absolute;z-index:60;width:100%;background:#1a1230;border:1px solid rgba(255,255,255,.15);border-radius:12px;overflow:hidden;display:none";
    search.parentElement.style.position = "relative";
    search.parentElement.appendChild(box);
    search.addEventListener("input", () => {
      const q = sanitize(search.value).trim();
      const hits = q ? pages.filter(p => p[0].includes(q)) : [];
      box.innerHTML = hits.map(h => `<a href="${h[1]}" style="display:block;padding:10px 14px;color:#f5f3ff;border-bottom:1px dashed rgba(255,255,255,.1)">${h[0]} 🔍</a>`).join("");
      box.style.display = hits.length ? "block" : "none";
    });
    document.addEventListener("click", e => { if (!search.contains(e.target)) box.style.display = "none"; });
  }

  /* ---------- خوش‌آمدگویی + confetti اولین بازدید ---------- */
  if (!sessionStorage.getItem("welcomed")) {
    sessionStorage.setItem("welcomed", "1");
    setTimeout(() => { toast("🎉 به سایت کلیپ تولد خوش آمدید! کد BIRTHDAY20 = ۲۰٪ تخفیف", "success", 6500); }, 1400);
  }

  /* ---------- فرم نظرات وبلاگ ---------- */
  document.querySelectorAll(".comment-form").forEach(f => f.addEventListener("submit", e => {
    e.preventDefault();
    const name = sanitize(f.querySelector('[name=name]').value);
    const text = sanitize(f.querySelector('[name=text]').value);
    if (!name || !text) { toast("نام و متن نظر الزامی است", "error"); return; }
    const list = document.getElementById("commentsList");
    const div = document.createElement("div");
    div.className = "testimonial"; div.style.marginTop = "14px";
    div.innerHTML = `<div class="who"><span class="avatar">${name[0]}</span><div><b>${name}</b><div style="font-size:.8rem;color:var(--muted)">همین الان</div></div></div><p style="margin-top:8px">${text}</p>`;
    list.prepend(div);
    f.reset(); toast("✅ نظر شما ثبت و منتشر شد", "success");
  }));
});
