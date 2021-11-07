import { ModuleRef } from '@nestjs/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ModbusReadService } from './modbus-read-service';
import { ModbusSerialService } from './modbus-serial.service';

export class ReadHoldingRegistersQuery {
  constructor(
    public deviceId: string,
    public modbusId: number,
    public address: number,
    public length: number,
  ) {
  }
}

@QueryHandler(ReadHoldingRegistersQuery)
export class ModbusReadHoldingRegistersQueryHandler
  extends ModbusReadService<number>
  implements IQueryHandler<ReadHoldingRegistersQuery> {
  constructor(moduleRef: ModuleRef) {
    super(moduleRef);
  }

  protected async _readData(modbusSerial: ModbusSerialService, modbusId: number, address: number, length: number): Promise<Array<number>> {
    return await modbusSerial.readHoldingRegisters(modbusId, address, length);
  }

  async execute(query: ReadHoldingRegistersQuery): Promise<Array<number>> {
    return await this.read(query.deviceId, query.modbusId, query.address, query.length);
  }
}
