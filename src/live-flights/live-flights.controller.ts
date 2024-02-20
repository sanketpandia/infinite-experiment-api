import { Controller, Get, Headers, UseGuards } from '@nestjs/common';
import { RequestType } from 'src/enums/request-type.enum';
import { RequestTypeGuard } from 'src/guards/request-type.guard';
import { LiveFlight } from './live-flight.model';
import { LiveFlightsService } from './live-flights.service'; // Import your service

@Controller('live-flights')
export class LiveFlightsController {
  constructor(private readonly liveFlightsService: LiveFlightsService) {}

  @Get('server/')
  @UseGuards(new RequestTypeGuard(RequestType.BOT))
  async getFlightsByServer(
    @Headers('x-bot-server-id') serverId: string,
  ): Promise<LiveFlight[]> {
    return await this.liveFlightsService.getFlightsByServer(serverId);
  }
}
