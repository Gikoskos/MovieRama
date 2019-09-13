import TemplatePage from './template';
import MovieList from '../ui/movielist';
import { clearChildren } from '../ui/element';

export default class InTheatersPage extends TemplatePage {
    constructor() {
        super();
        this.rootNode.classList.add('wrap-row-container');
        this._movielist = new MovieList(this.rootNode);
    }

    willMount() {
        this._movielist.setDataSource('/movie/now_playing');
    }

    willUnmount() {
        clearChildren(this.rootNode);
    }
}
