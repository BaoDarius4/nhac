const {
  MessageEmbed
} = require(`discord.js`)
const config = require(`../../botconfig/config.json`)
const ee = require(`../../botconfig/embed.json`);
const {
  createBar,
  format
} = require(`../../handlers/functions`);
module.exports = {
  name: `rewind`,
  category: `Song`,
  aliases: [`rwd`],
  description: `Rewinds by a certain amount of time in the current track.`,
  usage: `rewind <time>`,
  run: async (client, message, args, cmduser, text, prefix) => {
      //get the voice channel of the member
      const { channel } = message.member.voice;
      //if he is not connected to a vc return error
      if (!channel)  return message.channel.send(`:x: **Bạn phải trong room voice mới sài được lệnh.**`);
      //send error if member is Deafed
      if(message.member.voice.selfDeaf) return message.channel.send(`:x: **Bạn không thể sài lệnh khi đang tắt âm**`);
      //get voice channel of the bot
      const botchannel = message.guild.me.voice.channel;
      //get the music player
      const player = client.manager.players.get(message.guild.id);
      //if no player or no botchannel return error
      if(!player || !botchannel) return message.channel.send(`**:x: Không có gì để chơi trong máy chủ**`);
      //if queue size too small return error
      if (!player.queue || !player.queue.current) return message.channel.send(`**:x: Bạn không có gì để chơi trong máy chủ**`);
      //if user is not in the right channel as bot, then return error
      if(player && channel.id !== player.voiceChannel)
        return message.channel.send(`**:x: bạn phải chung phòng với bot mới sài được lệnh**`);
      //if invalid usage
      if (!args[0]) {
        let string = `${prefix}tua lại <thời gian = giây>`
        let embed = new MessageEmbed()
        .setTitle("**:x: Không biết**")
        .setDescription(string)
        if(message.guild.me.hasPermission("EMBED_LINKS")){
          message.channel.send(embed)
        }else{
          message.channel.send("**:x: không biết**\n"+string)
        }
        return;
      }
      //get the seektime variable of the user input
      let seektime = player.position - Number(args[0]) * 1000;
      //if userinput is wrong correct it 
      if (seektime >= player.queue.current.duration - player.position || seektime < 0) 
      return message.channel.send("**:x: Khong thể tua lại bài này**")
      //seek to the right time
      player.seek(Number(seektime));
      //Send Success Message
      return message.channel.send(`**:musical_note: Đặc điểm  \`${format(player.position)}\` :fast_forward:**`);
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
