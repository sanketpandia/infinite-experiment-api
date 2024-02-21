import { Module } from '@nestjs/common';
import { VAStatsController } from './vaStats.controller';
import { PilotsService } from './pilots.service';
import { AirtableConnectorModule } from 'src/services/airtableConnector/airtableConnector.module';
import { PilotsAirtableService } from 'src/services/airtableConnector/pilots.airtableService';
import { AirtableClientService } from 'src/services/airtableConnector/airtableClient.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [PilotsService, PilotsAirtableService, AirtableClientService],
  controllers: [VAStatsController],
  imports: [AirtableConnectorModule, ConfigModule],
})
export class PilotsModule {}
