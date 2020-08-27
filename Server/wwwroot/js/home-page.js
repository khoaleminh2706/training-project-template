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

/***/ "./src/scripts/components/_modalForm.ts":
/*!**********************************************!*\
  !*** ./src/scripts/components/_modalForm.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function renderForm(item) {
  var html = "\n    <form>\n      <div class=\"form-group\">\n        <input type=\"text\" \n            class=\"form-control\" \n            id=\"file-name\"\n            placeholder=\"T\xEAn file\"\n            name=\"file-name\"\n            value=\"" + (item ? item.name : '') + "\"\n        />\n      </div>\n      <div class=\"container\">\n        <ul id=\"error-messages\"></ul>\n      </div>\n    </form>\n    ";
  return html;
}

exports.default = renderForm;

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
      html += "<tr data-id=\"" + file.id + "\">\n            <td data-label=\"File Type\" scope=\"row\">\n            <span><i class=\"fas " + (file.extension !== undefined ? 'fa-file-excel icon-excel' : 'fa-folder') + "\"></i></span>\n            </td>\n            <td data-label=\"Name\"><span>" + file.name + "</span></td>\n            <td data-label=\"Modified\"><span>" + file.modifiedAt + "</span></td>\n            <td data-label=\"Modified By\"><span>" + file.modifiedBy + "</span></td>\n            <td></td>\n        </tr>";
    });
    container.innerHTML = html;
  } else {
    container.innerHTML = 'Không có dữ liệu nào';
  }
};

exports.default = tableRow;

/***/ }),

/***/ "./src/scripts/constants/_serverData.ts":
/*!**********************************************!*\
  !*** ./src/scripts/constants/_serverData.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var serverData = [{
  id: '1',
  name: 'CAS',
  type: 'folder',
  createdAt: new Date(),
  createdBy: 'main',
  modifiedAt: new Date(),
  modifiedBy: 'Megan Bowen',
  subFiles: []
}, {
  id: '2',
  name: 'CoasterAndBargeLoading.xlsx',
  type: 'file',
  extension: 'xlsx',
  createdAt: new Date(),
  createdBy: 'main',
  modifiedAt: new Date(),
  modifiedBy: 'Administrator MOD'
}, {
  id: '3',
  name: 'RevenueByService.xlsx',
  type: 'file',
  extension: 'xlsx',
  createdAt: new Date(),
  createdBy: 'main',
  modifiedAt: new Date(),
  modifiedBy: 'Administrator MOD'
}, {
  id: '4',
  name: 'RevenueByService2016.xlsx',
  type: 'file',
  extension: 'xlsx',
  createdAt: new Date(),
  createdBy: 'main',
  modifiedAt: new Date(),
  modifiedBy: 'Administrator MOD'
}, {
  id: '5',
  name: 'RevenueByService2017.xlsx',
  type: 'file',
  extension: 'xlsx',
  createdAt: new Date(),
  createdBy: 'main',
  modifiedAt: new Date(),
  modifiedBy: 'Administrator MOD'
}];
exports.default = serverData;

/***/ }),

/***/ "./src/scripts/pages/home-page.ts":
/*!****************************************!*\
  !*** ./src/scripts/pages/home-page.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

var _helper_1 = __importDefault(__webpack_require__(/*! ../utilities/_helper */ "./src/scripts/utilities/_helper.ts"));

var _fileService_1 = __importDefault(__webpack_require__(/*! ../service/_fileService */ "./src/scripts/service/_fileService.ts"));

var _tableRow_1 = __importDefault(__webpack_require__(/*! ../components/_tableRow */ "./src/scripts/components/_tableRow.ts"));

var _modalForm_1 = __importDefault(__webpack_require__(/*! ../components/_modalForm */ "./src/scripts/components/_modalForm.ts"));

__webpack_require__(/*! bootstrap/js/dist/util */ "./node_modules/bootstrap/js/dist/util.js");

__webpack_require__(/*! bootstrap/js/dist/button */ "./node_modules/bootstrap/js/dist/button.js");

__webpack_require__(/*! bootstrap/js/dist/collapse */ "./node_modules/bootstrap/js/dist/collapse.js");

__webpack_require__(/*! bootstrap/js/dist/modal */ "./node_modules/bootstrap/js/dist/modal.js");

var point = document.querySelector('#doc-list tbody');
var contextMenu = document.getElementById('context-menu');
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
  fileService.getData();

  _tableRow_1.default(fileService.Data(), point);

  addContextMenu(); // Modal to handle create and edit

  jquery_1.default('#file-modal').on('show.bs.modal', function (event) {
    return handleModalShow(event);
  });
  window.addEventListener('click', function () {
    showContextMenu(false);
  });
});

function showContextMenu(show) {
  if (show === void 0) {
    show = true;
  }

  if (contextMenu) contextMenu.style.display = show ? 'block' : 'none';
}
/**
 * Hàm phụ trách về modal
 */


function handleModalShow(event) {
  var btnElement = event.relatedTarget;

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
    var result = fileService.getDoc(currentId);
    if (result.success && result.data) item = result.data;
  }

  var modal = jquery_1.default(event.target);
  modal.find('.modal-title').text(task + " " + type + " " + (currentId === '' ? currentId : '')); // render form body

  if (task !== 'delete') modal.find('.modal-body').html(_modalForm_1.default(item));else modal.find('.modal-body').html("<p>Are you sure you want to delete item Id=" + currentId + "</p>");
  modal.find('.modal-footer').html("<button type=\"submit\"\n  class=\"btn btn-primary\" id=\"btnSubmitForm\">" + task + "</button>");
  var errorList = modal.find('#error-messages');
  jquery_1.default('#btnSubmitForm').on('click', function (event) {
    var _a;

    event.preventDefault();

    if (task === 'create' || task === 'edit') {
      // Data validation
      var name_1 = (_a = modal.find('input#file-name').val()) === null || _a === void 0 ? void 0 : _a.toString();

      if (name_1 === undefined || name_1 === '') {
        errorList.append('<li class="text-danger">Vui lòng điền tên file.</li>');
        return;
      } // get file extension


      var extension = void 0;

      if (type === 'file') {
        if (name_1.lastIndexOf('.') !== -1) {
          extension = name_1.toString().substr(name_1.lastIndexOf('.') + 1);

          if (!extension) {
            // handle error
            errorList.append('<li class="text-danger">Tên file phải có extension.</li>');
            return;
          }
        } else if (!extension) {
          // handle error
          errorList.append('<li class="text-danger">Tên file phải có extension.</li>');
          return;
        }
      }

      if (task === 'create') {
        handleCreate({
          name: name_1,
          type: type,
          extension: extension
        }, currentId).then(function (result) {
          if (result) {// Do something
          }
        }).catch(function (error) {
          errorList.append("<li class=\"text-danger\">" + error + "</li>");
        });
      } else if (task === 'edit' && currentId) {
        handleEdit(currentId, name_1);
      }
    } else if (task === 'delete' && currentId) {
      handleDelete(currentId);
    } // hide modal


    modal.modal('hide'); // rerender doc list

    _tableRow_1.default(fileService.Data(), point);

    addContextMenu();
  });
}

function addContextMenu() {
  if (contextMenu) {
    var docs = document.querySelectorAll('#doc-list tbody tr');

    if (docs) {
      docs.forEach(function (doc) {
        contextMenuListener(doc, contextMenu);
      });
    }
  }
}

function contextMenuListener(el, contextMenu) {
  el.addEventListener('contextmenu', function (e) {
    var _a;

    e.preventDefault();
    contextMenu.style.display = 'block';
    contextMenu.style.top = e.y.toString();
    contextMenu.style.left = e.x.toString();
    var currentId = (_a = this.getAttribute('data-id')) !== null && _a !== void 0 ? _a : undefined;

    if (currentId) {
      // display id on context menu
      var contextMenuHeader = contextMenu.querySelector('.dropdown-header');
      if (contextMenuHeader) contextMenuHeader.innerText = "File Id = " + currentId;
      var subFolderbtn = contextMenu.querySelector('button[data-file="subfolder"]');
      var subFilebtn = contextMenu.querySelector('button[data-file="subfile"]');
      var btnEdit = contextMenu.querySelector('button[data-task="edit"]');
      var btnDelete = contextMenu.querySelector('button[data-task="delete"]');

      if (btnEdit && btnDelete) {
        btnEdit.setAttribute('data-id', currentId);
        btnDelete.setAttribute('data-id', currentId);
      }

      if (fileService.isFolder(currentId) && subFilebtn && subFolderbtn) {
        subFilebtn.classList.remove('hidden');
        subFilebtn.setAttribute('data-id', currentId);
        subFolderbtn.classList.remove('hidden');
        subFolderbtn.setAttribute('data-id', currentId);
      }
    } else {
      console.error('Không tìm thấy id của đối tượng');
      return;
    }

    return false;
  });
}

var handleCreate = function handleCreate(newFile, parentId) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, success, errorMessage;

    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          return [4
          /*yield*/
          , fileService.createNewFile(newFile, parentId)];

        case 1:
          _a = _b.sent(), success = _a.success, errorMessage = _a.errorMessage;
          if (!success || errorMessage) return [2
          /*return*/
          , errorMessage];
          return [2
          /*return*/
          , undefined];
      }
    });
  });
};

function handleEdit(id, fileName) {
  var _a = fileService.editFileName(id, fileName),
      success = _a.success,
      errorMessage = _a.errorMessage;

  if (!success || errorMessage) return errorMessage;
  return undefined;
}

function handleDelete(id) {
  var _a = fileService.removeItem(id),
      success = _a.success,
      errorMessage = _a.errorMessage;

  if (!success || errorMessage) return errorMessage;
  return undefined;
}

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

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _serverData_1 = __importDefault(__webpack_require__(/*! ../constants/_serverData */ "./src/scripts/constants/_serverData.ts"));

var _LocalData_1 = __importDefault(__webpack_require__(/*! ../utilities/_LocalData */ "./src/scripts/utilities/_LocalData.ts"));

var FileService =
/** @class */
function () {
  function FileService() {
    var _this = this;

    this.data = [];

    this.getData = function () {
      var jsonData = _LocalData_1.default.get('items');

      if (jsonData.length === 0) {
        jsonData = _this.getDataFromServer();
      } // merge data to file type


      jsonData.forEach(function (obj) {
        if (!obj !== undefined && (obj === null || obj === void 0 ? void 0 : obj.type)) {
          if (obj.type === 'file') _this.data.push(obj);else if (obj.type === 'folder') _this.data.push(obj);
        }
      });
    };

    this.getDataFromServer = function () {
      // save to local
      _LocalData_1.default.save('items', _serverData_1.default);

      return _serverData_1.default;
    };

    this.createNewFile = function (newFile, parentId) {
      return new Promise(function (resolve, reject) {
        // check duplicate file name
        if (_this.hasAlreadyExisted(newFile.name, parentId)) {
          reject({
            success: false,
            errorMessage: 'File đã tồn tại'
          });
        }

        try {
          var fileToAdd = {
            id: Date.now().toString(),
            name: newFile.name,
            type: newFile.type,
            createdAt: new Date(),
            createdBy: 'Khoa',
            modifiedAt: new Date(),
            modifiedBy: 'Khoa'
          };

          switch (newFile.type) {
            case 'file':
              _this.data.push(__assign(__assign({}, fileToAdd), {
                extension: newFile.extension
              }));

              break;

            case 'folder':
              _this.data.push(__assign(__assign({}, fileToAdd), {
                subFiles: []
              }));

              break;

            default:
              reject({
                success: false,
                errorMessgae: 'Failed'
              });
              break;
          } // save new data to localStorage


          _LocalData_1.default.save('items', _this.data);
        } catch (err) {
          reject({
            success: false,
            errorMessgae: err
          });
        }

        resolve({
          success: true
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

    _LocalData_1.default.save('items', this.data);

    return {
      success: true
    };
  };

  FileService.prototype.removeItem = function (id) {
    this.data = this.data.filter(function (x) {
      return x.id !== id;
    }); // TODO: check errors if any
    // save new data to localStorage

    _LocalData_1.default.save('items', this.data);

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

/***/ "./src/scripts/utilities/_LocalData.ts":
/*!*********************************************!*\
  !*** ./src/scripts/utilities/_LocalData.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function get(name) {
  var data = localStorage.getItem(name);
  if (!data) return [];
  return JSON.parse(data);
}

function save(name, data) {
  try {
    localStorage.setItem(name, JSON.stringify(data));
  } catch (err) {
    console.log(err);
    return false;
  }

  return true;
}

exports.default = {
  get: get,
  save: save
};

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