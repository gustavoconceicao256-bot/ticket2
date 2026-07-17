import {
    ChannelType,
    PermissionFlagsBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} from "discord.js";

import config from "../configuração/config.js";


export default async function criarTicket(interaction, categoria) {


    const nomeCanal = `${categoria}-${interaction.user.username}`
        .toLowerCase();



    const canalExistente = interaction.guild.channels.cache.find(
        canal => canal.name === nomeCanal
    );


    if (canalExistente) {

        return interaction.reply({

            content: "❌ Você já possui um atendimento aberto.",

            ephemeral: true

        });

    }



    const canal = await interaction.guild.channels.create({

        name: nomeCanal,

        type: ChannelType.GuildText,


        parent: config.canais.tickets,


        permissionOverwrites: [


            {

                id: interaction.guild.id,

                deny: [
                    PermissionFlagsBits.ViewChannel
                ]

            },


            {

                id: interaction.user.id,

                allow: [
                    PermissionFlagsBits.ViewChannel,
                    PermissionFlagsBits.SendMessages,
                    PermissionFlagsBits.ReadMessageHistory
                ]

            },


            ...config.cargos.finalizarTicket.map(cargo => ({

                id: cargo,

                allow: [
                    PermissionFlagsBits.ViewChannel,
                    PermissionFlagsBits.SendMessages,
                    PermissionFlagsBits.ReadMessageHistory
                ]

            }))

        ]

    });




    const embed = new EmbedBuilder()

        .setTitle(
            categoria === "denuncia"
            ? "🚨 Denúncia"
            : "❓ Dúvidas"
        )


        .setDescription(

`👤 **Usuário:**
${interaction.user}

📌 **Categoria:**
${categoria.toUpperCase()}


A equipe irá atender você em breve.`

        )


        .setColor("Red");





    const botao = new ActionRowBuilder()

        .addComponents(

            new ButtonBuilder()

                .setCustomId("finalizarTicket")

                .setLabel("Finalizar Atendimento")

                .setEmoji("🔒")

                .setStyle(ButtonStyle.Danger)

        );





    await canal.send({

        content: `${interaction.user}`,

        embeds: [embed],

        components: [botao]

    });





    await interaction.reply({

        content: `✅ Seu atendimento foi criado: ${canal}`,

        ephemeral: true

    });



}
