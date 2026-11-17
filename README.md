# Español – španělština od nuly (Android)

Mobilní aplikace pro úplné začátečníky: 15 lekcí, 250 slovíček, 90 vět, gramatika s výkladem v češtině,
poslech (španělský hlas telefonu), 15 krátkých poslechových nahrávek s otázkami, 6 souvislých textů
se slovníčkem a otázkami, diktáty, skládání vět, čtení s porozuměním a chytré opakování
(rozložené opakování podle toho, co ti jde a co ne).

## Jak získat APK
1. Nahraj obsah této složky do nového repozitáře na GitHubu (větev `main`).
2. GitHub Actions aplikaci samy sestaví (záložka **Actions**, cca 3–5 min).
3. Hotový soubor najdeš v **Releases → latest → Espanol.apk**. Otevři tu stránku v telefonu, stáhni a nainstaluj
   (Android se zeptá na povolení instalace z prohlížeče, to je potřeba jednou povolit).

## Úpravy obsahu
- Lekce: `web/src/lessons.js`, poslechy a souvislé texty: `web/src/texts.js`, logika: `web/src/app.js`, vzhled: `web/src/style.css`.
- Po úpravě stačí změny poslat na GitHub. Workflow spustí `web/build.py` a sestaví novou verzi.
- Aplikace je podepsaná pevným klíčem `app/espanol.keystore`, takže se nová verze nainstaluje přes starou a postup zůstane.

## Hlas
Aplikace používá systémový převod textu na řeč. Když neslyšíš španělštinu, nainstaluj v telefonu
*Nastavení → Usnadnění / Jazyk → Převod textu na řeč → Google → Nainstalovat hlasová data → Španělština (Španělsko)*.
