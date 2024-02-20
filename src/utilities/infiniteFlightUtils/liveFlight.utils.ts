import { LiveFlight, LiveFlightDto } from 'src/live-flights/live-flight.model';
import { CommonInfiniteFlightUtils } from './common.util';

export class LiveFlightUtilities {
  static transformLiveFlights(flights: LiveFlightDto[]): LiveFlight[] {
    const transformedLiveFlights: LiveFlight[] = flights.map((flight) => {
      const transformedFlight: LiveFlight = {
        callsign: flight.callsign ?? '',
        landingCount: 0,
        equipment: CommonInfiniteFlightUtils.getFlightEquipment(
          flight.aircraftId,
          flight.liveryId,
        ),
        flightParameters: {
          altitude: flight.altitude,
          distanceToDestination: 0,
          groundSpeed: flight.speed,
        },
        route: { destination: 'NA', origin: 'NA' },
        username: flight.username,
      };

      if (flight.waypoints && flight.waypoints.length > 2) {
        transformedFlight.route.origin = flight.waypoints[0];
        transformedFlight.route.destination =
          flight.waypoints[flight.waypoints.length - 1];
      }

      return transformedFlight;
    });

    return transformedLiveFlights;
  }
}
