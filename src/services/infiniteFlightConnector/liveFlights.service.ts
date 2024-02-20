// infinite-flight/sessions.service.ts
import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { InfiniteFlightService } from './ccommon.service';

@Injectable()
export class LiveFlightService {
  private readonly httpClient: AxiosInstance;

  constructor(private readonly infiniteFlightService: InfiniteFlightService) {
    this.httpClient = this.infiniteFlightService.getHttpClient();
  }

  async getAllFlights(sessionId: string): Promise<any> {
    try {
      const response = await this.httpClient.get(
        `/sessions/${sessionId}/flights`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getFlightPlan(sessionId: string, flightId: string): Promise<any> {
    try {
      const response = await this.httpClient.get(
        `sessions/${sessionId}/flights/${flightId}/flightplan`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
