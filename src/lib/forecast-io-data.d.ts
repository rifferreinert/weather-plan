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
