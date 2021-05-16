import { SubscriptionController } from '@/presentation/controller/subscription-controller'
import { ServerError, InvalidParamError, MissingParamError } from '@/presentation/errors'
import { ISubscription } from '@/domain/subscription'
import { AddSubscriptionModel, SubscriptionModel } from '@/domain/models/subscription-model'
import { IDateValidator } from '@/presentation/controller/helpers/date-validator'

interface SutTypes {
  sut: SubscriptionController
  dateValidatorStub: IDateValidator
  subscriptionStub: ISubscription
}

const makeDateValidator = (): IDateValidator => {
  class DateValidatorStub implements IDateValidator {
    isValid (date: string): boolean {
      return true
    }
  }
  return new DateValidatorStub()
}

const makeAddSubscription = (): ISubscription => {
  class SubscriptionStub implements ISubscription {
    async create (subscription: AddSubscriptionModel): Promise<SubscriptionModel> {
      const fakeSubscription = {
        id: '1',
        customerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        offerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        startDate: '2021-05-02',
        duration: 30,
        period: 'DAYS',
        dueDate: '2021-06-02',
        active: true
      }
      return await new Promise(resolve => resolve(fakeSubscription))
    }

    async get (): Promise<SubscriptionModel[]> {
      const fakeSubscription = [{
        id: '1',
        customerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        offerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        startDate: '2021-05-02',
        duration: 30,
        period: 'DAYS',
        dueDate: '2021-06-02',
        active: true
      }]
      return await new Promise(resolve => resolve(fakeSubscription))
    }

    async update (subscription: SubscriptionModel): Promise<SubscriptionModel> {
      const fakeSubscription = {
        id: '1',
        customerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        offerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        startDate: '2021-05-02',
        duration: 30,
        period: 'DAYS',
        dueDate: '2021-06-02',
        active: false
      }
      return await new Promise(resolve => resolve(fakeSubscription))
    }

    async getSubscriptionByDueDate (): Promise<SubscriptionModel[]> {
      const fakeSubscription = [{
        id: '1',
        customerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        offerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        startDate: '2021-05-02',
        duration: 30,
        period: 'DAYS',
        dueDate: '2021-06-02',
        active: true
      }]
      return await new Promise(resolve => resolve(fakeSubscription))
    }
  }
  return new SubscriptionStub()
}

const makeSut = (): SutTypes => {
  const subscriptionStub = makeAddSubscription()
  const dateValidatorStub = makeDateValidator()
  const sut = new SubscriptionController(subscriptionStub, dateValidatorStub)
  return {
    sut,
    dateValidatorStub,
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
        duration: 30,
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
        duration: 30,
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
        duration: 30,
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
        duration: 30
      }
    }
    const httpResponse = await sut.create(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('period'))
  })
  test('Should return 400 if an invalid startDate is provided', async () => {
    const { sut, dateValidatorStub } = makeSut()
    jest.spyOn(dateValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        customerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        offerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        startDate: '2021-05-02',
        duration: 30,
        period: 'DAYS'
      }
    }
    const httpResponse = await sut.create(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('startDate'))
  })
  test('Should call DateValidator with correct date', async () => {
    const { sut, dateValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(dateValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        customerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        offerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        startDate: '2021-05-02',
        duration: 30,
        period: 'DAYS'
      }
    }
    await sut.create(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('2021-05-02')
  })
  test('Should return 500 if DateValidator throws', async () => {
    const { sut, dateValidatorStub } = makeSut()
    jest.spyOn(dateValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        customerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        offerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        startDate: '2021-05-02',
        duration: 30,
        period: 'DAYS'
      }
    }
    const httpResponse = await sut.create(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
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
        duration: 30,
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
        duration: 30,
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
      duration: 30,
      period: 'DAYS',
      dueDate: '2021-06-02',
      active: true
    })
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
        duration: 30,
        period: 'DAYS',
        dueDate: '2021-06-02',
        active: true
      }
    ])
  })
  test('Should return 500 if update a subscriptions', async () => {
    const { sut, subscriptionStub } = makeSut()
    const httpRequest = {
      body: {
        id: '1',
        customerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        offerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        startDate: '2021-05-02',
        duration: 30,
        period: 'DAYS',
        active: false
      }
    }
    jest.spyOn(subscriptionStub, 'update').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new ServerError()))
    })
    const httpResponse = await sut.update(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
  test('Should return 200 if update a subscriptions', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        id: '1',
        customerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        offerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        startDate: '2021-05-02',
        duration: 30,
        period: 'DAYS',
        active: false
      }
    }
    const httpResponse = await sut.update(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(
      {
        id: '1',
        customerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        offerId: '0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba',
        startDate: '2021-05-02',
        duration: 30,
        period: 'DAYS',
        dueDate: '2021-06-02',
        active: false
      }
    )
  })
})
