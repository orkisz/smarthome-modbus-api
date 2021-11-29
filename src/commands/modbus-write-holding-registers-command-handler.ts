import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ModbusProxy } from '../modbus-proxy.service';
import { Command } from './command';

export class WriteHoldingRegisterCommand extends Command<number> {
}

@CommandHandler(WriteHoldingRegisterCommand)
export class ModbusWriteHoldingRegistersCommandHandler
  implements ICommandHandler<WriteHoldingRegisterCommand> {
  constructor(private readonly _modbusProxy: ModbusProxy) {
  }

  async execute(command: WriteHoldingRegisterCommand): Promise<void> {
    const modbus = await this._modbusProxy.getModbus(command.deviceId);
    await modbus.writeHoldingRegisters(command.modbusId, command.address, command.data);
  }
}
