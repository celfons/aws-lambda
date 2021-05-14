import { SubscriptionService } from '@/service/subscription-service'
import { ISubscriptionRepository } from '@/data/repository/subscription-repository'
import { SubscriptionModel } from '@/domain/models/subscription-model'

interface SubTypes {
  sut: SubscriptionService
}

const makeSut = (): SubTypes => {
  const addSubscriptionRepository = makeAddSubscriptionRepository()
  const sut = new SubscriptionService(addSubscriptionRepository)
  return {
    sut
  }
}

const makeAddSubscriptionRepository = (): ISubscriptionRepository => {
  class SubscriptionRepositoryStub implements ISubscriptionRepository {
    async create (subscriptionData: SubscriptionModel): Promise<SubscriptionModel> {
      const fakeSubscription = {
        id: '1',
        customerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        offerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        startDate: '2021-05-02',
        duration: '30',
        period: 'DAYS'
      }
      return await new Promise(resolve => resolve(fakeSubscription))
    }

    async get (): Promise<SubscriptionModel[]> {
      const fakeSubscription = [{
        id: '1',
        customerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        offerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        startDate: '2021-05-02',
        duration: '30',
        period: 'DAYS'
      }]
      return await new Promise(resolve => resolve(fakeSubscription))
    }
  }
  return new SubscriptionRepositoryStub()
}

describe('DbAddSubscription Usecase ', () => {
  test('Should call SubscriptionRepository to add subscription', async () => {
    const { sut } = makeSut()
    const subscriptionData = {
      customerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
      offerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
      startDate: '2021-05-02',
      duration: '30',
      period: 'DAYS'
    }
    const subscription = await sut.create(subscriptionData)
    expect(subscription).toEqual({
      id: '1',
      customerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
      offerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
      startDate: '2021-05-02',
      duration: '30',
      period: 'DAYS'
    })
  })
  test('Should call SubscriptionRepository to get subscriptions', async () => {
    const { sut } = makeSut()
    const subscription = await sut.get()
    expect(subscription).toEqual([{
      id: '1',
      customerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
      offerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
      startDate: '2021-05-02',
      duration: '30',
      period: 'DAYS'
    }])
  })
})