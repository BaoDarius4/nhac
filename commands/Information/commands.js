const { MessageEmbed, Message } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { paginationEmbed } = require("../../handlers/functions");
module.exports = {
    name: "commands",
    category: "Information",
    aliases: ["cmd", "cmds"],
    cooldown: 4,
    usage: "commands",
    description: "Shows all available Commands",
    run: async (client, message, args, user, text, prefix) => {
      try{
       
        //Lệnh nhạc
let string1 = `\`\`\`fix
*disconnect -- Ngắt kết nối bot
*forward    -- Tua trong một khoảng thời gian nhất định
*grab       -- Lưu bài hát đang phát hiện tại vào DM của bạn
*loop       -- Lặp lại bài hát
*lyrics     -- Hiện sanh sách đang phát
*nowplaying -- Hiện bài hát đang phát
*pause      -- Dừng ngay bài hét đang phát
*play       -- Phát từ youtube
*playskip   -- Qua bài qua phát
*playtop    -- Thêm một bài hát vào đầu hàng đợi
*replay     -- Phát lại
*resume     -- phát tiếp
*rewind     -- Tua lại theo một khoảng thời gian nhất định
*search     -- Tìm kiếm bài hát trên youtube
*seek       -- Tới một điểm nhất định trong bản nhạc hiện tại
*skip       -- Vote để skip bài hát
*soundcloud -- Phát bài hát trên soundcloud 
\`\`\``
//Lệnh chờ
let string2 = `\`\`\`fix
*clear      -- Xóa danh sách
*loopqueue  -- Vòng lặp trong danh sách đợi
*shuffle    -- Phát ngẫu nhiên
\`\`\``
//Lệnh thông tin
let string3 = `\`\`\`fix
*commands   -- Hiện tất cả lệnh
*aliases    -- Hiển thị các Bí danh cho mỗi Lệnh
*ping       -- Thông tin về tốc độ phản hồi của Bot
*uptime     -- Thời gian bot online
\`\`\``     
        let pages = [
          {"title": "SONG COMMANDS", "msg": string1},
          {"title": "QUEUE COMMANDS", "msg": string2},
          {"title": "INFORMATION COMMANDS", "msg": string3},
        ]
        paginationEmbed(message, pages, ['⏪', '⏩', "⏹"], 60000)

    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
