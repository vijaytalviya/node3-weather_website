const request = require('request')

const forecast= (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=89320d9912c5d89162c092c66f23bb98&query=' + latitude + ',' + longitude + '&units=m'
    request({ url,json: true},(error,{body})=>{
        if(error){
            callback('unable to connect weather server',undefined)
        }else if(body.error){

            callback('unable to find location. try something other',undefined)

        }else{
                callback(undefined,{
                    descriptions:body.current.weather_descriptions[0],
                    temperature:body.current.temperature,
                    windSpeed:body.current.wind_speed,
                    pressure:body.current.pressure,
                    humidity:body.current.humidity,
                    feelslike:body.current.feelslike

                })
            // callback(undefined,(body.current.weather_descriptions[0] +
            //      '. it is currently ' + body.current.temperature +
            //       ' degrees . it feels like '+ body.current.feelslike +
            //        ' degree out'))
        }
    
    })

}

module.exports = forecast