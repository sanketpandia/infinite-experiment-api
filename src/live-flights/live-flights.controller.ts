import { Controller, Get, Param } from '@nestjs/common';
import { BotOnly } from 'src/utilities/decorators/BotOnly.decorator';

@Controller('live-flights')
export class LiveFlightsController {
  @Get('server/:serverId')
  @BotOnly()
  getFlightsByServer(@Param('serverId') serverId: string): string[] {
    console.log('Server ID:', serverId); // You can now use the serverId path parameter value
    return [];
  }
}
