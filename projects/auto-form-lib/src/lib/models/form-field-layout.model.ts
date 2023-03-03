import {FormFieldType} from "../enums/form-field-type.enum";
import {FormFieldValidator} from "auto-form-lib";

export interface FormFieldLayout {
  name: string,
  type: FormFieldType,
  fieldWidth: string,
  order: number,
  validators?: FormFieldValidator[]
}
