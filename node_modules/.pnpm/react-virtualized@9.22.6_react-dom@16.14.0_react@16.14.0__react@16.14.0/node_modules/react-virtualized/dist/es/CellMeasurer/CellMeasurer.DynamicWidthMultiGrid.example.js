import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import * as React from 'react';
import CellMeasurer from './CellMeasurer';
import CellMeasurerCache from './CellMeasurerCache';
import MultiGrid from '../MultiGrid';
import styles from './CellMeasurer.example.css';
var DynamicWidthMultiGrid = /*#__PURE__*/function (_React$PureComponent) {
  function DynamicWidthMultiGrid(props, context) {
    var _this;
    _classCallCheck(this, DynamicWidthMultiGrid);
    _this = _callSuper(this, DynamicWidthMultiGrid, [props, context]);
    _this._cache = new CellMeasurerCache({
      defaultHeight: 30,
      defaultWidth: 150,
      fixedHeight: true
    });
    _this._cellRenderer = _this._cellRenderer.bind(_this);
    return _this;
  }
  _inherits(DynamicWidthMultiGrid, _React$PureComponent);
  return _createClass(DynamicWidthMultiGrid, [{
    key: "render",
    value: function render() {
      var width = this.props.width;
      return /*#__PURE__*/React.createElement(MultiGrid, {
        className: styles.BodyGrid,
        columnCount: 50,
        columnWidth: this._cache.columnWidth,
        deferredMeasurementCache: this._cache,
        fixedColumnCount: 1,
        fixedRowCount: 0,
        height: 400,
        overscanColumnCount: 0,
        overscanRowCount: 0,
        cellRenderer: this._cellRenderer,
        rowCount: 50,
        rowHeight: 30,
        width: width
      });
    }
  }, {
    key: "_cellRenderer",
    value: function _cellRenderer(_ref) {
      var columnIndex = _ref.columnIndex,
        key = _ref.key,
        parent = _ref.parent,
        rowIndex = _ref.rowIndex,
        style = _ref.style;
      var _this$props = this.props,
        getClassName = _this$props.getClassName,
        getContent = _this$props.getContent,
        list = _this$props.list;
      var datum = list.get((rowIndex + columnIndex) % list.size);
      var classNames = getClassName({
        columnIndex: columnIndex,
        rowIndex: rowIndex
      });
      var content = getContent({
        index: rowIndex,
        datum: datum,
        "long": false
      });
      if (columnIndex === 0) {
        content = content.substr(0, 50);
      }
      return /*#__PURE__*/React.createElement(CellMeasurer, {
        cache: this._cache,
        columnIndex: columnIndex,
        key: key,
        parent: parent,
        rowIndex: rowIndex
      }, /*#__PURE__*/React.createElement("div", {
        className: classNames,
        style: _objectSpread(_objectSpread({}, style), {}, {
          whiteSpace: 'nowrap'
        })
      }, content));
    }
  }]);
}(React.PureComponent);
export { DynamicWidthMultiGrid as default };
DynamicWidthMultiGrid.propTypes = process.env.NODE_ENV !== "production" ? {
  getClassName: PropTypes.func.isRequired,
  getContent: PropTypes.func.isRequired,
  list: PropTypes.instanceOf(Immutable.List).isRequired,
  width: PropTypes.number.isRequired
} : {};