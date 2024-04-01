import React from "react";
// Prisma
import { TaskStatus as TaskStatusType } from "@prisma/client";
//

const taskConfig = {
  [TaskStatusType.CANCELLED]: {
    text: "Cancelled",
    className: "bg-red-500",
  },
  [TaskStatusType.COMPLETED]: {
    text: "Completed",
    className: "bg-green-500",
  },
  [TaskStatusType.IN_PROGRESS]: {
    text: "In Progress",
    className: "bg-yellow-300 text-black",
  },
  [TaskStatusType.ON_WAIT]: {
    text: "On wait",
    className: "bg-orange-300",
  },
};

const TaskStatus = ({ status }: { status: TaskStatusType }) => {
  return (
    <div
      className={`py-2 px-4 rounded-3xl max-w-fit ${taskConfig[status]?.className}`}
    >
      {taskConfig[status]?.text}
    </div>
  );
};

export default TaskStatus;
