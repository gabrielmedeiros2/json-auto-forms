import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormLayout} from "../../models/form-layout.model";
import {ValidationText} from "../../models/validation-text.model";
import {AutoFormLibService} from "../../services/auto-form-lib.service";

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

  @Output('submitForm')
  public getForm: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  public form: FormGroup;

  constructor(private fb: FormBuilder, protected service: AutoFormLibService) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.addFormFields();
  }

  public submit(): void {
    this.getForm.emit(this.form);
  }

  private addFormFields(): void {
    for (const field of this.formLayout.fields) {
      this.form.addControl(field.name, this.service.createControl(field?.validators));
    }
  }
}
