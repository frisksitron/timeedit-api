const TimeEdit = require('./timeedit.js');

// Avdeling for Ingeniør og Økonomi
const aio = new TimeEdit(
  'https://no.timeedit.net/web/hib/db1/aistudent/'
);

aio.getTypes()
  .then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });


aio.searchSchedule()
  .then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });


aio.getSchedule()
  .then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });
