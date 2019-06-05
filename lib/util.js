'use strict';

exports.__esModule = true;
exports.UNSELECTABLE_ATTRIBUTE = exports.UNSELECTABLE_STYLE = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.toTitle = toTitle;
exports.toArray = toArray;
exports.createRef = createRef;
exports.resetAriaId = resetAriaId;
exports.generateAriaId = generateAriaId;
exports.isLabelInValue = isLabelInValue;
exports.refValParse = refValParse;
exports.formatInternalValue = formatInternalValue;
exports.formatDisplayValue = formatDisplayValue;
exports.getRefname = getRefname;
exports.formatSelectorValue = formatSelectorValue;

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

require('./polyfill_shim');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// =================== MISC ====================
function toTitle(title) {
  if (typeof title === 'string') {
    return title;
  }
  return null;
}
function toArray(data) {
  if (data === undefined || data === null) return [];

  return Array.isArray(data) ? data : [data];
}
// Shallow copy of React 16.3 createRef api
function createRef() {
  var func = function setRef(node) {
    func.current = node;
  };
  return func;
}

// =============== Accessibility ===============
var ariaId = 0;

function resetAriaId() {
  ariaId = 0;
}

function generateAriaId(prefix) {
  ariaId += 1;
  return prefix + '_' + ariaId;
}
function isLabelInValue(props) {
  var labelInValue = props.labelInValue;

  return labelInValue || false;
}

// =============== Legacy ===============
var UNSELECTABLE_STYLE = exports.UNSELECTABLE_STYLE = {
  userSelect: 'none',
  WebkitUserSelect: 'none'
};

var UNSELECTABLE_ATTRIBUTE = exports.UNSELECTABLE_ATTRIBUTE = {
  unselectable: 'unselectable'
};

// =================== Value ===================
function refValParse(value) {
  if (!value) {
    (0, _warning2["default"])(true, 'value or defaultValue cant not be empty');
    return '{"refname":"",refpk:""}';
  }
  try {
    var valueMap = JSON.parse(value);
    if (!valueMap.hasOwnProperty('refname') || !valueMap.hasOwnProperty('refpk')) {
      (0, _warning2["default"])(false, 'value or defaultValue does not contains refname or refpk');
      return '{"refname":"",refpk:""}';
    } else {
      return JSON.parse(value);
    }
  } catch (e) {
    return '{"refname":"",refpk:""}';
  }
}
/**
 * 处理传入的value或者defaultValue，将value中refname和refpk分别放入selectorValueList，selectorValueMap。
 * 多选的情况考虑
 * @param {ObjectVal} ObjectVal 
 */
function formatInternalValue(ObjectVal) {
  //当""{"refname":"","refpk":""}"，ObjectVal.refname是undefined
  if (!ObjectVal.refname || !ObjectVal.refpk) {
    var selectorValueList = [],
        selectorValueMap = {};
    return { selectorValueList: selectorValueList, selectorValueMap: selectorValueMap };
  }
  var valueList = typeof ObjectVal.refname === 'string' ? ObjectVal.refname.split(',') : (0, _stringify2["default"])(ObjectVal.refname).split(',');
  var idList = typeof ObjectVal.refpk === 'string' ? ObjectVal.refpk.split(',') : (0, _stringify2["default"])(ObjectVal.refpk).split(',');
  if (valueList.length !== idList.length) {
    (0, _warning2["default"])(false, 'refname and refpk in value or defaultValue do not contains same length');
  } else {
    var _selectorValueList = [],
        _selectorValueMap = {};
    valueList.forEach(function (value, index) {
      _selectorValueList.push({ refname: value, refpk: idList[index] });
      _selectorValueMap[idList[index]] = { refname: value, refpk: idList[index] };
    });
    return { selectorValueList: _selectorValueList, selectorValueMap: _selectorValueMap };
  }
}
function formatDisplayValue(item, inputDisplay) {
  // 传入时做兼容
  // if(item.refname){ //为了匹配value的值
  //   return item.refname;
  // }
  if (typeof inputDisplay === 'function') {
    return inputDisplay(item);
  } else {
    return inputDisplay.format(item);
  }
}
function getRefname(wrappedValue) {
  if (wrappedValue.label) {
    return wrappedValue.label;
  }
  // Since value without entity will be in missValueList.
  // This code will never reached, but we still need this in case.
  return wrappedValue.label;
}

/**
 * Convert internal state `valueList` to user needed value list.
 * This will return an array list. You need check if is not multiple when return.
 *
 * `allCheckedNodes` is used for `treeCheckStrictly`
 */
function formatSelectorValue(valueList) {
  return valueList.map(function (wrappedValue) {
    return {
      label: getRefname(wrappedValue),
      value: wrappedValue.value
    };
  });
}