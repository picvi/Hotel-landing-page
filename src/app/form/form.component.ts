import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  AbstractControl,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { BookedRoomForm } from '../booked-room-form';
import { BookingService } from '../booking.service';
import { ValidatorsService } from '../validators.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @ViewChild('containerForIns') private form: ElementRef;
  list = [];
  current: string;
  today = new Date(Date.now());

  constructor(
    private renderer: Renderer2,
    private validators: ValidatorsService,
    private book: BookingService
  ) {}

  reactiveForm = new FormGroup({
    name: new FormControl(''),
    typeOfRoom: new FormControl('', Validators.required),
    tel: new FormControl('+375', [
      this.validators.checkPhoneSpelling(),
      Validators.required,
    ]),
    comment: new FormControl('', this.validators.endsWithDot()),
    dateOfArrival: new FormControl('', [
      this.validators.dateInAdvanve(),
      Validators.required,
    ]),
    dateOfDepartment: new FormControl(''),
  });

  onSubmit(form: FormGroup) {
    const bookedRoomDTO = new BookedRoomForm(
      this.reactiveForm.controls.name.value,
      this.reactiveForm.controls.typeOfRoom.value,
      this.reactiveForm.controls.tel.value,
      this.reactiveForm.controls.comment.value,
      this.reactiveForm.controls.dateOfArrival.value,
      this.reactiveForm.controls.dateOfDepartment.value,
      this?.reactiveForm?.controls?.PhoneNumber2?.value
    );
      this.book.book(bookedRoomDTO);
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
}
