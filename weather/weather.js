const request = require('request');

var getWeather = (latitude,longitude,callBack) => {

    request({
        url:`https://api.darksky.net/forecast/7b591036147f2fef7ade2a2b5a27dcef/${latitude},${longitude}`,
        json:true
    }, (error, response , body) =>{
        if(!error && response.statusCode === 200 ){
            callBack(undefined,{
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature,
                currentlySummary:body.currently.summary,
                dailySummary: body.daily.summary
            });
        }
        else {
            callBack('Unable to fetch weather');
        }

    });
}

module.exports.getWeather = getWeather;