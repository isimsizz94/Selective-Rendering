const mergeAttributes = (toElement, fromElement) => {
    const toElementAttrs = toElement.attributes;
    const fromElementAttrs = fromElement.attributes;

    for (let i = 0; i < toElementAttrs.length; i++) { // remove unnecessary attr
        const attr = toElementAttrs[i];

        if (fromElement.getAttribute(attr.name) === null) {
            toElement.removeAttribute(attr.name);
        }
    }

    for (let i = 0; i < fromElementAttrs.length; i++) { // create attr if need it
        const attr = fromElementAttrs[i];

        if (!toElement.hasAttribute(attr.name)) {
            toElement.setAttribute(attr.name, attr.value);
        }
    }

    for (let i = 0; i < toElementAttrs.length; i++) { // update attr value
        const attr = toElementAttrs[i];

        const attr1Value = toElement.getAttribute(attr.name);
        const attr2Value = fromElement.getAttribute(attr.name);

        if (attr1Value !== attr2Value) {
            toElement.setAttribute(attr.name, attr2Value);
        }
    }
};

const mergeTextNode = (toNode, fromNode) => {
    if (toNode.data !== fromNode.data) {
        toNode.data = fromNode.data;
    }
};

export const render = (toElement, fromElement) => {
    // toElement.outerHTML = fromElement.outerHTML; :)
    if (toElement.nodeType !== fromElement.nodeType || toElement.tagName !== fromElement.tagName) {
        toElement.parentNode.replaceChild(fromElement.cloneNode(true), toElement);
        return;
    }

    { // remove unnecessary child
        const fromElementNodesCount = fromElement.childNodes.length;
        const toElementNodesCount = toElement.childNodes.length;

        for (let i = 0; i < toElementNodesCount; i++) {
            if (i > fromElementNodesCount) toElement.lastChild.remove();
        }
    }

    if (toElement.attributes) mergeAttributes(toElement, fromElement);
    if (toElement.nodeName === "#text") mergeTextNode(toElement, fromElement);

    const toChildNodes = [].slice.call(toElement.childNodes); // cast dynamic NodeList to Array
    const fromChildNodes = [].slice.call(fromElement.childNodes); // cast dynamic NodeList to Array

    for (let i = 0; i < fromChildNodes.length; i++) {
        const toChildNode = toChildNodes[i];
        const fromChildNode = fromChildNodes[i];

        if (!toChildNode) {
            toElement.appendChild(fromChildNode.cloneNode(true));
            continue;
        }

        render(toChildNode, fromChildNode);
    }
}