export default function AboutPage() {
  return (
    <div className="space-y-6 rounded-xl border bg-white p-6 text-slate-700">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-900">서비스 소개</h1>
        <p className="text-sm leading-7">
          이 플랫폼은 암 초기증상, 위험요인, 검진 정보를 한 화면에서 이해할 수 있도록 구성한 공익형 건강 정보 서비스입니다.
          사용자가 현재 느끼는 증상과 개인 위험요인을 빠르게 점검하고, 어떤 경우에 즉시 진료가 필요한지 명확하게 확인할 수 있도록
          체크리스트와 경고 신호(Red Flag) 중심으로 콘텐츠를 설계했습니다.
        </p>
      </header>

      <section className="space-y-2 text-sm leading-7">
        <h2 className="text-lg font-semibold text-slate-900">운영 목적</h2>
        <p>
          건강 정보를 검색할 때 가장 큰 문제는 정보가 흩어져 있고, 개인이 자신의 상황에 맞는 우선순위를 판단하기 어렵다는 점입니다.
          본 서비스는 국가암검진 정보, 주요 학회/기관 권고안, 임상에서 반복적으로 확인되는 경고 증상을 바탕으로 핵심 내용을 구조화해
          제공함으로써, 사용자가 막연한 불안에 머무르지 않고 다음 행동을 결정하도록 돕는 것을 목표로 합니다.
        </p>
        <p>
          특히 혈변, 객혈, 황달, 진행성 연하곤란처럼 진료 지연 시 위험이 커질 수 있는 증상은 일반 체크리스트 점수와 별도로 즉시
          경고가 뜨도록 구성해 실질적인 행동 전환을 유도합니다.
        </p>
      </section>

      <section className="space-y-2 text-sm leading-7">
        <h2 className="text-lg font-semibold text-slate-900">콘텐츠 구성 원칙</h2>
        <p>
          1) 증상, 위험요인, 검진/진단 단계를 분리해 사용자가 현재 상태를 단계적으로 이해할 수 있도록 합니다.
          2) 병기별 생존율처럼 오해하기 쉬운 수치는 데이터 유무를 명시하고, 데이터가 없는 병기를 임의 추정하지 않습니다.
          3)
          모든 자가점검 결과는 참고 정보임을 명확히 표시하고, 진단 확정은 반드시 의료진 평가를 통해 이루어져야 한다는 점을
          반복적으로 고지합니다.
        </p>
      </section>

      <section className="space-y-2 text-sm leading-7">
        <h2 className="text-lg font-semibold text-slate-900">대상 사용자</h2>
        <p>
          본 서비스는 증상 확인이 필요한 일반 사용자, 가족의 증상을 대신 확인하는 보호자, 검진 일정과 후속 조치를 정리하려는
          사용자에게 적합합니다. 단, 급성 악화 증상(호흡곤란, 의식 저하, 대량 출혈 등)이 있는 경우에는 온라인 정보 확인보다 응급실
          방문이 우선입니다.
        </p>
      </section>

      <section className="space-y-2 text-sm leading-7">
        <h2 className="text-lg font-semibold text-slate-900">업데이트 정책</h2>
        <p>
          콘텐츠는 공개 가이드라인과 국가검진 제도 변경 사항을 반영해 주기적으로 업데이트합니다. 업데이트 날짜는 각 암종 페이지에서
          확인할 수 있으며, 통계 수치가 기관마다 다르게 제시될 수 있는 경우 범위 또는 참고 조건을 함께 표기합니다.
        </p>
      </section>
    </div>
  );
}
