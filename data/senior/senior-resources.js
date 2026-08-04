/* ═══════════════════════════════════════════════════════════════
   HOLIDAY HUB — Senior Secondary Study Library (Seed v1)
   Non-past-question study resources: Flashcards, Formula Sheets,
   Concept Notes. Works fully offline — no AI dependency.

   This is a STARTER set covering the highest-traffic subjects.
   Structure is per-subject so adding more later (or more content
   to an existing subject) is a drop-in, no app logic changes needed.
═══════════════════════════════════════════════════════════════ */

const SENIOR_RESOURCES = {

  mathematics: {
    flashcards: [
      { term: "Mean", definition: "The average of a set of numbers — add them all up, divide by how many there are." },
      { term: "Median", definition: "The middle value when numbers are arranged in order. If there's an even count, average the two middle values." },
      { term: "Mode", definition: "The value that appears most often in a data set." },
      { term: "Simultaneous Equations", definition: "Two or more equations solved together to find values that satisfy all of them at once." },
      { term: "Quadratic Equation", definition: "An equation where the highest power of the variable is 2, e.g. ax² + bx + c = 0." },
      { term: "Pythagoras' Theorem", definition: "In a right-angled triangle: a² + b² = c², where c is the hypotenuse (the longest side)." },
      { term: "Standard Form", definition: "A way of writing very large or small numbers as A × 10ⁿ, where 1 ≤ A < 10." },
      { term: "Bearing", definition: "A direction measured clockwise from North, always given as three digits (e.g. 045°)." },
      { term: "Probability", definition: "A measure of how likely an event is, from 0 (impossible) to 1 (certain)." },
      { term: "Locus", definition: "The set of all points that satisfy a particular condition, often forming a line, circle, or curve." },
      { term: "Congruent", definition: "Two shapes are congruent if they are exactly the same size and shape." },
      { term: "Similar Shapes", definition: "Shapes with the same shape but different size — corresponding angles are equal, sides are in proportion." },
    ],
    formulas: [
      { title: "Area of a Circle", formula: "A = πr²", note: "r = radius. Use π ≈ 22/7 or 3.14." },
      { title: "Circumference of a Circle", formula: "C = 2πr", note: "Distance around the circle." },
      { title: "Area of a Triangle", formula: "A = ½ × base × height", note: "Or A = ½ab·sin(C) if you know two sides and the included angle." },
      { title: "Quadratic Formula", formula: "x = [-b ± √(b² - 4ac)] / 2a", note: "For solving ax² + bx + c = 0." },
      { title: "Simple Interest", formula: "I = PRT / 100", note: "P = principal, R = rate (%), T = time (years)." },
      { title: "Compound Interest", formula: "A = P(1 + R/100)ⁿ", note: "n = number of periods." },
      { title: "Volume of a Cylinder", formula: "V = πr²h", note: "r = radius, h = height." },
      { title: "Sum of Angles in a Polygon", formula: "(n - 2) × 180°", note: "n = number of sides." },
      { title: "Distance Formula", formula: "d = √[(x₂-x₁)² + (y₂-y₁)²]", note: "Distance between two points on a graph." },
      { title: "Gradient of a Line", formula: "m = (y₂-y₁) / (x₂-x₁)", note: "Slope between two points." },
    ],
    notes: [],
  },

  english: {
    flashcards: [
      { term: "Simile", definition: "A comparison using 'like' or 'as' — e.g. 'as brave as a lion'." },
      { term: "Metaphor", definition: "A direct comparison without 'like' or 'as' — e.g. 'time is money'." },
      { term: "Personification", definition: "Giving human qualities to non-human things — e.g. 'the wind whispered'." },
      { term: "Alliteration", definition: "Repetition of the same starting consonant sound in nearby words — e.g. 'wild and windy'." },
      { term: "Synonym", definition: "A word that means the same, or nearly the same, as another word." },
      { term: "Antonym", definition: "A word that means the opposite of another word." },
      { term: "Idiom", definition: "A phrase whose meaning isn't obvious from the individual words — e.g. 'break a leg' meaning good luck." },
      { term: "Homophone", definition: "Words that sound the same but have different meanings and spellings — e.g. 'there', 'their', 'they're'." },
      { term: "Register", definition: "The level of formality in language, adjusted to suit the audience or situation." },
      { term: "Denotation vs Connotation", definition: "Denotation is a word's literal meaning; connotation is the feeling or idea it suggests beyond that." },
    ],
    formulas: [],
    notes: [
      { topic: "Essay Structure", summary: "A strong essay has an introduction (states your position), body paragraphs (one main idea each, backed with examples), and a conclusion (sums up without introducing new points). Each paragraph should link back to the essay question." },
      { topic: "Formal vs Informal Letters", summary: "Formal letters (to an organisation, official) use a respectful register, clear structure, and no contractions. Informal letters (to a friend/relative) can be conversational, warmer in tone, and more flexible in structure." },
      { topic: "Comprehension Strategy", summary: "Read the passage once for overall meaning, then read the questions before re-reading. Answer using your own words where possible — lifting sentences directly usually loses marks. Always refer back to the text to justify your answer." },
    ],
  },

  biology: {
    flashcards: [
      { term: "Photosynthesis", definition: "The process by which green plants make food using sunlight, water, and carbon dioxide, releasing oxygen." },
      { term: "Respiration", definition: "The process of breaking down food to release energy, using oxygen and producing carbon dioxide." },
      { term: "Osmosis", definition: "The movement of water molecules from a region of high concentration to low concentration through a semi-permeable membrane." },
      { term: "Diffusion", definition: "The movement of particles from an area of high concentration to low concentration, without using energy." },
      { term: "Homeostasis", definition: "The maintenance of a stable internal environment in the body despite external changes." },
      { term: "Ecosystem", definition: "A community of living organisms interacting with each other and their physical environment." },
      { term: "Genotype", definition: "The genetic makeup of an organism — the actual genes it carries." },
      { term: "Phenotype", definition: "The observable physical characteristics of an organism, resulting from genotype and environment." },
      { term: "Mitosis", definition: "Cell division that produces two genetically identical daughter cells, used for growth and repair." },
      { term: "Meiosis", definition: "Cell division that produces four genetically different gametes (sex cells), each with half the chromosome number." },
      { term: "Enzyme", definition: "A biological catalyst — a protein that speeds up chemical reactions in living things without being used up." },
      { term: "Chlorophyll", definition: "The green pigment in plants that absorbs light energy for photosynthesis." },
    ],
    formulas: [],
    notes: [
      { topic: "The Cell as the Basic Unit of Life", summary: "All living things are made of cells. Plant cells have a cell wall, chloroplasts, and a large vacuole that animal cells lack. Both have a nucleus, cytoplasm, and cell membrane. Understanding these differences is a common exam focus." },
      { topic: "Nutrient Cycles", summary: "Nutrients like carbon and nitrogen cycle through ecosystems — plants absorb them, animals eat plants, decomposers break down waste and remains, returning nutrients to the soil/air for reuse. Nothing is created or destroyed, only recycled." },
    ],
  },

  chemistry: {
    flashcards: [
      { term: "Atom", definition: "The smallest unit of an element that still has the properties of that element." },
      { term: "Molecule", definition: "Two or more atoms chemically bonded together." },
      { term: "Ion", definition: "An atom or molecule with an electric charge, caused by losing or gaining electrons." },
      { term: "Catalyst", definition: "A substance that speeds up a chemical reaction without being used up itself." },
      { term: "Oxidation", definition: "A reaction where a substance loses electrons (or gains oxygen)." },
      { term: "Reduction", definition: "A reaction where a substance gains electrons (or loses oxygen)." },
      { term: "Mole", definition: "A unit for counting particles — one mole contains 6.02 × 10²³ particles (Avogadro's number)." },
      { term: "pH Scale", definition: "A scale from 0-14 measuring acidity/alkalinity. 7 is neutral, below 7 is acidic, above 7 is alkaline." },
      { term: "Isotopes", definition: "Atoms of the same element with the same number of protons but different numbers of neutrons." },
      { term: "Covalent Bond", definition: "A chemical bond formed when atoms share electrons." },
    ],
    formulas: [
      { title: "Moles", formula: "moles = mass ÷ molar mass", note: "Molar mass is in g/mol." },
      { title: "Concentration", formula: "concentration = moles ÷ volume (dm³)", note: "Gives concentration in mol/dm³." },
      { title: "Percentage Yield", formula: "(actual yield ÷ theoretical yield) × 100", note: "Measures reaction efficiency." },
      { title: "Relative Atomic Mass", formula: "Sum of (isotope mass × abundance %) ÷ 100", note: "Weighted average of isotope masses." },
    ],
    notes: [
      { topic: "Balancing Chemical Equations", summary: "The number of atoms of each element must be equal on both sides of the equation, since matter can't be created or destroyed. Adjust the numbers in front of formulas (coefficients) — never change the small numbers within a formula." },
    ],
  },

  physics: {
    flashcards: [
      { term: "Velocity", definition: "The rate of change of displacement — speed in a given direction." },
      { term: "Acceleration", definition: "The rate of change of velocity over time." },
      { term: "Force", definition: "A push or pull that can change an object's motion, measured in Newtons (N)." },
      { term: "Momentum", definition: "The product of an object's mass and velocity — a measure of how hard it is to stop something moving." },
      { term: "Density", definition: "Mass per unit volume of a substance." },
      { term: "Work Done", definition: "The energy transferred when a force moves an object — Work = Force × Distance." },
      { term: "Power", definition: "The rate at which work is done, or energy is transferred, measured in Watts." },
      { term: "Ohm's Law", definition: "Voltage equals current multiplied by resistance: V = IR." },
      { term: "Wavelength", definition: "The distance between two consecutive identical points on a wave (e.g. crest to crest)." },
      { term: "Refraction", definition: "The bending of light as it passes from one medium to another due to a change in speed." },
    ],
    formulas: [
      { title: "Speed", formula: "speed = distance ÷ time", note: "Measured in m/s." },
      { title: "Newton's Second Law", formula: "F = ma", note: "Force = mass × acceleration." },
      { title: "Density", formula: "ρ = mass ÷ volume", note: "Measured in kg/m³ or g/cm³." },
      { title: "Ohm's Law", formula: "V = IR", note: "Voltage = Current × Resistance." },
      { title: "Work Done", formula: "W = F × d", note: "Force in Newtons, distance in metres, gives Joules." },
      { title: "Kinetic Energy", formula: "KE = ½mv²", note: "m = mass, v = velocity." },
      { title: "Power", formula: "P = W ÷ t", note: "Work done divided by time taken." },
    ],
    notes: [],
  },

  economics: {
    flashcards: [
      { term: "Scarcity", definition: "The basic economic problem — limited resources cannot satisfy unlimited human wants." },
      { term: "Opportunity Cost", definition: "The value of the next best alternative given up when a choice is made." },
      { term: "Demand", definition: "The quantity of a good or service consumers are willing and able to buy at a given price." },
      { term: "Supply", definition: "The quantity of a good or service producers are willing and able to sell at a given price." },
      { term: "Inflation", definition: "A general, sustained rise in the price level of goods and services over time." },
      { term: "GDP", definition: "Gross Domestic Product — the total value of goods and services produced within a country in a given period." },
      { term: "Monopoly", definition: "A market structure where a single seller controls the entire supply of a good or service." },
      { term: "Fiscal Policy", definition: "Government use of taxation and spending to influence the economy." },
      { term: "Monetary Policy", definition: "Central bank actions (like adjusting interest rates) to control money supply and stabilise the economy." },
      { term: "Elasticity of Demand", definition: "How much the quantity demanded changes in response to a change in price." },
    ],
    formulas: [
      { title: "Price Elasticity of Demand", formula: "%Δ quantity demanded ÷ %Δ price", note: "If result > 1, demand is elastic; if < 1, inelastic." },
      { title: "GDP (Expenditure Approach)", formula: "C + I + G + (X - M)", note: "Consumption + Investment + Government spending + Net exports." },
    ],
    notes: [
      { topic: "Demand and Supply Equilibrium", summary: "Market equilibrium is where the quantity demanded equals the quantity supplied — the price at which buyers and sellers agree. If price is above equilibrium, there's a surplus; below it, a shortage. Prices tend to move toward equilibrium naturally." },
    ],
  },

  government: {
    flashcards: [
      { term: "Democracy", definition: "A system of government where power belongs to the people, exercised directly or through elected representatives." },
      { term: "Federalism", definition: "A system where power is shared between a central government and regional/state governments." },
      { term: "Separation of Powers", definition: "Dividing government into distinct branches (executive, legislature, judiciary) to prevent any one holding too much power." },
      { term: "Sovereignty", definition: "The supreme authority of a state to govern itself without external interference." },
      { term: "Constitution", definition: "The fundamental set of rules and principles that govern how a state is organised and operates." },
      { term: "Bicameral Legislature", definition: "A law-making body made up of two chambers — e.g. Senate and House of Representatives." },
      { term: "Rule of Law", definition: "The principle that everyone, including those in power, is subject to and accountable under the law." },
      { term: "Pressure Group", definition: "An organised group that seeks to influence government policy without seeking to win political power directly." },
    ],
    formulas: [],
    notes: [
      { topic: "Arms of Government", summary: "The Executive implements laws (President/Governor and cabinet), the Legislature makes laws (National/State Assembly), and the Judiciary interprets laws and settles disputes (courts). This separation is meant to check and balance power." },
      { topic: "Federal vs Unitary Government", summary: "In a federal system (like Nigeria), power is constitutionally divided between central and state governments, each with defined areas of authority. In a unitary system, power is concentrated at the centre, with local units only having delegated authority." },
    ],
  },

  civic_education: {
    flashcards: [
      { term: "Citizenship", definition: "The status of being a legally recognised member of a state, with associated rights and duties." },
      { term: "Human Rights", definition: "Basic rights and freedoms that belong to every person, regardless of nationality or status." },
      { term: "Corruption", definition: "The abuse of entrusted power for private gain." },
      { term: "National Values", definition: "Shared beliefs and principles that guide the conduct of citizens within a nation, e.g. honesty, patriotism." },
    ],
    formulas: [],
    notes: [
      { topic: "Rights and Duties of a Citizen", summary: "Citizens have rights (e.g. right to life, freedom of expression) but also duties (e.g. obeying the law, paying taxes, respecting others' rights). A functioning society depends on citizens exercising both responsibly." },
    ],
  },

  crs: {
    flashcards: [
      { term: "Covenant", definition: "A binding agreement or promise, often between God and His people, found throughout the Bible." },
      { term: "Parable", definition: "A short story used to illustrate a moral or spiritual lesson, as Jesus often used in His teaching." },
      { term: "Prophet", definition: "A person who speaks on behalf of God, often delivering messages of guidance, warning, or hope." },
      { term: "Redemption", definition: "The act of being saved or delivered, especially from sin, often through sacrifice." },
    ],
    formulas: [],
    notes: [],
  },

  geography: {
    flashcards: [
      { term: "Erosion", definition: "The gradual wearing away of land by natural forces like water, wind, or ice." },
      { term: "Climate", definition: "The average weather conditions in a region over a long period of time." },
      { term: "Urbanisation", definition: "The increasing proportion of people living in towns and cities rather than rural areas." },
      { term: "Latitude", definition: "Imaginary horizontal lines around the Earth measuring distance north or south of the Equator." },
      { term: "Longitude", definition: "Imaginary vertical lines running from pole to pole, measuring distance east or west of the Prime Meridian." },
    ],
    formulas: [],
    notes: [],
  },

  literature: { flashcards: [], formulas: [], notes: [] },
  accounting: { flashcards: [], formulas: [], notes: [] },
  commerce: { flashcards: [], formulas: [], notes: [] },
  marketing: { flashcards: [], formulas: [], notes: [] },
  animal_husbandry: { flashcards: [], formulas: [], notes: [] },
};
