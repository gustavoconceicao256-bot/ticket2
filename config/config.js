const config = {
    token: process.env.TOKEN,

    guildId: "ID_DO_SERVIDOR",

    canais: {
        painel: "ID_DO_CANAL_DO_PAINEL",
        solicitacoesTeste: "ID_DO_CANAL_DE_TESTES",
        logs: "ID_DO_CANAL_DE_LOGS"
    },

    cargos: {
        liderTatico: "ID_DO_CARGO_LIDER_TATICO",

        staff: [
            "ID_CARGO_STAFF"
        ]
    }
};

export default config;
