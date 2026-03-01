"use client";

import { useMemo, useState } from "react";
import type { Cancer } from "@/types/cancer";
import { calculateDiagnosisScore } from "@/lib/diagnosis";
import { ChecklistStep } from "./ChecklistStep";
import { ResultCard } from "./ResultCard";
import { RedFlagAlert } from "./RedFlagAlert";

export function TopDownChecker({ cancer }: { cancer: Cancer }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const result = useMemo(() => calculateDiagnosisScore(cancer, answers), [cancer, answers]);
  const isDone = step >= cancer.checklist.length;
  const isInterrupted = result.hasRedFlag;
  const isFinished = isDone || isInterrupted;
  const current = !isFinished ? cancer.checklist[step] : null;

  const onAnswer = (value: boolean) => {
    if (!current || isFinished) return;
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
    setStep((s) => s + 1);
  };

  return (
    <div className="space-y-4">
      {!isFinished && current ? (
        <ChecklistStep
          question={current.question}
          hint={current.hint}
          progress={(step / cancer.checklist.length) * 100}
          onYes={() => onAnswer(true)}
          onNo={() => onAnswer(false)}
        />
      ) : (
        <ResultCard result={result} />
      )}

      {result.hasRedFlag && <RedFlagAlert items={result.redFlagItems} />}
    </div>
  );
}
