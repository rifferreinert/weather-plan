'use strict';
var dotenv = require('dotenv');

var calculator = require('../build/lib/forecast-calculator.js');
var forecast_io = require('../build/lib/forecast-io.js');
var moment = require('moment');

dotenv.config();

describe('calculator test suite', function() {

  beforeEach(function() {
    let times = [];
    let now;
    for (let i =0; i < 5; ++i) {
      now = moment();
      now.set('minute', 0);
      now.set('second', 0);
      now.add(i, 'hours');
      times.push(now.unix());
    }

    this.score_options = {
      hoursAvailable: times,
      rainCoef: 45,
      snowCoef: 45  ,
      sleetCoef: 45,
      tempMean: 70,
      tempCoef: 0.2,
    };
  });

  it('sanity check score', function(done) {
    forecast_io.getForecastByAddress('1600 Pennsylvania Ave NW, Washington, DC 20500').then((fr) => {
      let fc = new calculator.ForecastCalculator(fr, this.score_options); 
      expect(fc.length, 5);
      done();
    });
  });
});
