/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./\u0000#src/js/main.js":
/*!**************************!*\
  !*** ./ #src/js/main.js ***!
  \**************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _module_helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module/helpers.js */ \"./\\u0000#src/js/module/helpers.js\");\n\n\n//# sourceURL=webpack://gulp-starter/./%00#src/js/main.js?");

/***/ }),

/***/ "./\u0000#src/js/module/helpers.js":
/*!************************************!*\
  !*** ./ #src/js/module/helpers.js ***!
  \************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\nlet ua = window.navigator.userAgent;\r\nlet msie = ua.indexOf(\"MSIE \");\r\nlet isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };\r\nfunction isIE() {\r\n\tua = navigator.userAgent;\r\n\tlet is_ie = ua.indexOf(\"MSIE \") > -1 || ua.indexOf(\"Trident/\") > -1;\r\n\treturn is_ie;\r\n}\r\n\r\nif (isIE()) {\r\n\tdocument.querySelector('body').classList.add('ie');\r\n}\r\n\r\nif (isMobile.any()) {\r\n\tdocument.querySelector('body').classList.add('_touch');\r\n}\r\n\r\nlet unlock = true;\r\n\r\n//=========WebP========\r\n\r\nfunction testWebP(callback) {\r\n\tlet webP = new Image();\r\n\twebP.onload = webP.onerror = function () {\r\n\t\tcallback(webP.height == 2);\r\n\t};\r\n\twebP.src = \"data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA\";\r\n}\r\n\r\ntestWebP(function (support) {\r\n\tif (support == true) {\r\n\t\tdocument.querySelector('body').classList.add('_webp');\r\n\t} else {\r\n\t\tdocument.querySelector('body').classList.add('_no-webp');\r\n\t}\r\n});\r\n\r\n// ActionsOnHash\r\nif (location.hash) {\r\n\tconst hsh = location.hash.replace('#', '');\r\n\tif (document.querySelector('.popup_' + hsh)) {\r\n\t\tpopup_open(hsh);\r\n\t} else if (document.querySelector('div.' + hsh)) {\r\n\t\t_goto(document.querySelector('.' + hsh), 500, '');\r\n\t}\r\n}\r\n\r\n//=======ibg==========\r\n\r\nfunction ibg() {\r\n\tif (isIE()) {\r\n\t\tlet ibg = document.querySelectorAll(\"._ibg\");\r\n\t\tfor (let i = 0; i < ibg.length; i++) {\r\n\t\t\tif (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {\r\n\t\t\t\tibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n}\r\nibg();\n\n//# sourceURL=webpack://gulp-starter/./%00#src/js/module/helpers.js?");

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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./\u0000#src/js/main.js");
/******/ 	
/******/ })()
;