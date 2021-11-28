import { IQueryHandler } from '@nestjs/cqrs';
import { ModbusProxy } from '../modbus-proxy.service';

interface ReadCoilsQuery {
  deviceId: string;
  modbusId: number;
  address: number;
  length: number;
}

export class ModbusReadCoilsQueryHandler
  implements IQueryHandler<ReadCoilsQuery> {
  constructor(private readonly _modbusProxy: ModbusProxy) {
  }

  async execute(query: ReadCoilsQuery): Promise<Array<boolean>> {
    const modbus = await this._modbusProxy.getModbusSerial(query.deviceId);
    return await modbus.readCoils(query.modbusId, query.address, query.length);
  }
}
