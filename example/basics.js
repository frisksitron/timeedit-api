const TimeEdit = require('../index.js');

// Avdeling for Ingeniør og Økonomi
const aio = new TimeEdit('https://no.timeedit.net/web/hib/db1/alstudent/');

// First get course id from course code,
// then use course id to get the course schedule
aio.getCourseId('dat100', 5)
.then(courseId => {
  return aio.getCourse(courseId);
})
.then(course => {
  console.log(course);
});


const ntnu = new TimeEdit('https://no.timeedit.net/web/hist/db1/hist/');

// First get course id from course code,
// then use course id to get the course schedule
ntnu.getCourseId('TALM1005', 194)
.then(courseId => {
  return ntnu.getCourse(courseId);
})
.then(course => {
  console.log(course);
});
