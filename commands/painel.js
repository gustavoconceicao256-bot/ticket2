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
                name: "👑 GTT • Sistema Oficial",
                iconURL: config.visual.thumbnail
            })

            .setTitle("🎫 CENTRAL DE ATENDIMENTO")

            .setDescription(`

Bem-vindo ao sistema oficial da **GTT**.

━━━━━━━━━━━━━━━━━━━━━━

🚨 **DENÚNCIAS**

Reporte qualquer jogador ou membro.

━━━━━━━━━━━━━━━━━━━━━━

❓ **DÚVIDAS**

Abra um atendimento com nossa equipe.

━━━━━━━━━━━━━━━━━━━━━━

🪖 **TESTE TÁTICO**

Solicite seu horário para realizar o teste.

━━━━━━━━━━━━━━━━━━━━━━

> Escolha uma categoria no menu abaixo.

`)

            .setThumbnail(config.visual.thumbnail)

            .setImage(config.visual.banner)

            .setFooter(config.visual.footer)

            .setTimestamp();

        const menu = new StringSelectMenuBuilder()

            .setCustomId("abrirTicket")

            .setPlaceholder("📂 Escolha uma categoria")

            .addOptions(

                {
                    label: "🚨 Denunciar",
                    description: "Abrir uma denúncia",
                    value: "denuncia"
                },

                {
                    label: "❓ Dúvidas",
                    description: "Abrir atendimento",
                    value: "duvidas"
                },

                {
                    label: "🪖 Solicitar Teste Tático",
                    description: "Solicitar teste",
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
