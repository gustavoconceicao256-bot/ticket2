import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


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


    const arquivos = fs.readdirSync(commandsPath)
        .filter(file => file.endsWith(".js"));


    for (const arquivo of arquivos) {


        const command = await import(
            `../commands/${arquivo}`
        );


        if (command.default) {


            console.log(
                `✅ Comando registrado: ${command.default.data.name}`
            );


        }

    }


    console.log("✅ Comandos registrados.");

}
