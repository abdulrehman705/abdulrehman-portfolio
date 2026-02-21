"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _immutable = _interopRequireDefault(require("immutable"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var React = _interopRequireWildcard(require("react"));
var _CellMeasurer = _interopRequireDefault(require("./CellMeasurer"));
var _CellMeasurerCache = _interopRequireDefault(require("./CellMeasurerCache"));
var _Grid = _interopRequireDefault(require("../Grid"));
var _CellMeasurerExample = _interopRequireDefault(require("./CellMeasurer.example.css"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var DynamicHeightGrid = exports["default"] = /*#__PURE__*/function (_React$PureComponent) {
  function DynamicHeightGrid(props, context) {
    var _this;
    (0, _classCallCheck2["default"])(this, DynamicHeightGrid);
    _this = _callSuper(this, DynamicHeightGrid, [props, context]);
    _this._cache = new _CellMeasurerCache["default"]({
      defaultWidth: 150,
      fixedWidth: true
    });
    _this._cellRenderer = _this._cellRenderer.bind(_this);
    return _this;
  }
  (0, _inherits2["default"])(DynamicHeightGrid, _React$PureComponent);
  return (0, _createClass2["default"])(DynamicHeightGrid, [{
    key: "render",
    value: function render() {
      var width = this.props.width;
      return /*#__PURE__*/React.createElement(_Grid["default"], {
        className: _CellMeasurerExample["default"].BodyGrid,
        columnCount: 50,
        columnWidth: 150,
        deferredMeasurementCache: this._cache,
        height: 400,
        overscanColumnCount: 0,
        overscanRowCount: 2,
        cellRenderer: this._cellRenderer,
        rowCount: 1000,
        rowHeight: this._cache.rowHeight,
        width: width
      });
    }
  }, {
    key: "_cellRenderer",
    value: function _cellRenderer(_ref) {
      var columnIndex = _ref.columnIndex,
        key = _ref.key,
        parent = _ref.parent,
        rowIndex = _ref.rowIndex,
        style = _ref.style;
      var _this$props = this.props,
        getClassName = _this$props.getClassName,
        getContent = _this$props.getContent,
        list = _this$props.list;
      var datum = list.get((rowIndex + columnIndex) % list.size);
      var classNames = getClassName({
        columnIndex: columnIndex,
        rowIndex: rowIndex
      });
      var content = getContent({
        index: rowIndex,
        datum: datum
      });
      return /*#__PURE__*/React.createElement(_CellMeasurer["default"], {
        cache: this._cache,
        columnIndex: columnIndex,
        key: key,
        parent: parent,
        rowIndex: rowIndex
      }, /*#__PURE__*/React.createElement("div", {
        className: classNames,
        style: _objectSpread(_objectSpread({}, style), {}, {
          width: 150
        })
      }, content));
    }
  }]);
}(React.PureComponent);
DynamicHeightGrid.propTypes = process.env.NODE_ENV !== "production" ? {
  getClassName: _propTypes["default"].func.isRequired,
  getContent: _propTypes["default"].func.isRequired,
  list: _propTypes["default"].instanceOf(_immutable["default"].List).isRequired,
  width: _propTypes["default"].number.isRequired
} : {};