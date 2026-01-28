"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { TableCollection } from "@/components/glide/table-collection";
import {
  createActionsColumn,
  createBadgeColumn,
  createCurrencyColumn,
  createDateColumn,
  createImageColumn,
  createSelectColumn,
  createSortableColumn,
} from "@/components/glide/table-helpers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

// Sample data types
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar?: string;
  joinedAt: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  status: string;
  image?: string;
}

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  status: string;
}

// Sample data
const sampleUsers: User[] = [
  {
    id: "1",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    role: "Admin",
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    joinedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    role: "Developer",
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
    joinedAt: "2024-02-20",
  },
  {
    id: "3",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    role: "Designer",
    status: "Away",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    joinedAt: "2024-03-10",
  },
  {
    id: "4",
    name: "William Kim",
    email: "william.kim@email.com",
    role: "Manager",
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    joinedAt: "2024-01-05",
  },
  {
    id: "5",
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    role: "Developer",
    status: "Inactive",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    joinedAt: "2023-12-01",
  },
];

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Premium Headphones",
    description: "High-quality wireless headphones",
    price: 299.99,
    category: "Electronics",
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100",
  },
  {
    id: "2",
    name: "Leather Backpack",
    description: "Stylish and durable backpack",
    price: 89.99,
    category: "Accessories",
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100",
  },
  {
    id: "3",
    name: "Smart Watch",
    description: "Feature-rich smartwatch",
    price: 399.99,
    category: "Electronics",
    status: "Low Stock",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100",
  },
  {
    id: "4",
    name: "Running Shoes",
    description: "Comfortable athletic footwear",
    price: 129.99,
    category: "Footwear",
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100",
  },
  {
    id: "5",
    name: "Coffee Maker",
    description: "Programmable coffee machine",
    price: 149.99,
    category: "Home",
    status: "Out of Stock",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=100",
  },
];

const sampleTransactions: Transaction[] = [
  {
    id: "TXN-001",
    description: "Payment received",
    amount: 500.0,
    date: "2024-01-15",
    status: "Completed",
  },
  {
    id: "TXN-002",
    description: "Subscription renewal",
    amount: 29.0,
    date: "2024-01-16",
    status: "Completed",
  },
  {
    id: "TXN-003",
    description: "Refund processed",
    amount: -150.0,
    date: "2024-01-17",
    status: "Refunded",
  },
  {
    id: "TXN-004",
    description: "Product purchase",
    amount: 89.99,
    date: "2024-01-18",
    status: "Completed",
  },
  {
    id: "TXN-005",
    description: "Service fee",
    amount: 12.0,
    date: "2024-01-19",
    status: "Pending",
  },
];

// Basic Table Example
export function BasicTable() {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
  ];

  return <TableCollection columns={columns} data={sampleUsers} />;
}

// Table with Sorting
export function TableWithSorting() {
  const columns: ColumnDef<User>[] = [
    createSortableColumn("name", "Name"),
    createSortableColumn("email", "Email"),
    createSortableColumn("role", "Role"),
    {
      accessorKey: "status",
      header: "Status",
    },
  ];

  return (
    <TableCollection
      columns={columns}
      data={sampleUsers}
      enableSorting={true}
    />
  );
}

// Table with Search
export function TableWithSearch() {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
  ];

  return (
    <TableCollection
      columns={columns}
      data={sampleUsers}
      enableFiltering={true}
      searchPlaceholder="Search users..."
    />
  );
}

// Table with Row Actions
export function TableWithRowActions() {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    createActionsColumn((row) => (
      <>
        <DropdownMenuItem onClick={() => alert(`Edit ${row.original.name}`)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => alert(`View ${row.original.name}`)}>
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive"
          onClick={() => alert(`Delete ${row.original.name}`)}
        >
          Delete
        </DropdownMenuItem>
      </>
    )),
  ];

  return <TableCollection columns={columns} data={sampleUsers} />;
}

// Table with Images
export function TableWithImages() {
  const columns: ColumnDef<User>[] = [
    createImageColumn("avatar", "User", "name"),
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
  ];

  return <TableCollection columns={columns} data={sampleUsers} />;
}

// Striped Table
export function StripedTable() {
  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    createDateColumn("date", "Date"),
    createCurrencyColumn("amount", "Amount"),
  ];

  return (
    <TableCollection
      columns={columns}
      data={sampleTransactions}
      variant="striped"
    />
  );
}

// Minimal Table
export function MinimalTable() {
  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    createCurrencyColumn("amount", "Amount"),
  ];

  return (
    <TableCollection
      columns={columns}
      data={sampleTransactions}
      variant="minimal"
    />
  );
}

// Compact Table
export function CompactTable() {
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Product",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    createCurrencyColumn("price", "Price"),
    {
      accessorKey: "status",
      header: "Status",
    },
  ];

  return (
    <TableCollection columns={columns} data={sampleProducts} size="compact" />
  );
}

// Table with Pagination
export function TableWithPagination() {
  // Generate more data for pagination
  const moreData: User[] = [
    ...sampleUsers,
    ...sampleUsers.map((u, i) => ({
      ...u,
      id: `${Number.parseInt(u.id, 10) + 5 + i}`,
      name: `${u.name} ${i + 1}`,
    })),
    ...sampleUsers.map((u, i) => ({
      ...u,
      id: `${Number.parseInt(u.id, 10) + 10 + i}`,
      name: `${u.name} ${i + 6}`,
    })),
  ];

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
  ];

  return (
    <TableCollection
      columns={columns}
      data={moreData}
      enablePagination={true}
      pageSize={5}
    />
  );
}

// Table with Selection
export function TableWithSelection() {
  const columns: ColumnDef<User>[] = [
    createSelectColumn(),
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
  ];

  return (
    <TableCollection
      columns={columns}
      data={sampleUsers}
      enablePagination={true}
      enableRowSelection={true}
      pageSize={5}
    />
  );
}

// Clickable Table
export function ClickableTable() {
  const columns: ColumnDef<Product>[] = [
    createImageColumn("image", "Image", "name"),
    {
      accessorKey: "name",
      header: "Product",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="text-muted-foreground">
          {row.getValue("description")}
        </div>
      ),
    },
    createCurrencyColumn("price", "Price"),
  ];

  return (
    <TableCollection
      columns={columns}
      data={sampleProducts}
      onRowClick={(row) => alert(`Clicked on ${row.name}`)}
    />
  );
}

// Table with All Features
export function TableWithAllFeatures() {
  const columns: ColumnDef<Product>[] = [
    createSelectColumn(),
    createImageColumn("image", "Product", "name"),
    createSortableColumn("name", "Name"),
    {
      accessorKey: "category",
      header: "Category",
    },
    createCurrencyColumn("price", "Price"),
    createBadgeColumn("status", "Status", (value) => {
      if (value === "In Stock") {
        return "default";
      }
      if (value === "Low Stock") {
        return "secondary";
      }
      if (value === "Out of Stock") {
        return "destructive";
      }
      return "default";
    }),
    createActionsColumn((row) => (
      <>
        <DropdownMenuItem onClick={() => alert(`Edit ${row.original.name}`)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => alert(`View ${row.original.name}`)}>
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive"
          onClick={() => alert(`Delete ${row.original.name}`)}
        >
          Delete
        </DropdownMenuItem>
      </>
    )),
  ];

  return (
    <TableCollection
      columns={columns}
      data={sampleProducts}
      enableFiltering={true}
      enablePagination={true}
      enableRowSelection={true}
      enableSorting={true}
      onRowClick={(row) => alert(`Clicked on ${row.name}`)}
      pageSize={3}
      searchPlaceholder="Search products..."
      toolbarActions={<Button>Add Product</Button>}
    />
  );
}

// Table with Badges
export function TableWithBadges() {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const variant =
          status === "Active"
            ? "default"
            : status === "Away"
              ? "secondary"
              : "outline";

        return (
          <Badge variant={variant as "default" | "secondary" | "outline"}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "role",
      header: "Role",
    },
  ];

  return <TableCollection columns={columns} data={sampleUsers} />;
}
