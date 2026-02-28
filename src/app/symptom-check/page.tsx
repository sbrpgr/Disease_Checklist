import { BottomUpChecker } from "@/components/diagnosis/BottomUpChecker";

export default function SymptomCheckPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">증상 기반 상향식 자가진단</h1>
      <p className="text-sm text-slate-600">증상을 복수 선택하면 관련 암종을 우선순위로 제시합니다.</p>
      <BottomUpChecker />
    </div>
  );
}
