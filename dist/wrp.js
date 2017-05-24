(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["WRP"] = factory();
	else
		root["WRP"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const processCompress_1 = __webpack_require__(6);
const slotGen_1 = __webpack_require__(8);
const processCover_1 = __webpack_require__(7);
const insertMarks_1 = __webpack_require__(4);
const loadAsserts_1 = __webpack_require__(5);
const indexObjGen_1 = __webpack_require__(3);
const sortKeyGen_1 = __webpack_require__(9);
exports.default = {
    processCompress: processCompress_1.default,
    slotGen: slotGen_1.default,
    processCover: processCover_1.default,
    insertMarks: insertMarks_1.default,
    loadAsserts: loadAsserts_1.default,
    indexObjGen: indexObjGen_1.default,
    sortKeyGen: sortKeyGen_1.default,
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function mergeOptions(from, to) {
    return Object.assign({}, from, to);
}
exports.mergeOptions = mergeOptions;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const loaders_1 = __webpack_require__(0);
const utils_1 = __webpack_require__(1);
const presetLoaders = [
    loaders_1.default.processCompress,
    loaders_1.default.slotGen,
    loaders_1.default.processCover,
    loaders_1.default.insertMarks,
    loaders_1.default.loadAsserts,
    loaders_1.default.indexObjGen,
    loaders_1.default.sortKeyGen
];
const defaultOptions = {
    errorPrefix: 'error',
    idPrefix: new Date().getTime().toString(36),
    compress: {
        enable: true,
        needToCompressIdentifier: ['缺少空格', '多余空格'],
    },
    logs: {
        enable: true,
    },
    presetLoaders: {
        enable: true,
        loaders: presetLoaders,
    },
    customLoaders: {
        enable: false,
        loaders: null,
    },
};
class WRP {
    constructor(article, reportJSON, options) {
        this.article = article;
        this.reportJSON = reportJSON;
        this._temp = {
            lastEndIndex: 0,
            compressMarks: [],
        };
        this._data = {
            slots: [],
        };
        this._config = utils_1.mergeOptions(defaultOptions, options);
        let loaders = [];
        if (this._config.presetLoaders.enable) {
            loaders = loaders.concat(this._config.presetLoaders.loaders);
        }
        if (this._config.customLoaders.enable) {
            loaders = loaders.concat(this._config.customLoaders.loaders);
        }
        this.runLoaders(...loaders);
        this.slots = this._data.slots;
        this.marksIndex = this._data.indexObj;
    }
    getSlots() {
        return this.slots;
    }
    getMarksIndex() {
        return this.marksIndex;
    }
    runLoaders(...loaders) {
        var marks = this.reportJSON.marks;
        loaders.forEach((loader) => {
            loader.apply(this, marks);
        });
    }
}
module.exports = WRP;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function indexObjGen(...marks) {
    this._data.indexObj = {
        data: {},
    };
    for (var i = 0; i < marks.length; i++) {
        var mark = marks[i];
        if (this._data.indexObj.data.hasOwnProperty(mark.type)) {
            if (mark.compressCount) {
                this._data.indexObj.data[mark.type].info.explain = mark.typeExplains.join('');
            }
            this._data.indexObj.data[mark.type].marks.push(mark);
        }
        else {
            this._data.indexObj.data[mark.type] = {};
            this._data.indexObj.data[mark.type].marks = [];
            this._data.indexObj.data[mark.type].info = {
                title: mark.isPositive ? "批改解释：" : "错误解释：",
                explain: mark.typeExplains.join(''),
                key: mark.type
            };
            this._data.indexObj.data[mark.type].marks.push(mark);
        }
    }
    return marks;
}
exports.default = indexObjGen;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function insertMarks(...marks) {
    var self = this;
    var freeSlots = [];
    for (var m = 0; m <= this._data.slots.length - 1; m++) {
        var freeSlot = null;
        if (this._data.slots[m - 1] && this._data.slots[m + 1] && this._data.slots[m]) {
            freeSlot = {
                start: this._data.slots[m].end + 1,
                end: this._data.slots[m + 1].start - 1,
            };
        }
        else {
            if (!this._data.slots[m - 1]) {
                freeSlot = {
                    start: 0,
                    end: this._data.slots[m].start - 1,
                };
            }
            if (!this._data.slots[m + 1]) {
                freeSlot = {
                    start: this._data.slots[m].end + 1,
                    end: undefined,
                };
            }
        }
        freeSlots.push(freeSlot);
    }
    var compressMarkInKind = {};
    this._config.compress.needToCompressIdentifier.forEach(function (identifier) {
        compressMarkInKind[identifier] = self._temp.compressMarks.filter(function (mark) {
            return mark.type === identifier;
        });
    });
    var log = [];
    for (var kind in compressMarkInKind) {
        if (compressMarkInKind.hasOwnProperty(kind)) {
            var flag = false;
            for (var i = 0; i <= compressMarkInKind[kind].length - 1; i++) {
                if (!flag) {
                    var curMarkInCurKind = compressMarkInKind[kind][i];
                    for (var j = 0; j <= freeSlots.length - 1; j++) {
                        var curSlot = freeSlots[j];
                        if (curMarkInCurKind.start >= curSlot.start && curMarkInCurKind.end <= curSlot.end) {
                            curMarkInCurKind.typeExplains ? null : curMarkInCurKind.typeExplains = [];
                            if (compressMarkInKind[kind].length > 1) {
                                curMarkInCurKind.typeExplains.push('  全文共有' + compressMarkInKind[kind].length + '处此类错误，请检查');
                            }
                            marks.push(curMarkInCurKind);
                            log.push(Object.assign({ children: [curMarkInCurKind] }, curSlot));
                            flag = true;
                            freeSlots.splice(j, 1);
                            j--;
                            break;
                        }
                    }
                }
            }
        }
    }
    this._data.slots = this._data.slots.concat(log);
    this._data.slots.sort(function (a, b) {
        return a.start - b.start;
    });
    marks.sort(function (a, b) {
        if (a.start !== b.start) {
            return a.start - b.start;
        }
        return a.end - b.end;
    });
    return marks;
}
exports.default = insertMarks;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function preRender(...marks) {
    var self = this;
    marks.map(function (mark, index) {
        mark.id = self._config.errorPrefix + '_' + self._config.basePrefix + '_' + mark.start;
        mark.index = index;
        mark.endFix = mark.isPositive ? '' : '批改建议';
        return mark;
    });
    return marks;
}
exports.default = preRender;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function processCompress(...marks) {
    for (var i = 0; i < marks.length; i++) {
        var mark = marks[i];
        if (this._config.compress.needToCompressIdentifier.indexOf(mark.type) != -1) {
            this._temp.compressMarks.push(mark);
            marks.splice(i, 1);
            i--;
        }
    }
    return marks;
}
exports.default = processCompress;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function processCover(...marks) {
    var result = [];
    for (var i = 0; i < this._data.slots.length; i++) {
        var curSlot = this._data.slots[i];
        if (curSlot.children.length > 1) {
            var maxLevel = Math.max.apply(null, curSlot.children.map(function (child) {
                return child.level;
            }));
            var child = curSlot.children.filter(function (child) {
                return child.level === maxLevel;
            });
            if (child.length > 1) {
                child = child[0];
            }
            else {
                child = child[0];
            }
            result.push(child);
        }
        else {
            result.push(curSlot.children[0]);
        }
    }
    return result;
}
exports.default = processCover;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function slotGen(...marks) {
    const preSlots = [];
    for (var j = 0; j < marks.length; j++) {
        var aMark = marks[j];
        var preSlot = { start: aMark.start, end: aMark.end, children: [], };
        preSlots.push(preSlot);
    }
    for (var i = 0; i < marks.length; i++) {
        var mark = marks[i];
        if (mark.processed) {
            continue;
        }
        var markNext = marks[i + 1] ? marks[i + 1] : undefined;
        var curSlot = Object.assign({}, preSlots[i]);
        this._data.slots.push(curSlot);
        curSlot.children.push(mark);
        mark.processed = true;
        var limit = 15;
        var count = 0;
        var j = i + 1;
        while (count <= limit && ((markNext && markNext.start < mark.end && mark.start != mark.end) || (markNext && markNext.start === mark.start && markNext.end === mark.end) || (markNext && markNext.start <= mark.start && markNext.end >= mark.end))) {
            curSlot.children.push(markNext);
            markNext.processed = true;
            if (markNext.end > mark.end) {
                curSlot.end = markNext.end;
            }
            markNext = marks[j + 1] ? marks[j + 1] : undefined;
            count++;
            j++;
        }
        if (!markNext || mark.start > markNext.start) {
            console.log('break', mark, markNext);
            break;
        }
    }
    return marks;
}
exports.default = slotGen;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function sortKeyGen(...marks) {
    var self = this;
    var arr = this._data.indexObj.sortKeys = Object.keys(this._data.indexObj.data).sort(function (a, b) {
        return self._data.indexObj.data[b].marks.length - self._data.indexObj.data[a].marks.length;
    });
    var temp = [[], []];
    arr.forEach(function (key) {
        var isPositivity = self._data.indexObj.data[key].marks[0].isPositive;
        if (isPositivity) {
            temp[1].push(key);
        }
        else {
            temp[0].push(key);
        }
    });
    this._data.indexObj.sortKeys = temp[0].concat(temp[1]);
    temp = arr = null;
    return marks;
}
exports.default = sortKeyGen;


/***/ })
/******/ ]);
});
//# sourceMappingURL=wrp.js.map