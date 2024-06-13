import {ValidatorFn} from "@angular/forms";

export interface FormFieldValidator {
  name: any;
  param?: string;
  function?: ValidatorFn
}
