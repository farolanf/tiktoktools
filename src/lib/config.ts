export interface Config {
  voiceNames: string[];
  sayVoiceName: string;
}

export interface PatchConfig {
  voiceNames?: string[];
  sayVoiceName?: string;
}

export const defaultConfig: Config = {
  voiceNames: ['Microsoft Gadis Online (Natural) - Indonesian (Indonesia)'],
  sayVoiceName: 'Microsoft Gadis Online (Natural) - Indonesian (Indonesia)',
};

export async function getConfig(): Promise<Config> {
  const result = await chrome.storage.local.get('config');
  return result.config || defaultConfig;
}

export async function updateConfig(newConfig: PatchConfig): Promise<void> {
  const config = await getConfig();
  await chrome.storage.local.set({ config: { ...config, ...newConfig } });
}
