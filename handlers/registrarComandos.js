import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import dotenv from "dotenv";
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export default async function registrarComandos() {


    const comandos = [];


    const pasta = path.join(
        __dirname,
        "../Comandos"
    );


    const arquivos = fs.readdirSync(pasta)
        .filter(file => file.endsWith(".js"));



    for (const arquivo of arquivos) {


        const caminho = path.join(
            pasta,
            arquivo
        );


        const comando = await import(caminho);


        comandos.push(comando.default.data.toJSON());


    }



    const rest = new REST({

        version: "10"

    }).setToken(process.env.TOKEN);




    await rest.put(

        Routes.applicationCommands(
            process.env.CLIENT_ID
        ),

        {

            body: comandos

        }

    );



    console.log("✅ Comandos registrados.");

}
