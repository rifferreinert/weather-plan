import * as express from 'express';
import { ForecastResponse, Alert, DataBlock, DataPoint, getForecastByAddress}
  from './lib/forecast-io';
import * as dotenv from 'dotenv';

dotenv.config();

let app = express();

app.get('/', function (req: express.Request, res: express.Response) {
    res.send('Hello World!');
});

app.get('/forcast/:address', function (req: express.Request, res: express.Response) {
  getForecastByAddress(req.params['address']).then(function(forecast: ForecastResponse) {
    res.json(forecast);
  }).catch(function(err: Error) {
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
