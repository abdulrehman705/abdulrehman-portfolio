"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var React = _interopRequireWildcard(require("react"));
var ReactDOMServer = _interopRequireWildcard(require("react-dom/server"));
var _Grid = _interopRequireDefault(require("./Grid"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * 
 * @jest-environment node
 */
/*:: declare var test: any;*/
/*:: declare var expect: any;*/
test('should render Grid with dom server', function () {
  var rendered = ReactDOMServer.renderToString(/*#__PURE__*/React.createElement(_Grid["default"], {
    cellRenderer: function cellRenderer(_ref) {
      var style = _ref.style,
        key = _ref.key,
        rowIndex = _ref.rowIndex,
        columnIndex = _ref.columnIndex;
      return /*#__PURE__*/React.createElement("div", {
        style: style,
        key: key
      }, rowIndex + ':' + columnIndex);
    },
    columnCount: 1000,
    columnWidth: 20,
    height: 500,
    rowCount: 1000,
    rowHeight: 20,
    width: 500
  }));
  expect(rendered).toContain('0:0');
  expect(rendered).toContain('24:24');
  expect(rendered).not.toContain('25:25');
});
test('should support :scrollToColumn and :scrollToRow in server render', function () {
  var rendered = ReactDOMServer.renderToString(/*#__PURE__*/React.createElement(_Grid["default"], {
    cellRenderer: function cellRenderer(_ref2) {
      var style = _ref2.style,
        key = _ref2.key,
        rowIndex = _ref2.rowIndex,
        columnIndex = _ref2.columnIndex;
      return /*#__PURE__*/React.createElement("div", {
        style: style,
        key: key
      }, rowIndex + ':' + columnIndex);
    },
    columnCount: 1000,
    columnWidth: 20,
    scrollToColumn: 250,
    height: 500,
    rowCount: 1000,
    rowHeight: 20,
    scrollToRow: 250,
    width: 500
  }));
  expect(rendered).toContain('250:250');
  expect(rendered).not.toContain('0:0');
});