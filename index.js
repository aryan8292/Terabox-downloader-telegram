async function main() {
  const { Telegraf, Markup } = require("telegraf");
  const { getDetails } = require("./api");
  const { sendFile } = require("./utils");
  const express = require("express");

  const bot = new Telegraf(process.env.BOT_TOKEN);
  const channelId = "-1002156461761" // Add this line for the channel ID

  bot.start(async (ctx) => {
    try {
      ctx.reply(
        `Hi ${ctx.message.from.first_name},\n\nI can Download Files from Terabox.\n\nMade with ❤️ by @botcodes123\n\nSend any terabox link to download.`,
        Markup.inlineKeyboard([
          Markup.button.url("Channel", "https://t.me/botcodes123"),
          Markup.button.url("Report bug", "https://t.me/Armanidrisi_bot"),
        ]),
      );
    } catch (e) {
      console.error(e);
    }
  });

  bot.on("message", async (ctx) => {
    if (ctx.message && ctx.message.text) {
      const messageText = ctx.message.text;
      if (
        messageText.includes("terabox.com") ||
        messageText.includes("teraboxapp.com")
      ) {
        const details = await getDetails(messageText);
        if (details && details.direct_link) {
          try {
            ctx.reply(`Sending Files Please Wait.!!`);
            await sendFile(details.direct_link, ctx, channelId); // Pass channel ID
          } catch (e) {
            console.error(e);
          }
        } else {
          ctx.reply('Something went wrong 🙃');
        }
        console.log(details);
      } else {
        ctx.reply("Please send a valid Terabox link.");
      }
    }
  });

  const app = express();
  app.use(await bot.createWebhook({ domain: process.env.WEBHOOK_URL }));

  app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
}

main();
