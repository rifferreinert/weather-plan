import * as express from 'express';
import { ForecastResponse, Alert, DataBlock, DataPoint, getForecastByAddress}
  from './lib/forecast-io';
import * as dotenv from 'dotenv';

dotenv.config();

let app = express();

app.get('/', function (req: express.Request, res: express.Response) {
    res.send('Hello World!');
});

app.get('/forcast', function (req: express.Request, res: express.Response) {
  getForecastByAddress('2038 w pierce chicago, IL').then(function(data: any) {
    res.send(data);
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
