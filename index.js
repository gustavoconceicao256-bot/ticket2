import dotenv from "dotenv";
dotenv.config();

import {
    Client,
    GatewayIntentBits,
    Collection
} from "discord.js";

import keepAlive from "./utils/keepAlive.js";
import eventHandler from "./Condutores/eventHandler.js";
import commandHandler from "./Condutores/commandHandler.js";


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

await eventHandler(client);



client.login(process.env.TOKEN);
