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
  name: `forward`,
  category: `Song`,
  aliases: [`fwd`],
  description: `Forwards by a certain amount of time in the current track.`,
  usage: `forward <time>`,
  run: async (client, message, args, cmduser, text, prefix) => {
      //get the voice channel of the member
      const { channel } = message.member.voice;
      //if he is not connected to a vc return error
      if (!channel)  return message.channel.send(`:x: **Bạn phải trong phòng mới sử dụng được lệnh này**`);
      //send error if member is Deafed
      if(message.member.voice.selfDeaf) return message.channel.send(`:x: **Bạn không thể sài lệnh này khi tắt âm**`);
      //get voice channel of the bot
      const botchannel = message.guild.me.voice.channel;
      //get the music player
      const player = client.manager.players.get(message.guild.id);
      //if no player or no botchannel return error
      if(!player || !botchannel) return message.channel.send(`**:x: Không có gì để phát trong máy chủ**`);
      //if queue size too small return error
      if (!player.queue || !player.queue.current) return message.channel.send(`**:x: Không có gì để phát trong máy chủ**`);
      //if user is not in the right channel as bot, then return error
      if(player && channel.id !== player.voiceChannel)
        return message.channel.send(`**:x: bạn phải ở chung phòng với bot mới sài được lệnh này**`);
      //if invalid usage
      if (!args[0]) {
        let string = `${prefix}Đi tới <Thời gian bằng giây>`
        let embed = new MessageEmbed()
        .setTitle("**:x: sử dụng không hợp lệ**")
        .setDescription(string)
        .setColor("#ff0000")
        if(message.guild.me.hasPermission("EMBED_LINKS")){
          message.channel.send(embed)
        }else{
          message.channel.send("**:x: sử dụng không hợp lệ**\n"+string)
        }
        return;
      }
      //get the seektime variable of the user input
      let seektime = Number(player.position) + Number(args[0]) * 1000;
      //if the userinput is smaller then 0, then set the seektime to just the player.position
      if (Number(args[0]) <= 0) seektime = Number(player.position);
      //if the seektime is too big, then set it 1 sec earlier
      if (Number(seektime) >= player.queue.current.duration)
        return message.channel.send(`**:x: Thời gian không thể dài hơn bài hát**`);
      //seek to the new Seek position
      player.seek(Number(seektime));
      //Send Success Message
      return message.channel.send(`**:musical_note: Đặt vị trí thành \`${format(player.position)}\` :fast_forward:**`);
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
