'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/kairos-dev'
  },

 google: {
        clientID: '708634620251-1dfnfhs8hqico49b47ns9uk4fbcoichb.apps.googleusercontent.com',
    	clientSecret:'vpKLE1LWaXx-0N2cXUFqPIK5',
        callbackURL: (process.env.DOMAIN || '') + '/auth/google/callback'
    },

  weather: {
    apiKey : process.env.WEATHER_API || 'b290219f260ca3a384400c3a019b21fd',
    parameters : "?units=si&exclude=daily,flags"
  },

  seedDB: false,
};
