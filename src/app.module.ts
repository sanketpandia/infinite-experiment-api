import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LiveFlightsController } from './live-flights/live-flights.controller';
import { LiveFlightsModule } from './live-flights/live-flights.module';
import { BotIdentificationMiddleware } from './middlewares/BotIdentificationMiddleware';

@Module({
  imports: [LiveFlightsModule],
  controllers: [AppController, LiveFlightsController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BotIdentificationMiddleware).forRoutes('*');
  }
}
