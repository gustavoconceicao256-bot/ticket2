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

                content:"❌ Você não tem permissão para finalizar este atendimento.",

                ephemeral:true

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

                name:`${interaction.user.username}`,

                iconURL:interaction.user.displayAvatarURL({

                    dynamic:true,
                    size:1024

                })

            })


            .setTitle("🔒 TICKET FINALIZADO")


            .setDescription(
`👤 **Aberto por:**
${usuario ? `<@${usuario.id}>` : "Não identificado"}

🛡️ **Finalizado por:**
<@${interaction.user.id}>

📂 **Categoria:**
\`${canal.name.includes("denuncia") ? "DENÚNCIA" : "SUPORTE"}\`

━━━━━━━━━━━━━━

📅 ${agora.data}
🕒 ${agora.hora}`
            )


            .setThumbnail(

                interaction.user.displayAvatarURL({

                    dynamic:true,
                    size:1024

                })

            )


            .setFooter({

                text:"GTT • Sistema Oficial",

                iconURL:config.visual.thumbnail

            })


            .setTimestamp();




        const canalLog =
            interaction.guild.channels.cache.get(
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


                .setColor("#22C55E")


                .setAuthor({

                    name:"GTT • Atendimento",

                    iconURL:config.visual.thumbnail

                })


                .setTitle("✅ Atendimento Finalizado")


                .setDescription(
`Seu atendimento foi encerrado.


📂 **Categoria:**
\`${canal.name.includes("denuncia") ? "DENÚNCIA" : "SUPORTE"}\`

🛡️ **Responsável:**
<@${interaction.user.id}>


Obrigado por utilizar o sistema da **GTT**.

━━━━━━━━━━━━━━

⚡ Sistema Oficial`
                )


                .setThumbnail(

                    usuario.displayAvatarURL({

                        dynamic:true,
                        size:1024

                    })

                )


                .setFooter({

                    text:"GTT • Atendimento",

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
