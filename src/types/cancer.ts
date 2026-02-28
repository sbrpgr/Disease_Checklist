export type RiskLevel = "low" | "medium" | "high";
export type Urgency = "immediate" | "within_48h" | "within_1week" | "within_2weeks" | "within_4weeks";
export type Gender = "all" | "male" | "female" | "male_dominant" | "female_dominant";

export interface Symptom {
  id: string;
  name: string;
  description: string;
  bodyPart: string[];
  ppv?: number;
  frequency?: number;
  isRedFlag: boolean;
  urgency?: Urgency;
}

export interface RedFlag {
  symptom: string;
  description: string;
  urgency: Urgency;
  action: string;
}

export interface RiskFactor {
  factor: string;
  detail?: string;
  relativeRisk?: string;
  isModifiable: boolean;
}

export interface ChecklistItem {
  id: string;
  question: string;
  hint?: string;
  weight: number;
  isRedFlag: boolean;
}

export interface DiagnosticTest {
  name: string;
  type: "blood" | "imaging" | "endoscopy" | "biopsy" | "urine" | "other";
  description: string;
  guideline?: string;
}

export interface Cancer {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  longDescription: string;
  affectedOrgan: string;
  genderRisk: Gender;
  ageRisk: string;
  incidenceRank?: number;
  keyStatistic: string;
  fiveYearSurvival: {
    stage1?: number;
    stage2?: number;
    stage3?: number;
    stage4?: number;
    overall?: number;
  };
  earlySymptoms: Symptom[];
  redFlags: RedFlag[];
  riskFactors: RiskFactor[];
  checklist: ChecklistItem[];
  diagnosticTests: DiagnosticTest[];
  screeningGuide: string;
  bodyParts: string[];
  symptomTags: string[];
  references: string[];
  lastUpdated: string;
  reviewNote: string;
}
