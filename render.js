const mergeAttributes = (toElement, fromElement) => {
    const toElementAttrs = toElement.attributes;
    const fromElementAttrs = fromElement.attributes;

    for (let i = 0; i < toElementAttrs.length; i++) { // remove redundant attr
        const attr = toElementAttrs[i];

        if (!fromElementAttrs.getNamedItem(attr.name)) {
            toElementAttrs.removeNamedItem(attr.name);
        }
    }

    for (let i = 0; i < fromElementAttrs.length; i++) { // create attr if need it
        const attr = fromElementAttrs[i];

        if (!toElementAttrs.getNamedItem(attr.name)) {
            toElement.setAttribute(attr.name, attr.value);
        }
    }

    for (let i = 0; i < toElementAttrs.length; i++) { // update attr value
        const attr = toElementAttrs[i];

        const attr1Value = toElementAttrs.getNamedItem(attr.name).value;
        const attr2Value = fromElementAttrs.getNamedItem(attr.name).value;

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

    while (toElement.childNodes.length > fromElement.childNodes.length) {
        toElement.lastChild.remove();
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
        if (toChildNode.nodeType !== fromChildNode.nodeType) {
            toChildNode.remove();
            toElement.appendChild(fromChildNode.cloneNode(true));
            continue;
        }

        if (toChildNode.attributes) mergeAttributes(toChildNode, fromChildNode);

        if (toChildNode.nodeName === "#text") mergeTextNode(toChildNode, fromChildNode);

        if (toChildNode.value !== fromChildNode.value) { // input cases
            toChildNode.value = fromChildNode.value;
        }

        if (fromChildNode.childNodes.length || toChildNode.childNodes.length) {
            render(toChildNode, fromChildNode);
        }
    }
}