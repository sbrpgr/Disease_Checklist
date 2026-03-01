import { notFound } from "next/navigation";
import { newsItems } from "@/data/news";

export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.slug }));
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = newsItems.find((news) => news.slug === slug);
  if (!item) notFound();

  return (
    <article className="space-y-4 rounded-xl border bg-white p-6">
      <p className="text-xs text-slate-500">{item.publishedAt}</p>
      <h1 className="text-2xl font-bold">{item.title}</h1>
      <p className="text-slate-700">{item.summary}</p>
      <div className="space-y-3 text-sm leading-7 text-slate-700">
        {item.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
