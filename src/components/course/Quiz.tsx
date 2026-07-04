"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, ChevronRight, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizQuestion } from "@/types/course";

interface QuizProps {
  preguntas: QuizQuestion[];
  moduloTitulo: string;
  moduloSlug: string;
  onComplete: (score: number, total: number) => void;
}

export default function Quiz({ preguntas, moduloTitulo, moduloSlug, onComplete }: QuizProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(preguntas.length).fill(null));
  const [finished, setFinished] = useState(false);

  const question = preguntas[current];
  const isCorrect = selected === question.respuestaCorrecta;

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);
    const newAnswers = [...answers];
    newAnswers[current] = index;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (current < preguntas.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      const correctCount = answers.filter((a, i) => a === preguntas[i].respuestaCorrecta).length;
      onComplete(correctCount, preguntas.length);
      setFinished(true);
    }
  };

  if (finished) {
    const correctCount = answers.filter((a, i) => a === preguntas[i].respuestaCorrecta).length;
    const percent = Math.round((correctCount / preguntas.length) * 100);
    const passed = percent >= 70;

    return (
      <div className="text-center py-8">
        <div className={cn(
          "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6",
          passed ? "bg-success/10" : "bg-red-500/10"
        )}>
          <Trophy size={40} className={passed ? "text-success" : "text-red-400"} />
        </div>
        <h2 className="text-2xl font-bold text-zinc-100 mb-2">
          {passed ? "Examen aprobado!" : "Sigue intentando"}
        </h2>
        <p className="text-zinc-500 mb-4">
          {correctCount} de {preguntas.length} respuestas correctas ({percent}%)
        </p>
        {passed ? (
          <p className="text-success mb-6">
            Felicitaciones! Has aprobado el examen de {moduloTitulo}.
          </p>
        ) : (
          <p className="text-zinc-400 mb-6">
            Necesitas al menos 70% para aprobar. Repasa las lecciones e intenta de nuevo.
          </p>
        )}
        <a
          href={`/curso/${moduloSlug}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
        >
          Volver al modulo
          <ChevronRight size={16} />
        </a>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-zinc-500">
          Pregunta {current + 1} de {preguntas.length}
        </span>
        <div className="w-32 h-1.5 bg-dark-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${((current + 1) / preguntas.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h3 className="text-lg font-semibold text-zinc-100 mb-6">
        {question.pregunta}
      </h3>

      {/* Options */}
      <div className="space-y-3">
        {question.opciones.map((opcion, index) => {
          const isSelected = selected === index;
          const isOptionCorrect = index === question.respuestaCorrecta;
          const showCorrect = showResult && isOptionCorrect;
          const showWrong = showResult && isSelected && !isOptionCorrect;

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={showResult}
              className={cn(
                "w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all",
                showCorrect && "border-success bg-success/10",
                showWrong && "border-red-500 bg-red-500/10",
                !showResult && !isSelected && "border-zinc-700/50 bg-dark-800/50 hover:border-zinc-600 hover:bg-dark-700/50",
                !showResult && isSelected && "border-primary bg-primary/10",
                showResult && !showCorrect && !showWrong && "border-zinc-800 bg-dark-800/30 opacity-50"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium",
                showCorrect && "bg-success text-white",
                showWrong && "bg-red-500 text-white",
                !showResult && "bg-dark-700 text-zinc-400",
                showResult && !showCorrect && !showWrong && "bg-dark-700 text-zinc-600"
              )}>
                {showCorrect ? <CheckCircle2 size={16} /> : showWrong ? <XCircle size={16} /> : String.fromCharCode(65 + index)}
              </div>
              <span className={cn(
                "text-sm",
                showCorrect && "text-success font-medium",
                showWrong && "text-red-400",
                !showResult && "text-zinc-300",
                showResult && !showCorrect && !showWrong && "text-zinc-600"
              )}>
                {opcion}
              </span>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showResult && (
        <div className={cn(
          "mt-6 p-4 rounded-xl border",
          isCorrect ? "border-success/30 bg-success/5" : "border-red-500/30 bg-red-500/5"
        )}>
          <p className={cn("text-sm font-medium mb-1", isCorrect ? "text-success" : "text-red-400")}>
            {isCorrect ? "Correcto!" : "Incorrecto"}
          </p>
          <p className="text-sm text-zinc-400">{question.explicacion}</p>
        </div>
      )}

      {/* Next button */}
      {showResult && (
        <button
          onClick={handleNext}
          className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
        >
          {current < preguntas.length - 1 ? "Siguiente pregunta" : "Ver resultados"}
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}
