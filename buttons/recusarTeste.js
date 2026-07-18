import {
    EmbedBuilder
} from "discord.js";

import config from "../config/config.js";


export default {

    customId: "recusarTeste",


    async execute(interaction) {


        const temPermissao = interaction.member.roles.cache.some(role =>
            config.cargos.testeTatico.includes(role.id)
        );


        if (!temPermissao) {

            return interaction.reply({

                content: "❌ Você não tem permissão para recusar Teste Tático.",

                ephemeral: true

            });

        }



        const dados = interaction.customId.split("_");


        const usuarioId = dados[1];
        const data = dados[2];
        aconst hora = dados[3];



        const usuario =
            await interaction.client.users.fetch(usuarioId);



        const embed = new EmbedBuilder()

            .setTitle("📋 Teste Tático Recusado 🔴")

            .setDescription(
`👤 **Solicitante:**
<@${usuarioId}>

📅 **Data:**
${data}

🕒 **Hora:**
${hora}

👮 **Recusado por:**
${interaction.user}`
            )

            .setColor("Red");



        await interaction.update({

            embeds: [embed],

            components: []

        });



        await usuario.send(
`❌ Sua solicitação de Teste Tático foi recusada.

Para mais informações, abra um ticket de Dúvidas ou procure um responsável pela área.`
        ).catch(() => {});


    }

};
