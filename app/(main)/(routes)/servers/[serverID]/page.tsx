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
  return redirect(`/servers/${params.serverID}/channels/general/text`);
};

export default ServerPage;
