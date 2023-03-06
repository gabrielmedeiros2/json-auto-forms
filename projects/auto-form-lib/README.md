<h1 align="center">Json Auto Forms</h1>

<p style="text-align: center">
  Json Auto Forms is a library to quickly build forms from json objects.
</p>


[![npm](https://img.shields.io/npm/v/json-auto-forms.svg)](https://www.npmjs.com/package/json-auto-forms)
[![npm downloads](https://img.shields.io/npm/dt/json-auto-forms.svg)](https://npmjs.org/json-auto-forms)
[![npm](https://img.shields.io/npm/dm/json-auto-forms.svg)](https://www.npmjs.com/package/json-auto-forms)

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
      },
      {
        name: 'Date Field',
        type: FormFieldType.DATE_INPUT,
        fieldWidth: '49%',
        order: 3,
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
