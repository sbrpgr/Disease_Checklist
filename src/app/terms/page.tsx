export default function TermsPage() {
  return (
    <div className="space-y-6 rounded-xl border bg-white p-6 text-slate-700">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-900">이용약관</h1>
        <p className="text-sm leading-7">
          본 약관은 질환 체크리스트 서비스의 이용 조건, 권리와 의무, 책임 제한 사항을 규정합니다.
        </p>
      </header>

      <section className="space-y-2 text-sm leading-7">
        <h2 className="text-lg font-semibold text-slate-900">1. 서비스 목적과 범위</h2>
        <p>
          서비스는 암 관련 건강 정보를 제공하고 증상 점검을 보조하는 온라인 정보 서비스입니다. 본 서비스는 의료법상 진단, 처방,
          치료행위를 제공하지 않으며, 이용자는 이를 인지한 상태에서 서비스 결과를 참고 자료로만 활용해야 합니다.
        </p>
      </section>

      <section className="space-y-2 text-sm leading-7">
        <h2 className="text-lg font-semibold text-slate-900">2. 이용자의 의무</h2>
        <p>
          이용자는 사실에 기반하여 정보를 입력해야 하며, 서비스의 정상 운영을 방해하는 행위를 해서는 안 됩니다. 자동화된 비정상 요청,
          악성 스크립트 삽입, 허위 신고, 타인 사칭 등은 제한될 수 있습니다. 응급 또는 중증 의심 상황에서는 즉시 의료기관을 이용해야
          하며, 서비스 이용으로 진료를 지연해서는 안 됩니다.
        </p>
      </section>

      <section className="space-y-2 text-sm leading-7">
        <h2 className="text-lg font-semibold text-slate-900">3. 지식재산권</h2>
        <p>
          서비스 내 텍스트, 구조화 데이터, UI 구성, 로고 등은 운영자 또는 정당한 권리자의 자산입니다. 법령이 허용하는 범위를 제외한
          무단 복제, 재배포, 상업적 전재는 제한될 수 있습니다. 인용이 필요한 경우 출처를 명확히 표시해야 합니다.
        </p>
      </section>

      <section className="space-y-2 text-sm leading-7">
        <h2 className="text-lg font-semibold text-slate-900">4. 책임의 제한</h2>
        <p>
          운영자는 서비스의 정확성 향상을 위해 노력하지만, 의학 정보의 시차, 개인별 임상 차이, 외부 환경 변수로 인해 결과의 완전성을
          보장할 수 없습니다. 이용자가 서비스 내용을 절대적 기준으로 해석하여 발생한 손해에 대해 운영자는 법령이 허용하는 범위 내에서
          책임을 제한할 수 있습니다.
        </p>
      </section>

      <section className="space-y-2 text-sm leading-7">
        <h2 className="text-lg font-semibold text-slate-900">5. 약관의 변경</h2>
        <p>
          운영자는 관련 법령 개정, 서비스 정책 변경, 보안 개선 필요가 있는 경우 약관을 수정할 수 있습니다. 중요 변경 사항은 시행 전에
          서비스 내 공지하며, 변경 이후 서비스를 계속 이용하는 경우 개정 약관에 동의한 것으로 봅니다.
        </p>
      </section>

      <section className="space-y-2 text-sm leading-7">
        <h2 className="text-lg font-semibold text-slate-900">6. 준거법 및 시행일</h2>
        <p>본 약관은 대한민국 법령을 준거법으로 하며, 시행일은 2026년 3월 1일입니다.</p>
      </section>
    </div>
  );
}
