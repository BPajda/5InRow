/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/board.ts":
/*!******************************!*\
  !*** ./src/modules/board.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _pole__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pole */ "./src/modules/pole.ts");
/* harmony import */ var _pathFinding__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pathFinding */ "./src/modules/pathFinding.ts");
/* harmony import */ var _kula__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./kula */ "./src/modules/kula.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config */ "./src/modules/config.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Board = /** @class */ (function () {
    function Board() {
        this.el = document.getElementById("board");
        this.pre = document.getElementById("priev");
        this.wyn = document.getElementById("wynik");
        this.wyn.innerHTML = "0";
        this.end = document.getElementById("end");
        this.endwynik = document.getElementById("endwynik");
        this.reset = document.getElementById("reset");
        this.fieldList = [];
        this.pathFind = new _pathFinding__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.path = [];
        this.moveable = true;
        this.boardCreate();
        this.wynik = 0;
        this.kolory = _config__WEBPACK_IMPORTED_MODULE_3__.config.kolory;
        this.prievKol = [];
        this.prievNext();
    }
    /** metoda na tworzenie borda */
    Board.prototype.boardCreate = function () {
        var _this = this;
        for (var x_1 = 0; x_1 < 9; x_1++) {
            var _loop_1 = function (y_1) {
                var pole = new _pole__WEBPACK_IMPORTED_MODULE_0__["default"](x_1, y_1);
                this_1.fieldList.push(pole);
                pole.div.onclick = function () {
                    if (_this.moveable == true) {
                        if (_this.startField == undefined) {
                            if (pole.cool == false) {
                                var check = _this.checkDoAround(pole);
                                if (check) {
                                    _this.startField = pole;
                                    _this.startField.child.addClass("biggerKulka");
                                }
                            }
                        }
                        else {
                            if (pole != _this.startField) {
                                if (_this.endField) {
                                    if (_this.endField.cool == true) {
                                        var move = _this.moveBall();
                                        if (move == true) {
                                            _this.moveable = false;
                                            var zbite = _this.LookingALL();
                                            if (zbite == false) {
                                                _this.prievNext();
                                                _this.LookingALL();
                                                var luz = [];
                                                for (var i = 0; i < _this.fieldList.length; i++) {
                                                    if (_this.fieldList[i].cool == true) {
                                                        luz.push(_this.fieldList[i]);
                                                    }
                                                }
                                                if (luz.length < 3) {
                                                    _this.endGame();
                                                }
                                            }
                                            _this.wyn.innerHTML = _this.wynik.toString();
                                            _this.startField = undefined;
                                            _this.endField = undefined;
                                            setTimeout(function () {
                                                _this.fieldList.forEach(function (el) {
                                                    el.clear();
                                                });
                                                _this.moveable = true;
                                            }, _this.czas ? _this.czas : 1000);
                                        }
                                    }
                                    else {
                                        var check = _this.checkDoAround(_this.endField);
                                        _this.startField.child.removeClass("biggerKulka");
                                        if (check) {
                                            _this.startField = _this.endField;
                                            _this.startField.child.addClass("biggerKulka");
                                        }
                                        _this.fieldList.forEach(function (el) {
                                            el.clear();
                                        });
                                    }
                                }
                                else {
                                    if (pole.cool == false) {
                                        var check = _this.checkDoAround(pole);
                                        _this.startField.child.removeClass("biggerKulka");
                                        if (check) {
                                            _this.startField = pole;
                                            _this.startField.child.addClass("biggerKulka");
                                        }
                                    }
                                    else {
                                        _this.startField.child.removeClass("biggerKulka");
                                        _this.startField = undefined;
                                    }
                                    _this.endField = undefined;
                                    _this.fieldList.forEach(function (el) {
                                        el.clear();
                                    });
                                }
                            }
                            else {
                                _this.startField.child.removeClass("biggerKulka");
                                _this.startField = undefined;
                                _this.endField = undefined;
                                _this.fieldList.forEach(function (el) {
                                    el.clear();
                                });
                            }
                        }
                    }
                };
                pole.div.onmouseover = function () {
                    if (_this.moveable == true) {
                        _this.path = [];
                        if (pole.cool == true) {
                            if (_this.startField && pole != _this.startField) {
                                _this.endField = pole;
                                _this.fieldList.forEach(function (el) {
                                    el.clear();
                                });
                                _this.pathFinding();
                            }
                        }
                        else {
                            _this.fieldList.forEach(function (el) {
                                el.clear();
                            });
                            _this.endField = undefined;
                        }
                    }
                };
                this_1.el.appendChild(pole.div);
            };
            var this_1 = this;
            for (var y_1 = 0; y_1 < 9; y_1++) {
                _loop_1(y_1);
            }
        }
    };
    /** metoda na tworzenie kul kolejnych */
    Board.prototype.priev = function () {
        this.pre.innerHTML = "";
        for (var i = 0; i < 3; i++) {
            var kula = new _kula__WEBPACK_IMPORTED_MODULE_2__["default"](this.prievKol[i]);
            this.pre.appendChild(kula.div);
        }
    };
    /** metoda na przenoszenie kul na borda */
    Board.prototype.prievNext = function () {
        if (this.prievKol.length == 0) {
            for (var i = 0; i < 3; i++) {
                var iterator = Math.floor(Math.random() * this.kolory.length);
                var kolor = this.kolory[iterator];
                this.prievKol.push(kolor);
            }
        }
        this.playBalls();
        this.prievKol = [];
        for (var i = 0; i < 3; i++) {
            var iterator = Math.floor(Math.random() * this.kolory.length);
            var kolor = this.kolory[iterator];
            this.prievKol.push(kolor);
        }
        this.priev();
    };
    /** metoda na bawienie sie kulkami */
    Board.prototype.playBalls = function () {
        var luz = [];
        for (var i = 0; i < this.fieldList.length; i++) {
            if (this.fieldList[i].cool == true) {
                luz.push(this.fieldList[i]);
            }
        }
        if (luz.length < 3) {
            this.endGame();
        }
        var chosens = [];
        for (var i = 0; i < 3; i++) {
            var iterator = Math.floor(Math.random() * luz.length);
            chosens.push(luz[iterator]);
            luz.splice(iterator, 1);
        }
        for (var i = 0; i < chosens.length; i++) {
            chosens[i].addBall(new _kula__WEBPACK_IMPORTED_MODULE_2__["default"](this.prievKol[i]));
        }
    };
    Board.prototype.endGame = function (bool) {
        var _this = this;
        if (bool === void 0) { bool = false; }
        if (bool == true) {
            this.end.style.backgroundColor = "pink";
        }
        this.end.style.display = 'flex';
        this.endwynik.innerHTML = "Twoj wynik to: " + this.wynik;
        var button = document.createElement("button");
        button.onclick = function () {
            _this.el.innerHTML = "";
            _this.pre.innerHTML = "";
            _this.wyn.innerHTML = "0";
            _this.wynik = 0;
            _this.fieldList = [];
            _this.boardCreate();
            _this.prievNext();
            _this.end.style.display = 'none';
        };
        button.innerHTML = "reset";
        this.reset.innerHTML = "";
        this.reset.appendChild(button);
    };
    /** metoda na szukanie powolania zyciowego */
    Board.prototype.pathFinding = function () {
        if (this.startField && this.endField) {
            this.path = this.pathFind.trasa(this.fieldList, this.startField, this.endField);
            if (this.path) {
                this.path.forEach(function (el) {
                    el.addClass("path");
                });
            }
        }
    };
    /**
     * metoda na poruszanie swoimi kulami
     * @returns zwraca true false
     */
    Board.prototype.moveBall = function () {
        if (this.startField && this.endField) {
            if (this.path && this.path.length != 0) {
                this.startField.child.removeClass("biggerKulka");
                var zez = this.startField.removeBall();
                this.endField.addBall(zez);
                return true;
            }
        }
        return false;
    };
    /**
     * metoda na szukanie obcych kul w okolicy
     * @param pole przyjmuje pole do szukania
     * @returns zwraca true false
     */
    Board.prototype.checkDoAround = function (pole) {
        if (pole) {
            var index = pole.x * 9 + pole.y;
            var somsiedzi = [];
            if (index - 9 >= 0) {
                somsiedzi.push(this.fieldList[index - 9]);
            }
            if (index + 9 < 81) {
                somsiedzi.push(this.fieldList[index + 9]);
            }
            if ((index - 1) % 9 != 8 && index - 1 >= 0) {
                somsiedzi.push(this.fieldList[index - 1]);
            }
            if ((index + 1) % 9 != 0 && index + 1 < 81) {
                somsiedzi.push(this.fieldList[index + 1]);
            }
            var bullBenek_1 = false;
            somsiedzi.forEach(function (el) {
                if (el.cool == true) {
                    bullBenek_1 = true;
                }
            });
            return bullBenek_1;
        }
        else {
            return false;
        }
    };
    /**
     * metoda szukajaca kolejnych kul w lini w ramach przygotowania do zbijania
     * @returns zwraca true false
     */
    Board.prototype.LookingALL = function () {
        var udane;
        var bicie = [];
        var pion = [];
        var poziom = [];
        var skoslewo = [];
        var skosprawo = [];
        var len = 9;
        for (var z = 0; z < 2 * len - 1; z++) {
            var x_2 = Math.max(0, -(len - 1) + z);
            var y_2 = Math.max(0, (len - 1) - z);
            skoslewo[z] = [];
            while (y_2 < len && x_2 < len) {
                var index = y_2 * len + x_2;
                skoslewo[z].push(this.fieldList[index]);
                x_2++;
                y_2++;
            }
        }
        for (var z = 0; z < 2 * len - 1; z++) {
            var x_3 = len - 1 - Math.max(0, -(len - 1) + z);
            var y_3 = Math.max(0, (len - 1) - z);
            skosprawo[z] = [];
            while (y_3 < len && x_3 >= 0) {
                var index = y_3 * len + x_3;
                skosprawo[z].push(this.fieldList[index]);
                x_3--;
                y_3++;
            }
        }
        for (var i = 0; i < 9; i++) {
            poziom[i] = [];
            for (var z = 0; z < 9; z++) {
                var index = i * 9 + z;
                poziom[i].push(this.fieldList[index]);
            }
        }
        for (var i = 0; i < 9; i++) {
            pion[i] = [];
            for (var z = 0; z < 9; z++) {
                var index = z * 9 + i;
                pion[i].push(this.fieldList[index]);
            }
        }
        var pionTab = this.dodawaieDoBicia(pion);
        bicie.push.apply(bicie, pionTab);
        var poziomTab = this.dodawaieDoBicia(poziom);
        bicie.push.apply(bicie, poziomTab);
        var skosLTab = this.dodawaieDoBicia(skoslewo);
        bicie.push.apply(bicie, skosLTab);
        var skosPTab = this.dodawaieDoBicia(skosprawo);
        bicie.push.apply(bicie, skosPTab);
        bicie = bicie.filter(function (thing, index, self) {
            return index === self.findIndex(function (t) { return (t === thing); });
        });
        udane = false;
        for (var i = 0; i < bicie.length; i++) {
            bicie[i].removeBall();
            udane = true;
        }
        this.wynik += bicie.length;
        return udane;
    };
    /**
     * metoda na ustawianie kul do odstrzału
     * @param lista lista pól
     * @returns zwraca tablice pól
     */
    Board.prototype.dodawaieDoBicia = function (lista) {
        var ilo = _config__WEBPACK_IMPORTED_MODULE_3__.config.ile;
        var dozbicia = [];
        for (var j = 0; j < lista.length; j++) {
            var tab = [];
            var kol = "";
            for (var k = 0; k < lista[j].length; k++) {
                var pole = lista[j][k];
                if (pole.cool == true) {
                    if (tab.length >= ilo) {
                        dozbicia.push.apply(dozbicia, tab);
                    }
                    tab = [];
                    kol = "";
                }
                else {
                    if (pole.child.kolor != kol) {
                        if (tab.length >= ilo) {
                            dozbicia.push.apply(dozbicia, tab);
                            tab = [];
                            kol = pole.child.kolor;
                        }
                        else {
                            tab = [];
                            kol = pole.child.kolor;
                        }
                        if (kol == "") {
                            kol = pole.child.kolor;
                        }
                    }
                    if (pole.child.kolor == kol) {
                        tab.push(pole);
                    }
                }
                if (tab.length >= ilo) {
                    dozbicia.push.apply(dozbicia, tab);
                }
            }
        }
        dozbicia = dozbicia.filter(function (thing, index, self) {
            return index === self.findIndex(function (t) { return (t === thing); });
        });
        return dozbicia;
    };
    __decorate([
        ending,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Boolean]),
        __metadata("design:returntype", void 0)
    ], Board.prototype, "endGame", null);
    Board = __decorate([
        timer,
        __metadata("design:paramtypes", [])
    ], Board);
    return Board;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Board);
function timer(target) {
    var original = target;
    var construct = function (constructor, args) {
        var c = function () {
            this.czas = 1000;
            return constructor.apply(this, args);
        };
        c.prototype = constructor.prototype;
        c.prototype.toString = function () {
        };
        return new c();
    };
    var newConstructor = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return construct(original, args);
    };
    newConstructor.prototype = original.prototype;
    return newConstructor;
}
function ending(target, key, descriptor) {
    var originalValue = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args[0] = true;
        var result = originalValue.apply(this, args);
        return result;
    };
    return descriptor;
}


/***/ }),

/***/ "./src/modules/config.ts":
/*!*******************************!*\
  !*** ./src/modules/config.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config)
/* harmony export */ });
var config = {
    kolory: [
        'green',
        'red',
        'yellow',
        'blue',
        'pink',
        'violet',
        'grey',
    ],
    ile: 5
};


/***/ }),

/***/ "./src/modules/kula.ts":
/*!*****************************!*\
  !*** ./src/modules/kula.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Kula = /** @class */ (function () {
    function Kula(kolor) {
        this.div = document.createElement("div");
        this.div.classList.add("kulka");
        this.kolor = kolor;
        this.div.classList.add(this.kolor);
    }
    Kula.prototype.addClass = function (nazwa) {
        this.div.classList.add(nazwa);
    };
    Kula.prototype.removeClass = function (nazwa) {
        this.div.classList.remove(nazwa);
    };
    return Kula;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Kula);


/***/ }),

/***/ "./src/modules/pathFinding.ts":
/*!************************************!*\
  !*** ./src/modules/pathFinding.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var PathFinding = /** @class */ (function () {
    function PathFinding() {
        this.doSprawdzenia = [];
        this.sprawdzone = [];
    }
    PathFinding.prototype.trasa = function (list, start, end) {
        var _this = this;
        var wszystkie = list;
        this.doSprawdzenia = [start];
        this.sprawdzone = [];
        var _loop_1 = function () {
            var sortedOne = this_1.doSprawdzenia.sort(function (a, b) {
                return a.f_cost - b.f_cost;
            });
            var filtered = sortedOne.filter(function (el, i, a) {
                if (el.f_cost == a[0].f_cost) {
                    return el;
                }
            });
            var sortedTwo = filtered.sort(function (a, b) {
                return a.h_cost - b.h_cost;
            });
            var current = sortedTwo[0];
            this_1.doSprawdzenia.splice(this_1.doSprawdzenia.indexOf(current), 1);
            this_1.sprawdzone.push(current);
            if (current == end) {
                return { value: this_1.znalezione(current) };
            }
            else {
                var index = current.x * 9 + current.y;
                var somsiedzi = [];
                if (index - 9 >= 0) {
                    somsiedzi.push(wszystkie[index - 9]);
                }
                if (index + 9 < 81) {
                    somsiedzi.push(wszystkie[index + 9]);
                }
                if ((index - 1) % 9 != 8 && index - 1 >= 0) {
                    somsiedzi.push(wszystkie[index - 1]);
                }
                if ((index + 1) % 9 != 0 && index + 1 < 81) {
                    somsiedzi.push(wszystkie[index + 1]);
                }
                somsiedzi.forEach(function (el) {
                    if (el.cool == true && _this.sprawdzone.indexOf(el) == -1) {
                        var n_cost = el.fieldToField(end) + current.g_cost + 1;
                        if (n_cost < el.f_cost || el.f_cost == 0 || _this.doSprawdzenia.indexOf(el) == -1) {
                            el.setCost(current.g_cost + 1, el.fieldToField(end));
                            el.parent = current;
                            if (_this.doSprawdzenia.indexOf(el) == -1) {
                                _this.doSprawdzenia.push(el);
                            }
                        }
                    }
                });
            }
        };
        var this_1 = this;
        while (this.doSprawdzenia.length > 0) {
            var state_1 = _loop_1();
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    PathFinding.prototype.znalezione = function (pole) {
        var tab = [];
        while (pole.parent) {
            tab.push(pole);
            pole = pole.parent;
        }
        tab.push(pole);
        return tab;
    };
    return PathFinding;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PathFinding);


/***/ }),

/***/ "./src/modules/pole.ts":
/*!*****************************!*\
  !*** ./src/modules/pole.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Pole = /** @class */ (function () {
    function Pole(x, y) {
        this.div = document.createElement("div");
        this.div.classList.add("divek");
        this.x = x;
        this.y = y;
        this.f_cost = 0;
        this.g_cost = 0;
        this.h_cost = 0;
        this.cool = true;
    }
    Pole.prototype.setCost = function (g_cost, h_cost) {
        this.g_cost = g_cost;
        this.h_cost = h_cost;
        this.f_cost = g_cost + h_cost;
    };
    Pole.prototype.fieldToField = function (pole) {
        var distance = Math.abs(pole.x - this.x) + Math.abs(pole.y - this.y);
        return distance;
    };
    Pole.prototype.clear = function () {
        this.f_cost = 0;
        this.g_cost = 0;
        this.h_cost = 0;
        this.parent = undefined;
        this.removeClass("path");
    };
    Pole.prototype.addClass = function (nazwa) {
        this.div.classList.add(nazwa);
    };
    Pole.prototype.removeClass = function (nazwa) {
        this.div.classList.remove(nazwa);
    };
    Pole.prototype.addBall = function (kula) {
        this.div.appendChild(kula.div);
        this.child = kula;
        this.cool = false;
        kula.parent = this;
    };
    Pole.prototype.removeBall = function () {
        this.div.removeChild(this.child.div);
        var lostChild = this.child;
        this.child.parent = undefined;
        this.child = undefined;
        this.cool = true;
        return lostChild;
    };
    return Pole;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pole);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/board */ "./src/modules/board.ts");

new _modules_board__WEBPACK_IMPORTED_MODULE_0__["default"]();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map