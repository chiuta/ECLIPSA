# Jurnal de modificări — ECLIPSA

## 2.1.3 — 2026-11-08

- Exportul text (copiere/descărcare) separă acum «[Calcul astronomic]» de «[Interpretare simbolică, fără validare științifică]» și adaugă o linie de precizie (în toate cele 8 limbi).

## 2.1.0 — 2026-11-02 (reîmprospătare kit)

- Nou (kit): **Sincronizare între dispozitive** (`FFF.sync`) — în dialogul «Transparență» (clic pe versiune → Copie de siguranță): conectezi două dispozitive direct (WebRTC, cod/QR, fără server și fără cont) și își schimbă datele aplicației; cea mai recentă valoare câștigă, secretele (chei API, parole) nu se trimit, ștergerile nu se propagă. Aplicarea trece prin importul kitului (confirmare, chei permise, rollback).
- Nou (kit): **Istoric local — «mașina timpului»** (`FFF.history`) — instantanee automate ale datelor (IndexedDB, fără secrete), diferență față de starea curentă și restaurare reversibilă; «Șterge datele aplicației» șterge și istoricul.
- Module adăugate: `qr`, `p2p`, `sync`, `history` (+~140 KB). Versiunea aplicației nu se schimbă.

## 2.1.0 — 2026-11-01

- Corectat: adaptorul «Trimite la…» nu mai aruncă eroare când kitul FFF lipsește (gardian pe fiecare bloc; găsit de testul «fără kit» din CI).

Nou: «Trimite la…» (fff-kit, modulul FFF.bridge) — după orice export de fișier (GPX, ICS, CSV, Markdown) apare butonul «Trimite la…» către aplicațiile compatibile, iar importul de fișiere al aplicației primește plicuri .fff.json trimise de ele, cu confirmare înainte de import. Fără rețea, fără telemetrie.

Traduceri: catalogul de eclipse (38 de chei `cat_*`) și cele 6 repere istorice (dată, loc, descriere) erau afișate în engleză în fr, de, es, it, pt, hu; acum sunt traduse în cele 6 limbi, prin dicționarele existente (`STR.<limbă>`, câmpurile `d/p/s<Limbă>` din `CAT_HIST`).

## 2.0.2 — 2026-10-27 (anterior: 2.0.1)

Text/documentație + test (formulele de calcul nu s-au schimbat).

- **Ascendent, MC și case măsurate** (înlocuiesc „precizie nemăsurată, de verificat”): pe 600 de date (1900–2050) și locuri (lat. −65…65°), față de o referință independentă (timp sideral aparent + oblicitate adevărată ERFA, definiția geometrică rezolvată numeric): ascendent medie 0,20′, max 2,05′ (≈0,03°; 0,47′ sub 45°, 2,05′ la 60–65°); MC max 0,31′; vârfuri Placidus max 0,81′; aceeași casă în 600/600 cazuri (Placidus, case egale, semne întregi). Reziduul e de ordinul nutației (aplicația folosește timp sideral mediu și oblicitate medie).
- Nota „Precizie” din aplicație (cheia `note`, 8 limbi) și README (8 limbi) actualizate cu cifrele măsurate.
- Test nou `tests/precizie-ascendent.test.mjs` + referința `tests/data/asc-ref.json`; generatorul în `tools/` (nu face parte din aplicație).

Nu implementat:

- Comparație cu NASA JPL Horizons sau cu un program astrologic terț: nu s-a făcut (fără rețea; măsurătoarea e față de definiția standard a unghiurilor).
- Îmbunătățirea formulei Lunii (≈19,6′): modificare de calcul, în afara acestei ture; propunere: `FFF.ephem.moon`.
- Latitudini peste 65° (Placidus nedefinit ~66°): nemăsurate.
- Traducerile fr/it/es/pt/de/hu ale notei: traducere automată, neverificate de vorbitori nativi.

## 2.0.1 — 2026-10-27 (anterior: 2.0.0)

Text: precizie măsurată (fără schimbări de calcul).

- Afirmația „precizie de ordinul 0,01–0,1°” (nota din aplicație, 8 limbi + README x8 + comentariu din cod) înlocuită cu valori MĂSURATE față de JPL DE421 pe 500 de date 1900–2050: Soare max ≈1,1′ (≈0,02°), Lună max ≈19,6′ (≈0,33°); ascendent: „precizie nemăsurată, de verificat”.
- README: secțiune nouă cu metoda; „Stare” și „Offline”.

Nu implementat:

- Ascendent și case: nemăsurate separat (marcat „de verificat”).
- Comparație directă cu NASA JPL Horizons: indisponibilă din mediul meu; s-a folosit DE421 (aceeași efemeridă).
- Nicio modificare a formulelor de calcul.

Istoricul anterior (1.x–2.0.0) este în secțiunea „History” din README.md.
