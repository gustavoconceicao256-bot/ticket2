import {
    EmbedBuilder
} from "discord.js";

import config from "../config/config.js";

import dataHora from "../utils/dataHora.js";


export default {

    customId: "finalizarTicket",


    async execute(interaction) {


        const temPermissao = interaction.member.roles.cache.some(role =>
            config.cargos.finalizarTicket.includes(role.id)
        );


        if (!temPermissao) {

            return interaction.reply({

                content: "❌ Você não tem permissão para finalizar este atendimento.",

                ephemeral: true

            });

        }



        const canal = interaction.channel;



        const usuarioId = canal.topic;



        const usuario = usuarioId
            ? await interaction.guild.members.fetch(usuarioId).catch(() => null)
            : null;



        const agora = dataHora();




        const embedLog = new EmbedBuilder()


            .setColor("#7C3AED")


            .setAuthor({

                name: "GTT • SISTEMA DE LOGS",

                iconURL: config.visual.thumbnail

            })



            .setTitle("🔒 TICKET FINALIZADO")



            .setDescription(`

👤 **Aberto por:**

${usuario ? usuario : "Não identificado"}



👮 **Finalizado por:**

${interaction.user}



📌 **Categoria:**

${canal.name.includes("denuncia") ? "🚨 DENÚNCIA" : "❓ SUPORTE"}



📅 **Data:**

${agora.data}



🕒 **Hora:**

${agora.hora}



━━━━━━━━━━━━━━━━━━

⚡ GTT • Sistema Oficial

`)



            .setThumbnail(

                usuario
                    ? usuario.displayAvatarURL({
                        dynamic: true,
                        size: 1024
                    })
                    : config.visual.thumbnail

            )



            .setFooter({

                text: "GTT • Logs",

                iconURL: config.visual.thumbnail

            })



            .setTimestamp();






        const canalLog =
            interaction.guild.channels.cache.get(
                config.canais.logs
            );



        if (canalLog) {

            await canalLog.send({

                embeds: [embedLog]

            });

        }





        // MENSAGEM NO PV DO USUÁRIO

        if (usuario) {


            const pv = new EmbedBuilder()


                .setColor("#22C55E")


                .setAuthor({

                    name: "GTT • ATENDIMENTO",

                    iconURL: usuario.displayAvatarURL({
                        dynamic: true,
                        size: 1024
                    })

                })


                .setTitle("✅ Atendimento Finalizado")



                .setDescription(`

Seu atendimento na **GTT** foi encerrado.



📌 **Categoria:**

\`${canal.name.includes("denuncia") ? "DENÚNCIA" : "SUPORTE"}\`



👮 **Finalizado por:**

${interaction.user}



Obrigado por utilizar nosso sistema de atendimento.



━━━━━━━━━━━━━━━━━━

⚡ GTT • Sistema Oficial

`)



                .setThumbnail(

                    usuario.displayAvatarURL({

                        dynamic: true,

                        size: 1024

                    })

                )



                .setFooter({

                    text: "GTT • Atendimento",

                    iconURL: config.visual.thumbnail

                })



                .setTimestamp();



            await usuario.send({

                embeds: [pv]

            }).catch(() => {});


        }






        await interaction.reply({

            content: "🔒 Atendimento finalizado. O canal será fechado.",

            ephemeral: true

        });





        setTimeout(() => {

            canal.delete().catch(() => {});

        }, 3000);



    }

};
