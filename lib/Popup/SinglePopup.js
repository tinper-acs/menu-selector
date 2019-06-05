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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _BasePopup = require('../Base/BasePopup');

var _BasePopup2 = _interopRequireDefault(_BasePopup);

var _SearchInput = require('../SearchInput');

var _SearchInput2 = _interopRequireDefault(_SearchInput);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : subClass.__proto__ = superClass; }

var SinglePopup = (_temp = _class = function (_React$Component) {
  _inherits(SinglePopup, _React$Component);

  function SinglePopup() {
    _classCallCheck(this, SinglePopup);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.onPlaceholderClick = function () {
      _this.inputRef.current.focus();
    };

    _this.getTree = function () {
      return _this.popupRef.current && _this.popupRef.current.getTree();
    };

    _this.renderPlaceholder = function () {
      var _this$props = _this.props,
          searchPlaceholder = _this$props.searchPlaceholder,
          searchValue = _this$props.searchValue,
          prefixCls = _this$props.prefixCls;


      if (!searchPlaceholder) {
        return null;
      }

      return _react2["default"].createElement(
        'span',
        {
          style: {
            display: searchValue ? 'none' : 'block'
          },
          onClick: _this.onPlaceholderClick,
          className: prefixCls + '-search__field__placeholder'
        },
        searchPlaceholder
      );
    };

    _this.renderSearch = function () {
      var _this$props2 = _this.props,
          showSearch = _this$props2.showSearch,
          dropdownPrefixCls = _this$props2.dropdownPrefixCls;


      if (!showSearch) {
        return null;
      }

      return _react2["default"].createElement(
        'span',
        { ref: _this.searchRef, className: dropdownPrefixCls + '-search' },
        _react2["default"].createElement(_SearchInput2["default"], _extends({}, _this.props, {
          ref: _this.inputRef,
          renderPlaceholder: _this.renderPlaceholder
        }))
      );
    };

    _this.inputRef = (0, _util.createRef)();
    _this.searchRef = (0, _util.createRef)();
    _this.popupRef = (0, _util.createRef)();
    return _this;
  }

  SinglePopup.prototype.render = function render() {
    return _react2["default"].createElement(_BasePopup2["default"], _extends({ ref: this.popupRef }, this.props, { renderSearch: this.renderSearch }));
  };

  return SinglePopup;
}(_react2["default"].Component), _class.propTypes = _extends({}, _BasePopup2["default"].propTypes, {
  searchValue: _propTypes2["default"].string,
  showSearch: _propTypes2["default"].bool,
  dropdownPrefixCls: _propTypes2["default"].string,
  disabled: _propTypes2["default"].bool,
  searchPlaceholder: _propTypes2["default"].string
}), _temp);
exports["default"] = SinglePopup;