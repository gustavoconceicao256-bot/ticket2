export default {

    name: "ready",

    once: true,

    execute(client) {

        console.clear();

        console.log("==============================");
        console.log("🤖 BOT ONLINE");
        console.log(`👤 ${client.user.tag}`);
        console.log(`🆔 ${client.user.id}`);
        console.log("==============================");

    }

};
