import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import * as React from 'react';
import CellMeasurer from './CellMeasurer';
import CellMeasurerCache from './CellMeasurerCache';
import { Column, Table } from '../Table';
import styles from './CellMeasurer.example.css';
var DynamicHeightTableColumn = /*#__PURE__*/function (_React$PureComponent) {
  function DynamicHeightTableColumn() {
    var _this;
    _classCallCheck(this, DynamicHeightTableColumn);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, DynamicHeightTableColumn, [].concat(args));
    _defineProperty(_this, "_cache", new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 25
    }));
    _defineProperty(_this, "_lastRenderedWidth", _this.props.width);
    _defineProperty(_this, "_columnCellRenderer", function (_ref) {
      var dataKey = _ref.dataKey,
        parent = _ref.parent,
        rowIndex = _ref.rowIndex;
      var list = _this.props.list;
      var datum = list.get(rowIndex % list.size);
      var content = rowIndex % 5 === 0 ? '' : datum.randomLong;
      return /*#__PURE__*/React.createElement(CellMeasurer, {
        cache: _this._cache,
        columnIndex: 0,
        key: dataKey,
        parent: parent,
        rowIndex: rowIndex
      }, /*#__PURE__*/React.createElement("div", {
        className: styles.tableColumn,
        style: {
          whiteSpace: 'normal'
        }
      }, content));
    });
    _defineProperty(_this, "_rowGetter", function (_ref2) {
      var index = _ref2.index;
      var list = _this.props.list;
      return list.get(index % list.size);
    });
    return _this;
  }
  _inherits(DynamicHeightTableColumn, _React$PureComponent);
  return _createClass(DynamicHeightTableColumn, [{
    key: "render",
    value: function render() {
      var width = this.props.width;
      if (this._lastRenderedWidth !== this.props.width) {
        this._lastRenderedWidth = this.props.width;
        this._cache.clearAll();
      }
      return /*#__PURE__*/React.createElement(Table, {
        deferredMeasurementCache: this._cache,
        headerHeight: 20,
        height: 400,
        overscanRowCount: 2,
        rowClassName: styles.tableRow,
        rowHeight: this._cache.rowHeight,
        rowGetter: this._rowGetter,
        rowCount: 1000,
        width: width
      }, /*#__PURE__*/React.createElement(Column, {
        className: styles.tableColumn,
        dataKey: "name",
        label: "Name",
        width: 125
      }), /*#__PURE__*/React.createElement(Column, {
        className: styles.tableColumn,
        dataKey: "color",
        label: "Color",
        width: 75
      }), /*#__PURE__*/React.createElement(Column, {
        width: width - 200,
        dataKey: "random",
        label: "Dynamic text",
        cellRenderer: this._columnCellRenderer
      }));
    }
  }]);
}(React.PureComponent);
export { DynamicHeightTableColumn as default };
DynamicHeightTableColumn.propTypes = process.env.NODE_ENV !== "production" ? {
  list: PropTypes.instanceOf(Immutable.List).isRequired,
  width: PropTypes.number.isRequired
} : {};