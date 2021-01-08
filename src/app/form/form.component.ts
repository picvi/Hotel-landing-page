import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ValidatorsService } from '../validators.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @ViewChild('containerForIns') private form: ElementRef;
  list = [];
  current: string;

  constructor(
    private renderer: Renderer2,
    private validators: ValidatorsService
  ) {}

  reactiveForm = new FormGroup({
    name: new FormControl(''),
    code: new FormControl(''),
    codeRepeat: new FormControl(''),
    tel: new FormControl('+375', [this.validators.checkPhoneSpelling()]),
    codeOperator: new FormControl(),
    comment: new FormControl('', this.validators.endsWithDot()),
    dateArrival: new FormControl('', this.validators.dateInAdvanve()),
  });

  onSubmit(form: FormGroup) {
    console.log(form);
  }

  deleteControl(controlName: string): void {
    this.reactiveForm?.removeControl(controlName);
  }

  addControl(controlName, type) {
    this.reactiveForm?.addControl(controlName, new FormControl(''));
    const div = this.renderer.createElement('div');

    const input = this.renderer.createElement('input');
    this.renderer.setProperty(input, 'type', `${type}`);
    this.renderer.setAttribute(input, 'formControlName', `${controlName}`);

    const labelText = this.renderer.createText(`${controlName}`);
    const label = this.renderer.createElement('label');

    this.renderer.appendChild(this.form.nativeElement, div);
    this.renderer.appendChild(label, labelText);
    this.renderer.appendChild(div, label);
    this.renderer.appendChild(div, input);
  }

  checkCodeValidator(
    control: AbstractControl
  ): { [s: string]: boolean } | null {
    if (control.value) {
      return null;
    } else {
      return { userValidator: true };
    }
  }
}
