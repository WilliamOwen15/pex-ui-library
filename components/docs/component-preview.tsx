"use client";

import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CodeBlockClient } from "./code-block-client";
import { CopyButton } from "./copy-button";

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
  const [isExpanded, setIsExpanded] = useState(false);

  if (!code) {
    return (
      <div className="not-prose my-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-md bg-muted px-2 py-1 font-mono text-muted-foreground text-xs">
            {name}
          </span>
        </div>
        <div className="overflow-visible rounded-xl border border-border bg-white p-8">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="not-prose my-6 space-y-4">
      <div className="flex items-center gap-2">
        <span className="rounded-md bg-muted px-2 py-1 font-mono text-muted-foreground text-xs">
          {name}
        </span>
      </div>

      <div className="overflow-visible rounded-xl border border-border bg-white p-8">
        {children}
      </div>

      <div className="relative">
        {isExpanded ? (
          <div className="group relative overflow-hidden rounded-xl border border-border">
            <div className="absolute top-4 right-4 z-10">
              <CopyButton code={code} />
            </div>
            <CodeBlockClient code={code} language={language} />
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-xl border border-border">
            <div className="pointer-events-none h-32 overflow-hidden blur-sm">
              <CodeBlockClient code={code} language={language} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
              <Button
                className="gap-2"
                onClick={() => setIsExpanded(true)}
                variant="outline"
              >
                <ChevronDown className="size-4" />
                View Code
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
