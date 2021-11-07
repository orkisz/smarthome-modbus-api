import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import { configuration } from './config/configuration';
import { ModbusReadCoilsQueryHandler } from './modbus-read-coils-query-handler';
import { ModbusReadHoldingRegistersQueryHandler } from './modbus-read-holding-registers-query-handler';
import { ModbusModule } from './modbus.module';

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ModbusModule.register(configuration()),
  ],
  controllers: [AppController],
  providers: [
    ModbusReadCoilsQueryHandler,
    ModbusReadHoldingRegistersQueryHandler,
  ]
})
export class AppModule {}
