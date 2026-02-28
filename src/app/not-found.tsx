import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4 rounded-xl border bg-white p-8 text-center">
      <h1 className="text-3xl font-bold">404</h1>
      <p>요청하신 페이지를 찾을 수 없습니다.</p>
      <Link href="/" className="inline-block rounded bg-blue-600 px-4 py-2 text-white">홈으로 이동</Link>
    </div>
  );
}
