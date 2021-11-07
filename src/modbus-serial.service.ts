import ModbusRTU from 'modbus-serial';

export interface SerialPortOptions {
  path: string;
  baudRate?: number;
  dataBits?: number;
  stopBits?: number;
  parity?: 'none' | 'even' | 'odd';
}

export class ModbusSerialService {
  private _client: ModbusRTU;

  public static async create(
    serialOptions: SerialPortOptions,
  ): Promise<ModbusSerialService> {
    const service = new ModbusSerialService();
    const { path, ...opts } = serialOptions;
    await service._client.connectRTUBuffered(path, opts);
    return service;
  }

  private constructor() {
    this._client = new ModbusRTU();
  }

  public async readCoils(
    id: number,
    address: number,
    length: number = 1,
  ): Promise<Array<boolean>> {
    this._client.setID(id);
    return (await this._client.readCoils(address, length)).data;
  }

  public async readHoldingRegisters(
    id: number,
    address: number,
    length: number,
  ): Promise<Array<number>> {
    this._client.setID(id);
    return (await this._client.readHoldingRegisters(address, length)).data;
  }

  public async readInputRegisters(
    id: number,
    address: number,
    length: number,
  ): Promise<Array<number>> {
    this._client.setID(id);
    return (await this._client.readInputRegisters(address, length)).data;
  }

  public async readDiscreteInputs(
    id: number,
    address: number,
    length: number,
  ): Promise<Array<boolean>> {
    this._client.setID(id);
    return (await this._client.readDiscreteInputs(address, length)).data;
  }
}
