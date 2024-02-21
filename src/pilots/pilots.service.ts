import { Injectable } from '@nestjs/common';
import { PilotsAirtableService } from 'src/services/airtableConnector/pilots.airtableService';
import { VAStatsDTO } from './vaStatus.model';
import { CommonInfiniteFlightUtils } from 'src/utilities/infiniteFlightUtils/common.util';

@Injectable()
export class PilotsService {
  constructor(private readonly pilotsAirtableService: PilotsAirtableService) {}

  async getPilotByCallsign(callsign: string) {
    const values = await this.pilotsAirtableService.findRecordByCallsign(
      'appQdvvPfICT94WaD',
      callsign,
    );
    const returnObj: VAStatsDTO = {
      callsign: values['Callsign'],
      category: values['Category'],
      flightTimeInteger: values['Flight Time'],
      flightTime: CommonInfiniteFlightUtils.convertTimeSecondsToString(
        values['Flight Time'],
      ),
      name: values['Name'],
      rank: values['Rank'],
      recentFlightsCount: values['Recent Logged Flights'].length,
      status: values['Status'],
      lastLoggedIn: values['Last Activity'],
    };
    return returnObj;
  }
}
