const bannerGif = "https://cdn.discordapp.com/attachments/1522051042345357483/1527231255475785808/lv_0_20260716053044.gif?ex=6a5b39f1&is=6a59e871&hm=e82c666fdeb160c250659832727103e98fc8539c95ea0b064edc0fd407f51b85&";

const config = {

    canais: {

        // Canal onde aparecem os Testes Táticos
        solicitacoesTeste: "1523401108007944343",

        // Categoria onde os tickets serão criados
        tickets: "1524497169632071800",

        // Canal de logs
        logs: "1527755533388611594"

    },

    cargos: {

        // Cargos que podem aceitar ou recusar Teste Tático
        testeTatico: [
            "1460499655640092780",
            "1522793484036083812"
        ],

        // Cargos que podem finalizar tickets
        finalizarTicket: [
            "1521984073969569883",
            "1522086542716305548",
            "1522086730008629289",
            "1460499655640092780",
            "1522793484036083812"
        ]

    },

    visual: {

        color: "#6D28D9",

        thumbnail: bannerGif,

        banner: bannerGif,

        footer: {
            text: "👑 GTT • Sistema Oficial",
            iconURL: bannerGif
        }

    }

};

export default config;
