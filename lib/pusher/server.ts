// libs/pusher/server/index.ts
import PusherServer from "pusher";

let pusherInstance: PusherServer | null = null;

export const getPusherInstance = () => {
  if (!pusherInstance) {
    pusherInstance = new PusherServer({
      appId: "1775432",
      key: "f46b464018fb845ef188",
      secret: "9c55d67ae8a7dda573ce",
      cluster: "eu",
      useTLS: true,
    });
  }
  return pusherInstance;
};
