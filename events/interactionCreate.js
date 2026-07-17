import abrirTicket from "../selectMenus/abrirTicket.js";
import testeTatico from "../Modais/testeTatico.js";

import aceitarTeste from "../Botões/aceitarTeste.js";
import recusarTeste from "../Botões/recusarTeste.js";


export default {
    name: "interactionCreate",

    async execute(interaction) {


        // MENU SELECT
        if (interaction.isStringSelectMenu()) {

            if (interaction.customId === "abrirTicket") {
                return abrirTicket.execute(interaction);
            }

        }



        // MODAL
        if (interaction.isModalSubmit()) {

            if (interaction.customId === "testeTatico") {
                return testeTatico.execute(interaction);
            }

        }



        // BOTÕES
        if (interaction.isButton()) {


            if (interaction.customId.startsWith("aceitarTeste_")) {

                return aceitarTeste.execute(interaction);

            }


            if (interaction.customId.startsWith("recusarTeste_")) {

                return recusarTeste.execute(interaction);

            }


        }


    }
};
