"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var React = _interopRequireWildcard(require("react"));
var _immutable = _interopRequireDefault(require("immutable"));
var _defaultCellDataGetter = _interopRequireDefault(require("./defaultCellDataGetter"));
var _defaultCellRenderer = _interopRequireDefault(require("./defaultCellRenderer"));
var _defaultHeaderRenderer = _interopRequireDefault(require("./defaultHeaderRenderer"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
describe('Column', function () {
  var rowData = _immutable["default"].Map({
    foo: 'Foo',
    bar: 1
  });
  describe('defaultCellDataGetter', function () {
    it('should return a value for specified attributes', function () {
      expect((0, _defaultCellDataGetter["default"])({
        dataKey: 'foo',
        rowData: rowData
      })).toEqual('Foo');
      expect((0, _defaultCellDataGetter["default"])({
        dataKey: 'bar',
        rowData: rowData
      })).toEqual(1);
    });
    it('should return undefined for missing attributes', function () {
      expect((0, _defaultCellDataGetter["default"])({
        dataKey: 'baz',
        rowData: rowData
      })).toEqual(undefined);
    });
  });
  describe('defaultCellRenderer', function () {
    it('should render a value for specified attributes', function () {
      expect((0, _defaultCellRenderer["default"])({
        cellData: 'Foo',
        dataKey: 'foo',
        rowData: rowData,
        rowIndex: 0
      })).toEqual('Foo');
      expect((0, _defaultCellRenderer["default"])({
        cellData: 1,
        dataKey: 'bar',
        rowData: rowData,
        rowIndex: 0
      })).toEqual('1');
    });
    it('should render empty string for null or missing attributes', function () {
      expect((0, _defaultCellRenderer["default"])({
        cellData: null,
        dataKey: 'baz',
        rowData: rowData,
        rowIndex: 0
      })).toEqual('');
      expect((0, _defaultCellRenderer["default"])({
        cellData: undefined,
        dataKey: 'baz',
        rowData: rowData,
        rowIndex: 0
      })).toEqual('');
    });
  });
  describe('defaultHeaderRenderer', function () {
    it('should render a value for specified attributes', function () {
      expect((0, _defaultHeaderRenderer["default"])({
        dataKey: 'foo',
        label: 'squirrel'
      })[0].props.children).toEqual('squirrel');
      var label = /*#__PURE__*/React.createElement("div", {
        className: "rabbit"
      }, "Rabbit");
      expect((0, _defaultHeaderRenderer["default"])({
        dataKey: 'bar',
        label: label
      })[0].props.children).toEqual(label);
    });
    it('should render empty string for null or missing attributes', function () {
      expect((0, _defaultHeaderRenderer["default"])({
        dataKey: 'foo',
        label: null
      })[0].props.children).toBeNull();
      expect((0, _defaultHeaderRenderer["default"])({
        dataKey: 'bar',
        label: undefined
      })[0].props.children).toBeUndefined();
    });
  });
});