'use strict';

exports.__esModule = true;
exports.searchContextTypes = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _extends = _assign2["default"] || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp; /**
                    * Since search box is in different position with different mode.
                    * - Single: in the popup box
                    * - multiple: in the selector
                    * Move the code as a SearchInput for easy management.
                    */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactLifecyclesCompat = require('react-lifecycles-compat');

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : subClass.__proto__ = superClass; }

var searchContextTypes = exports.searchContextTypes = {
  onSearchInputChange: _propTypes2["default"].func.isRequired
};

var SearchInput = (_temp = _class = function (_React$Component) {
  _inherits(SearchInput, _React$Component);

  function SearchInput() {
    _classCallCheck(this, SearchInput);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.alignInputWidth = function () {
      _this.inputRef.current.style.width = _this.mirrorInputRef.current.clientWidth + 10 + 'px';
    };

    _this.focus = function (isDidMount) {
      if (_this.inputRef.current) {
        _this.inputRef.current.focus();
        if (isDidMount) {
          setTimeout(function () {
            _this.inputRef.current.focus();
          }, 0);
        }
      }
    };

    _this.blur = function () {
      if (_this.inputRef.current) {
        _this.inputRef.current.blur();
      }
    };

    _this.inputRef = (0, _util.createRef)();
    _this.mirrorInputRef = (0, _util.createRef)();
    return _this;
  }

  SearchInput.prototype.componentDidMount = function componentDidMount() {
    var _props = this.props,
        open = _props.open,
        needAlign = _props.needAlign;

    if (needAlign) {
      this.alignInputWidth();
    }

    if (open) {
      this.focus(true);
    }
  };

  SearchInput.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _props2 = this.props,
        open = _props2.open,
        searchValue = _props2.searchValue,
        needAlign = _props2.needAlign,
        focus = _props2.focus;


    if (open && prevProps.open !== open) {
      this.focus();
    }

    if (needAlign && searchValue !== prevProps.searchValue) {
      this.alignInputWidth();
    }
  };

  /**
   * `scrollWidth` is not correct in IE, do the workaround.
   * ref: https://github.com/react-component/tree-select/issues/65
   */


  /**
   * Need additional timeout for focus cause parent dom is not ready when didMount trigger
   */


  SearchInput.prototype.render = function render() {
    var _props3 = this.props,
        searchValue = _props3.searchValue,
        prefixCls = _props3.prefixCls,
        disabled = _props3.disabled,
        renderPlaceholder = _props3.renderPlaceholder,
        open = _props3.open,
        ariaId = _props3.ariaId;
    var _context$rcTreeSelect = this.context.rcTreeSelect,
        onSearchInputChange = _context$rcTreeSelect.onSearchInputChange,
        onSearchInputKeyDown = _context$rcTreeSelect.onSearchInputKeyDown;


    return _react2["default"].createElement(
      'span',
      { className: prefixCls + '-search__field__wrap' },
      _react2["default"].createElement('input', {
        type: 'text',
        ref: this.inputRef,
        onChange: onSearchInputChange,
        onKeyDown: onSearchInputKeyDown,
        value: searchValue,
        disabled: disabled,
        className: prefixCls + '-search__field',

        'aria-label': 'filter select',
        'aria-autocomplete': 'list',
        'aria-controls': open ? ariaId : undefined,
        'aria-multiline': 'false'
      }),
      _react2["default"].createElement(
        'span',
        {
          ref: this.mirrorInputRef,
          className: prefixCls + '-search__field__mirror'
        },
        searchValue,
        '\xA0'
      ),
      renderPlaceholder ? renderPlaceholder() : null
    );
  };

  return SearchInput;
}(_react2["default"].Component), _class.propTypes = {
  open: _propTypes2["default"].bool,
  searchValue: _propTypes2["default"].string,
  prefixCls: _propTypes2["default"].string,
  disabled: _propTypes2["default"].bool,
  renderPlaceholder: _propTypes2["default"].func,
  needAlign: _propTypes2["default"].bool,
  ariaId: _propTypes2["default"].string
}, _class.contextTypes = {
  rcTreeSelect: _propTypes2["default"].shape(_extends({}, searchContextTypes))
}, _temp);


(0, _reactLifecyclesCompat.polyfill)(SearchInput);

exports["default"] = SearchInput;