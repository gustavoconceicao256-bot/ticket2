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



        // LOG

        const embedLog = new EmbedBuilder()


            .setColor("#7C3AED")


            .setAuthor({

                name:"GTT • SISTEMA DE LOGS",

                iconURL:config.visual.thumbnail

            })


            .setTitle("🔒 Ticket Finalizado")


            .setDescription(`

👤 **Aberto por**
${usuario ? usuario : "Não identificado"}


👮 **Finalizado por**
${interaction.user}


📂 **Categoria**
\`${canal.name.includes("denuncia") ? "DENÚNCIA" : "SUPORTE"}\`


📅 ${agora.data} • ${agora.hora}


━━━━━━━━━━━━━━

⚡ GTT • Sistema Oficial

`)


            .setThumbnail(

                usuario
                ? usuario.displayAvatarURL({
                    dynamic:true,
                    size:1024
                })
                : config.visual.thumbnail

            )


            .setFooter({

                text:"GTT • Logs",

                iconURL:config.visual.thumbnail

            })


            .setTimestamp();




        const canalLog = interaction.guild.channels.cache.get(
            config.canais.logs
        );



        if(canalLog){

            await canalLog.send({

                embeds:[embedLog]

            });

        }







        // PV DO USUÁRIO


        if(usuario){


            const pv = new EmbedBuilder()


                .setColor("#7C3AED")


                .setAuthor({

                    name:"GTT • CENTRAL DE ATENDIMENTO",

                    iconURL:config.visual.thumbnail

                })


                .setTitle("🔒 Atendimento Encerrado")


                .setDescription(`

👤 **Usuário**
${usuario}


📂 **Categoria**
\`${canal.name.includes("denuncia") ? "DENÚNCIA" : "SUPORTE"}\`


👮 **Responsável**
${interaction.user}


━━━━━━━━━━━━━━


Seu atendimento foi encerrado pela equipe **GTT**.


⚡ Sistema Oficial GTT

`)


                .setThumbnail(

                    usuario.displayAvatarURL({

                        dynamic:true,

                        size:1024

                    })

                )


                .setFooter({

                    text:"GTT • Atendimento Privado",

                    iconURL:config.visual.thumbnail

                })


                .setTimestamp();



            await usuario.send({

                embeds:[pv]

            }).catch(()=>{});


        }






        await interaction.reply({

            content:"🔒 Atendimento finalizado. O canal será fechado.",

            ephemeral:true

        });





        setTimeout(()=>{

            canal.delete().catch(()=>{});

        },3000);



    }

};
