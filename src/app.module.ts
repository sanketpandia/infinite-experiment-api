// app.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LiveFlightsController } from './live-flights/live-flights.controller';
import { LiveFlightsModule } from './live-flights/live-flights.module';
import { DiscordLoggerService } from './services/errorHandlers/discordErrorHandler.service';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './services/errorHandlers/allExceptionsFilter';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './services/authService/auth.module'; // Import AuthModule
import { BotIdentificationMiddleware } from './services/authService/BotIdentification.middleware';
import { StartupModule } from './services/startupServices/startupServices.module';
import { PilotsModule } from './pilots/pilots.module';

@Module({
  imports: [
    LiveFlightsModule,
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    AuthModule, // Include AuthModule
    StartupModule,
    PilotsModule,
  ],
  controllers: [AppController, LiveFlightsController],
  providers: [
    AppService,
    DiscordLoggerService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BotIdentificationMiddleware).forRoutes('*');
  }
}
