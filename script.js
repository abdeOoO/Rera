document.getElementById('searchBtn').addEventListener('click', function() {
    const playerId = document.getElementById('playerId').value;
    const targetPrice = document.getElementById('targetPrice').value;

    if (!playerId || !targetPrice) {
        alert('يرجى إدخال معرف اللاعب والسعر المستهدف');
        return;
    }

    fetchPlayerData(playerId, targetPrice);
});

function fetchPlayerData(playerId, targetPrice) {
    const apiUrl = `https://www.futbin.com/api/playerPrices?player=${playerId}`;
    const apiKey = 'your_api_key_here';

    fetch(apiUrl, {
        headers: {
            'X-AUTH-TOKEN': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        displayResults(data, playerId, targetPrice);
    })
    .catch(error => {
        console.error('Error fetching player data:', error);
    });
}

function displayResults(data, playerId, targetPrice) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    for (const platform in data[playerId]) {
        const price = data[playerId][platform]['LCPrice'];

        if (price && price <= targetPrice) {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = `
                <strong>المنصة:</strong> ${platform}<br>
                <strong>السعر:</strong> ${price}<br>
                <button onclick="buyPlayer(${playerId}, ${price})">شراء</button>
            `;
            resultsDiv.appendChild(resultItem);
        }
    }
}

function buyPlayer(playerId, price) {
    alert(`شراء اللاعب ${playerId} بسعر ${price}`);
}
