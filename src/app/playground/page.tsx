"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { Play, RotateCcw, Copy, Check } from "lucide-react";

const DEFAULT_CODE = `// Escribe TypeScript aqui
interface Usuario {
  nombre: string;
  edad: number;
  email: string;
}

const usuario: Usuario = {
  nombre: "Ana",
  edad: 25,
  email: "ana@ejemplo.com"
};

function saludar(user: Usuario): string {
  return \`Hola, \${user.nombre}!\`;
}

console.log(saludar(usuario));`;

export default function PlaygroundPage() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState<string[]>([]);
  const [executing, setExecuting] = useState(false);
  const [copied, setCopied] = useState(false);

  const executeCode = useCallback(() => {
    setExecuting(true);
    setOutput([]);

    try {
      const logs: string[] = [];
      const originalLog = console.log;

      console.log = (...args: unknown[]) => {
        logs.push(args.map(String).join(" "));
      };

      const fn = new Function(code);
      fn();

      console.log = originalLog;
      setOutput(logs.length > 0 ? logs : ["(sin salida)"]);
    } catch (error) {
      setOutput([
        "Error:",
        error instanceof Error ? error.message : "Error desconocido",
      ]);
    } finally {
      setExecuting(false);
    }
  }, [code]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const handleReset = useCallback(() => {
    setCode(DEFAULT_CODE);
    setOutput([]);
  }, []);

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-2">
              Playground
            </h1>
            <p className="text-zinc-500">
              Escribe y ejecuta TypeScript en el navegador.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Editor */}
            <div className="editor-container">
              <div className="editor-header">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs text-zinc-500 font-mono ml-2">
                    playground.ts
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                  <button
                    onClick={handleReset}
                    className="text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>
              </div>
              <div className="editor-body">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full min-h-[400px] p-4 bg-transparent border-none outline-none resize-none font-mono text-sm text-zinc-300 leading-relaxed"
                  spellCheck={false}
                  onKeyDown={(e) => {
                    if (e.key === "Tab") {
                      e.preventDefault();
                      const start = e.currentTarget.selectionStart;
                      const end = e.currentTarget.selectionEnd;
                      const newCode = code.substring(0, start) + "  " + code.substring(end);
                      setCode(newCode);
                      requestAnimationFrame(() => {
                        e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
                      });
                    }
                  }}
                />
              </div>
              <div className="p-4 border-t border-zinc-800">
                <Button onClick={executeCode} disabled={executing} className="w-full">
                  <Play size={16} />
                  {executing ? "Ejecutando..." : "Ejecutar"}
                </Button>
              </div>
            </div>

            {/* Output */}
            <div className="editor-container">
              <div className="editor-header">
                <span className="text-xs text-zinc-500 font-mono">Salida</span>
              </div>
              <div className="p-4 min-h-[400px] bg-[#0d1117]">
                {output.length === 0 ? (
                  <p className="text-zinc-600 text-sm font-mono">
                    La salida aparecera aqui...
                  </p>
                ) : (
                  <div className="space-y-1">
                    {output.map((line, i) => (
                      <div
                        key={i}
                        className={`text-sm font-mono ${
                          line.startsWith("Error:")
                            ? "text-red-400"
                            : "text-zinc-300"
                        }`}
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
