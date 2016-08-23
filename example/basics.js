let TimeEdit = require('../index.js');

// Avdeling for Ingeniør og Økonomi
let aio = new TimeEdit(
  'https://no.timeedit.net/web/hib/db1/alstudent/'
);

// First get course id from course code,
// then use course id to get the course schedule
aio.getCourseId('dat100')
.then(courseCode => {
  return aio.getCourse(courseCode);
})
.then(course => {
  console.log(course);
});
