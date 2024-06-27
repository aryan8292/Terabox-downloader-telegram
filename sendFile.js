async function sendFile(directLink, ctx, channelId) {
  try {
    // Send the file to the user
    await ctx.replyWithDocument({ url: directLink }, { caption: 'Here is your file!' });

    // Send the file to the channel
    if (channelId) {
      await ctx.telegram.sendDocument(channelId, { url: directLink }, { caption: 'New file uploaded!' });
    }
  } catch (error) {
    console.error("Error sending file:", error);
  }
}

module.exports = { sendFile };
