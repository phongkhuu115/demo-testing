const rates = require('./rate.json').rates;
const https = require('https');

function convert_rate(currency) {
  return rates[currency];
}

function convert_wrong(amount, currency) {
  return amount * convert_rate(currency);
}

async function convert_correct(amount, currency) {
  const res = await fetch(
    'https://openexchangerates.org/api/latest.json?app_id=5309a2874f164c71b10156b020a8439e'
  );
  const rates_live = await res.json();
  const convert_rates = rates_live.rates;
  if (!convert_rates[currency]) return 'Unknown currency';
  return amount * convert_rates[currency];
}

module.exports = {
  convert_wrong: convert_wrong,
  convert_correct: convert_correct,
};
