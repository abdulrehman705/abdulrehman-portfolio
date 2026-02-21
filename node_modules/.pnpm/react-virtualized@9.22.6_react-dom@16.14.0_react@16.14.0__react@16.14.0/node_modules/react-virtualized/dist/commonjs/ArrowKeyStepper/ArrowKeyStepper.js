"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var React = _interopRequireWildcard(require("react"));
var _reactLifecyclesCompat = require("react-lifecycles-compat");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /*:: import type {RenderedSection} from '../Grid';*/ /*:: import type {ScrollIndices} from './types';*/
/**
 * This HOC decorates a virtualized component and responds to arrow-key events by scrolling one row or column at a time.
 */
/*:: type ChildrenParams = {
  onSectionRendered: (params: RenderedSection) => void,
  scrollToColumn: number,
  scrollToRow: number,
};*/
/*:: type Props = {
  children: (params: ChildrenParams) => React.Element<*>,
  className?: string,
  columnCount: number,
  disabled: boolean,
  isControlled: boolean,
  mode: 'cells' | 'edges',
  onScrollToChange?: (params: ScrollIndices) => void,
  rowCount: number,
  scrollToColumn: number,
  scrollToRow: number,
};*/
/*:: type State = ScrollIndices & {
  instanceProps: {
    prevScrollToColumn: number,
    prevScrollToRow: number,
  },
};*/
var ArrowKeyStepper = /*#__PURE__*/function (_React$PureComponent) {
  function ArrowKeyStepper() {
    var _this;
    (0, _classCallCheck2["default"])(this, ArrowKeyStepper);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, ArrowKeyStepper, [].concat(args));
    (0, _defineProperty2["default"])(_this, "state", {
      scrollToColumn: 0,
      scrollToRow: 0,
      instanceProps: {
        prevScrollToColumn: 0,
        prevScrollToRow: 0
      }
    });
    (0, _defineProperty2["default"])(_this, "_columnStartIndex", 0);
    (0, _defineProperty2["default"])(_this, "_columnStopIndex", 0);
    (0, _defineProperty2["default"])(_this, "_rowStartIndex", 0);
    (0, _defineProperty2["default"])(_this, "_rowStopIndex", 0);
    (0, _defineProperty2["default"])(_this, "_onKeyDown", function (event /*: KeyboardEvent*/) {
      var _this$props = _this.props,
        columnCount = _this$props.columnCount,
        disabled = _this$props.disabled,
        mode = _this$props.mode,
        rowCount = _this$props.rowCount;
      if (disabled) {
        return;
      }
      var _this$_getScrollState = _this._getScrollState(),
        scrollToColumnPrevious = _this$_getScrollState.scrollToColumn,
        scrollToRowPrevious = _this$_getScrollState.scrollToRow;
      var _this$_getScrollState2 = _this._getScrollState(),
        scrollToColumn = _this$_getScrollState2.scrollToColumn,
        scrollToRow = _this$_getScrollState2.scrollToRow;

      // The above cases all prevent default event event behavior.
      // This is to keep the grid from scrolling after the snap-to update.
      switch (event.key) {
        case 'ArrowDown':
          scrollToRow = mode === 'cells' ? Math.min(scrollToRow + 1, rowCount - 1) : Math.min(_this._rowStopIndex + 1, rowCount - 1);
          break;
        case 'ArrowLeft':
          scrollToColumn = mode === 'cells' ? Math.max(scrollToColumn - 1, 0) : Math.max(_this._columnStartIndex - 1, 0);
          break;
        case 'ArrowRight':
          scrollToColumn = mode === 'cells' ? Math.min(scrollToColumn + 1, columnCount - 1) : Math.min(_this._columnStopIndex + 1, columnCount - 1);
          break;
        case 'ArrowUp':
          scrollToRow = mode === 'cells' ? Math.max(scrollToRow - 1, 0) : Math.max(_this._rowStartIndex - 1, 0);
          break;
      }
      if (scrollToColumn !== scrollToColumnPrevious || scrollToRow !== scrollToRowPrevious) {
        event.preventDefault();
        _this._updateScrollState({
          scrollToColumn: scrollToColumn,
          scrollToRow: scrollToRow
        });
      }
    });
    (0, _defineProperty2["default"])(_this, "_onSectionRendered", function (_ref /*:: */) {
      var columnStartIndex = _ref /*:: */.columnStartIndex,
        columnStopIndex = _ref /*:: */.columnStopIndex,
        rowStartIndex = _ref /*:: */.rowStartIndex,
        rowStopIndex = _ref /*:: */.rowStopIndex;
      _this._columnStartIndex = columnStartIndex;
      _this._columnStopIndex = columnStopIndex;
      _this._rowStartIndex = rowStartIndex;
      _this._rowStopIndex = rowStopIndex;
    });
    return _this;
  }
  (0, _inherits2["default"])(ArrowKeyStepper, _React$PureComponent);
  return (0, _createClass2["default"])(ArrowKeyStepper, [{
    key: "setScrollIndexes",
    value: function setScrollIndexes(_ref2 /*:: */) {
      var scrollToColumn = _ref2 /*:: */.scrollToColumn,
        scrollToRow = _ref2 /*:: */.scrollToRow;
      this.setState({
        scrollToRow: scrollToRow,
        scrollToColumn: scrollToColumn
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        className = _this$props2.className,
        children = _this$props2.children;
      var _this$_getScrollState3 = this._getScrollState(),
        scrollToColumn = _this$_getScrollState3.scrollToColumn,
        scrollToRow = _this$_getScrollState3.scrollToRow;
      return /*#__PURE__*/React.createElement("div", {
        className: className,
        onKeyDown: this._onKeyDown
      }, children({
        onSectionRendered: this._onSectionRendered,
        scrollToColumn: scrollToColumn,
        scrollToRow: scrollToRow
      }));
    }
  }, {
    key: "_getScrollState",
    value: function _getScrollState() {
      return this.props.isControlled ? this.props : this.state;
    }
  }, {
    key: "_updateScrollState",
    value: function _updateScrollState(_ref3 /*:: */) {
      var scrollToColumn = _ref3 /*:: */.scrollToColumn,
        scrollToRow = _ref3 /*:: */.scrollToRow;
      var _this$props3 = this.props,
        isControlled = _this$props3.isControlled,
        onScrollToChange = _this$props3.onScrollToChange;
      if (typeof onScrollToChange === 'function') {
        onScrollToChange({
          scrollToColumn: scrollToColumn,
          scrollToRow: scrollToRow
        });
      }
      if (!isControlled) {
        this.setState({
          scrollToColumn: scrollToColumn,
          scrollToRow: scrollToRow
        });
      }
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps /*: Props*/, prevState /*: State*/) /*: $Shape<State>*/{
      if (nextProps.isControlled) {
        return {};
      }
      if (nextProps.scrollToColumn !== prevState.instanceProps.prevScrollToColumn || nextProps.scrollToRow !== prevState.instanceProps.prevScrollToRow) {
        return _objectSpread(_objectSpread({}, prevState), {}, {
          scrollToColumn: nextProps.scrollToColumn,
          scrollToRow: nextProps.scrollToRow,
          instanceProps: {
            prevScrollToColumn: nextProps.scrollToColumn,
            prevScrollToRow: nextProps.scrollToRow
          }
        });
      }
      return {};
    }
  }]);
}(React.PureComponent);
(0, _defineProperty2["default"])(ArrowKeyStepper, "defaultProps", {
  disabled: false,
  isControlled: false,
  mode: 'edges',
  scrollToColumn: 0,
  scrollToRow: 0
});
(0, _reactLifecyclesCompat.polyfill)(ArrowKeyStepper);
var _default = exports["default"] = ArrowKeyStepper;