import { EmbedBuilder } from "discord.js";
import config from "../config/config.js";

export default {

    customId: "sairTicket",

    async execute(interaction) {

        const canal = interaction.channel;

        const usuario = interaction.user;

        const log = interaction.guild.channels.cache.get(
            config.canais.logs
        );


        const embed = new EmbedBuilder()

            .setColor("#EF4444")

            .setTitle("🚪 TICKET CANCELADO")

            .setDescription(
`👤 **Cancelado por:**
${usuario}

📂 **Canal:**
\`${canal.name}\`

📅 **Data:**
<t:${Math.floor(Date.now() / 1000)}:f>

━━━━━━━━━━━━━━

O usuário cancelou o próprio atendimento.`
            )

            .setThumbnail(
                usuario.displayAvatarURL({
                    dynamic:true,
                    size:1024
                })
            )

            .setFooter({
                text:"GTT • Sistema de Atendimento",
                iconURL: config.visual.thumbnail
            })

            .setTimestamp();



        if(log){

            await log.send({
                embeds:[embed]
            });

        }



        await interaction.reply({

            content:"🚪 Atendimento cancelado. O ticket será fechado.",

            ephemeral:true

        });



        setTimeout(()=>{

            canal.delete().catch(()=>{});

        },3000);


    }

};
