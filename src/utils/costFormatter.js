export default function CurrencyFormatted(amount) {
    // The data
    const price = {
        currency: 'UZS',
        amount: amount
    };

    // toLocaleString options
    const options = {
        style: 'currency',
        currency: price.currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };

    // £4.99
    return price.amount.toLocaleString(amount, options);
}
