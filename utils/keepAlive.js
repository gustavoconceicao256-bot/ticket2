import express from "express";


const app = express();



export default function keepAlive() {


    app.get("/", (req, res) => {

        res.send("Bot online!");

    });



    app.listen(3000, () => {

        console.log("🌐 Keep Alive iniciado.");

    });


}
