"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var React = _interopRequireWildcard(require("react"));
var ReactDOMServer = _interopRequireWildcard(require("react-dom/server"));
var _WindowScroller = _interopRequireDefault(require("./WindowScroller"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * @jest-environment node
 */

test('should render content with default widths and heights initially', function () {
  var rendered = ReactDOMServer.renderToString(/*#__PURE__*/React.createElement(_WindowScroller["default"], {
    serverHeight: 100,
    serverWidth: 200
  }, function (_ref) {
    var height = _ref.height,
      width = _ref.width;
    return /*#__PURE__*/React.createElement("div", null, "height:".concat(height, ";width:").concat(width));
  }));
  expect(rendered).toContain('height:100');
  expect(rendered).toContain('width:200');
});