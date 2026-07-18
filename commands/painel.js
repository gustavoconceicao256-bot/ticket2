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

    console.log("✅ COMANDO PAINEL EXECUTADO");


        const embed = new EmbedBuilder()

            .setColor("#22C55E")

            .setAuthor({
                name: "GTT • CENTRAL TÁTICA",
                iconURL: config.visual.thumbnail
            })

            .setTitle("╭・🎫 CENTRAL DE ATENDIMENTO")
            
            .setDescription(`

**Sistema Oficial GTT**

Acesse um dos setores abaixo para iniciar um atendimento.

╭━━━━━━━━━━━━━━━━━━╮

🚨 **DENÚNCIA**
\`Registrar ocorrência\`

❓ **SUPORTE**
\`Auxílio da equipe\`

📋 **TESTE TÁTICO**
\`Processo de avaliação\`

╰━━━━━━━━━━━━━━━━━━╯


> ⚡ Atendimento organizado • GTT

`)

            .setThumbnail(config.visual.thumbnail)

            .setImage(config.visual.banner)

            .setFooter({
                text: "GTT • Sistema Oficial",
                iconURL: config.visual.thumbnail
            })

            .setTimestamp();



        const menu = new StringSelectMenuBuilder()

            .setCustomId("abrirTicket")

            .setPlaceholder("▸ Selecionar setor")

            .addOptions(

                {
                    label: "Denúncia",
                    description: "Registrar uma ocorrência",
                    emoji: "🚨",
                    value: "denuncia"
                },

                {
                    label: "Suporte",
                    description: "Falar com a equipe",
                    emoji: "❓",
                    value: "duvidas"
                },

                {
                    label: "Teste Tático",
                    description: "Solicitar avaliação",
                    emoji: "📋",
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
