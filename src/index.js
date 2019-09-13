import InTheatersPage from './pages/intheaters';
import SearchPage from './pages/search';
import NavBar from './ui/navbar';
import AppRouter from './common/router';
import { buildElement } from './ui/element';
import movieGenres from './data/genres';
import './data/moviedb';

const pageTitle = 'MovieRama';

function buildHeader(pages) {
    const headerNode = buildElement('header', 'header-container');
    new NavBar(pages, headerNode);

    return headerNode;
}

function buildContent() {
    const contentNode = buildElement('main', 'main-container');

    return contentNode;
}

function buildFooter() {
    const footerNode = buildElement('footer', 'footer-container');

    return footerNode;
}

(function() {
    /**
     * pages is used by the router and the navbar.
     * name is the name of the page, displayed both in the title
     * and the navbar option.
     * hash is the hash that's appended to the url.
     * element is the element that is displayed on the content area
     * of the page
     */
    const pages = [
        {
            name: 'In Theaters',
            hash: '#intheaters',
            element: new InTheatersPage(),
        },
        {
            name: 'Search',
            hash: '#search',
            element: new SearchPage()
        }
    ];

    //build a very basic page layout with only 3 parts:
    //a header, a main content area and a footer
    const headerNode = buildHeader(pages);
    const contentNode = buildContent();
    const footerNode = buildFooter();

    document.body.insertAdjacentElement('afterbegin', headerNode);
    headerNode.insertAdjacentElement('afterend', contentNode);
    contentNode.insertAdjacentElement('afterend', footerNode);

    //movieGenres is the only dependency that needs to be loaded once,
    //so we might as well do it before we load the rest of the page
    movieGenres.init().then(() => {
        //initialize an extremely basic hash-based URL router that makes this a SPA
        const router = new AppRouter(pages, pageTitle, contentNode);
        router.setPageFromURL();
    });
})();