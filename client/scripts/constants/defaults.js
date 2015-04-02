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
  events: [
    {
      title: 'WCock',
      description: 'Pelataan kyykkää',
      image: 'images/KappaHD.jpg',
      id: '1',
      date: '1999-01-01'
    },

     {
      title: 'Wappuorgia',
      description: 'Tavallinen opiskelijavappu',
      image: 'images/KappaHD.jpg',
      id: '2',
      date: '2015-01-01'
    },

     {
      title: 'Fuksisauna',
      description: 'Kiusataan ja isketään fukseja',
      image: 'images/KappaHD.jpg',
      id: '3',
      date: '2016-01-01'
    },

     {
      title: 'Pikkujoulu',
      description: 'Vietetään joulua pikkuista',
      image: 'images/KappaHD.jpg',
      id: '4',
      date: '3030-01-01'
    },

    {
      title: 'Pikkulauantai',
      description: 'Tavallinen keskiviikko, eli kaljaa',
      image: 'images/KappaHD.jpg',
      id: '5',
      date: '1969-10-10'
    }
  ]

};

module.exports = Defaults;
