import { Injectable } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { ModbusSerialService } from './modbus-serial.service';

@Injectable()
export class ModbusProxy {
  constructor(private readonly _moduleRef: ModuleRef) {
  }

  async getModbusSerial(serialDeviceId: string): Promise<ModbusSerialService> {
    const contextId = ContextIdFactory.create();
    return await this._moduleRef.resolve(`serial-${serialDeviceId}`, contextId, { strict: false });
  }
}
