import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export default async function commandHandler(client) {


    const comandosPath = path.resolve(
        process.cwd(),
        "Comandos"
    );


    if (!fs.existsSync(comandosPath)) {

        console.log(
            "⚠️ Pasta Comandos não encontrada:",
            comandosPath
        );

        return;

    }



    const arquivos = fs.readdirSync(comandosPath)
        .filter(file => file.endsWith(".js"));



    for (const arquivo of arquivos) {


        const comando = await import(
            `../Comandos/${arquivo}`
        );



        if (comando.default) {


            client.commands.set(
                comando.default.name,
                comando.default
            );


            console.log(
                `✅ Comando carregado: ${comando.default.name}`
            );


        }


    }


    console.log("✅ Comandos carregados.");

}
