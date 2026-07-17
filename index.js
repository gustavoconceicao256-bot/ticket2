import dotenv from "dotenv";
dotenv.config();

import {
    Client,
    GatewayIntentBits,
    Collection
} from "discord.js";

import keepAlive from "./utils/keepAlive.js";

import eventHandler from "./handlers/eventHandler.js";

import commandHandler from "./Condutores/commandHandler.js";

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


await registrarComandos();


await eventHandler(client);



client.login(process.env.TOKEN);
