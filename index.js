require('dotenv').config()
const {RestClientV5} = require('bybit-api')
const { Bot } = require('grammy')
  const useTestnet = false
  const client = new RestClientV5({
    key: process.env.API_KEY,
    secret: process.env.API_SECRET,
    testnet: useTestnet, 
  }
  )

  let arrTheSearch = {
      max: '99000',
      min: '80000'
  }
const bot  = new Bot(process.env.API_BOT)

bot.api.setMyCommands([
  {command:'start', description:'Start the bot'},
  {command:'example', description:'Chekend the bot'},
  {command:'position', description:'chekend the wallet'},
])
let strBuy = ''
let strBtc = ''


// Получаем значение текущего времени с сервера для синхронизации и запрашиваем значение BTC
setInterval(() => {
  let currentTime = 
client
  .getServerTime()
  .then((response) => {
    client
    .getKline({
      category: 'spot',
      symbol: 'BTCUSDT',
      interval: '1',
      start: response.time,
      end: response.time,
  })
  .then((response) => {
    let priceBtcClose = response.result.list[0][4] 
    strBtc = response.result.list[0][4]
    if (Number(priceBtcClose) <= Number(arrTheSearch.min)) {
      client
      .submitOrder({
        category: 'spot',
        symbol: '1INCHUSDT',
        side: 'Buy',
        orderType: 'Market',
        qty: '420'
    })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.error(error);
    });
    }
      console.log(priceBtcClose)
  })
    .catch((error) => {
        console.error(error);
    })
    return response.time
    console.log(response.time)
  })
}, 5000)
bot.command('start', async (ctx) => {
  await ctx.reply(`Работаем`)
})
bot.start()