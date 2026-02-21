import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import * as React from 'react';
import { ContentBox, ContentBoxHeader, ContentBoxParagraph } from '../demo/ContentBox';
import { LabeledInput, InputRow } from '../demo/LabeledInput';
import { CellMeasurer, CellMeasurerCache } from '../CellMeasurer';
import AutoSizer from '../AutoSizer';
import WindowScroller from '../WindowScroller';
import createCellPositioner from './createCellPositioner';
import Masonry from './Masonry';
import styles from './Masonry.example.css';
var GridExample = /*#__PURE__*/function (_React$PureComponent) {
  function GridExample(props, context) {
    var _this;
    _classCallCheck(this, GridExample);
    _this = _callSuper(this, GridExample, [props, context]);
    // This is a bit of a hack to simulate newly loaded cells
    _defineProperty(_this, "_resetList", function () {
      var ROW_HEIGHTS = [25, 50, 75, 100];
      var list = _this.context.list;
      list.forEach(function (datum) {
        datum.size = ROW_HEIGHTS[Math.floor(Math.random() * ROW_HEIGHTS.length)];
      });
      _this._cache.clearAll();
      _this._resetCellPositioner();
      _this._masonry.clearCellPositions();
    });
    _this._columnCount = 0;
    _this._cache = new CellMeasurerCache({
      defaultHeight: 250,
      defaultWidth: 200,
      fixedWidth: true
    });
    _this.state = {
      columnWidth: 200,
      height: 300,
      gutterSize: 10,
      overscanByPixels: 0,
      windowScrollerEnabled: false
    };
    _this._cellRenderer = _this._cellRenderer.bind(_this);
    _this._onResize = _this._onResize.bind(_this);
    _this._renderAutoSizer = _this._renderAutoSizer.bind(_this);
    _this._renderMasonry = _this._renderMasonry.bind(_this);
    _this._setMasonryRef = _this._setMasonryRef.bind(_this);
    return _this;
  }
  _inherits(GridExample, _React$PureComponent);
  return _createClass(GridExample, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$state = this.state,
        columnWidth = _this$state.columnWidth,
        height = _this$state.height,
        gutterSize = _this$state.gutterSize,
        overscanByPixels = _this$state.overscanByPixels,
        windowScrollerEnabled = _this$state.windowScrollerEnabled;
      var child;
      if (windowScrollerEnabled) {
        child = /*#__PURE__*/React.createElement(WindowScroller, {
          overscanByPixels: overscanByPixels
        }, this._renderAutoSizer);
      } else {
        child = this._renderAutoSizer({
          height: height
        });
      }
      return /*#__PURE__*/React.createElement(ContentBox, null, /*#__PURE__*/React.createElement(ContentBoxHeader, {
        text: "Masonry",
        sourceLink: "https://github.com/bvaughn/react-virtualized/blob/master/source/Masonry/Masonry.example.js",
        docsLink: "https://github.com/bvaughn/react-virtualized/blob/master/docs/Masonry.md"
      }), /*#__PURE__*/React.createElement(ContentBoxParagraph, null, "Optimized for masonry layouts. Cells are j.i.t. measured and layed out as a user scrolls. Sizes are cached so that resize/reflow is fast and does not require re-measuring."), /*#__PURE__*/React.createElement(ContentBoxParagraph, null, /*#__PURE__*/React.createElement("label", {
        className: styles.checkboxLabel
      }, /*#__PURE__*/React.createElement("input", {
        "aria-label": "Use WindowScroller?",
        checked: windowScrollerEnabled,
        className: styles.checkbox,
        type: "checkbox",
        onChange: function onChange(event) {
          // HACK Because this demo switches between using WindowScroller and not,
          // It's easier to clear the cache when toggling modes to avoid a partially stale state.
          _this2._cache.clearAll();
          _this2.setState({
            windowScrollerEnabled: event.target.checked
          });
        }
      }), "Use ", /*#__PURE__*/React.createElement("code", null, "WindowScroller"), "?"), /*#__PURE__*/React.createElement("label", {
        className: styles.checkboxLabel
      }, /*#__PURE__*/React.createElement("button", {
        onClick: this._resetList
      }, "Reset List Data"))), /*#__PURE__*/React.createElement(InputRow, null, /*#__PURE__*/React.createElement(LabeledInput, {
        label: "Height",
        name: "height",
        onChange: function onChange(event) {
          _this2.setState({
            height: parseInt(event.target.value, 10) || 300
          });
        },
        value: height
      }), /*#__PURE__*/React.createElement(LabeledInput, {
        label: "Column Width",
        name: "columnWidth",
        onChange: function onChange(event) {
          _this2._cache.clearAll();
          _this2.setState({
            columnWidth: parseInt(event.target.value, 10) || 200
          }, function () {
            _this2._calculateColumnCount();
            _this2._resetCellPositioner();
            _this2._masonry.clearCellPositions();
          });
        },
        value: columnWidth
      }), /*#__PURE__*/React.createElement(LabeledInput, {
        label: "Gutter Size",
        name: "gutterSize",
        onChange: function onChange(event) {
          _this2.setState({
            gutterSize: parseInt(event.target.value, 10) || 10
          }, function () {
            _this2._calculateColumnCount();
            _this2._resetCellPositioner();
            _this2._masonry.recomputeCellPositions();
          });
        },
        value: gutterSize
      }), /*#__PURE__*/React.createElement(LabeledInput, {
        label: "Overscan (px)",
        name: "overscanByPixels",
        onChange: function onChange(event) {
          _this2.setState({
            overscanByPixels: parseInt(event.target.value, 10) || 0
          });
        },
        value: overscanByPixels
      })), child);
    }
  }, {
    key: "_calculateColumnCount",
    value: function _calculateColumnCount() {
      var _this$state2 = this.state,
        columnWidth = _this$state2.columnWidth,
        gutterSize = _this$state2.gutterSize;
      this._columnCount = Math.floor(this._width / (columnWidth + gutterSize));
    }
  }, {
    key: "_cellRenderer",
    value: function _cellRenderer(_ref) {
      var index = _ref.index,
        key = _ref.key,
        parent = _ref.parent,
        style = _ref.style;
      var list = this.context.list;
      var columnWidth = this.state.columnWidth;
      var datum = list.get(index % list.size);
      return /*#__PURE__*/React.createElement(CellMeasurer, {
        cache: this._cache,
        index: index,
        key: key,
        parent: parent
      }, /*#__PURE__*/React.createElement("div", {
        className: styles.Cell,
        style: _objectSpread(_objectSpread({}, style), {}, {
          width: columnWidth
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          backgroundColor: datum.color,
          borderRadius: '0.5rem',
          height: datum.size * 3,
          marginBottom: '0.5rem',
          width: '100%',
          fontSize: 20,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, index), datum.random));
    }
  }, {
    key: "_initCellPositioner",
    value: function _initCellPositioner() {
      if (typeof this._cellPositioner === 'undefined') {
        var _this$state3 = this.state,
          columnWidth = _this$state3.columnWidth,
          gutterSize = _this$state3.gutterSize;
        this._cellPositioner = createCellPositioner({
          cellMeasurerCache: this._cache,
          columnCount: this._columnCount,
          columnWidth: columnWidth,
          spacer: gutterSize
        });
      }
    }
  }, {
    key: "_onResize",
    value: function _onResize(_ref2) {
      var width = _ref2.width;
      this._width = width;
      this._calculateColumnCount();
      this._resetCellPositioner();
      this._masonry.recomputeCellPositions();
    }
  }, {
    key: "_renderAutoSizer",
    value: function _renderAutoSizer(_ref3) {
      var height = _ref3.height,
        scrollTop = _ref3.scrollTop;
      this._height = height;
      this._scrollTop = scrollTop;
      var overscanByPixels = this.state.overscanByPixels;
      return /*#__PURE__*/React.createElement(AutoSizer, {
        disableHeight: true,
        height: height,
        onResize: this._onResize,
        overscanByPixels: overscanByPixels,
        scrollTop: this._scrollTop
      }, this._renderMasonry);
    }
  }, {
    key: "_renderMasonry",
    value: function _renderMasonry(_ref4) {
      var width = _ref4.width;
      this._width = width;
      this._calculateColumnCount();
      this._initCellPositioner();
      var _this$state4 = this.state,
        height = _this$state4.height,
        overscanByPixels = _this$state4.overscanByPixels,
        windowScrollerEnabled = _this$state4.windowScrollerEnabled;
      return /*#__PURE__*/React.createElement(Masonry, {
        autoHeight: windowScrollerEnabled,
        cellCount: 1000,
        cellMeasurerCache: this._cache,
        cellPositioner: this._cellPositioner,
        cellRenderer: this._cellRenderer,
        height: windowScrollerEnabled ? this._height : height,
        overscanByPixels: overscanByPixels,
        ref: this._setMasonryRef,
        scrollTop: this._scrollTop,
        width: width
      });
    }
  }, {
    key: "_resetCellPositioner",
    value: function _resetCellPositioner() {
      var _this$state5 = this.state,
        columnWidth = _this$state5.columnWidth,
        gutterSize = _this$state5.gutterSize;
      this._cellPositioner.reset({
        columnCount: this._columnCount,
        columnWidth: columnWidth,
        spacer: gutterSize
      });
    }
  }, {
    key: "_setMasonryRef",
    value: function _setMasonryRef(ref) {
      this._masonry = ref;
    }
  }]);
}(React.PureComponent);
_defineProperty(GridExample, "contextTypes", {
  list: PropTypes.instanceOf(Immutable.List).isRequired
});
export { GridExample as default };