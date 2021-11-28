import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Put,
  Query,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { WriteCoilsCommand } from './commands/modbus-write-colis-command-handler';
import { WriteHoldingRegisterCommand } from './commands/modbus-write-holding-registers-command-handler';
import { ReadCoilsQuery } from './queries/modbus-read-coils-query-handler';
import { ReadHoldingRegistersQuery } from './queries/modbus-read-holding-registers-query-handler';

@Controller()
export class AppController {
  constructor(
    private readonly _config: ConfigService,
    private readonly _queryBus: QueryBus,
    private readonly _commandBus: CommandBus,
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
    @Query('length', new DefaultValuePipe(1), ParseIntPipe) length: number,
  ): Promise<boolean> {
    return await this._queryBus.execute(new ReadCoilsQuery(
      deviceId,
      modbusId,
      coil,
      length,
    ));
  }

  @Put('devices/serial/:deviceId/:modbusId/coils/:coil')
  async setCoil(
    @Param('deviceId') deviceId: string,
    @Param('modbusId') modbusId: number,
    @Param('coil') coil: number,
    @Body(ParseArrayPipe) data: boolean[],
  ): Promise<Array<number>> {
    return await this._commandBus.execute(new WriteCoilsCommand(deviceId, modbusId, coil, data));
  }

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
      length,
    ));
  }

  @Put('devices/serial/:deviceId/:modbusId/holdingRegister/:register')
  async setHoldingRegister(
    @Param('deviceId') deviceId: string,
    @Param('modbusId') modbusId: number,
    @Param('register') register: number,
    @Body(ParseArrayPipe) data: number[],
  ): Promise<Array<number>> {
    return await this._commandBus.execute(new WriteHoldingRegisterCommand(deviceId, modbusId, register, data));
  }
}
