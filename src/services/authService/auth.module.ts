// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { BotIdentificationMiddleware } from './BotIdentification.middleware';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [AuthService, BotIdentificationMiddleware],
  exports: [AuthService], // Make AuthService available for injection in other modules
})
export class AuthModule {}
