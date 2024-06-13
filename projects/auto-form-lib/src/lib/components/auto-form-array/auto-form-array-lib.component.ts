import {Component, EventEmitter, Input} from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";
import {cloneDeep} from "lodash-es";
import {BaseAutoForm} from "../../core/base-auto-form";

@Component({
  selector: 'auto-form-array',
  templateUrl: 'auto-form-array-lib.component.html',
  styleUrls: ['../../styles/auto-form.scss']
})
export class AutoFormArrayLibComponent extends BaseAutoForm {
  @Input("addItem")
  public addItem: EventEmitter<any>;

  public childForm: FormGroup;

  public get formArray(): FormArray {
    return this.form.get('array') as FormArray;
  }

  public addToMainForm(): void {
    this.formArray.push(cloneDeep(this.childForm));
  }

  protected initComponent(): void {
    this.form = this.fb.group({
      array: this.fb.array([])
    });
    this.childForm = this.fb.group({});
    this.addFormFields();

    this.addItem.subscribe(() => {
      this.addToMainForm();
    });
  }
}
