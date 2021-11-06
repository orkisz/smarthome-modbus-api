import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { join } from 'path';

export interface SerialDeviceConfiguration {
  path: string;
  baudRate: number;
  dataBits: number;
  stopBits: number;
  parity: 'none' | 'even' | 'odd';
  id: string;
}

export interface Configuration {
  serialDevices: SerialDeviceConfiguration[];
}

export const configuration = () =>
  yaml.load(
    readFileSync(join(__dirname, 'config.yaml'), 'utf-8'),
  ) as Configuration;
