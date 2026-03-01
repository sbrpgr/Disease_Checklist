import type { Cancer } from "@/types/cancer";

const commonRefs = [
  "국가암정보센터",
  "국립암센터",
  "NICE NG12",
  "American Cancer Society",
];

function buildLongDescription(input: {
  name: string;
  description: string;
  affectedOrgan: string;
  ageRisk: string;
  keyStatistic: string;
  symptoms: string[];
  redFlags: Array<{ symptom: string; action: string }>;
  risks: string[];
  checklist: Array<{ question: string }>;
  tests: string[];
  screeningGuide: string;
}): string {
  const symptomText = input.symptoms.join(", ");
  const riskText = input.risks.join(", ");
  const redFlagText = input.redFlags.map((item) => `${item.symptom} 발생 시 ${item.action}`).join(" / ");
  const checklistText = input.checklist.map((item) => item.question).join(" ");
  const testText = input.tests.join(", ");

  return [
    `${input.name}은(는) ${input.affectedOrgan}에서 발생하는 악성종양으로, 초기에는 일반적인 피로감이나 소화 불편처럼 비특이적인 변화로 시작되는 경우가 많습니다. 그래서 증상을 단편적으로 보기보다 빈도, 강도, 지속 기간, 그리고 기존 건강 상태와의 차이를 함께 보는 방식이 중요합니다. 이 페이지는 ${input.name}에서 반복적으로 확인되는 초기 신호를 이해하기 쉽게 정리하고, 언제 관찰을 멈추고 진료로 전환해야 하는지 판단하는 데 도움을 주기 위해 작성되었습니다. 기본 설명은 '${input.description}'이며, 통계적으로 알려진 핵심 지표는 '${input.keyStatistic}'입니다.`,
    `증상 파트에서 우선 확인해야 할 항목은 ${symptomText}입니다. 많은 사용자가 한 가지 증상만 보고 위험도를 판단하지만, 실제 임상에서는 여러 신호가 동시에 나타나는지, 최근 2~8주 사이에 악화 추세가 있는지, 일상 기능 저하가 동반되는지가 더 중요하게 작동합니다. 예를 들어 증상이 잠깐 나타났다 사라지는 패턴과 매주 반복되는 패턴은 해석이 다르며, 수면 방해나 식사량 감소처럼 기능 저하가 동반될수록 적극적인 평가가 필요합니다. 따라서 현재 증상을 확인할 때는 단순 유무가 아니라 시작 시점과 악화 속도까지 함께 기록하는 것이 좋습니다.`,
    `Red Flag는 일반 체크리스트 점수와 별도로 취급해야 하는 긴급 신호입니다. ${redFlagText}처럼 위험 신호가 확인되면 '며칠 더 지켜보기'보다 바로 의료기관 진료를 우선하는 편이 안전합니다. Red Flag를 늦게 대응하면 병기 상승, 합병증, 치료 옵션 축소로 이어질 수 있으므로, 증상 강도가 약하더라도 새롭게 발생한 경고 신호라면 지연 없이 평가받는 것이 원칙입니다. 특히 야간 악화, 지속적 출혈, 빠른 체중 감소, 삼킴/호흡 장애 같은 기능 저하 신호는 자가관리 단계로 두지 않는 것이 좋습니다.`,
    `위험요인은 ${riskText}로 정리할 수 있습니다. 위험요인은 수정 가능한 요인과 수정이 어려운 요인으로 구분해서 접근해야 합니다. 흡연, 음주, 비만, 운동 부족, 수면 부족처럼 행동 기반 요인은 장기적으로 위험을 낮출 여지가 있지만, 가족력, 유전 요인, 연령, 과거 치료 이력처럼 비가역 요인은 주기적인 모니터링 전략을 강화하는 방식으로 대응해야 합니다. 자신의 위험요인을 알고 있으면 같은 증상이 생겨도 대응 속도를 더 빠르게 가져갈 수 있고, 검진 주기 조정에도 도움이 됩니다.`,
    `검진과 진단 단계에서는 ${testText} 같은 검사가 조합되어 사용됩니다. 실제 진단 경로는 1차 문진/신체진찰, 2차 영상 또는 혈액 검사, 3차 조직학적 확인으로 이어지는 경우가 많으며, 검사 목적은 단순 발견을 넘어 병변의 위치, 범위, 성격을 구체적으로 파악하는 데 있습니다. 검사 결과가 애매하게 나올 수도 있기 때문에 단일 검사 결과만으로 결론을 내리지 말고, 주치의가 제시한 추적 간격과 재평가 계획을 함께 따라가는 것이 중요합니다.`,
    `자가점검 체크리스트를 사용할 때는 '높은 점수 = 확진'이 아니라 '우선 진료 필요도 상승'으로 해석해야 합니다. 이 서비스의 질문은 ${checklistText}처럼 실제 진료에서 확인하는 핵심 문항을 바탕으로 구성되어 있으며, 증상 조합이 위험 패턴에 가까운지 빠르게 분류하는 데 목적이 있습니다. 점수가 낮더라도 증상이 새롭게 악화되거나 Red Flag가 나타나면 즉시 행동 계획을 바꿔야 하고, 점수가 높게 나오면 가능한 빠른 시점에 전문 진료를 예약하는 것이 좋습니다.`,
    `연령대 기준으로는 ${input.ageRisk}에서 상대적으로 주의가 필요하지만, 이는 진단 기준이 아니라 위험 분포를 설명하는 통계적 정보입니다. 젊은 연령에서도 가족력이나 특이 노출력이 있으면 위험이 높아질 수 있고, 반대로 고령이더라도 정기 검진과 건강한 생활습관으로 위험 신호를 조기에 발견할 수 있습니다. 중요한 점은 '내 나이는 괜찮다'는 단정 대신, 현재 증상과 개인 위험요인을 함께 해석하는 것입니다.`,
    `검진 안내는 '${input.screeningGuide}'를 기본 원칙으로 합니다. 검진의 목적은 증상이 생긴 뒤 확진하는 것이 아니라, 증상이 없거나 약한 단계에서 위험 신호를 선제적으로 발견하는 데 있습니다. 따라서 검진 대상에 해당한다면 권고 주기를 지키는 것이 중요하고, 한 번 정상 결과를 받았더라도 생활습관이나 건강 상태가 달라졌다면 다음 검진 시점 조정이 필요할 수 있습니다. 검진 이후에도 새로운 증상이 생기면 이전 정상 결과에 안심하지 말고 다시 진료를 받아야 합니다.`,
    `${input.name} 관련 정보를 활용할 때는 두 가지 원칙을 권장합니다. 첫째, 증상 기록을 구체적으로 남겨 의사와의 상담 품질을 높입니다. 둘째, 인터넷 단편 정보보다 신뢰 가능한 가이드라인과 의료진 설명을 우선합니다. 특히 주변 사례나 커뮤니티 경험담은 개인 편차가 커서 그대로 적용하기 어렵기 때문에, 자신의 병력과 검사결과를 기반으로 맞춤형 판단을 받는 것이 가장 안전합니다.`,
    `결론적으로 ${input.name}은(는) 조기 인지와 적절한 진료 연결이 예후를 크게 바꿀 수 있는 질환군에 속합니다. 자가점검은 출발점일 뿐 최종 판단 도구가 아니며, 경고 신호가 있거나 불안이 지속될 때는 즉시 의료기관에서 확인하는 것이 정답입니다. 이 페이지의 목적은 불안을 키우는 것이 아니라, 근거 기반의 다음 행동을 분명하게 제시하는 데 있습니다. 증상이 애매하더라도 반복되거나 악화되면 진료를 미루지 말고, 검사 결과와 함께 생활습관 교정 계획을 세워 장기적인 위험을 낮추시기 바랍니다.`,
  ].join("\n\n");
}

function makeCancer(input: {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  longDescription: string;
  affectedOrgan: string;
  genderRisk: Cancer["genderRisk"];
  ageRisk: string;
  keyStatistic: string;
  fiveYearSurvival: Cancer["fiveYearSurvival"];
  symptoms: string[];
  redFlags: Array<{ symptom: string; urgency: Cancer["redFlags"][number]["urgency"]; action: string }>;
  risks: string[];
  checklist: Array<{ id: string; question: string; weight: number; isRedFlag?: boolean; hint?: string }>;
  tests: string[];
  screeningGuide: string;
  bodyParts: string[];
  symptomTags: string[];
}): Cancer {
  return {
    id: input.id,
    slug: input.slug,
    name: input.name,
    nameEn: input.nameEn,
    description: input.description,
    longDescription: buildLongDescription(input),
    affectedOrgan: input.affectedOrgan,
    genderRisk: input.genderRisk,
    ageRisk: input.ageRisk,
    keyStatistic: input.keyStatistic,
    fiveYearSurvival: input.fiveYearSurvival,
    earlySymptoms: input.symptoms.map((name, i) => ({
      id: `${input.id}-symptom-${i + 1}`,
      name,
      description: `${name} 여부를 최근 2~4주 기준으로 확인하세요.`,
      bodyPart: input.bodyParts,
      isRedFlag: input.redFlags.some((r) => name.includes(r.symptom) || r.symptom.includes(name)),
    })),
    redFlags: input.redFlags.map((r) => ({
      symptom: r.symptom,
      description: `${r.symptom}은 즉시 의학적 평가가 필요할 수 있습니다.`,
      urgency: r.urgency,
      action: r.action,
    })),
    riskFactors: input.risks.map((factor) => ({
      factor,
      isModifiable: !(factor.includes("가족력") || factor.includes("BRCA") || factor.includes("고령") || factor.includes("염색체")),
    })),
    checklist: input.checklist.map((q) => ({
      id: q.id,
      question: q.question,
      weight: q.weight,
      isRedFlag: Boolean(q.isRedFlag),
      hint: q.hint,
    })),
    diagnosticTests: input.tests.map((name) => ({
      name,
      type: "other",
      description: `${name}를 통해 위험도를 평가합니다.`,
    })),
    screeningGuide: input.screeningGuide,
    bodyParts: input.bodyParts,
    symptomTags: input.symptomTags,
    references: commonRefs,
    lastUpdated: "2026-03-01",
    reviewNote: "국립암센터/NICE/ACS 공개 자료를 바탕으로 요약했습니다.",
  };
}

export const allCancers: Cancer[] = [
  makeCancer({
    id: "liver",
    slug: "liver",
    name: "간암",
    nameEn: "Liver Cancer",
    description: "B/C형 간염과 간경변이 주요 위험요인인 대표 간 악성종양입니다.",
    longDescription: "간암은 초기 무증상 비율이 높아 고위험군의 정기 추적이 중요합니다.",
    affectedOrgan: "간",
    genderRisk: "male_dominant",
    ageRisk: "50세 이상",
    keyStatistic: "전체 5년 생존율 약 37%",
    fiveYearSurvival: { overall: 37, stage1: 55, stage4: 5 },
    symptoms: ["우상복부 통증", "황달", "복수", "체중감소"],
    redFlags: [{ symptom: "황달", urgency: "immediate", action: "즉시 응급실 또는 내과 진료" }],
    risks: ["B형/C형 간염", "간경변", "과음", "비알코올성 지방간염"],
    checklist: [
      { id: "jaundice", question: "눈이나 피부가 노랗게 변했나요?", weight: 5, isRedFlag: true },
      { id: "hepatitis", question: "B형 또는 C형 간염을 진단받은 적이 있나요?", weight: 4 },
      { id: "cirrhosis", question: "간경변 진단 이력이 있나요?", weight: 4 },
      { id: "ruq_pain", question: "우상복부 통증/불쾌감이 2주 이상 있나요?", weight: 2 },
    ],
    tests: ["복부 초음파", "AFP 혈액검사", "조영증강 CT/MRI"],
    screeningGuide: "B/C형 간염 또는 간경변 환자는 6개월마다 복부 초음파+AFP를 권장합니다.",
    bodyParts: ["복부", "전신"],
    symptomTags: ["황달", "우상복부 통증", "복수", "체중감소"],
  }),
  makeCancer({
    id: "thyroid",
    slug: "thyroid",
    name: "갑상선암",
    nameEn: "Thyroid Cancer",
    description: "목 결절과 쉰 목소리, 연하곤란이 주요 경고 신호입니다.",
    longDescription: "갑상선암은 예후가 좋은 편이지만 Red Flag 증상은 빠른 평가가 필요합니다.",
    affectedOrgan: "갑상선",
    genderRisk: "female_dominant",
    ageRisk: "20~60대",
    keyStatistic: "초기 발견 시 5년 생존율 99% 이상",
    fiveYearSurvival: { overall: 99, stage1: 99, stage4: 55 },
    symptoms: ["목 결절", "쉰 목소리", "연하곤란", "경부 림프절 비대"],
    redFlags: [{ symptom: "쉰 목소리", urgency: "within_2weeks", action: "2주 내 이비인후과/내분비외과 진료" }],
    risks: ["두경부 방사선 노출", "가족력", "여성"],
    checklist: [
      { id: "voice", question: "1개월 이상 쉰 목소리가 지속되나요?", weight: 5, isRedFlag: true },
      { id: "nodule", question: "목 앞에 단단한 결절이 만져지나요?", weight: 4 },
      { id: "radiation", question: "목/머리 부위 방사선 노출 이력이 있나요?", weight: 4 },
      { id: "swallow", question: "음식 삼키기가 어려운가요?", weight: 3 },
    ],
    tests: ["경부 초음파", "TSH", "세침흡인세포검사(FNA)"],
    screeningGuide: "무증상 일반인 선별검사는 권고되지 않으며, 증상/고위험군 중심 평가를 권장합니다.",
    bodyParts: ["목"],
    symptomTags: ["목 결절", "쉰 목소리", "연하곤란"],
  }),
  makeCancer({
    id: "ovarian", slug: "ovarian", name: "난소암", nameEn: "Ovarian Cancer",
    description: "복부 팽만, 조기 포만감, 골반 통증이 반복되면 평가가 필요합니다.",
    longDescription: "난소암은 초기 비특이 증상이 많아 증상 빈도와 지속 기간 확인이 핵심입니다.",
    affectedOrgan: "난소", genderRisk: "female", ageRisk: "40세 이상",
    keyStatistic: "1기 5년 생존율 약 92%, 4기 13%",
    fiveYearSurvival: { stage1: 92, stage2: 76, stage3: 29, stage4: 13, overall: 49 },
    symptoms: ["복부 팽만", "조기 포만감", "골반 통증", "빈뇨"],
    redFlags: [{ symptom: "복부 팽만", urgency: "within_2weeks", action: "2~4주 내 산부인과 진료" }],
    risks: ["BRCA1/2", "Lynch 증후군", "가족력", "자궁내막증"],
    checklist: [
      { id: "bloat", question: "복부 팽만이 월 12회 이상 반복되나요?", weight: 4 },
      { id: "brca", question: "가족 중 BRCA 관련 유방/난소암 이력이 있나요?", weight: 4 },
      { id: "persist", question: "증상이 2~3주 이상 지속되나요?", weight: 3, isRedFlag: true },
      { id: "pelvic", question: "골반 통증이 반복되나요?", weight: 3 },
    ],
    tests: ["CA-125", "경질 초음파", "골반 CT"],
    screeningGuide: "일반인 선별검사는 권고되지 않으며 고위험군에서 CA-125+초음파를 고려합니다.",
    bodyParts: ["복부", "골반"], symptomTags: ["복부 팽만", "골반 통증", "조기 포만감"],
  }),
  makeCancer({
    id: "gallbladder", slug: "gallbladder", name: "담낭암", nameEn: "Gallbladder Cancer",
    description: "황달이 나타나면 즉시 평가가 필요한 담도계 암입니다.",
    longDescription: "담석/담낭용종 병력이 있는 경우 우상복부 증상에 주의해야 합니다.",
    affectedOrgan: "담낭", genderRisk: "female_dominant", ageRisk: "60세 이상",
    keyStatistic: "황달 증상의 LR+ 206 보고",
    fiveYearSurvival: { overall: 30, stage1: 65, stage4: 5 },
    symptoms: ["우상복부 통증", "오심", "황달", "체중감소"],
    redFlags: [{ symptom: "황달", urgency: "immediate", action: "즉시 응급 진료" }],
    risks: ["담석", "담낭 용종", "고령", "여성"],
    checklist: [
      { id: "jaundice", question: "황달 증상이 있나요?", weight: 5, isRedFlag: true },
      { id: "stone", question: "담석이나 담낭 용종 병력이 있나요?", weight: 4 },
      { id: "pain", question: "식후 우상복부 통증이 반복되나요?", weight: 3 },
      { id: "weight", question: "최근 체중이 감소했나요?", weight: 2 },
    ],
    tests: ["복부 초음파", "간기능검사", "CA19-9"],
    screeningGuide: "담낭 용종 >1cm 또는 증상 동반 시 정밀 영상검사를 권장합니다.",
    bodyParts: ["복부"], symptomTags: ["황달", "우상복부 통증", "구역"],
  }),
  makeCancer({
    id: "colorectal", slug: "colorectal", name: "대장암", nameEn: "Colorectal Cancer",
    description: "혈변과 배변습관 변화가 대표 신호인 소화기 암입니다.",
    longDescription: "혈변+배변습관 변화 조합은 즉시 진료가 필요한 중요한 신호입니다.",
    affectedOrgan: "대장/직장", genderRisk: "all", ageRisk: "50세 이상",
    keyStatistic: "1기 5년 생존율 약 95%",
    fiveYearSurvival: { stage1: 95, stage2: 80, stage3: 70, stage4: 22, overall: 74 },
    symptoms: ["혈변", "배변습관 변화", "복통", "체중감소"],
    redFlags: [{ symptom: "혈변", urgency: "within_2weeks", action: "2주 내 소화기내과 진료" }],
    risks: ["50세 이상", "가족력", "대장 폴립", "적색육/가공육 과다"],
    checklist: [
      { id: "blood", question: "혈변(적색/흑색변)이 있나요?", weight: 4, isRedFlag: true },
      { id: "habit", question: "배변습관 변화가 4주 이상 지속되나요?", weight: 3 },
      { id: "family", question: "가족 중 대장암/폴립 병력이 있나요?", weight: 3 },
      { id: "weight", question: "원인불명 체중감소가 있나요?", weight: 2 },
    ],
    tests: ["FIT 분변잠혈검사", "대장내시경", "조직검사"],
    screeningGuide: "50세 이상은 1년마다 분변잠혈검사를 권장하며 양성 시 대장내시경이 필요합니다.",
    bodyParts: ["복부"], symptomTags: ["혈변", "배변습관 변화", "복통"],
  }),
  makeCancer({
    id: "bladder", slug: "bladder", name: "방광암", nameEn: "Bladder Cancer",
    description: "육안적 혈뇨가 가장 강력한 경고 신호입니다.",
    longDescription: "통증 없는 혈뇨라도 즉시 비뇨기과 평가가 필요합니다.",
    affectedOrgan: "방광", genderRisk: "male_dominant", ageRisk: "60세 이상",
    keyStatistic: "육안적 혈뇨 PPV 약 28.3%",
    fiveYearSurvival: { overall: 77, stage1: 88, stage4: 15 },
    symptoms: ["육안적 혈뇨", "배뇨통", "빈뇨", "절박뇨"],
    redFlags: [{ symptom: "육안적 혈뇨", urgency: "immediate", action: "즉시 비뇨기과 진료" }],
    risks: ["흡연", "화학물질 직업 노출", "고령", "남성"],
    checklist: [
      { id: "gross_hematuria", question: "소변 색이 붉게 변한 적이 있나요?", weight: 5, isRedFlag: true },
      { id: "uti", question: "요로감염 치료 후에도 혈뇨가 지속되나요?", weight: 4, isRedFlag: true },
      { id: "job", question: "염료/고무/가죽 산업 노출력이 있나요?", weight: 3 },
      { id: "smoke", question: "흡연 또는 과거 흡연력이 있나요?", weight: 2 },
    ],
    tests: ["요검사", "요세포검사", "방광경"],
    screeningGuide: "혈뇨가 있으면 원인 확인 전까지 단순 감염으로만 보지 말고 정밀검사를 권장합니다.",
    bodyParts: ["비뇨기"], symptomTags: ["혈뇨", "배뇨통", "빈뇨"],
  }),
  makeCancer({
    id: "leukemia", slug: "leukemia", name: "백혈병", nameEn: "Leukemia",
    description: "피로·발열·출혈 경향 조합은 48시간 내 혈액검사가 필요합니다.",
    longDescription: "백혈병은 전신 증상 중심으로 나타나며 조기 혈액검사가 중요합니다.",
    affectedOrgan: "혈액/골수", genderRisk: "all", ageRisk: "전 연령",
    keyStatistic: "피로/창백 64%, 발열 61% 보고",
    fiveYearSurvival: { overall: 60 },
    symptoms: ["피로", "발열", "멍/출혈", "뼈 통증"],
    redFlags: [{ symptom: "피로+발열+출혈", urgency: "within_48h", action: "48시간 내 CBC 검사" }],
    risks: ["염색체 이상", "방사선 노출", "벤젠 노출", "이전 항암치료"],
    checklist: [
      { id: "triad", question: "피로+발열+멍/출혈이 동시에 있나요?", weight: 4, isRedFlag: true },
      { id: "bleed", question: "멍이 쉽게 들거나 점상출혈이 있나요?", weight: 4 },
      { id: "bone", question: "뼈/관절 통증이 지속되나요?", weight: 3 },
      { id: "fever", question: "원인 없는 발열이 반복되나요?", weight: 3 },
    ],
    tests: ["CBC", "말초혈액도말", "골수검사"],
    screeningGuide: "의심 증상 조합이면 지체 없이 CBC를 시행하고 혈액내과 평가를 권장합니다.",
    bodyParts: ["전신"], symptomTags: ["피로", "발열", "출혈", "뼈 통증"],
  }),
  makeCancer({
    id: "esophageal", slug: "esophageal", name: "식도암", nameEn: "Esophageal Cancer",
    description: "진행성 연하곤란은 즉시 내시경 평가가 필요한 핵심 신호입니다.",
    longDescription: "삼킴 곤란이 점차 악화되면 2주 내 상부위장관 내시경이 권고됩니다.",
    affectedOrgan: "식도", genderRisk: "male_dominant", ageRisk: "55세 이상",
    keyStatistic: "연하곤란 연관 진단 PPV 약 2.7~3.0%",
    fiveYearSurvival: { overall: 43, stage1: 85, stage4: 6 },
    symptoms: ["연하곤란", "체중감소", "흉통", "역류/속쓰림"],
    redFlags: [{ symptom: "진행성 연하곤란", urgency: "within_2weeks", action: "2주 내 내시경" }],
    risks: ["흡연", "과음", "GERD/바렛식도", "고령 남성"],
    checklist: [
      { id: "dysphagia", question: "삼킬 때 걸리는 느낌이 있나요?", weight: 5, isRedFlag: true },
      { id: "progress", question: "연하곤란이 점차 심해지나요?", weight: 5, isRedFlag: true },
      { id: "reflux", question: "역류/속쓰림이 장기간 지속되나요?", weight: 2 },
      { id: "weight", question: "원인불명 체중감소가 있나요?", weight: 3 },
    ],
    tests: ["상부위장관 내시경", "조직검사", "흉복부 CT"],
    screeningGuide: "연하곤란은 단독으로도 의심암 경로 평가 대상입니다.",
    bodyParts: ["흉부", "목"], symptomTags: ["연하곤란", "역류", "체중감소"],
  }),
  makeCancer({
    id: "kidney", slug: "kidney", name: "신장암", nameEn: "Kidney Cancer",
    description: "혈뇨와 옆구리 통증, 복부 종괴가 핵심 징후입니다.",
    longDescription: "초기 무증상 사례가 많지만 혈뇨가 보이면 즉시 비뇨기 평가가 필요합니다.",
    affectedOrgan: "신장", genderRisk: "male_dominant", ageRisk: "50세 이상",
    keyStatistic: "1기 5년 생존율 93~96%",
    fiveYearSurvival: { stage1: 95, stage4: 13, overall: 76 },
    symptoms: ["혈뇨", "옆구리 통증", "복부 종괴", "발열"],
    redFlags: [{ symptom: "육안적 혈뇨", urgency: "immediate", action: "즉시 비뇨기과 진료" }],
    risks: ["흡연", "고혈압", "비만", "만성신질환/투석"],
    checklist: [
      { id: "blood", question: "육안적 혈뇨가 있나요?", weight: 5, isRedFlag: true },
      { id: "mass", question: "복부에 만져지는 덩어리가 있나요?", weight: 5, isRedFlag: true },
      { id: "flank", question: "옆구리 통증이 2주 이상 지속되나요?", weight: 2 },
      { id: "htn", question: "최근 고혈압이 새로 진단되었나요?", weight: 2 },
    ],
    tests: ["복부 초음파", "복부 CT", "MRI"],
    screeningGuide: "혈뇨가 있으면 초음파와 CT를 통한 신장/요로 평가를 권장합니다.",
    bodyParts: ["복부", "비뇨기"], symptomTags: ["혈뇨", "옆구리 통증", "복부 종괴"],
  }),
  makeCancer({
    id: "breast", slug: "breast", name: "유방암", nameEn: "Breast Cancer",
    description: "유방 종괴, 혈성 유두 분비, 피부 변화가 핵심 Red Flag입니다.",
    longDescription: "유방암은 조기 발견 시 예후가 매우 좋아 정기검진과 증상 인지가 중요합니다.",
    affectedOrgan: "유방", genderRisk: "female_dominant", ageRisk: "40세 이상",
    keyStatistic: "1기 5년 생존율 약 99%",
    fiveYearSurvival: { stage1: 99, stage2: 93, stage3: 72, stage4: 28, overall: 94 },
    symptoms: ["유방 종괴", "혈성 유두 분비", "오렌지껍질 피부", "유두 함몰"],
    redFlags: [{ symptom: "혈성 유두 분비", urgency: "within_2weeks", action: "2~4주 내 유방외과 진료" }],
    risks: ["BRCA1/2", "가족력", "고령", "호르몬 대체요법"],
    checklist: [
      { id: "nipple_blood", question: "유두에서 혈성 분비물이 나오나요?", weight: 5, isRedFlag: true },
      { id: "orange_skin", question: "유방 피부가 오렌지껍질처럼 변했나요?", weight: 5, isRedFlag: true },
      { id: "mass", question: "새로운 유방 종괴가 만져지나요?", weight: 4 },
      { id: "inversion", question: "새로운 유두 함몰이 발생했나요?", weight: 4, isRedFlag: true },
    ],
    tests: ["유방촬영술", "유방 초음파", "조직검사"],
    screeningGuide: "국가검진은 40~69세 여성 2년마다 유방촬영술을 권장합니다.",
    bodyParts: ["흉부"], symptomTags: ["유방 종괴", "유두 분비", "피부 변화"],
  }),
  makeCancer({
    id: "prostate", slug: "prostate", name: "전립선암", nameEn: "Prostate Cancer",
    description: "배뇨 증상은 비특이적이지만 혈뇨/혈정액은 빠른 진료가 필요합니다.",
    longDescription: "전립선암은 초기 무증상 비율이 높아 PSA 기반 선별 전략이 중요합니다.",
    affectedOrgan: "전립선", genderRisk: "male", ageRisk: "50세 이상 남성",
    keyStatistic: "국소암 5년 생존율 99% 이상",
    fiveYearSurvival: { overall: 95, stage1: 99, stage4: 32 },
    symptoms: ["배뇨 곤란", "빈뇨", "혈뇨", "골반 통증"],
    redFlags: [{ symptom: "혈뇨/혈정액", urgency: "within_2weeks", action: "2주 내 비뇨기과 진료" }],
    risks: ["고령", "가족력", "BRCA1/2", "비만"],
    checklist: [
      { id: "blood", question: "혈뇨 또는 혈정액이 보이나요?", weight: 5, isRedFlag: true },
      { id: "family", question: "가족 중 전립선암 병력이 있나요?", weight: 3 },
      { id: "age", question: "50세 이상 남성인가요?", weight: 2 },
      { id: "void", question: "배뇨 곤란/잔뇨감이 지속되나요?", weight: 2 },
    ],
    tests: ["PSA", "직장수지검사(DRE)", "전립선 MRI/조직검사"],
    screeningGuide: "50세 이상에서 PSA 검사를 고려하며 가족력은 45세부터 상담을 권장합니다.",
    bodyParts: ["비뇨기"], symptomTags: ["배뇨 곤란", "혈뇨", "야간뇨"],
  }),
  makeCancer({
    id: "lung", slug: "lung", name: "폐암", nameEn: "Lung Cancer",
    description: "객혈과 만성 기침, 흡연력 조합은 빠른 평가가 필요합니다.",
    longDescription: "폐암은 사망률이 높지만 조기 발견 시 생존율이 크게 개선됩니다.",
    affectedOrgan: "폐", genderRisk: "all", ageRisk: "54~74세 고위험군",
    keyStatistic: "LDCT 선별검사로 사망률 약 20% 감소",
    fiveYearSurvival: { overall: 32, stage1: 90, stage4: 8 },
    symptoms: ["객혈", "8주 이상 기침", "호흡곤란", "체중감소"],
    redFlags: [{ symptom: "객혈", urgency: "within_2weeks", action: "즉시~2주 내 호흡기내과 진료" }],
    risks: ["흡연", "간접흡연", "라돈", "석면"],
    checklist: [
      { id: "hemoptysis", question: "기침 시 피가 섞여 나오나요?", weight: 5, isRedFlag: true },
      { id: "cough", question: "기침이 8주 이상 지속되나요?", weight: 3 },
      { id: "smoke", question: "30갑년 이상 흡연력이 있나요?", weight: 2 },
      { id: "dyspnea", question: "호흡곤란이 새롭게 생겼나요?", weight: 3 },
    ],
    tests: ["저선량 흉부CT(LDCT)", "흉부 CT", "기관지경"],
    screeningGuide: "54~74세, 30갑년 이상 흡연자는 국가폐암검진 대상이 될 수 있습니다.",
    bodyParts: ["흉부"], symptomTags: ["객혈", "만성 기침", "호흡곤란"],
  }),
  makeCancer({
    id: "skin", slug: "skin", name: "피부암", nameEn: "Skin Cancer",
    description: "ABCDE 변화, 특히 E(변화)는 빠른 피부과 평가가 필요합니다.",
    longDescription: "피부 병변의 모양/색/크기 변화와 비치유성 상처는 핵심 경고 신호입니다.",
    affectedOrgan: "피부", genderRisk: "all", ageRisk: "전 연령",
    keyStatistic: "ABCDE 규칙 민감도 89~100%",
    fiveYearSurvival: { stage1: 98, stage4: 23, overall: 90 },
    symptoms: ["비대칭 병변", "불규칙 경계", "다색", "변화(E)"],
    redFlags: [{ symptom: "변화(E)", urgency: "within_2weeks", action: "2주 내 피부과 진료" }],
    risks: ["자외선 노출", "선번 이력", "밝은 피부", "가족력"],
    checklist: [
      { id: "evolve", question: "점/병변이 최근 빠르게 변했나요?", weight: 5, isRedFlag: true },
      { id: "nonheal", question: "4주 이상 낫지 않는 상처가 있나요?", weight: 4, isRedFlag: true },
      { id: "multicolor", question: "병변 색이 여러 색으로 섞여 있나요?", weight: 4 },
      { id: "diameter", question: "병변 크기가 6mm 이상인가요?", weight: 3 },
    ],
    tests: ["더모스코피", "피부 조직검사"],
    screeningGuide: "ABCDE 변화가 있으면 지체하지 말고 피부과 평가를 받으세요.",
    bodyParts: ["피부"], symptomTags: ["피부 변화", "출혈", "비치유성 상처"],
  }),
];
