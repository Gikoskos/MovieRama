import { buildElement } from './element';
import MovieCard from  './moviecard';
import moviedb from '../data/moviedb';
import movieGenres from '../data/genres';

/**
 * MovieList displays a list of multiple MovieCard objects.
 * The data is fed from a source that can be changed, even after
 * a MovieList is initialized.
 * The list supports infinite scrolling, if the data is fed through
 * multiple pages. When the user scrolls to the bottom of the list, the
 * next page from the data source is fetched and appended on the bottom.
 */
export default class MovieList {
    /**
     * 
     * @param {Element} parent 
     */
    constructor(parent) {
        this._root = parent;
        this._onScroll = this._onScroll.bind(this);       
    }

    /**
     * 
     * @param {string} dataSource 
     * @param {Object} param
     */
    setDataSource(dataEndpoint, param) {
        this._root.removeEventListener('scroll', this._onScroll);
        this._endpoint = dataEndpoint;
        this._param =  param;
        this._currentPage = 0;

        this._root.addEventListener('scroll', this._onScroll);
        this._renderNextPage();
    }

    async _renderNextPage() {
        this._currentPage++;

        let data = await moviedb.getResource(this._endpoint, {
            page: this._currentPage,
            ...this._param
        });

        for (const movieData of data.results) {
            let genres = [], year;

            for (const genreId of movieData.genre_ids) {
                genres.push(movieGenres.get(genreId));
            }

            if (movieData.release_date == '') {
                year = '';
            } else {
                year = (new Date(movieData.release_date)).getFullYear();
            }

            (new MovieCard({
                id: movieData.id,
                title : movieData.title,
                poster_path: movieData.poster_path,
                vote_average: movieData.vote_average,
                overview: movieData.overview,
                genres,
                year
            })).appendOnParent(this._root);
        }

        if (this._currentPage < data.total_pages) {
            this._root.addEventListener('scroll', this._onScroll);
        }
    }

    /**
     * 
     * @param {UIEvent} ev 
     */
    _onScroll(ev) {
        const t = ev.target;

        //the next page of data is fetched if the user is less than 80px
        //from the bottom of the list
        if (t.scrollTop + t.offsetHeight >= (t.scrollHeight - 80)) {
            this._root.removeEventListener('scroll', this._onScroll);
            this._renderNextPage();
        }
    }
}
