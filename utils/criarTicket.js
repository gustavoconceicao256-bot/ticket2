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

        canal =>
            canal.parentId === config.canais.tickets &&
            canal.topic === interaction.user.id &&
            (
                canal.name.startsWith("suporte-") ||
                canal.name.startsWith("denuncia-")
            )

    );



    if (canalExistente) {

        return interaction.editReply({

            content: "⚠️ Você já possui um atendimento aberto. Finalize ou cancele o atual antes de abrir outro."

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


        .setTitle("🎫 Atendimento Aberto")


        .setDescription(`

👤 **Usuário**
${interaction.user}


📂 **Categoria**
\`${categoria.toUpperCase()}\`


━━━━━━━━━━━━━━


🛡️ Aguarde um membro da equipe **GTT**.


⚡ Atendimento Privado

`)



        .setThumbnail(

            interaction.user.displayAvatarURL({

                dynamic:true,

                size:1024

            })

        )


        .setFooter({

            text:"GTT • Sistema Oficial",

            iconURL:config.visual.thumbnail

        })


        .setTimestamp();







    const botoes = new ActionRowBuilder()


        .addComponents(



            new ButtonBuilder()

                .setCustomId("sairTicket")

                .setLabel("Cancelar Ticket")

                .setEmoji("🚪")

                .setStyle(ButtonStyle.Danger),



            new ButtonBuilder()

                .setCustomId("finalizarTicket")

                .setLabel("Finalizar Ticket")

                .setEmoji("🔒")

                .setStyle(ButtonStyle.Success)


        );







    await canal.send({

        content:`${interaction.user}`,

        embeds:[embed],

        components:[botoes]

    });







    await interaction.editReply({

        content:`✅ Atendimento criado: ${canal}`

    });


}
