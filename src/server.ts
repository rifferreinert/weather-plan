import * as express from 'express';
import { ForecastOptions, DataPoint, DataBlock, Alert, ForecastResponse}
  from './lib/forecast-io-data';
import { getForecastByAddress} from './lib/forecast-io';
import { ForecastCalculator } from './lib/forecast-calculator';
import * as dotenv from 'dotenv';

dotenv.config();

let app = express();

app.get('/', function (req: express.Request, res: express.Response) {
    res.send('Hello World!');
});

app.get('/forcast/:address', function (req: express.Request, res: express.Response) {
  getForecastByAddress(req.params['address'])
    .then(function(forecast: ForecastResponse) {
      let options = {hoursAvailable: [1],
                     rainCoef: 1,
                     sleetCoef: 1,
                     snowCoef: 1,
                     tempMean: 1,
                     tempCoef: 1
                    };
      let forecastCalculator = new ForecastCalculator(forecast, options);
      res.json(forecastCalculator.daysPrecip(.3));
    })
    .catch(function(err: Error) {
      if (err.hasOwnProperty('statusCode')) {
        res.status(err['statusCode']).send('Forecast Check Failed');
      } else {
        res.status(400).send('Forecast Check Failed');
      }
      console.log(err);
    });
});

app.listen(3000, function () {
    console.log("I'm listening!");
});
