import dotenv from "dotenv";
dotenv.config();

import keepAlive from "./config/utils/keepAlive.js";

import {
    Client,
    GatewayIntentBits
} from "discord.js";

keepAlive();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once("clientReady", () => {

    console.clear();

    console.log("==================================");
    console.log("🤖 BOT ONLINE");
    console.log(`👤 ${client.user.tag}`);
    console.log(`🆔 ${client.user.id}`);
    console.log("==================================");

});

client.login(process.env.TOKEN);
