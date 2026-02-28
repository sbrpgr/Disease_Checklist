import Link from "next/link";
import { AdUnit } from "@/components/layout/AdUnit";
import { getAllCancers } from "@/data/cancers";

export default function HomePage() {
  const cancers = getAllCancers();

  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-blue-700">근거 기반 암 자가점검</p>
        <h1 className="mt-2 text-3xl font-bold">증상이 걱정될 때, 신뢰할 수 있는 첫 체크포인트</h1>
        <p className="mt-3 text-slate-600">
          하향식(암종 선택)과 상향식(증상 선택) 두 경로로 13개 암종을 점검할 수 있습니다.
        </p>
        <div className="mt-5 flex gap-3">
          <Link href="/symptom-check" className="rounded bg-blue-600 px-4 py-2 text-white">증상으로 시작</Link>
          <Link href="/cancers" className="rounded border px-4 py-2">암종으로 시작</Link>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">주요 암종</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cancers.map((c) => (
            <Link key={c.slug} href={`/cancers/${c.slug}`} className="rounded-xl border bg-white p-4 hover:border-blue-300">
              <p className="font-semibold">{c.name}</p>
              <p className="mt-2 text-sm text-slate-600">{c.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-xl border bg-white p-4">
        <h2 className="mb-2 text-lg font-semibold">서비스 안내</h2>
        <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-700">
          <li>증상 또는 암종을 선택합니다.</li>
          <li>체크리스트에 답변합니다.</li>
          <li>위험도 결과와 권장 행동을 확인합니다.</li>
        </ol>
      </section>

      <section className="rounded-xl border bg-white p-4">
        <h2 className="mb-2 text-lg font-semibold">광고 영역 (홈페이지만 노출)</h2>
        <AdUnit slot="0000000000" />
      </section>
    </div>
  );
}
