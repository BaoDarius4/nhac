const {
  MessageEmbed
} = require(`discord.js`);
const playermanager = require(`../../handlers/lavalink/playermanager`);
module.exports = {
  name: `playtop`,
  category: `Song`,
  aliases: [`ptop`, `pt`],
  description: `Adds a song with the given name/url on the top of the queue`,
  usage: `playtop <link/query>`,
  run: async (client, message, args, cmduser, text, prefix) => {
    const {
      channel
    } = message.member.voice;
    if (!channel) return message.channel.send(`:x: **Bạn phải vào room voice mới sài được lệnh.**`);
    //send error if member is Deafed
    if (message.member.voice.selfDeaf) return message.channel.send(`:x: **Bạn không thề sài lệnh khi tắt âm**`);
    const botchannel = message.guild.me.voice.channel;
    //if no args added return error message if allowed to send an embed
    if (!args[0]) {
      let string = `${prefix}playtop <link/query>`
      let embed = new MessageEmbed()
        .setTitle("**:x: Kohng6 biết**")
        .setDescription(string)
        .setColor("#ff0000")
      if (message.guild.me.hasPermission("EMBED_LINKS")) {
        message.channel.send(embed)
      } else {
        message.channel.send("**:x: Không biết**\n" + string)
      }
      return;
    }
    ///get the player
    const player = client.manager.players.get(message.guild.id);
    //if user is not in the right channel as bot, then return error
    if (player && channel.id !== player.voiceChannel)
      return message.channel.send(`**:x: Bạn phải chung phòng với bot mới sài được lệnh**`);
    //if bot connected bot not with the lavalink player then try to delete the player
    if (player && botchannel && channel.id !== botchannel.id) {
      player.destroy();
    }
    //IF YOUTUBE SEND INFO WITH YOUTUBE
    if (message.content.includes("youtu")) {
      //send searching
      message.channel.send(`<:youtube:826100274095194132> **đang tìm** :mag_right: \`${args.join(" ")}\``)
      //play the song from our playermanager
      playermanager(client, message, args, `play:youtube`);
      //IF SPOTIFY SEARCH SEND INFO WITH SPOTIFY
    } else if (message.content.includes("spotify")) {
      //send searching
      message.channel.send(`<:spotify:818555971873013761>**đang tìm** :mag_right: \`${args.join(" ")}\``)
      //play the song from our playermanager
      playermanager(client, message, args, `play:youtube`);
      //IF SOUNDCLOUD SEARCH SEND INFO WITH SOUNDCLOUD
    } else if (message.content.includes("soundcloud")) {
      //send searching
      message.channel.send(`<:soundcloud:818555972079321128> **Sđang tìm** :mag_right: \`${args.join(" ")}\``)
      //play the song from our playermanager
      playermanager(client, message, args, `play:soundcloud`);
      //ELSE SEND RYTHM INFO
    } else if (message.content.includes("http")) {
      //send searching
      message.channel.send(`<:rythm:826519647347539990> **đang tìm** :mag_right: \`${args.join(" ")}\``)
      //play the song from our playermanager
      playermanager(client, message, args, `play:youtube`);
    } else {
      //send searching
      message.channel.send(`<:youtube:826100274095194132> **Đang tìm** :mag_right: \`${args.join(" ")}\``)
      //play the song from our playermanager
      playermanager(client, message, args, `play:youtube`);
    }
  }
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
