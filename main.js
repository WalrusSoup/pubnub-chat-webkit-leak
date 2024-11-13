import { Chat } from "@pubnub/chat"

Chat.init({
    publishKey: import.meta.env.VITE_PUBNUB_PUB_KEY,
    subscribeKey: import.meta.env.VITE_PUBNUB_SUB_KEY,
    userId: "user_1111"
}).then(async (chat) => {
  const currentTimestamp = new Date().getTime();
  // make a second user 
  const secondUser = await chat.createUser(`user_${currentTimestamp}`, {
    name: `User ${currentTimestamp}`,
    profileUrl: "https://www.example.com/profile.png"
  });
  const { channel } = await chat.createDirectConversation({
    user: secondUser,
    channelId: `direct-user-${secondUser.id}-${currentTimestamp}`
  });
  channel.join((msg) => {
    console.log(msg);
  })
});
