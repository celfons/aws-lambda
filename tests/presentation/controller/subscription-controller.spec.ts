import { SubscriptionController } from '@/presentation/controller/subscription-controller'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { ServerError } from '@/presentation/errors/server-error'
import { ISubscription } from '@/domain/subscription'
import { SubscriptionModel } from '@/domain/models/subscription-model'

interface SutTypes {
  sut: SubscriptionController
  subscriptionStub: ISubscription
}

const makeAddSubscription = (): ISubscription => {
  class SubscriptionStub implements ISubscription {
    async create (subscription: SubscriptionModel): Promise<SubscriptionModel> {
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
  return new SubscriptionStub()
}

const makeSut = (): SutTypes => {
  const subscriptionStub = makeAddSubscription()
  const sut = new SubscriptionController(subscriptionStub)
  return {
    sut,
    subscriptionStub
  }
}

describe('Subscription Controller', () => {
  test('Should return 400 if no customerId is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        offerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        startDate: '2021-05-02',
        duration: '30',
        period: 'DAYS'
      }
    }
    const httpResponse = await sut.create(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('customerId'))
  })
  test('Should return 400 if no offerId is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        customerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        startDate: '2021-05-02',
        duration: '30',
        period: 'DAYS'
      }
    }
    const httpResponse = await sut.create(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('offerId'))
  })
  test('Should return 400 if no startDate is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        customerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        offerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        duration: '30',
        period: 'DAYS'
      }
    }
    const httpResponse = await sut.create(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('startDate'))
  })
  test('Should return 400 if no duration is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        customerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        offerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        startDate: '2021-05-02',
        period: 'DAYS'
      }
    }
    const httpResponse = await sut.create(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('duration'))
  })
  test('Should return 400 if no period is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        customerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        offerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        startDate: '2021-05-02',
        duration: '30'
      }
    }
    const httpResponse = await sut.create(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('period'))
  })
  test('Should return 500 if AddSubscription throws', async () => {
    const { sut, subscriptionStub } = makeSut()
    jest.spyOn(subscriptionStub, 'create').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {
      body: {
        customerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        offerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        startDate: '2021-05-02',
        duration: '30',
        period: 'DAYS'
      }
    }
    const httpResponse = await sut.create(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
  test('Should return 200 if a valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        customerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        offerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        startDate: '2021-05-02',
        duration: '30',
        period: 'DAYS'
      }
    }
    const httpResponse = await sut.create(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: '1',
      customerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
      offerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
      startDate: '2021-05-02',
      duration: '30',
      period: 'DAYS'
    })
  })
  test('Should return 404 if get a subscriptions', async () => {
    const { sut, subscriptionStub } = makeSut()
    jest.spyOn(subscriptionStub, 'get').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => resolve([]))
    })
    const httpResponse = await sut.get()
    expect(httpResponse.statusCode).toBe(404)
    expect(httpResponse.body).toEqual(new MissingParamError('Subscriptions not found'))
  })
  test('Should return 500 if get a subscriptions', async () => {
    const { sut, subscriptionStub } = makeSut()
    jest.spyOn(subscriptionStub, 'get').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new ServerError()))
    })
    const httpResponse = await sut.get()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
  test('Should return 200 if get a subscriptions', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.get()
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual([
      {
        id: '1',
        customerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        offerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        startDate: '2021-05-02',
        duration: '30',
        period: 'DAYS'
      }
    ])
  })
})
