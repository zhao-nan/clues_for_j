# Clues by Sam – 4×5 Grid Birthday Edition 🕵️‍♂️🔍

Eine personalisierte Web-App im exakten Stil von *Clues by Sam* (cluesbysam.com) für den Geburtstag deines Freundes!

---

## 🕹️ Spielprinzip & "Not enough evidence!"-Mechanik
- Es gibt ein **4×5-Grid** (Spalten A–D, Reihen 1–5) mit 20 Verdächtigen und ihren Hinweisen.
- **Jede Karte ist anklickbar**, sodass du jederzeit deinen Verdacht äußern kannst.
- Wenn du jedoch versuchst, eine Person zu früh in der Kette oder falsch zuzuordnen, zeigt das Spiel unabhängig vom Grund diskret:
  > **`⚠️ Not enough evidence!`**
- Erst wenn deine Logik und der Kettenschritt exakt übereinstimmen, rastet die Karte mit einem grünen oder roten Status ein und bringt dich im Rätsel voran!
- Am Ende gewinnst du, wenn alle 20 Personen fehlerfrei zugeordnet wurden.

---

## 🛠️ Anpassung für deinen Freund

Öffne `script.js` und passe das Array `GRID_DATA` an:
- `id`: Position im Raster (z. B. `'A1'`, `'B2'`, bis `'D5'`).
- `name`: Name deines Freundes, von Freunden oder Insidern.
- `job`: Beruf oder Rolle (z. B. `'coder'`, `'judge'`, `'gamer'`).
- `role`: Entweder `'innocent'` oder `'criminal'`.
- `clue`: Der Hinweis, den die Person gibt (z. B. ein Insiderwitz oder Rätselhinweis).
- `avatar`: Emoji für die Person.

---

## 🚀 Wie spielst du es?

1. Öffne die `index.html` direkt per Doppelklick in deinem Browser.
2. Lade den Ordner auf kostenlosen Hosting-Diensten wie **Netlify Drop** (einfach Ordner hineinziehen) hoch, um den Link ganz einfach mit deinem Freund zu teilen!
