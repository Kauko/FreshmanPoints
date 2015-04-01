'use strict';

var Defaults = {

  route: '/',

  page: {
    title: 'Home',
    description: 'A React + Flux application',
    keywords: null

  },

  user: {
    loggedIn: false,
    firstName: 'John',
    lastName: 'Doe'
  },

  messages: {},

  //tämä pitäs olla tyhjä defaulttina mutta testaillessa mukava näin
  //en tiiä tarviiko tässä omaa storea joten otetaan pois käytöstä nyt
  events: [
    {
      title: 'hoiss',
      description: 'tää on se defaulttijuttu storesta',
      image: 'images/KappaHD.jpg',
      id: '1'
    },
    {
      title: 'voisko',
      description: 'tämä vaan nyt alkaa yhtäkkiä toimimaan',
      image: 'images/KappaHD.jpg',
      id: '2'
    }
  ]

};

module.exports = Defaults;
