# 기술 스택 및 개발 환경 세팅 가이드

> GitHub: https://github.com/sbrpgr/Disease_Checklist
> 프레임워크: Next.js 15 (App Router)
> 패키지 매니저: npm

---

## 1. GitHub 레포지토리 세팅

### 1.1 레포지토리 기본 구성

```
Repository: sbrpgr/Disease_Checklist
Description: 질환 체크리스트 — 근거 기반 암 자가진단 플랫폼
Topics: nextjs, healthcare, cancer, self-diagnosis, korea, typescript
Visibility: Public
```

### 1.2 브랜치 전략

```
main          ← 프로덕션 배포 브랜치 (보호됨)
develop       ← 개발 통합 브랜치
feature/*     ← 기능 개발 브랜치 (예: feature/symptom-checker)
fix/*         ← 버그 수정 브랜치 (예: fix/checklist-scoring)
content/*     ← 콘텐츠 추가 브랜치 (예: content/lung-cancer-page)
```

### 1.3 브랜치 보호 규칙 (main)
- Require pull request reviews before merging
- Require status checks to pass before merging
- Include administrators

### 1.4 .gitignore (주요 항목)

```gitignore
# Next.js
.next/
out/

# Node
node_modules/
npm-debug.log*

# 환경변수 (절대 커밋 금지)
.env
.env.local
.env.production

# 빌드
.vercel
dist/

# OS
.DS_Store
Thumbs.db
```

---

## 2. Next.js 15 프로젝트 구조

### 2.1 초기 생성 명령어

```bash
npx create-next-app@latest disease-checklist \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

### 2.2 전체 폴더 구조

```
disease-checklist/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (main)/                   # 메인 레이아웃 그룹
│   │   │   ├── layout.tsx            # 헤더/푸터 포함 레이아웃
│   │   │   ├── page.tsx              # 홈페이지
│   │   │   ├── about/
│   │   │   │   └── page.tsx          # 소개 (AdSense 필수)
│   │   │   ├── contact/
│   │   │   │   └── page.tsx          # 문의 (AdSense 필수)
│   │   │   ├── privacy/
│   │   │   │   └── page.tsx          # 개인정보처리방침 (AdSense 필수)
│   │   │   ├── terms/
│   │   │   │   └── page.tsx          # 이용약관
│   │   │   └── disclaimer/
│   │   │       └── page.tsx          # 의료 면책 고지
│   │   │
│   │   ├── cancers/                  # 암 정보 섹션
│   │   │   ├── page.tsx              # 암 목록 (13종)
│   │   │   └── [slug]/
│   │   │       ├── page.tsx          # 암 상세 정보 (SEO 핵심 페이지)
│   │   │       └── check/
│   │   │           └── page.tsx      # 하향식 자가진단 체크리스트
│   │   │
│   │   ├── symptom-check/            # 상향식 자가진단
│   │   │   └── page.tsx
│   │   │
│   │   ├── news/                     # 뉴스 & 연구
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── screening/                # 검진 기관 안내
│   │   │   └── page.tsx
│   │   │
│   │   ├── api/                      # API Routes
│   │   │   └── contact/
│   │   │       └── route.ts          # 문의 폼 처리
│   │   │
│   │   ├── sitemap.ts                # 자동 사이트맵 생성
│   │   ├── robots.ts                 # robots.txt 생성
│   │   ├── layout.tsx                # 루트 레이아웃
│   │   ├── not-found.tsx             # 404 커스텀 페이지
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/                       # shadcn/ui 기본 컴포넌트
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── progress.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Disclaimer.tsx        # 하단 고정 면책 고지
│   │   │   └── AdUnit.tsx            # Google AdSense 광고 단위
│   │   │
│   │   ├── diagnosis/
│   │   │   ├── TopDownChecker.tsx    # 하향식 자가진단 컴포넌트
│   │   │   ├── BottomUpChecker.tsx   # 상향식 자가진단 컴포넌트
│   │   │   ├── ChecklistStep.tsx     # 체크리스트 단계 컴포넌트
│   │   │   ├── ResultCard.tsx        # 진단 결과 카드
│   │   │   ├── RedFlagAlert.tsx      # Red Flag 경고 컴포넌트
│   │   │   ├── BodyPartSelector.tsx  # 신체 부위 선택기
│   │   │   └── SymptomSearch.tsx     # 증상 검색 (Fuse.js)
│   │   │
│   │   ├── cancer/
│   │   │   ├── CancerCard.tsx        # 암 목록 카드
│   │   │   ├── CancerInfo.tsx        # 암 상세 정보 섹션
│   │   │   ├── SurvivalRateChart.tsx # 병기별 생존율 차트
│   │   │   └── RiskFactorList.tsx    # 위험요인 목록
│   │   │
│   │   └── common/
│   │       ├── SearchBar.tsx
│   │       ├── NewsCard.tsx
│   │       └── StructuredData.tsx    # JSON-LD 구조화 데이터
│   │
│   ├── data/                         # 정적 데이터
│   │   ├── cancers/
│   │   │   ├── index.ts              # 모든 암 목록 export
│   │   │   ├── liver.ts              # 간암 데이터
│   │   │   ├── thyroid.ts            # 갑상선암 데이터
│   │   │   ├── ovarian.ts            # 난소암 데이터
│   │   │   ├── gallbladder.ts        # 담낭암 데이터
│   │   │   ├── colorectal.ts         # 대장암 데이터
│   │   │   ├── bladder.ts            # 방광암 데이터
│   │   │   ├── leukemia.ts           # 백혈병 데이터
│   │   │   ├── esophageal.ts         # 식도암 데이터
│   │   │   ├── kidney.ts             # 신장암 데이터
│   │   │   ├── breast.ts             # 유방암 데이터
│   │   │   ├── prostate.ts           # 전립선암 데이터
│   │   │   ├── lung.ts               # 폐암 데이터
│   │   │   └── skin.ts               # 피부암 데이터
│   │   │
│   │   └── symptoms/
│   │       └── symptom-cancer-map.ts # 증상→암 매핑 데이터
│   │
│   ├── types/
│   │   ├── cancer.ts                 # Cancer, Symptom, ChecklistItem 타입
│   │   └── news.ts                   # News 타입
│   │
│   ├── lib/
│   │   ├── utils.ts                  # cn() 등 유틸리티
│   │   ├── diagnosis.ts              # 진단 점수 계산 로직
│   │   └── metadata.ts               # 동적 메타데이터 생성 유틸
│   │
│   └── content/                      # MDX 뉴스/칼럼 콘텐츠
│       └── news/
│           └── *.mdx
│
├── public/
│   ├── images/
│   │   ├── cancers/                  # 암별 OG 이미지
│   │   └── icons/
│   └── robots.txt                    # (또는 app/robots.ts로 생성)
│
├── .env.example                      # 환경변수 예시 (커밋 가능)
├── .env.local                        # 실제 환경변수 (커밋 금지)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── components.json                   # shadcn/ui 설정
└── package.json
```

---

## 3. 핵심 설정 파일

### 3.1 next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 한국어 SEO 최적화
  i18n: {
    locales: ["ko"],
    defaultLocale: "ko",
  },

  // 이미지 최적화
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },

  // 보안 헤더
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
```

### 3.2 tailwind.config.ts (색상 테마)

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#2563EB",    // 메인 블루
          light: "#EFF6FF",
        },
        risk: {
          low:    "#16A34A",    // 위험도 낮음 (그린)
          medium: "#D97706",    // 위험도 중간 (앰버)
          high:   "#DC2626",    // 위험도 높음 (레드)
          flag:   "#7C3AED",    // Red Flag (퍼플)
        },
      },
      fontFamily: {
        sans: ["Pretendard Variable", "Pretendard", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

### 3.3 환경변수 (.env.example)

```bash
# Google AdSense (공개 값)
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXX

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# 사이트 정보
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=질환 체크리스트

# 문의 폼 (이메일 서비스, 선택)
# RESEND_API_KEY=re_xxxx
# CONTACT_EMAIL=contact@your-domain.com
```

---

## 4. 필수 패키지 설치

```bash
# shadcn/ui 초기화
npx shadcn@latest init

# shadcn/ui 컴포넌트 설치
npx shadcn@latest add button card badge progress tabs accordion alert

# 차트 (생존율, 위험도 시각화)
npm install recharts

# 증상 퍼지 검색
npm install fuse.js

# 애니메이션 (체크리스트 전환)
npm install framer-motion

# 폼 처리
npm install react-hook-form zod @hookform/resolvers

# MDX 뉴스 콘텐츠
npm install @next/mdx @mdx-js/loader @mdx-js/react

# 유틸리티
npm install clsx tailwind-merge lucide-react

# Pretendard 폰트
npm install pretendard
```

---

## 5. 핵심 타입 정의

### src/types/cancer.ts

```typescript
export type RiskLevel = "low" | "medium" | "high";
export type Urgency = "immediate" | "within_48h" | "within_1week" | "within_2weeks" | "within_4weeks";
export type Gender = "all" | "male" | "female" | "male_dominant" | "female_dominant";

export interface Symptom {
  id: string;
  name: string;
  description: string;
  bodyPart: string[];
  ppv?: number;           // 양성예측도 (%)
  frequency?: number;     // 환자군 발생률 (%)
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
  weight: number;          // 1~5 (위험도 가중치)
  isRedFlag: boolean;
  relatedSymptoms?: string[];
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

  bodyParts: string[];       // 상향식 진단 매핑용
  symptomTags: string[];     // 상향식 진단 매핑용

  references: string[];
  lastUpdated: string;
  reviewNote: string;        // "국립암센터 가이드라인 기반" 등
}
```

---

## 6. AdSense 컴포넌트

### src/components/layout/AdUnit.tsx

```typescript
"use client";

import { useEffect } from "react";

interface AdUnitProps {
  slot: string;
  format?: "auto" | "rectangle" | "vertical" | "horizontal";
  className?: string;
}

export function AdUnit({ slot, format = "auto", className }: AdUnitProps) {
  const adSenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  useEffect(() => {
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  if (!adSenseId) return null;

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adSenseId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
```

### AdSense 스크립트 (app/layout.tsx)

```typescript
import Script from "next/script";

// <head>에 추가
<Script
  async
  src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
  crossOrigin="anonymous"
  strategy="afterInteractive"
/>
```

---

## 7. SEO / 구조화 데이터

### src/lib/metadata.ts

```typescript
import type { Metadata } from "next";
import { Cancer } from "@/types/cancer";

const SITE_NAME = "질환 체크리스트";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com";

export function generateCancerMetadata(cancer: Cancer): Metadata {
  return {
    title: `${cancer.name} 초기증상 자가진단 체크리스트 | ${SITE_NAME}`,
    description: `${cancer.name} 초기증상 ${cancer.earlySymptoms.length}가지와 위험요인을 확인하세요. 근거 기반 자가진단 체크리스트로 ${cancer.name} 가능성을 점검해보세요.`,
    keywords: [
      `${cancer.name} 초기증상`,
      `${cancer.name} 자가진단`,
      `${cancer.name} 증상 체크리스트`,
      `${cancer.name} 위험요인`,
    ],
    openGraph: {
      title: `${cancer.name} 초기증상 자가진단 | ${SITE_NAME}`,
      description: cancer.description,
      url: `${SITE_URL}/cancers/${cancer.slug}`,
      siteName: SITE_NAME,
      locale: "ko_KR",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/images/cancers/${cancer.slug}-og.png`,
          width: 1200,
          height: 630,
          alt: `${cancer.name} 자가진단`,
        },
      ],
    },
    alternates: {
      canonical: `${SITE_URL}/cancers/${cancer.slug}`,
    },
  };
}
```

### MedicalCondition JSON-LD (암 페이지)

```typescript
// src/components/common/StructuredData.tsx
export function MedicalConditionSchema({ cancer }: { cancer: Cancer }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: cancer.name,
    alternateName: cancer.nameEn,
    description: cancer.longDescription,
    signOrSymptom: cancer.earlySymptoms.map((s) => ({
      "@type": "MedicalSymptom",
      name: s.name,
      description: s.description,
    })),
    riskFactor: cancer.riskFactors.map((r) => ({
      "@type": "MedicalRiskFactor",
      name: r.factor,
    })),
    relevantSpecialty: {
      "@type": "MedicalSpecialty",
      name: "Oncology",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

---

## 8. 자가진단 점수 계산 로직

### src/lib/diagnosis.ts

```typescript
import { Cancer, ChecklistItem, RiskLevel } from "@/types/cancer";

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

  let riskLevel: RiskLevel = "low";
  let recommendation: string;
  let recommendedAction: DiagnosisResult["recommendedAction"];

  if (hasRedFlag) {
    riskLevel = "high";
    recommendation = "즉시 의료기관을 방문하시기 바랍니다. 경고 증상이 확인되었습니다.";
    recommendedAction = "urgent";
  } else if (percentage >= 60) {
    riskLevel = "high";
    recommendation = "여러 증상과 위험요인이 확인되었습니다. 가까운 시일 내 의사와 상담하세요.";
    recommendedAction = "see_doctor";
  } else if (percentage >= 35) {
    riskLevel = "medium";
    recommendation = "일부 증상이 확인되었습니다. 증상이 지속되면 의료기관을 방문하세요.";
    recommendedAction = "see_doctor";
  } else {
    riskLevel = "low";
    recommendation = "현재 주요 증상은 확인되지 않았습니다. 정기 검진을 통해 건강을 관리하세요.";
    recommendedAction = "observe";
  }

  return {
    score,
    maxScore,
    percentage,
    riskLevel,
    hasRedFlag,
    redFlagItems,
    recommendation,
    recommendedAction,
  };
}
```

---

## 9. Vercel 배포 설정

### vercel.json

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, stale-while-revalidate=86400"
        }
      ]
    },
    {
      "source": "/cancers/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=86400, stale-while-revalidate=604800"
        }
      ]
    }
  ]
}
```

### 배포 순서
1. GitHub 레포에 코드 push (`main` 브랜치)
2. [vercel.com](https://vercel.com) → "Import Project" → GitHub 연결
3. Environment Variables 설정:
   - `NEXT_PUBLIC_ADSENSE_ID`
   - `NEXT_PUBLIC_GA_ID`
   - `NEXT_PUBLIC_SITE_URL`
4. "Deploy" 클릭 → 자동 HTTPS 적용

---

## 10. 개발 시작 명령어

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드 테스트
npm run build && npm run start

# 타입 검사
npx tsc --noEmit

# 린트 검사
npm run lint
```

---

## 11. Phase 1 MVP 개발 체크리스트

### 프로젝트 세팅
- [ ] GitHub 레포 생성 및 초기 커밋
- [ ] Next.js 15 + TypeScript + Tailwind 초기화
- [ ] shadcn/ui 초기화 및 기본 컴포넌트 설치
- [ ] Pretendard 폰트 적용
- [ ] 색상 테마 설정 (tailwind.config.ts)
- [ ] 헤더/푸터 컴포넌트
- [ ] 404 커스텀 페이지
- [ ] 면책 고지 하단 고정

### 콘텐츠 페이지 (AdSense 심사용)
- [ ] 홈페이지 (`/`)
- [ ] 간암 정보 페이지 (`/cancers/liver`)
- [ ] 폐암 정보 페이지 (`/cancers/lung`)
- [ ] 대장암 정보 페이지 (`/cancers/colorectal`)
- [ ] 유방암 정보 페이지 (`/cancers/breast`)
- [ ] 전립선암 정보 페이지 (`/cancers/prostate`)
- [ ] 나머지 8개 암 정보 페이지
- [ ] About 페이지 (`/about`)
- [ ] Privacy 페이지 (`/privacy`)
- [ ] Terms 페이지 (`/terms`)
- [ ] Disclaimer 페이지 (`/disclaimer`)
- [ ] Contact 페이지 (`/contact`)

### 자가진단 기능 (Phase 1: 5개 암)
- [ ] 하향식 자가진단 — 대장암
- [ ] 하향식 자가진단 — 폐암
- [ ] 하향식 자가진단 — 유방암
- [ ] 하향식 자가진단 — 전립선암
- [ ] 하향식 자가진단 — 피부암 (ABCDE)
- [ ] 진단 결과 페이지

### SEO
- [ ] 동적 메타 태그 (모든 페이지)
- [ ] JSON-LD 구조화 데이터 (MedicalCondition)
- [ ] 사이트맵 자동 생성
- [ ] robots.txt
- [ ] OG 이미지

### 배포
- [ ] Vercel 배포 (main 브랜치)
- [ ] 도메인 연결
- [ ] Google Analytics 연동
- [ ] Google AdSense 심사 신청
```
