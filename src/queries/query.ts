export class Query {
  constructor(
    public deviceId: string,
    public modbusId: number,
    public address: number,
    public length: number,
  ) {
  }
}
