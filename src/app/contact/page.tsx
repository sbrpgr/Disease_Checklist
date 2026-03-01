export default function ContactPage() {
  return (
    <div className="space-y-4 rounded-xl border bg-white p-6">
      <h1 className="text-2xl font-bold text-slate-900">문의</h1>
      <p className="text-sm leading-7 text-slate-700">
        서비스 오류 제보, 콘텐츠 정정 요청, 광고/제휴 문의는 아래 운영 메일로 접수해 주세요. 접수 시 제목에 문의 유형(오류, 콘텐츠,
        정책, 기타)을 함께 적어 주시면 처리 시간이 단축됩니다.
      </p>
      <p className="rounded-lg bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800">contact@domeineduplatform.vercel.app</p>
      <p className="text-xs leading-6 text-slate-500">
        의료 상담이나 응급 상황 문의는 본 메일로 대응할 수 없습니다. 응급 증상이 있는 경우 즉시 119 또는 가까운 응급실을 이용해
        주세요.
      </p>
    </div>
  );
}
