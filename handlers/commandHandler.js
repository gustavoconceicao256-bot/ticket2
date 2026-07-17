import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default async function commandHandler(client) {

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


        client.commands.set(
            command.default.name,
            command.default
        );


    }


    console.log(
        `✅ ${files.length} comandos carregados`
    );

}
