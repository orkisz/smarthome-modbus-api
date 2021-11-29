import { DynamicModule, Module } from '@nestjs/common';
import { Configuration, SerialDeviceConfiguration, TCPDeviceConfiguration } from './config/configuration';
import { ModbusProxy } from './modbus-proxy.service';
import { ModbusService } from './modbus.service';

@Module({})
export class ModbusModule {
  static forRoot(config: Configuration): DynamicModule {
    const dynamicProviders =
      [
        ...config.serialDevices?.map((serialConfig: SerialDeviceConfiguration) => {
          return {
            provide: `serial-${serialConfig.id}`,
            useFactory: () => ModbusService.createSerial(serialConfig),
          };
        }) || [],
        ...config.tcpDevices?.map((tcpConfig: TCPDeviceConfiguration) => {
          return {
            provide: `tcp-${tcpConfig.id}`,
            useFactory: () => ModbusService.createTCP({
              ip: tcpConfig.address,
              port: tcpConfig.port,
            }),
          };
        }) || [],
      ];
    return {
      module: ModbusModule,
      providers: [
        ...dynamicProviders,
        ModbusProxy,
      ],
      exports: [
        ...dynamicProviders,
        ModbusProxy,
      ],
    };
  }
}
