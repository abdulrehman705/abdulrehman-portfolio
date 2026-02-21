import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
import * as React from 'react';
import styles from './ColumnSizer.example.css';
import AutoSizer from '../AutoSizer';
import ColumnSizer from './ColumnSizer';
import Grid from '../Grid';
import { ContentBox, ContentBoxHeader, ContentBoxParagraph } from '../demo/ContentBox';
import { LabeledInput, InputRow } from '../demo/LabeledInput';
var ColumnSizerExample = /*#__PURE__*/function (_React$PureComponent) {
  function ColumnSizerExample(props) {
    var _this;
    _classCallCheck(this, ColumnSizerExample);
    _this = _callSuper(this, ColumnSizerExample, [props]);
    _this.state = {
      columnMaxWidth: 100,
      columnMinWidth: 75,
      columnCount: 10
    };
    _this._noColumnMaxWidthChange = _this._noColumnMaxWidthChange.bind(_this);
    _this._noColumnMinWidthChange = _this._noColumnMinWidthChange.bind(_this);
    _this._onColumnCountChange = _this._onColumnCountChange.bind(_this);
    _this._noContentRenderer = _this._noContentRenderer.bind(_this);
    _this._cellRenderer = _this._cellRenderer.bind(_this);
    return _this;
  }
  _inherits(ColumnSizerExample, _React$PureComponent);
  return _createClass(ColumnSizerExample, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$state = this.state,
        columnMaxWidth = _this$state.columnMaxWidth,
        columnMinWidth = _this$state.columnMinWidth,
        columnCount = _this$state.columnCount;
      return /*#__PURE__*/React.createElement(ContentBox, null, /*#__PURE__*/React.createElement(ContentBoxHeader, {
        text: "ColumnSizer",
        sourceLink: "https://github.com/bvaughn/react-virtualized/blob/master/source/ColumnSizer/ColumnSizer.example.js",
        docsLink: "https://github.com/bvaughn/react-virtualized/blob/master/docs/ColumnSizer.md"
      }), /*#__PURE__*/React.createElement(ContentBoxParagraph, null, "This component decorates a ", /*#__PURE__*/React.createElement("code", null, "Grid"), " and calculates the width of its columns based on the current (", /*#__PURE__*/React.createElement("code", null, "Grid"), ") width."), /*#__PURE__*/React.createElement(InputRow, null, /*#__PURE__*/React.createElement(LabeledInput, {
        label: "Num Columns",
        name: "columnCount",
        onChange: this._onColumnCountChange,
        value: columnCount
      }), /*#__PURE__*/React.createElement(LabeledInput, {
        label: "Column Min Width",
        name: "columnMinWidth",
        onChange: this._noColumnMinWidthChange,
        value: columnMinWidth
      }), /*#__PURE__*/React.createElement(LabeledInput, {
        label: "Column Max Width",
        name: "columnMaxWidth",
        onChange: this._noColumnMaxWidthChange,
        value: columnMaxWidth
      })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AutoSizer, {
        disableHeight: true
      }, function (_ref) {
        var width = _ref.width;
        return /*#__PURE__*/React.createElement(ColumnSizer, {
          columnMaxWidth: columnMaxWidth,
          columnMinWidth: columnMinWidth,
          columnCount: columnCount,
          key: "GridColumnSizer",
          width: width
        }, function (_ref2) {
          var adjustedWidth = _ref2.adjustedWidth,
            columnWidth = _ref2.columnWidth,
            registerChild = _ref2.registerChild;
          return /*#__PURE__*/React.createElement("div", {
            className: styles.GridContainer,
            style: {
              height: 50,
              width: adjustedWidth
            }
          }, /*#__PURE__*/React.createElement(Grid, {
            ref: registerChild,
            columnWidth: columnWidth,
            columnCount: columnCount,
            height: 50,
            noContentRenderer: _this2._noContentRenderer,
            cellRenderer: _this2._cellRenderer,
            rowHeight: 50,
            rowCount: 1,
            width: adjustedWidth
          }));
        });
      })));
    }
  }, {
    key: "_noColumnMaxWidthChange",
    value: function _noColumnMaxWidthChange(event) {
      var columnMaxWidth = parseInt(event.target.value, 10);
      if (isNaN(columnMaxWidth)) {
        columnMaxWidth = undefined;
      } else {
        columnMaxWidth = Math.min(1000, columnMaxWidth);
      }
      this.setState({
        columnMaxWidth: columnMaxWidth
      });
    }
  }, {
    key: "_noColumnMinWidthChange",
    value: function _noColumnMinWidthChange(event) {
      var columnMinWidth = parseInt(event.target.value, 10);
      if (isNaN(columnMinWidth)) {
        columnMinWidth = undefined;
      } else {
        columnMinWidth = Math.max(1, columnMinWidth);
      }
      this.setState({
        columnMinWidth: columnMinWidth
      });
    }
  }, {
    key: "_onColumnCountChange",
    value: function _onColumnCountChange(event) {
      this.setState({
        columnCount: parseInt(event.target.value, 10) || 0
      });
    }
  }, {
    key: "_noContentRenderer",
    value: function _noContentRenderer() {
      return /*#__PURE__*/React.createElement("div", {
        className: styles.noCells
      }, "No cells");
    }
  }, {
    key: "_cellRenderer",
    value: function _cellRenderer(_ref3) {
      var columnIndex = _ref3.columnIndex,
        key = _ref3.key,
        rowIndex = _ref3.rowIndex,
        style = _ref3.style;
      var className = columnIndex === 0 ? styles.firstCell : styles.cell;
      return /*#__PURE__*/React.createElement("div", {
        className: className,
        key: key,
        style: style
      }, "R:".concat(rowIndex, ", C:").concat(columnIndex));
    }
  }]);
}(React.PureComponent);
export { ColumnSizerExample as default };