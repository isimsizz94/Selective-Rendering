const mergeAttributes = (toElement, fromElement) => {
    const toElementAttrs = toElement.attributes;
    const fromElementAttrs = fromElement.attributes;

    for (let i = 0; i < toElementAttrs.length; i++) { // remove redundant attr
        const attr = toElementAttrs[i];

        if (fromElement.getAttribute(attr.name) === null) {
            toElement.removeAttribute(attr.name);
        }
    }

    for (let i = 0; i < fromElementAttrs.length; i++) { // create attr if need it
        const attr = fromElementAttrs[i];

        if (toElement.getAttribute(attr.name) === null) {
            toElement.setAttribute(attr.name, attr.value);
        }
    }

    for (let i = 0; i < toElementAttrs.length; i++) { // update attr value
        const attr = toElementAttrs[i];

        const attr1Value = toElement.getAttribute(attr.name);
        const attr2Value = fromElement.getAttribute(attr.name);

        if (attr1Value !== attr2Value) {
            console.log(attr1Value, attr2Value);
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

    {
        const fromElementNodesCount = fromElement.childNodes.length;
        const toElementNodesCount = toElement.childNodes.length;
        for (let i = fromElementNodesCount; i < toElementNodesCount; i--) {
            toElement.lastChild.remove();
        }
    }

    if (toElement.nodeType !== fromElement.nodeType || toElement.tagName !== fromElement.tagName) {
        toElement.parentNode.replaceChild(fromElement.cloneNode(true), toElement);
        return;
    }

    mergeAttributes(toElement, fromElement);

    const toChildNodes = [].slice.call(toElement.childNodes);
    const fromChildNodes = [].slice.call(fromElement.childNodes);

    for (let i = 0; i < fromChildNodes.length; i++) {
        const toChildNode = toChildNodes[i];
        const fromChildNode = fromChildNodes[i];

        if (!toChildNode) {
            toElement.appendChild(fromChildNode.cloneNode(true));
            continue;
        }

        if (toChildNode.nodeType !== fromChildNode.nodeType || toChildNode.tagName !== fromChildNode.tagName) {
            toElement.replaceChild(fromChildNode.cloneNode(true), toChildNode);
            continue;
        }

        if (toChildNode.attributes) mergeAttributes(toChildNode, fromChildNode);

        if (toChildNode.nodeName === "#text") mergeTextNode(toChildNode, fromChildNode);

        if (toChildNode.childNodes.length || fromChildNode.childNodes.length) {
            render(toChildNode, fromChildNode);
        }
    }
}