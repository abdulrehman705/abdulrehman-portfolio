import * as React from 'react';
/*:: import type {HeaderRowRendererParams} from './types';*/
export default function defaultHeaderRowRenderer(_ref /*:: */) {
  var className = _ref /*:: */.className,
    columns = _ref /*:: */.columns,
    style = _ref /*:: */.style;
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    role: "row",
    style: style
  }, columns);
}