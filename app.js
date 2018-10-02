const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const Weather = require('./weather/weather');

const argv = yargs.options({
        address :{
            demand:true,
            alias:'a',
            describe: 'Fetch Weather for This Address. Provide address within Double or single quotes',
            string:true
        }
    }).help().alias('help','h').argv;


geocode.geocodeAddress(argv.address, (errorMessage , results) =>{

    if(errorMessage){
        console.log(errorMessage);
    } else {
        console.log(`\n${results.address}\n`);
        
        Weather.getWeather(results.latitude,results.longitude , (errorMessage , weatherResult) =>{
            if (errorMessage){
                console.log(errorMessage);
            } else {
                console.log(`It's a ${weatherResult.temperature}. It feels like ${weatherResult.apparentTemperature}.`);
                console.log(`Currently ${weatherResult.currentlySummary}`);
                console.log(`\nDaily : ${weatherResult.dailySummary}`);
            }
        });
    }
});


