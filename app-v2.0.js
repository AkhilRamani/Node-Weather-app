const yargs = require('yargs');
const axios =require('axios');

const argv = yargs.options({
        address :{
            demand:true,
            alias:'a',
            describe: 'Fetch Weather for This Address. Provide address within Double or single quotes',
            string:true
        }
    }).help().alias('help','h').argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl)
.then((response)=>{
    if(response.data.status==='OVER_QUERY_LIMIT'){
        throw Error('Over query limit.Please run again');
    }else if (response.data.status==='ZERO_RESULTS'){
        throw Error('Unable to find that Address.');
    }

    console.log('\n'+response.data.results[0].formatted_address+'\n');

    latitude=response.data.results[0].geometry.location.lat;
    longitude=response.data.results[0].geometry.location.lng;
    weatherUrl = `https://api.darksky.net/forecast/7b591036147f2fef7ade2a2b5a27dcef/${latitude},${longitude}`;

    return axios.get(weatherUrl);
})
.then((weatherResponse)=>{
    temperature=weatherResponse.data.currently.temperature;
    apparentTemperature= weatherResponse.data.currently.apparentTemperature;
  
    console.log(`It's a ${temperature}. It feels like ${apparentTemperature}.`);
    console.log(`Currently ${weatherResponse.data.currently.summary}`);
    console.log(`\nDaily : ${weatherResponse.data.daily.summary}`);
     
})
.catch((e)=>{
    if (e.code==='ENOTFOUND') {console.log('Unable to connect to the server')}
    else {console.log(e.message);}
})


