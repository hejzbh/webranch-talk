"use client";
import React from "react";
// Next
import dynamic from "next/dynamic";
// Prisma
import { ServerChannel, Task } from "@prisma/client";
// Icons
import { Plus } from "lucide-react";
// Components
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { useModalControl } from "@/components/providers/ModalProvider";
const Button = dynamic(() => import("@/components/ui/Button"));

// Props
interface TodoListProps {
  className?: string;
  tasks: Task[];
  channelID: string;
}

const TodoList = ({ className = "", tasks = [], channelID }: TodoListProps) => {
  const table = useReactTable({
    data: tasks,
    columns: [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "status", header: "Status" },
      {
        accessorKey: "author",
        header: "Author",
        cell: ({ row }) => {
          return (
            <div className="text-right font-medium">{row?.getValue("id")}</div>
          );
        },
      },
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  const { onOpen } = useModalControl();

  return (
    <div>
      {" "}
      <Table>
        {/** Header */}
        <TableHeader className="relative">
          {" "}
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
          <Button
            className="absolute top-[50%] translate-y-[-50%] right-5 !rounded-full !p-1"
            title=""
            onClick={() =>
              onOpen("createTask", {
                channel: { id: channelID } as ServerChannel,
              })
            }
          >
            <Plus />
          </Button>
        </TableHeader>
        {/** Body */}
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                className="h-24 text-center w-full text-xl"
                colSpan={3}
              >
                There are no tasks
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodoList;
