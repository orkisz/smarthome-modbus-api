import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ModbusProxy } from '../modbus-proxy.service';
import { Command } from './command';

export class WriteCoilsCommand extends Command<boolean> {
}

@CommandHandler(WriteCoilsCommand)
export class ModbusWriteCoilsCommandHandler
  implements ICommandHandler<WriteCoilsCommand> {
  constructor(private readonly _modbusProxy: ModbusProxy) {
  }

  async execute(command: WriteCoilsCommand): Promise<void> {
    const modbus = await this._modbusProxy.getModbusSerial(command.deviceId);
    await modbus.writeCoils(command.modbusId, command.address, command.data);
  }
}
