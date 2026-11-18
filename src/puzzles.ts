export interface Puzzle {
  id: number;
  title: string;
  question: string;
  hints: string[];
  // Akzeptierte Antworten (case-insensitive und getrimmt geprüft)
  answers: string[];
  successMessage: string;
}

export const PUZZLES: Puzzle[] = [
  {
    id: 1,
    title: "Hinweis 1: Der Anfang",
    question: "In welchem Jahr haben wir uns eigentlich kennengelernt (oder ein legendäres Event gestartet)? (Tipp: 4 Ziffern)",
    hints: [
      "Denk an die alte Wohnung / den Sommer...",
      "Es war kurz vor oder nach der großen Party."
    ],
    answers: ["2018", "2019", "2020"], // Hier kannst du das echte Jahr eintragen
    answers: ["2021"], // Beispiel
    successMessage: "Richtig! Das war der Startschuss für viele gemeinsame Abenteuer."
  },
  {
    id: 2,
    title: "Hinweis 2: Der Treffpunkt",
    question: "Wie hieß noch gleich das Café oder die Bar, in der wir Stammgäste waren?",
    hints: [
      "Es liegt an der Ecke...",
      "Der Barkeeper hieß Alex / Es gab exzellenten Kaffee."
    ],
    answers: ["central perk", "barcelona", "eckkneipe", "kiosk"], // Passe das an deinen Freund an
    successMessage: "Genau dort! Legendäre Abende."
  },
  {
    id: 3,
    title: "Hinweis 3: Das finale Geheimnis",
    question: "Was ist das ultimative Lösungswort oder das Geschenk, das auf dich wartet?",
    hints: [
      "Schau in deinen Rucksack / unter die Fußmatte / frag den Schenkenden.",
      "Es fängt mit G an..."
    ],
    answers: ["geschenk", "gutschein", "party", "bier"], // Passe das an
    successMessage: "Fall gelöst! Alles Gute zum Geburtstag!"
  }
];
