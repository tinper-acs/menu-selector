'use strict';

exports.__esModule = true;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _extends = _assign2["default"] || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _util = require('../../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : subClass.__proto__ = superClass; }

var Selection = (_temp2 = _class = function (_React$Component) {
  _inherits(Selection, _React$Component);

  function Selection() {
    var _temp, _this, _ret;

    _classCallCheck(this, Selection);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.onRemove = function (event) {
      event.stopPropagation();
      var _this$props = _this.props,
          onRemove = _this$props.onRemove,
          value = _this$props.value,
          label = _this$props.label;

      onRemove(event, label, value);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Selection.prototype.render = function render() {
    var _props = this.props,
        prefixCls = _props.prefixCls,
        maxTagTextLength = _props.maxTagTextLength,
        className = _props.className,
        style = _props.style,
        label = _props.label,
        value = _props.value,
        onRemove = _props.onRemove,
        removeIcon = _props.removeIcon;


    var content = value || label;
    if (maxTagTextLength && typeof content === 'string' && content.length > maxTagTextLength) {
      content = content.slice(0, maxTagTextLength) + '...';
    }

    return _react2["default"].createElement(
      'li',
      _extends({
        style: _extends({}, _util.UNSELECTABLE_STYLE, style)
      }, _util.UNSELECTABLE_ATTRIBUTE, {
        role: 'menuitem',
        className: (0, _classnames2["default"])(prefixCls + '-selection__choice', className),
        title: (0, _util.toTitle)(value || label)
      }),
      _react2["default"].createElement(
        'span',
        { className: prefixCls + '-selection__choice__content' },
        content
      ),
      onRemove && _react2["default"].createElement(
        'span',
        { className: prefixCls + '-selection__choice__remove', onClick: this.onRemove },
        typeof removeIcon === 'function' ? _react2["default"].createElement(removeIcon, _extends({}, this.props)) : removeIcon
      )
    );
  };

  return Selection;
}(_react2["default"].Component), _class.propTypes = {
  prefixCls: _propTypes2["default"].string,
  maxTagTextLength: _propTypes2["default"].number,
  onRemove: _propTypes2["default"].func,
  className: _propTypes2["default"].string,
  style: _propTypes2["default"].object,

  label: _propTypes2["default"].node,
  value: _propTypes2["default"].oneOfType([_propTypes2["default"].string, _propTypes2["default"].number]),
  removeIcon: _propTypes2["default"].oneOfType([_propTypes2["default"].node, _propTypes2["default"].func])
}, _temp2);
exports["default"] = Selection;