import { ServerPreference } from 'src/constants';

// server-config.types.ts
export interface ServerConfig {
  [serverId: string]: ServerInfo;
}

export interface ServerInfo {
  serverName: string;
  callsignPattern: string;
  serverPreference: ServerPreference;
}
