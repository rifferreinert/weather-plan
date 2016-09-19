var geocoder = require('../build/lib/geocoder.js');
var dotenv = require('dotenv');

dotenv.config();

describe('Geocoder Suite', function() {
  it('geocode cities', function(done) {
    let chicago = geocoder.getCoordinates('Chicago, IL').then((coords) => {
      expect(coords[0]).toBeCloseTo(41.8781136, 3);
      expect(coords[1]).toBeCloseTo(-87.6297982, 3);
    });
    let houston = geocoder.getCoordinates('Houston, TX').then((coords) => {
      expect(coords[0]).toBeCloseTo(29.7604267, 3);
      expect(coords[1]).toBeCloseTo(-95.3698028, 3);
    });
    let seattle = geocoder.getCoordinates('seattle, WA').then((coords) => {
      expect(coords[0]).toBeCloseTo(47.6062095, 3);
      expect(coords[1]).toBeCloseTo(-122.3320708, 3);
    });

    Promise.all([chicago, houston, seattle]).then(() => done());
  });


  it('geocode addresses', function(done) {
    let whitehouse = geocoder.getCoordinates('1600 Pennsylvania Ave NW, Washington, DC 20500').then((coords) => {
      expect(coords[0]).toBeCloseTo(38.8977, 1);
      expect(coords[1]).toBeCloseTo(-77.0365, 1);
    });
    let downing = geocoder.getCoordinates('10 Downing St, London SW1A 2AA, United Kingdom').then((coords) => {
      expect(coords[0]).toBeCloseTo(51.503396, 1);
      expect(coords[1]).toBeCloseTo(-0.12764, 1);
    });
    let max = geocoder.getCoordinates('5625 S Ellis Ave Chicag, IL 60637').then((coords) => {
      expect(coords[0]).toBeCloseTo(41.7928767, 1);
      expect(coords[1]).toBeCloseTo(-87.6030809, 1);
    });

    Promise.all([whitehouse, downing, max]).then(() => done());
  });
});
