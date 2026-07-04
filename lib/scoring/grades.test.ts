import { describe, expect, it } from "vitest";
import { getGrade, GRADE_THRESHOLDS } from "./grades";

describe("getGrade", () => {
  it("attribue S à partir de 85", () => {
    expect(getGrade(100)).toBe("S");
    expect(getGrade(85)).toBe("S");
  });

  it("attribue A entre 70 et 85", () => {
    expect(getGrade(84.9)).toBe("A");
    expect(getGrade(70)).toBe("A");
  });

  it("attribue B entre 50 et 70", () => {
    expect(getGrade(69.9)).toBe("B");
    expect(getGrade(50)).toBe("B");
  });

  it("attribue C entre 30 et 50", () => {
    expect(getGrade(49.9)).toBe("C");
    expect(getGrade(30)).toBe("C");
  });

  it("attribue D sous 30", () => {
    expect(getGrade(29.9)).toBe("D");
    expect(getGrade(0)).toBe("D");
  });

  it("les seuils sont triés par ordre décroissant", () => {
    const mins = GRADE_THRESHOLDS.map((t) => t.min);
    expect([...mins].sort((a, b) => b - a)).toEqual(mins);
  });
});
