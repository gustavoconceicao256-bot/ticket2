import dotenv from "dotenv";
dotenv.config();

import {
    Client,
    GatewayIntentBits,
    Collection
} from "discord.js";


import keepAlive from "./utils/keepAlive.js";


import commandHandler from "./handlers/commandHandler.js";
import eventHandler from "./handlers/eventHandler.js";
import registrarComandos from "./handlers/registrarComandos.js";



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



client.login(process.env.TOKEN);
