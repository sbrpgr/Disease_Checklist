"use client";

import { useMemo, useState } from "react";

export function SearchBar({
  placeholder,
  onSearch,
}: {
  placeholder?: string;
  onSearch: (value: string) => void;
}) {
  const [value, setValue] = useState("");
  const normalized = useMemo(() => value.trim(), [value]);

  return (
    <div className="flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder || "검색"}
        className="w-full rounded border px-3 py-2"
      />
      <button
        type="button"
        onClick={() => onSearch(normalized)}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        검색
      </button>
    </div>
  );
}
