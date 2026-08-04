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

  literature: {
    flashcards: [
      { term: "Protagonist", definition: "The main character in a story, around whom the plot centres." },
      { term: "Antagonist", definition: "The character or force that opposes the protagonist, creating conflict." },
      { term: "Plot", definition: "The sequence of events that make up a story, usually including a conflict and resolution." },
      { term: "Theme", definition: "The central idea, message, or underlying meaning explored in a literary work." },
      { term: "Setting", definition: "The time and place in which a story's events occur." },
      { term: "Tone", definition: "The author's attitude toward the subject or audience, conveyed through word choice and style." },
      { term: "Irony", definition: "A contrast between what is expected and what actually happens, or between what is said and what is meant." },
      { term: "Soliloquy", definition: "A speech in a play where a character speaks their thoughts aloud, alone on stage, revealing inner feelings to the audience." },
      { term: "Foreshadowing", definition: "A hint or clue about events that will happen later in the story." },
      { term: "Stanza", definition: "A grouped set of lines in a poem, similar to a paragraph in prose." },
    ],
    formulas: [],
    notes: [
      { topic: "Analysing a Poem", summary: "Look at what the poem is literally saying first, then consider its structure (stanzas, rhyme, rhythm), the poetic devices used (simile, metaphor, imagery), and finally what feeling or message the poet is building toward. Always support points with direct reference to the text." },
      { topic: "Analysing a Prose Text", summary: "Focus on character development, plot structure, setting, and theme. Ask: what does the author want the reader to feel or understand? Pay attention to how the writer builds tension or resolves conflict — these are common essay-question angles." },
      { topic: "Approaching Drama", summary: "Beyond plot, drama exam questions often focus on character motivation, stage directions, dialogue, and how conflict drives the action. Soliloquies and asides are frequently examined for what they reveal that other characters don't know." },
    ],
  },

  accounting: {
    flashcards: [
      { term: "Asset", definition: "Something owned by a business that has value, e.g. cash, equipment, or property." },
      { term: "Liability", definition: "Something a business owes to others, e.g. loans or unpaid bills." },
      { term: "Capital", definition: "The owner's investment in the business — assets minus liabilities." },
      { term: "Double Entry", definition: "The principle that every transaction affects at least two accounts, keeping the books balanced." },
      { term: "Debit", definition: "An entry on the left side of an account, increasing assets/expenses or decreasing liabilities/income." },
      { term: "Credit", definition: "An entry on the right side of an account, increasing liabilities/income or decreasing assets/expenses." },
      { term: "Trial Balance", definition: "A statement listing all account balances to check that total debits equal total credits." },
      { term: "Depreciation", definition: "The reduction in value of an asset over time due to wear, age, or obsolescence." },
      { term: "Ledger", definition: "A book or record containing all the accounts of a business." },
      { term: "Balance Sheet", definition: "A financial statement showing a business's assets, liabilities, and capital at a specific point in time." },
    ],
    formulas: [
      { title: "Accounting Equation", formula: "Assets = Liabilities + Capital", note: "The books must always balance around this." },
      { title: "Gross Profit", formula: "Sales − Cost of Goods Sold", note: "Profit before deducting expenses." },
      { title: "Net Profit", formula: "Gross Profit − Expenses", note: "The final profit figure after all costs." },
      { title: "Straight-Line Depreciation", formula: "(Cost − Residual Value) ÷ Useful Life", note: "Gives equal depreciation each year." },
    ],
    notes: [
      { topic: "The Accounting Cycle", summary: "Transactions are first recorded in a journal, then posted to ledger accounts, summarised in a trial balance, and finally used to prepare the financial statements (trading, profit & loss account, and balance sheet). Each step checks the accuracy of the one before it." },
    ],
  },

  commerce: {
    flashcards: [
      { term: "Trade", definition: "The buying and selling of goods and services between parties." },
      { term: "Home Trade", definition: "Trade that takes place within the boundaries of one country." },
      { term: "Foreign Trade", definition: "Trade between different countries, including import and export." },
      { term: "Wholesaler", definition: "A trader who buys goods in bulk from producers and sells in smaller quantities to retailers." },
      { term: "Retailer", definition: "A trader who buys from wholesalers or producers and sells directly to final consumers." },
      { term: "Insurance", definition: "A contract where one party pays a premium to be compensated for specified future losses." },
      { term: "Warehousing", definition: "The storage of goods before they are needed for sale or distribution." },
      { term: "E-commerce", definition: "The buying and selling of goods and services over the internet." },
    ],
    formulas: [],
    notes: [
      { topic: "Channels of Distribution", summary: "Goods typically move from producer to wholesaler to retailer to consumer, though some producers sell directly to retailers or consumers to cut costs. The right channel depends on the product, market size, and cost considerations." },
      { topic: "Aids to Trade", summary: "Trade depends on supporting services: transport (moving goods), insurance (covering risk), banking (financing transactions), warehousing (storage), and advertising (creating demand). These are often called 'aids to trade' in exams." },
    ],
  },

  marketing: {
    flashcards: [
      { term: "Marketing Mix", definition: "The combination of Product, Price, Place, and Promotion (the 4 Ps) used to market a product." },
      { term: "Market Segmentation", definition: "Dividing a market into distinct groups of buyers with similar needs or characteristics." },
      { term: "Branding", definition: "Creating a distinct name, symbol, or design that identifies and differentiates a product." },
      { term: "Target Market", definition: "The specific group of consumers a business aims its products and marketing efforts at." },
      { term: "Market Research", definition: "The systematic gathering of information about customers and markets to guide business decisions." },
      { term: "Product Life Cycle", definition: "The stages a product goes through: introduction, growth, maturity, and decline." },
    ],
    formulas: [],
    notes: [
      { topic: "The 4 Ps of Marketing", summary: "Product (what you're selling), Price (what it costs), Place (where/how it's sold), and Promotion (how customers hear about it) work together — a change in one usually requires adjusting the others to keep them consistent with the brand's positioning." },
    ],
  },

  animal_husbandry: {
    flashcards: [
      { term: "Animal Husbandry", definition: "The branch of agriculture concerned with the care, breeding, and management of farm animals." },
      { term: "Ruminant", definition: "An animal with a multi-chambered stomach that digests plant food by fermentation, e.g. cattle, goats, sheep." },
      { term: "Monogastric", definition: "An animal with a single-chambered stomach, e.g. pigs and poultry." },
      { term: "Colostrum", definition: "The first milk produced after birth, rich in antibodies important for a newborn animal's immunity." },
      { term: "Culling", definition: "The removal of unproductive or unhealthy animals from a herd or flock." },
      { term: "Vaccination", definition: "The administration of a vaccine to protect an animal against a specific disease." },
    ],
    formulas: [],
    notes: [
      { topic: "Housing Systems in Livestock", summary: "Housing protects animals from weather, predators, and disease while making feeding and management easier. Systems vary by animal type — e.g. deep litter and battery cage systems for poultry, paddocks or zero-grazing for cattle — each with different cost and disease-control tradeoffs." },
    ],
  },
};
