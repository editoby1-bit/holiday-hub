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
    ]
  },

  basic_technology: {
    objective: [
      { id:"jbt001", level:"JSS1", question:"Which of these is a hand tool used for cutting wood?", options:["Hammer","Saw","Spanner","Screwdriver"], answer:1, explanation:"A saw is specifically designed for cutting wood and other materials." },
      { id:"jbt002", level:"JSS2", question:"What does 'technology' mean?", options:["Study of plants","Application of scientific knowledge for practical purposes","Study of the weather","Study of numbers"], answer:1, explanation:"Technology is the application of scientific knowledge to solve practical problems." },
      { id:"jbt003", level:"JSS3", question:"Which material is a good conductor of electricity?", options:["Wood","Rubber","Copper","Plastic"], answer:2, explanation:"Copper is a metal and a good conductor of electricity." },
      { id:"jbt004", level:"JSS1", question:"What safety gear protects the eyes during workshop practice?", options:["Gloves","Goggles","Apron","Boots"], answer:1, explanation:"Goggles are worn to protect the eyes from flying debris or chemicals." },
    ]
  },

  social_studies: {
    objective: [
      { id:"jss001", level:"JSS1", question:"What is the meaning of culture?", options:["A type of food","The way of life of a group of people","A government system","A religion"], answer:1, explanation:"Culture refers to the customs, beliefs, and way of life shared by a group of people." },
      { id:"jss002", level:"JSS2", question:"Which of these is a major cause of drug abuse among youths?", options:["Good parenting","Peer pressure","Regular exercise","Balanced diet"], answer:1, explanation:"Peer pressure is a common factor that leads young people into drug abuse." },
      { id:"jss003", level:"JSS3", question:"What does 'population' mean?", options:["Number of animals in a zoo","Total number of people living in an area","Amount of land in a country","Number of schools in a state"], answer:1, explanation:"Population is the total number of people living in a particular place." },
      { id:"jss004", level:"JSS1", question:"Which of these is a good study habit?", options:["Reading only before exams","Making a study timetable","Avoiding group discussions","Sleeping late every night"], answer:1, explanation:"A study timetable helps organize time and cover topics consistently." },
    ]
  },

  civic_education: {
    objective: [
      { id:"jce001", level:"JSS1", question:"What is a citizen?", options:["A visitor to a country","A legal member of a country or state","A tourist","A foreign worker"], answer:1, explanation:"A citizen is a legally recognized member of a nation with rights and duties." },
      { id:"jce002", level:"JSS2", question:"Which of these is a duty of a good citizen?", options:["Avoiding taxes","Obeying the law","Littering the environment","Ignoring public property"], answer:1, explanation:"Obeying the law is a fundamental duty of every responsible citizen." },
      { id:"jce003", level:"JSS3", question:"What does democracy mean?", options:["Rule by one person","Government of the people, by the people, for the people","Rule by the military","Rule by the wealthy only"], answer:1, explanation:"Democracy is a system of government where power belongs to the people." },
    ]
  },

};
