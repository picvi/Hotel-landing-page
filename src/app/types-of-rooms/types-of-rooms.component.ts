import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetRequestsRoomsService } from '../get-requests-rooms.service';
import { Room } from '../room';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-types-of-rooms',
  templateUrl: './types-of-rooms.component.html',
  styleUrls: ['./types-of-rooms.component.scss']
})
export class TypesOfRoomsComponent implements OnInit {
  type: Room;
  constructor(private getRoom: GetRequestsRoomsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap(params => params.getAll('type'))).subscribe(roomType => {
      this.getRoom.getRoomTypeInfo().subscribe((roomTypes) => {
        // non-existing type
        this.type = roomTypes[roomType];
      }, error => {
        console.log(error);
        this.router.navigate(['error', `${error.message}`])
        return throwError(error);
      })
    })
  }

}
