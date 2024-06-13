import {Directive, EventEmitter, Injectable, Input, OnInit, Output} from "@angular/core";
import {FormLayout} from "../models/form-layout.model";
import {ValidationText} from "../models/validation-text.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AutoFormLibService} from "../services/auto-form-lib.service";

@Directive()
export abstract class BaseAutoForm implements OnInit {
  @Input('formLayout')
  public formLayout: FormLayout;

  @Input('submitStyles')
  public submitStyles?: string;

  @Input('validationTextList')
  public validationTextList: ValidationText = {
    required: 'Campo obrigatório',
    minLength: 'Mínimo de caracteres não atingido',
    maxLength: 'Máximo de caracteres excedido',
    email: 'Campo não é um email',
    function: 'Ocorreu um erro de validação no campo'
  };

  @Output('submitForm')
  public getForm: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  public form: FormGroup;

  constructor(protected fb: FormBuilder, protected service: AutoFormLibService) {

  }

  ngOnInit(): void {
    this.initComponent();
  }

  public submit(): void {
    this.getForm.emit(this.form);
  }

  protected initComponent(): void {
    this.form = this.fb.group({});
    this.addFormFields();
  }

  protected addFormFields(): void {
    for (const field of this.formLayout.fields) {
      this.form.addControl(field.name, this.service.createControl(field?.validators));
    }
  }
}
