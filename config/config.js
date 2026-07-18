const config = {

    canais: {

        // Canal onde aparecem os Testes Táticos
        solicitacoesTeste: "1523401108007944343",

        // Canal onde ficam os tickets
        tickets: "1524497169632071800",

        // Canal onde ficam os logs
        logs: "1527755533388611594"

    },

    cargos: {

        // Cargos que podem aceitar ou recusar Teste Tático
        testeTatico: [
            "1460499655640092780",
            "1522793484036083812"
        ],

        // Cargos que podem finalizar atendimento
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

        thumbnail: "https://cdn.discordapp.com/attachments/1522051042345357483/1527233920762908774/lv_0_20260716054352.gif?ex=6a5b3c6d&is=6a59eaed&hm=c359856177ec827dbc178b656618a74d190029419fdfbcbb2fc6606649fd90de&",

        banner: "https://cdn.discordapp.com/attachments/1522051042345357483/1527231255475785808/lv_0_20260716053044.gif?ex=6a5b39f1&is=6a59e871&hm=e82c666fdeb160c250659832727103e98fc8539c95ea0b064edc0fd407f51b85&",

        footer: {
            text: "👑 GTT • Sistema Oficial",
            iconURL: "https://cdn.discordapp.com/attachments/1522051042345357483/1527233920762908774/lv_0_20260716054352.gif?ex=6a5b3c6d&is=6a59eaed&hm=c359856177ec827dbc178b656618a74d190029419fdfbcbb2fc6606649fd90de&"
        }

    }

};

export default config;
