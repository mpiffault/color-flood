
function _addElement(_parent, nature, attributes) {
    var newElement = document.createElement(nature);
    for (var key in attributes) {
        if (attributes.hasOwnProperty(key)) {
            newElement.setAttribute(key, attributes[key]);
        }
    }
    _parent.appendChild(newElement);
    return newElement;
}

function _rgbToHex(R,G,B) {return "#"+_toHex(R)+_toHex(G)+_toHex(B)}
function _toHex(n) {
    n = parseInt(n,10);
    if (isNaN(n)) return "00";
    n = Math.max(0,Math.min(n,255));
    return "0123456789ABCDEF".charAt((n-n%16)/16)
        + "0123456789ABCDEF".charAt(n%16);
}

function _hexToR(h) {return parseInt((_cutHex(h)).substring(0,2),16)}
function _hexToG(h) {return parseInt((_cutHex(h)).substring(2,4),16)}
function _hexToB(h) {return parseInt((_cutHex(h)).substring(4,6),16)}
function _cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
