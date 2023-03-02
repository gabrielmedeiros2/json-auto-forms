import {FormFieldType} from "../enums/form-field-type.enum";

export interface FormFieldLayout {
  name: string,
  type: FormFieldType,
  fieldWidth: string,
  order: number,
  validators?: any
}
