import {
    EmbedBuilder
} from "discord.js";

import config from "../configuração/config.js";

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



        const abertoPor =
            canal.topic || "Não identificado";



        const agora = dataHora();



        const embedLog = new EmbedBuilder()

            .setTitle("📂 TICKET FINALIZADO")

            .setDescription(
`👤 **Aberto por:**
${abertoPor}

👮 **Finalizado por:**
${interaction.user}

📌 **Categoria:**
${canal.name.includes("denuncia") ? "DENÚNCIA" : "DÚVIDAS"}

📅 **Data:**
${agora.data}

🕒 **Hora:**
${agora.hora}`
            )

            .setColor("Red")

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



        await interaction.reply({

            content: "🔒 Atendimento finalizado. O canal será fechado.",

            ephemeral: true

        });



        setTimeout(() => {

            canal.delete().catch(() => {});

        }, 3000);



    }

};
