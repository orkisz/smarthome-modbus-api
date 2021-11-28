import { DynamicModule, Module } from '@nestjs/common';
import { Configuration, SerialDeviceConfiguration } from './config/configuration';
import { ModbusProxy } from './modbus-proxy.service';
import { ModbusSerialService } from './modbus-serial.service';

@Module({})
export class ModbusModule {
  static forRoot(config: Configuration): DynamicModule {
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
        ModbusProxy,
      ],
      exports: [
        ...dynamicProviders,
        ModbusProxy,
      ]
    };
  }
}
