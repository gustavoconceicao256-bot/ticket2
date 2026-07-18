import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import config from "../config.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default async function registrarComandos(client) {

    const commandsPath = path.join(
        __dirname,
        "../commands"
    );


    const commands = [];


    if (!fs.existsSync(commandsPath)) {

        console.log("⚠️ Pasta commands não encontrada.");
        return;

    }


    const files = fs.readdirSync(commandsPath)
        .filter(file => file.endsWith(".js"));


    for (const file of files) {

        const command = await import(
            `../commands/${file}`
        );


        if (command.default) {

            commands.push(command.default.data.toJSON());

        }

    }


    const rest = new REST({ version: "10" })
        .setToken(process.env.TOKEN);


    try {

        await rest.put(
            Routes.applicationGuildCommands(
                client.user.id,
                config.guildId
            ),
            {
                body: commands
            }
        );


        console.log(`✅ ${commands.length} comandos registrados.`);


    } catch (error) {

        console.error(
            "❌ Erro ao registrar comandos:",
            error
        );

    }

}
