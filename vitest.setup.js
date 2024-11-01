"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@testing-library/jest-dom/vitest");
var react_1 = require("@testing-library/react");
var vitest_1 = require("vitest");
var matchers = require("@testing-library/jest-dom/matchers");
vitest_1.expect.extend(matchers);
(0, vitest_1.afterEach)(function () {
    (0, react_1.cleanup)();
});
