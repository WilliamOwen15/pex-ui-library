import { Grid3x3, LayoutGrid, List, Table, TypeIcon } from "lucide-react";
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
            href="/docs/components/card-collection"
          >
            <div className="mb-3 flex items-center gap-3">
              <LayoutGrid className="size-5" />
              <h2 className="font-semibold text-lg">Card Collection</h2>
            </div>
            <p className="text-muted-foreground text-sm">
              Flexible grid and list layouts for card-based content
            </p>
          </Link>

          <Link
            className="group rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent"
            href="/docs/components/list-collection"
          >
            <div className="mb-3 flex items-center gap-3">
              <List className="size-5" />
              <h2 className="font-semibold text-lg">List Collection</h2>
            </div>
            <p className="text-muted-foreground text-sm">
              Vertical list layouts with images, titles, and action menus
            </p>
          </Link>

          <Link
            className="group rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent"
            href="/docs/components/table-collection"
          >
            <div className="mb-3 flex items-center gap-3">
              <Table className="size-5" />
              <h2 className="font-semibold text-lg">Table Collection</h2>
            </div>
            <p className="text-muted-foreground text-sm">
              Data tables with sorting, filtering, pagination, and row actions
            </p>
          </Link>

          <Link
            className="group rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent"
            href="/docs/components/data-grid"
          >
            <div className="mb-3 flex items-center gap-3">
              <Grid3x3 className="size-5" />
              <h2 className="font-semibold text-lg">Data Grid</h2>
            </div>
            <p className="text-muted-foreground text-sm">
              Spreadsheet-like data grid with inline editing, selection, and
              copy-paste
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
