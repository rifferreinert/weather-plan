var dotenv = require('dotenv');

var forecast_io = require('../build/lib/forecast-io.js');

dotenv.config();

describe('forecast.io suite', function() {

  it('retrieve a forecast response', function(done) {
    let whitehouse = forecast_io.getForecastByAddress('1600 Pennsylvania Ave NW, Washington, DC 20500'); 

    //test to make sure data types match
    whitehouse.then((fr) => {
      //check forecast response
      expect(fr.latitude).toEqual(jasmine.any(Number));
      expect(fr.longitude).toEqual(jasmine.any(Number));
      expect(fr.timezone).toEqual(jasmine.any(String)); 
      expect(fr.offset).toEqual(jasmine.any(Number));
      expect(fr.currently).toEqual(jasmine.anything());
      expect(fr.minutely).toEqual(jasmine.anything());
      expect(fr.hourly).toEqual(jasmine.anything());
      expect(fr.daily).toEqual(jasmine.anything());

      //check currently
      expect(fr.currently.time).toEqual(jasmine.any(Number));
      expect(fr.currently.summary).toEqual(jasmine.any(String));
      expect(fr.currently.precipProbability).toEqual(jasmine.any(Number)); 
      expect(fr.currently.temperature).toEqual(jasmine.any(Number)); 
      expect(fr.currently.apparentTemperature).toEqual(jasmine.any(Number)); 
      expect(fr.currently.windSpeed).toEqual(jasmine.any(Number)); 
      expect(fr.currently.windBearing).toEqual(jasmine.any(Number)); 
      expect(fr.currently.cloudCover).toEqual(jasmine.any(Number)); 
      expect(fr.currently.humidity).toEqual(jasmine.any(Number));
      expect(fr.currently.pressure).toEqual(jasmine.any(Number)); 

      //check minutely
      expect(fr.minutely.data[0].time).toEqual(jasmine.any(Number));
      expect(fr.minutely.data[0].precipIntensity).toEqual(jasmine.any(Number));
      expect(fr.minutely.data[0].precipProbability).toEqual(jasmine.any(Number)); 

      //check hourly
      expect(fr.hourly.data[0].time).toEqual(jasmine.any(Number));
      expect(fr.hourly.data[0].summary).toEqual(jasmine.any(String));
      expect(fr.hourly.data[0].precipProbability).toEqual(jasmine.any(Number)); 
      expect(fr.hourly.data[0].temperature).toEqual(jasmine.any(Number)); 
      expect(fr.hourly.data[0].apparentTemperature).toEqual(jasmine.any(Number)); 
      expect(fr.hourly.data[0].windSpeed).toEqual(jasmine.any(Number)); 
      expect(fr.hourly.data[0].windBearing).toEqual(jasmine.any(Number)); 
      expect(fr.hourly.data[0].cloudCover).toEqual(jasmine.any(Number)); 
      expect(fr.hourly.data[0].humidity).toEqual(jasmine.any(Number));
      expect(fr.hourly.data[0].pressure).toEqual(jasmine.any(Number)); 

      done();
    });
  });
});
