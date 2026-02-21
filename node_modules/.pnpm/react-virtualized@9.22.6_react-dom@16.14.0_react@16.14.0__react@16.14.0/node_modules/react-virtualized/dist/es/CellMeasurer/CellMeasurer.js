import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
import * as React from 'react';
/*:: import type {CellMeasureCache} from './types';*/
import { cloneElement } from 'react';
/*:: type Children = (params: {measure: () => void}) => React.Element<*>;*/
/*:: type Cell = {
  columnIndex: number,
  rowIndex: number,
};*/
/*:: type Props = {
  cache: CellMeasureCache,
  children: Children | React.Element<*>,
  columnIndex?: number,
  index?: number,
  parent: {
    invalidateCellSizeAfterRender?: (cell: Cell) => void,
    recomputeGridSize?: (cell: Cell) => void,
  },
  rowIndex?: number,
};*/
/**
 * Wraps a cell and measures its rendered content.
 * Measurements are stored in a per-cell cache.
 * Cached-content is not be re-measured.
 */
var CellMeasurer = /*#__PURE__*/function (_React$PureComponent) {
  function CellMeasurer() {
    var _this;
    _classCallCheck(this, CellMeasurer);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, CellMeasurer, [].concat(args));
    _defineProperty(_this, "_child", /*#__PURE__*/React.createRef());
    _defineProperty(_this, "_measure", function () {
      var _this$props = _this.props,
        cache = _this$props.cache,
        _this$props$columnInd = _this$props.columnIndex,
        columnIndex = _this$props$columnInd === void 0 ? 0 : _this$props$columnInd,
        parent = _this$props.parent,
        _this$props$rowIndex = _this$props.rowIndex,
        rowIndex = _this$props$rowIndex === void 0 ? _this.props.index || 0 : _this$props$rowIndex;
      var _this$_getCellMeasure = _this._getCellMeasurements(),
        height = _this$_getCellMeasure.height,
        width = _this$_getCellMeasure.width;
      if (height !== cache.getHeight(rowIndex, columnIndex) || width !== cache.getWidth(rowIndex, columnIndex)) {
        cache.set(rowIndex, columnIndex, width, height);
        if (parent && typeof parent.recomputeGridSize === 'function') {
          parent.recomputeGridSize({
            columnIndex: columnIndex,
            rowIndex: rowIndex
          });
        }
      }
    });
    _defineProperty(_this, "_registerChild", function (element) {
      if (element && !(element instanceof Element)) {
        console.warn('CellMeasurer registerChild expects to be passed Element or null');
      }
      _this._child.current = element;
      if (element) {
        _this._maybeMeasureCell();
      }
    });
    return _this;
  }
  _inherits(CellMeasurer, _React$PureComponent);
  return _createClass(CellMeasurer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._maybeMeasureCell();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._maybeMeasureCell();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var children = this.props.children;
      var resolvedChildren = typeof children === 'function' ? children({
        measure: this._measure,
        registerChild: this._registerChild
      }) : children;
      if (resolvedChildren === null) {
        return resolvedChildren;
      }
      return /*#__PURE__*/cloneElement(resolvedChildren, {
        ref: function ref(node) {
          if (typeof resolvedChildren.ref === 'function') {
            resolvedChildren.ref(node);
          } else if (resolvedChildren.ref) {
            resolvedChildren.ref.current = node;
          }
          _this2._child.current = node;
        }
      });
    }
  }, {
    key: "_getCellMeasurements",
    value: function _getCellMeasurements() {
      var cache = this.props.cache;
      var node = this._child.current;

      // TODO Check for a bad combination of fixedWidth and missing numeric width or vice versa with height

      if (node && node.ownerDocument && node.ownerDocument.defaultView && node instanceof node.ownerDocument.defaultView.HTMLElement) {
        var styleWidth = node.style.width;
        var styleHeight = node.style.height;

        // If we are re-measuring a cell that has already been measured,
        // It will have a hard-coded width/height from the previous measurement.
        // The fact that we are measuring indicates this measurement is probably stale,
        // So explicitly clear it out (eg set to "auto") so we can recalculate.
        // See issue #593 for more info.
        // Even if we are measuring initially- if we're inside of a MultiGrid component,
        // Explicitly clear width/height before measuring to avoid being tainted by another Grid.
        // eg top/left Grid renders before bottom/right Grid
        // Since the CellMeasurerCache is shared between them this taints derived cell size values.
        if (!cache.hasFixedWidth()) {
          node.style.width = 'auto';
        }
        if (!cache.hasFixedHeight()) {
          node.style.height = 'auto';
        }
        var height = Math.ceil(node.offsetHeight);
        var width = Math.ceil(node.offsetWidth);

        // Reset after measuring to avoid breaking styles; see #660
        if (styleWidth) {
          node.style.width = styleWidth;
        }
        if (styleHeight) {
          node.style.height = styleHeight;
        }
        return {
          height: height,
          width: width
        };
      } else {
        return {
          height: 0,
          width: 0
        };
      }
    }
  }, {
    key: "_maybeMeasureCell",
    value: function _maybeMeasureCell() {
      var _this$props2 = this.props,
        cache = _this$props2.cache,
        _this$props2$columnIn = _this$props2.columnIndex,
        columnIndex = _this$props2$columnIn === void 0 ? 0 : _this$props2$columnIn,
        parent = _this$props2.parent,
        _this$props2$rowIndex = _this$props2.rowIndex,
        rowIndex = _this$props2$rowIndex === void 0 ? this.props.index || 0 : _this$props2$rowIndex;
      if (!cache.has(rowIndex, columnIndex)) {
        var _this$_getCellMeasure2 = this._getCellMeasurements(),
          height = _this$_getCellMeasure2.height,
          width = _this$_getCellMeasure2.width;
        cache.set(rowIndex, columnIndex, width, height);

        // If size has changed, let Grid know to re-render.
        if (parent && typeof parent.invalidateCellSizeAfterRender === 'function') {
          parent.invalidateCellSizeAfterRender({
            columnIndex: columnIndex,
            rowIndex: rowIndex
          });
        }
      }
    }
  }]);
}(React.PureComponent); // Used for DEV mode warning check
_defineProperty(CellMeasurer, "__internalCellMeasurerFlag", false);
export { CellMeasurer as default };
if (process.env.NODE_ENV !== 'production') {
  CellMeasurer.__internalCellMeasurerFlag = true;
}