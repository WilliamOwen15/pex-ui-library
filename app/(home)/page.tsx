import { FileCode, TypeIcon } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="mb-12 font-bold text-4xl">Exodus UI Library</h1>

        <div className="grid gap-4 md:grid-cols-2">
          <Link
            className="group rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent"
            href="/docs/components/title"
          >
            <div className="mb-3 flex items-center gap-3">
              <TypeIcon className="size-5" />
              <h2 className="font-semibold text-lg">Title Component</h2>
            </div>
            <p className="text-muted-foreground text-sm">
              Versatile title component with multiple variants
            </p>
          </Link>

          <Link
            className="group rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent"
            href="/legacy-backup"
          >
            <div className="mb-3 flex items-center gap-3">
              <FileCode className="size-5" />
              <h2 className="font-semibold text-lg">Legacy Examples</h2>
            </div>
            <p className="text-muted-foreground text-sm">
              View all component examples and demos
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
