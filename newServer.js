'use strict';

const url = 'https://swapi.co/api/people/1';

const superagent = require('superagent');

superagent.get(url).then(res => {
  console.log(res.body);
});
