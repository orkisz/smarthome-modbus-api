import { DynamicModule, Module } from '@nestjs/common';
import { Configuration, SerialDeviceConfiguration } from './config/configuration';
import { ModbusSerialService } from './modbus-serial.service';

@Module({})
export class ModbusModule {
  static register(config: Configuration): DynamicModule {
    const dynamicProviders = config.serialDevices.map((serialConfig: SerialDeviceConfiguration) => {
      return {
        provide: `serial-${serialConfig.id}`,
        useFactory: () => ModbusSerialService.create(serialConfig),
      };
    });
    return {
      module: ModbusModule,
      providers: [
        ...dynamicProviders,
      ],
      exports: [
        ...dynamicProviders
      ]
    };
  }
}
