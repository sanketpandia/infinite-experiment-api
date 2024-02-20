import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { EquipmentService } from '../infiniteFlightConnector/equipment.service';
import { AircraftMap, Livery } from './livery.model';
import { AircraftMapJsonUtility } from 'src/utilities/jsonFile.util';

@Injectable()
export class EquipmentDownload implements OnModuleInit {
  constructor(private readonly equipmentService: EquipmentService) {}
  async onModuleInit(): Promise<void> {
    try {
      // Call the EquipmentService to fetch equipment data during startup
      const equipmentData = await this.equipmentService.getAllEquipment();
      console.log('Performing Equipment Download Task:....');

      if (equipmentData.errorCode !== 0) {
        throw new Error('Invalid error code');
      }
      // Type cast to list of liveries
      const liveryArray: Livery[] = equipmentData.result.map((item: any) => {
        const livery = new Livery();
        livery.id = item.id;
        livery.aircraftId = item.aircraftID;
        livery.aircraftName = item.aircraftName;
        livery.liveryName = item.liveryName;
        return livery;
      });
      console.log(
        `Liveries download complete: ${liveryArray.length} liveries downloaded!`,
      );
      AircraftMapJsonUtility.writeAircraftMapJsonSync(
        this.transformToAircraftMap(liveryArray),
      );

      console.log('Equipment download task completed successfully!!');
      // Perform other startup tasks if needed
      await this.performStartupTasks();
    } catch (error) {
      console.error('Error occurred during startup:', error);
    }
  }

  async performStartupTasks(): Promise<void> {
    // Implement your startup tasks here
    // For example, initialize services, load configurations, etc.
    // const liveries =
  }

  transformToAircraftMap(liveries: Livery[]): AircraftMap {
    const aircraftMap: AircraftMap = {};
    liveries.forEach((livery) => {
      if (!aircraftMap[livery.aircraftId]) {
        aircraftMap[livery.aircraftId] = {
          id: livery.aircraftId,
          name: livery.aircraftName,
          liveries: {},
        };
      }

      aircraftMap[livery.aircraftId].liveries[livery.id] = {
        id: livery.id,
        name: livery.liveryName,
      };
    });
    return aircraftMap;
  }
}
