// Types / Components
import { formSchema } from "@/components/forms/(server)/CreateServerForm";
import { Server } from "@prisma/client";
// NPM
import axios from "axios";
import { z } from "zod";

export async function createServer(serverData: z.infer<typeof formSchema>) {
  try {
    // 1)
    const response = await axios.post(`/api/servers/`, serverData);
    // 2)
    if (!response.data) throw new Error("");
    // 3)
    return response.data as Server;
  } catch (err: any) {
    throw new Error(err?.response?.data || err?.message);
  }
}
