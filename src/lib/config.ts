export interface Config {
  voiceNames: string[];
  sayVoiceName: string;
  volume: number;
  rate: number;
  pitch: number;
}

export interface PatchConfig {
  voiceNames?: string[];
  sayVoiceName?: string;
  volume?: number;
  rate?: number;
  pitch?: number;
}

export const defaultConfig: Config = {
  voiceNames: ['Microsoft Gadis Online (Natural) - Indonesian (Indonesia)'],
  sayVoiceName: 'Microsoft Gadis Online (Natural) - Indonesian (Indonesia)',
  volume: 1.0,
  rate: 1.0,
  pitch: 1.0,
};

export async function getConfig(): Promise<Config> {
  const result = await chrome.storage.local.get('config');
  return result.config || defaultConfig;
}

export async function updateConfig(newConfig: PatchConfig): Promise<void> {
  const config = await getConfig();
  await chrome.storage.local.set({ config: { ...config, ...newConfig } });
}
