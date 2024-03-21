export const channelChatKey = (channelID: string) =>
  `channel-${channelID}-chat`;

export const newChannelMessageKey = (channelID: string) =>
  `${channelChatKey(channelID)}-new-message`;
