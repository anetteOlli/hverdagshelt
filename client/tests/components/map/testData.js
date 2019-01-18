// @flow

type problem = {
  latitude: string,
  longitude: string,
  problem_id: number,
  title: string,
  description: string,
  locked: number,
  img_user: string,
  date_made: string,
  last_edited: string,
  street: string,
  status: string,
  municipality: string,
  county: string,
  city: string
};
export const problems: problem[] = [
  {
    latitude: '26,5656',
    longitude: '13',
    problem_id: 1,
    title: 'problem1',
    description: 'beskrivelse av problem1',
    locked: 0,
    img_user: 'wwww.lenketilbildet.com',
    date_made: '15 feb',
    last_edited: '15 feb',
    street: 'problem 1 gata',
    status: 'InProgress',
    municipality: 'Trondheim',
    county: 'Trøndelag',
    city: 'Trondheim'
  },
  {
    latitude: '32,5665',
    longitude: '18,5656',
    problem_id: 2,
    title: 'problem2',
    description: 'beskrivelse av problem 2',
    locked: 1,
    img_user: 'www.lenketilbildet.com',
    date_made: '1 jan',
    last_edited: '1 jan',
    street: 'problem 2 gata',
    status: 'InProgress',
    municipality: 'Trondheim',
    county: 'Trøndelag',
    city: 'Trondheim'
  }
];
