const config = {

    canais: {

        // Canal onde aparecem as solicitações de Teste Tático
        solicitacoesTeste: "1523401108007944343",

        // Categoria ou canal onde serão criados os tickets
        tickets: "1524497169632071800",

        // Canal de logs
        logs: "1527755533388611594"

    },

    cargos: {

        // Cargos que podem aprovar/recusar Teste Tático
        testeTatico: [
            "1460499655640092780",
            "1522793484036083812"
        ],

        // Cargos que podem fechar tickets
        finalizarTicket: [
            "1521984073969569883",
            "1522086542716305548",
            "1522086730008629289",
            "1460499655640092780",
            "1522793484036083812"
        ]

    },

    visual: {

        // Cor principal dos embeds
        color: "#6D28D9",

        // GIF pequeno (canto superior direito)
        thumbnail: "COLE_AQUI_O_LINK_DO_GIF",

        // GIF grande (banner inferior)
        banner: "COLE_AQUI_O_LINK_DO_BANNER_GIF",

        // Rodapé padrão
        footer: {
            text: "👑 GTT • Sistema Oficial",
            iconURL: "COLE_AQUI_O_LINK_DO_GIF"
        }

    }

};

export default config;
