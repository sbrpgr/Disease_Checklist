import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-slate-50">
      <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-8 text-sm text-slate-600 md:grid-cols-2">
        <p>질환 체크리스트 · 근거 기반 암 자가점검 플랫폼</p>
        <div className="flex gap-4 md:justify-end">
          <Link href="/about">소개</Link>
          <Link href="/privacy">개인정보처리방침</Link>
          <Link href="/terms">이용약관</Link>
          <Link href="/contact">문의</Link>
          <Link href="/disclaimer">면책</Link>
        </div>
      </div>
    </footer>
  );
}
