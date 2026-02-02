"use client";

import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const tableCollectionVariants = cva("w-full", {
	variants: {
		variant: {
			default: "rounded-md border bg-background shadow-sm",
			minimal: "border-t",
			striped: "rounded-md border bg-background",
		},
		size: {
			default: "[&_td]:p-4 [&_th]:p-4",
			compact: "text-sm [&_td]:px-4 [&_td]:py-2 [&_th]:px-4 [&_th]:py-2",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

const tableRowVariants = cva("", {
	variants: {
		variant: {
			default: "",
			minimal: "",
			striped: "even:bg-muted/50",
		},
		clickable: {
			true: "cursor-pointer",
			false: "",
		},
	},
	defaultVariants: {
		variant: "default",
		clickable: false,
	},
});

export interface TableCollectionProps<TData>
	extends VariantProps<typeof tableCollectionVariants> {
	// Core props
	data: TData[];
	columns: ColumnDef<TData>[];

	// Display
	limit?: number;
	pageSize?: number;
	searchPlaceholder?: string;
	emptyMessage?: string;

	// Features
	enableSorting?: boolean;
	enableFiltering?: boolean;
	enablePagination?: boolean;
	enableRowSelection?: boolean;

	// Interactions
	onRowClick?: (row: TData) => void;

	// Toolbar
	showToolbar?: boolean;
	toolbarActions?: React.ReactNode;

	// Styling
	className?: string;
	classNames?: {
		wrapper?: string;
		toolbar?: string;
		table?: string;
		pagination?: string;
	};
}

export function TableCollection<TData>({
	data,
	columns,
	variant = "default",
	size = "default",
	limit,
	pageSize = 10,
	searchPlaceholder = "Search...",
	emptyMessage = "No results.",
	enableSorting = false,
	enableFiltering = false,
	enablePagination = false,
	enableRowSelection = false,
	onRowClick,
	showToolbar = true,
	toolbarActions,
	className,
	classNames,
}: TableCollectionProps<TData>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const [globalFilter, setGlobalFilter] = React.useState("");

	// Apply limit if specified
	const displayData = React.useMemo(() => {
		return limit ? data.slice(0, limit) : data;
	}, [data, limit]);

	const table = useReactTable({
		data: displayData,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: enablePagination
			? getPaginationRowModel()
			: undefined,
		getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
		getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: enableRowSelection ? setRowSelection : undefined,
		onGlobalFilterChange: enableFiltering ? setGlobalFilter : undefined,
		state: {
			sorting: enableSorting ? sorting : undefined,
			columnFilters: enableFiltering ? columnFilters : undefined,
			columnVisibility,
			rowSelection: enableRowSelection ? rowSelection : undefined,
			globalFilter: enableFiltering ? globalFilter : undefined,
		},
		initialState: {
			pagination: enablePagination
				? {
						pageSize,
					}
				: undefined,
		},
	});

	const hasToolbar = showToolbar && (enableFiltering || toolbarActions);

	return (
		<div className={cn("space-y-4", classNames?.wrapper)}>
			{/* Toolbar */}
			{hasToolbar && (
				<div
					className={cn(
						"flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
						classNames?.toolbar,
					)}
				>
					{enableFiltering && (
						<Input
							className="max-w-sm"
							onChange={(event) => setGlobalFilter(event.target.value)}
							placeholder={searchPlaceholder}
							value={globalFilter ?? ""}
						/>
					)}
					{toolbarActions && (
						<div className="flex items-center gap-2">{toolbarActions}</div>
					)}
				</div>
			)}

			{/* Table */}
			<div
				className={cn(
					tableCollectionVariants({ variant, size }),
					classNames?.table,
					className,
				)}
			>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									className={cn(
										tableRowVariants({
											variant,
											clickable: !!onRowClick,
										}),
									)}
									data-state={
										enableRowSelection && row.getIsSelected() && "selected"
									}
									key={row.id}
									onClick={
										onRowClick ? () => onRowClick(row.original) : undefined
									}
									onKeyDown={
										onRowClick
											? (e) => {
													if (e.key === "Enter" || e.key === " ") {
														e.preventDefault();
														onRowClick(row.original);
													}
												}
											: undefined
									}
									tabIndex={onRowClick ? 0 : undefined}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									className="h-24 text-center"
									colSpan={columns.length}
								>
									{emptyMessage}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{/* Pagination */}
			{enablePagination && table.getPageCount() > 1 && (
				<div
					className={cn(
						"flex items-center justify-between px-2",
						classNames?.pagination,
					)}
				>
					<div className="flex-1 text-muted-foreground text-sm">
						{enableRowSelection && (
							<span>
								{table.getFilteredSelectedRowModel().rows.length} of{" "}
								{table.getFilteredRowModel().rows.length} row(s) selected.
							</span>
						)}
					</div>
					<div className="flex items-center gap-6">
						<div className="font-medium text-sm">
							Page {table.getState().pagination.pageIndex + 1} of{" "}
							{table.getPageCount()}
						</div>
						<div className="flex items-center gap-2">
							<Button
								disabled={!table.getCanPreviousPage()}
								onClick={() => table.previousPage()}
								size="sm"
								variant="outline"
							>
								<ChevronLeft className="size-4" />
								<span className="sr-only">Previous page</span>
							</Button>
							<Button
								disabled={!table.getCanNextPage()}
								onClick={() => table.nextPage()}
								size="sm"
								variant="outline"
							>
								<ChevronRight className="size-4" />
								<span className="sr-only">Next page</span>
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
