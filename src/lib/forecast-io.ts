import * as rp  from 'request-promise';
import * as querystring from 'querystring';
import * as geocoder from './geocoder';
import { ForecastOptions, DataPoint, DataBlock, Alert, ForecastResponse} from './forecast-io-data';


function buildURL(latitude: number, longitude: number, options?: ForecastOptions): string {
  let url: string;
  url = 'https://api.forecast.io/forecast/' + process.env.FORECAST_IO_API_KEY
    + '/' + latitude + ',' + longitude;

  if (options) {
      if (options.extended && options.extended !== '') {
        throw Error("the extended option must equal 'hourly'");
      }
    url += '?' + querystring.stringify(options);
  }

  return url;
}

export function getForecastByCoords(latitude: number, longitude: number,
                                    options?: ForecastOptions): Promise<ForecastResponse> {
  let url: string;
  url = buildURL(latitude, longitude, options);

  return rp.get(url)
    .then(function (data: string) {
        return JSON.parse(data);
    });
}

export function getForecastByAddress(address: string, options?: ForecastOptions):
  Promise<ForecastResponse> {
  return geocoder.getCoordinates(address)
    .then(function(location: [number, number]) {
      return getForecastByCoords(location[0], location[1], options);
    });
}
