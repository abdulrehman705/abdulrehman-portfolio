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
var React = _interopRequireWildcard(require("react"));
var _ColumnSizerExample = _interopRequireDefault(require("./ColumnSizer.example.css"));
var _AutoSizer = _interopRequireDefault(require("../AutoSizer"));
var _ColumnSizer = _interopRequireDefault(require("./ColumnSizer"));
var _Grid = _interopRequireDefault(require("../Grid"));
var _ContentBox = require("../demo/ContentBox");
var _LabeledInput = require("../demo/LabeledInput");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var ColumnSizerExample = exports["default"] = /*#__PURE__*/function (_React$PureComponent) {
  function ColumnSizerExample(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, ColumnSizerExample);
    _this = _callSuper(this, ColumnSizerExample, [props]);
    _this.state = {
      columnMaxWidth: 100,
      columnMinWidth: 75,
      columnCount: 10
    };
    _this._noColumnMaxWidthChange = _this._noColumnMaxWidthChange.bind(_this);
    _this._noColumnMinWidthChange = _this._noColumnMinWidthChange.bind(_this);
    _this._onColumnCountChange = _this._onColumnCountChange.bind(_this);
    _this._noContentRenderer = _this._noContentRenderer.bind(_this);
    _this._cellRenderer = _this._cellRenderer.bind(_this);
    return _this;
  }
  (0, _inherits2["default"])(ColumnSizerExample, _React$PureComponent);
  return (0, _createClass2["default"])(ColumnSizerExample, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$state = this.state,
        columnMaxWidth = _this$state.columnMaxWidth,
        columnMinWidth = _this$state.columnMinWidth,
        columnCount = _this$state.columnCount;
      return /*#__PURE__*/React.createElement(_ContentBox.ContentBox, null, /*#__PURE__*/React.createElement(_ContentBox.ContentBoxHeader, {
        text: "ColumnSizer",
        sourceLink: "https://github.com/bvaughn/react-virtualized/blob/master/source/ColumnSizer/ColumnSizer.example.js",
        docsLink: "https://github.com/bvaughn/react-virtualized/blob/master/docs/ColumnSizer.md"
      }), /*#__PURE__*/React.createElement(_ContentBox.ContentBoxParagraph, null, "This component decorates a ", /*#__PURE__*/React.createElement("code", null, "Grid"), " and calculates the width of its columns based on the current (", /*#__PURE__*/React.createElement("code", null, "Grid"), ") width."), /*#__PURE__*/React.createElement(_LabeledInput.InputRow, null, /*#__PURE__*/React.createElement(_LabeledInput.LabeledInput, {
        label: "Num Columns",
        name: "columnCount",
        onChange: this._onColumnCountChange,
        value: columnCount
      }), /*#__PURE__*/React.createElement(_LabeledInput.LabeledInput, {
        label: "Column Min Width",
        name: "columnMinWidth",
        onChange: this._noColumnMinWidthChange,
        value: columnMinWidth
      }), /*#__PURE__*/React.createElement(_LabeledInput.LabeledInput, {
        label: "Column Max Width",
        name: "columnMaxWidth",
        onChange: this._noColumnMaxWidthChange,
        value: columnMaxWidth
      })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_AutoSizer["default"], {
        disableHeight: true
      }, function (_ref) {
        var width = _ref.width;
        return /*#__PURE__*/React.createElement(_ColumnSizer["default"], {
          columnMaxWidth: columnMaxWidth,
          columnMinWidth: columnMinWidth,
          columnCount: columnCount,
          key: "GridColumnSizer",
          width: width
        }, function (_ref2) {
          var adjustedWidth = _ref2.adjustedWidth,
            columnWidth = _ref2.columnWidth,
            registerChild = _ref2.registerChild;
          return /*#__PURE__*/React.createElement("div", {
            className: _ColumnSizerExample["default"].GridContainer,
            style: {
              height: 50,
              width: adjustedWidth
            }
          }, /*#__PURE__*/React.createElement(_Grid["default"], {
            ref: registerChild,
            columnWidth: columnWidth,
            columnCount: columnCount,
            height: 50,
            noContentRenderer: _this2._noContentRenderer,
            cellRenderer: _this2._cellRenderer,
            rowHeight: 50,
            rowCount: 1,
            width: adjustedWidth
          }));
        });
      })));
    }
  }, {
    key: "_noColumnMaxWidthChange",
    value: function _noColumnMaxWidthChange(event) {
      var columnMaxWidth = parseInt(event.target.value, 10);
      if (isNaN(columnMaxWidth)) {
        columnMaxWidth = undefined;
      } else {
        columnMaxWidth = Math.min(1000, columnMaxWidth);
      }
      this.setState({
        columnMaxWidth: columnMaxWidth
      });
    }
  }, {
    key: "_noColumnMinWidthChange",
    value: function _noColumnMinWidthChange(event) {
      var columnMinWidth = parseInt(event.target.value, 10);
      if (isNaN(columnMinWidth)) {
        columnMinWidth = undefined;
      } else {
        columnMinWidth = Math.max(1, columnMinWidth);
      }
      this.setState({
        columnMinWidth: columnMinWidth
      });
    }
  }, {
    key: "_onColumnCountChange",
    value: function _onColumnCountChange(event) {
      this.setState({
        columnCount: parseInt(event.target.value, 10) || 0
      });
    }
  }, {
    key: "_noContentRenderer",
    value: function _noContentRenderer() {
      return /*#__PURE__*/React.createElement("div", {
        className: _ColumnSizerExample["default"].noCells
      }, "No cells");
    }
  }, {
    key: "_cellRenderer",
    value: function _cellRenderer(_ref3) {
      var columnIndex = _ref3.columnIndex,
        key = _ref3.key,
        rowIndex = _ref3.rowIndex,
        style = _ref3.style;
      var className = columnIndex === 0 ? _ColumnSizerExample["default"].firstCell : _ColumnSizerExample["default"].cell;
      return /*#__PURE__*/React.createElement("div", {
        className: className,
        key: key,
        style: style
      }, "R:".concat(rowIndex, ", C:").concat(columnIndex));
    }
  }]);
}(React.PureComponent);