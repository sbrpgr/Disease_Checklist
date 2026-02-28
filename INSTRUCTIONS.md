# INSTRUCTIONS — 질환 체크리스트 프로젝트

> AI 코딩 도구용 단일 컨텍스트 문서
> 이 파일 하나만 읽으면 전체 프로젝트를 파악하고 구현할 수 있다.

---

## 프로젝트 기본 정보

| 항목 | 내용 |
|---|---|
| **서비스명** | 질환 체크리스트 |
| **GitHub** | https://github.com/sbrpgr/Disease_Checklist |
| **목적** | 근거 기반 암 자가진단 웹 플랫폼 |
| **수익 모델** | Google AdSense (광고) |
| **프레임워크** | Next.js 15 (App Router) + TypeScript |
| **스타일링** | Tailwind CSS v4 + shadcn/ui |
| **배포** | Vercel |
| **언어** | 한국어 (ko) |

---

## 핵심 서비스 개념

두 가지 자가진단 흐름이 핵심이다:

1. **하향식 (Top-Down)** — 사용자가 "폐암이 걱정돼요" → 해당 암의 체크리스트 응답 → 위험도 결과
2. **상향식 (Bottom-Up)** — 사용자가 "기침이 나고 피가 섞여요" → 관련 암 목록 표시 → 개별 체크리스트로 이동

⚠️ 모든 진단 결과 화면에는 **"이 결과는 의학적 진단이 아닙니다"** 면책 고지 필수

---

## 기술 스택 및 설치

```bash
# 프로젝트 생성
npx create-next-app@latest disease-checklist \
  --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

cd disease-checklist

# shadcn/ui 초기화
npx shadcn@latest init
npx shadcn@latest add button card badge progress tabs accordion alert dialog

# 추가 패키지
npm install recharts fuse.js framer-motion
npm install react-hook-form zod @hookform/resolvers
npm install @next/mdx @mdx-js/loader @mdx-js/react
npm install clsx tailwind-merge lucide-react
npm install pretendard
```

---

## 폴더 구조 (전체)

```
src/
├── app/
│   ├── layout.tsx                  # 루트 레이아웃 (헤더/푸터/AdSense 스크립트)
│   ├── page.tsx                    # 홈페이지
│   ├── globals.css
│   ├── sitemap.ts                  # 자동 사이트맵
│   ├── robots.ts
│   ├── not-found.tsx               # 커스텀 404
│   ├── about/page.tsx              # 서비스 소개
│   ├── contact/page.tsx            # 문의
│   ├── privacy/page.tsx            # 개인정보처리방침
│   ├── terms/page.tsx              # 이용약관
│   ├── disclaimer/page.tsx         # 의료 면책 고지
│   ├── cancers/
│   │   ├── page.tsx                # 13개 암 목록
│   │   └── [slug]/
│   │       ├── page.tsx            # 암 상세 정보 (SEO 핵심)
│   │       └── check/page.tsx      # 하향식 자가진단
│   ├── symptom-check/page.tsx      # 상향식 자가진단
│   ├── news/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── screening/page.tsx          # 국가검진 안내
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── DisclaimerBanner.tsx    # 하단 고정 면책 고지
│   │   └── AdUnit.tsx              # Google AdSense 광고 단위
│   ├── diagnosis/
│   │   ├── TopDownChecker.tsx      # 하향식 체크리스트 UI
│   │   ├── BottomUpChecker.tsx     # 상향식 증상 선택 UI
│   │   ├── ChecklistStep.tsx       # 단계별 질문 컴포넌트
│   │   ├── ResultCard.tsx          # 진단 결과 카드
│   │   └── RedFlagAlert.tsx        # Red Flag 경고 팝업
│   ├── cancer/
│   │   ├── CancerCard.tsx          # 암 목록 카드
│   │   ├── SurvivalRateChart.tsx   # 병기별 생존율 차트 (Recharts)
│   │   └── RiskFactorList.tsx
│   └── common/
│       ├── StructuredData.tsx      # JSON-LD 스키마
│       └── SearchBar.tsx
│
├── data/
│   ├── cancers/
│   │   ├── index.ts                # 전체 암 배열 export
│   │   ├── liver.ts                # 간암
│   │   ├── thyroid.ts              # 갑상선암
│   │   ├── ovarian.ts              # 난소암
│   │   ├── gallbladder.ts          # 담낭암
│   │   ├── colorectal.ts           # 대장암
│   │   ├── bladder.ts              # 방광암
│   │   ├── leukemia.ts             # 백혈병
│   │   ├── esophageal.ts           # 식도암
│   │   ├── kidney.ts               # 신장암
│   │   ├── breast.ts               # 유방암
│   │   ├── prostate.ts             # 전립선암
│   │   ├── lung.ts                 # 폐암
│   │   └── skin.ts                 # 피부암
│   └── symptoms/
│       └── symptom-cancer-map.ts   # 증상 → 관련 암 매핑
│
├── types/
│   └── cancer.ts                   # 전체 타입 정의
│
└── lib/
    ├── utils.ts                    # cn() 유틸리티
    ├── diagnosis.ts                # 점수 계산 로직
    └── metadata.ts                 # 동적 메타데이터 생성
```

---

## TypeScript 타입 정의 (`src/types/cancer.ts`)

```typescript
export type RiskLevel = "low" | "medium" | "high";
export type Urgency = "immediate" | "within_48h" | "within_1week" | "within_2weeks" | "within_4weeks";
export type Gender = "all" | "male" | "female" | "male_dominant" | "female_dominant";

export interface Symptom {
  id: string;
  name: string;
  description: string;
  bodyPart: string[];
  ppv?: number;         // 양성예측도 (%)
  frequency?: number;   // 환자군 발생률 (%)
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
  relativeRisk?: string;  // "2~3배", "OR 7.26"
  isModifiable: boolean;
}

export interface ChecklistItem {
  id: string;
  question: string;
  hint?: string;
  weight: number;         // 1~5 (위험도 가중치)
  isRedFlag: boolean;
}

export interface Cancer {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  affectedOrgan: string;
  genderRisk: Gender;
  ageRisk: string;
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
  screeningGuide: string;
  bodyParts: string[];     // 상향식 진단 매핑용
  symptomTags: string[];   // 상향식 진단 매핑용
  references: string[];
  lastUpdated: string;
}
```

---

## 암 데이터 — 13개 암종 핵심 정보

> 아래 데이터로 각 `src/data/cancers/[slug].ts` 파일을 만들어라.
> 모든 출처: 국립암센터, 대한암학회, NICE NG12, ACS 가이드라인 기반

### 1. 간암 (`liver`)
- **핵심 증상**: 우상복부 통증/불쾌감, 황달, 복수, 체중감소, 식욕저하, 피로, 위장관 출혈(6.4%)
- **Red Flag**: 황달(즉시), 복수(1주내)
- **위험요인**: B/C형 간염(가장 강력), 간경변, 과음, 비알코올성 지방간염
- **체크리스트 핵심 문항**: 황달 여부(w:5), B/C형 간염 보유(w:4), 간경변 진단(w:4), 우상복부 통증(w:2)
- **검진**: 복부 초음파+AFP 6개월 간격 (B/C형 간염·간경변 환자)
- **5년 생존율**: 전체 37%, 조기 발견 시 40~60%

### 2. 갑상선암 (`thyroid`)
- **핵심 증상**: 목 결절(무통성), 쉰 목소리(PPV 76%), 연하 곤란(80%), 호흡 곤란(32%), 경부 림프절 비대(PPV 68%)
- **Red Flag**: 쉰 목소리 1개월 이상(2주내), 삼킴 어려움(2주내)
- **위험요인**: 방사선 노출(두경부), 가족력, 여성(3~4배)
- **체크리스트 핵심 문항**: 목소리 변화(w:5, RedFlag), 목 결절(w:4), 방사선 노출(w:4)
- **검진**: 경부 초음파+TSH, 확진 FNA

### 3. 난소암 (`ovarian`)
- **핵심 증상**: 복부 팽만(17~64%, Goff 4대 증상), 조기 포만감, 골반 통증, 빈뇨 — **월 12회 이상 + 12개월 이내 신규 발생** 기준
- **Red Flag**: 위 4대 증상 2~3주 이상 지속(2~4주내)
- **위험요인**: BRCA1(평생 위험 39~44%), BRCA2(17~18%), Lynch 증후군, 자궁내막증
- **체크리스트 핵심 문항**: 복부팽만 월12회(w:4), BRCA 가족력(w:4), 증상 지속 2~3주(w:3)
- **검진**: CA-125+경질 초음파(고위험군)

### 4. 담낭암 (`gallbladder`)
- **핵심 증상**: 우상복부 통증(37.3%), 오심·구역(23.4%), 황달(LR+ 206), 체중감소(15.2%)
- **Red Flag**: 황달(즉시 응급)
- **위험요인**: 담석(OR 7.26), 담낭 용종(>1cm), 여성(3~4배), 고령
- **체크리스트 핵심 문항**: 황달(w:5, RedFlag), 담석·용종 기왕력(w:4), 식후 우상복부 통증(w:3)
- **검진**: 복부 초음파, CA19-9+간기능검사

### 5. 대장암 (`colorectal`)
- **핵심 증상**: 혈변(PPV 4%, 복합 시 9~11%), 배변습관 변화(14.9%), 복통(13.8%), 체중감소(12.8%), 잔변감, 빈혈
- **Red Flag**: 혈변(2주내), 혈변+배변습관 변화 동시(즉시)
- **위험요인**: 50세 이상, 대장 선종(폴립), 가족력, FAP/Lynch, 적색육·가공육 과다, 흡연·음주
- **체크리스트 핵심 문항**: 혈변(w:4, RedFlag), 배변습관 변화 4주(w:3), 가족력(w:3)
- **검진**: 분변잠혈검사(FIT) 50세 이상 1년마다, 양성 시 대장내시경

### 6. 방광암 (`bladder`)
- **핵심 증상**: 육안적 혈뇨(PPV 28.3%, 특이도 99.8%), 현미경 혈뇨(PPV 3.4%), 배뇨 통증·작열감, 빈뇨
- **Red Flag**: 육안적 혈뇨(즉시), UTI 치료 후 지속 혈뇨(즉시)
- **위험요인**: 흡연(2~3배), 방향족 아민 직업 노출(염료·고무), 60세 이상, 남성(3~4배)
- **체크리스트 핵심 문항**: 육안 혈뇨(w:5, RedFlag), UTI 치료 후 지속(w:4, RedFlag), 직업 노출(w:3)
- **검진**: 요검사+요세포검사 → 방광경(확진)

### 7. 백혈병 (`leukemia`)
- **핵심 증상**: 피로·창백(64%), 발열(61%), 출혈경향·멍·점출혈(54%), 뼈·관절 통증(53%), 림프절 비대(52%), 비장 비대(49%)
- **Red Flag**: 피로+발열+출혈 복합(48시간 내 CBC), 불명열+CBC 이상(즉시 혈액과)
- **위험요인**: 염색체 이상(다운증후군), 방사선·벤젠 노출, 이전 항암치료
- **체크리스트 핵심 문항**: 3증상 복합(w:4, RedFlag), 멍·점출혈(w:4), 뼈통증(w:3)
- **검진**: CBC+혈액도말 48시간 이내(NICE 기준)

### 8. 식도암 (`esophageal`)
- **핵심 증상**: 연하곤란(PPV 2.70%, 남성 4.78% — Lei 2025), 체중감소(0.34%), 역류·속쓰림, 흉통, 구토·오심
- **Red Flag**: 진행성 연하곤란(즉시~2주내 내시경), 55세이상+체중감소+역류(2주내)
- **위험요인**: 흡연, 과음, GERD·바렛식도, 65°C 초과 뜨거운 음료(IARC), 남성(3~4배)
- **체크리스트 핵심 문항**: 진행성 연하곤란(w:5, RedFlag), 연하곤란 점점 심해짐(w:5, RedFlag)
- **검진**: NICE NG12 — 연하곤란 즉시 의심암 경로; Edinburgh Dysphagia Score(EDS) ≥3.5 민감도 96.7%

### 9. 신장암 (`kidney`)
- **핵심 증상**: 혈뇨(OR 37, LR 26), 옆구리·등 통증, 복부 종괴, 원인불명 체중감소, 발열(20~30%), 고혈압(신규)
- **Red Flag**: 육안적 혈뇨(즉시), 만져지는 복부 종괴(즉시)
- **위험요인**: 흡연(RR 1.39), 고혈압(위험 67%↑), 비만(BMI 5kg/m² 당 RR 1.24), 투석·만성신질환
- **체크리스트 핵심 문항**: 육안 혈뇨(w:6, RedFlag), 복부 종괴(w:5), 옆구리 통증 2주이상(w:2)
- **검진**: 복부 초음파 → CT/MRI 확진

### 10. 유방암 (`breast`)
- **핵심 증상**: 유방 종괴(PPV 40~49세 4.8%, 60~69세 25%, 70세이상 48%), 혈성 유두 분비(악성 동반율 8~15%), 피부 오렌지껍질 모양, 유두 함몰, 겨드랑이 림프절 비대
- **Red Flag**: 혈성 유두 분비(2~4주내), 피부 오렌지껍질(즉시~2주내), 유두 함몰(신규, 2주내)
- **위험요인**: BRCA1/2(평생 50~80%), 가족력(2~3배), 고령(40세↑), 장기 호르몬 대체요법
- **체크리스트 핵심 문항**: 혈성 유두 분비(w:5, RedFlag), 피부 오렌지껍질(w:5, RedFlag), 유방 종괴(w:4), 유두 함몰(신규, w:4)
- **검진**: 유방촬영술 40~69세 2년마다(국가검진), 고밀도 유방은 초음파 추가

### 11. 전립선암 (`prostate`)
- **핵심 증상**: 배뇨 곤란(주저뇨 PPV 3.0%), 빈뇨(PPV 2.2%), 야간뇨(PPV 2.2%), 혈뇨·혈정액(RedFlag), 뼈·골반 통증(전이 시)
- **Red Flag**: 혈뇨·혈정액(2주내), 척수압박 의심(즉시 응급)
- **위험요인**: 고령 70세이상(PPV 급증), BRCA1/2, 가족력, 흑인 혈통
- **체크리스트 핵심 문항**: 혈뇨·혈정액(w:5, RedFlag), 가족력(w:3), 50세이상 남성(w:2)
- **검진**: PSA 혈액검사(50세이상, 가족력 시 45세), 직장수지검사(DRE)
- **PSA 연령별 기준**: 40~49세 2.5, 50~59세 3.5, 60~69세 4.5, 70~79세 6.5 ng/mL

### 12. 폐암 (`lung`)
- **핵심 증상**: 객혈(PPV 6.4% — QLung), 만성 기침 8주이상(PPV 0.2%), 호흡곤란(PPV 0.2%), 흉통, 쉰 목소리, 체중감소(16~26%), 곤봉지(OR 175.7)
- **Red Flag**: 객혈(즉시~2주내), 만성기침+흡연력(4주내)
- **위험요인**: 흡연(15~30배), 간접흡연(1.2~2배), 라돈(100Bq/m³당 위험 16%↑), 석면, COPD·폐섬유화
- **체크리스트 핵심 문항**: 객혈(w:5, RedFlag), 기침 8주이상(w:3), 흡연력 30갑년(w:2)
- **검진**: 저선량 CT(LDCT) — 54~74세, 30갑년 이상 흡연자 국가검진

### 13. 피부암 (`skin`)
- **ABCDE 법칙** (흑색종 민감도 89~100%):
  - A(비대칭), B(불규칙 경계), C(다색), D(6mm 이상), E(변화 — 가장 중요, RedFlag)
- **Red Flag**: E(변화, 급격히 변하거나 출혈)(2주내), 4주이상 낫지 않는 상처(2주내)
- **위험요인**: 자외선, 흰 피부, 선번 이력(특히 어린 시절), 면역저하, 가족력
- **체크리스트 핵심 문항**: E 변화(w:5, RedFlag), 4주이상 미치유 상처(w:4, RedFlag), 다색(w:4)
- **검진**: 피부과 더모스코피 → 조직검사 확진

---

## 증상 → 암 매핑 (`src/data/symptoms/symptom-cancer-map.ts`)

> 상향식 진단에 사용. 증상 선택 시 관련 암을 내려준다.

```typescript
// 주요 증상별 관련 암 (우선순위 순)
export const symptomCancerMap: Record<string, string[]> = {
  "혈뇨":           ["bladder", "kidney", "prostate"],
  "혈변":           ["colorectal"],
  "황달":           ["gallbladder", "liver"],
  "객혈":           ["lung", "esophageal"],
  "목 결절":        ["thyroid"],
  "유방 종괴":      ["breast"],
  "연하곤란":       ["esophageal", "thyroid", "lung"],
  "복부 팽만":      ["ovarian", "liver", "colorectal"],
  "원인불명 체중감소": ["lung", "colorectal", "esophageal", "kidney", "leukemia"],
  "피로+발열+출혈": ["leukemia"],
  "배뇨 곤란":      ["prostate", "bladder"],
  "피부 변화":      ["skin"],
  "우상복부 통증":  ["liver", "gallbladder"],
  "만성 기침":      ["lung", "esophageal"],
  "쉰 목소리":      ["thyroid", "lung", "esophageal"],
  "옆구리 통증":    ["kidney"],
  "골반 통증":      ["ovarian"],
  "뼈 통증":        ["leukemia", "prostate", "lung"],
};
```

---

## 진단 점수 계산 로직 (`src/lib/diagnosis.ts`)

```typescript
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
      score, maxScore, percentage,
      riskLevel: "high", hasRedFlag, redFlagItems,
      recommendation: "지금 바로 의료기관을 방문하세요. 즉각적인 평가가 필요한 증상이 확인되었습니다.",
      recommendedAction: "urgent",
    };
  }

  if (percentage >= 60) {
    return {
      score, maxScore, percentage,
      riskLevel: "high", hasRedFlag, redFlagItems,
      recommendation: "여러 증상과 위험요인이 확인되었습니다. 가까운 시일 내 전문의와 상담하세요.",
      recommendedAction: "see_doctor",
    };
  }

  if (percentage >= 35) {
    return {
      score, maxScore, percentage,
      riskLevel: "medium", hasRedFlag, redFlagItems,
      recommendation: "일부 관련 증상이 확인되었습니다. 증상이 2주 이상 지속되면 의료기관을 방문하세요.",
      recommendedAction: "see_doctor",
    };
  }

  return {
    score, maxScore, percentage,
    riskLevel: "low", hasRedFlag, redFlagItems,
    recommendation: "현재 주요 증상은 확인되지 않았습니다. 정기 건강검진을 통해 건강을 관리하세요.",
    recommendedAction: "observe",
  };
}
```

---

## 디자인 시스템

### 색상 (tailwind.config.ts에 추가)
```typescript
colors: {
  brand: { primary: "#2563EB", light: "#EFF6FF" },
  risk: {
    low:    "#16A34A",   // 위험도 낮음 — 초록
    medium: "#D97706",   // 위험도 중간 — 앰버
    high:   "#DC2626",   // 위험도 높음 — 빨강
    flag:   "#7C3AED",   // Red Flag — 보라
  },
}
```

### 폰트
- 한글: **Pretendard** (가독성 최고)
- `globals.css`에 `@import "pretendard/dist/web/variable/pretendardvariable.css";`
- `font-family: "Pretendard Variable", Pretendard, -apple-system, sans-serif`

### 원칙
- 모바일 퍼스트 (320px부터 대응)
- 자가진단 체크리스트: 한 화면에 1개 질문 (집중력 유지)
- Red Flag 감지 즉시 인터럽트 (체크리스트 도중이라도)

---

## Google AdSense 핵심 규칙

1. **자가진단 진행 중 페이지에는 광고 없음** — 사용자 경험 최우선
2. **광고 허용 위치**: 암 정보 페이지 본문 중간/하단, 뉴스 페이지, 홈페이지
3. **광고 금지 페이지**: `/privacy`, `/terms`, `/contact`, `/disclaimer`, 404
4. **모든 페이지 하단**: 면책 고지 고정 표시
5. **콘텐츠 > 광고**: 각 페이지에서 광고가 콘텐츠보다 눈에 띄면 안 됨
6. **필수 페이지 완성 후 심사 신청**: `/about`, `/privacy`, `/terms`, `/contact`, `/disclaimer`

### AdSense 컴포넌트 (`src/components/layout/AdUnit.tsx`)
```typescript
"use client";
import { useEffect } from "react";

export function AdUnit({ slot, format = "auto" }: { slot: string; format?: string }) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  useEffect(() => {
    try { (window as any).adsbygoogle?.push({}); } catch {}
  }, []);
  if (!clientId) return null;
  return (
    <ins className="adsbygoogle block"
      data-ad-client={clientId}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
```

### AdSense 스크립트 (루트 `layout.tsx`의 `<head>`)
```tsx
<Script
  async
  src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
  crossOrigin="anonymous"
  strategy="afterInteractive"
/>
```

---

## SEO 필수 구현 사항

### 각 암 페이지 메타데이터
```typescript
// app/cancers/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const cancer = getCancerBySlug(params.slug);
  return {
    title: `${cancer.name} 초기증상 자가진단 체크리스트 | 질환 체크리스트`,
    description: `${cancer.name} 초기증상 확인부터 자가진단까지. 국립암센터 가이드라인 기반 근거 있는 정보를 제공합니다.`,
    openGraph: { /* ... */ },
    alternates: { canonical: `https://your-domain.com/cancers/${cancer.slug}` },
  };
}
```

### JSON-LD 구조화 데이터
- 암 정보 페이지: `MedicalCondition` 스키마
- 뉴스 페이지: `Article` 스키마
- 전체: `BreadcrumbList`, `WebSite`

### sitemap.ts
```typescript
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cancers = getAllCancers();
  return [
    { url: "https://your-domain.com", changeFrequency: "weekly", priority: 1 },
    ...cancers.map((c) => ({
      url: `https://your-domain.com/cancers/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    // news, screening, about, etc.
  ];
}
```

---

## 환경변수 (`.env.local`)

```bash
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXX   # AdSense 승인 후 입력
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX             # Google Analytics
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=질환 체크리스트
```

---

## 개발 우선순위 (Phase 1 — AdSense 심사 목표)

### 1순위: 먼저 만들 것
1. `src/types/cancer.ts` — 타입 정의
2. `src/data/cancers/` — 13개 암 데이터 파일 (위 핵심 정보 기반)
3. `src/lib/diagnosis.ts` — 점수 계산 로직
4. 헤더 + 푸터 + 면책 고지 배너
5. 암 정보 페이지 (`/cancers/[slug]`) — SEO 핵심, 가장 먼저 완성
6. AdSense 필수 페이지 5개 (`/about`, `/privacy`, `/terms`, `/contact`, `/disclaimer`)
7. 홈페이지

### 2순위: 핵심 기능
8. 하향식 자가진단 (`/cancers/[slug]/check`) — 5개 암부터
9. 상향식 자가진단 (`/symptom-check`)
10. 전체 암 목록 페이지 (`/cancers`)

### 3순위: 부가 기능
11. 뉴스 섹션 (`/news`)
12. 검진 기관 안내 (`/screening`)
13. 사이트맵, robots.txt, 구조화 데이터

---

## 중요 제약 사항

1. **모든 자가진단 결과에 면책 고지 필수**: "이 결과는 의학적 진단이 아닙니다. 증상이 지속되면 반드시 의료기관을 방문하세요."
2. **결과 데이터 서버 저장 금지** — 개인정보 이슈, 로그인 없이 동작
3. **외부 링크는 신뢰할 수 있는 의료기관만** — 국립암센터, 건강보험공단, 대한암학회
4. **모든 수치 데이터 출처 표기** — "국립암센터, 2024" 형식
5. **암 정보 페이지 각 2,000자 이상** — AdSense 심사 기준
6. **HTTPS 필수** — Vercel 자동 적용

---

## 참고 자료 폴더

이 프로젝트 폴더(`/기획/`) 안에 세부 문서 3개가 있다:
- `00_플랫폼_기획안.md` — 전체 기획, AdSense 전략, 로드맵
- `01_암_데이터_명세.md` — 13개 암 전체 체크리스트 문항·위험요인 상세
- `02_기술스택_및_GitHub_NextJS_세팅.md` — 전체 설정 파일 코드

원본 의료 데이터 출처: `/심층보고서/` 폴더 PDF 13개 (국립암센터 등 가이드라인 기반)
