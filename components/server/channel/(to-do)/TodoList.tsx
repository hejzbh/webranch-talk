"use client";
import React from "react";
// Next
import dynamic from "next/dynamic";
// Prisma
import { Account, ServerChannel, Task } from "@prisma/client";
// Icons
import { Plus } from "lucide-react";
// Components
import {
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
const UserAvatar = dynamic(() => import("@/components/ui/UserAvatar"));
const TaskStatus = dynamic(() => import("./TaskStatus"));

// Props
interface TodoListProps {
  className?: string;
  tasks: Task[];
  channelID: string;
}

const TodoList = ({ className = "", tasks = [], channelID }: TodoListProps) => {
  const { toggleModal } = useModalControl();

  const table = useReactTable({
    data: tasks,
    columns: [
      { accessorKey: "name", header: "Name" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status");

          return <TaskStatus status={status as any} />;
        },
      },
      {
        accessorKey: "author",
        header: "Author",
        cell: ({ row }) => {
          const author = row.getValue("author") as Account;

          return (
            <div className="font-medium flex items-center space-x-2">
              <UserAvatar imageURL={author?.imageURL} />
              <p>{author?.name}</p>
            </div>
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
            table.getRowModel().rows.map((row, idx) => (
              <TableRow
                className="cursor-pointer"
                key={row.id}
                onClick={() => onOpen("manageTask", { task: tasks[idx] })}
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
