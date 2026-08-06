import { Client, GatewayIntentBits, Collection } from "discord.js";
import dotenv from "dotenv";

import commandHandler from "./handlers/commandHandler.js";
import eventHandler from "./handlers/eventHandler.js";
import registrarComandos from "./handlers/registrarComandos.js";

import keepAlive from "./utils/keepAlive.js";

dotenv.config();


// ===============================
// CLIENT
// ===============================

const client = new Client({

    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]

});


client.commands = new Collection();


// ===============================
// KEEP ALIVE
// ===============================

keepAlive();


// ===============================
// HEARTBEAT
// ===============================

setInterval(() => {

    if (client.user) {

        console.log(
            `💚 Online: ${client.user.tag} | ${new Date().toLocaleString()}`
        );

    }

}, 60000);


// ===============================
// PROTEÇÃO CONTRA ERROS
// ===============================

process.on("unhandledRejection", (error) => {

    console.error("❌ Erro não tratado:", error);

});


process.on("uncaughtException", (error) => {

    console.error("❌ Erro crítico:", error);

});


process.on("warning", (warning) => {

    console.warn("⚠️ Aviso:", warning);

});


process.on("SIGTERM", () => {

    console.log("⚠️ Encerramento solicitado pelo servidor");

    process.exit(0);

});


// ===============================
// CARREGAR SISTEMAS
// ===============================

console.log("🚀 Iniciando bot...");


try {


    await commandHandler(client);

    console.log("✅ Comandos carregados");


    await eventHandler(client);

    console.log("✅ Eventos carregados");


} catch (error) {


    console.error("❌ Erro ao carregar sistemas:", error);

    process.exit(1);


}



// ===============================
// LOGIN DISCORD
// ===============================

if (!process.env.TOKEN) {


    console.error("❌ TOKEN não encontrada");

    process.exit(1);


}


client.login(process.env.TOKEN)

.then(async () => {


    console.log("✅ Login realizado com sucesso");


    try {


        await registrarComandos(client);


        console.log("✅ Slash Commands registrados");


    } catch (error) {


        console.error("❌ Erro ao registrar comandos:", error);


    }


})


.catch((error) => {


    console.error("❌ Erro ao conectar o bot:", error);


});



// ===============================
// EXPORT
// ===============================

export default client;
