import { DynamicModule, Module } from '@nestjs/common';
import { Configuration, SerialDeviceConfiguration } from './config/configuration';
import { ModbusReadCoilsQueryHandler } from './modbus-read-coils-query-handler';
import { ModbusSerialService } from './modbus-serial.service';

@Module({})
export class ModbusModule {
  static register(config: Configuration): DynamicModule {
    return {
      module: ModbusModule,
      providers: [
        ...config.serialDevices.map((serialConfig: SerialDeviceConfiguration) => {
            return {
              provide: `serial-${serialConfig.id}`,
              useFactory: () => ModbusSerialService.create(serialConfig),
            };
          },
          ModbusReadCoilsQueryHandler,
        ),
      ],
    };
  }
}
