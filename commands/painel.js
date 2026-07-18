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

                name: "GTT • SISTEMA OFICIAL",

                iconURL: config.visual.thumbnail

            })


            .setTitle("🎫 CENTRAL DE ATENDIMENTO")



            .setDescription(`

> Bem-vindo ao sistema oficial da **GTT**.

━━━━━━━━━━━━━━━━━━━━━━

🚨 **DENÚNCIAS**

Reporte jogadores, situações ou problemas.


━━━━━━━━━━━━━━━━━━━━━━


❓ **SUPORTE**

Tire dúvidas e solicite ajuda da equipe.


━━━━━━━━━━━━━━━━━━━━━━


📋 **TESTE TÁTICO**

Solicite sua avaliação para entrar na equipe.


━━━━━━━━━━━━━━━━━━━━━━


📂 Escolha uma categoria abaixo para iniciar.

`)



            .setThumbnail(config.visual.thumbnail)


            .setImage(config.visual.banner)


            .setFooter(config.visual.footer)


            .setTimestamp();



        const menu = new StringSelectMenuBuilder()



            .setCustomId("abrirTicket")



            .setPlaceholder("📂 Selecionar atendimento")



            .addOptions(


                {

                    label: "Denúncia",

                    emoji: "🚨",

                    description: "Registrar uma denúncia",

                    value: "denuncia"

                },


                {

                    label: "Suporte",

                    emoji: "❓",

                    description: "Abrir atendimento",

                    value: "duvidas"

                },


                {

                    label: "Teste Tático",

                    emoji: "📋",

                    description: "Solicitar avaliação",

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
