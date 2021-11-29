import ModbusRTU from 'modbus-serial';

export interface SerialPortOptions {
  path: string;
  baudRate?: number;
  dataBits?: number;
  stopBits?: number;
  parity?: 'none' | 'even' | 'odd';
}

export interface TCPOptions {
  ip: string;
  port?: number;
}

export class ModbusService {
  private _client: ModbusRTU;

  public static async createSerial(
    serialOptions: SerialPortOptions,
  ): Promise<ModbusService> {
    const service = new ModbusService();
    const { path, ...opts } = serialOptions;
    await service._client.connectRTUBuffered(path, opts);
    return service;
  }

  public static async createTCP(
    tcpOptions: TCPOptions,
  ): Promise<ModbusService> {
    const service = new ModbusService();
    const { ip, ...opts } = tcpOptions;
    await service._client.connectTcpRTUBuffered(ip, opts);
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
    return (await this._client.readCoils(address, length)).data.slice(0, length);
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

  public async writeHoldingRegisters(
    id: number,
    address: number,
    data: number[]
  ): Promise<any> {
    this._client.setID(id);
    await this._client.writeRegisters(address, data);
  }

  public async writeCoils(
    id: number,
    address: number,
    data: boolean[]
  ): Promise<any> {
    this._client.setID(id);
    await this._client.writeCoils(address, data);
  }
}
