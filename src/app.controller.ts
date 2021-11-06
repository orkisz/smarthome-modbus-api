import { Controller, DefaultValuePipe, Get, Param, ParseBoolPipe, ParseIntPipe, Query } from '@nestjs/common';
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
    const serialService = await this._serialResolver.getModbusSerialService(
      deviceId,
    );
    return await serialService.readCoil(modbusId, coil);
  }

  @Get('devices/serial/:deviceId/:modbusId/holdingRegister/:register')
  async getHoldingRegister(
    @Param('deviceId') deviceId: string,
    @Param('modbusId') modbusId: number,
    @Param('register') register: number,
    @Query('length', new DefaultValuePipe(1), ParseIntPipe) length: number,
    @Query('bcd', new DefaultValuePipe(false), ParseBoolPipe) bcd: boolean,
  ): Promise<number | Array<number>> {
    const serialService = await this._serialResolver.getModbusSerialService(deviceId);
    return await serialService.readHoldingRegister(modbusId, register, length, bcd);
  }
}
