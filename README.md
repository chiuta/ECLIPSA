# ECLIPSA — casa ta la eclipsa de Soare sau de Lună

Aplicație single-file care află în ce casă astrologică natală cade o eclipsă (212 eclipse 2024–2070) pe baza datelor tale de naștere.

**Live:** https://chiuta.github.io/ECLIPSA/

![Captura de ecran](screenshot.png)

## Ce este

Calcul astronomic local (Soare, Lună, ascendent, MC, case) plus texte simbolice pentru fiecare casă. **Astrologia nu are validare științifică**: interpretările sunt reflecție/divertisment, nu predicții și nu sfat medical, financiar sau juridic.

## Funcții

- Sisteme de case declarate: semne întregi (implicit), case egale, Placidus. Fără ora nașterii: hartă solară (semne întregi).
- Ora aproximativă (interval, inclusiv peste miezul nopții): arată toate casele posibile.
- Lista de eclipse verificată față de catalogul NASA (date și tipuri: 106 solare + 106 lunare, toate concordante); eclipsă personalizată posibilă.
- Roată SVG, copiere/descărcare rezultat, RO/EN.
- Sugestie de fus orar din baza IANA a browserului (ora de vară istorică).

## Manual de utilizare

1. Completează data și (opțional) ora nașterii; alege orașul sau coordonatele.
2. Apasă „Sugerează fusul orar” (poți corecta manual).
3. Alege sistemul de case și eclipsa.
4. Apasă „Calculează”.

## Confidențialitate și rețea

- Nu folosește storage, cookie-uri, conturi; nicio gazdă externă (CSP `connect-src 'none'`). Datele nu părăsesc dispozitivul.
- Nu cere permisiuni.

## Limite și avertismente

- Precizie ~0,01° (Soare), ~0,1–0,3° (Lună, informativă). Orele eclipselor sunt rotunjite la minut (±2 min, fără efect practic).
- Placidus nu e definit peste ~66° latitudine (aplicația refuză); peste 89,5° nu există ascendent.
- Fusul orar: verifică manual înainte de ~1970 și în ziua schimbării orei; data nașterii ≥ 1900.
- Astrologia nu are bază științifică.

## Istoric / Changelog

Ultima actualizare: 11 octombrie 2026.

- Formularul și rezultatele sunt încadrate în `<main>` (reper de accesibilitate); axe-core: 0 violări la 1280 și 360 px.
- Eclipsa implicită din listă se alege dinamic (cea mai recentă eclipsă trecută față de data curentă); lista de 212 eclipse NASA nu a fost modificată.
- Nerezolvat: rezultatul de referință (casa V pentru eclipsa din 2 octombrie 2024) nu a putut fi reverificat independent, fiindcă mediul de lucru nu are o efemeridă externă.

## Rulare locală / offline

Descarcă `index.html` și deschide-l în browser.

## Licență

Licența nu este încă declarată.

## Autor

Alexio — Alexandru-Ionuț Chiuță, contact: alexio@trom.tf

## English summary

Offline single-file app that finds which natal house (whole sign, equal, or Placidus) a solar/lunar eclipse falls in, for 212 eclipses 2024–2070 (checked against NASA's catalogs). Local computation, no storage or network. Astrology has no scientific validation; interpretations are symbolic.
