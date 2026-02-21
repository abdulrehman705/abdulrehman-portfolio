import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
import * as React from 'react';
import PropTypes from 'prop-types';
import { ContentBox, ContentBoxHeader, ContentBoxParagraph } from '../demo/ContentBox';
import Immutable from 'immutable';
import AutoSizer from '../AutoSizer';
import InfiniteLoader from './InfiniteLoader';
import List from '../List';
import styles from './InfiniteLoader.example.css';
var STATUS_LOADING = 1;
var STATUS_LOADED = 2;
var InfiniteLoaderExample = /*#__PURE__*/function (_React$PureComponent) {
  function InfiniteLoaderExample(props) {
    var _this;
    _classCallCheck(this, InfiniteLoaderExample);
    _this = _callSuper(this, InfiniteLoaderExample, [props]);
    _this.state = {
      loadedRowCount: 0,
      loadedRowsMap: {},
      loadingRowCount: 0
    };
    _this._timeoutIdMap = {};
    _this._clearData = _this._clearData.bind(_this);
    _this._isRowLoaded = _this._isRowLoaded.bind(_this);
    _this._loadMoreRows = _this._loadMoreRows.bind(_this);
    _this._rowRenderer = _this._rowRenderer.bind(_this);
    return _this;
  }
  _inherits(InfiniteLoaderExample, _React$PureComponent);
  return _createClass(InfiniteLoaderExample, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      Object.keys(this._timeoutIdMap).forEach(function (timeoutId) {
        clearTimeout(timeoutId);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var list = this.context.list;
      var _this$state = this.state,
        loadedRowCount = _this$state.loadedRowCount,
        loadingRowCount = _this$state.loadingRowCount;
      return /*#__PURE__*/React.createElement(ContentBox, null, /*#__PURE__*/React.createElement(ContentBoxHeader, {
        text: "InfiniteLoader",
        sourceLink: "https://github.com/bvaughn/react-virtualized/blob/master/source/InfiniteLoader/InfiniteLoader.example.js",
        docsLink: "https://github.com/bvaughn/react-virtualized/blob/master/docs/InfiniteLoader.md"
      }), /*#__PURE__*/React.createElement(ContentBoxParagraph, null, "This component manages just-in-time data fetching to ensure that the all visible rows have been loaded. It also uses a threshold to determine how early to pre-fetch rows (before a user scrolls to them)."), /*#__PURE__*/React.createElement(ContentBoxParagraph, null, /*#__PURE__*/React.createElement("div", {
        className: styles.cacheButtonAndCountRow
      }, /*#__PURE__*/React.createElement("button", {
        className: styles.button,
        onClick: this._clearData
      }, "Flush Cached Data"), /*#__PURE__*/React.createElement("div", {
        className: styles.cacheCountRow
      }, loadingRowCount, " loading, ", loadedRowCount, " loaded"))), /*#__PURE__*/React.createElement(InfiniteLoader, {
        isRowLoaded: this._isRowLoaded,
        loadMoreRows: this._loadMoreRows,
        rowCount: list.size
      }, function (_ref) {
        var onRowsRendered = _ref.onRowsRendered,
          registerChild = _ref.registerChild;
        return /*#__PURE__*/React.createElement(AutoSizer, {
          disableHeight: true
        }, function (_ref2) {
          var width = _ref2.width;
          return /*#__PURE__*/React.createElement(List, {
            ref: registerChild,
            className: styles.List,
            height: 200,
            onRowsRendered: onRowsRendered,
            rowCount: list.size,
            rowHeight: 30,
            rowRenderer: _this2._rowRenderer,
            width: width
          });
        });
      }));
    }
  }, {
    key: "_clearData",
    value: function _clearData() {
      this.setState({
        loadedRowCount: 0,
        loadedRowsMap: {},
        loadingRowCount: 0
      });
    }
  }, {
    key: "_isRowLoaded",
    value: function _isRowLoaded(_ref3) {
      var index = _ref3.index;
      var loadedRowsMap = this.state.loadedRowsMap;
      return !!loadedRowsMap[index]; // STATUS_LOADING or STATUS_LOADED
    }
  }, {
    key: "_loadMoreRows",
    value: function _loadMoreRows(_ref4) {
      var _this3 = this;
      var startIndex = _ref4.startIndex,
        stopIndex = _ref4.stopIndex;
      var _this$state2 = this.state,
        loadedRowsMap = _this$state2.loadedRowsMap,
        loadingRowCount = _this$state2.loadingRowCount;
      var increment = stopIndex - startIndex + 1;
      for (var i = startIndex; i <= stopIndex; i++) {
        loadedRowsMap[i] = STATUS_LOADING;
      }
      this.setState({
        loadingRowCount: loadingRowCount + increment
      });
      var timeoutId = setTimeout(function () {
        var _this3$state = _this3.state,
          loadedRowCount = _this3$state.loadedRowCount,
          loadingRowCount = _this3$state.loadingRowCount;
        delete _this3._timeoutIdMap[timeoutId];
        for (var i = startIndex; i <= stopIndex; i++) {
          loadedRowsMap[i] = STATUS_LOADED;
        }
        _this3.setState({
          loadingRowCount: loadingRowCount - increment,
          loadedRowCount: loadedRowCount + increment
        });
        promiseResolver();
      }, 1000 + Math.round(Math.random() * 2000));
      this._timeoutIdMap[timeoutId] = true;
      var promiseResolver;
      return new Promise(function (resolve) {
        promiseResolver = resolve;
      });
    }
  }, {
    key: "_rowRenderer",
    value: function _rowRenderer(_ref5) {
      var index = _ref5.index,
        key = _ref5.key,
        style = _ref5.style;
      var list = this.context.list;
      var loadedRowsMap = this.state.loadedRowsMap;
      var row = list.get(index);
      var content;
      if (loadedRowsMap[index] === STATUS_LOADED) {
        content = row.name;
      } else {
        content = /*#__PURE__*/React.createElement("div", {
          className: styles.placeholder,
          style: {
            width: row.size
          }
        });
      }
      return /*#__PURE__*/React.createElement("div", {
        className: styles.row,
        key: key,
        style: style
      }, content);
    }
  }]);
}(React.PureComponent);
_defineProperty(InfiniteLoaderExample, "contextTypes", {
  list: PropTypes.instanceOf(Immutable.List).isRequired
});
export { InfiniteLoaderExample as default };