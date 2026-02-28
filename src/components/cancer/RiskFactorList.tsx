export function RiskFactorList({ factors }: { factors: Array<{ factor: string }> }) {
  return (
    <ul className="space-y-2 text-sm">
      {factors.map((f) => (
        <li key={f.factor} className="rounded border bg-white px-3 py-2">{f.factor}</li>
      ))}
    </ul>
  );
}
