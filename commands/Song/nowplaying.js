const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const {
  createBar,
  format
} = require(`../../handlers/functions`);
module.exports = {
  name: `nowplaying`,
  category: `Song`,
  aliases: [`np`,],
  description: `Shows what song Rythm is currently playing.`,
  usage: `nowplaying`,
  run: async (client, message, args, cmduser, text, prefix) => {
    //get the voice channel of the member
    const { channel } = message.member.voice;
    //if he is not connected to a vc return error
    if (!channel)  return message.channel.send(`:x: **Bạn phải trong phòng voice nói sài được**`);
    //send error if member is Deafed
    if(message.member.voice.selfDeaf) return message.channel.send(`:x: **Bạn không thể sài khi tắt âm**`);
    //get voice channel of the bot
    const botchannel = message.guild.me.voice.channel;
    //get the music player
    const player = client.manager.players.get(message.guild.id);
    //if no player or no botchannel return error
    if(!player || !botchannel) return message.channel.send(`**:x: Không có gì để chơi trong máy chủ**`);
    //if queue size too small return error
    if (!player.queue || !player.queue.current) return message.channel.send(`**:x: Không có gì để chơi trong máy chủ**`);
    //if user is not in the right channel as bot, then return error
    if(player && channel.id !== player.voiceChannel)
      return message.channel.send(`**:x: Bạn cần phải chung phòng với bot mới sài được lệnh**`);
    //Send Information Message
    message.channel.send(new MessageEmbed()
      .setAuthor("Now Playing ♪", client.user.displayAvatarURL(), "https://milrato.eu")
      .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
      .setURL("https://milrato.eu")
      .setColor("0056bf")
      .setDescription(`[${player.queue.current.title.split("[").join("\[").split("]").join("\]")}](${player.queue.current.uri})\n\n\`${createBar(player)}\`\n\n\`${format(player.position).split(" | ")[0]} / ${format(player.queue.current.duration).split(" | ")[0]}\`\n\n\`Đề nghị bởi:\` ${player.queue.current.requester.username} (${player.queue.current.requester.tag})`)
    ).catch(e=>{
      return message.channel.send("**:x: Your Dm's are disabled**")
    })    

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
