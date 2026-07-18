import {
    EmbedBuilder
} from "discord.js";

import config from "../config/config.js";


export default {


    customId:"sairTicket",


    async execute(interaction){


        const canal = interaction.channel;

        const usuario = interaction.user;



        const log =
            interaction.guild.channels.cache.get(
                config.canais.logs
            );




        const embed = new EmbedBuilder()


            .setColor("#EF4444")


            .setAuthor({

                name:usuario.username,

                iconURL:usuario.displayAvatarURL({

                    dynamic:true,
                    size:1024

                })

            })


            .setTitle("🚪 TICKET CANCELADO")


            .setDescription(
`👤 **Cancelado pelo usuário:**
<@${usuario.id}>

📂 **Canal:**
\`${canal.name}\`

━━━━━━━━━━━━━━

O usuário abriu o ticket por engano ou desistiu do atendimento.`
            )


            .setThumbnail(

                usuario.displayAvatarURL({

                    dynamic:true,
                    size:1024

                })

            )


            .setFooter({

                text:"GTT • Sistema Oficial",

                iconURL:config.visual.thumbnail

            })


            .setTimestamp();




        if(log){

            await log.send({

                embeds:[embed]

            });

        }




        await interaction.reply({

            content:"🚪 Ticket cancelado. O canal será fechado.",

            ephemeral:true

        });





        setTimeout(()=>{

            canal.delete().catch(()=>{});

        },3000);



    }


};
