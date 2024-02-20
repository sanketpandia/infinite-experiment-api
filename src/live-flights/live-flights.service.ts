import { Injectable } from '@nestjs/common';
import { LiveFlight } from './live-flight.model';
import { SessionsService } from 'src/services/infiniteFlightConnector/sessions.service';
import { getServerConfig } from 'src/utilities/config.util';
import { CommonInfiniteFlightUtils } from 'src/utilities/infiniteFlightUtils/common.util';
import { CacheService } from 'src/services/cache.service';

@Injectable()
export class LiveFlightsService {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly cacheService: CacheService, // Inject CacheService
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

    if (cachedInfiniteFlightServerId) {
      // Use cached value if available
      infiniteFlightServerId = cachedInfiniteFlightServerId;
    } else {
      // Fetch sessions and get the server ID
      const { errorCode, result } = await this.sessionsService.getSessions();

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
          // Set TTL if needed
        );
      }
    }

    // Logic to fetch flights based on the provided serverId
    // For example:
    // const flights = await this.fetchFlights(infiniteFlightServerId);

    // Placeholder return
    return [];
  }
}
