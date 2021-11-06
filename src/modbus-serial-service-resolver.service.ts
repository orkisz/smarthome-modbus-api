import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SerialDeviceConfiguration } from './config/configuration';
import { ModbusSerialService } from './modbus-serial.service';

@Injectable()
export class ModbusSerialServiceResolver {
  private readonly _services: Map<string, ModbusSerialService> = new Map();

  constructor(private readonly _config: ConfigService) {}

  async getModbusSerialService(deviceId: string): Promise<ModbusSerialService> {
    if (!this._services.has(deviceId)) {
      const portConfig = this._config
        .get<SerialDeviceConfiguration[]>('serialDevices')
        .find((dev) => dev.id === deviceId);
      this._services.set(
        deviceId,
        await ModbusSerialService.create(portConfig),
      );
    }
    return this._services.get(deviceId);
  }
}
