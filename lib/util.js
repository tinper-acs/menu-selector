'use strict';

exports.__esModule = true;
exports.UNSELECTABLE_ATTRIBUTE = exports.UNSELECTABLE_STYLE = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.toTitle = toTitle;
exports.toArray = toArray;
exports.createRef = createRef;
exports.resetAriaId = resetAriaId;
exports.generateAriaId = generateAriaId;
exports.isLabelInValue = isLabelInValue;
exports.refValParse = refValParse;
exports.formatDisplayValue = formatDisplayValue;
exports.getRefname = getRefname;
exports.formatSelectorValue = formatSelectorValue;
exports.formatInternalValue = formatInternalValue;

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
//方法2 不按照refname和refpk来解析
// export function refValParse(value) {
//   if(!value){
//     warning(
//       true,
//       `value or defaultValue cant not be empty`,
//     );
//     return '{"refname":"",refpk:""}';
//   }
//   if(Object.prototype.toString.call(value)==='[object Object]'){
//     return value
//   }
//   if (typeof value === 'string') {
//     try {
//       let valueMap = JSON.parse(value);
//       if (typeof valueMap === 'object' && valueMap) {
//         return valueMap;
//       } else {
//         warning(
//           false,
//           `JSON parse解析报错`,
//         );
//         return '{"refname":"",refpk:""}';
//       }
//     } catch (error) {
//       warning(
//         false,
//         `JSON parse解析报错 ${error}`,
//       );
//       return '{"refname":"",refpk:""}';
//     }
//   }
// }
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

function formatDisplayValue(item, inputDisplay, valueList) {
  // 传入时做兼容
  // selectorValueList的取值符合refname+refpk 组合的，即没从valueList中取出完整数据
  // 20190716修改因为selectorValueList的取值符合refname+refpk 组合的即从value属性取出来的也会有其他key，value的
  // if(Object.keys(item).length===2 && item.refname && valueList.length===0 ){ 
  //   return item.refname;
  // }
  //selectorValueList的取值符合从valueList抽取的
  if (typeof inputDisplay === 'function') {
    return inputDisplay(item) || item.refname;
  } else {
    return inputDisplay.format(item) || item.refname;
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
  var ObjectValueNew = (0, _assign2["default"])({}, ObjectValue);
  if (!ObjectValueNew || Object.prototype.toString.call(ObjectValue) !== '[object Object]') {
    var _selectorValueList = [],
        _selectorValueMap = {};
    return { selectorValueList: _selectorValueList, selectorValueMap: _selectorValueMap };
  }
  var valueList = typeof ObjectValueNew.refname === 'string' ? ObjectValueNew.refname.split(';') : (0, _stringify2["default"])(ObjectValueNew.refname).split(';');
  var idList = typeof ObjectValueNew.refpk === 'string' ? ObjectValueNew.refpk.split(';') : (0, _stringify2["default"])(ObjectValueNew.refpk).split(';');
  if (valueList.length !== idList.length) {
    (0, _warning2["default"])(false, 'refname and refpk in value or defaultValue do not contains same length');
    var _selectorValueList2 = [],
        _selectorValueMap2 = {};
    return { selectorValueList: _selectorValueList2, selectorValueMap: _selectorValueMap2 };
  } else {
    var _selectorValueList3 = [],
        _selectorValueMap3 = {},
        newValueList = nextProps.valueList,
        valueField = nextProps.valueField;
    //20190606修改，这里改成idList从props的valueList中拿数据，若是valueList为空，则还是用refname和refpk
    // selectorValueList 两种，1.从valueList抽取的 2.refname+refpk组合的（从value中获取的）
    try {
      idList.forEach(function (id, index) {
        var objItem = {};
        //20190716取出value中所有的key，不仅仅有refname和refpk
        (0, _keys2["default"])(ObjectValueNew).forEach(function (key) {
          var allKeysVal = typeof ObjectValueNew[key] === 'string' ? ObjectValueNew[key].split(';') : (0, _stringify2["default"])(ObjectValueNew[key]).split(';');
          if (allKeysVal[index] === undefined) {
            throw Error('value的每个键值长度不一致');
          }
          objItem[key] = allKeysVal[index];
        });
        if (newValueList.length === 0) {
          _selectorValueList3.push(objItem);
          _selectorValueMap3[id] = objItem;
          return false;
        } else {
          var isExist = newValueList.some(function (item, valueIndex) {
            if (item[valueField] === id) {
              _selectorValueList3.push(item);
              _selectorValueMap3[id] = item;
              return true; //跳出循环
            } else {
              return false;
            }
          });
          if (!isExist) {
            //考虑，选中的数据不在下拉数据中
            _selectorValueList3.push(objItem);
            _selectorValueMap3[id] = objItem;
          }
        }
      });
      return { selectorValueList: _selectorValueList3, selectorValueMap: _selectorValueMap3 };
    } catch (e) {
      (0, _warning2["default"])(false, '' + e);
      return { selectorValueList: [], selectorValueMap: {} };
    }
  }
}