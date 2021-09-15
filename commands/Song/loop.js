module.exports = {
  name: `loop`,
  category: `Queue`,
  aliases: ["repeat"],
  description: `Toggles looping for the current playing song.`,
  usage: `loop`,
  run: async (client, message, args, cmduser, text, prefix) => {
      //get the voice channel of the member
      const { channel } = message.member.voice;
      //if he is not connected to a vc return error
      if (!channel)  return message.channel.send(`:x: **Bạn phải trong phòng voice đề sài bot**`);
      //send error if member is Deafed
      if(message.member.voice.selfDeaf) return message.channel.send(`:x: **Bạn phải trong phòng voice đề sài bot**`);
      //get voice channel of the bot
      const botchannel = message.guild.me.voice.channel;
      //get the music player
      const player = client.manager.players.get(message.guild.id);
      //if no player or no botchannel return error
      if(!player || !botchannel) return message.channel.send(`**:x: Không có gì để chơi trong máy chủ**`);
      //if queue size too small return error
      if(!player.current < 1) return message.channel.send(`**:x: Không có gì để chơi trong máy chủ**`);
      //if user is not in the right channel as bot, then return error
      if(player && channel.id !== player.voiceChannel)
        return message.channel.send(`**:x: Bạn phải chung phòng với bot để sài lệnh**`);
      //if bot connected bot not with the lavalink player then try to delete the player
      if(player && botchannel && channel.id !== botchannel.id){
        player.destroy();
      }
      //change Queue Mode
      player.setTrackRepeat(!player.trackRepeat);
      //Send Success Message
      return message.channel.send(`**${player.trackRepeat ? `:repeat_one: Bật` : `:repeat_one: Tắt`}**`);
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
