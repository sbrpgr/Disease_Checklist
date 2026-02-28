export function ChecklistStep({
  question,
  hint,
  progress,
  onYes,
  onNo,
}: {
  question: string;
  hint?: string;
  progress: number;
  onYes: () => void;
  onNo: () => void;
}) {
  return (
    <section className="space-y-4 rounded-xl border bg-white p-5">
      <div className="h-2 w-full rounded-full bg-slate-100">
        <div className="h-2 rounded-full bg-blue-600" style={{ width: `${progress}%` }} />
      </div>
      <h2 className="text-xl font-semibold">{question}</h2>
      {hint ? <p className="text-sm text-slate-600">{hint}</p> : null}
      <div className="flex gap-3">
        <button type="button" onClick={onYes} className="rounded bg-blue-600 px-4 py-2 text-white">예</button>
        <button type="button" onClick={onNo} className="rounded border px-4 py-2">아니오</button>
      </div>
    </section>
  );
}
