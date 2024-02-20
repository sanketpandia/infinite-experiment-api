import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { InfiniteFlightService } from './ccommon.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  exports: [SessionsService],
  providers: [InfiniteFlightService, SessionsService],
  imports: [ConfigModule],
})
export class InfiniteFlightConnector {}
