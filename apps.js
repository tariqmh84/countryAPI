/* Skriv din kod här */
// Declare variables som ska använda
let countryName = document.querySelectorAll('h1');
let countryFlag = document.querySelectorAll('img');
let countryTime = document.querySelectorAll('h3');
let country = {};


// Listener som tar hand om data fetching och sortering
function getCounrties() {
    // API URL variable för flexibilitet
    let fetchedURL = `https://restcountries.eu/rest/v2/all`;

    // Skapa en Array som ska vi pusha alla lander i
    let countryArray = [];
    // Skapar en fetch
    fetch(fetchedURL).then(
            function(response) {

                // Errorhantering
                if (response.status === 100) {
                    throw 'The API key passed was not valid or has expired';
                } else if (response.status === 105) {
                    throw 'The requested service is temporarily unavailable'
                } else if (response.status === 106) {
                    throw 'The requested operation failed due to a temporary issue.'
                } else if (response.status === 111) {
                    throw 'The requested response format was not found'
                } else if (response.status === 112) {
                    throw 'The requested method was not found'
                } else if (response.status === 114) {
                    throw 'The SOAP envelope send in the request could not be parsed.'
                } else if (response.status === 115) {
                    throw 'The XML-RPC request document could not be parsed.'
                } else if (response.status === 116) {
                    throw 'One or more arguments contained a URL that has been used for absure on Flickr.'
                } else if (response.status >= 200 && response.status <= 299) {
                    return response.json();

                };

            }
        ).then(data => {
            // Skapar en for-loop för att hämta alla landererna
            for (let i = 0; i < data.length; i++) {
                let name = data[i].name;
                let timeZ = data[i].timezones[0];
                let flagUrl = data[i].flag;

                // Skapa land object
                country = new Country(name, timeZ, flagUrl);

                // Pushar in lander i arrayn
                countryArray.push(country);

            }

            //Randomiz land arrayen
            let randomizedCountry = countryArray.sort(() => Math.random() - 0.5);
            // Välja 3 sticker av lander 
            let pickedCountry = randomizedCountry.splice(0, 3);
            console.log(pickedCountry)
                // generate landerna från arrayen och ligga dem i DOMen
            generateCountry(pickedCountry);
        })
        .catch((err) => alert(err));
}

// generate landerna function.
function generateCountry(arr) {
    for (let i = 0; i < arr.length; i++) {
        countryName[i].innerText = `${arr[i].name}`;
        countryFlag[i].src = arr[i].flagUrl;
        countryTime[i].innerText = `Current time: ${arr[i].calcTime()}`;
    }
}

// Skapar land mall
function Country(name, timeZ, flagUrl) {
    this.name = name;
    this.timeZ = timeZ;
    this.flagUrl = flagUrl;
}

// Instans-metod
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXX    THIS IS FUNCTION TO CONVERT TIME ZONE TO REAL TIME    XXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx                         
Country.prototype.calcTime = function() {

    let countryTZString = this.timeZ.substr(3, 3);

    let countryTZInt = parseInt(countryTZString);

    d = new Date();

    localUTCTime = d.getTime() + (d.getTimezoneOffset() * 60000);

    nd = new Date(localUTCTime + (3600000 * countryTZInt));

    return nd.toLocaleTimeString();

}

getCounrties();