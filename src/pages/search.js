import TemplatePage from './template';
import MovieList from '../ui/movielist';
import {
    buildElement,
    clearChildren
} from '../ui/element';

export default class SearchPage extends TemplatePage {
    constructor() {
        super();
        this.rootNode.classList.add('search-page');

        this._searchbarWrapper = buildElement('div', 'search-bar-wrapper', this.rootNode);
        this._searchbar = buildElement('input', [
            'search-bar',
            'slide-in-left'
        ], this._searchbarWrapper, {
            attr: {
                type: 'text',
                placeholder: 'Search movies...'
            }
        });
        this._lastquery = '';

        this._movielistWrapper = buildElement('div', 'wrap-row-container', this.rootNode);

        this._onSearchBarInput = this._onSearchBarInput.bind(this);

        this._movielist = new MovieList(this._movielistWrapper);
    }

    _onSearchBarInput() {
        if (this._lastquery != this._searchbar.value) {
            this._lastquery = this._searchbar.value;
            this._queryMovies();
        }
    }

    _queryMovies() {
        clearChildren(this._movielistWrapper);

        if (this._lastquery != '') {
            this._movielist.setDataSource('/search/movie', {
                query: this._lastquery
            });
        }
    }

    willMount() {
        this._queryMovies();

        this._intervalID = setInterval(this._onSearchBarInput, 1000);
        //this._searchbar.addEventListener('input', this._onSearchBarInput);
    }

    willUnmount() {
        clearChildren(this._movielistWrapper);
        this._lastquery = this._searchbar.value;
        clearInterval(this._intervalID);
        //this._searchbar.removeEventListener('input', this._onSearchBarInput);
    }
}
