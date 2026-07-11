"use client";

import { useEffect, useRef } from "react";
import { marked } from "marked";

interface LessonContentProps {
  content: string;
}

export default function LessonContent({ content }: LessonContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Process code blocks: wrap with custom header
    const codeBlocks = containerRef.current.querySelectorAll("pre code");
    codeBlocks.forEach((block) => {
      const pre = block.parentElement;
      if (!pre) return;

      // Detect language from class (marked adds "language-xxx")
      const langClass = Array.from(block.classList).find((c) =>
        c.startsWith("language-")
      );
      const lang = langClass ? langClass.replace("language-", "") : "typescript";

      const wrapper = document.createElement("div");
      wrapper.className = "code-block";

      const header = document.createElement("div");
      header.className = "code-block-header";
      header.innerHTML = `
        <span class="code-block-lang">${lang}</span>
        <button class="copy-btn text-zinc-500 hover:text-zinc-300 text-xs transition-colors">
          Copiar
        </button>
      `;

      pre.parentElement?.insertBefore(wrapper, pre);
      wrapper.appendChild(header);
      wrapper.appendChild(pre);

      const copyBtn = header.querySelector(".copy-btn");
      copyBtn?.addEventListener("click", () => {
        navigator.clipboard.writeText(block.textContent || "");
        if (copyBtn) {
          copyBtn.textContent = "Copiado!";
          setTimeout(() => {
            copyBtn.textContent = "Copiar";
          }, 2000);
        }
      });
    });

    // Style inline code
    const inlineCode = containerRef.current.querySelectorAll("code:not(pre code)");
    inlineCode.forEach((code) => {
      code.className = "code-inline";
    });
  }, [content]);

  // Parse markdown with marked
  const htmlContent = marked.parse(content, {
    gfm: true,
    breaks: false,
  }) as string;

  return (
    <div
      ref={containerRef}
      className="lesson-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
