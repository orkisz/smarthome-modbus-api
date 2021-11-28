export class Command<T> {
  constructor(
    public deviceId: string,
    public modbusId: number,
    public address: number,
    public data: Array<T>
  ) {
  }
}
