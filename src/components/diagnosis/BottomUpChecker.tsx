"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { symptomCancerMap } from "@/data/symptoms/symptom-cancer-map";
import { getCancerBySlug } from "@/data/cancers";

export function BottomUpChecker() {
  const symptoms = Object.keys(symptomCancerMap);
  const [selected, setSelected] = useState<string[]>([]);

  const candidates = useMemo(() => {
    const counts: Record<string, number> = {};
    selected.forEach((symptom) => {
      symptomCancerMap[symptom].forEach((slug) => {
        counts[slug] = (counts[slug] || 0) + 1;
      });
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([slug, score]) => ({ cancer: getCancerBySlug(slug), score }))
      .filter((item) => item.cancer);
  }, [selected]);

  const toggle = (symptom: string) => {
    setSelected((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {symptoms.map((symptom) => (
          <button
            key={symptom}
            type="button"
            onClick={() => toggle(symptom)}
            className={`rounded-lg border px-3 py-2 text-left text-sm ${
              selected.includes(symptom) ? "border-blue-600 bg-blue-50" : "border-slate-200 bg-white"
            }`}
          >
            {symptom}
          </button>
        ))}
      </div>

      <section className="space-y-3 rounded-xl border bg-white p-4">
        <h3 className="font-semibold">관련 암종</h3>
        {candidates.length === 0 ? (
          <p className="text-sm text-slate-600">증상을 선택하면 관련 암종이 표시됩니다.</p>
        ) : (
          <ul className="space-y-2">
            {candidates.map(({ cancer, score }) => (
              <li key={cancer!.slug} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">{cancer!.name}</p>
                  <p className="text-xs text-slate-500">연관 증상 {score}개 일치</p>
                </div>
                <Link href={`/cancers/${cancer!.slug}/check`} className="rounded bg-blue-600 px-3 py-1.5 text-xs text-white">
                  체크리스트
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
