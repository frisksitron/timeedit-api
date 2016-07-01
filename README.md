# timeedit-api
Node API to receive schedules from timeedit.net as objects.

## Usage
Initialize
```javascript
const TimeEdit = require('timeedit-api');

const timeedit = new TimeEdit(
  'https://no.timeedit.net/web/hib/db1/aistudent/'
);
```

Get schedule for a class
```javascript
timeedit.getClassId('14hdata')
  .then((id) => {
    return Promise.all([id, aio.getSchedule(id)]);
  })
  .then((results) => {
    const reservations = JSON.parse(results[1]);

    for (let reservation of reservations.reservations) {
      console.log(reservation);
    }
  })
  .catch((error) => {
    throw error;
  });
```

## Reservations object
```json
{
  "columnheaders": ["Klasse", "Emne", "Emne", "Undervisningstype", "Rom", "Lærer", "Praksis", "Egen tekst", "Kommentar", "Eksamen", "Eksamenstype"],
  "info": {
      "reservationlimit": 200,
      "reservationcount": 40
  },
  "reservations": [{
      "id": "357110",
      "startdate": "18.08.2016",
      "starttime": "08:15",
      "enddate": "18.08.2016",
      "endtime": "10:00",
      "columns": ["14HDATA, 14HINF", "INF122", "Programmeringsparadigmer", "Øving"]
  }, {
      "id": "357126",
      "startdate": "18.08.2016",
      "starttime": "10:15",
      "enddate": "18.08.2016",
      "endtime": "12:00",
      "columns": ["14HDATA, 14HINF", "INF122", "Programmeringsparadigmer", "Forelesning"]
  }, {
      "id": "357049",
      "startdate": "18.08.2016",
      "starttime": "12:15",
      "enddate": "18.08.2016",
      "endtime": "14:00",
      "columns": ["14HDATA, 14HINF", "DAT157", "Nevrale nett og avanserte algoritmer", "Forelesning", "F203", "Høyland Sven-Olai, Kristensen Terje"]
  }]
}
```
