import { RtcTokenBuilder, RtcRole } from "agora-access-token";

export const getRtcData = ({
  channelID,
  currentAccountID,
}: {
  channelID: string;
  currentAccountID: string;
}) => {
  const appID = process.env.NEXT_PUBLIC_AGORA_APP_ID!;
  const appCertificate = process.env.NEXT_PUBLIC_AGORA_CERTIFICATE!;
  const channel = channelID;
  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithAccount(
    appID,
    appCertificate,
    channelID,
    currentAccountID,
    role,
    privilegeExpiredTs
  );

  return { token, channel, currentAccountID, role, appID };
};
