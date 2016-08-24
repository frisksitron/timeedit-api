const TimeEdit = require('../index.js');

// Avdeling for Ingeniør og Økonomi
const aio = new TimeEdit('https://no.timeedit.net/web/hib/db1/alstudent/');

// First get course id from course code,
// then use course id to get the course schedule
aio.getCourseId('dat100')
.then(courseId => {
  return aio.getCourse(courseId);
})
.then(course => {
  console.log(course);
});
