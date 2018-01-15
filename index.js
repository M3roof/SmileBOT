const Discord = require("discord.js");
const YTDL = require("ytdl-core");

const TOKEN = "NDAwOTE1ODMyMTE0NTExODcz.DTwKVA.1hOc1hFPGtRGiLLb7EmE0pRguOk";
const PREFIX = "s!";

function play(connection, message) {
    var server = servers[message.guild.id];

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
    let guild = member.guild;
    member.guild.channels.find("name", "general").sendMessage(member.toString() + " Bienvenue sur le serveur !");

    member.addRole(member.guild.roles.find("name", "Invité temporaire"))
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var command = message.content.split(' ')[0].toLowerCase();

    var args = message.content.substring(PREFIX.length).split(" ");

    var number_random = 0;

    var party_launch = false;

    if (command === `${PREFIX}guess-number-start`){

        message.reply("Partie lancée !")

        party_launch = true;

        number_random = Math.floor(Math.random() *  (5000 - 0) +0)

        console.log(number_random);
    }

    if (party_launch && message.content != null){
        if(Number.isInteger(parseInt(message.content))) {
            if (message.content > number_random) {
                message.reply("Plus petit !")
            }
            else if(message.content < number_random) {
                message.reply("Plus grand !")
            }
            else {
                message.reply("à gagné la partie !");
                party_launch = false;
            }
        }
    }

    if (command === `${PREFIX}guess-number-stop`){
        
        if(party_launch == true){
            message.reply("Partie stoppée !")
            party_launch = false;
        } else {
            message.reply("Il n'y a pas de partie en cours !")
            }
        }

    if (command === `${PREFIX}cookie`){
        let usermention = message.mentions.users.first();
        if(!usermention){
            message.channel.send(`:x: | ${message.author} veuillez spécifier un utilisateur.`)
            return;
        }else{
        message.channel.sendMessage(`:cookie: | ${usermention} Tu as reçu un cookie de la part de ${message.author} !`);
        console.log("Coooooooooooookie !")        
        }
    }

    if (command === `${PREFIX}calin`){
        let usermention = message.mentions.users.first();
        if(!usermention){
            message.channel.send(`:x: | ${message.author} veuillez spécifier un utilisateur.`)
            return;
        }else{
        message.channel.sendMessage(`:hugging: | ${usermention} Tu as reçu un câlin de la part de ${message.author} !`);
        console.log("Calaaaaaaain !")        
        }
    }

    if (command === `${PREFIX}bisous`){
        let usermention = message.mentions.users.first();
        if(!usermention){
            message.channel.send(`:x: | ${message.author} veuillez spécifier un utilisateur.`)
            return;
        }else{
        message.channel.sendMessage(`:kiss: | ${usermention} Tu as reçu un bisous de la part de ${message.author} !`);
        console.log("Bisouuuuuus !")        
        }
    }

    if (command === `${PREFIX}kill`){
        let usermention = message.mentions.users.first();
        if(!usermention){
            message.channel.send(`:x: | ${message.author} veuillez spécifier un utilisateur.`)
            return;
        }else{
        message.channel.sendMessage(`:gun: | ${usermention} Tu as été tué par ${message.author} !`);
        console.log("KILL !")        
        }
    }

    if (command === `${PREFIX}coeur`){
        let usermention = message.mentions.users.first();
        if(!usermention){
            message.channel.send(`:x: | ${message.author} veuillez spécifier un utilisateur.`)
            return;
        }else{
        message.channel.sendMessage(`:heart: | ${usermention} Tu as reçu un coeur de la part de ${message.author} !`);
        console.log("COEUUUUUR !")        
        }
    }



    if(command === `${PREFIX}kick`) {
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
              if(!kickMember.kickable){
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

    if(command === `${PREFIX}ban`) {
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
                .addField("__Musique__", "**s!play + lien youtube :** *Lance la musique indiquée* \n**s!skip :** *La musique suivante démarre* \n**s!stop :** *Le bot s'arrête*")
                .addField("__Jeux__", "**s!8ball + question :** *Le bot répond par oui, non et peut-être* \n**s!ping :** *Le bot répond pong* \n**s!cookie + @user#1234 :** *Offre un cookie à l'utilisateur mentionné* \n**s!bisous + @user#1234 :** *Donne un bisous à l'utilisateur mentionné* \n**s!calin + @user#1234 :** *Fait un câlin à l'utilisateur mentionné* \n**s!coeur + @user#1234 :** *Donne un coeur à l'utilisateur mentionné* \n**s!kill + @user#1234 :** *Tue l'utilisateur mentionné*")
                .addField("__Modération__", "**s!kick + @user#1234 + raison :** *Kick l'utilisateur mentionné* \n**s!ban + @user#1234 + raison :** *Ban l'utilisateur mentionné*")
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
    }
});

bot.login(TOKEN);