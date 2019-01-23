//import moment from '../../../store/reducers/statisticsReducer';

console.log(Date.now());



const allProblems = [
  {
    problem_id: 1,
    problem_title: 'Erlend tried his best',
    problem_description: 'A big hole has been found in the rear of Erlend',
    problem_locked: 0,
    description_entrepreneur: null,
    img_user:
      'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/37032713_1777400872353121_1971277099943591936_n.jpg?_nc_cat=111&_nc_ht=scontent-arn2-1.xx&oh=dbdfebda96c80ead5e55f1e45587efba&oe=5CBFFCF5',
    img_entrepreneur: null,
    date_made: new Date(2018, 11, 24, 10, 33, 30, 0),
    last_edited: '2019-01-17 10:17:16',
    date_finished: null,
    category_fk: 'Snowplow',
    status_fk: 'Unchecked',
    user_fk: 1,
    entrepreneur_fk: null,
    latitude: 63.422724,
    longitude: 10.395582,
    support: 1,
    municipality_fk: 'Trondheim',
    county_fk: 'Trøndelag',
    city_fk: 'Trondheim',
    street_fk: 'Klostergata'
  },
  {
    problem_id: 2,
    problem_title: 'Erlend tried his best',
    problem_description: 'A big hole has been found in the rear of Erlend',
    problem_locked: 0,
    description_entrepreneur: null,
    img_user:
      'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/37032713_1777400872353121_1971277099943591936_n.jpg?_nc_cat=111&_nc_ht=scontent-arn2-1.xx&oh=dbdfebda96c80ead5e55f1e45587efba&oe=5CBFFCF5',
    img_entrepreneur: null,
    date_made: new Date(2018, 11, 24, 10, 33, 30, 0),
    last_edited: '2019-01-17 10:17:16',
    date_finished: null,
    category_fk: 'Snowplow',
    status_fk: 'Unchecked',
    user_fk: 1,
    entrepreneur_fk: null,
    latitude: 63.422724,
    longitude: 10.395582,
    support: 1,
    municipality_fk: 'Trondheim',
    county_fk: 'Trøndelag',
    city_fk: 'Trondheim',
    street_fk: 'Klostergata'
  },
  {
    problem_id: 3,
    problem_title: 'Erlend tried his best',
    problem_description: 'A big hole has been found in the rear of Erlend',
    problem_locked: 0,
    description_entrepreneur: null,
    img_user:
      'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/37032713_1777400872353121_1971277099943591936_n.jpg?_nc_cat=111&_nc_ht=scontent-arn2-1.xx&oh=dbdfebda96c80ead5e55f1e45587efba&oe=5CBFFCF5',
    img_entrepreneur: null,
    date_made: new Date(2018, 11, 24, 10, 33, 30, 0),
    last_edited: '2019-01-18 10:17:16',
    date_finished: null,
    category_fk: 'Snowplow',
    status_fk: 'Unchecked',
    user_fk: 1,
    entrepreneur_fk: null,
    latitude: 63.422724,
    longitude: 10.395582,
    support: 1,
    municipality_fk: 'Trondheim',
    county_fk: 'Trøndelag',
    city_fk: 'Trondheim',
    street_fk: 'Klostergata'
  },
  {
    problem_id: 4,
    problem_title: 'Erlend tried his best',
    problem_description: 'A big hole has been found in the rear of Erlend',
    problem_locked: 0,
    description_entrepreneur: null,
    img_user:
      'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/37032713_1777400872353121_1971277099943591936_n.jpg?_nc_cat=111&_nc_ht=scontent-arn2-1.xx&oh=dbdfebda96c80ead5e55f1e45587efba&oe=5CBFFCF5',
    img_entrepreneur: null,
    date_made: new Date(2018, 11, 25, 10, 33, 30, 0),
    last_edited: '2019-01-17 10:17:16',
    date_finished: null,
    category_fk: 'Snowplow',
    status_fk: 'Unchecked',
    user_fk: 1,
    entrepreneur_fk: null,
    latitude: 63.422724,
    longitude: 10.395582,
    support: 1,
    municipality_fk: 'Trondheim',
    county_fk: 'Trøndelag',
    city_fk: 'Trondheim',
    street_fk: 'Klostergata'
  },
  {
    problem_id: 5,
    problem_title: 'Erlend tried his best',
    problem_description: 'A big hole has been found in the rear of Erlend',
    problem_locked: 0,
    description_entrepreneur: null,
    img_user:
      'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/37032713_1777400872353121_1971277099943591936_n.jpg?_nc_cat=111&_nc_ht=scontent-arn2-1.xx&oh=dbdfebda96c80ead5e55f1e45587efba&oe=5CBFFCF5',
    img_entrepreneur: null,
    date_made: new Date(2018, 11, 25, 10, 33, 30, 0),
    last_edited: '2019-01-19 10:17:16',
    date_finished: null,
    category_fk: 'Snowplow',
    status_fk: 'Unchecked',
    user_fk: 1,
    entrepreneur_fk: null,
    latitude: 63.422724,
    longitude: 10.395582,
    support: 1,
    municipality_fk: 'Trondheim',
    county_fk: 'Trøndelag',
    city_fk: 'Trondheim',
    street_fk: 'Klostergata'
  },
  {
    problem_id: 6,
    problem_title: 'Erlend tried his best',
    problem_description: 'A big hole has been found in the rear of Erlend',
    problem_locked: 0,
    description_entrepreneur: null,
    img_user:
      'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/37032713_1777400872353121_1971277099943591936_n.jpg?_nc_cat=111&_nc_ht=scontent-arn2-1.xx&oh=dbdfebda96c80ead5e55f1e45587efba&oe=5CBFFCF5',
    img_entrepreneur: null,
    date_made: new Date(2018, 11, 26, 10, 33, 30, 0),
    last_edited: '2019-01-20 10:17:16',
    date_finished: null,
    category_fk: 'Snowplow',
    status_fk: 'Unchecked',
    user_fk: 1,
    entrepreneur_fk: null,
    latitude: 63.422724,
    longitude: 10.395582,
    support: 1,
    municipality_fk: 'Trondheim',
    county_fk: 'Trøndelag',
    city_fk: 'Trondheim',
    street_fk: 'Klostergata'
  }
];


function dateRange(startDate, endDate) {
  const start      = startDate.split('-');
  const end        = endDate.split('-');
  const startYear  = parseInt(start[0]);
  const endYear    = parseInt(end[0]);
  const dates      = [];

  for(let i = startYear; i <= endYear; i++) {
    const endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
    const startMon = i === startYear ? parseInt(start[1])-1 : 0;
    for(let j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j+1) {
      let month = j+1;
      let displayMonth = month < 10 ? '0'+month : month;
      dates.push([i, displayMonth, '01'].join('-'));
    }
  }
  return dates;
}

const startDate = new Date(2016, 11, 0);
const endDate = new Date();
console.log(dateRange(startDate,endDate));

var dateStart = moment('2013-8-31');
var dateEnd = moment('2015-3-30');
var timeValues = [];

while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
  timeValues.push(dateStart.format('YYYY-MM'));
  dateStart.add(1,'month');
}


let array = [
  {name: '2017 mars', value: {year: 2017, month: 2}},
  {name: '2017 april', value: {year: 2017, month: 3}},
  {name: '2017 mai', value: {year: 2017, month: 4}},
];

const year = 2016;
const month = 1;

console.log(allProblems[0].date_made.getFullYear());
console.log(allProblems[0].date_made.getMonth());

const problems = allProblems.filter(p => p.date_made.getFullYear() === year && p.date_made.getMonth() === month);
console.log(problems);

console.log(new Date(year, month+1, 0).getDate());

const result = Array(new Date(year, month+1, 0).getDate())
  .fill(null)
  .map((u, i) => ({ name: i, problems: 0 }));

/**
 * @fileOverview Create slick-ass code snippet
 * @author Erlend S.
 * */

problems.map(p => result[p.date_made.getDate() - 1].problems++);

console.log('Du har "ett" problem', result);
//const result = [{ name: 'dag 1', problems: 20 }, { name: 'dag 2', problems: 10 }, { name: 'dag 3', problems: 14 }];

/*
const setLineChartData = (year: number, month: number) =>{

  const dateStart = moment('2013-8-31');
  const dateEnd = moment('2015-3-30');

  while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
    timeValues.push(dateStart.format('YYYY-MM'));
    dateStart.add(1,'month');
  }


  let array = [
    {name: '2017 mars', value: {year: 2017, month: 2}},
    {name: '2017 april', value: {year: 2017, month: 3}},
    {name: '2017 mai', value: {year: 2017, month: 4}},
  ];

  const year = 2016;
  const month = 1;

  console.log(allProblems[0].date_made.getFullYear());
  console.log(allProblems[0].date_made.getMonth());

  const problems = allProblems.filter(p => p.date_made.getFullYear() === year && p.date_made.getMonth() === month);
  console.log(problems);

  console.log(new Date(year, month+1, 0).getDate());

  const result = Array(new Date(year, month+1, 0).getDate())
    .fill(null)
    .map((u, i) => ({ name: i, problems: 0 }));

  problems.map(p => result[p.date_made.getDate() - 1].problems++);

  console.log('Du har "ett" problem', result);
};
*/

