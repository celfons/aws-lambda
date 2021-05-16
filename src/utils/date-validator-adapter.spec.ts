import { DateValidatorAdapter } from './date-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isDate (): boolean {
    return true
  }
}))

const makeSut = (): DateValidatorAdapter => {
  return new DateValidatorAdapter()
}

describe('DateValidator Adapter ', () => {
  test('Should returns false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isDate').mockReturnValueOnce(false)
    const isValid = sut.isValid('2021-05-04')
    expect(isValid).toBe(false)
  })
  test('Should returns true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('2021-05-04')
    expect(isValid).toBe(true)
  })
  test('Should call validator with correct date', () => {
    const sut = makeSut()
    const isDateSpy = jest.spyOn(validator, 'isDate')
    sut.isValid('2021-05-04')
    expect(isDateSpy).toHaveBeenCalledWith('2021-05-04')
  })
})
