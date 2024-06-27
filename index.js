const TelegramBot = require('node-telegram-bot-api');
const token = 'YOUR_BOT_TOKEN'; // Replace with your actual bot token
const bot = new TelegramBot(token, { polling: true });

const GROUP_ID = -4226889924; // Your group ID
const GROUP_LINK = 'https://t.me/+U3TzOtic2x4zYzc9'; // Your group link

bot.on('message', (msg) => {
    if (msg.chat.id === GROUP_ID) {
        // Handle messages from the specific group
        bot.sendMessage(msg.chat.id, 'Hello, group!');
    } else if (msg.chat.type === 'private') {
        // Handle private messages
        bot.sendMessage(msg.chat.id, `To use this bot, please join our group: ${GROUP_LINK}`);
    }
});
