/*****************************
* environment.js
******************************/

const envType = 'dev'

const ENV = {
    dev: {
        GMAPS_API_KEY: 'AIzaSyDRHUVPtzFjpMY9MK7tpWdgXMYyPKrin4w',
    },
    prod: {
        GMAPS_API_KEY: 'AIzaSyDRHUVPtzFjpMY9MK7tpWdgXMYyPKrin4w'
    }
};

const getEnvVars = () => {
    return envType == 'prod' ? ENV.prod : ENV.dev
};

export default getEnvVars;