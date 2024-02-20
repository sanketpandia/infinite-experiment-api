import * as fs from 'fs';
import * as path from 'path';
import { CONFIG_PATHS, ConfigName } from '../constants';
import { ServerConfig, ServerInfo } from '../types/configs/serverConfig.types';

export function readConfigFile<T>(configName: ConfigName): T {
  const configPath = CONFIG_PATHS[configName];
  const filePath = path.resolve(__dirname, '../..', 'src', configPath);

  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Error reading config file ${configPath}:`, error);
    throw error;
  }
}

export function getServerConfig(serverId: string): ServerInfo | undefined {
  const serverConfigs = readConfigFile<ServerConfig>(ConfigName.SERVER_CONFIG);
  return serverConfigs[serverId];
}
