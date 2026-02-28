import Link from "next/link";
import type { Cancer } from "@/types/cancer";

export function CancerCard({ cancer }: { cancer: Cancer }) {
  return (
    <article className="rounded-xl border bg-white p-4">
      <h3 className="text-lg font-semibold">{cancer.name}</h3>
      <p className="mt-2 text-sm text-slate-600">{cancer.description}</p>
      <div className="mt-3 flex gap-2">
        <Link href={`/cancers/${cancer.slug}`} className="rounded border px-3 py-1.5 text-xs">상세정보</Link>
        <Link href={`/cancers/${cancer.slug}/check`} className="rounded bg-blue-600 px-3 py-1.5 text-xs text-white">자가점검</Link>
      </div>
    </article>
  );
}
