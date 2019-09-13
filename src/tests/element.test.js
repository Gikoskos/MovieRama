import {
    buildElement,
    clearChildren
} from '../ui/element';


describe('buildElement', () => {
    it('returns a DOM node of the given type', () => {
        const node = buildElement('figcaption');

        expect(node instanceof Element).toBeTruthy();
        expect(node.nodeName).toBe('FIGCAPTION');
    });

    it('sets a single classname string', () => {
        const node = buildElement('div', 'my-class');

        expect(node.className).toBe('my-class');
    });

    it('sets an array of classnames', () => {
        const classnames = [
            'my-class',
            'my-other-class',
            'my-other-other-class'
        ];
        const node = buildElement('div', classnames);

        node.classList.forEach((classname, key) => {
            expect(classname).toBe(classnames[key]);
        });
    });

    it('sets a parent', () => {
        const p = buildElement('div');
        const c = buildElement('span', null, p);

        expect(c.parentNode).toEqual(p);
    });

    it('sets attributes', () => {
        const c = buildElement('input', null, null, {
            textContent: 'hello world',
            attr: {
                type: 'text'
            }
        });

        expect(c.textContent).toBe('hello world');
        expect(c.getAttribute('type')).toBe('text');
    });
});

describe('clearChildren', () => {
    it('removes all children', () => {
        const p = buildElement('div');

        buildElement('span', null, p);
        buildElement('span', null, p);
        buildElement('span', null, p);

        expect(p.childElementCount).toBe(3);
        clearChildren(p);
        expect(p.childElementCount).toBe(0);
    });
});
