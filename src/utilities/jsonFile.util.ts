import * as fs from 'fs';
import * as path from 'path';
import { AircraftMap } from 'src/services/startupServices/livery.model';

// Utility for synchronous JSON file read and write
export class JsonFileUtility {
  static readJsonFileSync(filePath: string): any {
    const absolutePath = path.resolve(__dirname, filePath);
    const data = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(data);
  }

  static writeJsonFileSync(filePath: string, data: any): void {
    const directory = path.dirname(filePath);

    // Create directory if it doesn't exist
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    // Write JSON data to file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
}

// Utility for reading and writing the aircraft map JSON
export class AircraftMapJsonUtility {
  private static readonly filePath = path.resolve(
    __dirname,
    '..',
    '..',
    'src',
    'configs',
    'aircraftRepository.json',
  );
  static writeAircraftMapJsonSync(aircraftMap: AircraftMap): void {
    JsonFileUtility.writeJsonFileSync(this.filePath, aircraftMap);
  }

  static readAircraftMapJsonSync(): AircraftMap {
    const returnData = JsonFileUtility.readJsonFileSync(this.filePath);
    return returnData as AircraftMap;
  }
}
