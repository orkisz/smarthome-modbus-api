import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ModbusProxy } from '../modbus-proxy.service';
import { Query } from './query';

export class ReadCoilsQuery extends Query {
}

@QueryHandler(ReadCoilsQuery)
export class ModbusReadCoilsQueryHandler
  implements IQueryHandler<ReadCoilsQuery> {
  constructor(private readonly _modbusProxy: ModbusProxy) {
  }

  async execute(query: ReadCoilsQuery): Promise<Array<boolean>> {
    const modbus = await this._modbusProxy.getModbus(query.deviceId);
    return await modbus.readCoils(query.modbusId, query.address, query.length);
  }
}
