"use client";

import { useEffect, useRef } from "react";
import { marked } from "marked";

interface LessonContentProps {
  content: string;
}

// Create a custom renderer with copy buttons
const renderer: any = {
  code(code: string, language?: string, _escaped?: boolean): string {
    const lang = language || "typescript";
    return `<div class="code-block"><div class="code-block-header"><span class="code-block-lang">${lang}</span><button class="copy-btn" data-code="${encodeURIComponent(code)}" aria-label="Copiar codigo" title="Copiar"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button></div><pre><code class="language-${lang}">${code}</code></pre></div>`;
  },
  codespan(code: string): string {
    return `<span class="code-inline-wrapper"><code class="code-inline">${code}</code><button class="copy-inline-btn" data-code="${encodeURIComponent(code)}" aria-label="Copiar" title="Copiar"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button></span>`;
  },
};

// Configure marked with custom renderer
marked.use({ renderer } as any);

export default function LessonContent({ content }: LessonContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Attach click handlers to inline copy buttons
    const inlineBtns = container.querySelectorAll(".copy-inline-btn");
    inlineBtns.forEach((btn) => {
      const code = decodeURIComponent((btn as HTMLElement).dataset.code || "");
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(code);
        (btn as HTMLElement).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        setTimeout(() => {
          (btn as HTMLElement).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
        }, 2000);
      });
    });

    // Attach click handlers to block copy buttons
    const blockBtns = container.querySelectorAll(".copy-btn");
    blockBtns.forEach((btn) => {
      const code = decodeURIComponent((btn as HTMLElement).dataset.code || "");
      btn.addEventListener("click", () => {
        navigator.clipboard.writeText(code);
        (btn as HTMLElement).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        setTimeout(() => {
          (btn as HTMLElement).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
        }, 2000);
      });
    });
  }, [content]);

  // Parse markdown with custom renderer
  const htmlContent = marked.parse(content) as string;

  return (
    <div
      ref={containerRef}
      className="lesson-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
