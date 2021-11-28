import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import { ModbusWriteCoilsCommandHandler } from './commands/modbus-write-colis-command-handler';
import { ModbusWriteHoldingRegistersCommandHandler } from './commands/modbus-write-holding-registers-command-handler';
import { configuration } from './config/configuration';
import { ModbusModule } from './modbus.module';
import { ModbusReadCoilsQueryHandler } from './queries/modbus-read-coils-query-handler';
import { ModbusReadHoldingRegistersQueryHandler } from './queries/modbus-read-holding-registers-query-handler';

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ModbusModule.forRoot(configuration()),
  ],
  controllers: [AppController],
  providers: [
    ModbusReadCoilsQueryHandler,
    ModbusReadHoldingRegistersQueryHandler,
    ModbusWriteCoilsCommandHandler,
    ModbusWriteHoldingRegistersCommandHandler,
  ],
})
export class AppModule {
}
