import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

import commandHandler from "./Condutores/commandHandler.js";
import eventHandler from "./Condutores/eventHandler.js";
import registrarComandos from "./Condutores/registrarComandos.js";

import keepAlive from "./utils/keepAlive.js";

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

keepAlive();

await commandHandler(client);

await registrarComandos(client);

await eventHandler(client);

client.login(process.env.TOKEN)
    .then(() => {
        console.log("🤖 Bot conectado com sucesso!");
    })
    .catch((err) => {
        console.error("❌ Erro ao conectar o bot:", err);
    });
