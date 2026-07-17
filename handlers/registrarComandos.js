import fs from "fs";
import path from "path";
import { REST, Routes } from "discord.js";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export default async function registrarComandos(client) {


    const commands = [];


    const commandsPath = path.join(
        __dirname,
        "../Comandos"
    );



    if (!fs.existsSync(commandsPath)) {

        console.log("⚠️ Pasta Comandos não encontrada.");
        return;

    }



    const files = fs.readdirSync(commandsPath)
        .filter(file => file.endsWith(".js"));



    for (const file of files) {


        const command = await import(
            `../Comandos/${file}`
        );


        if(command.default?.data){

            commands.push(
                command.default.data.toJSON()
            );

        }


    }



    const rest = new REST({
        version: "10"
    }).setToken(
        process.env.TOKEN
    );



    await rest.put(

        Routes.applicationCommands(
            process.env.CLIENT_ID
        ),

        {
            body: commands
        }

    );


    console.log(
        `✅ ${commands.length} comandos registrados`
    );


}
