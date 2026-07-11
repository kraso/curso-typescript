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

    // Delegate events for copy buttons
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const blockBtn = target.closest(".copy-btn") as HTMLElement | null;
      const inlineBtn = target.closest(".copy-inline-btn") as HTMLElement | null;
      
      if (blockBtn) {
        e.stopPropagation();
        handleCopyBlock(blockBtn);
      } else if (inlineBtn) {
        e.stopPropagation();
        handleCopyInline(inlineBtn);
      }
    };

    container.addEventListener("click", handleClick);
    return () => container.removeEventListener("click", handleClick);
  }, [handleCopyBlock, handleCopyInline]);

  // Parse markdown and inject copy buttons directly into HTML
  const htmlContent = (() => {
    // First pass: marked generates basic HTML
    let html = marked.parse(content, { gfm: true, breaks: false }) as string;
    
    // Second pass: inject copy buttons into code blocks
    // Replace <pre><code class="language-...">...</code></pre> with wrapped version
    html = html.replace(
      /<pre><code class="language-([^"]+)">([\s\S]*?)<\/code><\/pre>/g,
      (_, lang, code) => {
        const escapedCode = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return `<div class="code-block"><div class="code-block-header"><span class="code-block-lang">${lang}</span><button class="copy-btn" aria-label="Copiar codigo" title="Copiar"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button></div><pre><code class="language-${lang}">${escapedCode}</code></pre></div>`;
      }
    );
    
    // Third pass: inject copy buttons into inline code
    // Replace <code>...</code> (not inside pre) with wrapped version
    // We need to be careful not to match code inside pre blocks
    html = html.replace(
      /(<\/pre>|^)([\s\S]*?)<code>([^<]+)<\/code>([\s\S]*?)(?=<pre>|$)/g,
      (_, beforePre, before, code, after) => {
        return `${beforePre}${before}<span class="code-inline-wrapper"><code class="code-inline">${code}</code><button class="copy-inline-btn" aria-label="Copiar" title="Copiar"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button></span>${after}`;
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
