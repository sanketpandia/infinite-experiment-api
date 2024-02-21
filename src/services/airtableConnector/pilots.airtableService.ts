import { Injectable } from '@nestjs/common';
import { AirtableClientService } from './airtableClient.service';

@Injectable()
export class PilotsAirtableService {
  constructor(private readonly airtableClientService: AirtableClientService) {}

  async findRecordByCallsign(baseId: string, callsign: string): Promise<any> {
    const base = this.airtableClientService.getAirtableInstance(baseId);
    return new Promise((resolve, reject) => {
      base('All Pilots')
        .select({
          filterByFormula: `{Callsign} = '${callsign}'`,
          maxRecords: 1, // Limit to 1 record
        })
        .firstPage((err, records) => {
          if (err) {
            reject(err);
          } else {
            if (records && records.length > 0) {
              const fields = records[0].fields;
              resolve(fields);
            } else {
              resolve(null); // No record found with the specified callsign
            }
          }
        });
    });
  }
}
