import { buildElement } from './element';
import t from '../common/types';

export default class NavBar {

    constructor(pages, rootNode) {
        //minimal typechecking
        if (!t.isArray(pages)) {
            throw new Error("NavBar:constructor: pages expected to be array");
        }

        this._navNode = buildElement('nav', null, rootNode);
        this._logoNode = buildElement('div', [
            'header-logo',
            'blur-focus-in'
        ], this._navNode);
        this._listNode = buildElement('ul', null, this._navNode);


        for (const page of pages) {
            let listItemNode = buildElement('li', null, this._listNode);

            buildElement('a', 'blur-focus-in', listItemNode, {
                attr: {
                    href: page.hash,
                },
                textContent: page.name
            });
        }
    }

    get rootNode() {
        return this._navNode;
    }
}
