import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

import commandHandler from "./handlers/commandHandler.js";
import eventHandler from "./handlers/eventHandler.js";
import registrarComandos from "./handlers/registrarComandos.js";

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


client.commands = new Map();


keepAlive();


console.log("🚀 Iniciando bot...");


await commandHandler(client);


await registrarComandos(client);


await eventHandler(client);



client.login(process.env.TOKEN)

.then(() => {

    console.log(`🤖 Bot conectado como ${client.user.tag}`);

})

.catch((error) => {

    console.error("❌ Erro ao conectar o bot:", error);

});
