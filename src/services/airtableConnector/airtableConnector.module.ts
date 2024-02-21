import { Module } from '@nestjs/common';
import { PilotsAirtableService } from './pilots.airtableService';
import { AirtableClientService } from './airtableClient.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [PilotsAirtableService, AirtableClientService],
  exports: [PilotsAirtableService],
  imports: [ConfigModule],
})
export class AirtableConnectorModule {}
