import { codeToHtml } from "shiki";
import { CopyButton } from "./copy-button";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export async function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: "github-light",
    transformers: [
      {
        pre(node) {
          node.properties.tabindex = undefined;
          node.properties.style = undefined;
        },
        code(node) {
          node.properties.style = undefined;
        },
        line(node) {
          node.properties.style = undefined;
        },
        span(node) {
          node.properties.style = undefined;
        },
      },
    ],
  });

  return (
    <div className="group relative">
      <div
        className="overflow-x-auto rounded-lg border border-border bg-muted/30 p-4 font-mono text-sm [&_pre]:overflow-visible"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
        <CopyButton code={code} />
      </div>
    </div>
  );
}
