import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Airtable from 'airtable';

@Injectable()
export class AirtableClientService {
  private readonly apiKey: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('AIRTABLE_ACCESS_TOKEN');
  }

  getAirtableInstance(baseId: string): Airtable.Base {
    return new Airtable({ apiKey: this.apiKey }).base(baseId);
  }
}
