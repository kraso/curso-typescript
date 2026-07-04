import fs from "fs";
import path from "path";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function renderMarkdown(content: string) {
  return content
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-zinc-100 mb-6">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold text-zinc-100 mt-8 mb-3">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-zinc-200">$1</strong>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary hover:text-primary-dark">$1</a>')
    .replace(/^- (.+)$/gm, '<li class="text-zinc-400 ml-4">$1</li>')
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, (match) => `<ul class="list-disc space-y-1 my-3">${match}</ul>`)
    .replace(/^(?!<[hubla])((?!^$).+)$/gm, '<p class="text-zinc-400 leading-relaxed mb-3">$1</p>')
    .replace(/<p[^>]*>\s*<\/p>/g, '');
}

export default function TerminosPage() {
  const filePath = path.join(process.cwd(), "public", "docs", "Terminos.md");
  const content = fs.readFileSync(filePath, "utf-8");

  return (
    <div className="min-h-screen bg-dark-900 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Volver al inicio
        </Link>

        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
        />
      </div>
    </div>
  );
}
