const axios = require("axios");
const countries = require("../Moduls/Countries");
const { listCountryCodesOnly, countryName, calculateRate, doesCurrencyExist, askQuestion } = require("./CommonFunction");

module.exports = async function mainMenu() {
    console.log("Welcome to Currency Convertor.");
    let shouldLoop = true;
    while (shouldLoop) {
        console.log("                 MAIN MENU             ");
        console.log("         [1] Display List of Country Codes");
        console.log("         [2] Check The Country Code ");
        console.log("         [3] Calculate Currency Conversion");
        console.log("         [4] Exit Menu");

        console.log("Welcome to the Currency Converter")
        let answer = await askQuestion("Please select an option from above 1-4: ")
        console.log();
        switch (answer) {
            case "1":
                console.log(".........THE COUNTRY CODES LIST............. ");
                console.table(listCountryCodesOnly(countries));
                break;


            case "2":
                let currencyCode = await askQuestion("Please enter the country code you wish to know the country currency for: ")
                let currencyCodeCaps = currencyCode.toUpperCase();


                if (doesCurrencyExist(currencyCodeCaps, countries) == true) {
                    console.log(`The code you entered ${currencyCodeCaps} stands for ${countryName(currencyCode, countries)}`)
                    console.log();
                } else {
                    console.log("########...ERROR: The code you entered is not vailed One....#########");
                    console.log();
                    break;
                }
                break;
            case "3":
                let base = await askQuestion("Which Country do you want to convert from (enter in 3 letter currency code): ");
                let baseForWebsite = base.toUpperCase();
                let country = await askQuestion("Which Country do you want to convert to (enter in 3 letter currency code): ");
                let countryForWebsite = country.toUpperCase();

                if (doesCurrencyExist(baseForWebsite, countries) == true && doesCurrencyExist(countryForWebsite, countries) == true) {
                    let website = await axios.get(`https://api.exchangeratesapi.io/latest?base=${baseForWebsite}&symbol=${countryForWebsite}`);
                    let amountString = await askQuestion("How much money would you like to convert: $");
                    let amount = parseFloat(amountString);

                    if (!isNaN(amount)) { // Valid amount
                        console.log();
                        let detailedResponse = website.data.rates;                                                                //
                        console.log(`$${amount} in ${baseForWebsite} (${countryName(baseForWebsite, countries)}) equals $${Math.round(calculateRate(detailedResponse, countryForWebsite, amount))} in ${countryForWebsite} (${countryName(countryForWebsite, countries)})`);
                        console.log();
                    }
                    else if (isNaN(amount)) { //invalied ammount 
                        console.log("########......ERROR:Please enter a valid amount in numbers...#########");
                        break
                    }
                    break;
                } else {
                    console.log("##########....ERROR:One of the codes you entered was not valid....#########")
                    break;
                }
            case "4":
                shouldLoop = false;
                break;
            default:
                console.log();
                console.log("Please enter a number from 1 to 4")
        }
    }
    console.log("Thank you for using Currency Convertor APP.");
}