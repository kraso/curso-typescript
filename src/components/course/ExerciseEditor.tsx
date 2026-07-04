"use client";

import { useState, useCallback, lazy, Suspense } from "react";
import { Play, RotateCcw, Copy, Check } from "lucide-react";
import * as ts from "typescript";
import { cn } from "@/lib/utils";
import type { Exercise } from "@/types/course";

const Editor = lazy(() => import("@monaco-editor/react"));

interface ExerciseEditorProps {
  exercise: Exercise;
  onComplete?: () => void;
}

export default function ExerciseEditor({ exercise, onComplete }: ExerciseEditorProps) {
  const [code, setCode] = useState(exercise.codigoInicial);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [testsPassed, setTestsPassed] = useState<boolean | null>(null);

  const handleRun = useCallback(() => {
    setIsRunning(true);
    setOutput([]);
    setTestsPassed(null);

    const logs: string[] = [];
    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args: unknown[]) => {
      logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" "));
    };
    console.error = (...args: unknown[]) => {
      logs.push("[ERROR] " + args.map((a) => String(a)).join(" "));
    };

    try {
      // Transpile TypeScript to JavaScript
      const transpiled = ts.transpileModule(code, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2020,
          module: ts.ModuleKind.None,
          strict: false,
        },
      }).outputText;

      const proxyConsole = {
        log: (...args: unknown[]) => {
          logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" "));
        },
        error: (...args: unknown[]) => {
          logs.push("[ERROR] " + args.map((a) => String(a)).join(" "));
        },
        warn: (...args: unknown[]) => {
          logs.push("[WARN] " + args.map((a) => String(a)).join(" "));
        },
      };

      const fn = new Function("__logs", "console", transpiled);
      fn(logs, proxyConsole);

      let allPassed = true;
      for (const test of exercise.tests) {
        try {
          // Pass original source code for tests that check for type annotations
          const testFn = new Function(
            "__logs",
            "console",
            "__code",
            `return (${test.codigo})`
          );
          const result = testFn(logs, proxyConsole, code);
          if (!result) {
            allPassed = false;
            logs.push(`FAIL: ${test.descripcion}`);
          } else {
            logs.push(`PASS: ${test.descripcion}`);
          }
        } catch {
          allPassed = false;
          logs.push(`FAIL: ${test.descripcion}`);
        }
      }

      setTestsPassed(allPassed);
      if (allPassed && onComplete) {
        onComplete();
      }
    } catch (error) {
      logs.push(`Error: ${error instanceof Error ? error.message : String(error)}`);
      setTestsPassed(false);
    } finally {
      console.log = originalLog;
      console.error = originalError;
      setOutput(logs);
      setIsRunning(false);
    }
  }, [code, exercise.tests, onComplete]);

  const handleReset = () => {
    setCode(exercise.codigoInicial);
    setOutput([]);
    setTestsPassed(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-zinc-700/30 bg-dark-800/50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-dark-800 border-b border-zinc-700/30">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-zinc-500 font-mono ml-2">exercise.ts</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 rounded-md hover:bg-dark-700/50 transition-colors"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copiado" : "Copiar"}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 rounded-md hover:bg-dark-700/50 transition-colors"
          >
            <RotateCcw size={12} />
            Reset
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-success/10 text-success hover:bg-success/20 rounded-md transition-colors disabled:opacity-50"
          >
            <Play size={12} />
            {isRunning ? "Ejecutando..." : "Ejecutar"}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="h-80">
        <Editor
          height="100%"
          language="typescript"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            fontSize: 13,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: "on",
            lineNumbersMinChars: 3,
            renderLineHighlight: "gutter",
            tabSize: 2,
            insertSpaces: true,
            wordWrap: "on",
            automaticLayout: true,
            scrollbar: {
              vertical: "auto",
              horizontal: "auto",
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
            },
            padding: { top: 12, bottom: 12 },
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            smoothScrolling: true,
          }}
        />
      </div>

      {/* Output */}
      <div className="border-t border-zinc-700/30">
        <div className="flex items-center justify-between px-4 py-2 bg-dark-900/50">
          <span className="text-xs text-zinc-500 font-medium">Resultado</span>
          {testsPassed !== null && (
            <span
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full",
                testsPassed
                  ? "bg-success/10 text-success"
                  : "bg-red-500/10 text-red-400"
              )}
            >
              {testsPassed ? "Todos los tests pasaron" : "Algunos tests fallaron"}
            </span>
          )}
        </div>
        <div className="max-h-48 overflow-y-auto p-4 bg-[#0d1117]">
          {output.length === 0 ? (
            <p className="text-xs text-zinc-600 font-mono">
              Haz clic en &quot;Ejecutar&quot; para ver el resultado...
            </p>
          ) : (
            <pre className="text-xs font-mono whitespace-pre-wrap">
              {output.map((line, i) => (
                <div
                  key={i}
                  className={cn(
                    "py-0.5",
                    line.startsWith("PASS:")
                      ? "text-success"
                      : line.startsWith("FAIL:")
                      ? "text-red-400"
                      : line.startsWith("[ERROR]")
                      ? "text-red-400"
                      : "text-zinc-400"
                  )}
                >
                  {line}
                </div>
              ))}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
