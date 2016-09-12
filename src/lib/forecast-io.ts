import * as rp  from 'request-promise';
import * as querystring from 'querystring';
import * as geocoder from './geocoder';

export interface ForecastOptions {
  units?: string;
  exclude?: string;
  extended?: string;
  lang?: string;
}

export interface DataPoint {
  time: number;
  summary?: string;
  icon?: string;
  sunriseTime?: number;
  sunsetTime?: number;
  moonPhase?: number;
  nearestStormDistance?: number;
  nearestStormBearing?: number;
  precipIntensity?: number;
  precipIntensityMax?: number;
  precipIntensityMaxTime?: number;
  precipProbability?: number;
  precipType?: string;
  precipAccumulation?: number;
  temperature?: number;
  temperatureMin?: number;
  temperatureMinTime?: number;
  temperatureMax?: number;
  temperatureMaxTime?: number;
  apparentTemperature?: number;
  apparentTemperatureMin?: number;
  apparentTemperatureMinTime?: number;
  apparentTemperatureMax?: number;
  apparentTemperatureMaxTime?: number;
  dewPoint?: number;
  windSpeed?: number;
  windBearing?: number;
  cloudCover?: number;
  humidity?: number;
  pressure?: number;
  visibility?: number;
  ozone?: number;
}

export interface DataBlock {
  summary: string;
  icon: string;
  data: DataPoint[];
}

export interface Alert {
  title: string;
  expires: number;
  description: string;
  uri: string;
}

export interface ForecastResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  offset: number;
  currently: DataPoint;
  minutely: DataBlock;
  hourly: DataBlock;
  daily: DataBlock;
  alerts: Alert[];
  flags: any;
}

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
