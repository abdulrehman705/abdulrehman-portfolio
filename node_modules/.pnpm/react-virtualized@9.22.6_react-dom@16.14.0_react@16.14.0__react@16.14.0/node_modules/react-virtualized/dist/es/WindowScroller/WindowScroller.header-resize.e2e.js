import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
/**
 * @jest-environment jest-environment-puppeteer
 */

var bootstrap = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var page, scripts, _i, _scripts, path;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return global.browser.newPage();
        case 2:
          page = _context.sent;
          scripts = ['./node_modules/react/umd/react.development.js', './node_modules/react-dom/umd/react-dom.development.js', './dist/umd/react-virtualized.js'];
          _i = 0, _scripts = scripts;
        case 5:
          if (!(_i < _scripts.length)) {
            _context.next = 12;
            break;
          }
          path = _scripts[_i];
          _context.next = 9;
          return page.addScriptTag({
            path: path
          });
        case 9:
          _i++;
          _context.next = 5;
          break;
        case 12:
          return _context.abrupt("return", page);
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function bootstrap() {
    return _ref.apply(this, arguments);
  };
}();
var renderWindowScroller = function renderWindowScroller(updateScrollTopOnUpdatePosition) {
  var render = window.ReactDOM.render;
  var _window$React = window.React,
    createElement = _window$React.createElement,
    useState = _window$React.useState,
    useEffect = _window$React.useEffect;
  var WindowScroller = window.ReactVirtualized.WindowScroller;
  var container = document.createElement('div');
  container.id = 'container';
  document.body.appendChild(container);
  document.body.style.margin = 0;
  function Header(_ref2) {
    var height = _ref2.height;
    return createElement('div', {
      style: {
        height: height,
        backgroundColor: 'red'
      }
    });
  }
  function App() {
    var _useState = useState(100),
      _useState2 = _slicedToArray(_useState, 2),
      height = _useState2[0],
      setHeight = _useState2[1];
    window.setHeaderHeight = setHeight;
    useEffect(function () {
      return function () {
        return window.setHeaderHeight = null;
      };
    });
    return createElement('div', {}, createElement(Header, {
      height: height
    }), createElement(WindowScroller, {
      updateScrollTopOnUpdatePosition: updateScrollTopOnUpdatePosition,
      ref: function ref(windowScroller) {
        window.windowScroller = windowScroller;
      },
      onScroll: window.scrollFn,
      onResize: window.resizeFn
    }, function (_ref3) {
      var width = _ref3.width,
        scrollTop = _ref3.scrollTop;
      console.log({
        scrollTop: scrollTop
      });
      window.windowScrollerScrollTop = scrollTop;
      return createElement('div', {
        style: {
          width: width,
          height: 3000,
          backgroundColor: 'yellow'
        }
      });
    }));
  }
  render(createElement('div', {
    'data-test-id': 'main-container'
  }, createElement(App, {})), container);
};
jest.setTimeout(1200000);
var delay = function delay(time) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, time);
  });
};
test('will react to header height updates if notified through updatePosition', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
  var page, scrollFn, resizeFn, el, scrollTop, _scrollTop;
  return _regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        _context2.next = 2;
        return bootstrap();
      case 2:
        page = _context2.sent;
        scrollFn = jest.fn();
        resizeFn = jest.fn();
        _context2.next = 7;
        return page.exposeFunction('scrollFn', scrollFn);
      case 7:
        _context2.next = 9;
        return page.exposeFunction('resizeFn', resizeFn);
      case 9:
        _context2.next = 11;
        return page.setViewport({
          width: 400,
          height: 600
        });
      case 11:
        _context2.next = 13;
        return page.evaluate(renderWindowScroller, true);
      case 13:
        _context2.next = 15;
        return page.$('[data-test-id="main-container"]');
      case 15:
        el = _context2.sent;
        expect(el).not.toBeNull();
        _context2.next = 19;
        return page.evaluate(function () {
          return window.scrollTo(0, 200);
        });
      case 19:
        _context2.next = 21;
        return delay(500);
      case 21:
        _context2.next = 23;
        return page.evaluate(function () {
          return window.windowScrollerScrollTop;
        });
      case 23:
        scrollTop = _context2.sent;
        expect(scrollTop).toEqual(100);
        _context2.next = 27;
        return delay(500);
      case 27:
        _context2.next = 29;
        return page.evaluate(function () {
          console.log('change header height');
          window.setHeaderHeight(200);
        });
      case 29:
        _context2.next = 31;
        return delay(500);
      case 31:
        _context2.next = 33;
        return page.evaluate(function () {
          console.log('update position');
          window.windowScroller.updatePosition();
        });
      case 33:
        _context2.next = 35;
        return delay(500);
      case 35:
        _context2.next = 37;
        return page.evaluate(function () {
          return window.windowScrollerScrollTop;
        });
      case 37:
        _scrollTop = _context2.sent;
        expect(_scrollTop).toEqual(100);
      case 39:
      case "end":
        return _context2.stop();
    }
  }, _callee2);
})));
test('will NOT react to header height updates if notified through updatePosition if `updateScrollTopOnUpdatePosition` is false', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
  var page, scrollFn, resizeFn, el, _scrollTop2, scrollTop;
  return _regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        _context3.next = 2;
        return bootstrap();
      case 2:
        page = _context3.sent;
        scrollFn = jest.fn();
        resizeFn = jest.fn();
        _context3.next = 7;
        return page.exposeFunction('scrollFn', scrollFn);
      case 7:
        _context3.next = 9;
        return page.exposeFunction('resizeFn', resizeFn);
      case 9:
        _context3.next = 11;
        return page.setViewport({
          width: 400,
          height: 600
        });
      case 11:
        _context3.next = 13;
        return page.evaluate(renderWindowScroller, false);
      case 13:
        _context3.next = 15;
        return page.$('[data-test-id="main-container"]');
      case 15:
        el = _context3.sent;
        expect(el).not.toBeNull();
        _context3.next = 19;
        return page.evaluate(function () {
          return window.scrollTo(0, 200);
        });
      case 19:
        _context3.next = 21;
        return delay(500);
      case 21:
        _context3.next = 23;
        return page.evaluate(function () {
          return window.windowScrollerScrollTop;
        });
      case 23:
        _scrollTop2 = _context3.sent;
        expect(_scrollTop2).toEqual(100);
        _context3.next = 27;
        return delay(500);
      case 27:
        _context3.next = 29;
        return page.evaluate(function () {
          console.log('change header height');
          window.setHeaderHeight(200);
        });
      case 29:
        _context3.next = 31;
        return delay(500);
      case 31:
        _context3.next = 33;
        return page.evaluate(function () {
          console.log('update position');
          window.windowScroller.updatePosition();
        });
      case 33:
        _context3.next = 35;
        return delay(500);
      case 35:
        _context3.next = 37;
        return page.evaluate(function () {
          return window.windowScrollerScrollTop;
        });
      case 37:
        scrollTop = _context3.sent;
        expect(function () {
          expect(scrollTop).toEqual(100);
        }).toThrow();
      case 39:
      case "end":
        return _context3.stop();
    }
  }, _callee3);
})));
test('will properly process scroll events after header height updates', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
  var page, scrollFn, resizeFn, el, scrollTop, _scrollTop3;
  return _regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) switch (_context4.prev = _context4.next) {
      case 0:
        _context4.next = 2;
        return bootstrap();
      case 2:
        page = _context4.sent;
        scrollFn = jest.fn();
        resizeFn = jest.fn();
        _context4.next = 7;
        return page.exposeFunction('scrollFn', scrollFn);
      case 7:
        _context4.next = 9;
        return page.exposeFunction('resizeFn', resizeFn);
      case 9:
        _context4.next = 11;
        return page.setViewport({
          width: 400,
          height: 600
        });
      case 11:
        _context4.next = 13;
        return page.evaluate(renderWindowScroller, true);
      case 13:
        _context4.next = 15;
        return page.$('[data-test-id="main-container"]');
      case 15:
        el = _context4.sent;
        expect(el).not.toBeNull();
        _context4.next = 19;
        return page.evaluate(function () {
          return window.scrollTo(0, 200);
        });
      case 19:
        _context4.next = 21;
        return delay(500);
      case 21:
        _context4.next = 23;
        return page.evaluate(function () {
          return window.windowScrollerScrollTop;
        });
      case 23:
        scrollTop = _context4.sent;
        expect(scrollTop).toEqual(100);
        _context4.next = 27;
        return delay(500);
      case 27:
        _context4.next = 29;
        return page.evaluate(function () {
          window.setHeaderHeight(200);
        });
      case 29:
        _context4.next = 31;
        return delay(500);
      case 31:
        _context4.next = 33;
        return page.evaluate(function () {
          window.windowScroller.updatePosition();
        });
      case 33:
        _context4.next = 35;
        return delay(500);
      case 35:
        _context4.next = 37;
        return page.evaluate(function () {
          return window.scrollTo(0, 350);
        });
      case 37:
        _context4.next = 39;
        return page.evaluate(function () {
          return window.windowScrollerScrollTop;
        });
      case 39:
        _scrollTop3 = _context4.sent;
        expect(_scrollTop3).toEqual(150);
      case 41:
      case "end":
        return _context4.stop();
    }
  }, _callee4);
})));