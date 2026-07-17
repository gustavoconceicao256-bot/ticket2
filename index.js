import dotenv from "dotenv";
dotenv.config();

import {
    Client,
    GatewayIntentBits,
    Collection
} from "discord.js";

import keepAlive from "./utils/keepAlive.js";

import commandHandler from "./Condutores/commandHandler.js";
import eventHandler from "./Condutores/eventHandler.js";
import registrarComandos from "./Condutores/registrarComandos.js";


keepAlive();


const client = new Client({

    intents: [

        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent

    ]

});


client.commands = new Collection();



await commandHandler(client);

await registrarComandos(client);

await eventHandler(client);



client.once("ready", () => {

    console.log("==================================");
    console.log("🤖 BOT ONLINE");
    console.log(`👤 ${client.user.tag}`);
    console.log(`🆔 ${client.user.id}`);
    console.log("==================================");

});



client.login(process.env.TOKEN);
