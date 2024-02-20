import { DiscordLoggerService } from './discordErrorHandler.service';

export class CommonException extends Error {
  message: string;

  constructor(
    message: string,
    private readonly discordLogger: DiscordLoggerService,
  ) {
    super();
    this.message = message;
    discordLogger.logToDiscord(message);
  }
}
