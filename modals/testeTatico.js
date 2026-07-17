import {
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
} from "discord.js";


import config from "../configuração/config.js";



export default {


customId:"testeTatico",



async execute(interaction){



const data =
interaction.fields.getTextInputValue("dataTeste");


const hora =
interaction.fields.getTextInputValue("horaTeste");



const embed = new EmbedBuilder()

.setTitle("📋 Nova Solicitação de Teste Tático")

.setDescription(

`👤 **Solicitante:**
${interaction.user}


📅 **Data:**
${data}


🕒 **Hora:**
${hora}


📌 **Status:**
🟡 Aguardando análise`

)

.setColor("Yellow");




const botoes = new ActionRowBuilder()


.addComponents(


new ButtonBuilder()

.setCustomId(
`aceitarTeste_${interaction.user.id}_${data}_${hora}`
)

.setLabel("Aceitar")

.setEmoji("🟢")

.setStyle(ButtonStyle.Success),



new ButtonBuilder()

.setCustomId(
`recusarTeste_${interaction.user.id}_${data}_${hora}`
)

.setLabel("Recusar")

.setEmoji("🔴")

.setStyle(ButtonStyle.Danger)


);





const canal =
interaction.guild.channels.cache.get(
config.canais.solicitacoesTeste
);



await canal.send({

embeds:[embed],

components:[botoes]

});



await interaction.reply({

content:"✅ Solicitação enviada.",

ephemeral:true

});



}


};
