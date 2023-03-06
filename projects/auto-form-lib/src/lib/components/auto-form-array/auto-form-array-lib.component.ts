import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {FormLayout} from "../../models/form-layout.model";
import {ValidationText} from "../../models/validation-text.model";
import {AutoFormLibService} from "../../services/auto-form-lib.service";
import {cloneDeep} from "lodash-es";

@Component({
  selector: 'auto-form-array',
  templateUrl: 'auto-form-array-lib.component.html',
  styleUrls: ['auto-form-array-lib.component.scss']
})
export class AutoFormArrayLibComponent implements OnInit {
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

  @Input("addItem")
  public addItem: EventEmitter<any>;

  @Output('submitForm')
  public getForm: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  public form: FormGroup;
  public childForm: FormGroup;

  constructor(private fb: FormBuilder, protected service: AutoFormLibService) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      array: this.fb.array([])
    });
    this.childForm = this.fb.group({});
    this.addFormFields();

    this.addItem.subscribe(() => {
      this.addToMainForm();
    });
  }

  public get formArray(): FormArray {
    return this.form.get('array') as FormArray;
  }

  public submit(): void {
    this.getForm.emit(this.form);
  }

  public addToMainForm(): void {
    this.formArray.push(cloneDeep(this.childForm));
  }

  private addFormFields(): void {
    for (const field of this.formLayout.fields) {
      this.childForm.addControl(field.name, this.service.createControl(field?.validators));
    }
  }
}
