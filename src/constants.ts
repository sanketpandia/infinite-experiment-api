// src/constants.ts
export enum ConfigName {
  SERVER_CONFIG = 'serverconfigs',
}

export const CONFIG_PATHS: Record<ConfigName, string> = {
  [ConfigName.SERVER_CONFIG]: 'configs/serverconfigs.json',
};
export enum ServerPreference {
  Expert = 'Expert',
  Training = 'Training',
  Casual = 'Casual',
}
