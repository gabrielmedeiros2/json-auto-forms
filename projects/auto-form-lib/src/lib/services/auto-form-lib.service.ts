import {Injectable} from '@angular/core';
import {FormFieldValidator} from "../models/form-field-validator.model";
import {AbstractControl, FormControl, Validators} from "@angular/forms";
import {FormFieldValidatorEnum} from "../enums/form-field-validator.enum";
import {ValidationText} from "../models/validation-text.model";
import {FormFieldLayout} from "../models/form-field-layout.model";
import {FormFieldType} from "../enums/form-field-type.enum";

@Injectable({
  providedIn: 'root'
})
export class AutoFormLibService {

  constructor() { }

  public isRequiredField(field: FormFieldLayout): boolean {
    const validator = field.validators?.find(val => val.name === FormFieldValidatorEnum.REQUIRED);
    return (validator !== null && validator !== undefined);
  }

  public isTextField(field: FormFieldLayout): boolean {
    return field.type === FormFieldType.TEXT_INPUT;
  }

  public isDateField(field: FormFieldLayout): boolean {
    return field.type === FormFieldType.DATE_INPUT;
  }

  public isNumberField(field: FormFieldLayout): boolean {
    return field.type === FormFieldType.NUMBER_INPUT;
  }

  public isSelectboxField(field: FormFieldLayout): boolean {
    return field.type === FormFieldType.SELECTBOX;
  }

  public isPasswordField(field: FormFieldLayout): boolean {
    return field.type === FormFieldType.PASSWORD_INPUT;
  }

  public isDateTimeField(field: FormFieldLayout): boolean {
    return field.type === FormFieldType.DATE_TIME_INPUT;
  }

  public isCheckboxField(field: FormFieldLayout): boolean {
    return field.type === FormFieldType.CHECKBOX;
  }

  public isTextareaField(field: FormFieldLayout): boolean {
    return field.type === FormFieldType.TEXT_AREA;
  }

  public isFileField(field: FormFieldLayout): boolean {
    return field.type === FormFieldType.FILE_INPUT;
  }

  public isRadioField(field: FormFieldLayout): boolean {
    return field.type === FormFieldType.RADIO_INPUT;
  }

  public getErrorByValidation(validation: FormFieldValidator, control: AbstractControl | null): boolean {
    switch (validation?.name) {
      case FormFieldValidatorEnum.REQUIRED:
        return control !== null && control.hasError('required');
      case FormFieldValidatorEnum.MIN_LENGTH:
        return control !== null && control.hasError('minlength');
      case FormFieldValidatorEnum.MAX_LENGTH:
        return control !== null && control.hasError('maxlength');
      case FormFieldValidatorEnum.EMAIL:
        return control !== null && control.hasError('email');
      case FormFieldValidatorEnum.FUNCTION:
        return control !== null && control.invalid;
      default:
        return false;
    }
  }

  public getErrorTextByValidation(validation: FormFieldValidator, validationTextList: ValidationText): string {
    switch (validation?.name) {
      case FormFieldValidatorEnum.REQUIRED:
        return validationTextList.required;
      case FormFieldValidatorEnum.MIN_LENGTH:
        return validationTextList.minLength;
      case FormFieldValidatorEnum.MAX_LENGTH:
        return validationTextList.maxLength;
      case FormFieldValidatorEnum.EMAIL:
        return validationTextList.minLength;
      case FormFieldValidatorEnum.FUNCTION:
        return validationTextList.function;
      default:
        return '';
    }
  }

  public setId(id: any, idx: number) {
    if(!id) {
      id = 'field-'+idx;
    }

    return id;
  }

  createControl(validators: FormFieldValidator[] | undefined): FormControl {
    const validatorsList: any[] = [];
    if(validators) {
      for (const validator of validators) {
        switch (validator.name) {
          case FormFieldValidatorEnum.REQUIRED:
            validatorsList.push(Validators.required);
            break;
          case FormFieldValidatorEnum.MAX_LENGTH:
            validatorsList.push(Validators.maxLength(parseInt(<string> validator?.param, 10)));
            break;
          case FormFieldValidatorEnum.MIN_LENGTH:
            validatorsList.push(Validators.minLength(parseInt(<string> validator?.param, 10)));
            break;
          case FormFieldValidatorEnum.EMAIL:
            validatorsList.push(Validators.email);
            break;
          case FormFieldValidatorEnum.FUNCTION:
            validatorsList.push(validator.function);
            break;
          default:
            break;
        }
      }
    }
    return new FormControl(null, validatorsList);
  }
}
