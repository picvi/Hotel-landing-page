import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetRequestsRoomsService } from '../get-requests-rooms.service';
import { Room } from '../room';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-types-of-rooms',
  templateUrl: './types-of-rooms.component.html',
  styleUrls: ['./types-of-rooms.component.scss'],
})
export class TypesOfRoomsComponent implements OnInit {
  type: Room;
  typeOfHouse: string;

  constructor(
    private getRoom: GetRequestsRoomsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(switchMap((params) => params.getAll('type')))
      .subscribe((roomType) => {
        this.getRoom.getRoomTypeInfo().subscribe(
          (roomTypes) => {
            this.type = roomTypes[roomType];
            this.typeOfHouse = roomType;
          },
          (error) => {
            console.log(error);
            this.router.navigate(['error', `${error.message}`]);
          }
        );
      });
  }
  book(typeR: string) {
    this.router.navigate(['form'], {
      queryParams: {
        typeOfHouse: this.typeOfHouse,
        typeOfRoom: typeR,
      },
    });
  }
}
