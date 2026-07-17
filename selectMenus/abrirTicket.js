import {
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle
} from "discord.js";

import criarTicket from "../utils/criarTicket.js";


export default {


    customId: "abrirTicket",


    async execute(interaction) {


        const escolha = interaction.values[0];



        // 🚨 DENÚNCIA

        if (escolha === "denuncia") {

            return criarTicket(
                interaction,
                "denuncia"
            );

        }




        // ❓ DÚVIDAS

        if (escolha === "duvidas") {

            return criarTicket(
                interaction,
                "duvidas"
            );

        }




        // 🪖 TESTE TÁTICO

        if (escolha === "teste_tatico") {



            const modal = new ModalBuilder()

                .setCustomId("testeTatico")

                .setTitle("🪖 Solicitar Teste Tático");





            const data = new TextInputBuilder()

                .setCustomId("dataTeste")

                .setLabel("📅 Data")

                .setStyle(TextInputStyle.Short)

                .setRequired(true);





            const hora = new TextInputBuilder()

                .setCustomId("horaTeste")

                .setLabel("🕒 Hora")

                .setStyle(TextInputStyle.Short)

                .setRequired(true);





            modal.addComponents(


                new ActionRowBuilder()

                .addComponents(data),



                new ActionRowBuilder()

                .addComponents(hora)


            );




            return interaction.showModal(modal);


        }



    }


};
