import { Controller, Get, Param } from '@nestjs/common';
import { PilotsService } from './pilots.service';
import { VAStatsDTO } from './vaStatus.model';

@Controller('pilots/stats')
export class VAStatsController {
  constructor(private readonly pilotsService: PilotsService) {}

  @Get('va/:id') // <-- Assuming 'id' is the name of the parameter in the route path
  async getPilotStats(@Param('id') id: string): Promise<VAStatsDTO> {
    const pilotData = await this.pilotsService.getPilotByCallsign(id);
    return pilotData;
  }
}
