'use strict';

exports.__esModule = true;
exports.UNSELECTABLE_ATTRIBUTE = exports.UNSELECTABLE_STYLE = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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
 * 获取selectorValueList,selectorValueMap
 * 处理传入的value或者defaultValue，将value中refname和refpk分别放入selectorValueList，selectorValueMap。
 * 多选的情况考虑
 * @param {ObjectValue} ObjectValue :经过refValParse处理的value，是个对象
 */
function formatInternalValue(ObjectValue, nextProps) {
  //当""{"refname":"","refpk":""}"，ObjectValue.refname是undefined
  if (!ObjectValue.refname || !ObjectValue.refpk) {
    var selectorValueList = [],
        selectorValueMap = {};
    return { selectorValueList: selectorValueList, selectorValueMap: selectorValueMap };
  }
  var valueList = typeof ObjectValue.refname === 'string' ? ObjectValue.refname.split(';') : (0, _stringify2["default"])(ObjectValue.refname).split(';');
  var idList = typeof ObjectValue.refpk === 'string' ? ObjectValue.refpk.split(';') : (0, _stringify2["default"])(ObjectValue.refpk).split(';');
  if (valueList.length !== idList.length) {
    (0, _warning2["default"])(false, 'refname and refpk in value or defaultValue do not contains same length');
    var _selectorValueList = [],
        _selectorValueMap = {};
    return { selectorValueList: _selectorValueList, selectorValueMap: _selectorValueMap };
  } else {
    var _selectorValueList2 = [],
        _selectorValueMap2 = {},
        newValueList = nextProps.valueList,
        valueField = nextProps.valueField;
    //20190606修改，这里改成idList从props的valueList中拿数据，若是valueList为空，则还是用refname和refpk
    // selectorValueList 两种，1.从valueList抽取的 2.refname+refpk 组合的
    idList.forEach(function (id, index) {
      if (newValueList.length === 0) {
        _selectorValueList2.push({ refname: valueList[index], refpk: id });
        _selectorValueMap2[id] = { refname: valueList[index], refpk: id };
        return false;
      } else {
        var isExist = newValueList.some(function (item, valueIndex) {
          if (item[valueField] === id) {
            _selectorValueList2.push(item);
            _selectorValueMap2[id] = item;
            return true; //跳出循环
          } else {
            return false;
          }
        });
        if (!isExist) {
          //考虑，选中的数据不在下拉数据中
          _selectorValueList2.push({ refname: valueList[index], refpk: id });
          _selectorValueMap2[id] = { refname: valueList[index], refpk: id };
        }
      }
    });
    return { selectorValueList: _selectorValueList2, selectorValueMap: _selectorValueMap2 };
  }
}
function formatDisplayValue(item, inputDisplay, valueList) {
  // 传入时做兼容
  //selectorValueList的取值符合refname+refpk 组合的，即没从valueList中取出完整数据
  if ((0, _keys2["default"])(item).length === 2 && item.refname && valueList.length === 0) {
    return item.refname;
  }
  //selectorValueList的取值符合从valueList抽取的
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