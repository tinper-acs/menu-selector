'use strict';

exports.__esModule = true;
exports.multipleSelectorContextTypes = undefined;

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _BaseSelector = require('../../Base/BaseSelector');

var _BaseSelector2 = _interopRequireDefault(_BaseSelector);

var _util = require('../../util');

var _SelectorList = require('./SelectorList');

var _SelectorList2 = _interopRequireDefault(_SelectorList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : subClass.__proto__ = superClass; }

var Selector = (0, _BaseSelector2["default"])('multiple');

var multipleSelectorContextTypes = exports.multipleSelectorContextTypes = {
  onMultipleSelectorRemove: _propTypes2["default"].func.isRequired
};

var MultipleSelector = (_temp = _class = function (_React$Component) {
  _inherits(MultipleSelector, _React$Component);

  function MultipleSelector() {
    _classCallCheck(this, MultipleSelector);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.onPlaceholderClick = function () {
      _this.inputRef.current.focus();
    };

    _this.focus = function () {
      _this.inputRef.current.focus();
    };

    _this.blur = function () {
      _this.inputRef.current.blur();
    };

    _this.renderPlaceholder = function () {
      var _this$props = _this.props,
          prefixCls = _this$props.prefixCls,
          placeholder = _this$props.placeholder,
          searchPlaceholder = _this$props.searchPlaceholder,
          searchValue = _this$props.searchValue,
          selectorValueList = _this$props.selectorValueList;


      var currentPlaceholder = placeholder || searchPlaceholder;

      if (!currentPlaceholder) return null;

      var hidden = searchValue || selectorValueList.length;

      // [Legacy] Not remove the placeholder
      return _react2["default"].createElement(
        'span',
        {
          style: {
            display: hidden ? 'none' : 'block'
          },
          onClick: _this.onPlaceholderClick,
          className: prefixCls + '-search__field__placeholder'
        },
        currentPlaceholder
      );
    };

    _this.renderSelection = function () {
      var onMultipleSelectorRemove = _this.context.rcTreeSelect.onMultipleSelectorRemove;


      return _react2["default"].createElement(_SelectorList2["default"], _extends({}, _this.props, {
        onMultipleSelectorRemove: onMultipleSelectorRemove,
        inputRef: _this.inputRef
      }));
    };

    _this.inputRef = (0, _util.createRef)();
    return _this;
  }

  MultipleSelector.prototype.render = function render() {
    return _react2["default"].createElement(Selector, _extends({}, this.props, {
      tabIndex: -1
      // showArrow={false}
      , renderSelection: this.renderSelection,
      renderPlaceholder: this.renderPlaceholder
    }));
  };

  return MultipleSelector;
}(_react2["default"].Component), _class.propTypes = _extends({}, _BaseSelector.selectorPropTypes, {
  selectorValueList: _propTypes2["default"].array,
  disabled: _propTypes2["default"].bool,
  searchValue: _propTypes2["default"].string,
  labelInValue: _propTypes2["default"].bool,
  maxTagCount: _propTypes2["default"].number,
  maxTagPlaceholder: _propTypes2["default"].oneOfType([_propTypes2["default"].node, _propTypes2["default"].func]),

  onChoiceAnimationLeave: _propTypes2["default"].func
}), _class.contextTypes = {
  rcTreeSelect: _propTypes2["default"].shape(_extends({}, multipleSelectorContextTypes, {

    onSearchInputChange: _propTypes2["default"].func
  }))
}, _temp);
exports["default"] = MultipleSelector;