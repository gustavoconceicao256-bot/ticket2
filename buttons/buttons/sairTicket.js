import {
    EmbedBuilder
} from "discord.js";

import config from "../config/config.js";

import dataHora from "../utils/dataHora.js";


export default {

    customId: "sairTicket",


    async execute(interaction) {


        const canal = interaction.channel;


        if (!canal.topic || canal.topic !== interaction.user.id) {

            return interaction.reply({

                content: "❌ Apenas quem abriu o ticket pode sair dele.",

                ephemeral: true

            });

        }



        const agora = dataHora();



        const embedLog = new EmbedBuilder()

            .setTitle("🚪 TICKET CANCELADO")

            .setDescription(`

👤 **Cancelado por:**
${interaction.user}


📌 **Motivo:**
Usuário saiu do atendimento.


📂 **Categoria:**
${canal.name.includes("denuncia") ? "DENÚNCIA" : "SUPORTE"}


📅 **Data:**
${agora.data}


🕒 **Hora:**
${agora.hora}

━━━━━━━━━━━━━━━━

⚡ GTT • Sistema Oficial

`)

            .setThumbnail(

                interaction.user.displayAvatarURL({

                    dynamic: true,

                    size: 1024

                })

            )

            .setColor("#EF4444")

            .setFooter({

                text: "GTT • Logs",

                iconURL: config.visual.thumbnail

            })

            .setTimestamp();



        const canalLog = interaction.guild.channels.cache.get(
            config.canais.logs
        );



        if (canalLog) {

            await canalLog.send({

                embeds: [embedLog]

            });

        }



        await interaction.reply({

            content: "🚪 Você saiu do ticket. O canal será apagado.",

            ephemeral: true

        });



        setTimeout(() => {

            canal.delete().catch(() => {});

        }, 3000);


    }


};
