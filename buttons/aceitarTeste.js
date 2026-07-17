import {
    EmbedBuilder
} from "discord.js";

import config from "../configuração/config.js";


export default {

    customId: "aceitarTeste",

    async execute(interaction) {


        const temPermissao = interaction.member.roles.cache.some(role =>
            config.cargos.testeTatico.includes(role.id)
        );


        if (!temPermissao) {

            return interaction.reply({

                content: "❌ Você não tem permissão para aceitar Teste Tático.",

                ephemeral: true

            });

        }



        const dados = interaction.customId.split("_");


        const usuarioId = dados[1];
        const data = dados[2];
        const hora = dados[3];



        const usuario =
            await interaction.client.users.fetch(usuarioId);



        const embed = new EmbedBuilder()

            .setTitle("📋 Teste Tático Aceito 🟢")

            .setDescription(
`👤 **Solicitante:**
<@${usuarioId}>

📅 **Data:**
${data}

🕒 **Hora:**
${hora}

👮 **Aceito por:**
${interaction.user}`
            )

            .setColor("Green");



        await interaction.update({

            embeds: [embed],

            components: []

        });



        await usuario.send(
`✅ Sua solicitação de Teste Tático foi aceita.

📅 Data: ${data}

🕒 Hora: ${hora}

Compareça no horário informado.`
        ).catch(() => {});


    }

};
