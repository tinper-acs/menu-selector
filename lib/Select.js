'use strict';

exports.__esModule = true;

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends = _assign2["default"] || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps; /**
                                      * ARIA: https://www.w3.org/TR/wai-aria/#combobox
                                      * Sample 1: https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/examples/combobox/aria1.1pattern/listbox-combo.html
                                      * Sample 2: https://www.w3.org/blog/wai-components-gallery/widget/combobox-with-aria-autocompleteinline/
                                      *
                                      * Tab logic:
                                      * Popup is close
                                      * 1. Focus input (mark component as focused)
                                      * 2. Press enter to show the popup
                                      * 3. If popup has input, focus it
                                      *
                                      * Popup is open
                                      * 1. press tab to close the popup
                                      * 2. Focus back to the selection input box
                                      * 3. Let the native tab going on
                                      *
                                      * TreeSelect use 2 design type.
                                      * In single mode, we should focus on the `span`
                                      * In multiple mode, we should focus on the `input`
                                      */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactLifecyclesCompat = require('react-lifecycles-compat');

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _KeyCode = require('rc-util/lib/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _beeIcon = require('bee-icon');

var _beeIcon2 = _interopRequireDefault(_beeIcon);

var _SelectTrigger = require('./SelectTrigger');

var _SelectTrigger2 = _interopRequireDefault(_SelectTrigger);

var _BaseSelector = require('./Base/BaseSelector');

var _BasePopup = require('./Base/BasePopup');

var _SingleSelector = require('./Selector/SingleSelector');

var _SingleSelector2 = _interopRequireDefault(_SingleSelector);

var _SinglePopup = require('./Popup/SinglePopup');

var _SinglePopup2 = _interopRequireDefault(_SinglePopup);

var _MultiplePopup = require('./Popup/MultiplePopup');

var _MultiplePopup2 = _interopRequireDefault(_MultiplePopup);

var _MultipleSelector = require('./Selector/MultipleSelector');

var _MultipleSelector2 = _interopRequireDefault(_MultipleSelector);

var _util = require('./util');

var _propTypes3 = require('./propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : subClass.__proto__ = superClass; }

var Select = (_temp = _class = function (_React$Component) {
  _inherits(Select, _React$Component);

  function Select(props) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _initialiseProps.call(_this);

    var prefixAria = props.prefixAria,
        defaultOpen = props.defaultOpen,
        open = props.open,
        valueList = props.valueList;


    _this.state = {
      open: open || defaultOpen,
      selectorValueList: [],
      selectorValueMap: {},
      searchValue: '',
      value: '', //接收value
      init: true,
      valueList: valueList || []
    };

    _this.selectorRef = (0, _util.createRef)();
    _this.selectTriggerRef = (0, _util.createRef)();

    // ARIA need `aria-controls` props mapping
    // Since this need user input. Let's generate ourselves
    _this.ariaId = (0, _util.generateAriaId)(prefixAria + '-list');
    return _this;
  }

  Select.prototype.getChildContext = function getChildContext() {
    return {
      rcTreeSelect: {
        onSelectorFocus: this.onSelectorFocus,
        onSelectorBlur: this.onSelectorBlur,
        onSelectorKeyDown: this.onComponentKeyDown,
        onSelectorClear: this.onSelectorClear,
        onSelectorMenu: this.onSelectorMenu, //新增menu点击
        onMultipleSelectorRemove: this.onMultipleSelectorRemove,

        onPopupKeyDown: this.onComponentKeyDown,
        onMenuSelect: this.onMenuSelect,
        onMenuMultipleSelect: this.onMenuMultipleSelect, //多选与单选的方法区分开来

        onSearchInputChange: this.onSearchInputChange,
        onSearchInputKeyDown: this.onSearchInputKeyDown
      }
    };
  };

  Select.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var _prevState$prevProps = prevState.prevProps,
        prevProps = _prevState$prevProps === undefined ? {} : _prevState$prevProps;

    var newState = {
      prevProps: nextProps,
      init: false
    };

    // Process the state when props updated
    function processState(propName, updater) {
      if (prevProps[propName] !== nextProps[propName]) {
        updater(nextProps[propName], prevProps[propName]);
        return true;
      }
      return false;
    }
    var valueRefresh = false;
    // Open
    processState('open', function (propValue) {
      newState.open = propValue;
    });

    //getNewValueList
    processState('valueList', function (propValue) {
      newState.valueList = propValue;
      if (!prevState.init) {
        //不是初始化。因为初始化会继续走下面的value，初始化selectorValueList，不是初始化需要手动初始化
        //value分为两种，数组直接赋值，字符串需要在下拉数据中进行查找取出完整数据
        var value = prevState.value;
        if (Array.isArray(value)) {
          //修改，允许数组
          var temp = (0, _stringify2["default"])(value),
              selectorValueMap = {};
          newState.value = JSON.parse(temp);
          newState.selectorValueList = JSON.parse(temp);
          JSON.parse(temp).forEach(function (item) {
            selectorValueMap[item[nextProps.valueField]] = item;
          });
          newState.selectorValueMap = selectorValueMap;
          valueRefresh = false;
        } else {
          var _formatInternalValue = (0, _util.formatInternalValue)(value, nextProps),
              selectorValueList = _formatInternalValue.selectorValueList,
              _selectorValueMap = _formatInternalValue.selectorValueMap; // 考虑多选


          newState.selectorValueList = selectorValueList;
          newState.selectorValueMap = _selectorValueMap;
        }
      }
    });

    // Value change
    if (prevState.init) {
      processState('defaultValue', function (propValue) {
        // newState.valueList = formatInternalValue(propValue, nextProps);
        if (Array.isArray(propValue)) {
          //修改，允许数组
          var temp = (0, _stringify2["default"])(propValue),
              selectorValueMap = {};
          newState.value = JSON.parse(temp);
          newState.selectorValueList = JSON.parse(temp);
          JSON.parse(temp).forEach(function (item) {
            selectorValueMap[item[nextProps.valueField]] = item;
          });
          newState.selectorValueMap = selectorValueMap;
          valueRefresh = false;
        } else {
          newState.value = (0, _util.refValParse)(propValue, nextProps);
          valueRefresh = true;
        }
      });
    }
    processState('value', function (propValue) {
      if (Array.isArray(propValue)) {
        //修改，允许数组
        var temp = (0, _stringify2["default"])(propValue),
            selectorValueMap = {};
        newState.value = JSON.parse(temp);
        newState.selectorValueList = JSON.parse(temp);
        JSON.parse(temp).forEach(function (item) {
          selectorValueMap[item[nextProps.valueField]] = item;
        });
        newState.selectorValueMap = selectorValueMap;
        valueRefresh = false;
      } else {
        newState.value = (0, _util.refValParse)(propValue, nextProps);
        valueRefresh = true;
      }
    });

    // Selector Value List
    if (valueRefresh) {
      // Calculate the value list for `Selector` usage
      if (!newState.value) {
        newState.selectorValueList = [];
        newState.selectorValueMap = {};
      } else {
        var _formatInternalValue2 = (0, _util.formatInternalValue)(newState.value, nextProps),
            selectorValueList = _formatInternalValue2.selectorValueList,
            selectorValueMap = _formatInternalValue2.selectorValueMap; // 考虑多选


        newState.selectorValueList = selectorValueList;
        newState.selectorValueMap = selectorValueMap;
      }
    }

    // Search value
    processState('searchValue', function (propValue) {
      newState.searchValue = propValue;
    });
    return newState;
  };

  Select.prototype.componentDidMount = function componentDidMount() {
    var _props = this.props,
        autoFocus = _props.autoFocus,
        disabled = _props.disabled;


    if (autoFocus && !disabled) {
      this.focus();
    }
  };

  // ==================== Selector ====================

  // Handle key board event in both Selector and Popup


  /**
   * 添加navmenu操作
   */

  /**
   * @msg: selector的值改变
   * @param {type} 
   * status:false删除，true新增，
   * id:当前操作节点的id，
   * item当前操作节点的完整数据（valueList取）;
   * selectedArray当前popup选中的节点数组
   * @return: 
   *  update selectorValueList 
   *  Fire `onChange` event to user.
   */


  // ==================== Popup =====================
  /**
  * 多选状态下表格只能通过选择 checkbox 来选值，同时触发改方法
  * @function
  * 
  * @param record  当前操作的行数据
   * @param status  当前操作的行数据是选中状态还是其他
  */

  /**
  * 单击行选择该行数据，只在单选状态生效
  * @record {object} 该行数据
  */


  // ==================== Trigger =====================

  // [Legacy] Origin provide `documentClickClose` which triggered by `Trigger`
  // Currently `TreeSelect` align the hide popup logic as `Select` which blur to hide.
  // `documentClickClose` is not accurate anymore. Let's just keep the key word.

  /**
  * Only update the value which is not in props
  */


  // [Legacy] To align with `Select` component,
  // We use `searchValue` instead of `inputValue`
  // but currently still need support that.
  // Add this method the check if is controlled


  Select.prototype.focus = function focus() {
    this.selectorRef.current.focus();
  };

  Select.prototype.blur = function blur() {
    this.selectorRef.current.blur();
  };

  // ===================== Render =====================

  Select.prototype.render = function render() {
    var _state = this.state,
        _state$selectorValueL = _state.selectorValueList,
        selectorValueList = _state$selectorValueL === undefined ? [] : _state$selectorValueL,
        selectorValueMap = _state.selectorValueMap,
        open = _state.open,
        focused = _state.focused,
        searchValue = _state.searchValue,
        searchStartFlag = _state.searchStartFlag,
        valueList = _state.valueList;
    var _props2 = this.props,
        prefixCls = _props2.prefixCls,
        valueField = _props2.valueField,
        inputDisplay = _props2.inputDisplay,
        multiple = _props2.multiple;


    var passProps = _extends({}, this.props, {
      searchValue: searchValue,
      searchStartFlag: searchStartFlag,
      valueList: valueList,
      selectorValueList: selectorValueList,
      selectorValueMap: selectorValueMap,
      open: open,
      focused: focused,
      onChoiceAnimationLeave: this.onChoiceAnimationLeave,
      dropdownPrefixCls: prefixCls + '-dropdown',
      ariaId: this.ariaId,
      valueField: valueField,
      inputDisplay: inputDisplay
    });

    var Popup = multiple ? _MultiplePopup2["default"] : _SinglePopup2["default"];
    var $popup = _react2["default"].createElement(Popup, _extends({
      ref: this.setPopupRef
    }, passProps));

    var Selector = multiple ? _MultipleSelector2["default"] : _SingleSelector2["default"];
    var $selector = _react2["default"].createElement(Selector, _extends({}, passProps, { ref: this.selectorRef }));

    return _react2["default"].createElement(
      _SelectTrigger2["default"],
      _extends({}, passProps, {
        ref: this.selectTriggerRef,
        popupElement: $popup,
        onKeyDown: this.onKeyDown,
        onDropdownVisibleChange: this.onDropdownVisibleChange
      }),
      $selector
    );
  };

  return Select;
}(_react2["default"].Component), _class.propTypes = {
  prefixCls: _propTypes2["default"].string,
  prefixAria: _propTypes2["default"].string,
  multiple: _propTypes2["default"].bool,
  showArrow: _propTypes2["default"].bool,
  open: _propTypes2["default"].bool,
  value: _propTypes3.valueProp,
  autoFocus: _propTypes2["default"].bool,

  defaultOpen: _propTypes2["default"].bool,
  defaultValue: _propTypes3.valueProp,

  showSearch: _propTypes2["default"].bool,
  placeholder: _propTypes2["default"].node,
  // inputValue: PropTypes.string, // [Legacy] Deprecated. Use `searchValue` instead.
  searchValue: _propTypes2["default"].string,
  // autoClearSearchValue: PropTypes.bool,// [Legacy] Deprecated.
  searchPlaceholder: _propTypes2["default"].node, // [Legacy] Confuse with placeholder
  disabled: _propTypes2["default"].bool,
  // children: PropTypes.node,
  maxTagCount: _propTypes2["default"].number,
  maxTagPlaceholder: _propTypes2["default"].oneOfType([_propTypes2["default"].node, _propTypes2["default"].func]),
  // maxTagTextLength: PropTypes.number,

  dropdownMatchSelectWidth: _propTypes2["default"].bool,
  notFoundContent: _propTypes2["default"].node,

  onSearch: _propTypes2["default"].func,
  // onSelect: PropTypes.func,//Update state selectorValueList.
  onSelectorChange: _propTypes2["default"].func, //selector的值改变就会调用此方法，清空，单选多选选择数据，多选删除单个数据，多选delete删除
  // onDeselect: PropTypes.func,// [Legacy] Deprecated.
  // onChange: PropTypes.func,//Update state valueList. // [Legacy] Deprecated.
  onDropdownVisibleChange: _propTypes2["default"].func,

  // inputIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),// [Legacy] Deprecated.
  clearIcon: _propTypes2["default"].oneOfType([_propTypes2["default"].node, _propTypes2["default"].func]),
  removeIcon: _propTypes2["default"].oneOfType([_propTypes2["default"].node, _propTypes2["default"].func]),
  // switcherIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),// [Legacy] Deprecated.

  valueList: _propTypes2["default"].arrayOf(_propTypes2["default"].object),
  valueField: _propTypes2["default"].string,
  pageCount: _propTypes2["default"].number,
  totalElements: _propTypes2["default"].number,
  currPageIndex: _propTypes2["default"].number,
  onPaginationSelect: _propTypes2["default"].func,
  onMenuIconClick: _propTypes2["default"].func,
  inputDisplay: _propTypes2["default"].oneOfType([_propTypes2["default"].string, _propTypes2["default"].func]), //新增input框的展示方式
  displayField: _propTypes2["default"].oneOfType([_propTypes2["default"].string, _propTypes2["default"].func]), //下拉列表的展示
  topPagination: _propTypes2["default"].bool
}, _class.childContextTypes = {
  rcTreeSelect: _propTypes2["default"].shape(_extends({}, _BaseSelector.selectorContextTypes, _MultipleSelector.multipleSelectorContextTypes, _BasePopup.popupContextTypes, {

    onSearchInputChange: _propTypes2["default"].func,
    onSearchInputKeyDown: _propTypes2["default"].func
  }))
}, _class.defaultProps = {
  prefixCls: 'rc-tree-select',
  prefixAria: 'rc-tree-select',
  showArrow: true,
  showSearch: true,
  // autoClearSearchValue: true,// [Legacy] Deprecated.

  notFoundContent: 'Not Found',

  clearIcon: _react2["default"].createElement(_beeIcon2["default"], { className: 'rc-tree-select-selection-choice-clear-icon', type: ' uf-close-c' }), //是单选最后的X
  removeIcon: _react2["default"].createElement(_beeIcon2["default"], { className: 'rc-tree-select-selection-choice-remove-icon', type: ' uf-close' }), // 每项的关闭
  menuIcon: _react2["default"].createElement(_beeIcon2["default"], { className: 'rc-tree-select-selection-menu-icon', type: ' uf-navmenu' }), // 每项的关闭

  valueList: [],
  valueField: 'refpk',
  pageCount: 0,
  totalElements: 0,
  currPageIndex: 0,
  onPaginationSelect: function onPaginationSelect() {},
  onSelectorChange: function onSelectorChange() {},
  onMenuIconClick: function onMenuIconClick() {},
  inputDisplay: '{refname}',
  displayField: '{refname}',
  topPagination: false //分页在content上面
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onSelectorFocus = function () {
    _this2.setState({ focused: true });
  };

  this.onSelectorBlur = function () {
    _this2.setState({ focused: false });

    // TODO: Close when Popup is also not focused
    // this.setState({ open: false });
  };

  this.onComponentKeyDown = function (event) {
    var open = _this2.state.open;
    var keyCode = event.keyCode;

    if (!open) {
      if ([_KeyCode2["default"].ENTER, _KeyCode2["default"].DOWN].indexOf(keyCode) !== -1) {
        _this2.setOpenState(true);
      }
    } else if (_KeyCode2["default"].ESC === keyCode) {
      _this2.setOpenState(false);
    } else if ([_KeyCode2["default"].UP, _KeyCode2["default"].DOWN, _KeyCode2["default"].LEFT, _KeyCode2["default"].RIGHT].indexOf(keyCode) !== -1) {
      // TODO: Handle `open` state
      event.stopPropagation();
    }
  };

  this.onSelectorMenu = function (event) {
    event.stopPropagation();
    _this2.setOpenState(false);
    setTimeout(function () {
      _this2.props.onMenuIconClick();
    }, 0);
  };

  this.triggerChange = function (status, id, item, selectedArray) {
    var _props3 = _this2.props,
        onSelectorChange = _props3.onSelectorChange,
        onChange = _props3.onChange;
    var selectorValueList = _this2.state.selectorValueList;

    onSelectorChange(status, id, item, selectedArray);
    // Only do the logic when `onChange` function provided
    if (onChange) {
      onChange(selectorValueList);
    }
  };

  this.onSelectorClear = function (event) {
    event.stopPropagation();
    var _props4 = _this2.props,
        disabled = _props4.disabled,
        onSelect = _props4.onSelect;

    if (disabled) return;
    _this2.setState({
      value: [],
      selectorValueList: [],
      selectorValueMap: {}
    }, function () {
      _this2.triggerChange(false, null, null, []);
    });
    if (!_this2.isSearchValueControlled()) {
      _this2.setUncontrolledState({
        searchValue: ''
      });
    }
  };

  this.onMultipleSelectorRemove = function (event, removerId, removeValue) {
    event.stopPropagation();
    var selectorValueMap = _this2.state.selectorValueMap;

    var currentItem = selectorValueMap[removerId];
    delete selectorValueMap[removerId];
    var checkedArray = [];
    (0, _keys2["default"])(selectorValueMap).forEach(function (item) {
      checkedArray.push(selectorValueMap[item]);
    });
    _this2.setState({
      value: checkedArray,
      selectorValueList: checkedArray,
      selectorValueMap: selectorValueMap
    }, function () {
      _this2.triggerChange(false, removerId, currentItem, checkedArray);
    });
  };

  this.onMenuMultipleSelect = function (record, status) {
    if (!_this2.props.multiple) return;
    var valueField = _this2.props.valueField;
    var _state2 = _this2.state,
        selectorValueMap = _state2.selectorValueMap,
        selectorValueList = _state2.selectorValueList;

    if (record) {
      //添加
      if (!status && !selectorValueMap[record[valueField]]) {
        var checkedArray = selectorValueList;
        var checkedMap = selectorValueMap;
        checkedArray.push(record);
        checkedMap[record[valueField]] = record;
        _this2.setState({
          value: checkedArray,
          selectorValueList: checkedArray,
          selectorValueMap: checkedMap
        }, function () {
          _this2.triggerChange(!status, record[valueField], record, checkedArray);
        });
      } else if (status && selectorValueMap[record[valueField]]) {
        //删除
        delete selectorValueMap[record[valueField]];
        var _checkedArray = [];
        (0, _keys2["default"])(selectorValueMap).forEach(function (item) {
          _checkedArray.push(selectorValueMap[item]);
        });
        _this2.setState({
          value: _checkedArray,
          selectorValueList: _checkedArray,
          selectorValueMap: selectorValueMap
        }, function () {
          _this2.triggerChange(!status, record[valueField], record, _checkedArray);
        });
      }
    }
  };

  this.onMenuSelect = function (record) {
    var _props5 = _this2.props,
        valueField = _props5.valueField,
        multiple = _props5.multiple,
        onSelect = _props5.onSelect;

    if (!!multiple) return;
    var _state$selectorValueM = _this2.state.selectorValueMap,
        selectorValueMap = _state$selectorValueM === undefined ? {} : _state$selectorValueM;
    //点击同一行数据时取消选择

    if (selectorValueMap.hasOwnProperty(record[valueField])) {
      _this2.setState({
        value: [],
        selectorValueList: [],
        selectorValueMap: {}
      }, function () {
        _this2.triggerChange(false, record[valueField], record, []);
      });
    } else {
      var checkedRecord = (0, _assign2["default"])({ _checked: true }, record);
      var checkedArray = [checkedRecord];
      var checkedMap = {};
      checkedMap[checkedRecord[valueField]] = checkedRecord;
      _this2.setState({
        value: checkedArray,
        selectorValueList: checkedArray,
        selectorValueMap: checkedMap
      }, function () {
        _this2.setOpenState(false); //单选点击一次自动关闭
        _this2.triggerChange(true, record[valueField], record, checkedArray);
      });
    }
  };

  this.onDropdownVisibleChange = function (open) {
    _this2.setOpenState(open, true);
  };

  this.onSearchInputChange = function (_ref) {
    var value = _ref.target.value;
    var onSearch = _this2.props.onSearch;

    if (onSearch) {
      onSearch(value);
    }
    if (!_this2.isSearchValueControlled()) {
      _this2.setUncontrolledState({
        searchValue: value,
        searchStartFlag: true
      });
    } else {
      _this2.setState({
        searchValue: value,
        searchStartFlag: true
      });
    }

    _this2.setOpenState(true);
  };

  this.onSearchInputKeyDown = function (event) {
    var _state3 = _this2.state,
        searchValue = _state3.searchValue,
        selectorValueList = _state3.selectorValueList;
    var _props6 = _this2.props,
        multiple = _props6.multiple,
        valueField = _props6.valueField;
    var keyCode = event.keyCode;


    if (_KeyCode2["default"].BACKSPACE === keyCode && multiple && !searchValue && selectorValueList.length) {
      var lastValue = selectorValueList[selectorValueList.length - 1][valueField] || selectorValueList[selectorValueList.length - 1].refpk; //兼容input上的值是value字段获取的
      _this2.onMultipleSelectorRemove(event, lastValue);
    }
  };

  this.setOpenState = function (open) {
    var byTrigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var onDropdownVisibleChange = _this2.props.onDropdownVisibleChange;

    if (onDropdownVisibleChange && onDropdownVisibleChange(open, { documentClickClose: !open && byTrigger }) === false) {
      return;
    }
    _this2.setUncontrolledState({ open: open });
  };

  this.onChoiceAnimationLeave = function () {
    (0, _raf2["default"])(function () {
      _this2.forcePopupAlign();
    });
  };

  this.setPopupRef = function (popup) {
    _this2.popup = popup;
  };

  this.setUncontrolledState = function (state) {
    var needSync = false;
    var newState = {};

    (0, _keys2["default"])(state).forEach(function (name) {
      if (name in _this2.props) return;

      needSync = true;
      newState[name] = state[name];
    });

    if (needSync) {
      _this2.setState(newState);
    }

    return needSync;
  };

  this.isSearchValueControlled = function () {
    var inputValue = _this2.props.inputValue;

    if ('searchValue' in _this2.props) return true;
    return 'inputValue' in _this2.props && inputValue !== null;
  };

  this.forcePopupAlign = function () {
    var $trigger = _this2.selectTriggerRef.current;

    if ($trigger) {
      $trigger.forcePopupAlign();
    }
  };
}, _temp);

// Let warning show correct component name

Select.displayName = 'MenuSelect';
(0, _reactLifecyclesCompat.polyfill)(Select);
exports["default"] = Select;