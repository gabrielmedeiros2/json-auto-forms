import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormLayout} from "../../models/form-layout.model";
import {ValidationText} from "../../models/validation-text.model";
import {FormFieldValidator} from "../../models/form-field-validator.model";
import {FormFieldValidatorEnum} from "../../enums/form-field-validator.enum";
import {FormFieldLayout} from "../../models/form-field-layout.model";
import {FormFieldType} from "../../enums/form-field-type.enum";

@Component({
  selector: 'auto-form',
  templateUrl: 'auto-form-lib.component.html',
  styleUrls: ['auto-form-lib.component.scss']
})
export class AutoFormLibComponent implements OnInit {
  @Input('formLayout')
  public formLayout: FormLayout;

  @Input('submitStyles')
  public submitStyles?: string;

  @Input('validationTextList')
  public validationTextList: ValidationText = {
    required: 'Campo obrigatório',
    minLength: 'Mínimo de caracteres não atingido',
    maxLength: 'Máximo de caracteres excedido',
    email: 'Campo não é um email'
  };

  @Output('getForm')
  public getForm: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  public form: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.addFormFields();
  }

  public submit(): void {
    this.getForm.emit(this.form);
  }

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
      default:
        return false;
    }
  }

  public getErrorTextByValidation(validation: FormFieldValidator): string {
    switch (validation?.name) {
      case FormFieldValidatorEnum.REQUIRED:
        return this.validationTextList.required;
      case FormFieldValidatorEnum.MIN_LENGTH:
        return this.validationTextList.minLength;
      case FormFieldValidatorEnum.MAX_LENGTH:
        return this.validationTextList.maxLength;
      case FormFieldValidatorEnum.EMAIL:
        return this.validationTextList.minLength;
      default:
        return '';
    }
  }

  private addFormFields(): void {
    for (const field of this.formLayout.fields) {
      this.form.addControl(field.name, this.createControl(field?.validators));
    }
  }

  private createControl(validators: FormFieldValidator[] | undefined): FormControl {
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
          default:
            break;
        }
      }
    }
    return new FormControl(null, validatorsList);
  }
}
