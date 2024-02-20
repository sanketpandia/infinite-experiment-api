import { Module } from '@nestjs/common';
import { LiveFlightsController } from './live-flights.controller';

@Module({
  controllers: [LiveFlightsController],
  providers: [],
})
export class LiveFlightsModule {}
