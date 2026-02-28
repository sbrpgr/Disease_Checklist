export interface NewsItem {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
}

export const newsItems: NewsItem[] = [
  {
    slug: "national-screening-2026",
    title: "2026 국가암검진 대상자 확인 방법",
    summary: "국가검진 대상과 예약 경로를 한 번에 정리했습니다.",
    publishedAt: "2026-02-20",
  },
  {
    slug: "lung-ldct-guide",
    title: "폐암 저선량 CT 검진, 누가 받아야 할까",
    summary: "54~74세 고위험군 기준과 준비사항을 설명합니다.",
    publishedAt: "2026-02-18",
  },
  {
    slug: "colorectal-fit-guide",
    title: "대장암 FIT 양성 후 다음 단계",
    summary: "분변잠혈검사 이후 대장내시경까지의 표준 경로를 안내합니다.",
    publishedAt: "2026-02-15",
  },
];
