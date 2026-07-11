"use client";

import { useEffect, useRef, useCallback } from "react";
import { marked } from "marked";

interface LessonContentProps {
  content: string;
}

export default function LessonContent({ content }: LessonContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCopyBlock = useCallback((btn: HTMLElement) => {
    const wrapper = btn.closest(".code-block");
    const codeEl = wrapper?.querySelector("pre code");
    const text = codeEl?.textContent || "";
    navigator.clipboard.writeText(text).then(() => {
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      setTimeout(() => {
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
      }, 2000);
    });
  }, []);

  const handleCopyInline = useCallback((btn: HTMLElement) => {
    const wrapper = btn.closest(".code-inline-wrapper");
    const codeEl = wrapper?.querySelector(".code-inline");
    const text = codeEl?.textContent || "";
    navigator.clipboard.writeText(text).then(() => {
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      setTimeout(() => {
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
      }, 2000);
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Process inline code: add copy button, skip those inside tables
    const inlineCode = container.querySelectorAll("code:not(pre code):not(td code):not(th code)");
    inlineCode.forEach((code) => {
      // Skip if already processed or inside table
      if ((code as HTMLElement).closest(".code-inline-wrapper")) return;
      if ((code as HTMLElement).closest("td") || (code as HTMLElement).closest("th")) return;

      const text = code.textContent || "";
      const wrapper = document.createElement("span");
      wrapper.className = "code-inline-wrapper";
      
      const codeSpan = document.createElement("code");
      codeSpan.className = "code-inline";
      codeSpan.textContent = text;
      
      const copyBtn = document.createElement("button");
      copyBtn.className = "copy-inline-btn";
      copyBtn.setAttribute("aria-label", "Copiar");
      copyBtn.setAttribute("title", "Copiar");
      copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
      copyBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        handleCopyInline(copyBtn);
      });
      
      wrapper.appendChild(codeSpan);
      wrapper.appendChild(copyBtn);
      
      code.parentNode?.replaceChild(wrapper, code);
    });

    // Delegate events for block copy buttons
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const blockBtn = target.closest(".copy-btn") as HTMLElement | null;
      if (blockBtn) {
        e.stopPropagation();
        handleCopyBlock(blockBtn);
      }
    };

    container.addEventListener("click", handleClick);
    return () => container.removeEventListener("click", handleClick);
  }, [content, handleCopyBlock, handleCopyInline]);

  // Parse markdown and inject copy buttons into code blocks only
  const htmlContent = (() => {
    let html = marked.parse(content, { gfm: true, breaks: false }) as string;
    
    // Replace code blocks with wrapped version (headers + copy buttons)
    html = html.replace(
      /<pre><code class="language-([^"]+)">([\s\S]*?)<\/code><\/pre>/g,
      (_, lang, code) => {
        const escapedCode = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return `<div class="code-block"><div class="code-block-header"><span class="code-block-lang">${lang}</span><button class="copy-btn" aria-label="Copiar codigo" title="Copiar"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button></div><pre><code class="language-${lang}">${escapedCode}</code></pre></div>`;
      }
    );
    
    return html;
  })();

  return (
    <div
      ref={containerRef}
      className="lesson-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
