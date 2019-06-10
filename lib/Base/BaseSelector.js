'use strict';

exports.__esModule = true;
exports.selectorContextTypes = exports.selectorPropTypes = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _extends = _assign2["default"] || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports["default"] = function (modeName) {
  var _class, _temp;

  var BaseSelector = (_temp = _class = function (_React$Component) {
    _inherits(BaseSelector, _React$Component);

    function BaseSelector() {
      _classCallCheck(this, BaseSelector);

      var _this = _possibleConstructorReturn(this, _React$Component.call(this));

      _this.onFocus = function () {
        var _this$props = _this.props,
            onFocus = _this$props.onFocus,
            focused = _this$props.focused;
        var onSelectorFocus = _this.context.rcTreeSelect.onSelectorFocus;


        if (!focused) {
          onSelectorFocus();
        }

        if (onFocus) {
          onFocus.apply(undefined, arguments);
        }
      };

      _this.onBlur = function () {
        var onBlur = _this.props.onBlur;
        var onSelectorBlur = _this.context.rcTreeSelect.onSelectorBlur;

        // TODO: Not trigger when is inner component get focused

        onSelectorBlur();

        if (onBlur) {
          onBlur.apply(undefined, arguments);
        }
      };

      _this.focus = function () {
        _this.domRef.current.focus();
      };

      _this.blur = function () {
        _this.domRef.current.focus();
      };

      _this.domRef = (0, _util.createRef)();
      return _this;
    }

    BaseSelector.prototype.renderClear = function renderClear() {
      var _props = this.props,
          prefixCls = _props.prefixCls,
          allowClear = _props.allowClear,
          selectorValueList = _props.selectorValueList,
          clearIcon = _props.clearIcon,
          inputDisplay = _props.inputDisplay,
          valueList = _props.valueList;
      var onSelectorClear = this.context.rcTreeSelect.onSelectorClear;


      if (!allowClear || !selectorValueList.length || !(0, _util.formatDisplayValue)(selectorValueList[0], inputDisplay, valueList)) {
        return null;
      }

      return _react2["default"].createElement(
        'span',
        {
          key: 'clear',
          className: prefixCls + '-selection__clear',
          onClick: onSelectorClear
        },
        typeof clearIcon === 'function' ? _react2["default"].createElement(clearIcon, _extends({}, this.props)) : clearIcon
      );
    };

    BaseSelector.prototype.renderArrow = function renderArrow() {
      var _props2 = this.props,
          prefixCls = _props2.prefixCls,
          showArrow = _props2.showArrow,
          inputIcon = _props2.inputIcon;

      if (!showArrow) {
        return null;
      }

      return _react2["default"].createElement(
        'span',
        {
          key: 'arrow',
          className: prefixCls + '-arrow',
          style: { outline: 'none' }
        },
        typeof inputIcon === 'function' ? _react2["default"].createElement(inputIcon, _extends({}, this.props)) : inputIcon
      );
    };

    BaseSelector.prototype.renderMenuIcon = function renderMenuIcon() {
      var _props3 = this.props,
          prefixCls = _props3.prefixCls,
          showMenuIcon = _props3.showMenuIcon,
          menuIcon = _props3.menuIcon;
      var onSelectorMenu = this.context.rcTreeSelect.onSelectorMenu;

      if (!showMenuIcon) {
        return null;
      }

      return _react2["default"].createElement(
        'span',
        {
          key: 'menuIcon',
          className: prefixCls + '-menu-icon',
          style: { outline: 'none' },
          onClick: onSelectorMenu
        },
        typeof menuIcon === 'function' ? _react2["default"].createElement(menuIcon, _extends({}, this.props)) : menuIcon
      );
    };

    BaseSelector.prototype.render = function render() {
      var _classNames;

      var _props4 = this.props,
          prefixCls = _props4.prefixCls,
          className = _props4.className,
          style = _props4.style,
          open = _props4.open,
          focused = _props4.focused,
          disabled = _props4.disabled,
          allowClear = _props4.allowClear,
          onClick = _props4.onClick,
          ariaId = _props4.ariaId,
          renderSelection = _props4.renderSelection,
          renderPlaceholder = _props4.renderPlaceholder,
          tabIndex = _props4.tabIndex,
          showArrow = _props4.showArrow,
          showMenuIcon = _props4.showMenuIcon;
      var onSelectorKeyDown = this.context.rcTreeSelect.onSelectorKeyDown;


      var myTabIndex = tabIndex;
      if (disabled) {
        myTabIndex = null;
      }

      return _react2["default"].createElement(
        'span',
        {
          style: style,
          onClick: onClick,
          className: (0, _classnames2["default"])(className, prefixCls, (_classNames = {}, _classNames[prefixCls + '-open'] = open, _classNames[prefixCls + '-focused'] = open || focused, _classNames[prefixCls + '-disabled'] = disabled, _classNames[prefixCls + '-enabled'] = !disabled, _classNames[prefixCls + '-allow-clear'] = allowClear, _classNames)),
          ref: this.domRef,
          role: 'combobox',
          'aria-expanded': open,
          'aria-owns': open ? ariaId : undefined,
          'aria-controls': open ? ariaId : undefined,
          'aria-haspopup': 'listbox',
          'aria-disabled': disabled,
          tabIndex: myTabIndex,
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          onKeyDown: onSelectorKeyDown
        },
        _react2["default"].createElement(
          'span',
          {
            key: 'selection',
            className: (0, _classnames2["default"])(prefixCls + '-selection', prefixCls + '-selection--' + modeName)
          },
          renderSelection(),
          this.renderClear(),
          showArrow && this.renderArrow(),
          showMenuIcon && this.renderMenuIcon(),
          renderPlaceholder && renderPlaceholder()
        )
      );
    };

    return BaseSelector;
  }(_react2["default"].Component), _class.propTypes = _extends({}, selectorPropTypes, {

    // Pass by HOC
    renderSelection: _propTypes2["default"].func.isRequired,
    renderPlaceholder: _propTypes2["default"].func,
    tabIndex: _propTypes2["default"].number
  }), _class.contextTypes = {
    rcTreeSelect: _propTypes2["default"].shape(_extends({}, selectorContextTypes))
  }, _class.defaultProps = {
    tabIndex: 0
  }, _temp);


  (0, _reactLifecyclesCompat.polyfill)(BaseSelector);

  return BaseSelector;
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactLifecyclesCompat = require('react-lifecycles-compat');

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * Input Box is in different position for different mode.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * This not the same design as `Select` cause it's followed by antd 0.x `Select`.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * We will not follow the new design immediately since antd 3.x is already released.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * So this file named as Selector to avoid confuse.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   */

var selectorPropTypes = exports.selectorPropTypes = {
  prefixCls: _propTypes2["default"].string,
  className: _propTypes2["default"].string,
  style: _propTypes2["default"].object,
  open: _propTypes2["default"].bool,
  selectorValueList: _propTypes2["default"].array,
  allowClear: _propTypes2["default"].bool,
  showArrow: _propTypes2["default"].bool,
  onClick: _propTypes2["default"].func,
  onBlur: _propTypes2["default"].func,
  onFocus: _propTypes2["default"].func,
  removeSelected: _propTypes2["default"].func,

  // Pass by component
  ariaId: _propTypes2["default"].string,
  inputIcon: _propTypes2["default"].oneOfType([_propTypes2["default"].node, _propTypes2["default"].func]),
  clearIcon: _propTypes2["default"].oneOfType([_propTypes2["default"].node, _propTypes2["default"].func])
};

var selectorContextTypes = exports.selectorContextTypes = {
  onSelectorFocus: _propTypes2["default"].func.isRequired,
  onSelectorBlur: _propTypes2["default"].func.isRequired,
  onSelectorKeyDown: _propTypes2["default"].func.isRequired,
  onSelectorClear: _propTypes2["default"].func.isRequired,
  onSelectorMenu: _propTypes2["default"].func.isRequired
};