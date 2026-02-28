export function RedFlagAlert({ items }: { items: string[] }) {
  if (!items.length) return null;

  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4">
      <p className="font-semibold text-red-700">Red Flag 감지</p>
      <ul className="mt-2 list-disc pl-5 text-sm text-red-800">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
