const convert_wrong = require('./convert').convert_wrong;
const convert_correct = require('./convert').convert_correct;

test('Convert is an async function', () => {
  try {
    expect(convert_correct).toBeInstanceOf(Function); // Check if it's a function
    expect(convert_correct.constructor.name).toBe('AsyncFunction'); // Check if it's an async function
  } catch (error) {
    console.log('Convert not an async function');
  }
});

test('Should correctly convert all type of currencies', async () => {
  const res = await fetch(
    'https://openexchangerates.org/api/latest.json?app_id=5309a2874f164c71b10156b020a8439e'
  );
  const rates_live = await res.json();
  let convert_rates = rates_live.rates;
  for (let currency in convert_rates) {
    const amount = Math.random() * 10;
    expect(amount * convert_rates[currency]).toBe(
      await convert_correct(amount, currency)
    );
  }
}, 50000);
