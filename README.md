# timeedit-api
Node API to receive course schedules from timeedit.net as objects.

## Usage
###Initialize and get course schedule
```javascript
const TimeEdit = require('../index.js');

// Avdeling for Ingeniør og Økonomi
const aio = new TimeEdit('https://no.timeedit.net/web/hib/db1/alstudent/');

// First get course id from course code,
// then use course id to get the course schedule
aio.getCourseId('dat100')
.then(courseCode => {
  return aio.getCourse(courseCode);
})
.then(course => {
  console.log(course);
});
```

### Course object
```javascript
[
  { startDate: '24.08.2016',
    endDate: '24.08.2016',
    startTime: '10:15',
    endTime: '12:00',
    room: ['E403', 'E443'],
    type: 'Lab',
    lecturers: 
     ['Høyland Sven-Olai',
      'Kristensen Lars Michael',
      'Soleim Harald']
  },
  { startDate: '25.08.2016',
    endDate: '25.08.2016',
    startTime: '08:15',
    endTime: '10:00',
    room: ['E403', 'E443'],
    type: 'Lab',
    lecturers: 
     ['Høyland Sven-Olai',
      'Kristensen Lars Michael',
      'Soleim Harald']
  }
]
```
