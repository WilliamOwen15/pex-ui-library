"use client";

import { useCallback, useMemo, useState } from "react";
import { DataGrid } from "@/components/glide/data-grid";
import type { ColumnDefinition } from "@/components/glide/data-grid-helpers";
import {
  createEditableDateColumn,
  createEditableNumberColumn,
  createEditableSelectColumn,
  createEditableTextColumn,
  createRowNumberColumn,
  createSelectColumn,
} from "@/components/glide/data-grid-helpers";
import { Button } from "@/components/ui/button";

// Sample data types
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  lastUpdated: string;
}

// Sample data
const sampleUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    age: 28,
    role: "Developer",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    age: 32,
    role: "Designer",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    age: 45,
    role: "Manager",
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alice@example.com",
    age: 29,
    role: "Developer",
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie@example.com",
    age: 35,
    role: "Designer",
  },
];

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Laptop Pro",
    price: 1299,
    stock: 45,
    category: "Electronics",
    lastUpdated: "2024-01-15",
  },
  {
    id: 2,
    name: "Wireless Mouse",
    price: 29,
    stock: 120,
    category: "Accessories",
    lastUpdated: "2024-01-20",
  },
  {
    id: 3,
    name: "USB-C Hub",
    price: 49,
    stock: 78,
    category: "Accessories",
    lastUpdated: "2024-01-18",
  },
  {
    id: 4,
    name: 'Monitor 27"',
    price: 399,
    stock: 32,
    category: "Electronics",
    lastUpdated: "2024-01-22",
  },
  {
    id: 5,
    name: "Keyboard Mechanical",
    price: 89,
    stock: 56,
    category: "Accessories",
    lastUpdated: "2024-01-19",
  },
];

/**
 * Basic editable data grid with simple text and number columns
 */
export function BasicDataGrid() {
  const [data, setData] = useState(sampleUsers);

  const columns = useMemo(
    () => [
      createEditableTextColumn<User>("name", "Name", 200),
      createEditableTextColumn<User>("email", "Email", 250),
      createEditableNumberColumn<User>("age", "Age", 100),
      createEditableTextColumn<User>("role", "Role", 150),
    ],
    []
  );

  return (
    <DataGrid
      columns={columns}
      data={data}
      onDataChange={setData}
      rowHeight={40}
      variant="default"
    />
  );
}

/**
 * Data grid with dynamic columns from external source
 */
export function DataGridWithDynamicColumns() {
  const [data, setData] = useState(sampleProducts);

  const columnDefinitions: ColumnDefinition[] = [
    {
      key: "name",
      name: "Product Name",
      type: "text",
      editable: true,
      width: 200,
    },
    {
      key: "price",
      name: "Price ($)",
      type: "number",
      editable: true,
      width: 120,
    },
    {
      key: "stock",
      name: "Stock",
      type: "number",
      editable: true,
      width: 100,
    },
    {
      key: "category",
      name: "Category",
      type: "select",
      editable: true,
      options: ["Electronics", "Accessories", "Office"],
      width: 150,
    },
    {
      key: "lastUpdated",
      name: "Last Updated",
      type: "date",
      editable: true,
      width: 150,
    },
  ];

  return (
    <DataGrid
      columnDefinitions={columnDefinitions}
      data={data}
      onDataChange={setData}
      rowHeight={40}
      variant="default"
    />
  );
}

/**
 * Data grid with row selection, delete, and copy actions
 */
export function DataGridWithSelection() {
  const [data, setData] = useState(sampleUsers);

  const columns = useMemo(
    () => [
      createSelectColumn<User>(),
      createRowNumberColumn<User>(),
      createEditableTextColumn<User>("name", "Name", 200),
      createEditableTextColumn<User>("email", "Email", 250),
      createEditableNumberColumn<User>("age", "Age", 100),
      createEditableTextColumn<User>("role", "Role", 150),
    ],
    []
  );

  return (
    <DataGrid
      columns={columns}
      data={data}
      enableDeleteRow
      enableRowSelection
      onDataChange={setData}
      rowHeight={40}
      variant="default"
    />
  );
}

/**
 * Data grid with custom editors (select dropdown, date picker)
 */
export function DataGridWithCustomEditors() {
  const [data, setData] = useState(sampleProducts);

  const columns = useMemo(
    () => [
      createEditableTextColumn<Product>("name", "Product Name", 200),
      createEditableNumberColumn<Product>("price", "Price ($)", 120),
      createEditableNumberColumn<Product>("stock", "Stock", 100),
      createEditableSelectColumn<Product>(
        "category",
        "Category",
        ["Electronics", "Accessories", "Office"],
        150
      ),
      createEditableDateColumn<Product>("lastUpdated", "Last Updated", 150),
    ],
    []
  );

  return (
    <DataGrid
      columns={columns}
      data={data}
      onDataChange={setData}
      rowHeight={40}
      variant="default"
    />
  );
}

/**
 * Full-featured data grid with all features enabled
 */
export function FullFeaturedDataGrid() {
  const [data, setData] = useState(sampleProducts);

  const columns = useMemo(
    () => [
      createSelectColumn<Product>(),
      createRowNumberColumn<Product>(),
      createEditableTextColumn<Product>("name", "Product Name", 200),
      createEditableNumberColumn<Product>("price", "Price ($)", 120),
      createEditableNumberColumn<Product>("stock", "Stock", 100),
      createEditableSelectColumn<Product>(
        "category",
        "Category",
        ["Electronics", "Accessories", "Office"],
        150
      ),
      createEditableDateColumn<Product>("lastUpdated", "Last Updated", 150),
    ],
    []
  );

  const handleAddRow = useCallback(() => {
    return {
      id: data.length + 1,
      name: "",
      price: 0,
      stock: 0,
      category: "Electronics",
      lastUpdated: new Date().toISOString().split("T")[0],
    } as Product;
  }, [data.length]);

  return (
    <DataGrid
      columns={columns}
      data={data}
      enableAddRow
      enableDeleteRow
      enableRowSelection
      enableSearch
      enableSorting
      onAddRow={handleAddRow}
      onDataChange={setData}
      rowHeight={40}
      searchPlaceholder="Search products..."
      toolbarActions={
        <Button size="sm" variant="outline">
          Export
        </Button>
      }
      variant="default"
    />
  );
}

/**
 * Compact striped data grid for dense data display
 */
export function CompactStripedDataGrid() {
  const [data, setData] = useState(sampleUsers);

  const columns = useMemo(
    () => [
      createRowNumberColumn<User>(),
      createEditableTextColumn<User>("name", "Name", 180),
      createEditableTextColumn<User>("email", "Email", 220),
      createEditableNumberColumn<User>("age", "Age", 80),
      createEditableTextColumn<User>("role", "Role", 130),
    ],
    []
  );

  return (
    <DataGrid
      columns={columns}
      data={data}
      onDataChange={setData}
      rowHeight={32}
      size="compact"
      variant="striped"
    />
  );
}

/**
 * Minimal data grid with search only
 */
export function MinimalDataGrid() {
  const [data, setData] = useState(sampleUsers);

  const columns = useMemo(
    () => [
      createEditableTextColumn<User>("name", "Name", 200),
      createEditableTextColumn<User>("email", "Email", 250),
      createEditableNumberColumn<User>("age", "Age", 100),
      createEditableTextColumn<User>("role", "Role", 150),
    ],
    []
  );

  return (
    <DataGrid
      columns={columns}
      data={data}
      enableSearch
      onDataChange={setData}
      rowHeight={40}
      searchPlaceholder="Filter users..."
      variant="minimal"
    />
  );
}
