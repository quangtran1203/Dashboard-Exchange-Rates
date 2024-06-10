export const formatRequest = (baseCurrency, data, dateNow) => {
    const { dates, cad, usd, eur } = data;
    const rates = [];
    if (baseCurrency === "USD") {
        for (let i = 0; i < dates.length; i++) {
            rates.push({
                date: dates[i],
                CAD: cad[i],
                EUR: eur[i],
            })
        }
    }
    else if (baseCurrency === "CAD") {
        for (let i = 0; i < dates.length; i++) {
            rates.push({
                date: dates[i],
                USD: usd[i],
                EUR: eur[i],
            })
        }
    }
    else {
        for (let i = 0; i < dates.length; i++) {
            rates.push({
                date: dates[i],
                USD: usd[i],
                CAD: cad[i],
            })
        }
    }

    const formattedData = {
        baseCurrency,
        rates,
        lastUpdateOn: dateNow,
    };

    return formattedData;
}