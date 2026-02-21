"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var React = _interopRequireWildcard(require("react"));
var _reactDom = require("react-dom");
var _TestUtils = require("../TestUtils");
var _ScrollSync = _interopRequireDefault(require("./ScrollSync"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ChildComponent(_ref) {
  var clientHeight = _ref.clientHeight,
    clientWidth = _ref.clientWidth,
    scrollHeight = _ref.scrollHeight,
    scrollLeft = _ref.scrollLeft,
    scrollTop = _ref.scrollTop,
    scrollWidth = _ref.scrollWidth;
  return /*#__PURE__*/React.createElement("div", null, "clientHeight:".concat(clientHeight), "clientWidth:".concat(clientWidth), "scrollHeight:".concat(scrollHeight), "scrollLeft:".concat(scrollLeft), "scrollTop:".concat(scrollTop), "scrollWidth:".concat(scrollWidth));
}
describe('ScrollSync', function () {
  it('should pass through an initial value of 0 for :scrollLeft and :scrollTop', function () {
    var component = (0, _TestUtils.render)(/*#__PURE__*/React.createElement(_ScrollSync["default"], null, function (_ref2) {
      var clientHeight = _ref2.clientHeight,
        clientWidth = _ref2.clientWidth,
        scrollHeight = _ref2.scrollHeight,
        scrollLeft = _ref2.scrollLeft,
        scrollTop = _ref2.scrollTop,
        scrollWidth = _ref2.scrollWidth;
      return /*#__PURE__*/React.createElement(ChildComponent, {
        clientHeight: clientHeight,
        clientWidth: clientWidth,
        scrollHeight: scrollHeight,
        scrollLeft: scrollLeft,
        scrollTop: scrollTop,
        scrollWidth: scrollWidth
      });
    }));
    expect((0, _reactDom.findDOMNode)(component).textContent).toContain('clientHeight:0');
    expect((0, _reactDom.findDOMNode)(component).textContent).toContain('clientWidth:0');
    expect((0, _reactDom.findDOMNode)(component).textContent).toContain('scrollHeight:0');
    expect((0, _reactDom.findDOMNode)(component).textContent).toContain('scrollLeft:0');
    expect((0, _reactDom.findDOMNode)(component).textContent).toContain('scrollTop:0');
    expect((0, _reactDom.findDOMNode)(component).textContent).toContain('scrollWidth:0');
  });
  it('should update :scrollLeft and :scrollTop when :onScroll is called', function () {
    var onScroll;
    var component = (0, _TestUtils.render)(/*#__PURE__*/React.createElement(_ScrollSync["default"], null, function (params) {
      onScroll = params.onScroll;
      return /*#__PURE__*/React.createElement(ChildComponent, params);
    }));
    onScroll({
      clientHeight: 400,
      clientWidth: 200,
      scrollHeight: 1000,
      scrollLeft: 50,
      scrollTop: 100,
      scrollWidth: 500
    });
    expect((0, _reactDom.findDOMNode)(component).textContent).toContain('clientHeight:400');
    expect((0, _reactDom.findDOMNode)(component).textContent).toContain('clientWidth:200');
    expect((0, _reactDom.findDOMNode)(component).textContent).toContain('scrollHeight:1000');
    expect((0, _reactDom.findDOMNode)(component).textContent).toContain('scrollLeft:50');
    expect((0, _reactDom.findDOMNode)(component).textContent).toContain('scrollTop:100');
    expect((0, _reactDom.findDOMNode)(component).textContent).toContain('scrollWidth:500');
  });
});