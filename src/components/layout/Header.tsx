"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "홈" },
  { href: "/cancers", label: "암 정보" },
  { href: "/symptom-check", label: "증상으로 찾기" },
  { href: "/screening", label: "검진 안내" },
  { href: "/news", label: "뉴스" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold text-blue-700">
          질환 체크리스트
        </Link>
        <nav className="flex gap-1 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-1.5",
                pathname === item.href ? "bg-blue-100 text-blue-700" : "text-slate-700 hover:bg-slate-100"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
