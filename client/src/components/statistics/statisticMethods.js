//@flow
import moment from 'moment';
import 'moment/locale/nb';
moment.locale('nb');
import type { Problem } from '../../store/reducers/problemReducer';

export const setUpDropDownMonth = (dateStart: string, dateEnd: string): { value: string, name: string }[] => {
  const start = moment(dateStart);
  const end = moment(dateEnd);
  const timeValues = [];
  while (end > start || start.format('M') === end.format('M')) {
    timeValues.push({ value: start.format('YYYY-M'), name: start.format('MMMM YYYY') });
    start.add(1, 'month');
  }
  return timeValues;
};

export const setUpDropDownYear = (dateStart: string, dateEnd: string): { value: string, name: string }[] => {
  const start = moment(dateStart);
  const end = moment(dateEnd);
  const timeValues = [];
  while (end > start || start.format('Y') === end.format('Y')) {
    timeValues.push({ value: start.format('YYYY'), name: start.format('YYYY') });
    start.add(1, 'year');
  }
  return timeValues;
};

export const getProblemsByMonth = (
  allProblems: Problem[],
  selectedMonth: string
): { name: string, problemer: number }[] => {
  const problems = allProblems.filter(
    p => selectedMonth === `${new Date(p.date_made).getFullYear()}-${new Date(p.date_made).getMonth() + 1}`
  );
  console.log(selectedMonth);
  const year = selectedMonth.split('-')[0];
  const month = selectedMonth.split('-')[1];
  const result = (Array(new Date(parseInt(year), parseInt(month), 0).getDate())
    .fill(null)
    .map((u, i) => ({ name: `Dag ${i + 1}`, problemer: 0 })): Array<{ name: string, problemer: number }>);
  problems.map(p => result[new Date(p.date_made).getDate()].problemer++);
  return result;
};

/**
 * @author Erlend Sundøy (snorre verified to the best of his knowledge(not enough))
 **/

export const getSolvedTimeByTime = (allProblems: Problem[], selectedYear: string): { name: string, dager: number }[] => {
  const months = [
    'Januar',
    'Februar',
    'Mars',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Desember'
  ];
  const problems = allProblems.filter(p => new Date(p.date_finished).getFullYear() === parseInt(selectedYear));
  const times = problems.map(p => ({
    solvedTime: (new Date(p.date_finished).getTime() - new Date(p.date_made).getTime()) / (1000 * 3600 * 24),
    month: new Date(p.date_made).getMonth()
  }));
  console.log('dddd', times);

  console.log('ddd', problems);
  const a = Array(12)
    .fill(null)
    .map((v, i) => {
      const t = times.filter(t => t.month === i);
      const dager = t.length > 0 ? Math.floor(t.reduce((avg, { solvedTime },_, { length }) => avg + solvedTime / length, 0)) : 0;
      return { name: months[i], dager};
    });
  console.log(a);
  return a;
};

export const getCategoryProblemsByEntrepreneur = (
  allProblems: Problem[],
  category: string,
  entrepreneurs: []
): { name: string, problems: number }[] => {
  const problems = allProblems.filter(p => p.category === category);
  const result = (Array(entrepreneurs.length)
    .fill(null)
    .map((u, i) => ({ name: entrepreneurs[i].business_name, problemer: 0 })): Array<{
    name: string,
    problemer: number
  }>);
  problems.map(p => result[entrepreneurs.findIndex(e => e.entrepreneur_id === p.entrepreneur_id)].problemer++);
  console.log(result);
  return result;
};

export const getEntrepreneurProblemsByCategory = (
  allProblems: Problem[],
  entrepreneur_id: number,
  categories: []
): { name: string, problems: number }[] => {
  const problems = allProblems.filter(p => p.entrepreneur_id === entrepreneur_id);
  const result = (Array(categories.length)
    .fill(null)
    .map((u, i) => ({ name: categories[i], problemer: 0 })): Array<{ name: string, problemer: number }>);

  problems.map(p => result[categories.findIndex(c => c === p.category)].problemer++);
  console.log(result);
  return result;
};

export const getProblemsByCategory = (
  allProblems: Problem[],
  allCategories: string[]
): { name: string, problemer: number }[] => {
  const result = (Array(allCategories.length)
    .fill(null)
    .map((u, i) => ({ name: allCategories[i], problemer: 0 })): Array<{ name: string, problemer: number }>);

  allProblems.map(p => result[allCategories.findIndex(c => c === p.category)].problemer++);
  console.log(result);
  return result;
};

export const getProblemsByEntrepreneur = (
  allProblems: Problem[],
  entrepreneurs: []
): { name: string, problemer: number }[] => {
  const result = (Array(entrepreneurs.length)
    .fill(null)
    .map((u, i) => ({ name: entrepreneurs[i].business_name, problemer: 0 })): Array<{
    name: string,
    problemer: number
  }>);
  const problemsWithEnt = allProblems.filter(p => p.entrepreneur_id !== null);
  console.log(entrepreneurs);
  problemsWithEnt.map(p => {
    const id = entrepreneurs.findIndex(e => e.entrepreneur_id === p.entrepreneur_id);
    if (id !== -1) result[entrepreneurs.findIndex(e => e.entrepreneur_id === p.entrepreneur_id)].problemer++;
  });
  return result;
};
