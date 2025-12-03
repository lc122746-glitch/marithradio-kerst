# MarithRadio Kerst — Platform (Nederlands)

Een eenvoudige statische web-app voor MarithRadio Kerst met playlist, toegankelijke controls en sneeuwanimatie.

## Bestanden
- index.html
- styles.css
- script.js
- server.js (optioneel, voor lokaal draaien)
- package.json
- assets/
  - images/
    - santa.svg
    - play.svg
    - pause.svg
  - music/
    - (de player gebruikt externe voorbeeld-MP3s — voeg je eigen mp3's toe in assets/music/ als je wilt)

## Lokaal draaien (zonder Node)
1. Plaats alle bestanden in een map en maak de `assets/` map met submappen `images` en `music`.
2. Open `index.html` direct in je browser (dubbelklik). Let op: sommige browsers blokkeren autoplay — klik dan op de play-knop.

## Lokaal draaien (met Node, aanbevolen voor testen)
1. Installeer Node.js (v14+).
2. Open de projectmap in een terminal.
3. Voer uit:
   npm install
4. Start de server:
   npm start
5. Open http://localhost:3000

## Deploy opties
- GitHub Pages: push de repo naar GitHub en zet GitHub Pages aan in de repo-instellingen (branch: main).
- Netlify / Vercel: verbind je Git-repo en deploy.

## Tips
- Vervang de bestanden in assets/images/ en assets/music/ met jouw eigen afbeeldingen en mp3's.
- Als je een echte live stream hebt (shoutcast/icecast/stream URL), vervang dan de playlist src door die stream-URL.

License: MIT
