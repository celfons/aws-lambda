export interface ISubscriptionQueue {
  send: (message: any) => Promise<void>
}
