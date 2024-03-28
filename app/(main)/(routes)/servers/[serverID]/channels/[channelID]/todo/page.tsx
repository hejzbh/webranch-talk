import React from "react";
// Next
import dynamic from "next/dynamic";
// Lib
import { getTodoTasks } from "@/lib/(serverChannel)/get-todo-tasks";
// Components
const TodoList = dynamic(
  () => import("@/components/server/channel/(to-do)/TodoList")
);

// Props
interface TodoChannelPageProps {
  params: {
    serverID: string;
    channelID: string;
  };
}

const TodoChannelPage = async ({ params }: TodoChannelPageProps) => {
  const tasks = await getTodoTasks(params.channelID);

  console.log(tasks);
  console.log("🤣🤣✅✅✅");

  return (
    <div className="p-2 md:p-5">
      <TodoList tasks={tasks} channelID={params.channelID} />
    </div>
  );
};

export default TodoChannelPage;
