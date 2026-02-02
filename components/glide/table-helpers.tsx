"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Creates a selection checkbox column for row selection
 */
export function createSelectColumn<TData>(): ColumnDef<TData> {
	return {
		id: "select",
		header: ({ table }) => (
			<Checkbox
				aria-label="Select all"
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				aria-label="Select row"
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
			/>
		),
		enableSorting: false,
		enableHiding: false,
	};
}

/**
 * Creates a sortable column with a button header
 */
export function createSortableColumn<TData>(
	accessorKey: string,
	label: string,
): ColumnDef<TData> {
	return {
		accessorKey,
		header: ({ column }) => (
			<Button
				className="-ml-3 h-8"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				variant="ghost"
			>
				{label}
				<ArrowUpDown className="ml-2 size-4" />
			</Button>
		),
		cell: ({ row }) => {
			const value = row.getValue(accessorKey);
			return <div>{value as string}</div>;
		},
	};
}

/**
 * Creates an image/avatar column
 */
export function createImageColumn<TData>(
	accessorKey: string,
	label: string,
	nameAccessorKey?: string,
): ColumnDef<TData> {
	return {
		accessorKey,
		header: label,
		cell: ({ row }) => {
			const imageSrc = row.getValue(accessorKey) as string | undefined;
			const name = nameAccessorKey
				? (row.getValue(nameAccessorKey) as string)
				: ((row.original as { name?: string }).name ?? "User");

			const initials = name
				.split(" ")
				.map((n) => n[0])
				.join("")
				.toUpperCase()
				.slice(0, 2);

			return (
				<div className="flex items-center">
					<Avatar className="size-8 shrink-0">
						<AvatarImage alt={name} className="object-cover" src={imageSrc} />
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
				</div>
			);
		},
	};
}

/**
 * Creates an actions column with a dropdown menu
 */
export function createActionsColumn<TData>(
	renderActions: (row: Row<TData>) => React.ReactNode,
): ColumnDef<TData> {
	return {
		id: "actions",
		header: () => <span className="sr-only">Actions</span>,
		cell: ({ row }) => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button aria-label="Open menu" className="size-8 p-0" variant="ghost">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					{renderActions(row)}
				</DropdownMenuContent>
			</DropdownMenu>
		),
		enableSorting: false,
		enableHiding: false,
	};
}

/**
 * Creates a badge column for status or category indicators
 */
export function createBadgeColumn<TData>(
	accessorKey: string,
	label: string,
	getBadgeVariant?: (
		value: string,
	) => "default" | "secondary" | "destructive" | "outline",
): ColumnDef<TData> {
	return {
		accessorKey,
		header: label,
		cell: ({ row }) => {
			const value = row.getValue(accessorKey) as string;
			const variant = getBadgeVariant?.(value) ?? "default";

			return (
				<Badge
					variant={
						variant as "default" | "secondary" | "destructive" | "outline"
					}
				>
					{value}
				</Badge>
			);
		},
	};
}

/**
 * Creates a date column with formatting
 */
export function createDateColumn<TData>(
	accessorKey: string,
	label: string,
	formatOptions?: Intl.DateTimeFormatOptions,
): ColumnDef<TData> {
	const defaultOptions: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "short",
		day: "numeric",
	};

	return {
		accessorKey,
		header: label,
		cell: ({ row }) => {
			const dateValue = row.getValue(accessorKey);
			if (!dateValue) {
				return <div className="text-muted-foreground">-</div>;
			}

			const date =
				typeof dateValue === "string"
					? new Date(dateValue)
					: (dateValue as Date);
			const formatted = date.toLocaleDateString(
				undefined,
				formatOptions ?? defaultOptions,
			);

			return <div>{formatted}</div>;
		},
	};
}

/**
 * Creates a numeric column with formatting
 */
export function createNumberColumn<TData>(
	accessorKey: string,
	label: string,
	formatOptions?: Intl.NumberFormatOptions,
): ColumnDef<TData> {
	return {
		accessorKey,
		header: label,
		cell: ({ row }) => {
			const value = row.getValue(accessorKey) as number;
			const formatted = new Intl.NumberFormat(undefined, formatOptions).format(
				value,
			);

			return <div className="text-right font-medium">{formatted}</div>;
		},
	};
}

/**
 * Creates a currency column
 */
export function createCurrencyColumn<TData>(
	accessorKey: string,
	label: string,
	currency = "USD",
): ColumnDef<TData> {
	return createNumberColumn(accessorKey, label, {
		style: "currency",
		currency,
	});
}
