/* تبدیل یک صفحه مادر به لندینگ‌پیج سئو-محور با کلمات کلیدی Long-tail
   اجرا: node make-landing.js <source.html> <out.html> <title> <desc> <h1> <keyword>  */
const fs = require("fs");
const [src, out, title, desc, h1, kw] = process.argv.slice(2);
if (!src || !out) { console.error("args missing"); process.exit(1); }
let h = fs.readFileSync(src, "utf8");

// مسیرها از پوشه landing-page/ به ریشه
h = h.replace(/href="css\//g, 'href="../css/').replace(/src="img\//g, 'src="../img/')
     .replace(/src="js\//g, 'src="../js/').replace(/href="(?!#|http|privacy|terms)([a-z])/g, 'href="../$1')
     .replace(/href="\.\.\/privacy\.html"/g,'href="privacy.html"'); // fix double if any
h = h.replace(/href="\.\.\/\.\.\//g,'href="../');
h = h.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
h = h.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${desc}">`);
h = h.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="https://cliptavalod.ir/landing-page/${out.split("/").pop()}">`);
h = h.replace(/<h1/, `<h1 data-kw="${kw}"`).replace(/(کلیپ تولد \| )?کلیپ‌های تبریک تولد خاص و منحصر‌به‌فرد/, kw);
fs.mkdirSync(require("path").dirname(out), { recursive: true });
fs.writeFileSync(out, h);
console.log("landing created:", out);
