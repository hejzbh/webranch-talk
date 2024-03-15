// Next
import { redirect } from "next/navigation";
// Lib
import { db } from "@/lib/db";

// Props
interface ServerPageProps {
  params: {
    serverID: string;
  };
}

const ServerPage = async ({ params }: ServerPageProps) => {
  const generalChannel = await db.serverChannel.findFirst({
    where: {
      serverID: params.serverID,
      name: "general",
    },
  });

  if (generalChannel) {
    return redirect(
      `/servers/${params.serverID}/channels/${generalChannel?.id}`
    );
  }

  return null;
};

export default ServerPage;
