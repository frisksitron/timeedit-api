'use strict';

const request = require('request');
const cheerio = require('cheerio');

const TimeEdit = class {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  getSchedule(classId) {
    return new Promise((resolve, reject) => {
      request(this.getScheduleURL(classId), (error, response, json) => {
        if (!error && response.statusCode == 200) {
          return resolve(JSON.parse(json));
        }
        return reject(error);
      });
    });
  }

  getClassId(classText) {
    return new Promise((resolve, reject) => {
      this.loadHTML(this.getSearchURL(classText))
        .then((result) => {
          const $ = result;
          const id = $('#objectbasketitemX0').attr('data-idonly');

          return resolve(id);
        }).catch((err) => {
          return reject(err);
        });
    });
  }

  getTypes() {
    return new Promise((resolve, reject) => {
      this.getScheduleURI()
        .then((uri) => {
          return Promise.all([uri, this.loadHTML(this.baseURL + uri)])
        })
        .then((result) => {
          const $ = result[1];

          let types = $('#fancytypeselector option').map((i, elem) => {
            return {
                name: $(elem).text(),
                value: $(elem).val()
            };
          }).get();

          return resolve(types);
        }).catch((err) => {
          return reject(err);
        });
    });
  }

  getScheduleURI() {
    return new Promise((resolve, reject) => {
      this.loadHTML(this.baseURL)
        .then((result) => {
          const $ = result;
          let uri = $('#contents > div.linklist > div > div:nth-child(1) > a:nth-child(1)').attr('href');
          uri = uri.match(/([^/]*).html/);

          return resolve(uri[0]);
        })
        .catch((err) => {
          return reject(err);
        })
    });
  }

  loadHTML(url) {
    return new Promise((resolve, reject) => {
      request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          return resolve(cheerio.load(html));
        }
        return reject(error);
      });
    });
  }

  getScheduleURL(id) {
    return this.baseURL + 'ri.json?h=f&sid=3&p=0.m%2C12.n&objects=' + id + '&ox=0&types=0&fe=0&h2=f';
  }

  getSearchURL(classText) {
    return this.baseURL + 'objects.html?max=15&fr=t&partajax=t&im=f&sid=3&l=nb_NO&search_text=' + classText + '&types=6';
  }

}

module.exports = TimeEdit;
