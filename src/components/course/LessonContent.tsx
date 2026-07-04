"use client";

import { useEffect, useRef } from "react";

interface LessonContentProps {
  content: string;
}

export default function LessonContent({ content }: LessonContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Process code blocks
    const codeBlocks = containerRef.current.querySelectorAll("pre code");
    codeBlocks.forEach((block) => {
      const pre = block.parentElement;
      if (!pre) return;

      // Create code block wrapper
      const wrapper = document.createElement("div");
      wrapper.className = "code-block";

      // Create header
      const header = document.createElement("div");
      header.className = "code-block-header";
      header.innerHTML = `
        <span class="code-block-lang">typescript</span>
        <button class="copy-btn text-zinc-500 hover:text-zinc-300 text-xs transition-colors">
          Copiar
        </button>
      `;

      pre.parentElement?.insertBefore(wrapper, pre);
      wrapper.appendChild(header);
      wrapper.appendChild(pre);

      // Copy functionality
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

    // Process inline code
    const inlineCode = containerRef.current.querySelectorAll("code:not(pre code)");
    inlineCode.forEach((code) => {
      code.className = "code-inline";
    });
  }, [content]);

  // Convert markdown-like content to HTML
  const htmlContent = content
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // Tables (simplified)
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(Boolean).map(c => c.trim());
      if (cells.every(c => c.match(/^[-:]+$/))) return '';
      return `<tr>${cells.map(c => `<td>${c}</td>`).join('')}</tr>`;
    })
    // Lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Code blocks (preserve as-is for now)
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    // Line breaks
    .replace(/\n/g, '<br>');

  return (
    <div
      ref={containerRef}
      className="lesson-content"
      dangerouslySetInnerHTML={{ __html: `<p>${htmlContent}</p>` }}
    />
  );
}
