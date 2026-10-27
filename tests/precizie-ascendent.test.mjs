// Precizia ascendentului, MC și vârfurilor Placidus față de o referință independentă (tests/data/asc-ref.json).
// Referința: ERFA (timp sideral aparent, oblicitate adevărată IAU 2006/2000A) + definiția geometrică (vezi tools/asc_cmp.py).
// Rulare: node tests/precizie-ascendent.test.mjs
import {launch, check, summary} from "./_lib.mjs";
import fs from "fs"; import path from "path"; import {fileURLToPath} from "url";
const HERE = path.dirname(fileURLToPath(import.meta.url));
const {samples} = JSON.parse(fs.readFileSync(path.join(HERE, "data", "asc-ref.json"), "utf8"));
check("600 de eșantioane de referință", samples.length === 600, samples.length);
const {browser, page, st} = await launch({locale: "en-US", bypassCSP: true});
await page.waitForTimeout(1200);
const app = await page.evaluate(smp => smp.map(o => {
  const eps = obliquity(o.jd), ramc = norm360(gmst(o.jd) + o.lon), am = ascMC(ramc, eps, o.lat);
  const c = placidusCusps(ramc, eps, o.lat, am.asc, am.mc);
  return {asc: am.asc, mc: am.mc, c: [c[10], c[11], c[1], c[2]], valid: placidusValid(c), hp: placidusValid(c) ? houseFromCusps(c, o.tgt) : null, he: equalHouse(am.asc, o.tgt), hw: wholeSignHouse(am.asc, o.tgt)};
}), samples);
const d = (a, b) => Math.abs(((a - b + 540) % 360) - 180) * 60;   // arcminute
const mx = a => Math.max(...a), mean = a => a.reduce((x, y) => x + y, 0) / a.length;
const ea = [], em = [], ec = [];
let hm = 0, he = 0, hw = 0, inv = 0;
const house = (c, t) => { for (let i = 0; i < 12; i++) if (((t - c[i]) % 360 + 360) % 360 < (((c[(i + 1) % 12] - c[i]) % 360) + 360) % 360) return i + 1; return 12; };
samples.forEach((r, i) => {
  const a = app[i]; ea.push(d(a.asc, r.asc)); em.push(d(a.mc, r.mc));
  if (!r.c || !a.valid) { inv++; return; }
  r.c.forEach((v, k) => ec.push(d(a.c[k], v)));
  const m = r.mc, as = r.asc, n = x => ((x % 360) + 360) % 360;
  const cr = [as, r.c[2], r.c[3], n(m + 180), n(r.c[0] + 180), n(r.c[1] + 180), n(as + 180), n(r.c[2] + 180), n(r.c[3] + 180), m, r.c[0], r.c[1]];
  hm += house(cr, r.tgt) !== a.hp;
  he += (Math.floor(n(r.tgt - as) / 30) + 1) !== a.he;
  hw += (((Math.floor(n(r.tgt) / 30) - Math.floor(as / 30)) % 12 + 12) % 12 + 1) !== a.hw;
});
console.log(`  ascendent: medie ${mean(ea).toFixed(3)}′, max ${mx(ea).toFixed(3)}′; MC: max ${mx(em).toFixed(3)}′; vârfuri Placidus: medie ${mean(ec).toFixed(3)}′, max ${mx(ec).toFixed(3)}′; case diferite: Placidus ${hm}, egale ${he}, semne întregi ${hw}`);
check("ascendent: eroare maximă ≤ 2,2′ (≈0,04°)", mx(ea) <= 2.2, mx(ea));
check("ascendent: medie ≤ 0,3′", mean(ea) <= 0.3, mean(ea));
check("MC: eroare maximă ≤ 0,4′", mx(em) <= 0.4, mx(em));
check("vârfuri Placidus: eroare maximă ≤ 0,9′", mx(ec) <= 0.9, mx(ec));
check("Placidus valid în aceleași cazuri cu referința", inv === 0, inv);
check("aceeași casă (Placidus, egale, semne întregi) în toate cele 600 de cazuri", hm === 0 && he === 0 && hw === 0, [hm, he, hw]);
check("0 erori de pagină", st.errs.length === 0, st.errs);
await browser.close(); summary();
