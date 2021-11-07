import { ModuleRef } from '@nestjs/core';
import { IQueryHandler } from '@nestjs/cqrs';
import { ModbusReadService } from './modbus-read-service';
import { ModbusSerialService } from './modbus-serial.service';

interface ReadCoilsQuery {
  deviceId: string;
  modbusId: number;
  address: number;
  length: number;
}

export class ModbusReadCoilsQueryHandler
  extends ModbusReadService<boolean>
  implements IQueryHandler<ReadCoilsQuery>
{
  constructor(moduleRef: ModuleRef) {
    super(moduleRef);
  }

  protected async _readData(modbusSerial: ModbusSerialService, modbusId: number, address: number, length: number): Promise<Array<boolean>> {
    return await modbusSerial.readCoils(modbusId, address, length);
  }

  async execute(query: ReadCoilsQuery): Promise<Array<boolean>> {
    return await this.read(query.deviceId, query.modbusId, query.address, query.length);
  }
}
