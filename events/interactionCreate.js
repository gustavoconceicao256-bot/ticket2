import abrirTicket from "../selectMenus/abrirTicket.js";
import testeTatico from "../modals/testeTatico.js";

import aceitarTeste from "../buttons/aceitarTeste.js";
import recusarTeste from "../buttons/recusarTeste.js";
import finalizarTicket from "../buttons/finalizarTicket.js";
import sairTicket from "../buttons/sairTicket.js";


export default {

    name: "interactionCreate",

    async execute(interaction) {

        try {


            // ===============================
            // COMANDOS SLASH
            // ===============================

            if (interaction.isChatInputCommand()) {


                const comando = interaction.client.commands.get(
                    interaction.commandName
                );


                if (!comando) return;


                await comando.execute(interaction);


                return;

            }




            // ===============================
            // MENU SELECT
            // ===============================

            if (interaction.isStringSelectMenu()) {


                switch (interaction.customId) {


                    case "abrirTicket":

                        return await abrirTicket.execute(interaction);


                }


            }




            // ===============================
            // MODAIS
            // ===============================

            if (interaction.isModalSubmit()) {


                switch (interaction.customId) {


                    case "testeTatico":

                        return await testeTatico.execute(interaction);


                }


            }





            // ===============================
            // BOTÕES
            // ===============================

            if (interaction.isButton()) {


                const id = interaction.customId;



                if (id.startsWith("aceitarTeste_")) {

                    return await aceitarTeste.execute(interaction);

                }



                if (id.startsWith("recusarTeste_")) {

                    return await recusarTeste.execute(interaction);

                }



                if (id === "finalizarTicket") {

                    return await finalizarTicket.execute(interaction);

                }



                if (id === "sairTicket") {

                    return await sairTicket.execute(interaction);

                }


            }



        } catch (error) {


            console.error(
                "❌ Erro no interactionCreate:",
                error
            );



            try {


                if (!interaction.replied && !interaction.deferred) {


                    await interaction.reply({

                        content:
                            "❌ Ocorreu um erro ao processar essa interação.",

                        ephemeral: true

                    });


                }


            } catch (err) {


                console.error(
                    "❌ Erro ao responder interação:",
                    err
                );


            }


        }


    }

};
