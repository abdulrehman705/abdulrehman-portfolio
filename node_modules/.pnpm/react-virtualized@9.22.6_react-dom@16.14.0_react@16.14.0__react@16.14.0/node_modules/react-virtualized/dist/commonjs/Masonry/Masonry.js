"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DEFAULT_SCROLLING_RESET_TIME_INTERVAL = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _clsx = _interopRequireDefault(require("clsx"));
var React = _interopRequireWildcard(require("react"));
var _reactLifecyclesCompat = require("react-lifecycles-compat");
var _PositionCache = _interopRequireDefault(require("./PositionCache"));
var _requestAnimationTimeout = require("../utils/requestAnimationTimeout");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
/*:: import type {AnimationTimeoutId} from '../utils/requestAnimationTimeout';*/
/*:: type Props = {
  autoHeight: boolean,
  cellCount: number,
  cellMeasurerCache: CellMeasurerCache,
  cellPositioner: Positioner,
  cellRenderer: CellRenderer,
  className: ?string,
  height: number,
  id: ?string,
  keyMapper: KeyMapper,
  onCellsRendered: ?OnCellsRenderedCallback,
  onScroll: ?OnScrollCallback,
  overscanByPixels: number,
  role: string,
  scrollingResetTimeInterval: number,
  style: mixed,
  tabIndex: number,
  width: number,
  rowDirection: string,
  scrollTop?: number,
};*/
/*:: type State = {
  isScrolling: boolean,
  scrollTop: number,
};*/
var emptyObject = {};

/**
 * Specifies the number of milliseconds during which to disable pointer events while a scroll is in progress.
 * This improves performance and makes scrolling smoother.
 */
var DEFAULT_SCROLLING_RESET_TIME_INTERVAL = exports.DEFAULT_SCROLLING_RESET_TIME_INTERVAL = 150;

/**
 * This component efficiently displays arbitrarily positioned cells using windowing techniques.
 * Cell position is determined by an injected `cellPositioner` property.
 * Windowing is vertical; this component does not support horizontal scrolling.
 *
 * Rendering occurs in two phases:
 * 1) First pass uses estimated cell sizes (provided by the cache) to determine how many cells to measure in a batch.
 *    Batch size is chosen using a fast, naive layout algorithm that stacks images in order until the viewport has been filled.
 *    After measurement is complete (componentDidMount or componentDidUpdate) this component evaluates positioned cells
 *    in order to determine if another measurement pass is required (eg if actual cell sizes were less than estimated sizes).
 *    All measurements are permanently cached (keyed by `keyMapper`) for performance purposes.
 * 2) Second pass uses the external `cellPositioner` to layout cells.
 *    At this time the positioner has access to cached size measurements for all cells.
 *    The positions it returns are cached by Masonry for fast access later.
 *    Phase one is repeated if the user scrolls beyond the current layout's bounds.
 *    If the layout is invalidated due to eg a resize, cached positions can be cleared using `recomputeCellPositions()`.
 *
 * Animation constraints:
 *   Simple animations are supported (eg translate/slide into place on initial reveal).
 *   More complex animations are not (eg flying from one position to another on resize).
 *
 * Layout constraints:
 *   This component supports multi-column layout.
 *   The height of each item may vary.
 *   The width of each item must not exceed the width of the column it is "in".
 *   The left position of all items within a column must align.
 *   (Items may not span multiple columns.)
 */
var Masonry = /*#__PURE__*/function (_React$PureComponent) {
  function Masonry() {
    var _this;
    (0, _classCallCheck2["default"])(this, Masonry);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Masonry, [].concat(args));
    (0, _defineProperty2["default"])(_this, "state", {
      isScrolling: false,
      scrollTop: 0
    });
    (0, _defineProperty2["default"])(_this, "_debounceResetIsScrollingId", void 0);
    (0, _defineProperty2["default"])(_this, "_invalidateOnUpdateStartIndex", null);
    (0, _defineProperty2["default"])(_this, "_invalidateOnUpdateStopIndex", null);
    (0, _defineProperty2["default"])(_this, "_positionCache", new _PositionCache["default"]());
    (0, _defineProperty2["default"])(_this, "_startIndex", null);
    (0, _defineProperty2["default"])(_this, "_startIndexMemoized", null);
    (0, _defineProperty2["default"])(_this, "_stopIndex", null);
    (0, _defineProperty2["default"])(_this, "_stopIndexMemoized", null);
    (0, _defineProperty2["default"])(_this, "_debounceResetIsScrollingCallback", function () {
      _this.setState({
        isScrolling: false
      });
    });
    (0, _defineProperty2["default"])(_this, "_setScrollingContainerRef", function (ref) {
      _this._scrollingContainer = ref;
    });
    (0, _defineProperty2["default"])(_this, "_onScroll", function (event) {
      var height = _this.props.height;
      var eventScrollTop = event.currentTarget.scrollTop;

      // When this component is shrunk drastically, React dispatches a series of back-to-back scroll events,
      // Gradually converging on a scrollTop that is within the bounds of the new, smaller height.
      // This causes a series of rapid renders that is slow for long lists.
      // We can avoid that by doing some simple bounds checking to ensure that scroll offsets never exceed their bounds.
      var scrollTop = Math.min(Math.max(0, _this._getEstimatedTotalHeight() - height), eventScrollTop);

      // On iOS, we can arrive at negative offsets by swiping past the start or end.
      // Avoid re-rendering in this case as it can cause problems; see #532 for more.
      if (eventScrollTop !== scrollTop) {
        return;
      }

      // Prevent pointer events from interrupting a smooth scroll
      _this._debounceResetIsScrolling();

      // Certain devices (like Apple touchpad) rapid-fire duplicate events.
      // Don't force a re-render if this is the case.
      // The mouse may move faster then the animation frame does.
      // Use requestAnimationFrame to avoid over-updating.
      if (_this.state.scrollTop !== scrollTop) {
        _this.setState({
          isScrolling: true,
          scrollTop: scrollTop
        });
      }
    });
    return _this;
  }
  (0, _inherits2["default"])(Masonry, _React$PureComponent);
  return (0, _createClass2["default"])(Masonry, [{
    key: "clearCellPositions",
    value: function clearCellPositions() {
      this._positionCache = new _PositionCache["default"]();
      this.forceUpdate();
    }

    // HACK This method signature was intended for Grid
  }, {
    key: "invalidateCellSizeAfterRender",
    value: function invalidateCellSizeAfterRender(_ref) {
      var index = _ref.rowIndex;
      if (this._invalidateOnUpdateStartIndex === null) {
        this._invalidateOnUpdateStartIndex = index;
        this._invalidateOnUpdateStopIndex = index;
      } else {
        this._invalidateOnUpdateStartIndex = Math.min(this._invalidateOnUpdateStartIndex, index);
        this._invalidateOnUpdateStopIndex = Math.max(this._invalidateOnUpdateStopIndex, index);
      }
    }
  }, {
    key: "recomputeCellPositions",
    value: function recomputeCellPositions() {
      var stopIndex = this._positionCache.count - 1;
      this._positionCache = new _PositionCache["default"]();
      this._populatePositionCache(0, stopIndex);
      this.forceUpdate();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._checkInvalidateOnUpdate();
      this._invokeOnScrollCallback();
      this._invokeOnCellsRenderedCallback();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps /*: Props*/, prevState /*: State*/) {
      this._checkInvalidateOnUpdate();
      this._invokeOnScrollCallback();
      this._invokeOnCellsRenderedCallback();
      if (this.props.scrollTop !== prevProps.scrollTop) {
        this._debounceResetIsScrolling();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this._debounceResetIsScrollingId) {
        (0, _requestAnimationTimeout.cancelAnimationTimeout)(this._debounceResetIsScrollingId);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        autoHeight = _this$props.autoHeight,
        cellCount = _this$props.cellCount,
        cellMeasurerCache = _this$props.cellMeasurerCache,
        cellRenderer = _this$props.cellRenderer,
        className = _this$props.className,
        height = _this$props.height,
        id = _this$props.id,
        keyMapper = _this$props.keyMapper,
        overscanByPixels = _this$props.overscanByPixels,
        role = _this$props.role,
        style = _this$props.style,
        tabIndex = _this$props.tabIndex,
        width = _this$props.width,
        rowDirection = _this$props.rowDirection;
      var _this$state = this.state,
        isScrolling = _this$state.isScrolling,
        scrollTop = _this$state.scrollTop;
      var children = [];
      var estimateTotalHeight = this._getEstimatedTotalHeight();
      var shortestColumnSize = this._positionCache.shortestColumnSize;
      var measuredCellCount = this._positionCache.count;
      var startIndex = 0;
      var stopIndex;
      this._positionCache.range(Math.max(0, scrollTop - overscanByPixels), height + overscanByPixels * 2, function (index /*: number*/, left /*: number*/, top /*: number*/) {
        if (typeof stopIndex === 'undefined') {
          startIndex = index;
          stopIndex = index;
        } else {
          startIndex = Math.min(startIndex, index);
          stopIndex = Math.max(stopIndex, index);
        }
        children.push(cellRenderer({
          index: index,
          isScrolling: isScrolling,
          key: keyMapper(index),
          parent: _this2,
          style: (0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])({
            height: cellMeasurerCache.getHeight(index)
          }, rowDirection === 'ltr' ? 'left' : 'right', left), "position", 'absolute'), "top", top), "width", cellMeasurerCache.getWidth(index))
        }));
      });

      // We need to measure additional cells for this layout
      if (shortestColumnSize < scrollTop + height + overscanByPixels && measuredCellCount < cellCount) {
        var batchSize = Math.min(cellCount - measuredCellCount, Math.ceil((scrollTop + height + overscanByPixels - shortestColumnSize) / cellMeasurerCache.defaultHeight * width / cellMeasurerCache.defaultWidth));
        for (var _index = measuredCellCount; _index < measuredCellCount + batchSize; _index++) {
          stopIndex = _index;
          children.push(cellRenderer({
            index: _index,
            isScrolling: isScrolling,
            key: keyMapper(_index),
            parent: this,
            style: {
              width: cellMeasurerCache.getWidth(_index)
            }
          }));
        }
      }
      this._startIndex = startIndex;
      this._stopIndex = stopIndex;
      return /*#__PURE__*/React.createElement("div", {
        ref: this._setScrollingContainerRef,
        "aria-label": this.props['aria-label'],
        className: (0, _clsx["default"])('ReactVirtualized__Masonry', className),
        id: id,
        onScroll: this._onScroll,
        role: role,
        style: _objectSpread({
          boxSizing: 'border-box',
          direction: 'ltr',
          height: autoHeight ? 'auto' : height,
          overflowX: 'hidden',
          overflowY: estimateTotalHeight < height ? 'hidden' : 'auto',
          position: 'relative',
          width: width,
          WebkitOverflowScrolling: 'touch',
          willChange: 'transform'
        }, style),
        tabIndex: tabIndex
      }, /*#__PURE__*/React.createElement("div", {
        className: "ReactVirtualized__Masonry__innerScrollContainer",
        style: {
          width: '100%',
          height: estimateTotalHeight,
          maxWidth: '100%',
          maxHeight: estimateTotalHeight,
          overflow: 'hidden',
          pointerEvents: isScrolling ? 'none' : '',
          position: 'relative'
        }
      }, children));
    }
  }, {
    key: "_checkInvalidateOnUpdate",
    value: function _checkInvalidateOnUpdate() {
      if (typeof this._invalidateOnUpdateStartIndex === 'number') {
        var startIndex = this._invalidateOnUpdateStartIndex;
        var stopIndex = this._invalidateOnUpdateStopIndex;
        this._invalidateOnUpdateStartIndex = null;
        this._invalidateOnUpdateStopIndex = null;

        // Query external layout logic for position of newly-measured cells
        this._populatePositionCache(startIndex, stopIndex);
        this.forceUpdate();
      }
    }
  }, {
    key: "_debounceResetIsScrolling",
    value: function _debounceResetIsScrolling() {
      var scrollingResetTimeInterval = this.props.scrollingResetTimeInterval;
      if (this._debounceResetIsScrollingId) {
        (0, _requestAnimationTimeout.cancelAnimationTimeout)(this._debounceResetIsScrollingId);
      }
      this._debounceResetIsScrollingId = (0, _requestAnimationTimeout.requestAnimationTimeout)(this._debounceResetIsScrollingCallback, scrollingResetTimeInterval);
    }
  }, {
    key: "_getEstimatedTotalHeight",
    value: function _getEstimatedTotalHeight() {
      var _this$props2 = this.props,
        cellCount = _this$props2.cellCount,
        cellMeasurerCache = _this$props2.cellMeasurerCache,
        width = _this$props2.width;
      var estimatedColumnCount = Math.max(1, Math.floor(width / cellMeasurerCache.defaultWidth));
      return this._positionCache.estimateTotalHeight(cellCount, estimatedColumnCount, cellMeasurerCache.defaultHeight);
    }
  }, {
    key: "_invokeOnScrollCallback",
    value: function _invokeOnScrollCallback() {
      var _this$props3 = this.props,
        height = _this$props3.height,
        onScroll = _this$props3.onScroll;
      var scrollTop = this.state.scrollTop;
      if (this._onScrollMemoized !== scrollTop) {
        onScroll({
          clientHeight: height,
          scrollHeight: this._getEstimatedTotalHeight(),
          scrollTop: scrollTop
        });
        this._onScrollMemoized = scrollTop;
      }
    }
  }, {
    key: "_invokeOnCellsRenderedCallback",
    value: function _invokeOnCellsRenderedCallback() {
      if (this._startIndexMemoized !== this._startIndex || this._stopIndexMemoized !== this._stopIndex) {
        var onCellsRendered = this.props.onCellsRendered;
        onCellsRendered({
          startIndex: this._startIndex,
          stopIndex: this._stopIndex
        });
        this._startIndexMemoized = this._startIndex;
        this._stopIndexMemoized = this._stopIndex;
      }
    }
  }, {
    key: "_populatePositionCache",
    value: function _populatePositionCache(startIndex /*: number*/, stopIndex /*: number*/) {
      var _this$props4 = this.props,
        cellMeasurerCache = _this$props4.cellMeasurerCache,
        cellPositioner = _this$props4.cellPositioner;
      for (var _index2 = startIndex; _index2 <= stopIndex; _index2++) {
        var _cellPositioner = cellPositioner(_index2),
          left = _cellPositioner.left,
          top = _cellPositioner.top;
        this._positionCache.setPosition(_index2, left, top, cellMeasurerCache.getHeight(_index2));
      }
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps /*: Props*/, prevState /*: State*/) /*: $Shape<State>*/{
      if (nextProps.scrollTop !== undefined && prevState.scrollTop !== nextProps.scrollTop) {
        return {
          isScrolling: true,
          scrollTop: nextProps.scrollTop
        };
      }
      return null;
    }
  }]);
}(React.PureComponent);
(0, _defineProperty2["default"])(Masonry, "defaultProps", {
  autoHeight: false,
  keyMapper: identity,
  onCellsRendered: noop,
  onScroll: noop,
  overscanByPixels: 20,
  role: 'grid',
  scrollingResetTimeInterval: DEFAULT_SCROLLING_RESET_TIME_INTERVAL,
  style: emptyObject,
  tabIndex: 0,
  rowDirection: 'ltr'
});
function identity(value) {
  return value;
}
function noop() {}
/*:: type KeyMapper = (index: number) => mixed;*/
/*:: export type CellMeasurerCache = {
  defaultHeight: number,
  defaultWidth: number,
  getHeight: (index: number) => number,
  getWidth: (index: number) => number,
};*/
/*:: type CellRenderer = (params: {|
  index: number,
  isScrolling: boolean,
  key: mixed,
  parent: mixed,
  style: mixed,
|}) => mixed;*/
/*:: type OnCellsRenderedCallback = (params: {|
  startIndex: number,
  stopIndex: number,
|}) => void;*/
/*:: type OnScrollCallback = (params: {|
  clientHeight: number,
  scrollHeight: number,
  scrollTop: number,
|}) => void;*/
/*:: type Position = {
  left: number,
  top: number,
};*/
(0, _reactLifecyclesCompat.polyfill)(Masonry);
var _default = exports["default"] = Masonry;
/*:: export type Positioner = (index: number) => Position;*/