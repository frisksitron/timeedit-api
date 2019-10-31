'use strict';

const request = require('request');
const cheerio = require('cheerio');

const TimeEdit = class {
  /**
   * @param {String} baseUrl - Ex. https://no.timeedit.net/web/hib/db1/alstudent/
   */
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * Get single lecture from lecture ID as object
   * @param {Number} courseId - ID for lecture
   * @return {Promise} - Promise of lecture object
   */
  getCourse(courseId) {
    return new Promise((resolve, reject) => {
      const lectureURL = this.getCourseUrl(courseId);

      request(lectureURL, (error, response, json) => {
        if (!error && response.statusCode === 200) {
          const rawCourse = JSON.parse(json);

          const course = rawCourse.reservations.map(lecture => {
            return {
              startDate: lecture.startdate,
              endDate: lecture.enddate,
              startTime: lecture.starttime,
              endTime: lecture.endtime,
              room: lecture.columns[3].split(', '),
              type: lecture.columns[5],
              lecturers: lecture.columns[4].split(', ')
            };
          });

          return resolve(course);
        }

        return reject(error);
      });
    });
  }

  /**
   * Get lecture ID from course code
   * @param {String} courseCode - Name of course. Ex. DAT100
   * @param {String} searchId - A comma separated list of filtering type ids
   * @return {Number} - Lecture ID as number
   */
  getCourseId(courseCode, searchId) {
    return new Promise((resolve, reject) => {
      this.getSearch(courseCode, searchId)
      .then(result => {
        return resolve(result[0].value);
      }).catch(err => {
        return reject(err);
      })
    });
  }

  /**
   * Get lecture ID from course code
   * @param {String} searchQuery - Name of course. Ex. DAT100
   * @param {String} searchId - A comma separated list of filtering type ids
   * @return {Array<{name: string, id: number}>} - Lecture ID as number
   */
  getSearch(searchQuery, searchId) {
    return new Promise((resolve, reject) => {
      const searchURL = this.getSearchURL(searchQuery, searchId);

      request(searchURL, (error, response, json) => {
        if (!error && response.statusCode === 200) {
          const rawSearch = JSON.parse(json);

          const search = rawSearch.records.map(searchItem => {
            return {
              name: searchItem.values,
              value: searchItem.id
            };
          });

          return resolve(search);
        }

        return reject(error);
      });
    });
  }

  /**
   * Get all avalible schedule types
   * @return {Array<{name: string, value: number}>} - Ex. [{ name: "emne", value: 5}]
   */
  getTypes() {
    return new Promise((resolve, reject) => {
      const typesURL = this.getTypesUrl();

      request(typesURL, (error, response, json) => {
        if (!error && response.statusCode === 200) {
          const rawTypes = JSON.parse(json);

          const types = rawTypes.records.map(type => {
            return {
              name: type.name,
              value: type.id
            };
          });

          return resolve(types);
        }

        return reject(error);
      });
    });
  }

  /**
   * Construct url to get the type definitions as json
   * @return {String} - URL to json of the type definitions
   */
  getTypesUrl() {
    return (
      this.baseUrl +
      'types.json'
    );
  }

  /**
   * Construct url to get course schedule as json
   * @param {Number} courseId - Identifier for single course. Ex
   * @return {String} - URL to json of course schedule
   */
  getCourseUrl(courseId) {
    return (
      this.baseUrl +
      'ri.json?sid=3&objects=' +
      courseId
    );
  }

  /**
   * Construct url to get a search query as json
   * @param {String} searchText - Search string containing course code
   * @param {String} type - A comma separated list of filtering type ids
   * @return {String} - URL to json of a search query
   */
  getSearchURL(searchText, type) {
    return (
      this.baseUrl +
      'objects.json?sid=3&partajax=t&search_text=' +
      searchText +
      '&types=' +
      type
    );
  }

};

module.exports = TimeEdit;
