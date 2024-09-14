import request from "request";

export const forecast = (lon,lat, callback) => {
    const key = 'de48116b966a4757b5abc3a98ca583af';
    const url = `https://api.weatherbit.io/v2.0/current?lon=${lon}&lat=${lat}&key=${key}`;
        
    request({url,json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect to Weather Service!',undefined);
        }
        else if(body.data.length===0){
            callback('Unable to find weather information for the specified location, try another search',undefined);
        }
        else{
            callback(undefined,'It is Currently '+body.data[0].app_temp + ' degress out . There is ' +body.data[0].precip + 
                '% chance of rain in ' + body.data[0].city_name
            );
            
        }
    });
};