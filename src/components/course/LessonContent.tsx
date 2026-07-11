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
        <button class="copy-btn" aria-label="Copiar codigo" title="Copiar">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        </button>
      `;

      pre.parentElement?.insertBefore(wrapper, pre);
      wrapper.appendChild(header);
      wrapper.appendChild(pre);

      const copyBtn = header.querySelector(".copy-btn");
      copyBtn?.addEventListener("click", () => {
        navigator.clipboard.writeText(block.textContent || "");
        if (copyBtn) {
          copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
          setTimeout(() => {
            copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
          }, 2000);
        }
      });
    });

    // Style inline code + add copy button on hover
    const inlineCode = containerRef.current.querySelectorAll("code:not(pre code)");
    inlineCode.forEach((code) => {
      const text = code.textContent || "";
      const wrapper = document.createElement("span");
      wrapper.className = "code-inline-wrapper";
      wrapper.innerHTML = `
        <span class="code-inline">${text}</span>
        <button class="copy-inline-btn" aria-label="Copiar" title="Copiar">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        </button>
      `;
      code.replaceWith(wrapper);

      const copyBtn = wrapper.querySelector(".copy-inline-btn");
      copyBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(text);
        const btn = copyBtn as HTMLElement;
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        setTimeout(() => {
          btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
        }, 2000);
      });
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
