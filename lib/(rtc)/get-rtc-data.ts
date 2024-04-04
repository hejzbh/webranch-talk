import { RtcTokenBuilder, RtcRole } from "agora-access-token";

export const getRtcData = ({
  channelID,
  currentAccountID,
}: {
  channelID: string;
  currentAccountID: string;
}) => {
  const appID = "aef2fad1905a4be0b65091b66cb47a67";
  const appCertificate = "c34f874396e64061bdb7f1852d9e0ca5";
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
