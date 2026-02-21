"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = defaultRowRenderer;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/*:: import type {RowRendererParams} from './types';*/
/**
 * Default row renderer for Table.
 */
function defaultRowRenderer(_ref /*:: */) {
  var className = _ref /*:: */.className,
    columns = _ref /*:: */.columns,
    index = _ref /*:: */.index,
    key = _ref /*:: */.key,
    onRowClick = _ref /*:: */.onRowClick,
    onRowDoubleClick = _ref /*:: */.onRowDoubleClick,
    onRowMouseOut = _ref /*:: */.onRowMouseOut,
    onRowMouseOver = _ref /*:: */.onRowMouseOver,
    onRowRightClick = _ref /*:: */.onRowRightClick,
    rowData = _ref /*:: */.rowData,
    style = _ref /*:: */.style;
  var a11yProps = {
    'aria-rowindex': index + 1
  };
  if (onRowClick || onRowDoubleClick || onRowMouseOut || onRowMouseOver || onRowRightClick) {
    a11yProps['aria-label'] = 'row';
    a11yProps.tabIndex = 0;
    if (onRowClick) {
      a11yProps.onClick = function (event) {
        return onRowClick({
          event: event,
          index: index,
          rowData: rowData
        });
      };
    }
    if (onRowDoubleClick) {
      a11yProps.onDoubleClick = function (event) {
        return onRowDoubleClick({
          event: event,
          index: index,
          rowData: rowData
        });
      };
    }
    if (onRowMouseOut) {
      a11yProps.onMouseOut = function (event) {
        return onRowMouseOut({
          event: event,
          index: index,
          rowData: rowData
        });
      };
    }
    if (onRowMouseOver) {
      a11yProps.onMouseOver = function (event) {
        return onRowMouseOver({
          event: event,
          index: index,
          rowData: rowData
        });
      };
    }
    if (onRowRightClick) {
      a11yProps.onContextMenu = function (event) {
        return onRowRightClick({
          event: event,
          index: index,
          rowData: rowData
        });
      };
    }
  }
  return /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({}, a11yProps, {
    className: className,
    key: key,
    role: "row",
    style: style
  }), columns);
}