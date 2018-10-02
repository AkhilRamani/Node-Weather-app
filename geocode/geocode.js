const request = require('request');

var geocodeAddress = (address, callBack)=>{

    var encodedAddress = encodeURIComponent(address);

    request({
        url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json:true
    },(error , response , body)=>{

        if (error){
            callBack('Unable to connect to the Server..');
        } 
        else if(body.status === 'ZERO_RESULTS'){
            callBack('Unable to find that Address');
        }
        else if ( body.status === 'OK'){
            callBack(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
        else if (body.status === 'OVER_QUERY_LIMIT'){
            callBack('Over Query Limit. Please Run again');
        }
    });
}

module.exports = {
    geocodeAddress
}