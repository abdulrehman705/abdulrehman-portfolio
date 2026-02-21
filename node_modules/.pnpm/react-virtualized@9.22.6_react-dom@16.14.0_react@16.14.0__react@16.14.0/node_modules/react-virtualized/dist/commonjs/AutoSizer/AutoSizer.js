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
var React = _interopRequireWildcard(require("react"));
var _detectElementResize = _interopRequireDefault(require("../vendor/detectElementResize"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
/*:: type Size = {
  height: number,
  width: number,
};*/
/*:: type Props = {
  /** Function responsible for rendering children.*-/
  children: Size => React.Element<*>,

  /** Optional custom CSS class name to attach to root AutoSizer element.  *-/
  className?: string,

  /** Default height to use for initial render; useful for SSR *-/
  defaultHeight?: number,

  /** Default width to use for initial render; useful for SSR *-/
  defaultWidth?: number,

  /** Disable dynamic :height property *-/
  disableHeight: boolean,

  /** Disable dynamic :width property *-/
  disableWidth: boolean,

  /** Nonce of the inlined stylesheet for Content Security Policy *-/
  nonce?: string,

  /** Callback to be invoked on-resize *-/
  onResize: Size => void,

  /** Optional inline style *-/
  style: ?Object,
};*/
/*:: type State = {
  height: number,
  width: number,
};*/
/*:: type ResizeHandler = (element: HTMLElement, onResize: () => void) => void;*/
/*:: type DetectElementResize = {
  addResizeListener: ResizeHandler,
  removeResizeListener: ResizeHandler,
};*/
var AutoSizer = exports["default"] = /*#__PURE__*/function (_React$Component) {
  function AutoSizer() {
    var _this;
    (0, _classCallCheck2["default"])(this, AutoSizer);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, AutoSizer, [].concat(args));
    (0, _defineProperty2["default"])(_this, "state", {
      height: _this.props.defaultHeight || 0,
      width: _this.props.defaultWidth || 0
    });
    (0, _defineProperty2["default"])(_this, "_parentNode", void 0);
    (0, _defineProperty2["default"])(_this, "_autoSizer", void 0);
    (0, _defineProperty2["default"])(_this, "_window", void 0);
    // uses any instead of Window because Flow doesn't have window type
    (0, _defineProperty2["default"])(_this, "_detectElementResize", void 0);
    (0, _defineProperty2["default"])(_this, "_onResize", function () {
      var _this$props = _this.props,
        disableHeight = _this$props.disableHeight,
        disableWidth = _this$props.disableWidth,
        onResize = _this$props.onResize;
      if (_this._parentNode) {
        // Guard against AutoSizer component being removed from the DOM immediately after being added.
        // This can result in invalid style values which can result in NaN values if we don't handle them.
        // See issue #150 for more context.

        var height = _this._parentNode.offsetHeight || 0;
        var width = _this._parentNode.offsetWidth || 0;
        var win = _this._window || window;
        var style = win.getComputedStyle(_this._parentNode) || {};
        var paddingLeft = parseInt(style.paddingLeft, 10) || 0;
        var paddingRight = parseInt(style.paddingRight, 10) || 0;
        var paddingTop = parseInt(style.paddingTop, 10) || 0;
        var paddingBottom = parseInt(style.paddingBottom, 10) || 0;
        var newHeight = height - paddingTop - paddingBottom;
        var newWidth = width - paddingLeft - paddingRight;
        if (!disableHeight && _this.state.height !== newHeight || !disableWidth && _this.state.width !== newWidth) {
          _this.setState({
            height: height - paddingTop - paddingBottom,
            width: width - paddingLeft - paddingRight
          });
          onResize({
            height: height,
            width: width
          });
        }
      }
    });
    (0, _defineProperty2["default"])(_this, "_setRef", function (autoSizer /*: ?HTMLElement*/) {
      _this._autoSizer = autoSizer;
    });
    return _this;
  }
  (0, _inherits2["default"])(AutoSizer, _React$Component);
  return (0, _createClass2["default"])(AutoSizer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var nonce = this.props.nonce;
      if (this._autoSizer && this._autoSizer.parentNode && this._autoSizer.parentNode.ownerDocument && this._autoSizer.parentNode.ownerDocument.defaultView && this._autoSizer.parentNode instanceof this._autoSizer.parentNode.ownerDocument.defaultView.HTMLElement) {
        // Delay access of parentNode until mount.
        // This handles edge-cases where the component has already been unmounted before its ref has been set,
        // As well as libraries like react-lite which have a slightly different lifecycle.
        this._parentNode = this._autoSizer.parentNode;
        this._window = this._autoSizer.parentNode.ownerDocument.defaultView;

        // Defer requiring resize handler in order to support server-side rendering.
        // See issue #41
        this._detectElementResize = (0, _detectElementResize["default"])(nonce, this._window);
        this._detectElementResize.addResizeListener(this._parentNode, this._onResize);
        this._onResize();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this._detectElementResize && this._parentNode) {
        this._detectElementResize.removeResizeListener(this._parentNode, this._onResize);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        children = _this$props2.children,
        className = _this$props2.className,
        disableHeight = _this$props2.disableHeight,
        disableWidth = _this$props2.disableWidth,
        style = _this$props2.style;
      var _this$state = this.state,
        height = _this$state.height,
        width = _this$state.width;

      // Outer div should not force width/height since that may prevent containers from shrinking.
      // Inner component should overflow and use calculated width/height.
      // See issue #68 for more information.
      var outerStyle /*: Object*/ = {
        overflow: 'visible'
      };
      var childParams /*: Object*/ = {};
      if (!disableHeight) {
        outerStyle.height = 0;
        childParams.height = height;
      }
      if (!disableWidth) {
        outerStyle.width = 0;
        childParams.width = width;
      }

      /**
       * TODO: Avoid rendering children before the initial measurements have been collected.
       * At best this would just be wasting cycles.
       * Add this check into version 10 though as it could break too many ref callbacks in version 9.
       * Note that if default width/height props were provided this would still work with SSR.
      if (
        height !== 0 &&
        width !== 0
      ) {
        child = children({ height, width })
      }
      */

      return /*#__PURE__*/React.createElement("div", {
        className: className,
        ref: this._setRef,
        style: _objectSpread(_objectSpread({}, outerStyle), style)
      }, children(childParams));
    }
  }]);
}(React.Component);
(0, _defineProperty2["default"])(AutoSizer, "defaultProps", {
  onResize: function onResize() {},
  disableHeight: false,
  disableWidth: false,
  style: {}
});