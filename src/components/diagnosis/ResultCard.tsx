import type { DiagnosisResult } from "@/lib/diagnosis";

const labelMap = {
  low: "낮음",
  medium: "중간",
  high: "높음",
};

export function ResultCard({ result }: { result: DiagnosisResult }) {
  const color = result.riskLevel === "high" ? "text-red-600" : result.riskLevel === "medium" ? "text-amber-600" : "text-green-600";

  return (
    <section className="space-y-3 rounded-xl border bg-white p-5">
      <h2 className="text-xl font-bold">자가점검 결과</h2>
      <p className={`text-lg font-semibold ${color}`}>위험도: {labelMap[result.riskLevel]}</p>
      <p className="text-sm text-slate-700">점수 {result.score}/{result.maxScore} ({result.percentage.toFixed(1)}%)</p>
      <p className="text-sm">{result.recommendation}</p>
      <p className="rounded bg-amber-50 p-2 text-xs text-amber-900">이 결과는 의학적 진단이 아닙니다. 증상이 지속되면 반드시 의료기관을 방문하세요.</p>
    </section>
  );
}
