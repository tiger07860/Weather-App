const request = require('request')

const geocode = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(location)+'.json?access_token=pk.eyJ1IjoiamF0aW5qaW5kYWwiLCJhIjoiY2tpazBkOTVlMDU3dDJ4bDRpb2dqajZsNiJ9.9uwvEh1DC7_lddlvmq7h2Q'

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to Connect!', undefined)
        }else if (response.body.features.length === 0) {
            callback('Location not found!', undefined)
        }else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode