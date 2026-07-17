import express from "express";

const app = express();


function keepAlive() {

    app.get("/", (req, res) => {

        res.send("Bot online!");

    });


    app.listen(3000, () => {

        console.log("🌐 Keep Alive ativo.");

    });

}


export default keepAlive;
