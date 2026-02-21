"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var React = _interopRequireWildcard(require("react"));
var _defaultHeaderRenderer = _interopRequireDefault(require("./defaultHeaderRenderer"));
var _defaultCellRenderer = _interopRequireDefault(require("./defaultCellRenderer"));
var _defaultCellDataGetter = _interopRequireDefault(require("./defaultCellDataGetter"));
var _SortDirection = _interopRequireDefault(require("./SortDirection"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
/**
 * Describes the header and cell contents of a table column.
 */
var Column = exports["default"] = /*#__PURE__*/function (_React$Component) {
  function Column() {
    (0, _classCallCheck2["default"])(this, Column);
    return _callSuper(this, Column, arguments);
  }
  (0, _inherits2["default"])(Column, _React$Component);
  return (0, _createClass2["default"])(Column);
}(React.Component);
(0, _defineProperty2["default"])(Column, "defaultProps", {
  cellDataGetter: _defaultCellDataGetter["default"],
  cellRenderer: _defaultCellRenderer["default"],
  defaultSortDirection: _SortDirection["default"].ASC,
  flexGrow: 0,
  flexShrink: 1,
  headerRenderer: _defaultHeaderRenderer["default"],
  style: {}
});
Column.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Optional aria-label value to set on the column header */
  'aria-label': _propTypes["default"].string,
  /**
   * Callback responsible for returning a cell's data, given its :dataKey
   * ({ columnData: any, dataKey: string, rowData: any }): any
   */
  cellDataGetter: _propTypes["default"].func,
  /**
   * Callback responsible for rendering a cell's contents.
   * ({ cellData: any, columnData: any, dataKey: string, rowData: any, rowIndex: number }): node
   */
  cellRenderer: _propTypes["default"].func,
  /** Optional CSS class to apply to cell */
  className: _propTypes["default"].string,
  /** Optional additional data passed to this column's :cellDataGetter */
  columnData: _propTypes["default"].object,
  /** Uniquely identifies the row-data attribute corresponding to this cell */
  dataKey: _propTypes["default"].any.isRequired,
  /** Optional direction to be used when clicked the first time */
  defaultSortDirection: _propTypes["default"].oneOf([_SortDirection["default"].ASC, _SortDirection["default"].DESC]),
  /** If sort is enabled for the table at large, disable it for this column */
  disableSort: _propTypes["default"].bool,
  /** Flex grow style; defaults to 0 */
  flexGrow: _propTypes["default"].number,
  /** Flex shrink style; defaults to 1 */
  flexShrink: _propTypes["default"].number,
  /** Optional CSS class to apply to this column's header */
  headerClassName: _propTypes["default"].string,
  /**
   * Optional callback responsible for rendering a column header contents.
   * ({ columnData: object, dataKey: string, disableSort: boolean, label: node, sortBy: string, sortDirection: string }): PropTypes.node
   */
  headerRenderer: _propTypes["default"].func.isRequired,
  /** Optional inline style to apply to this column's header */
  headerStyle: _propTypes["default"].object,
  /** Optional id to set on the column header */
  id: _propTypes["default"].string,
  /** Header label for this column */
  label: _propTypes["default"].node,
  /** Maximum width of column; this property will only be used if :flexGrow is > 0. */
  maxWidth: _propTypes["default"].number,
  /** Minimum width of column. */
  minWidth: _propTypes["default"].number,
  /** Optional inline style to apply to cell */
  style: _propTypes["default"].object,
  /** Flex basis (width) for this column; This value can grow or shrink based on :flexGrow and :flexShrink properties. */
  width: _propTypes["default"].number.isRequired
} : {};