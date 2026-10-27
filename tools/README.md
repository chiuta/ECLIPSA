# Instrumente de măsurare a preciziei (ascendent, MC, case)

Nu fac parte din aplicație (rămâne un singur fișier HTML, offline). Se rulează manual:

1. `node tools/precizie-ascendent-esantioane.mjs $PWD/index.html 600 eclipsa` (Playwright) -> `asc_eclipsa.json` (eșantioane + valorile calculate de aplicație).
2. `python3 tools/asc_cmp.py eclipsa` (necesită `pyerfa`, `skyfield`, `numpy`) -> statistici și `asc_eclipsa_ref.json` (referința; copiată, rotunjită, în `tests/data/asc-ref.json`).

Referința folosește timp sideral aparent și oblicitate adevărată din ERFA (IAU 2006/2000A; ΔT din Skyfield) și definițiile geometrice rezolvate numeric (nu formula închisă a aplicației). Nu folosește un program astrologic terț.
