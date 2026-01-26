import type { ReactNode } from "react";
import { CodeBlock } from "./code-block";

interface ComponentPreviewProps {
  children: ReactNode;
  name: string;
  code?: string;
  language?: string;
}

export function ComponentPreview({
  children,
  name,
  code,
  language = "tsx",
}: ComponentPreviewProps) {
  return (
    <div className="not-prose my-6">
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-md bg-muted px-2 py-1 font-mono text-muted-foreground text-xs">
          {name}
        </span>
      </div>
      <div className="space-y-4">
        <div className="overflow-hidden rounded-xl border border-border bg-white p-8">
          {children}
        </div>
        {code ? <CodeBlock code={code} language={language} /> : null}
      </div>
    </div>
  );
}
