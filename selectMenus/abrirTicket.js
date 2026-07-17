import { 
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle
} from "discord.js";


export default {
    customId: "abrirTicket",

    async execute(interaction) {

        const escolha = interaction.values[0];


        // 🚨 DENÚNCIA
        if (escolha === "denuncia") {

            await interaction.reply({
                content: "🚨 Sistema de denúncia em desenvolvimento.",
                ephemeral: true
            });

        }


        // ❓ DÚVIDAS
        if (escolha === "duvidas") {

            await interaction.reply({
                content: "❓ Sistema de dúvidas em desenvolvimento.",
                ephemeral: true
            });

        }


        // 🪖 TESTE TÁTICO
        if (escolha === "teste_tatico") {


            const modal = new ModalBuilder()
                .setCustomId("testeTatico")
                .setTitle("🪖 Solicitar Teste Tático");


            const data = new TextInputBuilder()
                .setCustomId("dataTeste")
                .setLabel("📅 Data do teste")
                .setStyle(TextInputStyle.Short)
                .setPlaceholder("Ex: 20/07/2026")
                .setRequired(true);


            const hora = new TextInputBuilder()
                .setCustomId("horaTeste")
                .setLabel("🕒 Hora do teste")
                .setStyle(TextInputStyle.Short)
                .setPlaceholder("Ex: 20:30")
                .setRequired(true);



            modal.addComponents(
                new ActionRowBuilder()
                    .addComponents(data),

                new ActionRowBuilder()
                    .addComponents(hora)
            );


            await interaction.showModal(modal);

        }

    }
};
