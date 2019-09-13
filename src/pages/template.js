import { buildElement } from '../ui/element';

/**
 * TemplatePage defines a mockup for a routed page, that is
 * mounted/unmounted when the route changes.
 * The idea for using lifecycle methods comes from the older
 * versions of React.
 */
export default class TemplatePage {
    constructor() {
        this._root = buildElement('div');
    }

    willMount() {

    }

    willUnmount() {
        
    }

    get rootNode() {
        return this._root;
    }
}
