import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllCancers, getCancerBySlug } from "@/data/cancers";
import { generateCancerMetadata } from "@/lib/metadata";
import { SurvivalRateChart } from "@/components/cancer/SurvivalRateChart";
import { RiskFactorList } from "@/components/cancer/RiskFactorList";
import { MedicalConditionSchema } from "@/components/common/StructuredData";
import { AdUnit } from "@/components/layout/AdUnit";

export function generateStaticParams() {
  return getAllCancers().map((cancer) => ({ slug: cancer.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cancer = getCancerBySlug(slug);
  if (!cancer) {
    return { title: "찾을 수 없는 암 정보" };
  }
  return generateCancerMetadata(cancer);
}

export default async function CancerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cancer = getCancerBySlug(slug);
  if (!cancer) notFound();

  const chartData = [
    cancer.fiveYearSurvival.stage1 !== undefined ? { stage: "1기", value: cancer.fiveYearSurvival.stage1 } : null,
    cancer.fiveYearSurvival.stage2 !== undefined ? { stage: "2기", value: cancer.fiveYearSurvival.stage2 } : null,
    cancer.fiveYearSurvival.stage3 !== undefined ? { stage: "3기", value: cancer.fiveYearSurvival.stage3 } : null,
    cancer.fiveYearSurvival.stage4 !== undefined ? { stage: "4기", value: cancer.fiveYearSurvival.stage4 } : null,
  ].filter((item): item is { stage: string; value: number } => item !== null);

  if (chartData.length === 0 && cancer.fiveYearSurvival.overall !== undefined) {
    chartData.push({ stage: "전체", value: cancer.fiveYearSurvival.overall });
  }

  return (
    <article className="space-y-8">
      <MedicalConditionSchema cancer={cancer} />
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{cancer.name} 초기증상 자가진단</h1>
        <p className="text-slate-600">{cancer.longDescription}</p>
        <p className="text-sm text-blue-700">핵심 통계: {cancer.keyStatistic}</p>
      </header>

      <section className="rounded-xl border bg-white p-5">
        <h2 className="text-lg font-semibold">초기증상</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
          {cancer.earlySymptoms.map((symptom) => (
            <li key={symptom.id}>{symptom.name}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-red-200 bg-red-50 p-5">
        <h2 className="text-lg font-semibold text-red-700">Red Flag</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-red-900">
          {cancer.redFlags.map((flag) => (
            <li key={flag.symptom}>{flag.symptom} · {flag.action}</li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-5">
          <h2 className="mb-3 text-lg font-semibold">위험요인</h2>
          <RiskFactorList factors={cancer.riskFactors} />
        </div>
        <div className="rounded-xl border bg-white p-5">
          <h2 className="mb-3 text-lg font-semibold">검진/진단</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {cancer.diagnosticTests.map((test) => (
              <li key={test.name}>{test.name}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-slate-700">{cancer.screeningGuide}</p>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">5년 생존율(참고)</h2>
        <SurvivalRateChart data={chartData} />
        <p className="text-xs text-slate-500">병기별 데이터가 없는 경우 해당 병기는 그래프에서 제외됩니다.</p>
      </section>

      <section className="rounded-xl border bg-white p-5">
        <h2 className="mb-2 text-lg font-semibold">참고 출처</h2>
        <ul className="list-disc pl-5 text-sm">
          {cancer.references.map((reference) => (
            <li key={reference}>{reference}</li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-slate-500">최종 업데이트: {cancer.lastUpdated}</p>
      </section>

      <section className="rounded-xl border bg-white p-5">
        <h2 className="mb-3 text-lg font-semibold">자가점검 시작</h2>
        <Link href={`/cancers/${cancer.slug}/check`} className="rounded bg-blue-600 px-4 py-2 text-white">
          {cancer.name} 체크리스트 시작
        </Link>
      </section>

      <section className="rounded-xl border bg-white p-5">
        <h3 className="mb-2 font-semibold">광고 영역</h3>
        <AdUnit slot="1111111111" />
      </section>
    </article>
  );
}
