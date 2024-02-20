export class LiveFlight {
  username?: string;
  callsign: string;
  landingCount: number;
  route: {
    origin?: string;
    destination?: string;
  };
  equipment: Equipment;
  flightParameters: {
    altitude: number;
    distanceToDestination: number;
    groundSpeed: number;
  };

  constructor() {
    this.flightParameters.distanceToDestination = -1;
    this.route = {
      destination: 'NA',
      origin: 'NA',
    };
  }
}

export class Equipment {
  aircraft: string;
  livery: string;
  constructor(aircraft: string, livery: string) {
    this.aircraft = aircraft;
    this.livery = livery;
  }

  setAircraft(aircraft: string) {
    this.aircraft = aircraft;
  }

  setLivery(livery: string) {
    this.livery = livery;
  }
}

export class LiveFlightDto {
  username: string | null;
  callsign: string | null;
  latitude: number | null;
  longitude: number | null;
  altitude: number | null;
  speed: number | null;
  verticalSpeed: number | null;
  track: number | null;
  lastReport: string | null;
  flightId: string | null;
  userId: string | null;
  aircraftId: string | null;
  liveryId: string | null;
  heading: number | null;
  virtualOrganization: string | null;
  waypoints: string[] | null;

  constructor(data: Partial<LiveFlight>) {
    Object.assign(this, data);
  }
}
