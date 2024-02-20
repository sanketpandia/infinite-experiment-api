import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LiveFlight, LiveFlightDto } from './live-flight.model';
import { SessionsService } from 'src/services/infiniteFlightConnector/sessions.service';
import { getServerConfig } from 'src/utilities/config.util';
import { CommonInfiniteFlightUtils } from 'src/utilities/infiniteFlightUtils/common.util';
import { CacheService } from 'src/services/cache.service';
import { LiveFlightService } from 'src/services/infiniteFlightConnector/liveFlights.service';
import { LiveFlightUtilities } from 'src/utilities/infiniteFlightUtils/liveFlight.utils';

@Injectable()
export class LiveFlightsService {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly cacheService: CacheService, // Inject CacheService
    private readonly liveFlightsService: LiveFlightService,
  ) {}

  /**
   * Description
   * @param {string} serverId:ID of the discord Server
   * @returns {any}
   */

  async getFlightsByServer(serverId: string): Promise<LiveFlight[]> {
    const config = getServerConfig(serverId);

    // Check if the server ID is cached
    const cachedInfiniteFlightServerId = this.cacheService.get(
      `SERVER_${config.serverPreference}`,
    );

    let infiniteFlightServerId: string;
    let liveFlights: LiveFlightDto[] = [];
    let liveFlightsWithPlans: LiveFlightDto[] = [];
    if (cachedInfiniteFlightServerId) {
      console.log('Fetching from cache: ', cachedInfiniteFlightServerId);
      // Use cached value if available
      infiniteFlightServerId = cachedInfiniteFlightServerId;
    } else {
      // Fetch sessions and get the server ID
      const { result } = await this.sessionsService.getSessions();

      const utils = new CommonInfiniteFlightUtils();
      infiniteFlightServerId = utils.findServerIdByName(
        result,
        config.serverPreference,
      );

      // Cache the server ID
      if (infiniteFlightServerId) {
        this.cacheService.set(
          `SERVER_${config.serverPreference}`,
          infiniteFlightServerId,
          6000,
        );
      }
    }
    try {
      const liveFlightsResponse = await this.liveFlightsService.getAllFlights(
        infiniteFlightServerId,
      );

      const regexPattern = new RegExp(
        `.*${config.callsignPattern}.*`.replace(/_/g, '\\d'),
      );
      // Assuming response is the API response containing an array of flight objects
      liveFlights = liveFlightsResponse.result
        .map((flight: any) => new LiveFlightDto(flight))
        .filter((flightDto: LiveFlightDto) =>
          regexPattern.test(flightDto.callsign),
        );

      liveFlightsWithPlans = await Promise.all(
        liveFlights.map(async (flight: LiveFlightDto) => {
          try {
            const { result, errorCode } =
              await this.liveFlightsService.getFlightPlan(
                infiniteFlightServerId,
                flight.flightId,
              );

            if (errorCode) {
              return flight;
            }
            if (result.waypoints) flight.waypoints = result.waypoints;
            return flight;
          } catch (error) {
            console.log(`Error occured for ${flight.callsign}`);
            return flight;
          }
        }),
      );
    } catch (error) {
      throw error;
      throw new InternalServerErrorException(error.message);
    }

    const transformedFlights =
      LiveFlightUtilities.transformLiveFlights(liveFlightsWithPlans);

    return transformedFlights;
  }
}
