export interface IQueue {
  send: (message: any, topic: string) => Promise<void>
}
