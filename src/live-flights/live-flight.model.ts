export class LiveFlight {
  username?: string;
  callsign: string;
  route: {
    origin?: string;
    destination?: string;
  };
  equipment: {
    aircraft: string;
    livery: string;
  };
  flightParameters: {
    altitude: number;
    distanceToDestination: number;
    groundSpeed: number;
  };

  constructor() {
    this.equipment = {
      aircraft: 'Unrecognised',
      livery: 'Unrecognised',
    };
    this.flightParameters.distanceToDestination = -1;
    this.route = {
      destination: 'NA',
      origin: 'NA',
    };
  }
}
