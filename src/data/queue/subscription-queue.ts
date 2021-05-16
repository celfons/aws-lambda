export interface ISubscriptionQueue {
  send: (message: any, topic: string) => Promise<void>
}
