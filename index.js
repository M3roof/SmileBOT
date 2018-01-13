const Discord = require("discord.js");
const YTDL = require("ytdl-core");

const TOKEN = "NDAwOTE1ODMyMTE0NTExODcz.DTsEKA.kU-onT_HnubCXRRiO6iGdvAx3I8";
const PREFIX = "s!";

function play(connection, message) {
    var servers = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

var ffmpeg = require('ffmpeg');

var fortunes = [
    "Oui",
    "Non",
    "Peut-être",
];

var bot = new Discord.Client();

var servers = {};

bot.on('ready', () => {
    bot.user.setPresence({ game: { name: 's!help | By Smile', type: 0}});
    console.log("Ready");
})

bot.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "general").sendMessage(member.toString() + " Bienvenue sur le serveur !");

    member.addRole(member.guild.roles.find("name", "Invité temporaire"))
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "ping":
            message.channel.sendMessage("Pong!");
            break;
        case "info":
            message.channel.sendMessage("Bot crée par Smile")
            break;
        case "8ball":
            if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
            else message.channel.sendMessage("Pose une question à la suite de s!8ball");
            break;
        case "help":
            var help = new Discord.RichEmbed()
                .addField("__Musique__", "**s!play :** *Démarre le bot* \n**s!skip :** *La musique suivante démarre* \n**s!stop :** *Le bot s'arrête*")
                .addField("__Jeux__", "**s!8ball :** *Le bot répond par oui, non et peut-être* \n**s!ping :** *Le bot répond pong !*")
                .addField("__Modération__", "**s!kick :** *Kick l'utilisateur souhaité* \n**s!ban :** *Ban l'utilisateur souhaité*")
                .addField("__Informations BOT__", "**s!info :** *Informations sur le BOT*")
                .setColor(0x00FFFF)
                .setFooter("Crée par Smile")
                .setThumbnail(message.author.avatarURL)
            message.channel.sendEmbed(help);
            break;
        case "noticeme":
            message.channel.sendMessage(message.author.toString() + "Test2");
            break;
        case "play":
            if (!args[1]) {
                message.channel.sendMessage("Indiquez un lien youtube");
                return;
            }
            
            if (!message.member.voiceChannel) {
                message.channel.sendMessage("Vous devez être dans un channel vocal");
                return;
            }
            
            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
            });
            break;
        case "skip":
            var server = servers[message.guild.id];

            if (server.dispatcher) server.dispatcher.end();
            break;
        case "stop":
            var server = servers[message.guild.id];

            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            break;
        default:
            message.channel.sendMessage("Commande incorrect");
    }
});

bot.login(TOKEN);
