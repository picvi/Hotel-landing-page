import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BookedRoomForm } from './booked-room-form';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:HttpClient, private router: Router) { }

  book(typeOfRoomDTO: BookedRoomForm): void {
    this.http.post('http://localhost:3000/book', typeOfRoomDTO).subscribe((_: any) => {
      console.log(_)
    },
    (err) => {
      this.router.navigate(['error', `${err.error}`])
      console.log(err);
    })
  }
}
