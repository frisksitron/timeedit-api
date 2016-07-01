const TimeEdit = require('../index.js');

// Avdeling for Ingeniør og Økonomi
const aio = new TimeEdit(
  'https://no.timeedit.net/web/hib/db1/alstudent/'
);

aio.getTypes()
  .then((result) => {
    console.log('getTypes():', result);
  }).catch((err) => {
    console.log(err);
  });

aio.getScheduleURI()
  .then((result) => {
    console.log('getScheduleURI():', result);
  }).catch((err) => {
    console.log(err);
  });


aio.getClassId('14hblu')
  .then((id) => {
    return Promise.all([id, aio.getSchedule(id)]);
  })
  .then((results) => {
    const reservations = JSON.parse(results[1]);
    const info = reservations.info;

    console.log(info.reservationcount);

    for (let reservation of reservations.reservations) {
      console.log(reservation.columns);
    }
  })
  .catch((error) => {
    throw error;
  });
