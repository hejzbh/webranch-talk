// Next
import { redirect } from "next/navigation";
// Lib
import { db } from "@/lib/db";
import { channelRoute } from "@/lib/(routes)/channel-route";

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
      channelRoute({
        serverID: params.serverID,
        channelID: generalChannel.id,
        channelType: generalChannel.type,
      })
    );
  }

  return null;
};

export default ServerPage;
