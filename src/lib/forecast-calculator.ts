import { ForecastOptions, DataPoint, DataBlock, Alert, ForecastResponse} from './forecast-io-data';

export interface Score {
  time: number;
  score: number;
  precipType?: string;
  precipIntensity: number;
  precipProbability: number;
  temp: number;
}

export interface ScoreOptions {
  // availability
  hoursAvailable: number[];

  // preferences
  rainCoef: number;
  snowCoef: number;
  sleetCoef: number;
  tempMean: number;
  tempCoef: number;

}

export class ForecastCalculator {
  // calculates a score for each hour that the user is available 
  // to workout. 
  //
  // The general formula is:
  //
  // score = 100 - rainFactor - snowFactor - sleetFactor - tempFactor
  //
  // Where:
  //

  forecast: ForecastResponse;
  options: ScoreOptions;

  constructor(forecast: ForecastResponse, options: ScoreOptions) {
    this.forecast = forecast;
    this.options = options;
  }

  // Return times representing days when the probability of rain is above a given threshold
  daysPrecip(prob: number): number[] {
    let daysPrecip: number[] = [];
    for (let db of this.forecast.daily.data) {
      if (db.precipProbability > prob) {
        daysPrecip.push(db.time);
      }
    }

    return daysPrecip;
  }

  private logisticFunction(x: number, B: number): number {
    return 80 / (1 + 100 * Math.exp(-1 * B * x));
  }

  private rainFactor(dp: DataPoint): number {
    if (dp.precipType !== 'rain') {
      return 0;
    }

    return this.logisticFunction(dp.precipIntensity, this.options.rainCoef);
  }

  private snowFactor(dp: DataPoint): number {
    if (dp.precipType !== 'snow') {
      return 0;
    }

    return this.logisticFunction(dp.precipIntensity, this.options.snowCoef);
  }

  private sleetFactor(dp: DataPoint): number {
    if (dp.precipType !== 'sleet') {
      return 0;
    }

    return this.logisticFunction(dp.precipIntensity, this.options.snowCoef);
  }

  private tempFactor(dp: DataPoint): number {

    return this.logisticFunction(Math.abs(this.options.tempMean - dp.temperature),
                                 this.options.tempCoef);
  }

  private score(dp: DataPoint): Score {
    let score: number = 100 - this.rainFactor(dp)
      - this.snowFactor(dp)
      - this.sleetFactor(dp)
      - this.tempFactor(dp);

    score = score > 0 ? score : 0;
    let hourScore: Score =  {time: dp.time,
                             temp: dp.temperature,
                             score: score,
                             precipIntensity: dp.precipIntensity,
                             precipProbability: dp.precipProbability
                            };
    if (dp.hasOwnProperty('precipType')) {
      hourScore.precipType = dp.precipType;
    }

    return hourScore;
  }

  scoreSchedule(): Score[] {
    return this.forecast.hourly.data.filter(((h) => this.options.hoursAvailable.includes(h.time)))
      .map(this.score, this);
  }

}
