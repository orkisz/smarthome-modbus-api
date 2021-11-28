import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ModbusProxy } from '../modbus-proxy.service';
import { Query } from './query';

export class ReadHoldingRegistersQuery extends Query {
}

@QueryHandler(ReadHoldingRegistersQuery)
export class ModbusReadHoldingRegistersQueryHandler
  implements IQueryHandler<ReadHoldingRegistersQuery> {
  constructor(private readonly _modbusProxy: ModbusProxy) {
  }

  async execute(query: ReadHoldingRegistersQuery): Promise<Array<number>> {
    const modbus = await this._modbusProxy.getModbusSerial(query.deviceId);
    return await modbus.readHoldingRegisters(query.modbusId, query.address, query.length);
  }
}
