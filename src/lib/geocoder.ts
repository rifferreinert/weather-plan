import * as rp  from 'request-promise';
import * as querystring from 'querystring';
import * as Bluebird from 'bluebird';

function buildURL(address: string): string {
  return 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address)
    + '&key=' + process.env.GOOGLE_MAPS_API_KEY;
}

export function getCoordinates(address: string): Bluebird<[number, number]> {
  let url: string;
  url = buildURL(address);

  return rp.get(url)
    .then(function (data: string) {
        let location = JSON.parse(data).results[0].geometry.location;
        let lat: number = location.lat;
        let lng: number = location.lng;
        return Bluebird.resolve([lat, lng]);
    });
}
