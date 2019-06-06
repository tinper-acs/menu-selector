'use strict';

exports.__esModule = true;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends = _assign2["default"] || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// import CSSMotionList from 'rc-animate/lib/CSSMotionList';


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Selection = require('./Selection');

var _Selection2 = _interopRequireDefault(_Selection);

var _SearchInput = require('../../SearchInput');

var _SearchInput2 = _interopRequireDefault(_SearchInput);

var _util = require('../../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NODE_SELECTOR = 'selector';
var NODE_SEARCH = 'search';
var TREE_SELECT_EMPTY_VALUE_KEY = 'RC_TREE_SELECT_EMPTY_VALUE_KEY';

var SelectorList = function SelectorList(props) {
  var selectorValueList = props.selectorValueList,
      choiceTransitionName = props.choiceTransitionName,
      prefixCls = props.prefixCls,
      onChoiceAnimationLeave = props.onChoiceAnimationLeave,
      maxTagCount = props.maxTagCount,
      maxTagPlaceholder = props.maxTagPlaceholder,
      showSearch = props.showSearch,
      valueList = props.valueList,
      inputRef = props.inputRef,
      onMultipleSelectorRemove = props.onMultipleSelectorRemove,
      valueField = props.valueField,
      inputDisplay = props.inputDisplay;

  var nodeKeys = [];

  // Check if `maxTagCount` is set
  var myValueList = selectorValueList;
  if (maxTagCount >= 0) {
    myValueList = selectorValueList.slice(0, maxTagCount);
  }

  // Basic selectors
  myValueList.forEach(function (item) {
    // const { props: { disabled } = {} } = (valueEntities[value] || {}).node || {};
    var inputVal = (0, _util.formatDisplayValue)(item, inputDisplay, valueList);
    var key = item[valueField] || item.refpk; //兼容初始值可能会没有valueField
    nodeKeys.push({
      key: key,
      type: NODE_SELECTOR,
      label: key,
      value: inputVal,
      disabled: false
    });
  });

  // Rest node count
  if (maxTagCount >= 0 && maxTagCount < selectorValueList.length) {
    var content = '+ ' + (selectorValueList.length - maxTagCount) + ' ...';
    if (typeof maxTagPlaceholder === 'string') {
      content = maxTagPlaceholder;
    } else if (typeof maxTagPlaceholder === 'function') {
      var restValueList = selectorValueList.slice(maxTagCount);
      content = maxTagPlaceholder(restValueList.map(function (_ref) {
        var value = _ref.value;
        return value;
      }));
    }

    nodeKeys.push({
      key: 'rc-tree-select-internal-max-tag-counter',
      type: NODE_SELECTOR,
      label: null,
      value: content,
      disabled: true
    });
  }

  // Search node
  if (showSearch !== false) {
    nodeKeys.push({
      key: '__input',
      type: NODE_SEARCH
    });
  }
  return _react2["default"].createElement(
    'ul',
    {
      // keys={nodeKeys}
      className: prefixCls + '-selection__rendered'
      // component="ul"
      , role: 'menubar'
      // motionName={choiceTransitionName}
      // onLeaveEnd={onChoiceAnimationLeave}
    },
    nodeKeys.map(function (_ref2) {
      var type = _ref2.type,
          label = _ref2.label,
          value = _ref2.value,
          disabled = _ref2.disabled,
          className = _ref2.className,
          style = _ref2.style;

      if (type === NODE_SELECTOR) {
        return _react2["default"].createElement(_Selection2["default"], _extends({}, props, {
          className: className,
          style: style,
          key: label || TREE_SELECT_EMPTY_VALUE_KEY,
          label: label,
          value: value,
          onRemove: disabled ? null : onMultipleSelectorRemove
        }));
      }
      return _react2["default"].createElement(
        'li',
        { key: type, className: prefixCls + '-search ' + prefixCls + '-search--inline' },
        _react2["default"].createElement(_SearchInput2["default"], _extends({}, props, { ref: inputRef, needAlign: true }))
      );
    })
  );
};

SelectorList.propTypes = {
  selectorValueList: _propTypes2["default"].array,
  choiceTransitionName: _propTypes2["default"].string,
  prefixCls: _propTypes2["default"].string,
  onChoiceAnimationLeave: _propTypes2["default"].func,
  labelInValue: _propTypes2["default"].bool,
  showSearch: _propTypes2["default"].bool,
  maxTagCount: _propTypes2["default"].number,
  maxTagPlaceholder: _propTypes2["default"].oneOfType([_propTypes2["default"].node, _propTypes2["default"].func]),
  valueEntities: _propTypes2["default"].object,
  inputRef: _propTypes2["default"].func,
  onMultipleSelectorRemove: _propTypes2["default"].func
};

exports["default"] = SelectorList;