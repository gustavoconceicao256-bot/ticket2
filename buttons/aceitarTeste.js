import {
    EmbedBuilder,
    ActionRowBuilder
} from "discord.js";


export default {
    customId: "aceitarTeste",

    async execute(interaction) {

        const dados = interaction.customId.split("_");

        const usuarioId = dados[1];
        const data = dados[2];
        const hora = dados[3];


        const usuario = await interaction.client.users.fetch(usuarioId);


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
            .setColor("Green")
            .setTimestamp();


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
