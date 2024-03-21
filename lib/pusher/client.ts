// libs/pusher/client/index.ts
import PusherClient from "pusher-js";

export const pusherClient = new PusherClient("f46b464018fb845ef188", {
  cluster: "eu",
  authEndpoint: "/api/pusher/auth",
});
