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
var _immutable = _interopRequireDefault(require("immutable"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var React = _interopRequireWildcard(require("react"));
var _CellMeasurer = _interopRequireDefault(require("./CellMeasurer"));
var _CellMeasurerCache = _interopRequireDefault(require("./CellMeasurerCache"));
var _Table = require("../Table");
var _CellMeasurerExample = _interopRequireDefault(require("./CellMeasurer.example.css"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var DynamicHeightTableColumn = exports["default"] = /*#__PURE__*/function (_React$PureComponent) {
  function DynamicHeightTableColumn() {
    var _this;
    (0, _classCallCheck2["default"])(this, DynamicHeightTableColumn);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, DynamicHeightTableColumn, [].concat(args));
    (0, _defineProperty2["default"])(_this, "_cache", new _CellMeasurerCache["default"]({
      fixedWidth: true,
      minHeight: 25
    }));
    (0, _defineProperty2["default"])(_this, "_lastRenderedWidth", _this.props.width);
    (0, _defineProperty2["default"])(_this, "_columnCellRenderer", function (_ref) {
      var dataKey = _ref.dataKey,
        parent = _ref.parent,
        rowIndex = _ref.rowIndex;
      var list = _this.props.list;
      var datum = list.get(rowIndex % list.size);
      var content = rowIndex % 5 === 0 ? '' : datum.randomLong;
      return /*#__PURE__*/React.createElement(_CellMeasurer["default"], {
        cache: _this._cache,
        columnIndex: 0,
        key: dataKey,
        parent: parent,
        rowIndex: rowIndex
      }, /*#__PURE__*/React.createElement("div", {
        className: _CellMeasurerExample["default"].tableColumn,
        style: {
          whiteSpace: 'normal'
        }
      }, content));
    });
    (0, _defineProperty2["default"])(_this, "_rowGetter", function (_ref2) {
      var index = _ref2.index;
      var list = _this.props.list;
      return list.get(index % list.size);
    });
    return _this;
  }
  (0, _inherits2["default"])(DynamicHeightTableColumn, _React$PureComponent);
  return (0, _createClass2["default"])(DynamicHeightTableColumn, [{
    key: "render",
    value: function render() {
      var width = this.props.width;
      if (this._lastRenderedWidth !== this.props.width) {
        this._lastRenderedWidth = this.props.width;
        this._cache.clearAll();
      }
      return /*#__PURE__*/React.createElement(_Table.Table, {
        deferredMeasurementCache: this._cache,
        headerHeight: 20,
        height: 400,
        overscanRowCount: 2,
        rowClassName: _CellMeasurerExample["default"].tableRow,
        rowHeight: this._cache.rowHeight,
        rowGetter: this._rowGetter,
        rowCount: 1000,
        width: width
      }, /*#__PURE__*/React.createElement(_Table.Column, {
        className: _CellMeasurerExample["default"].tableColumn,
        dataKey: "name",
        label: "Name",
        width: 125
      }), /*#__PURE__*/React.createElement(_Table.Column, {
        className: _CellMeasurerExample["default"].tableColumn,
        dataKey: "color",
        label: "Color",
        width: 75
      }), /*#__PURE__*/React.createElement(_Table.Column, {
        width: width - 200,
        dataKey: "random",
        label: "Dynamic text",
        cellRenderer: this._columnCellRenderer
      }));
    }
  }]);
}(React.PureComponent);
DynamicHeightTableColumn.propTypes = process.env.NODE_ENV !== "production" ? {
  list: _propTypes["default"].instanceOf(_immutable["default"].List).isRequired,
  width: _propTypes["default"].number.isRequired
} : {};