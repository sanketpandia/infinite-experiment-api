import { Equipment } from 'src/live-flights/live-flight.model';
import { AircraftMapJsonUtility } from '../jsonFile.util';

// common-infinite-flight-utils.ts
export class CommonInfiniteFlightUtils {
  findServerIdByName(objects: any[], name: string): string | undefined {
    const server = objects.find((obj) => obj.name === name);
    return server ? server.id : undefined;
  }

  static getFlightEquipment(aircraftId: string, liveryId: string): Equipment {
    const aircraftMap = AircraftMapJsonUtility.readAircraftMapJsonSync();

    if (aircraftMap[aircraftId]) {
      const aircraftObj = aircraftMap[aircraftId];

      if (aircraftObj.liveries[liveryId]) {
        return new Equipment(
          aircraftObj.name,
          aircraftObj.liveries[liveryId].name,
        );
      }

      return new Equipment(aircraftObj.name, 'Not recognised');
    }
    return new Equipment('Not Found', 'Not Found');
  }
}
