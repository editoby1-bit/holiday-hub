/* ═══════════════════════════════════════════════════════════════
   HOLIDAY HUB — Junior Secondary Study Library (Seed v1)
   Non-past-question study resources: Flashcards, Formula Sheets,
   Concept Notes. Works fully offline.
═══════════════════════════════════════════════════════════════ */

const JUNIOR_RESOURCES = {

  mathematics: {
    flashcards: [
      { term: "Prime Number", definition: "A number greater than 1 that has only two factors: 1 and itself." },
      { term: "Factor", definition: "A number that divides exactly into another number with no remainder." },
      { term: "Multiple", definition: "The result of multiplying a number by an integer — e.g. multiples of 4 are 4, 8, 12..." },
      { term: "LCM", definition: "Lowest Common Multiple — the smallest number that is a multiple of two or more numbers." },
      { term: "HCF", definition: "Highest Common Factor — the largest number that divides exactly into two or more numbers." },
      { term: "Percentage", definition: "A way of expressing a number as a fraction of 100." },
      { term: "Perimeter", definition: "The total distance around the outside of a shape." },
    ],
    formulas: [
      { title: "Area of a Rectangle", formula: "A = length × width", note: "Basic area formula." },
      { title: "Area of a Triangle", formula: "A = ½ × base × height", note: "Half of base times height." },
      { title: "Perimeter of a Rectangle", formula: "P = 2(length + width)", note: "Add all four sides." },
    ],
    notes: [],
  },

  english: {
    flashcards: [
      { term: "Noun", definition: "A word that names a person, place, thing, or idea." },
      { term: "Verb", definition: "A word that expresses an action or a state of being." },
      { term: "Adjective", definition: "A word that describes or gives more information about a noun." },
      { term: "Adverb", definition: "A word that describes a verb, adjective, or another adverb — often ends in -ly." },
      { term: "Synonym", definition: "A word that means the same, or nearly the same, as another word." },
    ],
    formulas: [],
    notes: [
      { topic: "Parts of Speech", summary: "Every word in a sentence plays a role: nouns name things, verbs show action, adjectives describe nouns, and adverbs describe verbs. Knowing these helps you build correct, varied sentences." },
    ],
  },

  basic_science: {
    flashcards: [
      { term: "Living Thing", definition: "Something that can grow, reproduce, respond to its environment, and needs energy to survive." },
      { term: "Matter", definition: "Anything that has mass and takes up space — exists as solid, liquid, or gas." },
      { term: "Force", definition: "A push or pull that can change how an object moves." },
    ],
    formulas: [],
    notes: [
      { topic: "States of Matter", summary: "Matter exists in three common states: solid (fixed shape and volume), liquid (fixed volume, takes shape of container), and gas (no fixed shape or volume, fills its container). Heating or cooling can change matter from one state to another." },
    ],
  },

  basic_technology: { flashcards: [], formulas: [], notes: [] },
  social_studies: { flashcards: [], formulas: [], notes: [] },
  civic_education: { flashcards: [], formulas: [], notes: [] },
};
