import Link from "next/link";
import { newsItems } from "@/data/news";
import { AdUnit } from "@/components/layout/AdUnit";

export default function NewsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">뉴스 & 연구</h1>
      <ul className="space-y-3">
        {newsItems.map((item) => (
          <li key={item.slug} className="rounded-xl border bg-white p-4">
            <p className="text-xs text-slate-500">{item.publishedAt}</p>
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-sm text-slate-600">{item.summary}</p>
            <Link href={`/news/${item.slug}`} className="mt-2 inline-block text-sm text-blue-700">자세히 보기</Link>
          </li>
        ))}
      </ul>
      <AdUnit slot="2222222222" />
    </div>
  );
}
