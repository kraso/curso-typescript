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

      const wrapper = document.createElement("div");
      wrapper.className = "code-block";

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

      const copyBtn = header.querySelector(".copy-btn");
      copyBtn?.addEventListener("click", () => {
        navigator.clipboard.writeText(block.textContent || "");
        if (copyBtn) {
          copyBtn.textContent = "Copiado!";
          setTimeout(() => { copyBtn.textContent = "Copiar"; }, 2000);
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
    // Code blocks first (must be before other processing)
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code (before tables to avoid conflicts)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // Tables - find consecutive table rows and wrap them
    .replace(/((?:^\|.+\|$\n?)+)/gm, (tableBlock) => {
      const lines = tableBlock.trim().split('\n');
      const rows: string[] = [];
      
      for (const line of lines) {
        const cells = line.split('|').filter(c => c.trim() !== '' && !c.trim().match(/^[-:]+$/));
        if (cells.length > 0) {
          rows.push(cells.map(c => `<td>${c.trim()}</td>`).join(''));
        }
      }
      
      if (rows.length === 0) return '';
      
      // First row as header, rest as body
      const headerRow = rows[0];
      const bodyRows = rows.slice(1);
      
      return `<table><thead><tr>${headerRow.replace(/td>/g, 'th>')}</tr></thead><tbody>${bodyRows.map(r => `<tr>${r}</tr>`).join('')}</tbody></table>`;
    })
    // Lists - group consecutive list items
    .replace(/((?:^- .+\n?)+)/gm, (listBlock) => {
      const items = listBlock.trim().split('\n').map(item => `<li>${item.replace(/^- /, '')}</li>`);
      return `<ul>${items.join('')}</ul>`;
    })
    // Ordered lists
    .replace(/((?:^\d+\. .+\n?)+)/gm, (listBlock) => {
      const items = listBlock.trim().split('\n').map(item => `<li>${item.replace(/^\d+\. /, '')}</li>`);
      return `<ol>${items.join('')}</ol>`;
    })
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    // Line breaks (but not inside pre/code blocks)
    .replace(/\n/g, '<br>');

  return (
    <div
      ref={containerRef}
      className="lesson-content"
      dangerouslySetInnerHTML={{ __html: `<p>${htmlContent}</p>` }}
    />
  );
}
