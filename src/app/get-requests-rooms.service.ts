import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from './room';

@Injectable({
  providedIn: 'root'
})
export class GetRequestsRoomsService {
  cabana: Room;
  constructor(private http: HttpClient) { }

  getRoomTypeInfo() {
    return this.http.get('assets/typeOfRooms.json');
  }
}
