// infinite-flight/sessions.service.ts
import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { InfiniteFlightService } from './ccommon.service';

@Injectable()
export class SessionsService {
  private readonly httpClient: AxiosInstance;

  constructor(private readonly infiniteFlightService: InfiniteFlightService) {
    this.httpClient = this.infiniteFlightService.getHttpClient();
  }

  async getSessions(): Promise<any> {
    try {
      const response = await this.httpClient.get('/sessions');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}