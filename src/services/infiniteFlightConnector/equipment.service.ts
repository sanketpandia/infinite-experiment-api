// infinite-flight/sessions.service.ts
import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { InfiniteFlightService } from './ccommon.service';

@Injectable()
export class EquipmentService {
  private readonly httpClient: AxiosInstance;

  constructor(private readonly infiniteFlightService: InfiniteFlightService) {
    this.httpClient = this.infiniteFlightService.getHttpClient();
  }

  async getAllEquipment(): Promise<any> {
    try {
      console.log(
        `Request URL: '/aircraft/liveries'\nHeaders: ${JSON.stringify(this.httpClient.defaults.headers.common)}`,
      );

      const response = await this.httpClient.get('/aircraft/liveries');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
