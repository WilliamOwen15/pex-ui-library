"use client";

import {
  type Column,
  DataGrid as DataGridComponent,
  type RowsChangeData,
  type SortColumn,
} from "react-data-grid";
import "react-data-grid/lib/styles.css";
import { cva, type VariantProps } from "class-variance-authority";
import { Copy, Plus, Trash2 } from "lucide-react";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { ColumnDefinition } from "./data-grid-helpers";
import { createDynamicColumns } from "./data-grid-helpers";

const dataGridVariants = cva("rdg", {
  variants: {
    variant: {
      default: "rdg-default",
      minimal: "rdg-minimal",
      striped: "rdg-striped",
    },
    size: {
      default: "rdg-size-default",
      compact: "rdg-size-compact",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface DataGridProps<TData>
  extends VariantProps<typeof dataGridVariants> {
  // Core data
  data: TData[];
  columns?: Column<TData>[];
  onDataChange?: (data: TData[]) => void;

  // Dynamic columns from external source
  columnDefinitions?: ColumnDefinition[];

  // Features
  enableRowSelection?: boolean;
  enableAddRow?: boolean;
  enableDeleteRow?: boolean;
  enableSearch?: boolean;
  enableSorting?: boolean;

  // Toolbar
  searchPlaceholder?: string;
  onAddRow?: () => TData;
  toolbarActions?: ReactNode;
  showToolbar?: boolean;

  // Display
  emptyMessage?: string;
  rowHeight?: number;

  // Styling
  className?: string;
  classNames?: {
    wrapper?: string;
    toolbar?: string;
    grid?: string;
  };
}

export function DataGrid<TData>({
  data: initialData,
  columns: providedColumns,
  onDataChange,
  columnDefinitions,
  variant = "default",
  size = "default",
  enableRowSelection = false,
  enableAddRow = false,
  enableDeleteRow = false,
  enableSearch = false,
  enableSorting = false,
  searchPlaceholder = "Search...",
  onAddRow,
  toolbarActions,
  showToolbar = true,
  emptyMessage = "No data available",
  rowHeight = 35,
  className,
  classNames,
}: DataGridProps<TData>) {
  // Generate columns from definitions if provided
  const dynamicColumns = useMemo(
    () =>
      columnDefinitions ? createDynamicColumns<TData>(columnDefinitions) : [],
    [columnDefinitions]
  );

  const columns = columnDefinitions ? dynamicColumns : (providedColumns ?? []);

  // Local state
  const [rows, setRows] = useState<TData[]>(initialData);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(
    () => new Set()
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumns, setSortColumns] = useState<SortColumn[]>([]);

  // Sync external data changes
  useEffect(() => {
    setRows(initialData);
  }, [initialData]);

  // Filter rows based on search term
  const filteredRows = useMemo(() => {
    if (!(enableSearch && searchTerm)) {
      return rows;
    }

    const searchLower = searchTerm.toLowerCase();
    return rows.filter((row) =>
      Object.values(row as object).some((value) =>
        String(value).toLowerCase().includes(searchLower)
      )
    );
  }, [rows, searchTerm, enableSearch]);

  // Sort rows
  const sortedRows = useMemo(() => {
    if (!enableSorting || sortColumns.length === 0) {
      return filteredRows;
    }

    const sorted = [...filteredRows];
    for (const sortColumn of [...sortColumns].reverse()) {
      const { columnKey, direction } = sortColumn;
      sorted.sort((a, b) => {
        const aValue = a[columnKey as keyof TData];
        const bValue = b[columnKey as keyof TData];

        if (aValue === bValue) {
          return 0;
        }
        if (aValue == null) {
          return 1;
        }
        if (bValue == null) {
          return -1;
        }

        const comparison = aValue < bValue ? -1 : 1;
        return direction === "ASC" ? comparison : -comparison;
      });
    }
    return sorted;
  }, [filteredRows, sortColumns, enableSorting]);

  // Handle row changes (editing)
  const handleRowsChange = useCallback(
    (newRows: TData[], _data: RowsChangeData<TData>) => {
      setRows(newRows);
      onDataChange?.(newRows);
    },
    [onDataChange]
  );

  // Handle add row
  const handleAddRow = useCallback(() => {
    if (!onAddRow) {
      return;
    }

    const newRow = onAddRow();
    const newRows = [...rows, newRow];
    setRows(newRows);
    onDataChange?.(newRows);
  }, [rows, onAddRow, onDataChange]);

  // Handle delete selected rows
  const handleDeleteSelected = useCallback(() => {
    const newRows = rows.filter((_, idx) => !selectedRows.has(idx));
    setRows(newRows);
    setSelectedRows(new Set());
    onDataChange?.(newRows);
  }, [rows, selectedRows, onDataChange]);

  // Copy selected rows to clipboard (TSV format)
  const copySelectedRows = useCallback(() => {
    const selectedData = Array.from(selectedRows)
      .sort((a, b) => a - b)
      .map((idx) => rows[idx]);

    const headers = columns.map((col) => col.name).join("\t");
    const rowsData = selectedData
      .map((row) =>
        columns
          .map((col) => {
            const value = row[col.key as keyof TData];
            return value !== null && value !== undefined ? String(value) : "";
          })
          .join("\t")
      )
      .join("\n");

    const tsv = `${headers}\n${rowsData}`;
    navigator.clipboard.writeText(tsv);
  }, [selectedRows, rows, columns]);

  // Copy all data to clipboard
  const copyAllData = useCallback(() => {
    const headers = columns.map((col) => col.name).join("\t");
    const rowsData = rows
      .map((row) =>
        columns
          .map((col) => {
            const value = row[col.key as keyof TData];
            return value !== null && value !== undefined ? String(value) : "";
          })
          .join("\t")
      )
      .join("\n");

    const tsv = `${headers}\n${rowsData}`;
    navigator.clipboard.writeText(tsv);
  }, [rows, columns]);

  // Row selection - use row index as key
  const rowKeyGetter = useCallback(
    (row: TData) => {
      const index = sortedRows.indexOf(row);
      return index >= 0 ? index : sortedRows.length;
    },
    [sortedRows]
  );

  const hasToolbar =
    showToolbar &&
    (enableSearch ||
      enableAddRow ||
      (enableDeleteRow && selectedRows.size > 0) ||
      toolbarActions);

  const gridClassName = cn(
    dataGridVariants({ variant, size }),
    classNames?.grid,
    className
  );

  return (
    <div className={cn("space-y-4", classNames?.wrapper)}>
      {/* Toolbar */}
      {hasToolbar && (
        <div
          className={cn(
            "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
            classNames?.toolbar
          )}
        >
          {enableSearch && (
            <Input
              className="max-w-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={searchPlaceholder}
              value={searchTerm}
            />
          )}

          <div className="flex items-center gap-2">
            {enableAddRow && onAddRow && (
              <Button onClick={handleAddRow} size="sm">
                <Plus className="mr-2 size-4" />
                Add Entry
              </Button>
            )}

            {enableDeleteRow && selectedRows.size > 0 && (
              <Button
                onClick={handleDeleteSelected}
                size="sm"
                variant="destructive"
              >
                <Trash2 className="mr-2 size-4" />
                Delete ({selectedRows.size})
              </Button>
            )}

            {selectedRows.size > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Copy className="mr-2 size-4" />
                    Copy
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={copySelectedRows}>
                    Copy Selected Rows
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={copyAllData}>
                    Copy All Data
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {toolbarActions}
          </div>
        </div>
      )}

      {/* Data Grid */}
      <div className={gridClassName}>
        {sortedRows.length > 0 ? (
          <DataGridComponent
            columns={columns}
            onRowsChange={handleRowsChange}
            onSelectedRowsChange={
              enableRowSelection ? setSelectedRows : undefined
            }
            onSortColumnsChange={enableSorting ? setSortColumns : undefined}
            rowHeight={rowHeight}
            rowKeyGetter={rowKeyGetter}
            rows={sortedRows}
            selectedRows={enableRowSelection ? selectedRows : undefined}
            sortColumns={enableSorting ? sortColumns : undefined}
          />
        ) : (
          <div className="flex h-48 items-center justify-center text-muted-foreground">
            {emptyMessage}
          </div>
        )}
      </div>
    </div>
  );
}
