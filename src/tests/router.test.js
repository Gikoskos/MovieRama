import AppRouter from '../common/router';
import TemplatePage from '../pages/template';
import { buildElement } from '../ui/element';

describe('AppRouter', () => {
    const pages = [
        {
            name: 'Page 1',
            hash: '#page1',
            element: new TemplatePage(),
        },
        {
            name: 'Page 2',
            hash: '#page2',
            element: new TemplatePage()
        },
        {
            name: 'Page 3',
            hash: '#page3',
            element: new TemplatePage()
        }
    ], title = 'MyPage';

    let router, root;

    for (const page of pages) {
        page.element.willMount = jest.fn();
        page.element.willUnmount = jest.fn();
    }

    beforeEach(() => {
        root = buildElement('div');
        router = new AppRouter(pages, title, root);
    });

    it('sets the page URL hash to index hash on invalid URL hash', () => {
        //should have used a mock class here but no time to set it up
        /*window.dispatchEvent(new HashChangeEvent("hashchange", {
            oldURL: '',
            newURL: ''
        }));*/
        router.setPageFromURL('');
        expect(window.location.hash).toBe(pages[0].hash);

        router.setPageFromURL('#invalidhash');
        expect(window.location.hash).toBe(pages[0].hash);
    });

    it('sets the page title', () => {
        router.setPageFromURL(pages[1].hash);

        expect(document.title).toBe(`${title} - ${pages[1].name}`);
    });

    it('switches between pages', () => {
        router.setPageFromURL(pages[1].hash);

        expect(root.firstChild).toEqual(pages[1].element.rootNode);

        router.setPageFromURL(pages[0].hash);

        expect(root.firstChild).toEqual(pages[0].element.rootNode);

        router.setPageFromURL(pages[1].hash);

        expect(root.firstChild).toEqual(pages[1].element.rootNode);
    });

    it('calls willMount/willUnmount when page is mounted/unmounted', () => {
        router.setPageFromURL(pages[1].hash);
        expect(pages[1].element.willMount).toHaveBeenCalled();

        router.setPageFromURL(pages[2].hash);
        expect(pages[1].element.willUnmount).toHaveBeenCalled();
        expect(pages[2].element.willMount).toHaveBeenCalled();

        router.setPageFromURL(pages[0].hash);
        expect(pages[2].element.willUnmount).toHaveBeenCalled();
        expect(pages[0].element.willMount).toHaveBeenCalled();
    });
});
