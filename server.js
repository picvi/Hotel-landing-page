const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const jsonParser = express.json();
const port = 3000;

app.use(cors());

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
});

app.post("/book", jsonParser, (request, response) => {
  const bookedItem = request.body;
  if (!bookedItem) {
    response.status(400).send("No Data");
  } else {
    fs.readFile("./db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        return response.status(500).send(err);
      } else {
        try {
          const db = JSON.parse(data);
          const bookedRooms = db.bookedRooms;
          const isRoomOccupied = bookedRooms.find((room) => {
            return room.typeOfRoom === bookedItem.typeOfRoom &&
              room.dateOfDepartment === bookedItem.dateOfDepartment;
          });
          if (isRoomOccupied) {
            console.log("Sorry, room is occupied");
            return response.status(400).send("Sorry, room is occupied");
          } else {
            bookedRooms.push(bookedItem);
            json = JSON.stringify(db, null, 2, "\t");
            fs.writeFile("./db.json", json, "utf8", (err) => {
              if (err) {
                return response.status(500).send(err);
              }
              return response.status(200).json("Ok");
            });
          }
        } catch (err) {
          return response.status(500).send(err);
        }
      }
    });
  }
});
