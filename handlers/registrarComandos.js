import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { REST, Routes } from "discord.js";
import dotenv from "dotenv";

dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default async function registrarComandos(client) {


    const commandsPath = path.join(
        __dirname,
        "../commands"
    );


    if (!fs.existsSync(commandsPath)) {

        console.log(
            "⚠️ Pasta commands não encontrada:",
            commandsPath
        );

        return;

    }


    const comandos = [];


    const arquivos = fs.readdirSync(commandsPath)
        .filter(file => file.endsWith(".js"));



    for (const arquivo of arquivos) {


        const command = await import(
            `../commands/${arquivo}`
        );


        if (command.default) {


            comandos.push(
                command.default.data.toJSON()
            );


            console.log(
                `✅ Comando encontrado: ${command.default.data.name}`
            );


        }

    }



    const rest = new REST({ version: "10" })
        .setToken(process.env.TOKEN);



    try {


        await rest.put(

            Routes.applicationGuildCommands(

                process.env.CLIENT_ID,

                process.env.GUILD_ID

            ),

            {
                body: comandos
            }

        );


        console.log(
            "✅ Comandos registrados no servidor."
        );


    } catch (error) {


        console.error(
            "❌ Erro ao registrar comandos:",
            error
        );


    }


}
