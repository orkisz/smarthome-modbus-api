import { Injectable } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { ModbusService } from './modbus.service';

@Injectable()
export class ModbusProxy {
  constructor(private readonly _moduleRef: ModuleRef) {
  }

  async getModbus(deviceId: string): Promise<ModbusService> {
    const contextId = ContextIdFactory.create();
    return await this._moduleRef.resolve(deviceId, contextId, { strict: false });
  }
}
