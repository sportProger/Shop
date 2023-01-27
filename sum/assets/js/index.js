/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./assets/ts/index.ts","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./assets/sass/index.sass":
/*!**********************************************************************************************************************************************************************!*\
  !*** ../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./assets/sass/index.sass ***!
  \**********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./assets/sass/index.sass?../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./assets/sass/index.sass":
/*!********************************!*\
  !*** ./assets/sass/index.sass ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./index.sass */ \"../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./assets/sass/index.sass\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./assets/sass/index.sass?");

/***/ }),

/***/ "./assets/ts/index.ts":
/*!****************************!*\
  !*** ./assets/ts/index.ts ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var reset_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reset.css */ \"../node_modules/reset.css/reset.css\");\n/* harmony import */ var reset_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reset_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _sass_index_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sass/index.sass */ \"./assets/sass/index.sass\");\n/* harmony import */ var _sass_index_sass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_sass_index_sass__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar girdBlocksElem = document.querySelectorAll('.grid__block'),\n  signElem = document.querySelector('.sign'),\n  countElem = document.querySelector('.count'),\n  resultElem = document.querySelector('.result__text'),\n  userResultElem = document.querySelector('.user-result'),\n  amount = girdBlocksElem.length,\n  amountSelectedItem = 0,\n  sign = '+',\n  result = 0,\n  userResult = 0,\n  config = {\n    minGeneration: 0,\n    maxGeneration: 30\n  };\nfunction generateRound(min, max, amount) {\n  var array = [];\n  var expArr = [0];\n  for (var i = 0; i <= amount - 1; i++) {\n    var num = random(min, max, expArr);\n    expArr.push(num);\n    array.push(num);\n  }\n  var signs = ['+', '-', '*'];\n  sign = signs[random(0, signs.length - 1, [-10000])];\n  if (sign == '*') {\n    result = 1;\n    userResult = 1;\n  } else {\n    result = 0;\n    userResult = 0;\n  }\n  console.log(array);\n  var arrayCopy = array.slice();\n  var expeptionArray = [];\n  for (var _i = 0; _i <= Math.sqrt(amount) - 1; _i++) {\n    var number = arrayCopy[random(0, arrayCopy.length - 1, expeptionArray)];\n    if (sign == '+') result += number;\n    if (sign == '-') result -= number;\n    if (sign == '*') result *= number;\n    var numberIndex = arrayCopy.indexOf(number);\n    expeptionArray.push(numberIndex);\n    arrayCopy.splice(numberIndex, 1);\n    console.log(number, Math.sqrt(amount));\n  }\n  console.log(arrayCopy);\n  console.log(sign);\n  return array;\n}\nfunction random(min, max, exp) {\n  var n;\n  var exponent = Array.isArray(exp) ? exp : [isNaN(exp) ? min - 1 : exp];\n  while (true) {\n    n = Math.floor(Math.random() * (max - min + 1)) + min;\n    if (exponent.indexOf(n) < 0) return n;\n  }\n}\nfunction showRound() {\n  var numbers = generateRound(config.minGeneration, config.maxGeneration, amount);\n  for (var i = 0; i <= numbers.length - 1; i++) {\n    girdBlocksElem[i].innerHTML = String(numbers[i]);\n  }\n  update();\n  console.log(config.minGeneration, ' - mingeneration');\n  console.log(config.maxGeneration, ' - maxgeneration');\n}\nfunction itemIsActive(item) {\n  return item.classList.contains('grid__block_select') ? true : false;\n}\nfunction setSelection(item) {\n  if (amountSelectedItem < Math.sqrt(amount) && amountSelectedItem >= 0) {\n    amountSelectedItem += 1;\n    item.classList.add('grid__block_select');\n    if (sign == '+') userResult += Number(item.innerHTML);\n    if (sign == '-') userResult -= Number(item.innerHTML);\n    if (sign == '*') userResult *= Number(item.innerHTML);\n    if (amountSelectedItem == Math.sqrt(amount)) {\n      console.log(userResult, result);\n      if (userResult == result) {\n        clear();\n        console.clear();\n        showRound();\n      } else {\n        alert(\"No\");\n        clear(false);\n      }\n    }\n  }\n  update();\n}\nfunction removeSelection(e, item) {\n  e.preventDefault();\n  if (amountSelectedItem <= Math.sqrt(amount) && amountSelectedItem > 0 && item.classList.contains('grid__block_select')) {\n    amountSelectedItem -= 1;\n    item.classList.remove('grid__block_select');\n    if (sign == '+') userResult -= Number(item.innerHTML);\n    if (sign == '-') userResult += Number(item.innerHTML);\n    if (sign == '*') userResult /= Number(item.innerHTML);\n  }\n  update();\n}\nfunction update() {\n  countElem.innerHTML = \"\".concat(amountSelectedItem, \"/\").concat(Math.sqrt(amount));\n  signElem.innerHTML = String(sign);\n  resultElem.innerHTML = String(result);\n  userResultElem.innerHTML = String(userResult);\n}\nfunction clear() {\n  var resultFlag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;\n  girdBlocksElem.forEach(function (item) {\n    item.classList.remove('grid__block_select');\n  });\n  amountSelectedItem = 0;\n  userResult = 0;\n  if (resultFlag) result = 0;\n}\ngirdBlocksElem.forEach(function (item) {\n  item.addEventListener('click', function (e) {\n    if (!itemIsActive(item)) setSelection(item);else removeSelection(e, item);\n  });\n  item.addEventListener('contextmenu', function (e) {\n    removeSelection(e, item);\n  });\n});\nshowRound();\n\n//# sourceURL=webpack:///./assets/ts/index.ts?");

/***/ })

/******/ });