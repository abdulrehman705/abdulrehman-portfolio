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
var _clsx2 = _interopRequireDefault(require("clsx"));
var _immutable = _interopRequireDefault(require("immutable"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var React = _interopRequireWildcard(require("react"));
var _ContentBox = require("../demo/ContentBox");
var _LabeledInput = require("../demo/LabeledInput");
var _WindowScroller = _interopRequireDefault(require("./WindowScroller"));
var _List = _interopRequireDefault(require("../List"));
var _AutoSizer = _interopRequireDefault(require("../AutoSizer"));
var _WindowScrollerExample2 = _interopRequireDefault(require("./WindowScroller.example.css"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
/*:: type State = {
  scrollToIndex: number,
  showHeaderText: boolean,
};*/
var WindowScrollerExample = exports["default"] = /*#__PURE__*/function (_React$PureComponent) {
  function WindowScrollerExample() {
    var _this;
    (0, _classCallCheck2["default"])(this, WindowScrollerExample);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, WindowScrollerExample, [].concat(args));
    (0, _defineProperty2["default"])(_this, "state", {
      scrollToIndex: -1,
      showHeaderText: true
    });
    (0, _defineProperty2["default"])(_this, "_windowScroller", void 0);
    (0, _defineProperty2["default"])(_this, "_hideHeader", function () {
      var showHeaderText = _this.state.showHeaderText;
      _this.setState({
        showHeaderText: !showHeaderText
      }, function () {
        if (_this._windowScroller) {
          _this._windowScroller.updatePosition();
        }
      });
    });
    (0, _defineProperty2["default"])(_this, "_rowRenderer", function (_ref) {
      var index = _ref.index,
        isScrolling = _ref.isScrolling,
        isVisible = _ref.isVisible,
        key = _ref.key,
        style = _ref.style;
      var list = _this.context.list;
      var row = list.get(index);
      var className = (0, _clsx2["default"])(_WindowScrollerExample2["default"].row, (0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, _WindowScrollerExample2["default"].rowScrolling, isScrolling), "isVisible", isVisible));
      return /*#__PURE__*/React.createElement("div", {
        key: key,
        className: className,
        style: style
      }, row.name);
    });
    (0, _defineProperty2["default"])(_this, "_setRef", function (windowScroller) {
      _this._windowScroller = windowScroller;
    });
    (0, _defineProperty2["default"])(_this, "_onCheckboxChange", function (event) {
      _this.context.setScrollingCustomElement(event.target.checked);
    });
    (0, _defineProperty2["default"])(_this, "_onScrollToRowChange", function (event) {
      var list = _this.context.list;
      var scrollToIndex = Math.min(list.size - 1, parseInt(event.target.value, 10));
      if (isNaN(scrollToIndex)) {
        scrollToIndex = undefined;
      }
      setTimeout(function () {
        _this.setState({
          scrollToIndex: scrollToIndex
        });
      }, 0);
    });
    return _this;
  }
  (0, _inherits2["default"])(WindowScrollerExample, _React$PureComponent);
  return (0, _createClass2["default"])(WindowScrollerExample, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$context = this.context,
        customElement = _this$context.customElement,
        isScrollingCustomElement = _this$context.isScrollingCustomElement,
        list = _this$context.list;
      var _this$state = this.state,
        scrollToIndex = _this$state.scrollToIndex,
        showHeaderText = _this$state.showHeaderText;
      return /*#__PURE__*/React.createElement(_ContentBox.ContentBox, null, /*#__PURE__*/React.createElement(_ContentBox.ContentBoxHeader, {
        text: "WindowScroller",
        sourceLink: "https://github.com/bvaughn/react-virtualized/blob/master/source/WindowScroller/WindowScroller.example.js",
        docsLink: "https://github.com/bvaughn/react-virtualized/blob/master/docs/WindowScroller.md"
      }), showHeaderText && /*#__PURE__*/React.createElement(_ContentBox.ContentBoxParagraph, null, "This component decorates ", /*#__PURE__*/React.createElement("code", null, "List"), ", ", /*#__PURE__*/React.createElement("code", null, "Table"), ", or any other component and manages the window scroll to scroll through the list"), showHeaderText && /*#__PURE__*/React.createElement(_ContentBox.ContentBoxParagraph, null, /*#__PURE__*/React.createElement("button", {
        onClick: this._hideHeader
      }, "Hide header text")), /*#__PURE__*/React.createElement(_ContentBox.ContentBoxParagraph, null, /*#__PURE__*/React.createElement("label", {
        className: _WindowScrollerExample2["default"].checkboxLabel
      }, /*#__PURE__*/React.createElement("input", {
        "aria-label": "Use custom element for scrolling",
        className: _WindowScrollerExample2["default"].checkbox,
        type: "checkbox",
        checked: isScrollingCustomElement,
        onChange: this._onCheckboxChange
      }), "Use custom element for scrolling")), /*#__PURE__*/React.createElement(_LabeledInput.InputRow, null, /*#__PURE__*/React.createElement(_LabeledInput.LabeledInput, {
        label: "Scroll to",
        name: "onScrollToRow",
        placeholder: "Index...",
        onChange: this._onScrollToRowChange,
        value: scrollToIndex || ''
      })), /*#__PURE__*/React.createElement(_WindowScroller["default"], {
        ref: this._setRef,
        scrollElement: isScrollingCustomElement ? customElement : window
      }, function (_ref2) {
        var height = _ref2.height,
          isScrolling = _ref2.isScrolling,
          registerChild = _ref2.registerChild,
          onChildScroll = _ref2.onChildScroll,
          scrollTop = _ref2.scrollTop;
        return /*#__PURE__*/React.createElement("div", {
          className: _WindowScrollerExample2["default"].WindowScrollerWrapper
        }, /*#__PURE__*/React.createElement(_AutoSizer["default"], {
          disableHeight: true
        }, function (_ref3) {
          var width = _ref3.width;
          return /*#__PURE__*/React.createElement("div", {
            ref: registerChild
          }, /*#__PURE__*/React.createElement(_List["default"], {
            ref: function ref(el) {
              window.listEl = el;
            },
            autoHeight: true,
            className: _WindowScrollerExample2["default"].List,
            height: height,
            isScrolling: isScrolling,
            onScroll: onChildScroll,
            overscanRowCount: 2,
            rowCount: list.size,
            rowHeight: 30,
            rowRenderer: _this2._rowRenderer,
            scrollToIndex: scrollToIndex,
            scrollTop: scrollTop,
            width: width
          }));
        }));
      }));
    }
  }]);
}(React.PureComponent);
(0, _defineProperty2["default"])(WindowScrollerExample, "contextTypes", {
  customElement: _propTypes["default"].any,
  isScrollingCustomElement: _propTypes["default"].bool.isRequired,
  list: _propTypes["default"].instanceOf(_immutable["default"].List).isRequired,
  setScrollingCustomElement: _propTypes["default"].func
});