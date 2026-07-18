import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("📁 Pasta atual:", __dirname);

console.log("📂 Arquivos na raiz:");
console.log(fs.readdirSync(__dirname));

const condutores = path.join(__dirname, "Condutores");

console.log("📂 Condutores existe?", fs.existsSync(condutores));

if (fs.existsSync(condutores)) {
    console.log("📄 Arquivos dentro de Condutores:");
    console.log(fs.readdirSync(condutores));
}
