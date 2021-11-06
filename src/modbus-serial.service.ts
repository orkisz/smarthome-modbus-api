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

  public async readCoil(id: number, address: number): Promise<boolean>;
  public async readCoil(
    id: number,
    address: number,
    length: number,
  ): Promise<Array<boolean>>;
  public async readCoil(
    id: number,
    address: number,
    length: number = 1,
  ): Promise<boolean | Array<boolean>> {
    if (length < 1) {
      throw new Error('Length must be greater than 0');
    }
    this._client.setID(id);
    const result = await this._client.readCoils(address, length);
    if (length === 1) {
      return result.data[0];
    }
    return result.data;
  }

  public async readHoldingRegister(id: number, address: number): Promise<number>;
  public async readHoldingRegister(id: number, address: number, length: number): Promise<number>;
  public async readHoldingRegister(id: number, address: number, bcd: boolean): Promise<number>;
  public async readHoldingRegister(
    id: number,
    address: number,
    length: number,
    bcd: boolean,
  ): Promise<Array<number>>;
  public async readHoldingRegister(
    id: number,
    address: number,
    lengthOrBcd?: number | boolean,
    bcd?: boolean,
  ): Promise<number | Array<number>> {
    let length = 1;
    if (typeof lengthOrBcd === 'number') {
      length = lengthOrBcd;
    } else if (typeof lengthOrBcd === 'boolean') {
      bcd = lengthOrBcd;
    }
    if (length < 1) {
      throw new Error('Length must be greater than 0');
    }
    this._client.setID(id);
    const result = await this._client.readHoldingRegisters(address, length);
    const bcd2dec = (bcd: number) => parseInt(bcd.toString(16), 10);
    if (length === 1) {
      if (bcd) {
        return bcd2dec(result.data[0]);
      }
      return result.data[0];
    }
    if (bcd) {
      return result.data.map(d => bcd2dec(d));
    } else {
      return result.data;
    }
  }
}
