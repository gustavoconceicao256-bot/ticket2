import { Client, GatewayIntentBits, Collection, ActivityType } from "discord.js";
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

    console.log(
        "💚 Bot ativo:",
        new Date().toLocaleString()
    );

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
// ===============================
// INICIALIZAÇÃO
// ===============================

console.log("🚀 Iniciando bot...");

try {

    await commandHandler(client);
    console.log("✅ Comandos carregados");

    await registrarComandos(client);
    console.log("✅ Slash Commands registrados");

    await eventHandler(client);
    console.log("✅ Eventos carregados");

} catch (error) {

    console.error("❌ Erro ao iniciar o bot:", error);
    process.exit(1);

}
// ===============================
// LOGIN DISCORD
// ===============================

if (!process.env.TOKEN) {

    console.error("❌ TOKEN não encontrada no arquivo .env");
    process.exit(1);

}

console.log("🔑 TOKEN carregada com sucesso");
console.log("TOKEN INICIO:", process.env.TOKEN?.slice(0, 10));
console.log("TOKEN FIM:", process.env.TOKEN?.slice(-10));
console.log("TAMANHO:", process.env.TOKEN?.length);
console.log("TOKEN TEM PONTO:", process.env.TOKEN.includes("."));
console.log("TOKEN TAMANHO:", process.env.TOKEN.length);

client.login(process.env.TOKEN)
    .then(() => {

        console.log("✅ Login realizado com sucesso");

    })
    .catch((error) => {

        console.error("❌ Erro ao conectar o bot:", error);

    });

// ===============================
// EXPORT
// ===============================

export default client;
