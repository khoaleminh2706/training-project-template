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
/******/ 		"home-page": 0
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
/******/ 	__webpack_require__.p = "./";
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
/******/ 	deferredModules.push([0,"vendors~home-page"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/components/_customModal.ts":
/*!************************************************!*\
  !*** ./src/scripts/components/_customModal.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var jquery_1 = __importDefault(__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"));

var CustomModal =
/** @class */
function () {
  function CustomModal(endpoint, fileService) {
    var _this = this;

    this.renderModal = function () {
      return new Promise(function (resolve, reject) {
        var btnElement = _this.endpoint.relatedTarget;

        if (!btnElement) {
          console.error('Không tìm thấy button');
          return;
        }

        var btn = jquery_1.default(btnElement);
        var task = btn.data('task');
        var type = btn.data('file');
        var currentId = btn.data('id');
        var item;

        if (currentId) {
          var result = _this.fileService.getDoc(currentId);

          if (result.success && result.data) item = result.data;
        }

        var modal = jquery_1.default(_this.endpoint.target);
        modal.find('.modal-title').text(task + " " + type); // render form body

        var modalBody = modal.find('.modal-body');
        if (task == 'delete') modalBody.html("<p>Are you sure you want to delete item Id=" + currentId + "</p>");else _this.renderForm(modalBody, undefined, type);
        modal.find('.modal-footer').html("<button type=\"submit\"\n  class=\"btn btn-primary\" id=\"btnSubmitForm\">" + task + "</button>");
        var errorList = modal.find('#error-messages');
        jquery_1.default('#btnSubmitForm').on('click', function (event) {
          var _a;

          event.preventDefault();

          if (task === 'create' || task === 'edit') {
            if (type == 'folder') {
              var name_1 = (_a = modal.find('input#file-name').val()) === null || _a === void 0 ? void 0 : _a.toString();
              if (name_1) _this.fileService.createNewFolder(name_1, currentId).then(function (result) {
                if (result.success) {
                  // Do something
                  // hide modal
                  modal.modal('hide');
                  resolve();
                }
              }).catch(function (error) {
                errorList.append("<li class=\"text-danger\">" + error.errorMessage + "</li>");
                reject();
              });
            }

            if (type == 'file') {
              var fileInput = modal.find('#fileupload');
              var file = fileInput[0].files[0]; // Check file size

              if (file.size > 2097152) {
                errorList.append("<li class=\"text-danger\">File kh\xF4ng \u0111\u01B0\u1EE3c l\u1EDBn h\u01A1n 2MB</li>");
                return;
              }

              var formData = new FormData();
              formData.append('uploadFile', file);

              _this.fileService.uploadFile(formData, currentId).then(function () {
                // hide modal
                modal.modal('hide');
                resolve();
              }).catch(function (error) {
                errorList.append("<li class=\"text-danger\">" + error.errorMessage + "</li>");
              });
            }
          }
        });
      });
    };

    this.renderForm = function (element, item, type) {
      if (type === void 0) {
        type = 'folder';
      }

      if (type == 'folder') {
        element.html("\n      <form>\n        <div class=\"form-group\">\n          <input type=\"text\" \n              class=\"form-control\" \n              id=\"file-name\"\n              placeholder=\"T\xEAn file\"\n              name=\"file-name\"\n              value=\"" + (item ? item.name : '') + "\"\n          />\n        </div>\n        <div class=\"container\">\n          <ul id=\"error-messages\"></ul>\n        </div>\n      </form>\n      ");
      } else {
        element.html("\n      <form>\n      <div class=\"form-group\">\n        <input type=\"file\" \n            class=\"form-control\" \n            id=\"fileupload\"\n            placeholder=\"T\xEAn file\"\n            name=\"fileupload\"\n        />\n      </div>\n      <div class=\"container\">\n        <ul id=\"error-messages\"></ul>\n      </div>\n    </form>\n      ");
      }
    };

    this.endpoint = endpoint;
    this.fileService = fileService;
  }

  return CustomModal;
}();

exports.default = CustomModal;

/***/ }),

/***/ "./src/scripts/components/_tableRow.ts":
/*!*********************************************!*\
  !*** ./src/scripts/components/_tableRow.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var tableRow = function tableRow(data, container) {
  if (!container) {
    console.error('Cannot find conatiner');
    return;
  }

  var html = '';

  if ((data === null || data === void 0 ? void 0 : data.length) !== 0) {
    data.map(function (file) {
      html += "<tr data-id=\"" + file.id + "\">\n            <td data-label=\"File Type\" scope=\"row\">\n            <span><i class=\"fas " + (file.type == 'file' ? 'fa-file-excel icon-excel' : 'fa-folder') + "\"></i></span>\n            </td>\n            <td data-label=\"Name\"><span>" + (file.type == 'file' ? "<a target='_blank' href='/api/files/" + file.id + "/download'>" + file.name + "</a>" : file.name) + "</span></td>\n            <td data-label=\"Modified\"><span>" + file.modifiedAt + "</span></td>\n            <td data-label=\"Modified By\"><span>" + file.modifiedBy + "</span></td>\n            <td></td>\n        </tr>";
    });
    container.innerHTML = html;
  } else {
    container.innerHTML = 'Không có dữ liệu nào';
  }
};

exports.default = tableRow;

/***/ }),

/***/ "./src/scripts/pages/home-page.ts":
/*!****************************************!*\
  !*** ./src/scripts/pages/home-page.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var jquery_1 = __importDefault(__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"));

var _helper_1 = __importDefault(__webpack_require__(/*! ../utilities/_helper */ "./src/scripts/utilities/_helper.ts"));

var _fileService_1 = __importDefault(__webpack_require__(/*! ../service/_fileService */ "./src/scripts/service/_fileService.ts"));

var _tableRow_1 = __importDefault(__webpack_require__(/*! ../components/_tableRow */ "./src/scripts/components/_tableRow.ts"));

var _customModal_1 = __importDefault(__webpack_require__(/*! ../components/_customModal */ "./src/scripts/components/_customModal.ts"));

__webpack_require__(/*! bootstrap/js/dist/util */ "./node_modules/bootstrap/js/dist/util.js");

__webpack_require__(/*! bootstrap/js/dist/button */ "./node_modules/bootstrap/js/dist/button.js");

__webpack_require__(/*! bootstrap/js/dist/collapse */ "./node_modules/bootstrap/js/dist/collapse.js");

__webpack_require__(/*! bootstrap/js/dist/modal */ "./node_modules/bootstrap/js/dist/modal.js");

var point = document.querySelector('#doc-list tbody');
var fileService;

_helper_1.default(function () {
  // prevent enter and backspace
  jquery_1.default(function () {
    var keyStop = {
      8: ':not(input:text, textarea, input:file, input:password)',
      13: 'input:text, input:password',
      end: null
    };
    jquery_1.default(document).bind('keydown', function (event) {
      var selector = keyStop[event.which];

      if (selector !== undefined && jquery_1.default(event.target).is(selector)) {
        event.preventDefault(); // stop event
      }

      return true;
    });
  });
  fileService = new _fileService_1.default();
  fileService.getData().then(function () {
    return _tableRow_1.default(fileService.Data(), point);
  }).catch(function (err) {
    return console.error(err);
  }); // Modal to handle create and edit

  jquery_1.default('#file-modal').on('show.bs.modal', function (event) {
    var customerModel = new _customModal_1.default(event, fileService);
    customerModel.renderModal().then(function () {
      return _tableRow_1.default(fileService.Data(), point);
    });
  });
});

/***/ }),

/***/ "./src/scripts/service/_fileService.ts":
/*!*********************************************!*\
  !*** ./src/scripts/service/_fileService.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var jquery_1 = __importDefault(__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"));

var FileService =
/** @class */
function () {
  function FileService() {
    var _this = this;

    this.data = [];

    this.getData = function () {
      return __awaiter(_this, void 0, void 0, function () {
        var jsonData;

        var _this = this;

        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              jsonData = [];
              return [4
              /*yield*/
              , jquery_1.default.ajax('/api/files', {
                type: 'GET',
                async: true,
                success: function success(data) {
                  return data;
                },
                error: function error(err) {
                  return console.log(err);
                }
              })];

            case 1:
              jsonData = _a.sent(); // merge data to file type

              jsonData.forEach(function (obj) {
                if (!obj !== undefined && (obj === null || obj === void 0 ? void 0 : obj.type)) {
                  try {
                    switch (obj.type) {
                      case 'file':
                        _this.data.push(obj);

                        break;

                      case 'folder':
                        _this.data.push(obj);

                        break;

                      default:
                        throw new Error("Wrong file type" + JSON.stringify(obj));
                    }
                  } catch (err) {
                    console.error(err);
                  }
                }
              });
              return [2
              /*return*/
              ];
          }
        });
      });
    };

    this.createNewFolder = function (name, parentId) {
      return new Promise(function (resolve, reject) {
        // check duplicate file name
        if (_this.hasAlreadyExisted(name, parentId)) {
          reject({
            success: false,
            errorMessage: 'Folder đã tồn tại'
          });
        }

        jquery_1.default.ajax({
          type: 'POST',
          url: '/api/files/folder',
          contentType: 'application/json; charset=utf-8',
          data: JSON.stringify({
            name: name
          }),
          dataType: 'json'
        }).done(function (data) {
          // save new data to localdata
          var addnew = {
            id: data.id,
            // TODO: Sửa lại chỗ này
            name: name,
            extension: data.extension,
            type: data.type,
            modifiedAt: data.modifiedAt,
            modifiedBy: data.modifiedBy,
            createdAt: data.createdAt,
            createdBy: data.createdBy
          };

          _this.data.push(addnew);

          resolve({
            success: true
          });
        }).catch(function (err) {
          console.error(err.responseText);
          reject({
            success: false,
            errorMessage: err.responseText ? err.responseText : err.error
          });
        });
      });
    };

    this.uploadFile = function (formData, parentId) {
      return new Promise(function (resolve, reject) {
        jquery_1.default.ajax({
          type: 'post',
          url: '/api/files',
          processData: false,
          contentType: false,
          data: formData
        }).done(function (result) {
          result.name = formData.getAll('uploadFile')[0].name;

          _this.data.push(result);

          resolve({
            success: true
          });
        }).catch(function (err) {
          console.error(err.responseText);
          reject({
            success: false,
            errorMessage: err.responseText ? err.responseText : err.error
          });
        });
      });
    };

    this.hasAlreadyExisted = function (fileName, parentId) {
      // check subfile
      if (parentId) {
        var doc = _this.data.find(function (x) {
          return x.id == parentId && x.type === 'folder';
        });

        if (doc) {
          var folder = doc;

          if (folder.subFiles && folder.subFiles.find(function (x) {
            return x.name === fileName;
          })) {
            return true;
          }
        }
      } // check file


      if (_this.data.find(function (x) {
        return x.name === fileName;
      })) {
        return true;
      }

      return false;
    };
  }

  FileService.prototype.getDoc = function (id) {
    var doc = this.data.find(function (x) {
      return x.id == id;
    });
    if (doc) return {
      success: true,
      data: doc
    };
    return {
      success: false
    };
  };

  FileService.prototype.editFileName = function (id, name) {
    this.data = this.data.map(function (item) {
      if (item.id === id) {
        return __assign(__assign({}, item), {
          name: name
        });
      }

      return item;
    }); // TODO: file vs folder?
    // TODO: output error if any
    // save new data to localStorage
    // LocalData.save('items', this.data);

    return {
      success: true
    };
  };

  FileService.prototype.removeItem = function (id) {
    this.data = this.data.filter(function (x) {
      return x.id !== id;
    }); // TODO: check errors if any
    // save new data to localStorage
    // LocalData.save('items', this.data);

    return {
      success: true
    };
  };

  FileService.prototype.Data = function () {
    return this.data;
  };

  FileService.prototype.isFolder = function (id) {
    var item = this.data.find(function (x) {
      return x.id === id;
    });
    if (item && item.type === 'folder') return true;
    return false;
  };

  return FileService;
}();

exports.default = FileService;

/***/ }),

/***/ "./src/scripts/utilities/_helper.ts":
/*!******************************************!*\
  !*** ./src/scripts/utilities/_helper.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var ready = function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
};

exports.default = ready;

/***/ }),

/***/ "./src/styles/pages/home-page.scss":
/*!*****************************************!*\
  !*** ./src/styles/pages/home-page.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/*!********************************************************************************!*\
  !*** multi ./src/scripts/pages/home-page.ts ./src/styles/pages/home-page.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/scripts/pages/home-page.ts */"./src/scripts/pages/home-page.ts");
module.exports = __webpack_require__(/*! ./src/styles/pages/home-page.scss */"./src/styles/pages/home-page.scss");


/***/ })

/******/ });
//# sourceMappingURL=home-page.js.map