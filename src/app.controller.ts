import { Controller, Get, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModbusSerialServiceResolver } from './modbus-serial-service-resolver.service';

@Controller()
export class AppController {
  constructor(
    private readonly _config: ConfigService,
    private readonly _serialResolver: ModbusSerialServiceResolver,
  ) {
  }

  @Get('devices/serial')
  getSerialDevices(): string {
    return this._config.get('serialDevices');
  }

  @Get('devices/serial/:deviceId/:modbusId/coils/:coil')
  async getCoil(
    @Param('deviceId') deviceId: string,
    @Param('modbusId') modbusId: number,
    @Param('coil') coil: number,
  ): Promise<boolean> {
    const serialService = await this._serialResolver
      .getModbusSerialService(deviceId);
    return await serialService
      .readCoil(modbusId, coil);
  }
}
