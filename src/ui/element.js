import t from '../common/types';

/**
 * Creates a new DOM element.
 * @param {string} nodeName 
 * @param {[]string | string} classNames Class names.
 * @param {Element} parentNode Parent node to append the new element on.
 * @param {object} attributes
 * @param {string} attributes.textContent
 * @param {Attr} attributes.attr
 * @returns {Element}
 */
function buildElement(nodeName, classNames, parentNode, attributes) {
    if (!t.isString(nodeName)) {
        throw new Error('buildElement: nodeName expected to be string');
    }

    let newNode = document.createElement(nodeName);

    if (t.isArray(classNames)) {
        for (const className of classNames) {
            newNode.classList.add(className);
        }

    } else if (t.isString(classNames)) {
        newNode.className = classNames;
    }
    
    if (parentNode && t.isFunc(parentNode.appendChild)) {
        parentNode.appendChild(newNode);
    }

    if (attributes) {
        if (attributes.textContent) {
            newNode.textContent = attributes.textContent;
        }

        for (const attrName in attributes.attr) {
            newNode.setAttribute(attrName, attributes.attr[attrName]);
        }
    }

    return newNode;
}

/**
 * Clears the children from element.
 * @param {Element} element 
 */
function clearChildren(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }

    //PRO TIP: Never use innerHTML to clear out node children instantly.
    //This small line produced memory leaks that were hard to debug.
    //element.innerHTML = '';
}

export {
    buildElement,
    clearChildren
};
