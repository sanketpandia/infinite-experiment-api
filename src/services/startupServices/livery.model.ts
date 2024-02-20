export class Livery {
  id: string;
  aircraftId: string;
  aircraftName: string;
  liveryName: string;
}

export class AircraftLiveries {
  id: string;
  name: string;
}

export class Aircraft {
  id: string;
  name: string;
  liveries: { [AircraftLiveries: string]: AircraftLiveries };
}

export class AircraftMap {
  [aircraftId: string]: Aircraft;
}
