import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DiscordLoggerService {
  private readonly webhookUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.webhookUrl = this.configService.get<string>('DISCORD_WEBHOOK_URL');
  }

  async logToDiscord(message: string): Promise<void> {
    try {
      await this.httpService
        .post(this.webhookUrl, { content: message })
        .toPromise();
    } catch (error) {
      console.error('Error posting to Discord webhook:', error);
    }
  }
}
