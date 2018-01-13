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

if(command === `${prefix}kick`) {
    let raison = message.content.substr(26);
    let kickMember = message.guild.member(message.mentions.users.first());
    if(!message.member.hasPermissions("KICK_MEMBERS")){
        message.channel.send(`:tools: | ${message.author} Tu n'as pas la permission d'expulser les membres.`)
        return;
    }else{
        if(!kickMember){
            message.channel.send(`:tools: | ${message.author} veuillez mentionner un utilisateur.`)
            return;
      }else{
          if(!kickMember.bannable){
              message.channel.send(`:tools: | ${message.author} tu ne peux pas expulser cet utilisateur.`)
              return;
        }else{
            if(kickMember.hasPermission("ADMINISTRATOR")){
                message.channel.send(`:tools: | ${message.author} cet utilisateur est un admin, tu ne peux pas faire ça.`)
                return;
            }else{
    message.delete(message.author);
    message.guild.member(kickMember).kick({reason: `${raison}`});
    message.channel.sendMessage(`:tools: | ${kickMember} a été kick ! raison:${raison}`);
            }
        }
    }
}
}

if(command === `${prefix}ban`) {
    let raison = message.content.substr(26);
    let banMember = message.guild.member(message.mentions.users.first());
    if(!message.member.hasPermissions("BAN_MEMBERS")){
        message.channel.send(`:tools: | ${message.author} Tu n'as pas la permission de bannir les membres.`)
        return;
    }else{
        if(!banMember){
            message.channel.send(`:tools: | ${message.author} veuillez mentionner un utilisateur.`)
            return;
      }else{
          if(!banMember.bannable){
              message.channel.send(`:tools: | ${message.author} tu ne peux pas bannir cet utilisateur.`)
              return;
        }else{
            if(banMember.hasPermission("ADMINISTRATOR")){
                message.channel.send(`:tools: | ${message.author} cet utilisateur est un admin, tu ne peux pas faire ça.`)
                return;
            }else{
    message.delete(message.author);
    message.guild.member(banMember).ban({reason: `${raison}`});
    message.channel.sendMessage(`:tools: | ${banMember} a été banni ! raison:${raison}`);
            }
        }
    }
}
}

bot.login(TOKEN);
