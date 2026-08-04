/* ═══════════════════════════════════════════════════════════════
   HOLIDAY HUB — Content Manifest
   Single source of truth for what's available offline right now.
   When new subjects/questions are added to senior-bank.js or
   junior-bank.js, update this manifest so the UI reflects it —
   no other app logic needs to change.
═══════════════════════════════════════════════════════════════ */

const CONTENT_MANIFEST = {
  senior: {
    label: "Senior Secondary",
    sub: "WAEC · NECO · GCE · NABTEB",
    bankVar: "SENIOR_BANK",
    subjects: [
      "mathematics","english","biology","chemistry","physics","economics",
      "government","literature","crs","geography","civic_education",
      "accounting","commerce","marketing","animal_husbandry"
    ]
  },
  junior: {
    label: "Junior Secondary",
    sub: "JSS1 · JSS2 · JSS3",
    bankVar: "JUNIOR_BANK",
    subjects: [
      "mathematics","english","basic_science","basic_technology",
      "social_studies","civic_education"
    ]
  }
};

const SUBJECT_LABELS = {
  mathematics: "Mathematics", english: "English Language", biology: "Biology",
  chemistry: "Chemistry", physics: "Physics", economics: "Economics",
  government: "Government", literature: "Literature", crs: "CRS",
  geography: "Geography", civic_education: "Civic Education",
  accounting: "Accounting", commerce: "Commerce", marketing: "Marketing",
  animal_husbandry: "Animal Husbandry", basic_science: "Basic Science",
  basic_technology: "Basic Technology", social_studies: "Social Studies"
};
