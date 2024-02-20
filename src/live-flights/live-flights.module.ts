import { Module } from '@nestjs/common';
import { LiveFlightsController } from './live-flights.controller';
import { LiveFlightsService } from './live-flights.service';
import { InfiniteFlightConnector } from 'src/services/infiniteFlightConnector/infiniteFlightConnector.module';
import { CacheService } from 'src/services/cache.service';

@Module({
  controllers: [LiveFlightsController],
  providers: [LiveFlightsService, CacheService],
  exports: [LiveFlightsService],
  imports: [InfiniteFlightConnector],
})
export class LiveFlightsModule {}
