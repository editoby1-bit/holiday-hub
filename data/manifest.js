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

/* Per-subject accent color + icon — used across Revision, Quiz, and
   Challenge headers so subjects feel visually distinct from one another,
   not just interchangeable "past question" screens. Colors are chosen
   to stay legible against both white cards and the dark navy hero. */
const SUBJECT_META = {
  mathematics:      { icon: "🔢", color: "#2563eb" },
  english:          { icon: "📖", color: "#7c3aed" },
  biology:          { icon: "🧬", color: "#16a34a" },
  chemistry:        { icon: "⚗️", color: "#0891b2" },
  physics:          { icon: "⚛️", color: "#4338ca" },
  economics:        { icon: "📈", color: "#c9a05c" },
  government:       { icon: "🏛", color: "#1e40af" },
  literature:       { icon: "🎭", color: "#9333ea" },
  crs:              { icon: "🕊", color: "#0d9488" },
  geography:        { icon: "🌍", color: "#0e7490" },
  civic_education:  { icon: "⚖️", color: "#1e40af" },
  accounting:       { icon: "🧾", color: "#a3803f" },
  commerce:         { icon: "🛒", color: "#b45309" },
  marketing:        { icon: "📣", color: "#dc2626" },
  animal_husbandry: { icon: "🐄", color: "#65a30d" },
  basic_science:    { icon: "🔬", color: "#16a34a" },
  basic_technology: { icon: "🛠", color: "#0891b2" },
  social_studies:   { icon: "🧭", color: "#c9a05c" },
};
function subjectMeta(key) {
  return SUBJECT_META[key] || { icon: "📘", color: "#e85d4a" };
}
