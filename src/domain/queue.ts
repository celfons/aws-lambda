export interface IQueue {
  send: (message: any) => Promise<void>
}
