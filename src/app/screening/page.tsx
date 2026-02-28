export default function ScreeningPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">국가암검진 안내</h1>
      <div className="overflow-x-auto rounded-xl border bg-white p-4">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2">암종</th>
              <th className="py-2">대상</th>
              <th className="py-2">검사</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="py-2">대장암</td><td>50세 이상</td><td>분변잠혈검사(FIT)</td></tr>
            <tr className="border-b"><td className="py-2">유방암</td><td>40~69세 여성</td><td>유방촬영술</td></tr>
            <tr className="border-b"><td className="py-2">폐암</td><td>54~74세 고위험군</td><td>저선량 CT</td></tr>
            <tr><td className="py-2">간암</td><td>B/C형간염·간경변</td><td>초음파+AFP</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-slate-600">정확한 대상자 여부는 국민건강보험공단 안내를 확인하세요.</p>
    </div>
  );
}
