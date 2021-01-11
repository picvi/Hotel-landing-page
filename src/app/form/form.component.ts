import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BookedRoomForm } from '../booked-room-form';
import { BookingService } from '../booking.service';
import { CustomValidators } from '../customValidators'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @ViewChild('containerForIns') private form: ElementRef;
  typeOfRoom: string;
  typeOfHouse: string;
  typesOfHouses = ['Loft', 'Shelter', 'Cabana'];
  typesOfRooms = ['Classic', 'Deluxe', 'Suite' ];
  saved = false;

  constructor(
    private renderer: Renderer2,
    private book: BookingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      
      this.typeOfHouse = params.TypeOfHouse ?? '';
      this.typeOfRoom = params.typeOfRoom ?? '' ;
    });
  }

  canDeactivate(): boolean | Observable<boolean>{
    if (!this.saved) {
      return confirm('Data will not be saved, are you sure you want to leave this page?')
    } else {
      return true;
    }
  }

  reactiveForm = new FormGroup({
    name: new FormControl('', CustomValidators.checkLength(4)),
    typeOfHouse: new FormControl('', Validators.required),
    typeOfRoom: new FormControl('', Validators.required),
    tel: new FormControl('+375', [
      CustomValidators.checkPhoneSpelling(),
      Validators.required,
    ]),
    comment: new FormControl('', CustomValidators.endsWithDot()),
    dateOfArrival: new FormControl('', [
      CustomValidators.dateInAdvanve(),
      Validators.required,
    ]),
    dateOfDepartment: new FormControl(''),
  });

  bookRoom() {
    const bookedRoomDTO = new BookedRoomForm(
      this.reactiveForm.controls.name.value,
      this.reactiveForm.controls.typeOfHouse.value,
      this.reactiveForm.controls.typeOfRoom.value,
      this.reactiveForm.controls.tel.value,
      this.reactiveForm.controls.comment.value,
      this.reactiveForm.controls.dateOfArrival.value,
      this.reactiveForm.controls.dateOfDepartment.value,
      this?.reactiveForm?.controls?.PhoneNumber2?.value
    );
    this.book.book(bookedRoomDTO);
    this.saved = true;
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
