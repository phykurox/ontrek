/*****************************
* environment.js
******************************/

const envType = 'dev'

const ENV = {
    dev: {
        GMAPS_API_KEY: 'insert api key',
        GOOGLE_PLACES_URL: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
    },
    prod: {
        GMAPS_API_KEY: 'AIzaSyDRHUVPtzFjpMY9MK7tpWdgXMYyPKrin4w'
    }
};

const getEnvVars = () => {
    return envType == 'prod' ? ENV.prod : ENV.dev
};

export default getEnvVars;