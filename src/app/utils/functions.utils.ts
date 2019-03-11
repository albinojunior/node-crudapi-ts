import { NUMBER_TYPES } from '../common/Constraints';

export function isNumberType(type: any): boolean {
  return NUMBER_TYPES.filter(numberType => type instanceof numberType).length > 0;
}