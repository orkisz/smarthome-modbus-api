import { Injectable } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { ModbusSerialService } from './modbus-serial.service';

@Injectable()
export abstract class ModbusReadService<T> {
  protected constructor(private readonly _moduleRef: ModuleRef) {
  }

  async read(serialDeviceId: string, modbusId: number, address: number, length: number = 1): Promise<Array<T>> {
    const contextId = ContextIdFactory.create();
    const modbusSerial: ModbusSerialService = await this._moduleRef.resolve(`serial-${serialDeviceId}`, contextId, { strict: false });
    return await this._readData(modbusSerial, modbusId, address, length);
  }

  protected abstract _readData(modbusSerial: ModbusSerialService, modbusId: number, address: number, length: number): Promise<Array<T>>;
}
