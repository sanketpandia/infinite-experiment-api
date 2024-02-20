import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DiscordLoggerService } from './discordErrorHandler.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly discordLogger: DiscordLoggerService) {}

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorMessage =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message || errorMessage,
      requestType: request.headers['x-request-type'] ?? 'NA', // Include request headers
      botServerId: request.headers['x-bot-server-id'] ?? 'NA',
    };

    // Log the error message to Discord webhook with formatting
    this.discordLogger.logToDiscord(`Error log: 
    \`\`\`
${JSON.stringify(errorResponse, null, 2)}
    \`\`\`
      `);

    response.status(status).json(errorResponse);
  }
}
