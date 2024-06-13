import {Component} from '@angular/core';
import {FormLayout} from "../../projects/auto-form-lib/src/lib/models/form-layout.model";
import {FormFieldType} from "../../projects/auto-form-lib/src/lib/enums/form-field-type.enum";
import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {FormFieldValidatorEnum} from "../../projects/auto-form-lib/src/lib/enums/form-field-validator.enum";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'auto-form';
  private myCustomValidatorFunction: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if(control.value === "test-error") {
      const errors = {myerror: true};
      control.setErrors(errors);
      return errors;
    }

    return null;
  }

  public form: FormLayout = {
    id: 1,
    fields: [
      {
        name: 'custom-error',
        type: FormFieldType.TEXT_INPUT,
        fieldWidth: '100%',
        order: 1,
        validators: [{
          name: FormFieldValidatorEnum.FUNCTION,
          function: this.myCustomValidatorFunction
        }],
        useMatError: true
      }
    ]
  }
  public mySubmittedValues(event: FormGroup): void {
    console.log(event);
    console.log(event.get('custom-error')?.errors);
  }
}
