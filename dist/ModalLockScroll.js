"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_device_detect_1 = require("react-device-detect");
var ModalLockScroll = function () {
    var body = document.querySelector("body");
    var root = document.getElementById("__next");
    var html = document.querySelector("html");
    var scrollPosition = window.scrollY;
    var syncHeight = function () {
        document.documentElement.style.setProperty("height", "".concat(window.innerHeight, "px"));
    };
    (0, react_1.useEffect)(function () {
        if (!body)
            return;
        if (!react_device_detect_1.isMobileSafari)
            return;
        if (!root)
            return;
        if (!html)
            return;
        body.style.position = "fixed";
        body.style.top = "-".concat(scrollPosition, "px");
        body.style.overflow = "hidden";
        body.style.width = "100%";
        root.style.overflow = "unset";
        html.style.height = "".concat(window.innerHeight, "px");
        window.addEventListener("resize", syncHeight);
        return function () {
            if (react_device_detect_1.isMobileSafari) {
                body.style.removeProperty("position");
                body.style.removeProperty("top");
                body.style.removeProperty("overflow");
                body.style.removeProperty("width");
                root.style.removeProperty("overflow");
                html.style.removeProperty("height");
                window.scrollTo(0, scrollPosition);
                window.removeEventListener("resize", syncHeight);
            }
        };
    }, [body, root, html, scrollPosition]);
    return React.createElement(React.Fragment, null);
};
exports.default = ModalLockScroll;
