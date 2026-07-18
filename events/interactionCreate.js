import abrirTicket from "../selectMenus/abrirTicket.js";
import testeTatico from "../modals/testeTatico.js";

import aceitarTeste from "../buttons/aceitarTeste.js";
import recusarTeste from "../buttons/recusarTeste.js";
import finalizarTicket from "../buttons/finalizarTicket.js";
import sairTicket from "../buttons/sairTicket.js";


export default {

    name: "interactionCreate",


    async execute(interaction) {


        // COMANDOS SLASH

        if (interaction.isChatInputCommand()) {


            const comando = interaction.client.commands.get(
                interaction.commandName
            );


            if (!comando) return;


            try {


                await comando.execute(interaction);


            } catch (error) {


                console.error(
                    "Erro ao executar comando:",
                    error
                );


                if (interaction.replied || interaction.deferred) {


                    await interaction.followUp({

                        content: "❌ Erro ao executar o comando.",
                        ephemeral: true

                    });


                } else {


                    await interaction.reply({

                        content: "❌ Erro ao executar o comando.",
                        ephemeral: true

                    });


                }


            }


            return;


        }





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




            if (interaction.customId === "finalizarTicket") {


                return finalizarTicket.execute(interaction);


            }




            if (interaction.customId === "sairTicket") {


                return sairTicket.execute(interaction);


            }


        }


    }


};
