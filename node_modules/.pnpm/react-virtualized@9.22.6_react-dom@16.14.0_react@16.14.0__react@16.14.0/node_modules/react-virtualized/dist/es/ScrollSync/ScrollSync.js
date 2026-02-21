import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
import PropTypes from 'prop-types';
import * as React from 'react';

/**
 * HOC that simplifies the process of synchronizing scrolling between two or more virtualized components.
 */
var ScrollSync = /*#__PURE__*/function (_React$PureComponent) {
  function ScrollSync(props, context) {
    var _this;
    _classCallCheck(this, ScrollSync);
    _this = _callSuper(this, ScrollSync, [props, context]);
    _this.state = {
      clientHeight: 0,
      clientWidth: 0,
      scrollHeight: 0,
      scrollLeft: 0,
      scrollTop: 0,
      scrollWidth: 0
    };
    _this._onScroll = _this._onScroll.bind(_this);
    return _this;
  }
  _inherits(ScrollSync, _React$PureComponent);
  return _createClass(ScrollSync, [{
    key: "render",
    value: function render() {
      var children = this.props.children;
      var _this$state = this.state,
        clientHeight = _this$state.clientHeight,
        clientWidth = _this$state.clientWidth,
        scrollHeight = _this$state.scrollHeight,
        scrollLeft = _this$state.scrollLeft,
        scrollTop = _this$state.scrollTop,
        scrollWidth = _this$state.scrollWidth;
      return children({
        clientHeight: clientHeight,
        clientWidth: clientWidth,
        onScroll: this._onScroll,
        scrollHeight: scrollHeight,
        scrollLeft: scrollLeft,
        scrollTop: scrollTop,
        scrollWidth: scrollWidth
      });
    }
  }, {
    key: "_onScroll",
    value: function _onScroll(_ref) {
      var clientHeight = _ref.clientHeight,
        clientWidth = _ref.clientWidth,
        scrollHeight = _ref.scrollHeight,
        scrollLeft = _ref.scrollLeft,
        scrollTop = _ref.scrollTop,
        scrollWidth = _ref.scrollWidth;
      this.setState({
        clientHeight: clientHeight,
        clientWidth: clientWidth,
        scrollHeight: scrollHeight,
        scrollLeft: scrollLeft,
        scrollTop: scrollTop,
        scrollWidth: scrollWidth
      });
    }
  }]);
}(React.PureComponent);
export { ScrollSync as default };
ScrollSync.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Function responsible for rendering 2 or more virtualized components.
   * This function should implement the following signature:
   * ({ onScroll, scrollLeft, scrollTop }) => PropTypes.element
   */
  children: PropTypes.func.isRequired
} : {};