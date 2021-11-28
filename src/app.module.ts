import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import { WriteHoldingRegistersCommandHandler } from './commands/modbus-write-holding-registers-command-handler';
import { configuration } from './config/configuration';
import { ModbusReadCoilsQueryHandler } from './queries/modbus-read-coils-query-handler';
import { ModbusReadHoldingRegistersQueryHandler } from './queries/modbus-read-holding-registers-query-handler';
import { ModbusModule } from './modbus.module';

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
    WriteHoldingRegistersCommandHandler
  ]
})
export class AppModule {}
