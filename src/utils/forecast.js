const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const options = {
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/weather',
        qs: {
          
          lat: latitude,
          lon: longitude,

          id: '2172797',
          lang: 'null',
          units: 'metric',
          mode: 'xml, html'
        },
        json: true,
        headers: {
          'x-rapidapi-key': 'ba52f7e451msh1b411e28751708dp1d7f9cjsn98816af1430d',
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          useQueryString: true
        }
      };
      
      request(options, function (error, response) {
          if (error){
              callback('Unable to connect!',undefined)
          }else if(response.body.error) {
              callback('Location not found!',undefined)
          }else{
            callback(undefined, response.body)
            //   console.log(response.body);
          }
      });
          
}

module.exports = forecast