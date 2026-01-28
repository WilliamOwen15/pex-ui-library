"use client";

import type { Column, RenderEditCellProps } from "react-data-grid";
import { Input } from "@/components/ui/input";

/**
 * Column definition from external data source
 */
export interface ColumnDefinition {
  key: string;
  name: string;
  type: "text" | "number" | "date" | "select";
  editable?: boolean;
  options?: string[];
  width?: number;
}

/**
 * Text input editor for editable cells
 */
function TextEditor<TData>({
  row,
  column,
  onRowChange,
}: RenderEditCellProps<TData>) {
  const value = row[column.key as keyof TData] as string;

  return (
    <Input
      autoFocus
      className="h-full w-full border-none bg-transparent"
      onChange={(e) => onRowChange({ ...row, [column.key]: e.target.value })}
      value={value ?? ""}
    />
  );
}

/**
 * Number input editor for editable cells
 */
function NumberEditor<TData>({
  row,
  column,
  onRowChange,
}: RenderEditCellProps<TData>) {
  const value = row[column.key as keyof TData] as number;

  return (
    <Input
      autoFocus
      className="h-full w-full border-none bg-transparent"
      onChange={(e) => {
        const numValue = e.target.value === "" ? null : Number(e.target.value);
        onRowChange({ ...row, [column.key]: numValue });
      }}
      type="number"
      value={value ?? ""}
    />
  );
}

/**
 * Date input editor for editable cells
 */
function DateEditor<TData>({
  row,
  column,
  onRowChange,
}: RenderEditCellProps<TData>) {
  const value = row[column.key as keyof TData] as string;

  return (
    <Input
      autoFocus
      className="h-full w-full border-none bg-transparent"
      onChange={(e) => onRowChange({ ...row, [column.key]: e.target.value })}
      type="date"
      value={value ?? ""}
    />
  );
}

/**
 * Select dropdown editor for editable cells
 */
function SelectEditor<TData>(options: string[]) {
  return function Editor({
    row,
    column,
    onRowChange,
  }: RenderEditCellProps<TData>) {
    const value = row[column.key as keyof TData] as string;

    return (
      <select
        autoFocus
        className="h-full w-full border-none bg-background"
        onChange={(e) => onRowChange({ ...row, [column.key]: e.target.value })}
        value={value ?? ""}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  };
}

/**
 * Creates a row number column (frozen, non-editable)
 */
export function createRowNumberColumn<TData>(): Column<TData> {
  return {
    key: "__row_number__",
    name: "#",
    width: 60,
    frozen: true,
    resizable: false,
    renderCell: ({ rowIdx }) => (
      <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
        {rowIdx + 1}
      </div>
    ),
  };
}

/**
 * Creates a selection checkbox column
 * Note: Use enableRowSelection prop on DataGrid for row selection functionality
 */
export function createSelectColumn<TData>(): Column<TData> {
  return {
    key: "select",
    name: "",
    width: 50,
    frozen: true,
    resizable: false,
  };
}

/**
 * Creates an editable text column
 */
export function createEditableTextColumn<TData>(
  key: string,
  name: string,
  width?: number
): Column<TData> {
  return {
    key,
    name,
    width,
    resizable: true,
    editable: true,
    renderEditCell: TextEditor,
  };
}

/**
 * Creates an editable number column
 */
export function createEditableNumberColumn<TData>(
  key: string,
  name: string,
  width?: number
): Column<TData> {
  return {
    key,
    name,
    width,
    resizable: true,
    editable: true,
    renderEditCell: NumberEditor,
    renderCell: ({ row, column }) => {
      const value = row[column.key as keyof TData] as number;
      return (
        <div className="flex h-full items-center justify-end px-2">
          {value !== null && value !== undefined ? value.toLocaleString() : ""}
        </div>
      );
    },
  };
}

/**
 * Creates an editable date column
 */
export function createEditableDateColumn<TData>(
  key: string,
  name: string,
  width?: number
): Column<TData> {
  return {
    key,
    name,
    width,
    resizable: true,
    editable: true,
    renderEditCell: DateEditor,
    renderCell: ({ row, column }) => {
      const value = row[column.key as keyof TData] as string;
      if (!value) {
        return null;
      }

      const date = new Date(value);
      return (
        <div className="flex h-full items-center px-2">
          {date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      );
    },
  };
}

/**
 * Creates an editable select/dropdown column
 */
export function createEditableSelectColumn<TData>(
  key: string,
  name: string,
  options: string[],
  width?: number
): Column<TData> {
  return {
    key,
    name,
    width,
    resizable: true,
    editable: true,
    renderEditCell: SelectEditor(options),
  };
}

/**
 * Creates a read-only text column
 */
export function createTextColumn<TData>(
  key: string,
  name: string,
  width?: number
): Column<TData> {
  return {
    key,
    name,
    width,
    resizable: true,
    editable: false,
  };
}

/**
 * Generates columns dynamically from external column definitions
 */
export function createDynamicColumns<TData>(
  definitions: ColumnDefinition[]
): Column<TData>[] {
  return definitions.map((def) => {
    if (!def.editable) {
      return createTextColumn(def.key, def.name, def.width);
    }

    switch (def.type) {
      case "text":
        return createEditableTextColumn(def.key, def.name, def.width);
      case "number":
        return createEditableNumberColumn(def.key, def.name, def.width);
      case "date":
        return createEditableDateColumn(def.key, def.name, def.width);
      case "select":
        return createEditableSelectColumn(
          def.key,
          def.name,
          def.options ?? [],
          def.width
        );
      default:
        return createTextColumn(def.key, def.name, def.width);
    }
  });
}
