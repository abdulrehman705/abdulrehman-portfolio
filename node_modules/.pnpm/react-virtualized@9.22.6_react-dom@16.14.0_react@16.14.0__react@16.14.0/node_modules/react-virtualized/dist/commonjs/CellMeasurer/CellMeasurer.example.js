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
var _immutable = _interopRequireDefault(require("immutable"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var React = _interopRequireWildcard(require("react"));
var _ContentBox = require("../demo/ContentBox");
var _AutoSizer = _interopRequireDefault(require("../AutoSizer"));
var _clsx3 = _interopRequireDefault(require("clsx"));
var _CellMeasurerExample2 = _interopRequireDefault(require("./CellMeasurer.example.css"));
var _CellMeasurerDynamicWidthGridExample = _interopRequireDefault(require("./CellMeasurer.DynamicWidthGrid.example.js"));
var _CellMeasurerDynamicHeightGridExample = _interopRequireDefault(require("./CellMeasurer.DynamicHeightGrid.example.js"));
var _CellMeasurerDynamicWidthMultiGridExample = _interopRequireDefault(require("./CellMeasurer.DynamicWidthMultiGrid.example.js"));
var _CellMeasurerDynamicHeightListExample = _interopRequireDefault(require("./CellMeasurer.DynamicHeightList.example.js"));
var _CellMeasurerDynamicHeightTableColumnExample = _interopRequireDefault(require("./CellMeasurer.DynamicHeightTableColumn.example.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var demoComponents = [_CellMeasurerDynamicWidthGridExample["default"], _CellMeasurerDynamicHeightGridExample["default"], _CellMeasurerDynamicWidthMultiGridExample["default"], _CellMeasurerDynamicHeightListExample["default"], _CellMeasurerDynamicHeightTableColumnExample["default"]];
var CellMeasurerExample = exports["default"] = /*#__PURE__*/function (_React$PureComponent) {
  function CellMeasurerExample(props, context) {
    var _this;
    (0, _classCallCheck2["default"])(this, CellMeasurerExample);
    _this = _callSuper(this, CellMeasurerExample, [props, context]);
    _this.state = {
      currentTab: 0
    };
    _this._onClick = _this._onClick.bind(_this);
    return _this;
  }
  (0, _inherits2["default"])(CellMeasurerExample, _React$PureComponent);
  return (0, _createClass2["default"])(CellMeasurerExample, [{
    key: "render",
    value: function render() {
      var list = this.context.list;
      var currentTab = this.state.currentTab;
      var buttonProps = {
        currentTab: currentTab,
        onClick: this._onClick
      };
      var DemoComponent = demoComponents[currentTab];
      return /*#__PURE__*/React.createElement(_ContentBox.ContentBox, null, /*#__PURE__*/React.createElement(_ContentBox.ContentBoxHeader, {
        text: "CellMeasurer",
        sourceLink: "https://github.com/bvaughn/react-virtualized/blob/master/source/CellMeasurer/CellMeasurer.example.js",
        docsLink: "https://github.com/bvaughn/react-virtualized/blob/master/docs/CellMeasurer.md"
      }), /*#__PURE__*/React.createElement(_ContentBox.ContentBoxParagraph, null, "This component can be used to just-in-time measure dynamic content (eg. messages in a chat interface)."), /*#__PURE__*/React.createElement(_AutoSizer["default"], {
        disableHeight: true
      }, function (_ref) {
        var width = _ref.width;
        return /*#__PURE__*/React.createElement("div", {
          style: {
            width: width
          }
        }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Grid"), ":", /*#__PURE__*/React.createElement(Tab, (0, _extends2["default"])({
          id: 0
        }, buttonProps), "dynamic width text"), /*#__PURE__*/React.createElement(Tab, (0, _extends2["default"])({
          id: 1
        }, buttonProps), "dynamic height text"), /*#__PURE__*/React.createElement("strong", null, "MultiGrid"), ":", /*#__PURE__*/React.createElement(Tab, (0, _extends2["default"])({
          id: 2
        }, buttonProps), "dynamic width text"), /*#__PURE__*/React.createElement("strong", null, "List"), ":", /*#__PURE__*/React.createElement(Tab, (0, _extends2["default"])({
          id: 3
        }, buttonProps), "dynamic height image"), /*#__PURE__*/React.createElement("strong", null, "Table"), ":", /*#__PURE__*/React.createElement(Tab, (0, _extends2["default"])({
          id: 4
        }, buttonProps), "mixed fixed and dynamic height text")), /*#__PURE__*/React.createElement(DemoComponent, {
          getClassName: getClassName,
          getContent: getContent,
          list: list,
          width: width
        }));
      }));
    }
  }, {
    key: "_onClick",
    value: function _onClick(id) {
      this.setState({
        currentTab: id
      });
    }
  }]);
}(React.PureComponent);
(0, _defineProperty2["default"])(CellMeasurerExample, "contextTypes", {
  list: _propTypes["default"].instanceOf(_immutable["default"].List).isRequired
});
function getClassName(_ref2) {
  var columnIndex = _ref2.columnIndex,
    rowIndex = _ref2.rowIndex;
  var rowClass = rowIndex % 2 === 0 ? _CellMeasurerExample2["default"].evenRow : _CellMeasurerExample2["default"].oddRow;
  return (0, _clsx3["default"])(rowClass, _CellMeasurerExample2["default"].cell, (0, _defineProperty2["default"])({}, _CellMeasurerExample2["default"].centeredCell, columnIndex > 2));
}
function getContent(_ref3) {
  var index = _ref3.index,
    datum = _ref3.datum,
    _ref3$long = _ref3["long"],
    _long = _ref3$long === void 0 ? true : _ref3$long;
  switch (index % 3) {
    case 0:
      return datum.color;
    case 1:
      return datum.name;
    case 2:
      return _long ? datum.randomLong : datum.random;
  }
}
function Tab(_ref4) {
  var children = _ref4.children,
    currentTab = _ref4.currentTab,
    id = _ref4.id,
    _onClick2 = _ref4.onClick;
  var classNames = (0, _clsx3["default"])(_CellMeasurerExample2["default"].Tab, (0, _defineProperty2["default"])({}, _CellMeasurerExample2["default"].ActiveTab, currentTab === id));
  return /*#__PURE__*/React.createElement("button", {
    className: classNames,
    onClick: function onClick() {
      return _onClick2(id);
    }
  }, children);
}