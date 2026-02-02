import {
	ALargeSmall,
	AlignLeft,
	ArrowUpDown,
	Box,
	FileEdit,
	Grid3x3,
	Layers,
	LayoutGrid,
	Lightbulb,
	List,
	Minus,
	Table,
	TypeIcon,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
	return (
		<div className="min-h-screen bg-background">
			<main className="mx-auto max-w-5xl px-6 py-16">
				<h1 className="mb-12 font-bold text-4xl">
					Project Exodus Component Library
				</h1>

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
						href="/docs/components/container"
					>
						<div className="mb-3 flex items-center gap-3">
							<Box className="size-5" />
							<h2 className="font-semibold text-lg">Container</h2>
						</div>
						<p className="text-muted-foreground text-sm">
							Flexible layout container with responsive width constraints,
							padding, and two-column layouts
						</p>
					</Link>

					<Link
						className="group rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent"
						href="/docs/components/text"
					>
						<div className="mb-3 flex items-center gap-3">
							<ALargeSmall className="size-5" />
							<h2 className="font-semibold text-lg">Text</h2>
						</div>
						<p className="text-muted-foreground text-sm">
							Versatile typography component with variants for all text styling
							needs
						</p>
					</Link>

					<Link
						className="group rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent"
						href="/docs/components/textarea"
					>
						<div className="mb-3 flex items-center gap-3">
							<AlignLeft className="size-5" />
							<h2 className="font-semibold text-lg">Textarea</h2>
						</div>
						<p className="text-muted-foreground text-sm">
							Multi-line text input with auto-resizing and validation states
						</p>
					</Link>

					<Link
						className="group rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent"
						href="/docs/components/editor"
					>
						<div className="mb-3 flex items-center gap-3">
							<FileEdit className="size-5" />
							<h2 className="font-semibold text-lg">Editor</h2>
						</div>
						<p className="text-muted-foreground text-sm">
							Powerful rich text editor with formatting, embeds, tables, and
							real-time editing capabilities
						</p>
					</Link>

					<Link
						className="group rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent"
						href="/docs/components/tabs-container"
					>
						<div className="mb-3 flex items-center gap-3">
							<Layers className="size-5" />
							<h2 className="font-semibold text-lg">Tabs Container</h2>
						</div>
						<p className="text-muted-foreground text-sm">
							Tabbed interface with drag-and-drop reordering, conditional
							visibility, icons, badges, and visual separators
						</p>
					</Link>

					<Link
						className="group rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent"
						href="/docs/components/separator"
					>
						<div className="mb-3 flex items-center gap-3">
							<Minus className="size-5" />
							<h2 className="font-semibold text-lg">Separator</h2>
						</div>
						<p className="text-muted-foreground text-sm">
							Visual divider for separating content sections with horizontal or
							vertical orientation
						</p>
					</Link>

					<Link
						className="group rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent"
						href="/docs/components/spacer"
					>
						<div className="mb-3 flex items-center gap-3">
							<ArrowUpDown className="size-5" />
							<h2 className="font-semibold text-lg">Spacer</h2>
						</div>
						<p className="text-muted-foreground text-sm">
							Flexible spacing utility component with responsive sizing for
							controlling whitespace between elements
						</p>
					</Link>

					<Link
						className="group rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent"
						href="/docs/components/hint"
					>
						<div className="mb-3 flex items-center gap-3">
							<Lightbulb className="size-5" />
							<h2 className="font-semibold text-lg">Hint</h2>
						</div>
						<p className="text-muted-foreground text-sm">
							Highlight important text with mood variants and optional icons
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
