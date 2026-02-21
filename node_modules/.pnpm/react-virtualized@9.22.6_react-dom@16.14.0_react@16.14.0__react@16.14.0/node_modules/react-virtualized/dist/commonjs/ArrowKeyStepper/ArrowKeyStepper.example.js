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
var _ContentBox = require("../demo/ContentBox");
var _ = _interopRequireDefault(require("./"));
var _AutoSizer = _interopRequireDefault(require("../AutoSizer"));
var _Grid = _interopRequireDefault(require("../Grid"));
var _clsx2 = _interopRequireDefault(require("clsx"));
var _ArrowKeyStepperExample2 = _interopRequireDefault(require("./ArrowKeyStepper.example.css"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /*:: import { type ScrollIndices } from './';*/
/*:: type State = {
  mode: 'edges' | 'cells',
  isClickable: boolean,
  scrollToColumn: number,
  scrollToRow: number,
};*/
var ArrowKeyStepperExample = exports["default"] = /*#__PURE__*/function (_React$PureComponent) {
  function ArrowKeyStepperExample() {
    var _this;
    (0, _classCallCheck2["default"])(this, ArrowKeyStepperExample);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, ArrowKeyStepperExample, [].concat(args));
    (0, _defineProperty2["default"])(_this, "state", {
      mode: 'edges',
      isClickable: true,
      scrollToColumn: 0,
      scrollToRow: 0
    });
    (0, _defineProperty2["default"])(_this, "_getColumnWidth", function (_ref /*:: */) {
      var index = _ref /*:: */.index;
      return (1 + index % 3) * 60;
    });
    (0, _defineProperty2["default"])(_this, "_getRowHeight", function (_ref2 /*:: */) {
      var index = _ref2 /*:: */.index;
      return (1 + index % 3) * 30;
    });
    (0, _defineProperty2["default"])(_this, "_cellRenderer", function (_ref3 /*:: */) {
      var columnIndex = _ref3 /*:: */.columnIndex,
        key = _ref3 /*:: */.key,
        rowIndex = _ref3 /*:: */.rowIndex,
        scrollToColumn = _ref3 /*:: */.scrollToColumn,
        scrollToRow = _ref3 /*:: */.scrollToRow,
        style = _ref3 /*:: */.style;
      var className = (0, _clsx2["default"])(_ArrowKeyStepperExample2["default"].Cell, (0, _defineProperty2["default"])({}, _ArrowKeyStepperExample2["default"].FocusedCell, columnIndex === scrollToColumn && rowIndex === scrollToRow));
      return /*#__PURE__*/React.createElement("span", {
        role: "none",
        className: className,
        key: key,
        onClick: _this.state.isClickable && function () {
          return _this._selectCell({
            scrollToColumn: columnIndex,
            scrollToRow: rowIndex
          });
        },
        style: style
      }, "r:".concat(rowIndex, ", c:").concat(columnIndex));
    });
    (0, _defineProperty2["default"])(_this, "_selectCell", function (_ref4 /*:: */) {
      var scrollToColumn = _ref4 /*:: */.scrollToColumn,
        scrollToRow = _ref4 /*:: */.scrollToRow;
      _this.setState({
        scrollToColumn: scrollToColumn,
        scrollToRow: scrollToRow
      });
    });
    (0, _defineProperty2["default"])(_this, "_onClickableChange", function (event /*: Event*/) {
      if (event.target instanceof HTMLInputElement) {
        _this.setState({
          isClickable: event.target.checked,
          scrollToColumn: 0,
          scrollToRow: 0
        });
      }
    });
    return _this;
  }
  (0, _inherits2["default"])(ArrowKeyStepperExample, _React$PureComponent);
  return (0, _createClass2["default"])(ArrowKeyStepperExample, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$state = this.state,
        mode = _this$state.mode,
        isClickable = _this$state.isClickable,
        scrollToColumn = _this$state.scrollToColumn,
        scrollToRow = _this$state.scrollToRow;
      return /*#__PURE__*/React.createElement(_ContentBox.ContentBox, null, /*#__PURE__*/React.createElement(_ContentBox.ContentBoxHeader, {
        text: "ArrowKeyStepper",
        sourceLink: "https://github.com/bvaughn/react-virtualized/blob/master/source/ArrowKeyStepper/ArrowKeyStepper.example.js",
        docsLink: "https://github.com/bvaughn/react-virtualized/blob/master/docs/ArrowKeyStepper.md"
      }), /*#__PURE__*/React.createElement(_ContentBox.ContentBoxParagraph, null, "This high-order component decorates a ", /*#__PURE__*/React.createElement("code", null, "List"), ",", ' ', /*#__PURE__*/React.createElement("code", null, "Table"), ", or ", /*#__PURE__*/React.createElement("code", null, "Grid"), " and responds to arrow-key events by scrolling one row or column at a time. Focus in the `Grid` below and use the left, right, up, or down arrow keys to move around within the grid."), /*#__PURE__*/React.createElement(_ContentBox.ContentBoxParagraph, null, "Note that unlike the other HOCs in react-virtualized, the", ' ', /*#__PURE__*/React.createElement("code", null, "ArrowKeyStepper"), " adds a ", /*#__PURE__*/React.createElement("code", null, "<div>"), " element around its children in order to attach a key-down event handler."), /*#__PURE__*/React.createElement(_ContentBox.ContentBoxParagraph, null, /*#__PURE__*/React.createElement("strong", null, "mode"), ":", /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
        "aria-label": "Set mode equal to \"cells\"",
        checked: mode === 'cells',
        className: _ArrowKeyStepperExample2["default"].Radio,
        type: "radio",
        onChange: function onChange(event) {
          return event.target.checked && _this2.setState({
            mode: 'cells'
          });
        },
        value: "cells"
      }), "cells"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
        "aria-label": "Set mode equal to \"edges\"",
        checked: mode === 'edges',
        className: _ArrowKeyStepperExample2["default"].Radio,
        type: "radio",
        onChange: function onChange(event) {
          return event.target.checked && _this2.setState({
            mode: 'edges'
          });
        },
        value: "edges"
      }), "edges (default)")), /*#__PURE__*/React.createElement(_ContentBox.ContentBoxParagraph, null, /*#__PURE__*/React.createElement("label", {
        className: _ArrowKeyStepperExample2["default"].checkboxLabel
      }, /*#__PURE__*/React.createElement("input", {
        "aria-label": "Enable click selection? (resets selection)",
        className: _ArrowKeyStepperExample2["default"].checkbox,
        type: "checkbox",
        checked: isClickable,
        onChange: this._onClickableChange
      }), "Enable click selection? (resets selection)")), /*#__PURE__*/React.createElement(_["default"], {
        columnCount: 100,
        isControlled: isClickable,
        onScrollToChange: isClickable ? this._selectCell : undefined,
        mode: mode,
        rowCount: 100,
        scrollToColumn: scrollToColumn,
        scrollToRow: scrollToRow
      }, function (_ref5) {
        var onSectionRendered = _ref5.onSectionRendered,
          scrollToColumn = _ref5.scrollToColumn,
          scrollToRow = _ref5.scrollToRow;
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_ContentBox.ContentBoxParagraph, null, "Most-recently-stepped column: ".concat(scrollToColumn, ", row: ").concat(scrollToRow)), /*#__PURE__*/React.createElement(_AutoSizer["default"], {
          disableHeight: true
        }, function (_ref6) {
          var width = _ref6.width;
          return /*#__PURE__*/React.createElement(_Grid["default"], {
            className: _ArrowKeyStepperExample2["default"].Grid,
            columnWidth: _this2._getColumnWidth,
            columnCount: 100,
            height: 200,
            onSectionRendered: onSectionRendered,
            cellRenderer: function cellRenderer(_ref7) {
              var columnIndex = _ref7.columnIndex,
                key = _ref7.key,
                rowIndex = _ref7.rowIndex,
                style = _ref7.style;
              return _this2._cellRenderer({
                columnIndex: columnIndex,
                key: key,
                rowIndex: rowIndex,
                scrollToColumn: scrollToColumn,
                scrollToRow: scrollToRow,
                style: style
              });
            },
            rowHeight: _this2._getRowHeight,
            rowCount: 100,
            scrollToColumn: scrollToColumn,
            scrollToRow: scrollToRow,
            width: width
          });
        }));
      }));
    }
  }]);
}(React.PureComponent);