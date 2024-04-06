function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const sourceCurrency = document.getElementById('sourceCurrency').value;
    const targetCurrency = document.getElementById('targetCurrency').value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${sourceCurrency}`)
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.rates[targetCurrency];
            const convertedAmount = (amount * exchangeRate).toFixed(2);
            document.getElementById('result').innerHTML = `${amount} ${sourceCurrency} = ${convertedAmount} ${targetCurrency}`;
        })
        .catch(error => console.error('Error:', error));
}
