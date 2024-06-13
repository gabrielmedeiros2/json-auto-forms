<h1 align="center">Json Auto Forms</h1>

<p style="text-align: center">
  Json Auto Forms is a library to quickly build forms from json objects.
</p>


[![npm](https://img.shields.io/npm/v/@gabrielmedeiros2/json-auto-forms.svg)](https://www.npmjs.com/package/@gabrielmedeiros2/json-auto-forms)
[![npm downloads](https://img.shields.io/npm/dt/@gabrielmedeiros2/json-auto-forms.svg)](https://npmjs.org/@gabrielmedeiros2/json-auto-forms)

[![GitHub contributors](https://img.shields.io/github/contributors/gabrielmedeiros2/json-auto-forms.svg?style=flat)](https://github.com/gabrielmedeiros2/json-auto-forms)
[![GitHub stars](https://img.shields.io/github/stars/gabrielmedeiros2/json-auto-forms.svg?label=GitHub%20Stars&style=flat)](https://github.com/gabrielmedeiros2/json-auto-forms)

## Installing

```bash
$ npm install --save json-auto-forms
```

## Quickstart
Import **json-auto-forms** module

```typescript
@NgModule({
    declarations: [
        ...
    ],
    imports: [
        ...
        AutoFormLibModule,
    ]
    ...
})
...
````

## Usage
On your component, set the json object corresponding to the form you want to be generated and create a function to receive the submitted form.

```typescript
import {FormLayout} from "./form-layout.model";

@Component({
  selector: 'my-feature',
  templateUrl: './my-feature.component.html',
  styleUrls: ['./my-feature.component.css'],
  standalone: true
})
export class MyFeatureComponent {
  myForm: FormLayout = {
    id: 1,
    fields: [
      {
        name: 'Text Field',
        type: FormFieldType.TEXT_INPUT,
        fieldWidth: '100%',
        order: 1,
        useMatError: true,
        validators: [
          {
            name: FormFieldValidatorEnum.REQUIRED
          }
        ]
      },
      {
        name: 'Number Field',
        type: FormFieldType.NUMBER_INPUT,
        fieldWidth: '49%',
        order: 2,
        useMatError: true
      },
      {
        name: 'Date Field',
        type: FormFieldType.DATE_INPUT,
        fieldWidth: '49%',
        order: 3,
        useMatError: true
      },
    ]
  }
  
  public mySubmittedValues(form: FormGroup): void {
      console.log(form.getRawValue());
  }
}
````

In the HTML, insert the library tag making references to the previous steps configurations

```html
<auto-form [formLayout]="myForm" (submitForm)="mySubmittedValues($event)"></auto-form>
````

For form array usage:

TS
```typescript
export class MyFeatureComponent {
  myAddFormEventEmmiter: EventEmmiter<any> = new EventEmmiter<any>();
  /* Your code here */
}
````

HTML
```html
<button click="myAddFormEventEmmiter.emit()">Add Form</button>
<auto-form-array [formLayout]="myForm" [addItem]="myAddFormEventEmmiter" (submitForm)="mySubmittedValues($event)"></auto-form-array>
````

## Form options


### Input types
```typescript
  FormFieldType.TEXT_INPUT;
  FormFieldType.FILE_INPUT;
  FormFieldType.NUMBER_INPUT;
  FormFieldType.DATE_INPUT;
  FormFieldType.DATE_TIME_INPUT;
  FormFieldType.RADIO_INPUT;
  FormFieldType.PASSWORD_INPUT;
  FormFieldType.TEXT_AREA;
  FormFieldType.SELECTBOX;
  FormFieldType.CHECKBOX;
````

### Validator types
```typescript
  FormFieldValidatorEnum.REQUIRED;
  FormFieldValidatorEnum.EMAIL;
  FormFieldValidatorEnum.MAX_LENGTH;
  FormFieldValidatorEnum.MIN_LENGTH;
  FormFieldValidatorEnum.FUNCTION;
````

### Custom Validators
On this version, now it's possible to create your own custom validators. To archieve that, use the new validator type "function".

```typescript
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

// Create your custom validator
const myCustomValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if(control.value === 'invalid') {
        const error = {customValidator: true};
        control.setErrors(error);
        return error;
    }
    
    return null;
}

const form = {
  /* Form configurations */
  fields: [
    {
      name: 'Text Field',
      type: FormFieldType.TEXT_INPUT,
      fieldWidth: '100%',
      order: 1,
      useMatError: true,
      validators: [
        {
          name: FormFieldValidatorEnum.FUNCTION,
          function: myCustomValidator
        }
      ]
    },
    /* Other fields */
  ]
}
```

### Custom validator messages

TS
```typescript
export class MyFeatureComponent {
  public myCustomValidatorMessages: ValidationText = {
    required: 'Field is required',
    email: 'Field must be an email',
    minLength: 'Field must contain at least x characters',
    maxLength: 'Field must not contain more than x characters',
    function: 'Field validation failed'
  };
  /* Your component code here */
}
````

HTML
```html
<auto-form [formLayout]="myForm" [validationTextList]="myCustomValidatorMessages" (submitForm)="mySubmittedValues($event)"></auto-form>
````

### Custom submit button styles

CSS
```css
.myCustomStyle {
  backgroud-color: blue;
  color: white;
  border-radius: 12px;
}
````

TS
```typescript
export class MyFeatureComponent {
  myCustomStyleString: string = 'myCustomStyle';
  ...
}
````

HTML
```html
<auto-form [formLayout]="myForm" [submitStyles]="myCustomStyleString" (submitForm)="mySubmittedValues($event)"></auto-form>
````

### Add more action buttons
HTML
```html
<auto-form [formLayout]="myForm" [submitStyles]="myCustomStyleString" (submitForm)="mySubmittedValues($event)">
  <button type="button" (click)="goBack()">Go back to previous page</button>
</auto-form>
````
