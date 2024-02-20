// startup/startup.module.ts
import { Module } from '@nestjs/common';
import { EquipmentDownload } from './equipmentDownload.service';
import { InfiniteFlightConnector } from '../infiniteFlightConnector/infiniteFlightConnector.module';

@Module({
  providers: [EquipmentDownload],
  exports: [EquipmentDownload], // Ensure EquipmentDownload is correctly exported
  imports: [InfiniteFlightConnector], // Import InfiniteFlightConnector module
})
export class StartupModule {}
