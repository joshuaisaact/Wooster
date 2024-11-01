"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = render;
var react_1 = require("@testing-library/react");
var react_router_dom_1 = require("react-router-dom");
// Create a custom render function that includes providers
function render(ui, options) {
    if (options === void 0) { options = {}; }
    function Wrapper(_a) {
        var children = _a.children;
        return React.createElement(react_router_dom_1.MemoryRouter, null, children);
    }
    return (0, react_1.render)(ui, __assign({ wrapper: Wrapper }, options));
}
// Re-export everything
// eslint-disable-next-line react-refresh/only-export-components
__exportStar(require("@testing-library/react"), exports);
