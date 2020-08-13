'use strict';

exports.__esModule = true;
exports.popupContextTypes = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends = _assign2["default"] || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactLifecyclesCompat = require('react-lifecycles-compat');

var _util = require('../util');

var _beePagination = require('bee-pagination');

var _beePagination2 = _interopRequireDefault(_beePagination);

var _beeLoading = require('bee-loading');

var _beeLoading2 = _interopRequireDefault(_beeLoading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : subClass.__proto__ = superClass; }

var popupContextTypes = exports.popupContextTypes = {
  onPopupKeyDown: _propTypes2["default"].func.isRequired,
  onMenuSelect: _propTypes2["default"].func.isRequired,
  onMenuMultipleSelect: _propTypes2["default"].func.isRequired
};

var BasePopup = (_temp = _class = function (_React$Component) {
  _inherits(BasePopup, _React$Component);

  function BasePopup() {
    _classCallCheck(this, BasePopup);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.getTree = function () {
      return _this.menuRef.current;
    };

    _this.renderNotFound = function () {
      var _this$props = _this.props,
          prefixCls = _this$props.prefixCls,
          notFoundContent = _this$props.notFoundContent,
          searchValue = _this$props.searchValue;

      return _react2["default"].createElement(
        'span',
        { className: prefixCls + '-not-found' },
        notFoundContent
      );
    };

    _this.onItemClick = function (event, item, _checked) {
      var multiple = _this.props.multiple;
      var _this$context$rcTreeS = _this.context.rcTreeSelect,
          onMenuSelect = _this$context$rcTreeS.onMenuSelect,
          onMenuMultipleSelect = _this$context$rcTreeS.onMenuMultipleSelect;

      if (multiple) {
        onMenuMultipleSelect(item, _checked);
      } else {
        onMenuSelect(item, _checked);
      }
    };

    _this.menuRef = (0, _util.createRef)();
    return _this;
  }

  BasePopup.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        dropdownPrefixCls = _props.dropdownPrefixCls,
        multiple = _props.multiple,
        ariaId = _props.ariaId,
        renderSearch = _props.renderSearch,
        valueList = _props.valueList,
        menuProps = _props.menuProps,
        selectorValueMap = _props.selectorValueMap,
        searchValue = _props.searchValue,
        searchStartFlag = _props.searchStartFlag,
        valueField = _props.valueField,
        pageCount = _props.pageCount,
        totalElements = _props.totalElements,
        currPageIndex = _props.currPageIndex,
        onPaginationSelect = _props.onPaginationSelect,
        displayField = _props.displayField,
        topPagination = _props.topPagination;
    var _context$rcTreeSelect = this.context.rcTreeSelect,
        onPopupKeyDown = _context$rcTreeSelect.onPopupKeyDown,
        onMenuSelect = _context$rcTreeSelect.onMenuSelect,
        onMenuMultipleSelect = _context$rcTreeSelect.onMenuMultipleSelect;

    var $notFound = void 0,
        $cloneMenuItems = [];
    if ((!valueList || !valueList.length) && !!searchStartFlag) {
      $notFound = this.renderNotFound();
    } else {
      valueList.forEach(function (item) {
        var text = '';
        if (typeof displayField === 'string') {
          text = displayField.format(item);
        } else if (typeof displayField === 'function') {
          text = displayField(item);
        } else {
          text = item.refname || 'refname miss';
        }
        var _checked = (0, _keys2["default"])(selectorValueMap).indexOf(item[valueField]) > -1;
        $cloneMenuItems.push(_react2["default"].createElement(
          'li',
          {
            role: 'option',
            unselectable: 'on',
            className: dropdownPrefixCls + '-menu-item ' + (_checked ? dropdownPrefixCls + '-menu-item-selected' : ''),
            key: item[valueField]
            // value={JSON.stringify(item)} 
            , onClick: function onClick(e) {
              return _this2.onItemClick(e, item, _checked);
            },
            title: text
          },
          text
        ));
      });
    }
    var $content = void 0;
    if ($notFound) {
      $content = $notFound;
    } else {
      $content = _react2["default"].createElement(
        'ul',
        _extends({
          ref: this.menuRef
        }, menuProps, {
          style: this.props.dropdownMenuStyle,
          role: 'listbox',
          className: dropdownPrefixCls + '-menu ' + dropdownPrefixCls + '-menu-root'
        }),
        $cloneMenuItems
      );
    }

    return _react2["default"].createElement(
      'div',
      { role: 'listbox', id: ariaId, onKeyDown: onPopupKeyDown, tabIndex: -1 },
      _react2["default"].createElement(_beeLoading2["default"], { show: this.props.loading, container: this }),
      renderSearch ? renderSearch() : null,
      !topPagination && $content,
      !!pageCount && _react2["default"].createElement(
        'div',
        { className: dropdownPrefixCls + '-pagination' },
        _react2["default"].createElement(_beePagination2["default"], {
          first: true,
          last: true,
          prev: true,
          next: true,
          boundaryLinks: true,
          gap: true,
          size: 'sm',
          maxButtons: 3,
          items: pageCount,
          total: totalElements,
          activePage: currPageIndex,
          onSelect: onPaginationSelect
        })
      ),
      topPagination && $content
    );
  };

  return BasePopup;
}(_react2["default"].Component), _class.contextTypes = {
  rcTreeSelect: _propTypes2["default"].shape(_extends({}, popupContextTypes))
}, _temp);


(0, _reactLifecyclesCompat.polyfill)(BasePopup);

exports["default"] = BasePopup;