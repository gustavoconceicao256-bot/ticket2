import {
    ChannelType,
    PermissionFlagsBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} from "discord.js";

import config from "../config/config.js";


export default async function criarTicket(interaction, categoria) {


    await interaction.deferReply({
        ephemeral: true
    });



    const nomeCanal = `${categoria}-${interaction.user.username}`
        .toLowerCase();



    const canalExistente = interaction.guild.channels.cache.find(
        canal => canal.name === nomeCanal
    );



    if (canalExistente) {

        return interaction.editReply({

            content: "⚠️ Você já possui um atendimento aberto."

        });

    }




    const canal = await interaction.guild.channels.create({

        name: nomeCanal,

        type: ChannelType.GuildText,

        parent: config.canais.tickets,


        topic: interaction.user.id,


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


        .setColor("#7C3AED")


        .setAuthor({

            name: "GTT • CENTRAL DE ATENDIMENTO",

            iconURL: config.visual.thumbnail

        })



        .setTitle("🎫 Atendimento Iniciado")



        .setDescription(`

👤 **Usuário**

${interaction.user}



📂 **Categoria**

\`${categoria.toUpperCase()}\`



━━━━━━━━━━━━━━━━━━



🛡️ A equipe da **GTT** foi notificada.



Aguarde um membro responsável pelo atendimento.



━━━━━━━━━━━━━━━━━━



⚡ Atendimento Privado • GTT

`)



        .setThumbnail(

            interaction.user.displayAvatarURL({

                dynamic: true,

                size: 1024

            })

        )



        .setFooter({

            text: "GTT • Sistema Oficial",

            iconURL: config.visual.thumbnail

        })



        .setTimestamp();







    const botoes = new ActionRowBuilder()


        .addComponents(


            new ButtonBuilder()

                .setCustomId("sairTicket")

                .setLabel("Sair do Ticket")

                .setEmoji("🚪")

                .setStyle(ButtonStyle.Danger),



            new ButtonBuilder()

                .setCustomId("finalizarTicket")

                .setLabel("Finalizar Ticket")

                .setEmoji("✅")

                .setStyle(ButtonStyle.Success)


        );








    await canal.send({

        content: `${interaction.user}`,

        embeds: [embed],

        components: [botoes]

    });






    await interaction.editReply({

        content: `✅ Atendimento criado com sucesso: ${canal}`

    });


}
