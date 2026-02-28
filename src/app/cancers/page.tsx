import Link from "next/link";
import { getAllCancers } from "@/data/cancers";
import { CancerCard } from "@/components/cancer/CancerCard";

export default function CancersPage() {
  const cancers = getAllCancers();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">13개 암종 정보</h1>
      <p className="text-slate-600">각 암종의 초기증상, Red Flag, 검진 정보를 확인할 수 있습니다.</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cancers.map((cancer) => (
          <CancerCard key={cancer.slug} cancer={cancer} />
        ))}
      </div>
      <Link href="/symptom-check" className="inline-block rounded bg-blue-600 px-4 py-2 text-white">증상 기반으로 찾기</Link>
    </div>
  );
}
