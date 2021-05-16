import { IDateValidator } from '../presentation/controller/helpers/date-validator'
import validator from 'validator'

export class DateValidatorAdapter implements IDateValidator {
  isValid (date: string): boolean {
    return validator.isDate(date)
  }
}
