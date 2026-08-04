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

  basic_technology: {
    flashcards: [
      { term: "Technology", definition: "The application of scientific knowledge to solve practical, everyday problems." },
      { term: "Tool", definition: "A device used to carry out a specific task, e.g. a hammer for driving nails." },
      { term: "Safety Precaution", definition: "An action taken in advance to prevent accidents or injury while working." },
      { term: "Conductor", definition: "A material that allows electricity or heat to pass through it easily, e.g. copper." },
      { term: "Insulator", definition: "A material that does not allow electricity or heat to pass through easily, e.g. rubber." },
    ],
    formulas: [],
    notes: [
      { topic: "Workshop Safety", summary: "Always wear appropriate protective gear (goggles, gloves, apron) before using tools. Keep the work area tidy, know where tools belong, and never rush — most workshop accidents happen from carelessness, not from the tools themselves." },
    ],
  },

  social_studies: {
    flashcards: [
      { term: "Culture", definition: "The customs, beliefs, values, and way of life shared by a group of people." },
      { term: "Community", definition: "A group of people living in the same area or sharing common interests." },
      { term: "Peer Pressure", definition: "The influence exerted by people of similar age or status to behave in a certain way." },
      { term: "Population", definition: "The total number of people living in a particular area." },
      { term: "Drug Abuse", definition: "The harmful or excessive use of drugs, often without medical justification." },
    ],
    formulas: [],
    notes: [
      { topic: "Good Study Habits", summary: "Making a realistic timetable, studying in a quiet space, taking short breaks, and reviewing notes regularly all help retention far more than last-minute cramming. Group discussion can also help clarify difficult topics." },
    ],
  },

  civic_education: {
    flashcards: [
      { term: "Citizen", definition: "A legally recognised member of a country or state, with rights and responsibilities." },
      { term: "Democracy", definition: "A system of government where power belongs to the people, directly or through elected representatives." },
      { term: "Rights", definition: "Entitlements or freedoms that belong to every citizen, protected by law." },
      { term: "Duty", definition: "A responsibility or obligation a citizen is expected to fulfil, e.g. obeying the law." },
    ],
    formulas: [],
    notes: [
      { topic: "Rights and Duties Go Together", summary: "Every right a citizen enjoys comes with a matching responsibility. For example, the right to a clean environment comes with a duty not to litter. A functioning society depends on citizens exercising both, not just claiming rights." },
    ],
  },
};
