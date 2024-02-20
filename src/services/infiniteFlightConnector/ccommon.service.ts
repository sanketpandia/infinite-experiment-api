// infinite-flight/infinite-flight.service.ts
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InfiniteFlightService {
  private readonly httpClient: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    // Initialize Axios HTTP client
    this.httpClient = axios.create({
      baseURL: 'https://api.infiniteflight.com/public/v2',
    });

    // Set default headers
    const apiKey = this.configService.get<string>('IF_API_KEY');
    console.log('API Key: ' + apiKey);
    if (apiKey) {
      this.httpClient.defaults.headers.common['Authorization'] =
        `Bearer ${apiKey}`;
    } else {
      console.warn(
        'IF_API_KEY is not set. Requests may not be authenticated properly.',
      );
    }
  }

  // Method to expose the Axios instance
  getHttpClient(): AxiosInstance {
    return this.httpClient;
  }
}
