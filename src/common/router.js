import t from './types';

export default class AppRouter {
    constructor(pages, pageTitle, contentRootNode) {
        if (!t.isArray(pages)) {
            throw new Error("AppRouter:constructor: pages expected to be array");
        }

        if (!t.isString(pageTitle)) {
            throw new Error("AppRouter:constructor: pageTitle expected to be string");
        }

        this._pages = pages;
        this._title = pageTitle;
        this._root = contentRootNode;
        this._index = pages[0];

        this._onHashChange = this._onHashChange.bind(this);
        window.addEventListener('hashchange', this._onHashChange);
    }

    setPageFromURL(hash) {
        let pageIsSet = false;

        if (!hash) {
            hash = window.location.hash;
        }

        if (hash != '') {
            for (const page of this._pages) {
                if (hash == page.hash) {
                    pageIsSet = true;
                    this._setPage(page);
                    break;
                }
            }
        }

        if (!pageIsSet) {
            this._setPage(this._index);
            window.removeEventListener('hashchange', this._onHashChange);
            window.location.hash = this._index.hash;
            window.addEventListener('hashchange', this._onHashChange);
        }
    }

    _setPage(page) {
        page.element.willMount(this._root);

        document.title = `${this._title} - ${page.name}`;

        if (this._currentElement) {
            this._currentElement.willUnmount();
            this._root.replaceChild(page.element.rootNode, this._root.firstChild);
        } else {
            this._root.appendChild(page.element.rootNode);
        }

        this._currentElement = page.element;
    }

    //_onHashChange = () => {
    _onHashChange() {
        this.setPageFromURL();
    }
}
