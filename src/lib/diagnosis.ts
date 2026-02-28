import { Cancer, RiskLevel } from "@/types/cancer";

export interface DiagnosisResult {
  score: number;
  maxScore: number;
  percentage: number;
  riskLevel: RiskLevel;
  hasRedFlag: boolean;
  redFlagItems: string[];
  recommendation: string;
  recommendedAction: "observe" | "see_doctor" | "urgent";
}

export function calculateDiagnosisScore(
  cancer: Cancer,
  answers: Record<string, boolean>
): DiagnosisResult {
  let score = 0;
  let maxScore = 0;
  let hasRedFlag = false;
  const redFlagItems: string[] = [];

  for (const item of cancer.checklist) {
    maxScore += item.weight;
    if (answers[item.id]) {
      score += item.weight;
      if (item.isRedFlag) {
        hasRedFlag = true;
        redFlagItems.push(item.question);
      }
    }
  }

  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;

  if (hasRedFlag) {
    return {
      score,
      maxScore,
      percentage,
      riskLevel: "high",
      hasRedFlag,
      redFlagItems,
      recommendation: "즉시 의료기관을 방문하세요. Red Flag 증상이 확인되었습니다.",
      recommendedAction: "urgent",
    };
  }

  if (percentage >= 60) {
    return {
      score,
      maxScore,
      percentage,
      riskLevel: "high",
      hasRedFlag,
      redFlagItems,
      recommendation: "위험요인이 높게 확인되었습니다. 빠른 진료를 권장합니다.",
      recommendedAction: "see_doctor",
    };
  }

  if (percentage >= 35) {
    return {
      score,
      maxScore,
      percentage,
      riskLevel: "medium",
      hasRedFlag,
      redFlagItems,
      recommendation: "일부 관련 증상이 있습니다. 2주 이상 지속되면 진료를 받으세요.",
      recommendedAction: "see_doctor",
    };
  }

  return {
    score,
    maxScore,
    percentage,
    riskLevel: "low",
    hasRedFlag,
    redFlagItems,
    recommendation: "현재 위험도는 낮습니다. 정기 검진을 유지하세요.",
    recommendedAction: "observe",
  };
}
