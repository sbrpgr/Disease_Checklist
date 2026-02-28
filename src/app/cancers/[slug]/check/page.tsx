import { notFound } from "next/navigation";
import { getAllCancers, getCancerBySlug } from "@/data/cancers";
import { TopDownChecker } from "@/components/diagnosis/TopDownChecker";

export function generateStaticParams() {
  return getAllCancers().map((cancer) => ({ slug: cancer.slug }));
}

export default function CancerCheckPage({ params }: { params: { slug: string } }) {
  const cancer = getCancerBySlug(params.slug);
  if (!cancer) notFound();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{cancer.name} 자가진단 체크리스트</h1>
      <p className="text-sm text-slate-600">자가진단 진행 중 페이지에는 광고를 노출하지 않습니다.</p>
      <TopDownChecker cancer={cancer} />
    </div>
  );
}
