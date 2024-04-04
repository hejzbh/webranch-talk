// NPM
import { useCurrentAccount } from "@/components/providers/CurrentAccountProvider";
import { getRtcData } from "@/lib/(rtc)/get-rtc-data";
import { Account } from "@prisma/client";
import AgoraRTC, { IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";

// Props
interface UseRTCProps {
  channelID: string;
}

const RTC = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

let connecting = false;
let connected = false;

export const useRTC = ({ channelID }: UseRTCProps) => {
  const currentAccount: Account = useCurrentAccount();
  const [participants, setParticipants] = useState<
    { id: string; audioTrack?: IRemoteAudioTrack }[]
  >([]);

  useEffect(() => {
    // 1)
    if (!channelID || connecting || connected) return;
    // 2)
    connectToAgora(); // eslint-disable-line
    // 3)
    return () => {
      connected = false;
      connecting = false;
    };
  }, [channelID]);

  function connectToAgora() {
    try {
      connecting = true;

      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        var audioContext = new AudioContext();
        audioContext.resume();
      });

      const { token, channel, appID, currentAccountID } = getRtcData({
        currentAccountID: currentAccount?.id,
        channelID,
      });

      // 2)
      RTC.join(appID, channel, token, currentAccountID)
        .then(() => {
          connecting = false;
          connected = true;

          return AgoraRTC.createMicrophoneAudioTrack();
        })
        .then((audioTrack) => {
          RTC.publish(audioTrack);
        });

      // 3)
      getSoundFromStrangers();
    } catch (err: any) {
      console.log(err);
      console.log("🎇🎇🎇🎇🎇🎇🎇🎇🎇🎇🎇🎇");
    }
  }

  function getSoundFromStrangers() {
    RTC.on("user-published", async (user, mediaType) => {
      await RTC.subscribe(user, mediaType);

      if (participants.some((participant) => participant.id === user.uid)) {
        setParticipants((participants) =>
          participants.filter((participant) =>
            participant?.id === user.uid
              ? { ...participant, audioTrack: user.audioTrack }
              : participant
          )
        );
      } else {
        setParticipants((participants) => [
          ...participants,
          { id: user.uid as string, audioTrack: user.audioTrack },
        ]);
      }
    });
  }

  return { participants };
};
