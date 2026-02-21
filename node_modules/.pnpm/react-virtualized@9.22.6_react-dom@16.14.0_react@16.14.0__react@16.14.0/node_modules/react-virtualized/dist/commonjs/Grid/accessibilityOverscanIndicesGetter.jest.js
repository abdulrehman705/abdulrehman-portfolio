"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
var _accessibilityOverscanIndicesGetter = _interopRequireWildcard(require("./accessibilityOverscanIndicesGetter"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
describe('overscanIndicesGetter', function () {
  function testHelper(_ref) {
    var cellCount = _ref.cellCount,
      startIndex = _ref.startIndex,
      stopIndex = _ref.stopIndex,
      overscanCellsCount = _ref.overscanCellsCount,
      scrollDirection = _ref.scrollDirection;
    return (0, _accessibilityOverscanIndicesGetter["default"])({
      cellCount: cellCount,
      overscanCellsCount: overscanCellsCount,
      scrollDirection: scrollDirection,
      startIndex: startIndex,
      stopIndex: stopIndex
    });
  }
  it('should still overscan by 1 (for keyboard accessibility) if :overscanCellsCount is 0', function () {
    expect(testHelper({
      cellCount: 100,
      startIndex: 10,
      stopIndex: 20,
      overscanCellsCount: 0,
      scrollDirection: _accessibilityOverscanIndicesGetter.SCROLL_DIRECTION_BACKWARD
    })).toEqual({
      overscanStartIndex: 9,
      overscanStopIndex: 21
    });
    expect(testHelper({
      cellCount: 100,
      startIndex: 10,
      stopIndex: 20,
      overscanCellsCount: 0,
      scrollDirection: _accessibilityOverscanIndicesGetter.SCROLL_DIRECTION_FORWARD
    })).toEqual({
      overscanStartIndex: 9,
      overscanStopIndex: 21
    });
  });
  it('should overscan forward', function () {
    expect(testHelper({
      cellCount: 100,
      startIndex: 20,
      stopIndex: 30,
      overscanCellsCount: 10,
      scrollDirection: _accessibilityOverscanIndicesGetter.SCROLL_DIRECTION_FORWARD
    })).toEqual({
      overscanStartIndex: 19,
      overscanStopIndex: 40
    });
  });
  it('should overscan backward', function () {
    expect(testHelper({
      cellCount: 100,
      startIndex: 20,
      stopIndex: 30,
      overscanCellsCount: 10,
      scrollDirection: _accessibilityOverscanIndicesGetter.SCROLL_DIRECTION_BACKWARD
    })).toEqual({
      overscanStartIndex: 10,
      overscanStopIndex: 31
    });
  });
  it('should not overscan beyond the start of the list', function () {
    expect(testHelper({
      cellCount: 100,
      startIndex: 5,
      stopIndex: 15,
      overscanCellsCount: 10,
      scrollDirection: _accessibilityOverscanIndicesGetter.SCROLL_DIRECTION_BACKWARD
    })).toEqual({
      overscanStartIndex: 0,
      overscanStopIndex: 16
    });
  });
  it('should not overscan beyond the end of the list', function () {
    expect(testHelper({
      cellCount: 25,
      startIndex: 10,
      stopIndex: 20,
      overscanCellsCount: 10,
      scrollDirection: _accessibilityOverscanIndicesGetter.SCROLL_DIRECTION_FORWARD
    })).toEqual({
      overscanStartIndex: 9,
      overscanStopIndex: 24
    });
  });
});