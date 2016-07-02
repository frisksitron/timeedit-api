const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const TimeEdit = require('../index.js');

chai.use(chaiAsPromised);
chai.should();

describe('TimeEdit API', () => {

  let time = new TimeEdit(
    'https://no.timeedit.net/web/hib/db1/aistudent/'
  );

  it('should return number class with 4 digits', () => {
    return time.getClassId('14hdata').should.eventually.equal('5972');
  });

  it('should return array with objects with types', () => {
    return time.getTypes().should.eventually.be.an('array');
  });

  it('should return schedule with reservations', () => {
    return time.getSchedule('5971').should.eventually.be.an('object');
  });

  it('should return schedule URI', () => {
    return time.getScheduleURI().should.eventually.equal('ri1Q7.html');
  });
});
