const Discord = require("discord.js-selfbot-v13");

const channelName = "your channel name"   //MJ频道名称

//https://discord.com/channels/1111/1234
//first Num is guildId
//sec Num is channelId

const channelId = '1234'
const guildId = '1111'
const mjAuthorId = '936929561302675456'

const regexParseId = (str) => {
    const regex = /ID:\[(\w+)\]/;
    const match = regex.exec(str);
    if (match && match.length > 1) {
      return match[1];
    }
    return null;
}

const logger = (param) => {
    console.debug(`[CF]`, param);
}

const client = new Discord.Client({
    proxy:"socks://127.0.0.1:1080" //本机代理地址
});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.prefix = "Prefix";
client.name = "SelfBot Name";
client.dellist = null;
client.dellog = "";
client.automsg = [];
client.logger = logger


let channel;

client.on("ready", async () => {

    console.log(client.channels)

    const filteredChannels = client.channels.cache.filter(channel => channel.name === channelName);

    channel = filteredChannels.first()

    channel.send("working!")

    // 发送生成指令
    // const id = generateId()
    // const command = `a dog ID:[${id}]`
    // channel.sendSlash(mjAuthorId, 'imagine', command)

});

// 监听DISCORD信息，获取生成结果
client.on("message", async (message) => {
    if (message.channelId == channelId && message.guildId == guildId) {
        if (message.content == 'start!') {
            channel = message.channel
            channel.send("working!")
        }
        if(message.author.id==mjAuthorId){
            let msg = message
            const id = regexParseId(msg.content);
                //接收图片
            if(id && msg.attachments){
                let obj = msg.attachments                
                let temp = obj.values()            
                let objValues = [...temp]            
                if(objValues.length>0){
                    const att = objValues[0];
                    if(att.attachment){
                        if(!message.reference){
                            // 下载四张合并图
                            // downloadFile(att.attachment,id) 
                            message.clickButton({ row: 0, col: 0})
                            message.clickButton({ row: 0, col: 1})
                            message.clickButton({ row: 0, col: 2})
                            message.clickButton({ row: 0, col: 3})
                        }else{
                            // 下载单个图
                            // downloadFile(att.attachment,id)
                        }
                    }
                }
            }          
        }
    }
})

async function main(){
    console.log('start')
    await client.login('your token');
}

main()

