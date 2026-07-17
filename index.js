import dotenv from "dotenv";
dotenv.config();


import {
    Client,
    GatewayIntentBits,
    Collection
} from "discord.js";


import commandHandler from "./Condutores/commandHandler.js";
import eventHandler from "./Condutores/eventHandler.js";
import registrarComandos from "./Condutores/registrarComandos.js";


import keepAlive from "./utils/keepAlive.js";



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



try {


    await commandHandler(client);


    await registrarComandos(client);


    await eventHandler(client);



} catch (error) {


    console.error("❌ Erro ao carregar sistema:");

    console.error(error);


}



client.login(process.env.TOKEN);
