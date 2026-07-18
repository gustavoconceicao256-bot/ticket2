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

            content: "❌ Você já possui um atendimento aberto."

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

            ? "🚨 DENÚNCIA"

            : "❓ SUPORTE"

        )



        .setDescription(`

👤 **Usuário**

${interaction.user}



📌 **Categoria**

${categoria.toUpperCase()}



━━━━━━━━━━━━━━━━━━



A equipe da **GTT** irá atender você em breve.



`)



        .setColor("#22C55E")



        .setThumbnail(config.visual.thumbnail)



        .setImage(config.visual.banner)



        .setFooter({

            text: "GTT • Sistema Oficial",

            iconURL: config.visual.thumbnail

        });








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







    await interaction.editReply({



        content: `✅ Atendimento criado com sucesso: ${canal}`



    });



}
