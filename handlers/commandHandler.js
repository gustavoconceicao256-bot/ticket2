import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export default async function commandHandler(client) {


    const pastaComandos = path.join(
        __dirname,
        "../Comandos"
    );


    const arquivos = fs.readdirSync(pastaComandos)
        .filter(arquivo => arquivo.endsWith(".js"));



    for (const arquivo of arquivos) {


        const caminho = path.join(
            pastaComandos,
            arquivo
        );


        const comando = await import(caminho);



        client.commands.set(
            comando.default.name,
            comando.default
        );


    }


    console.log("✅ Comandos carregados.");

}
