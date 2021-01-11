export class BookedRoomForm {
  name: string;
  typeOfHouse: string;
  typeOfRoom: string;
  tel: string;
  comment: string;
  dateOfArrival: string;
  dateOfDepartment: string;
  PhoneNumber2?: string;

  constructor(
    name: string,
    typeOfHouse: string,
    typeOfRoom: string,
    tel: string,
    comment: string,
    dateOfArrival: string,
    dateOfDepartment: string,
    PhoneNumber2?: string
  ) {
    this.name = name;
    this.typeOfHouse = typeOfHouse;
    this.typeOfRoom = typeOfRoom;
    this.tel = tel;
    this.comment = comment;
    this.dateOfArrival = dateOfArrival;
    this.dateOfDepartment = dateOfDepartment;
    this.PhoneNumber2 = PhoneNumber2;
  }
}
