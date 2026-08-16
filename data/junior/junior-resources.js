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
      { term: "Ratio", definition: "A way of comparing two or more quantities, e.g. 2:3 means for every 2 of one thing there are 3 of another." },
      { term: "Integer", definition: "A whole number that can be positive, negative, or zero — no fractions or decimals." },
      { term: "Fraction", definition: "A part of a whole, written as one number (numerator) over another (denominator), e.g. ¾." },
      { term: "Angle", definition: "The amount of turn between two lines that meet at a point, measured in degrees." },
      { term: "Decimal", definition: "A number written using a decimal point to show parts of a whole, e.g. 0.5 means half." },
    ],
    formulas: [
      { title: "Area of a Rectangle", formula: "A = length × width", note: "Basic area formula." },
      { title: "Area of a Triangle", formula: "A = ½ × base × height", note: "Half of base times height." },
      { title: "Perimeter of a Rectangle", formula: "P = 2(length + width)", note: "Add all four sides." },
      { title: "Area of a Square", formula: "A = side × side", note: "All four sides are equal, so just square one side." },
      { title: "Volume of a Cuboid", formula: "V = length × width × height", note: "Space taken up by a box-shaped object." },
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
      { term: "Antonym", definition: "A word that means the opposite of another word." },
      { term: "Pronoun", definition: "A word used in place of a noun, e.g. he, she, it, they." },
      { term: "Preposition", definition: "A word that shows the relationship between a noun/pronoun and other words, e.g. in, on, under, between." },
      { term: "Conjunction", definition: "A word that joins words, phrases, or clauses together, e.g. and, but, because." },
      { term: "Tense", definition: "The form of a verb that shows when an action happens — past, present, or future." },
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
      { term: "Energy", definition: "The ability to do work — exists in forms like heat, light, sound, and electrical energy." },
      { term: "Habitat", definition: "The natural home or environment where a living thing normally lives." },
      { term: "Photosynthesis", definition: "The process by which green plants make their own food using sunlight, water, and carbon dioxide." },
      { term: "Ecosystem", definition: "A community of living things interacting with each other and their non-living environment." },
      { term: "Nutrition", definition: "The process by which living things take in and use food for growth, energy, and repair." },
      { term: "Reproduction", definition: "The process by which living things produce offspring of their own kind." },
    ],
    formulas: [],
    notes: [
      { topic: "States of Matter", summary: "Matter exists in three common states: solid (fixed shape and volume), liquid (fixed volume, takes shape of container), and gas (no fixed shape or volume, fills its container). Heating or cooling can change matter from one state to another." },
      { topic: "Forms of Energy", summary: "Energy shows up in several forms — heat, light, sound, chemical, and electrical — and can change from one form to another (e.g. electrical energy to light energy in a bulb), but it's never created or destroyed, only transformed." },
    ],
  },

  basic_technology: {
    flashcards: [
      { term: "Technology", definition: "The application of scientific knowledge to solve practical, everyday problems." },
      { term: "Tool", definition: "A device used to carry out a specific task, e.g. a hammer for driving nails." },
      { term: "Safety Precaution", definition: "An action taken in advance to prevent accidents or injury while working." },
      { term: "Conductor", definition: "A material that allows electricity or heat to pass through it easily, e.g. copper." },
      { term: "Insulator", definition: "A material that does not allow electricity or heat to pass through easily, e.g. rubber." },
      { term: "Simple Machine", definition: "A basic mechanical device that makes work easier by changing the size or direction of a force, e.g. a lever or pulley." },
      { term: "Machine", definition: "A device that uses energy to perform a task, often making work faster or easier than doing it by hand." },
      { term: "Drawing Instrument", definition: "A tool used to make accurate technical drawings, e.g. a T-square, set square, or compass." },
    ],
    formulas: [],
    notes: [
      { topic: "Workshop Safety", summary: "Always wear appropriate protective gear (goggles, gloves, apron) before using tools. Keep the work area tidy, know where tools belong, and never rush — most workshop accidents happen from carelessness, not from the tools themselves." },
      { topic: "Types of Simple Machines", summary: "The six classic simple machines are the lever, wheel and axle, pulley, inclined plane, wedge, and screw. Each one makes a task easier by trading off force for distance — you push with less force, but over a longer distance." },
    ],
  },

  social_studies: {
    flashcards: [
      { term: "Culture", definition: "The customs, beliefs, values, and way of life shared by a group of people." },
      { term: "Community", definition: "A group of people living in the same area or sharing common interests." },
      { term: "Peer Pressure", definition: "The influence exerted by people of similar age or status to behave in a certain way." },
      { term: "Population", definition: "The total number of people living in a particular area." },
      { term: "Drug Abuse", definition: "The harmful or excessive use of drugs, often without medical justification." },
      { term: "Family", definition: "A basic social unit of people related by blood, marriage, or adoption, usually living together." },
      { term: "Cooperation", definition: "Working together with others towards a shared goal." },
      { term: "Environment", definition: "The surroundings in which a person, animal, or plant lives, including both living and non-living things." },
      { term: "Resource", definition: "Anything that can be used to meet a need, e.g. natural resources like water, land, and minerals." },
    ],
    formulas: [],
    notes: [
      { topic: "Good Study Habits", summary: "Making a realistic timetable, studying in a quiet space, taking short breaks, and reviewing notes regularly all help retention far more than last-minute cramming. Group discussion can also help clarify difficult topics." },
      { topic: "Resisting Peer Pressure", summary: "Peer pressure isn't always negative, but when friends push you toward something harmful, it helps to have a clear reason to say no, choose friends who respect your decisions, and remember that a real friend won't force you to do something against your values." },
    ],
  },

  civic_education: {
    flashcards: [
      { term: "Citizen", definition: "A legally recognised member of a country or state, with rights and responsibilities." },
      { term: "Democracy", definition: "A system of government where power belongs to the people, directly or through elected representatives." },
      { term: "Rights", definition: "Entitlements or freedoms that belong to every citizen, protected by law." },
      { term: "Duty", definition: "A responsibility or obligation a citizen is expected to fulfil, e.g. obeying the law." },
      { term: "Constitution", definition: "The written set of fundamental laws and principles that establish how a country is governed." },
      { term: "Government", definition: "The group of people and institutions with the authority to govern a country or region." },
      { term: "Leadership", definition: "The ability to guide, influence, or direct a group of people towards a common goal." },
      { term: "Tolerance", definition: "The willingness to accept or respect beliefs, opinions, or practices that differ from your own." },
      { term: "Election", definition: "The formal process by which citizens choose their leaders or representatives by voting." },
    ],
    formulas: [],
    notes: [
      { topic: "Rights and Duties Go Together", summary: "Every right a citizen enjoys comes with a matching responsibility. For example, the right to a clean environment comes with a duty not to litter. A functioning society depends on citizens exercising both, not just claiming rights." },
      { topic: "Qualities of a Good Leader", summary: "A good leader is honest, listens to others, is fair in decision-making, and puts the interest of the group above personal gain. Leadership isn't about having power — it's about using it responsibly to serve others." },
    ],
  },
};
