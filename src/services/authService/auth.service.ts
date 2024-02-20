import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  validateApiKey(apiKey: string): boolean {
    const storedApiKey = this.configService.get<string>('API_KEY');
    return apiKey === storedApiKey;
  }
}
