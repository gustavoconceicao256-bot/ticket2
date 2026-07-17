import {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder
} from "discord.js";


export default {

    data: new SlashCommandBuilder()

        .setName("painel")

        .setDescription("Abrir painel de atendimento"),



    name: "painel",



    async execute(interaction) {


        const embed = new EmbedBuilder()

            .setTitle("📋 Central de Atendimento")

            .setDescription(
`Selecione uma opção abaixo:

🚨 **Denunciar**
Crie uma denúncia para a equipe responsável.

❓ **Dúvidas**
Abra um atendimento para tirar dúvidas.

🪖 **Solicitar Teste Tático**
Solicite um horário para realizar seu teste.`
            )

            .setColor("Red");



        const menu = new StringSelectMenuBuilder()

            .setCustomId("abrirTicket")

            .setPlaceholder("Selecione uma opção...")

            .addOptions(

                {
                    label: "Denunciar",
                    description: "Abrir uma denúncia",
                    emoji: "🚨",
                    value: "denuncia"
                },


                {
                    label: "Dúvidas",
                    description: "Abrir um atendimento",
                    emoji: "❓",
                    value: "duvidas"
                },


                {
                    label: "Solicitar Teste Tático",
                    description: "Solicitar um teste",
                    emoji: "🪖",
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
