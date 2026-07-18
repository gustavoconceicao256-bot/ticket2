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



    if (!fs.existsSync(pastaComandos)) {

        console.log("⚠️ Pasta Comandos não encontrada.");

        return;

    }



    const arquivos = fs.readdirSync(pastaComandos)
        .filter(arquivo => arquivo.endsWith(".js"));



    for (const arquivo of arquivos) {


        const caminho = path.join(
            pastaComandos,
            arquivo
        );


        const comando = await import(caminho);



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
