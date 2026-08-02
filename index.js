throw new Error("TESTE CHATGPT");

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



// ===============================
// KEEP ALIVE RENDER
// ===============================

keepAlive();



// ===============================
// SISTEMA DE ATIVIDADE
// ===============================

client.once("ready", () => {


    console.log(
        `🤖 Bot conectado como ${client.user.tag}`
    );


    client.user.setActivity(
        "Sistema Oficial GTT",
        {
            type: 3
        }
    );


});




// ===============================
// HEARTBEAT
// ===============================

setInterval(() => {


    console.log(

        "💚 Bot ativo:",

        new Date().toLocaleString()

    );


}, 60000);




// ===============================
// PROTEÇÃO CONTRA ERROS
// ===============================

process.on(
    "unhandledRejection",
    (error) => {


        console.error(

            "❌ Erro não tratado:",

            error

        );


    }
);



process.on(
    "uncaughtException",
    (error) => {


        console.error(

            "❌ Erro crítico:",

            error

        );


    }
);




// ===============================
// INICIALIZAÇÃO
// ===============================

console.log(
    "🚀 Iniciando bot..."
);



await commandHandler(client);



await registrarComandos(client);



await eventHandler(client);


// ===============================
// LOGIN DISCORD
// ===============================

console.log("TOKEN existe?", !!process.env.TOKEN);
console.log("Primeiros 10 caracteres:", process.env.TOKEN?.slice(0, 10));
console.log("Tamanho do token:", process.env.TOKEN?.length);

client.login(process.env.TOKEN)
    .then(() => {

        console.log("✅ Login realizado com sucesso");

    })
    .catch((error) => {

        console.error("❌ Erro ao conectar o bot:", error);

    });
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



// ===============================
// KEEP ALIVE RENDER
// ===============================

keepAlive();



// ===============================
// SISTEMA DE ATIVIDADE
// ===============================

client.once("ready", () => {


    console.log(
        `🤖 Bot conectado como ${client.user.tag}`
    );


    client.user.setActivity(
        "Sistema Oficial GTT",
        {
            type: 3
        }
    );


});




// ===============================
// HEARTBEAT
// ===============================

setInterval(() => {


    console.log(

        "💚 Bot ativo:",

        new Date().toLocaleString()

    );


}, 60000);




// ===============================
// PROTEÇÃO CONTRA ERROS
// ===============================

process.on(
    "unhandledRejection",
    (error) => {


        console.error(

            "❌ Erro não tratado:",

            error

        );


    }
);



process.on(
    "uncaughtException",
    (error) => {


        console.error(

            "❌ Erro crítico:",

            error

        );


    }
);




// ===============================
// INICIALIZAÇÃO
// ===============================

console.log(
    "🚀 Iniciando bot..."
);



await commandHandler(client);



await registrarComandos(client);



await eventHandler(client);


// ===============================
// LOGIN DISCORD
// ===============================

console.log("TOKEN existe?", !!process.env.TOKEN);
console.log("Primeiros 10 caracteres:", process.env.TOKEN?.slice(0, 10));
console.log("Tamanho do token:", process.env.TOKEN?.length);

client.login(process.env.TOKEN)
    .then(() => {

        console.log("✅ Login realizado com sucesso");

    })
    .catch((error) => {

        console.error("❌ Erro ao conectar o bot:", error);

    });
