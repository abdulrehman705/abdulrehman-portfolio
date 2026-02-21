"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _immutable = require("immutable");
var _propTypes = _interopRequireDefault(require("prop-types"));
var React = _interopRequireWildcard(require("react"));
var _ContentBox = require("../demo/ContentBox");
var _AutoSizer = _interopRequireDefault(require("./AutoSizer"));
var _List = _interopRequireDefault(require("../List"));
var _AutoSizerExample2 = _interopRequireDefault(require("./AutoSizer.example.css"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /*:: import { type RowRendererParams } from '../List';*/
/*:: type State = {
  hideDescription: boolean,
};*/
var AutoSizerExample = exports["default"] = /*#__PURE__*/function (_React$PureComponent) {
  function AutoSizerExample() {
    var _this;
    (0, _classCallCheck2["default"])(this, AutoSizerExample);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, AutoSizerExample, [].concat(args));
    (0, _defineProperty2["default"])(_this, "state", {
      hideDescription: false
    });
    (0, _defineProperty2["default"])(_this, "_rowRenderer", function (_ref /*:: */) {
      var index = _ref /*:: */.index,
        key = _ref /*:: */.key,
        style = _ref /*:: */.style;
      var list = _this.context.list;
      var row = list.get(index);
      return /*#__PURE__*/React.createElement("div", {
        key: key,
        className: _AutoSizerExample2["default"].row,
        style: style
      }, row.name);
    });
    return _this;
  }
  (0, _inherits2["default"])(AutoSizerExample, _React$PureComponent);
  return (0, _createClass2["default"])(AutoSizerExample, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var list = this.context.list;
      var hideDescription = this.state.hideDescription;
      return /*#__PURE__*/React.createElement(_ContentBox.ContentBox, (0, _extends2["default"])({}, this.props, {
        style: {
          height: 400
        }
      }), /*#__PURE__*/React.createElement(_ContentBox.ContentBoxHeader, {
        text: "AutoSizer",
        sourceLink: "https://github.com/bvaughn/react-virtualized/blob/master/source/AutoSizer/AutoSizer.example.js",
        docsLink: "https://github.com/bvaughn/react-virtualized/blob/master/docs/AutoSizer.md"
      }), /*#__PURE__*/React.createElement(_ContentBox.ContentBoxParagraph, null, /*#__PURE__*/React.createElement("label", {
        className: _AutoSizerExample2["default"].checkboxLabel
      }, /*#__PURE__*/React.createElement("input", {
        "aria-label": "Hide description (to show resize)?",
        className: _AutoSizerExample2["default"].checkbox,
        type: "checkbox",
        checked: hideDescription,
        onChange: function onChange(event) {
          return _this2.setState({
            hideDescription: event.target.checked
          });
        }
      }), "Hide description (to show resize)?")), !hideDescription && /*#__PURE__*/React.createElement(_ContentBox.ContentBoxParagraph, null, "This component decorates ", /*#__PURE__*/React.createElement("code", null, "List"), ", ", /*#__PURE__*/React.createElement("code", null, "Table"), ", or any other component and automatically manages its width and height. It uses Sebastian Decima's", ' ', /*#__PURE__*/React.createElement("a", {
        href: "https://github.com/sdecima/javascript-detect-element-resize",
        target: "_blank"
      }, "element resize event"), ' ', "to determine the appropriate size. In this example", ' ', /*#__PURE__*/React.createElement("code", null, "AutoSizer"), " grows to fill the remaining width and height of this flex column."), /*#__PURE__*/React.createElement("div", {
        className: _AutoSizerExample2["default"].AutoSizerWrapper
      }, /*#__PURE__*/React.createElement(_AutoSizer["default"], null, function (_ref2) {
        var width = _ref2.width,
          height = _ref2.height;
        return /*#__PURE__*/React.createElement(_List["default"], {
          className: _AutoSizerExample2["default"].List,
          height: height,
          rowCount: list.size,
          rowHeight: 30,
          rowRenderer: _this2._rowRenderer,
          width: width
        });
      })));
    }
  }]);
}(React.PureComponent);
(0, _defineProperty2["default"])(AutoSizerExample, "contextTypes", {
  list: _propTypes["default"].instanceOf(_immutable.List).isRequired
});