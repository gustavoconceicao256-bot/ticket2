export default function dataHora() {

    const agora = new Date();


    const data = agora.toLocaleDateString("pt-BR");


    const hora = agora.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });


    return {
        data,
        hora
    };

}
