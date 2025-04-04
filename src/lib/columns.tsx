import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

export const columns: ColumnDef<{
  name: string | number;
  color: string | number;
  weight: string | number;
  category: string | number;
  wireless: string | number;
}>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Product Name
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "color",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Color
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("color")}</div>,
  },
  {
    accessorKey: "weight",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Weight
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("weight")}</div>,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Category
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "wireless",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Wireless
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("wireless")}</div>,
  },
];
