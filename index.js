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
   * @return {Number} - Lecture ID as number
   */
  getCourseId(courseCode, searchId) {
    return new Promise((resolve, reject) => {
      this.loadHtml(this.getSearchURL(courseCode, searchId))
      .then(result => {
        const $ = result;
        const id = $('#objectbasketitemX0').attr('data-idonly');

        return resolve(id);
      }).catch(err => {
        return reject(err);
      });
    });
  }

  /**
   * Get all avalible schedule types
   * @return {Array<Object>} - Ex. [{ name: "emne", value: 5}]
   */
  getTypes() {
    return new Promise((resolve, reject) => {
      this.getSearchPageURI()
      .then(uri => {
        return this.loadHtml(this.baseURL + uri);
      })
      .then(result => {
        const $ = result;

        let types = $('#fancytypeselector option').map((i, type) => {
          return {
            name: $(type).text(),
            value: $(type).val()
          };
        }).get();

        return resolve(types);
      }).catch(err => {
        return reject(err);
      });
    });
  }

  /**
   * Get URI for search page, later used to get avalible schedule types
   * @return {String} - Ex. 'ri1Q7.html'
   */
  getSearchPageURI() {
    return new Promise((resolve, reject) => {
      this.loadHtml(this.baseURL)
      .then(result => {
        const $ = result;
        // #contents > div.linklist > div > div:nth-child(1) > a:nth-child(1)
        let uri = $('.linklist .leftlistcolumn > a:first-child').attr('href');
        uri = uri.match(/([^/]*).html/);

        return resolve(uri[0]);
      })
      .catch(err => {
        return reject(err);
      });
    });
  }

  /**
   * Load html and return cheerio function
   * @param {String} url - URL address
   * @return {Function} - Cheerio function to manipulate loaded html
   */
  loadHtml(url) {
    return new Promise((resolve, reject) => {
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          return resolve(cheerio.load(html));
        }
        return reject(error);
      });
    });
  }

  /**
   * Construct url to get course schedule as json
   * @param {Number} courseId - Identifier for single course. Ex
   * @return {String} - URL to json of course schedule
   */
  getCourseUrl(courseId) {
    return (
      this.baseUrl +
      'ri.json?h=f&sid=3&p=0.m%2C12.n&objects=' +
      courseId +
      '&ox=0&types=0&fe=0&h2=f'
    );
  }

  /**
   * Construct search url
   * @param {String} searchText - Search string containing course code
   * @param {String} type - e
   * @return {String} - e
   */
  getSearchURL(searchText, type) {
    return (
      this.baseUrl +
      'objects.html?max=1&fr=t&partajax=t&im=f&sid=3&l=nb_NO&search_text=' +
      searchText +
      '&types=' +
      type
    );
  }

};

module.exports = TimeEdit;
