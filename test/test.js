const expect = require('chai').expect;
const TimeEdit = require('../timeedit.js');

let time = new TimeEdit(
  'https://no.timeedit.net/web/hib/db1/aistudent/'
);

describe('TimeEdit api', () => {
  it('should return schedule id', () => {
    time.getClassId('14hdata')
      .then((result) => {
        expect(result).to.be.a('number');
      }).catch((err) => {
        console.log(err);
      });
  });
  it('should return types as object', () => {
    time.getTypes()
      .then((result) => {
        expect(result).to.be.a('object');
      }).catch((err) => {
        console.log(err);
      });
  });
  it('should return schedule as object', () => {
    time.getSchedule()
      .then((result) => {
        expect(result).to.have.property('reservations');
      }).catch((err) => {
        console.log(err);
      });
  });
});
