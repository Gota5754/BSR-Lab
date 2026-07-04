export type Grade = "S" | "A" | "B" | "C" | "D";

/* Seuils de grade sur le score 0-100.
   Calibrés pour une notation réaliste : un stamp avec les bonnes substats
   et des rolls moyens-bons doit atteindre A/S sans être parfait. */
export const GRADE_THRESHOLDS: Array<{ grade: Grade; min: number }> = [
  { grade: "S", min: 85 },
  { grade: "A", min: 70 },
  { grade: "B", min: 50 },
  { grade: "C", min: 30 },
  { grade: "D", min: 0 },
];

export function getGrade(score: number): Grade {
  const entry = GRADE_THRESHOLDS.find((t) => score >= t.min);
  return entry ? entry.grade : "D";
}
