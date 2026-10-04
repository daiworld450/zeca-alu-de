# ZeCa-Alu – neue Webseite

Statische Seite (HTML/CSS/JS, kein Build-Tool, keine laufenden Kosten). Ersetzt die
bisherige Wix-Seite unter zeca-alu.de.

## Struktur
```
index.html                     Startseite
terrassenueberdachung/          Leistungsseite
carport/                        Leistungsseite
wintergarten/                   Leistungsseite
vordach/                        Leistungsseite
alu-zaun/                       Leistungsseite
fliegengitter/                  Leistungsseite
einsatzgebiet/                  Städte-Übersicht (Ruhrgebiet)
referenzen/                     Projektgalerie
ueber-uns/                      Über das Unternehmen
kontakt/                        Kontaktformular + Adresse
impressum/, datenschutz/        Pflichtseiten
assets/style.css, assets/main.js  geteiltes CSS/JS
assets/fonts/                   selbst gehostete Schrift (Archivo, SIL OFL, Lizenz liegt bei)
images/bestand/                 vorhandene echte Fotos + Logo
images/README.md                Liste noch fehlender Fotos
PRODUCT.md, DESIGN.md           Produktwahrheit und Gestaltungssystem (Systemblatt), Grundlage für alle weiteren Änderungen
```

## Deployment (GitHub Pages, kostenfrei)
1. Repo ist unter `daiworld450/zeca-alu-de` auf GitHub (public, damit Pages kostenfrei läuft).
2. GitHub → Repo → Settings → Pages → Source: „Deploy from branch", Branch `main`, Ordner `/ (root)`.
3. Custom Domain: `zeca-alu.de` ist bereits in der Datei `CNAME` hinterlegt. Im Pages-Menü unter
   „Custom domain" denselben Wert eintragen und „Enforce HTTPS" aktivieren (dauert nach DNS-Umstellung
   etwas, bis das Zertifikat ausgestellt ist).
4. DNS beim aktuellen Registrar/Provider von zeca-alu.de umstellen:
   - Apex-Domain (`zeca-alu.de`) als **A-Records** auf die vier GitHub-Pages-IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www.zeca-alu.de` als **CNAME** auf `daiworld450.github.io`
   - Erst danach den bisherigen Wix-Hosting-Eintrag entfernen, sonst ist die alte Seite
     währenddessen nicht mehr erreichbar, ohne dass die neue schon läuft.

## Vor dem Livegang noch zu erledigen
1. **Kontaktformular aktivieren**: Beim ersten echten Absenden schickt FormSubmit eine
   Aktivierungs-Mail an `info@zeca-alu.de` – den Link „Activate Form" darin anklicken,
   sonst kommen keine Anfragen an (Postfach ggf. auch Spam-Ordner prüfen).
2. **Fehlende Fotos**: siehe `images/README.md` – ersetzt die grauen Platzhalterkacheln.
3. **Google Business Profile** für ZeCa-Alu anlegen/prüfen und mit der neuen Seite verlinken –
   für lokale Suchergebnisse im Ruhrgebiet mindestens so wichtig wie die Website selbst.
4. Nach dem Live-Schalten: Google Search Console + Sitemap (`/sitemap.xml`) einreichen.

## Warum diese Architektur
Statt einer Landingpage pro Stadt × Leistung (wie es Wettbewerber wie aludach21.de/
montage21.de machen) gibt es sechs inhaltlich ausgearbeitete Leistungsseiten plus eine
gemeinsame Einsatzgebiet-Seite für alle Städte. Grund: ZeCa-Alu ist ein junger Betrieb
mit noch wenig Referenzmaterial – dutzende dünne Stadt-Seiten ohne echten, einzigartigen
Inhalt wären das Gegenteil von guter SEO. Referenzen werden pro Stadt ergänzt, sobald
dort echte Projekte abgeschlossen sind (siehe `/referenzen/`).
