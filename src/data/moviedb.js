import WebApi from '../common/webapi';

const hostname = 'https://api.themoviedb.org/3';
const apikey = '';

const moviedb = new WebApi(hostname, apikey);

export default moviedb;
