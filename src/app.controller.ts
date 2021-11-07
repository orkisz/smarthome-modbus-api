import { Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryBus } from '@nestjs/cqrs';
import { ReadHoldingRegistersQuery } from './modbus-read-holding-registers-query-handler';

@Controller()
export class AppController {
  constructor(
    private readonly _config: ConfigService,
    private readonly _queryBus: QueryBus,
  ) {
  }

  @Get('devices/serial')
  getSerialDevices(): string {
    return this._config.get('serialDevices');
  }

  // @Get('devices/serial/:deviceId/:modbusId/coils/:coil')
  // async getCoil(
  //   @Param('deviceId') deviceId: string,
  //   @Param('modbusId') modbusId: number,
  //   @Param('coil') coil: number,
  // ): Promise<boolean> {
  //   const serialService = await this._serialResolver.getModbusSerialService(
  //     deviceId,
  //   );
  //   return await serialService.readCoil(modbusId, coil);
  // }

  @Get('devices/serial/:deviceId/:modbusId/holdingRegister/:register')
  async getHoldingRegister(
    @Param('deviceId') deviceId: string,
    @Param('modbusId') modbusId: number,
    @Param('register') register: number,
    @Query('length', new DefaultValuePipe(1), ParseIntPipe) length: number,
  ): Promise<Array<number>> {
    return await this._queryBus.execute(new ReadHoldingRegistersQuery(
      deviceId,
      modbusId,
      register,
      length
    ));
  }
}
