'use strict';

exports.__esModule = true;
exports.genArrProps = genArrProps;
exports.valueProp = valueProp;

var _util = require('./util');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var internalValProp = _propTypes2["default"].oneOfType([_propTypes2["default"].string, _propTypes2["default"].arrayOf(_propTypes2["default"].object)]);

function genArrProps(propType) {
  return _propTypes2["default"].oneOfType([propType]);
}

/**
 * Origin code check `multiple` is true when `treeCheckStrictly` & `labelInValue`.
 * But in process logic is already cover to array.
 * Check array is not necessary. Let's simplify this check logic.
 */
function valueProp() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var props = args[0],
      propName = args[1],
      Component = args[2];

  if (typeof props[propName] === 'string') {
    if (!/refname/.test(props[propName])) {
      return new Error('Invalid prop `' + propName + '` supplied to `' + Component + '`. ' + '\u7F3A\u5C11refname \u3002You should use \'{ "refname": string, "refpk": string  } \'instead. ');
    }
    if (!/refpk/.test(props[propName])) {
      return new Error('Invalid prop `' + propName + '` supplied to `' + Component + '`. ' + '\u7F3A\u5C11refpk \u3002You should use \'{ "refname": string, "refpk": string  } \'instead. ');
    }
    // if (props.valueField !== 'refpk') {
    //   return new Error(
    //     `Invalid prop \`${propName}\` supplied to \`${Component}\`. ` +
    //     `when you  use '{ "refname": string, "refpk": string  } ',please let valueField equals 'refpk'. `
    //   );
    // }
    return null;
  }

  var err = genArrProps(internalValProp).apply(undefined, args);
  if (err) {
    return new Error('Invalid prop `' + propName + '` supplied to `' + Component + '`. ' + 'You should use string or [object] instead.');
  }
  return null;
}