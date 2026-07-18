import {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder
} from "discord.js";

import config from "../config/config.js";

export default {

    data: new SlashCommandBuilder()
        .setName("painel")
        .setDescription("Abrir painel de atendimento"),

    name: "painel",

    async execute(interaction) {

        const embed = new EmbedBuilder()

            .setColor(config.visual.color)

            .setAuthor({
                name: "👑 GTT • Sistema de Atendimento",
                iconURL: config.visual.thumbnail
            })

            .setTitle("🎫 CENTRAL DE ATENDIMENTO")

            .setDescription(`

Bem-vindo ao sistema oficial de atendimento da **GTT**.

Selecione uma categoria abaixo para abrir um ticket com nossa equipe.

━━━━━━━━━━━━━━━━━━━━━━

🚨 **Denúncias**
Reporte qualquer ocorrência.

❓ **Dúvidas**
Converse com nossa equipe.

🪖 **Teste Tático**
Solicite seu teste.

━━━━━━━━━━━━━━━━━━━━━━

> Escolha uma opção no menu abaixo.

`)

            .setThumbnail(config.visual.thumbnail)

            .setImage(config.visual.banner)

            .setFooter(config.visual.footer)

            .setTimestamp();

        const menu = new StringSelectMenuBuilder()

            .setCustomId("abrirTicket")

            .setPlaceholder("📂 Selecione uma categoria")

            .addOptions(

                {
                    label: "🚨 Denunciar",
                    description: "Abrir uma denúncia",
                    value: "denuncia"
                },

                {
                    label: "❓ Dúvidas",
                    description: "Falar com nossa equipe",
                    value: "duvidas"
                },

                {
                    label: "🪖 Solicitar Teste Tático",
                    description: "Agendar um teste",
                    value: "teste_tatico"
                }

            );

        const row = new ActionRowBuilder()

            .addComponents(menu);

        await interaction.reply({

            embeds: [embed],

            components: [row]

        });

    }

};
