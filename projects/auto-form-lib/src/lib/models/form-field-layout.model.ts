import {FormFieldType} from "../enums/form-field-type.enum";
import {FormFieldValidator} from "./form-field-validator.model";
import {FormDataList} from "./form-data-list.model";


export interface FormFieldLayout {
  name: string,
  type: FormFieldType,
  fieldWidth: string,
  order: number,
  id?: string,
  validators?: FormFieldValidator[],
  dataList?: FormDataList[],
}
