/* ═══════════════════════════════════════════════════════════════
   HOLIDAY HUB — Junior Secondary Question Bank (Seed v1)
   Covers: JSS1–JSS3 core subjects
   This is a STARTER set. The app's AI-complement layer fills gaps
   beyond what's here; strong AI-generated sets get reviewed and
   folded back into this file over time so the offline bank grows.
═══════════════════════════════════════════════════════════════ */

const JUNIOR_BANK = {

  mathematics: {
    objective: [
      { id:"jm001", level:"JSS2", question:"Simplify: 3(x + 2) − 2x", options:["x + 6","5x + 6","x + 2","5x + 2"], answer:0, explanation:"3(x+2) = 3x+6. 3x+6−2x = x+6." },
      { id:"jm002", level:"JSS1", question:"What is the place value of 7 in 372,145?", options:["7,000","70,000","700","7"], answer:1, explanation:"7 is in the ten-thousands place: 70,000." },
      { id:"jm003", level:"JSS1", question:"Find the LCM of 4 and 6.", options:["10","12","24","2"], answer:1, explanation:"Multiples of 4: 4,8,12. Multiples of 6: 6,12. LCM = 12." },
      { id:"jm004", level:"JSS2", question:"A rectangle has length 8cm and width 5cm. Find its area.", options:["13cm²","26cm²","40cm²","45cm²"], answer:2, explanation:"Area = length × width = 8 × 5 = 40cm²." },
      { id:"jm005", level:"JSS3", question:"Solve for x: 2x − 5 = 11", options:["x=6","x=8","x=3","x=16"], answer:1, explanation:"2x = 11+5 = 16, so x = 8." },
      { id:"jm006", level:"JSS1", question:"What is 3/4 expressed as a percentage?", options:["34%","43%","75%","134%"], answer:2, explanation:"3/4 = 0.75 = 75%." },
      { id:"jm007", level:"JSS2", question:"What type of angle is 130°?", options:["Acute","Right","Obtuse","Reflex"], answer:2, explanation:"An angle between 90° and 180° is obtuse." },
      { id:"jm008", level:"JSS3", question:"Find the value of y if 5y = 45.", options:["y=5","y=9","y=40","y=50"], answer:1, explanation:"y = 45 ÷ 5 = 9." },
      { id:"jm009", level:"JSS1", question:"Which of these is a prime number?", options:["9","15","17","21"], answer:2, explanation:"17 has only two factors: 1 and 17, so it's prime." },
      { id:"jm010", level:"JSS3", question:"A circle has radius 7cm. Find its circumference (use π = 22/7).", options:["22cm","44cm","49cm","154cm"], answer:1, explanation:"Circumference = 2πr = 2 × 22/7 × 7 = 44cm." },
      { id:"jm011", level:"JSS2", question:"Convert 0.6 to a fraction in its lowest term.", options:["6/10","3/5","6/100","60/100"], answer:1, explanation:"0.6 = 6/10, which simplifies to 3/5." },
      { id:"jm012", level:"JSS1", question:"What is the sum of the angles in a triangle?", options:["90°","180°","270°","360°"], answer:1, explanation:"The angles of any triangle always sum to 180°." },
      { id:"jm013", level:"JSS1", question:"Round 4,567 to the nearest hundred.", options:["4,500","4,600","4,570","5,000"], answer:1, explanation:"67 rounds up, so 4,567 becomes 4,600 to the nearest hundred." },
      { id:"jm014", level:"JSS2", question:"Simplify: 5a + 3a − 2a", options:["6a","10a","8a","4a"], answer:0, explanation:"5a+3a−2a = 6a." },
      { id:"jm015", level:"JSS3", question:"Find the HCF of 18 and 24.", options:["3","6","9","12"], answer:1, explanation:"Factors of 18: 1,2,3,6,9,18. Factors of 24: 1,2,3,4,6,8,12,24. Highest common factor is 6." },
      { id:"jm016", level:"JSS1", question:"What is 15% of 200?", options:["15","20","30","45"], answer:2, explanation:"15% of 200 = 0.15 × 200 = 30." },
      { id:"jm017", level:"JSS2", question:"A triangle has angles 50° and 60°. Find the third angle.", options:["60°","70°","80°","90°"], answer:1, explanation:"Angles in a triangle sum to 180°. 180−50−60 = 70°." },
      { id:"jm018", level:"JSS3", question:"Simplify: (x²)³", options:["x⁵","x⁶","x⁹","x³"], answer:1, explanation:"(x²)³ = x^(2×3) = x⁶." },
      { id:"jm019", level:"JSS1", question:"Which of these numbers is divisible by 3?", options:["121","122","123","124"], answer:2, explanation:"1+2+3=6, and 6 is divisible by 3, so 123 is divisible by 3." },
      { id:"jm020", level:"JSS2", question:"Find the perimeter of a square with side 9cm.", options:["18cm","27cm","36cm","81cm"], answer:2, explanation:"Perimeter of a square = 4 × side = 4 × 9 = 36cm." },
      { id:"jm021", level:"JSS3", question:"Solve: 3(x−2) = 15", options:["x=5","x=7","x=9","x=3"], answer:1, explanation:"3x−6=15, so 3x=21, so x=7." },
      { id:"jm022", level:"JSS1", question:"What is the value of 7²?", options:["14","49","72","77"], answer:1, explanation:"7² = 7 × 7 = 49." },
      { id:"jm023", level:"JSS2", question:"Convert 3km to metres.", options:["30m","300m","3,000m","30,000m"], answer:2, explanation:"1km = 1,000m, so 3km = 3,000m." },
      { id:"jm024", level:"JSS3", question:"Find the mean of 4, 8, 6, 10, 12.", options:["6","7","8","9"], answer:2, explanation:"Sum = 4+8+6+10+12 = 40. Mean = 40 ÷ 5 = 8." },
      { id:"jm025", level:"JSS1", question:"Which fraction is equivalent to 1/2?", options:["2/5","3/7","4/8","5/9"], answer:2, explanation:"4/8 simplifies to 1/2, since both top and bottom divide by 4." },
    ]
  },

  english: {
    objective: [
      { id:"je001", level:"JSS1", question:"Choose the correct plural of 'child'.", options:["Childs","Childes","Children","Childrens"], answer:2, explanation:"'Child' has an irregular plural: 'children'." },
      { id:"je002", level:"JSS2", question:"Identify the noun in the sentence: 'The dog barked loudly.'", options:["barked","loudly","dog","the"], answer:2, explanation:"'Dog' is the naming word (noun) in the sentence." },
      { id:"je003", level:"JSS1", question:"Choose the correct spelling.", options:["Recieve","Receive","Receeve","Receve"], answer:1, explanation:"The correct spelling follows 'i before e except after c': Receive." },
      { id:"je004", level:"JSS3", question:"What figure of speech is used in 'The wind whispered through the trees'?", options:["Simile","Metaphor","Personification","Hyperbole"], answer:2, explanation:"Giving human qualities (whispering) to the wind is personification." },
      { id:"je005", level:"JSS2", question:"Choose the antonym of 'generous'.", options:["Kind","Selfish","Wealthy","Happy"], answer:1, explanation:"'Selfish' is the opposite of 'generous'." },
      { id:"je006", level:"JSS1", question:"Which sentence is grammatically correct?", options:["She go to school daily.","She goes to school daily.","She going to school daily.","She gone to school daily."], answer:1, explanation:"Third person singular present tense requires 'goes'." },
      { id:"je007", level:"JSS3", question:"What is the synonym of 'enormous'?", options:["Tiny","Huge","Narrow","Fragile"], answer:1, explanation:"'Huge' means the same as 'enormous'." },
      { id:"je008", level:"JSS2", question:"Identify the verb in: 'The teacher explained the lesson clearly.'", options:["teacher","explained","lesson","clearly"], answer:1, explanation:"'Explained' is the action/doing word — the verb." },
      { id:"je009", level:"JSS1", question:"What is the correct article to use before 'apple'?", options:["A","An","The","No article needed"], answer:1, explanation:"'Apple' starts with a vowel sound, so it takes 'an'." },
      { id:"je010", level:"JSS3", question:"Choose the correctly punctuated sentence.", options:["Where are you going.","Where are you going?","where are you going?","Where are you going"], answer:1, explanation:"A question must end with a question mark and start with a capital letter." },
      { id:"je011", level:"JSS1", question:"Choose the correct past tense of 'go'.", options:["Goed","Gone","Went","Going"], answer:2, explanation:"'Go' has an irregular past tense: 'went'." },
      { id:"je012", level:"JSS2", question:"Identify the adjective: 'The tall boy ran fast.'", options:["Boy","Tall","Ran","Fast"], answer:1, explanation:"'Tall' describes the noun 'boy', making it an adjective." },
      { id:"je013", level:"JSS3", question:"What is the meaning of the idiom 'break the ice'?", options:["To destroy something","To start a conversation and ease tension","To become very cold","To end a friendship"], answer:1, explanation:"'Break the ice' means to say or do something that eases tension, especially at the start of a social situation." },
      { id:"je014", level:"JSS1", question:"Choose the correct preposition: 'The book is ___ the table.'", options:["In","On","At","By"], answer:1, explanation:"'On' correctly shows the book's position resting on top of the table." },
      { id:"je015", level:"JSS2", question:"Which word is a synonym for 'happy'?", options:["Sad","Angry","Joyful","Tired"], answer:2, explanation:"'Joyful' means the same as 'happy'." },
      { id:"je016", level:"JSS3", question:"Identify the type of sentence: 'What a beautiful day!'", options:["Declarative","Interrogative","Exclamatory","Imperative"], answer:2, explanation:"A sentence expressing strong emotion and ending in an exclamation mark is exclamatory." },
      { id:"je017", level:"JSS1", question:"Choose the plural of 'mouse'.", options:["Mouses","Mice","Mouseses","Mices"], answer:1, explanation:"'Mouse' has an irregular plural: 'mice'." },
      { id:"je018", level:"JSS2", question:"What is the opposite of 'ancient'?", options:["Old","Modern","Historic","Antique"], answer:1, explanation:"'Modern' is the opposite of 'ancient'." },
      { id:"je019", level:"JSS3", question:"Identify the verb tense: 'She has finished her homework.'", options:["Simple past","Present perfect","Future tense","Present continuous"], answer:1, explanation:"'Has finished' uses 'has' + past participle, which is the present perfect tense." },
      { id:"je020", level:"JSS1", question:"Choose the correctly capitalized sentence.", options:["my best friend is ada.","My Best Friend is Ada.","My best friend is Ada.","MY BEST FRIEND IS ADA."], answer:2, explanation:"Only the first word and the proper noun 'Ada' should be capitalised." },
      { id:"je021", level:"JSS2", question:"Which sentence uses 'their' correctly?", options:["Their going home.","They packed their bags.","Their is a book.","I like their's."], answer:1, explanation:"'Their' correctly shows possession in 'their bags'." },
      { id:"je022", level:"JSS3", question:"What figure of speech is used in 'as brave as a lion'?", options:["Metaphor","Simile","Personification","Hyperbole"], answer:1, explanation:"A comparison using 'as' or 'like' is a simile." },
    ]
  },

  basic_science: {
    objective: [
      { id:"jbs001", level:"JSS1", question:"Which of these is a living thing?", options:["Stone","Water","Plant","Air"], answer:2, explanation:"Plants grow, reproduce, and respond to their environment, making them living things." },
      { id:"jbs002", level:"JSS2", question:"What gas do plants absorb from the air during photosynthesis?", options:["Oxygen","Carbon dioxide","Nitrogen","Hydrogen"], answer:1, explanation:"Plants take in carbon dioxide and release oxygen during photosynthesis." },
      { id:"jbs003", level:"JSS1", question:"Which part of the body pumps blood?", options:["Lungs","Kidney","Heart","Liver"], answer:2, explanation:"The heart is the muscular organ that pumps blood around the body." },
      { id:"jbs004", level:"JSS3", question:"What is the process by which water changes from liquid to gas called?", options:["Condensation","Evaporation","Freezing","Melting"], answer:1, explanation:"Evaporation is the change of state from liquid to gas." },
      { id:"jbs005", level:"JSS2", question:"Which of these is NOT a state of matter?", options:["Solid","Liquid","Gas","Energy"], answer:3, explanation:"The three common states of matter are solid, liquid, and gas — energy is not a state of matter." },
      { id:"jbs006", level:"JSS1", question:"Which organ is responsible for breathing?", options:["Heart","Lungs","Stomach","Brain"], answer:1, explanation:"The lungs take in oxygen and release carbon dioxide during breathing." },
      { id:"jbs007", level:"JSS3", question:"What is the basic unit of life?", options:["Tissue","Organ","Cell","Organism"], answer:2, explanation:"The cell is the smallest structural and functional unit of all living things." },
      { id:"jbs008", level:"JSS2", question:"Which force pulls objects toward the Earth?", options:["Magnetism","Friction","Gravity","Tension"], answer:2, explanation:"Gravity is the force that pulls objects toward the Earth's centre." },
      { id:"jbs009", level:"JSS1", question:"Which sense organ is used for seeing?", options:["Ear","Nose","Eye","Tongue"], answer:2, explanation:"The eye is the organ responsible for sight." },
      { id:"jbs010", level:"JSS2", question:"What do we call animals that eat only plants?", options:["Carnivores","Herbivores","Omnivores","Predators"], answer:1, explanation:"Herbivores are animals that eat only plants." },
      { id:"jbs011", level:"JSS3", question:"Which gas makes up the largest percentage of the air we breathe?", options:["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"], answer:1, explanation:"Nitrogen makes up about 78% of the air, more than any other gas." },
      { id:"jbs012", level:"JSS1", question:"What do plants need to make their own food?", options:["Only water","Sunlight, water, and carbon dioxide","Only soil","Only sunlight"], answer:1, explanation:"Plants need sunlight, water, and carbon dioxide together for photosynthesis." },
      { id:"jbs013", level:"JSS2", question:"Which organ filters waste from the blood?", options:["Heart","Liver","Kidney","Lungs"], answer:2, explanation:"The kidneys filter waste products out of the blood to form urine." },
      { id:"jbs014", level:"JSS3", question:"What is the boiling point of water at sea level?", options:["0°C","50°C","100°C","150°C"], answer:2, explanation:"Water boils at 100°C at standard sea-level atmospheric pressure." },
      { id:"jbs015", level:"JSS1", question:"Which of these is a non-living thing?", options:["Tree","Bird","Rock","Fish"], answer:2, explanation:"A rock does not grow, reproduce, or respond to its environment, so it is non-living." },
      { id:"jbs016", level:"JSS2", question:"What is the process by which plants lose water vapour through their leaves?", options:["Respiration","Transpiration","Photosynthesis","Digestion"], answer:1, explanation:"Transpiration is the loss of water vapour from a plant's leaves." },
      { id:"jbs017", level:"JSS3", question:"Which part of the plant absorbs water from the soil?", options:["Leaves","Stem","Roots","Flowers"], answer:2, explanation:"Roots absorb water and dissolved minerals from the soil." },
      { id:"jbs018", level:"JSS1", question:"What do we call the force that pulls objects down to Earth?", options:["Friction","Magnetism","Gravity","Tension"], answer:2, explanation:"Gravity is the force that pulls objects toward the Earth." },
      { id:"jbs019", level:"JSS2", question:"Which of these is a source of light energy?", options:["A rock","The Sun","A book","A chair"], answer:1, explanation:"The Sun is a natural source of light energy." },
      { id:"jbs020", level:"JSS3", question:"What is the study of living things called?", options:["Chemistry","Physics","Biology","Geology"], answer:2, explanation:"Biology is the scientific study of living organisms." },
    ]
  },

  basic_technology: {
    objective: [
      { id:"jbt001", level:"JSS1", question:"Which of these is a hand tool used for cutting wood?", options:["Hammer","Saw","Spanner","Screwdriver"], answer:1, explanation:"A saw is specifically designed for cutting wood and other materials." },
      { id:"jbt002", level:"JSS2", question:"What does 'technology' mean?", options:["Study of plants","Application of scientific knowledge for practical purposes","Study of the weather","Study of numbers"], answer:1, explanation:"Technology is the application of scientific knowledge to solve practical problems." },
      { id:"jbt003", level:"JSS3", question:"Which material is a good conductor of electricity?", options:["Wood","Rubber","Copper","Plastic"], answer:2, explanation:"Copper is a metal and a good conductor of electricity." },
      { id:"jbt004", level:"JSS1", question:"What safety gear protects the eyes during workshop practice?", options:["Gloves","Goggles","Apron","Boots"], answer:1, explanation:"Goggles are worn to protect the eyes from flying debris or chemicals." },
      { id:"jbt005", level:"JSS2", question:"Which tool is used to measure length accurately?", options:["Hammer","Ruler","Saw","Pliers"], answer:1, explanation:"A ruler has marked measurements used to measure length." },
      { id:"jbt006", level:"JSS1", question:"What should you do before using any workshop tool?", options:["Use it immediately","Check it is safe and wear protective gear","Ignore instructions","Share it with a friend while in use"], answer:1, explanation:"Checking a tool's safety and wearing protective gear before use prevents accidents." },
      { id:"jbt007", level:"JSS3", question:"Which of these materials is an insulator?", options:["Copper","Iron","Rubber","Aluminium"], answer:2, explanation:"Rubber does not conduct electricity well, making it a good insulator." },
      { id:"jbt008", level:"JSS2", question:"What is the fixed point of a lever called?", options:["Load","Effort","Fulcrum","Pivot arm"], answer:2, explanation:"The fulcrum is the fixed point a lever pivots around." },
      { id:"jbt009", level:"JSS1", question:"Which tool is used for driving nails into wood?", options:["Screwdriver","Hammer","Saw","Chisel"], answer:1, explanation:"A hammer is designed for driving nails." },
      { id:"jbt010", level:"JSS3", question:"What type of simple machine is a wheelbarrow?", options:["First class lever","Second class lever","Third class lever","Pulley"], answer:1, explanation:"A wheelbarrow is a second class lever, since the load sits between the fulcrum (wheel) and the effort (handles)." },
      { id:"jbt011", level:"JSS2", question:"Which of these is used to hold two pieces of wood together firmly with pressure?", options:["Clamp","Hammer","File","Drill"], answer:0, explanation:"A clamp holds materials firmly together, often while glue dries." },
      { id:"jbt012", level:"JSS1", question:"What do we call a device that makes work easier?", options:["A tool box","A machine","A material","A drawing"], answer:1, explanation:"A machine is any device that makes performing a task easier." },
      { id:"jbt013", level:"JSS3", question:"Which drawing instrument is used to draw circles?", options:["T-square","Set square","Compass","Protractor"], answer:2, explanation:"A compass is specifically used to draw accurate circles and arcs." },
      { id:"jbt014", level:"JSS2", question:"What is the process of shaping a workpiece by removing material with a toothed tool called?", options:["Welding","Filing","Casting","Bending"], answer:1, explanation:"Filing removes small amounts of material to shape or smooth a workpiece." },
      { id:"jbt015", level:"JSS1", question:"Which of these is a workshop safety rule?", options:["Run around freely","Keep the floor clean and dry","Leave tools lying around","Work without supervision"], answer:1, explanation:"Keeping the floor clean and dry prevents slips and accidents in the workshop." },
      { id:"jbt016", level:"JSS3", question:"Which simple machine is used in a flag pole to raise the flag?", options:["Lever","Wedge","Pulley","Screw"], answer:2, explanation:"A pulley system is used to raise a flag by pulling a rope over a wheel." },
      { id:"jbt017", level:"JSS2", question:"Which material is commonly used for electrical wires because it conducts electricity well?", options:["Rubber","Wood","Copper","Plastic"], answer:2, explanation:"Copper is an excellent conductor, which is why it's widely used in wiring." },
      { id:"jbt018", level:"JSS1", question:"Which tool is used to loosen or tighten screws?", options:["Hammer","Screwdriver","Saw","File"], answer:1, explanation:"A screwdriver is specifically shaped to turn screws." },
    ]
  },

  social_studies: {
    objective: [
      { id:"jss001", level:"JSS1", question:"What is the meaning of culture?", options:["A type of food","The way of life of a group of people","A government system","A religion"], answer:1, explanation:"Culture refers to the customs, beliefs, and way of life shared by a group of people." },
      { id:"jss002", level:"JSS2", question:"Which of these is a major cause of drug abuse among youths?", options:["Good parenting","Peer pressure","Regular exercise","Balanced diet"], answer:1, explanation:"Peer pressure is a common factor that leads young people into drug abuse." },
      { id:"jss003", level:"JSS3", question:"What does 'population' mean?", options:["Number of animals in a zoo","Total number of people living in an area","Amount of land in a country","Number of schools in a state"], answer:1, explanation:"Population is the total number of people living in a particular place." },
      { id:"jss004", level:"JSS1", question:"Which of these is a good study habit?", options:["Reading only before exams","Making a study timetable","Avoiding group discussions","Sleeping late every night"], answer:1, explanation:"A study timetable helps organize time and cover topics consistently." },
      { id:"jss005", level:"JSS2", question:"What is the term for a group of people living together and sharing common interests?", options:["Nation","Community","State","Continent"], answer:1, explanation:"A community is a group of people living together, often sharing common interests or location." },
      { id:"jss006", level:"JSS1", question:"Which of these best describes 'cooperation'?", options:["Working alone","Working together toward a shared goal","Competing with others","Avoiding others"], answer:1, explanation:"Cooperation means working together with others toward a common goal." },
      { id:"jss007", level:"JSS3", question:"What is the movement of people from rural areas to cities called?", options:["Emigration","Rural-urban migration","Immigration","Tourism"], answer:1, explanation:"Rural-urban migration describes people moving from rural areas to cities, usually for work or better services." },
      { id:"jss008", level:"JSS2", question:"Which of these is a basic function of the family?", options:["Making laws","Providing care and teaching values","Collecting taxes","Building roads"], answer:1, explanation:"The family provides basic care for its members and teaches them the values of society." },
      { id:"jss009", level:"JSS1", question:"What do we call the customs and beliefs shared by a group of people?", options:["Religion","Culture","Government","Economy"], answer:1, explanation:"Culture refers to the shared customs, beliefs, and way of life of a group." },
      { id:"jss010", level:"JSS3", question:"Which of these can help resolve conflict peacefully?", options:["Fighting","Dialogue and compromise","Ignoring the other person","Shouting louder"], answer:1, explanation:"Dialogue and compromise allow both sides to be heard and reach a peaceful resolution." },
      { id:"jss011", level:"JSS2", question:"What is a major effect of overpopulation in cities?", options:["Reduced traffic","Pressure on infrastructure and resources","Lower cost of living","More farmland"], answer:1, explanation:"Overpopulation puts pressure on housing, roads, water, and other city infrastructure." },
      { id:"jss012", level:"JSS1", question:"Which of these is an example of a natural resource?", options:["Furniture","Water","Money","Building"], answer:1, explanation:"Water occurs naturally and is a key natural resource." },
      { id:"jss013", level:"JSS3", question:"What is the term for unfair treatment of a person based on their tribe or religion?", options:["Cooperation","Discrimination","Socialisation","Tolerance"], answer:1, explanation:"Discrimination is the unfair treatment of someone based on characteristics like tribe or religion." },
      { id:"jss014", level:"JSS2", question:"Why is peer pressure sometimes dangerous for teenagers?", options:["It always leads to good decisions","It can push them toward harmful behaviour to fit in","It has no real effect","It only affects adults"], answer:1, explanation:"Peer pressure can push teenagers into risky or harmful behaviour just to feel accepted by their friends." },
      { id:"jss015", level:"JSS1", question:"Which of these is a duty of every family member?", options:["Ignoring house rules","Respecting and supporting one another","Avoiding chores","Competing with siblings"], answer:1, explanation:"Respecting and supporting one another keeps a family functioning well." },
      { id:"jss016", level:"JSS3", question:"What is the term for the process by which a child learns the values of their society?", options:["Migration","Socialisation","Urbanisation","Discrimination"], answer:1, explanation:"Socialisation is how a person learns the accepted values and behaviours of their society." },
      { id:"jss017", level:"JSS2", question:"Which of these best reduces the harmful effects of child labour?", options:["More factory jobs for children","Access to free education","Longer working hours","Ignoring the problem"], answer:1, explanation:"Free, accessible education gives children an alternative to labour and a path out of poverty." },
      { id:"jss018", level:"JSS1", question:"What do we call the total number of people living in a place?", options:["Density","Population","Territory","Community"], answer:1, explanation:"Population is the total number of people living in a particular area." },
    ]
  },

  civic_education: {
    objective: [
      { id:"jce001", level:"JSS1", question:"What is a citizen?", options:["A visitor to a country","A legal member of a country or state","A tourist","A foreign worker"], answer:1, explanation:"A citizen is a legally recognized member of a nation with rights and duties." },
      { id:"jce002", level:"JSS2", question:"Which of these is a duty of a good citizen?", options:["Avoiding taxes","Obeying the law","Littering the environment","Ignoring public property"], answer:1, explanation:"Obeying the law is a fundamental duty of every responsible citizen." },
      { id:"jce003", level:"JSS3", question:"What does democracy mean?", options:["Rule by one person","Government of the people, by the people, for the people","Rule by the military","Rule by the wealthy only"], answer:1, explanation:"Democracy is a system of government where power belongs to the people." },
      { id:"jce004", level:"JSS1", question:"What is the term for the right to vote in an election?", options:["Citizenship","Suffrage","Leadership","Constitution"], answer:1, explanation:"Suffrage refers to the right to vote." },
      { id:"jce005", level:"JSS2", question:"Which of these is a national symbol of Nigeria?", options:["A private company logo","The national flag","A local market","A school badge"], answer:1, explanation:"The national flag is an official symbol representing Nigeria." },
      { id:"jce006", level:"JSS3", question:"What is the supreme law of a country called?", options:["A bill","An act","The Constitution","A decree"], answer:2, explanation:"The Constitution is the highest law of a country, which all other laws must follow." },
      { id:"jce007", level:"JSS1", question:"Which of these is a quality of a good leader?", options:["Selfishness","Honesty and fairness","Favouritism","Dishonesty"], answer:1, explanation:"Honesty and fairness are essential qualities of a good, trustworthy leader." },
      { id:"jce008", level:"JSS2", question:"What is the term for a country ruled by the people through elected representatives?", options:["Monarchy","Democracy","Dictatorship","Autocracy"], answer:1, explanation:"Democracy is government by the people, usually through elected representatives." },
      { id:"jce009", level:"JSS3", question:"Which of these is an example of a civic duty?", options:["Avoiding taxes","Paying taxes","Ignoring laws","Refusing to vote"], answer:1, explanation:"Paying taxes is a civic duty that funds public services for everyone." },
      { id:"jce010", level:"JSS1", question:"Which of these describes a citizen's right to express their opinion freely?", options:["Freedom of speech","Right to silence","Right to property","Freedom of movement"], answer:0, explanation:"Freedom of speech is the right to express opinions without government restriction." },
      { id:"jce011", level:"JSS2", question:"Which arm of government is responsible for making laws?", options:["The Executive","The Legislature","The Judiciary","The Civil Service"], answer:1, explanation:"The Legislature (e.g. National Assembly) is the arm responsible for making laws." },
      { id:"jce012", level:"JSS3", question:"What is the process called when citizens choose their leaders through voting?", options:["Appointment","Election","Coronation","Inheritance"], answer:1, explanation:"An election is the formal process of choosing leaders through voting." },
      { id:"jce013", level:"JSS1", question:"Which of these best describes 'tolerance'?", options:["Ignoring other people","Respecting views different from your own","Forcing your opinion on others","Avoiding all disagreement"], answer:1, explanation:"Tolerance means respecting beliefs or opinions that differ from your own." },
      { id:"jce014", level:"JSS2", question:"What is the term for a country's official song expressing national pride?", options:["National anthem","Coat of arms","National flag","Motto"], answer:0, explanation:"The national anthem is a patriotic song representing a country's identity and pride." },
      { id:"jce015", level:"JSS3", question:"Which of these is an important civic duty toward the environment?", options:["Polluting freely","Keeping it clean and protecting natural resources","Cutting down all trees","Ignoring waste disposal rules"], answer:1, explanation:"Protecting the environment and disposing of waste properly is a shared civic responsibility." },
    ]
  },

};
