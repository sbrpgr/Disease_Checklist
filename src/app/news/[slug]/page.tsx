import { notFound } from "next/navigation";
import { newsItems } from "@/data/news";

export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.slug }));
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const item = newsItems.find((news) => news.slug === params.slug);
  if (!item) notFound();

  return (
    <article className="space-y-4 rounded-xl border bg-white p-6">
      <p className="text-xs text-slate-500">{item.publishedAt}</p>
      <h1 className="text-2xl font-bold">{item.title}</h1>
      <p className="text-slate-700">{item.summary}</p>
      <p className="text-sm text-slate-600">
        이 페이지는 실제 운영 시 MDX/콘텐츠 CMS로 확장 가능한 뉴스 템플릿입니다.
      </p>
    </article>
  );
}
