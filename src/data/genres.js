import moviedb from './moviedb';

const movieGenres = {
    _genres: {},
    _initialized: false,

    async init() {
        if (this._initialized) {
            return;
        }

        this._initialized = true;

        const jsonData = await moviedb.getResource('/genre/movie/list');
        const genres = jsonData['genres'];

        if (genres !== undefined) {
            //normalize the genre data
            for (const genre of genres) {
                this._genres[genre['id']] = genre.name;
            }
        }
    },

    /**
     * 
     * @param {number} id 
     * @return {string}
     */
    get(id) {
        const genreName = this._genres[id];

        if (genreName === undefined) {
            return id + '';
        }

        return genreName;
    }

};

export default movieGenres;
