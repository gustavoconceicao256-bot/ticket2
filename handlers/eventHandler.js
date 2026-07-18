import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export default async function eventHandler(client) {


    const pasta = path.join(
        __dirname,
        "../events"
    );


    const arquivos = fs.readdirSync(pasta)
        .filter(file => file.endsWith(".js"));



    for (const arquivo of arquivos) {


        const caminho = path.join(
            pasta,
            arquivo
        );


        const evento = await import(caminho);



        if (evento.default.once) {


            client.once(
                evento.default.name,
                (...args) =>
                    evento.default.execute(...args)
            );


        } else {


            client.on(
                evento.default.name,
                (...args) =>
                    evento.default.execute(...args)
            );


        }


    }


    console.log("✅ Eventos carregados");

}
