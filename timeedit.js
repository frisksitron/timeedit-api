'use strict';

const request = require('request');
const cheerio = require('cheerio');

const TimeEdit = class {
  constructor(baseURL) {
    this.baseURL = baseURL;

    this.scheduleURI = 'ri.json?h=f&sid=3&p=0.m%2C12.n&objects=5972&ox=0&types=0&fe=0&h2=f';
    this.scheduleSearchURI = 'objects.html?max=15&fr=t&partajax=t&im=f&sid=3&l=nb_NO&search_text=14hdata&types=6';
    this.typeURI = 'ri1Q7.html';

    this.types = {};
    this.classId = 0;
  }

  getSchedule() {
    return new Promise((resolve, reject) => {
      request(this.baseURL + this.scheduleURI, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          console.log(html);

          return resolve(html);
        }
        return reject(error);
      });
    });
  }

  searchSchedule() {
    return new Promise((resolve, reject) => {
      this.loadHTML(this.baseURL + this.scheduleSearchURI)
        .then((result) => {
          const $ = result;
          const id = $('#objectbasketitemX0').attr('data-idonly');

          this.classId = id;
          return resolve(id);
        }).catch((err) => {
          return reject(err);
        });
    });
  }

  getTypes() {
    return new Promise((resolve, reject) => {
      this.loadHTML(this.baseURL + this.typeURI)
        .then((result) => {
          const $ = result;

          let types = $('#fancytypeselector option').map((i, elem) => {
            return {
                name: $(elem).text(),
                value: $(elem).val()
            };
          }).get();

          this.types = types;
          return resolve(types);
        }).catch((err) => {
          return reject(err);
        });
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

  buildScheduleURL(id) {
    let urlArray = this._splitString(this.scheduleURI, 'objects=');
    return this.baseURL + this._joinString(urlArray, 'objects=' + id);
  }

  _splitString(string, splitWord){
    return string.split(splitWord);
  }

  _joinString(array, joinOn){
    return array.join(joinOn);
  }

}

module.exports = TimeEdit;
