import request from "request";

export const geoCode = (address,callback) => {
    const key='1a7b2fac33c642ba7052c49ce892df46';
    const url = `http://api.positionstack.com/v1/forward?access_key=${key}&query=${encodeURIComponent(address)}&limit=1`;
    
    request({url,json:true}, (error,{body}) => {
        if(error){
            callback('Unable to Connect with location Service!',undefined);
        }
        else if(body.error){
            callback('Unable to find the location, try another search',undefined);
        }
        else{
            callback(undefined,{
                lon : body.data[0].longitude,
                lat : body.data[0].latitude,
                label : body.data[0].label
            });
        }
    });
};

