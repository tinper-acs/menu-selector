'use strict';

exports.__esModule = true;

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _class, _temp; /*
                    * @Date: 2019-08-15 19:57:52
                    * @LastEditTime: 2019-08-15 20:29:15
                    */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactLifecyclesCompat = require('react-lifecycles-compat');

var _index = require('./rc-trigger/index');

var _index2 = _interopRequireDefault(_index);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : subClass.__proto__ = superClass; }

var BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    },
    ignoreShake: true
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    },
    ignoreShake: true
  }
};

var SelectTrigger = (_temp = _class = function (_React$Component) {
  _inherits(SelectTrigger, _React$Component);

  function SelectTrigger() {
    _classCallCheck(this, SelectTrigger);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.getDropdownTransitionName = function () {
      var _this$props = _this.props,
          transitionName = _this$props.transitionName,
          animation = _this$props.animation,
          dropdownPrefixCls = _this$props.dropdownPrefixCls;

      if (!transitionName && animation) {
        return dropdownPrefixCls + '-' + animation;
      }
      return transitionName;
    };

    _this.forcePopupAlign = function () {
      var $trigger = _this.triggerRef.current;

      if ($trigger) {
        $trigger.forcePopupAlign();
      }
    };

    _this.triggerRef = (0, _util.createRef)();
    return _this;
  }

  SelectTrigger.prototype.render = function render() {
    var _classNames;

    var _props = this.props,
        disabled = _props.disabled,
        isMultiple = _props.isMultiple,
        dropdownPopupAlign = _props.dropdownPopupAlign,
        dropdownMatchSelectWidth = _props.dropdownMatchSelectWidth,
        dropdownClassName = _props.dropdownClassName,
        dropdownStyle = _props.dropdownStyle,
        onDropdownVisibleChange = _props.onDropdownVisibleChange,
        getPopupContainer = _props.getPopupContainer,
        dropdownPrefixCls = _props.dropdownPrefixCls,
        popupElement = _props.popupElement,
        open = _props.open,
        children = _props.children,
        _props$dropdownDisabl = _props.dropdownDisabled,
        dropdownDisabled = _props$dropdownDisabl === undefined ? false : _props$dropdownDisabl;


    var stretch = void 0;
    if (dropdownMatchSelectWidth !== false) {
      stretch = dropdownMatchSelectWidth ? 'width' : 'minWidth';
    }

    return _react2["default"].createElement(
      _index2["default"],
      {
        ref: this.triggerRef,
        action: disabled || dropdownDisabled ? [] : ['click'],
        popupPlacement: 'bottomLeft',
        builtinPlacements: BUILT_IN_PLACEMENTS,
        popupAlign: dropdownPopupAlign,
        prefixCls: dropdownPrefixCls,
        popupTransitionName: this.getDropdownTransitionName(),
        onPopupVisibleChange: onDropdownVisibleChange,
        popup: popupElement,
        popupVisible: dropdownDisabled ? false : open,
        getPopupContainer: getPopupContainer,
        stretch: stretch,
        popupClassName: (0, _classnames2["default"])(dropdownClassName, (_classNames = {}, _classNames[dropdownPrefixCls + '--multiple'] = isMultiple, _classNames[dropdownPrefixCls + '--single'] = !isMultiple, _classNames)),
        popupStyle: dropdownStyle
      },
      children
    );
  };

  return SelectTrigger;
}(_react2["default"].Component), _class.propTypes = {
  // Pass by outside user props
  disabled: _propTypes2["default"].bool,
  showSearch: _propTypes2["default"].bool,
  prefixCls: _propTypes2["default"].string,
  dropdownPopupAlign: _propTypes2["default"].object,
  dropdownClassName: _propTypes2["default"].string,
  dropdownStyle: _propTypes2["default"].object,
  transitionName: _propTypes2["default"].string,
  animation: _propTypes2["default"].string,
  getPopupContainer: _propTypes2["default"].func,
  children: _propTypes2["default"].node,

  dropdownMatchSelectWidth: _propTypes2["default"].bool,

  // Pass by Select
  isMultiple: _propTypes2["default"].bool,
  dropdownPrefixCls: _propTypes2["default"].string,
  onDropdownVisibleChange: _propTypes2["default"].func,
  popupElement: _propTypes2["default"].node,
  open: _propTypes2["default"].bool
}, _temp);


(0, _reactLifecyclesCompat.polyfill)(SelectTrigger);

exports["default"] = SelectTrigger;