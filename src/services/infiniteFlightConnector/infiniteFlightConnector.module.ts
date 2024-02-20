import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { InfiniteFlightService } from './ccommon.service';
import { ConfigModule } from '@nestjs/config';
import { LiveFlightService } from './liveFlights.service';
import { EquipmentService } from './equipment.service';

@Module({
  exports: [SessionsService, LiveFlightService, EquipmentService],
  providers: [
    InfiniteFlightService,
    SessionsService,
    LiveFlightService,
    EquipmentService,
  ],
  imports: [ConfigModule],
})
export class InfiniteFlightConnector {}
