const FutWebApi = require('fut-web-api');

const loginDetails = {
  email: 'your_ea_email@example.com',
  password: 'your_password',
  secret: 'your_security_answer',
  platform: 'ps4' // or 'xbox' or 'pc'
};

const api = new FutWebApi();

async function main() {
  try {
    await api.login(loginDetails);
    console.log('Logged in successfully');

    const playerId = 123456; // معرف اللاعب
    const targetPrice = 50000; // السعر المستهدف

    const playerData = await api.getPlayer(playerId);
    console.log(`Player data: ${JSON.stringify(playerData)}`);

    if (playerData && playerData.lowestBIN <= targetPrice) {
      await api.bid(playerData.tradeId, playerData.lowestBIN);
      console.log(`Bought player ${playerId} for ${playerData.lowestBIN}`);
    } else {
      console.log('No good deals found');
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
