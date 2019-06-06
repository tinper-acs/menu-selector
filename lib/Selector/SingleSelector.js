'use strict';

exports.__esModule = true;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _extends = _assign2["default"] || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BaseSelector = require('../Base/BaseSelector');

var _BaseSelector2 = _interopRequireDefault(_BaseSelector);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : subClass.__proto__ = superClass; }

var Selector = (0, _BaseSelector2["default"])('single'); //来自BaseSelector

var SingleSelector = (_temp = _class = function (_React$Component) {
  _inherits(SingleSelector, _React$Component);

  function SingleSelector() {
    _classCallCheck(this, SingleSelector);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.focus = function () {
      _this.selectorRef.current.focus();
    };

    _this.blur = function () {
      _this.selectorRef.current.blur();
    };

    _this.renderSelection = function () {
      var _this$props = _this.props,
          selectorValueList = _this$props.selectorValueList,
          placeholder = _this$props.placeholder,
          prefixCls = _this$props.prefixCls,
          inputDisplay = _this$props.inputDisplay,
          valueList = _this$props.valueList;


      var innerNode = void 0;

      if (selectorValueList.length) {
        var displayVal = (0, _util.formatDisplayValue)(selectorValueList[0], inputDisplay, valueList);
        innerNode = _react2["default"].createElement(
          'span',
          {
            key: 'value',
            title: (0, _util.toTitle)(displayVal),
            className: prefixCls + '-selection-selected-value'
          },
          displayVal || ''
        );
      } else {
        innerNode = _react2["default"].createElement(
          'span',
          { key: 'placeholder', className: prefixCls + '-selection__placeholder' },
          placeholder
        );
      }

      return _react2["default"].createElement(
        'span',
        { className: prefixCls + '-selection__rendered' },
        innerNode
      );
    };

    _this.selectorRef = (0, _util.createRef)();
    return _this;
  }

  SingleSelector.prototype.render = function render() {
    return _react2["default"].createElement(Selector, _extends({}, this.props, { ref: this.selectorRef, renderSelection: this.renderSelection }));
  };

  return SingleSelector;
}(_react2["default"].Component), _class.propTypes = _extends({}, _BaseSelector.selectorPropTypes), _temp);
exports["default"] = SingleSelector;