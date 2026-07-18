import {
    EmbedBuilder
} from "discord.js";

import config from "../config/config.js";


export default {

    customId: "recusarTeste",


    async execute(interaction) {


        const temPermissao = interaction.member.roles.cache.some(role =>
            config.cargos.testeTatico.includes(role.id)
        );


        if (!temPermissao) {

            return interaction.reply({

                content: "❌ Você não tem permissão para recusar Teste Tático.",

                ephemeral: true

            });

        }



        const dados = interaction.customId.split("_");


        const usuarioId = dados[1];
        const data = dados[2];
        const hora = dados[3];



        const usuario =
            await interaction.client.users.fetch(usuarioId);



        const embedPainel = new EmbedBuilder()

            .setTitle("📋 Teste Tático Recusado 🔴")

            .setDescription(
`👤 **Solicitante:**
<@${usuarioId}>

📅 **Data:**
${data}

🕒 **Hora:**
${hora}

👮 **Recusado por:**
${interaction.user}`
            )

            .setColor("#EF4444");



        await interaction.update({

            embeds: [embedPainel],

            components: []

        });



        const pv = new EmbedBuilder()

            .setColor("#EF4444")

            .setAuthor({

                name:"GTT • CENTRAL DE TESTE TÁTICO",

                iconURL:config.visual.thumbnail

            })


            .setTitle("❌ Teste Tático Recusado")


            .setDescription(`

👤 **Solicitante**
<@${usuarioId}>


📅 **Data**
${data}


🕒 **Hora**
${hora}


👮 **Responsável**
${interaction.user}


━━━━━━━━━━━━━━


Sua solicitação de **Teste Tático** foi recusada pela equipe **GTT**.


Caso tenha dúvidas, abra um ticket no suporte.


⚡ Sistema Oficial GTT

`)


            .setThumbnail(

                usuario.displayAvatarURL({

                    dynamic:true,

                    size:1024

                })

            )


            .setFooter({

                text:"GTT • Atendimento Privado",

                iconURL:config.visual.thumbnail

            })


            .setTimestamp();



        await usuario.send({

            embeds:[pv]

        }).catch(()=>{});


    }

};
