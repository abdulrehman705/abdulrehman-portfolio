import { Component, createContext, createElement, forwardRef, useContext, useRef } from 'react';
import { driver, getInitialStyle } from 'styletron-standard';

/* eslint-env browser */

/* global module */
function addDebugMetadata(instance, stackIndex) {
  var _ref = new Error("stacktrace source"),
      stack = _ref.stack,
      stacktrace = _ref.stacktrace,
      message = _ref.message;

  instance.debug = {
    stackInfo: {
      stack: stack,
      stacktrace: stacktrace,
      message: message
    },
    stackIndex: stackIndex
  };
} // DEVTOOLS SETUP

var setupDevtoolsExtension = function setupDevtoolsExtension() {
  var atomicMap = {};
  var extensionsMap = new Map();
  var stylesMap = new Map();

  var getStyles = function getStyles(className) {
    var styles = {};

    if (typeof className !== "string") {
      return styles;
    }

    if (stylesMap.has(className)) {
      styles.styles = stylesMap.get(className);
      var classList = className.split(" ");

      if (classList.length) {
        var classes = {};
        classList.forEach(function (singleClassName) {
          classes[singleClassName] = atomicMap[singleClassName];
        });
        styles.classes = classes;
      }

      if (extensionsMap.has(className)) {
        var extension = extensionsMap.get(className);
        styles.extends = extension;
      }

      return styles;
    }
  };

  window.__STYLETRON_DEVTOOLS__ = {
    atomicMap: atomicMap,
    extensionsMap: extensionsMap,
    stylesMap: stylesMap,
    getStyles: getStyles
  };
};

var BrowserDebugEngine =
/*#__PURE__*/
function () {
  function BrowserDebugEngine(worker) {
    if (!worker) {
      var workerBlob = new Blob(["importScripts(\"https://unpkg.com/css-to-js-sourcemap-worker@2.0.5/worker.js\")"], {
        type: "application/javascript"
      });
      worker = new Worker(URL.createObjectURL(workerBlob));
      worker.postMessage({
        id: "init_wasm",
        url: "https://unpkg.com/css-to-js-sourcemap-worker@2.0.5/mappings.wasm"
      });
      worker.postMessage({
        id: "set_render_interval",
        interval: 120
      });

      if (module.hot) {
        module.hot.addStatusHandler(function (status) {
          if (status === "dispose") {
            worker.postMessage({
              id: "invalidate"
            });
          }
        });
      }
    }

    this.worker = worker;
    this.counter = 0;

    this.worker.onmessage = function (msg) {
      var _msg$data = msg.data,
          id = _msg$data.id,
          css = _msg$data.css;

      if (id === "render_css" && css) {
        var style = document.createElement("style");
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
      }
    };
  }

  var _proto = BrowserDebugEngine.prototype;

  _proto.debug = function debug(_ref2) {
    var stackIndex = _ref2.stackIndex,
        stackInfo = _ref2.stackInfo;
    var className = "__debug-" + this.counter++;
    this.worker.postMessage({
      id: "add_mapped_class",
      className: className,
      stackInfo: stackInfo,
      stackIndex: stackIndex
    });
    return className;
  };

  return BrowserDebugEngine;
}();

var DebugEngine = BrowserDebugEngine;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/* eslint-env browser */

/* eslint-disable no-unused-vars, no-redeclare, no-shadow */
var noopEngine = {
  renderStyle: function renderStyle() {
    return "";
  },
  renderKeyframes: function renderKeyframes() {
    return "";
  },
  renderFontFace: function renderFontFace() {
    return "";
  }
};
var StyletronContext = createContext(noopEngine);
var HydrationContext = createContext(false);
var DebugEngineContext = createContext();
var ThemeContext = createContext();

var DevProvider =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DevProvider, _React$Component);

  function DevProvider(props) {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.state = {
      hydrating: Boolean(props.debugAfterHydration)
    };
    return _this;
  }

  var _proto = DevProvider.prototype;

  _proto.componentDidMount = function componentDidMount() {
    {
      if (this.state.hydrating === true) {
        this.setState({
          hydrating: false
        });
      }
    }
  };

  _proto.render = function render() {
    return createElement(StyletronContext.Provider, {
      value: this.props.value
    }, createElement(DebugEngineContext.Provider, {
      value: this.props.debug
    }, createElement(HydrationContext.Provider, {
      value: this.state.hydrating
    }, this.props.children)));
  };

  return DevProvider;
}(Component);

var Provider = true && process.env.NODE_ENV !== "production" ? DevProvider : StyletronContext.Provider;

if (true && process.env.NODE_ENV !== "production" && !window.__STYLETRON_DEVTOOLS__) {
  setupDevtoolsExtension();
} // TODO: more precise types


function DevConsumer(props) {
  return createElement(StyletronContext.Consumer, null, function (styletronEngine) {
    return createElement(DebugEngineContext.Consumer, null, function (debugEngine) {
      return createElement(HydrationContext.Consumer, null, function (hydrating) {
        return props.children(styletronEngine, debugEngine, hydrating);
      });
    });
  });
}
var Consumer = true && process.env.NODE_ENV !== "production" ? DevConsumer : StyletronContext.Consumer;

function checkNoopEngine(engine) {
  // if no engine provided, we default to no-op, handy for tests
  // however, print a warning in other envs
  if (process.env.NODE_ENV !== "test") {
    engine === noopEngine && // eslint-disable-next-line no-console
    console.warn(process.env.NODE_ENV !== "production" ? "\nStyletron has been switched to a no-op (test) mode.\n\nA Styletron styled component was rendered, but no Styletron engine instance was provided in React context.\n\nDid you forget to provide a Styletron engine instance to React context via using the Styletron provider component?\n\nNote: Providers and Consumers must come from the exact same React.createContext call to work.\nIf your app has multiple instances of the \"styletron-react\" package in your node_module tree,\nyour Provider may be coming from a different React.createContext call, which means the styled components\nwill not recieve the provided engine instance. This scenario can arise, for example, when using \"npm link\".\n" : "Styletron Provider is not set up. Defaulting to no-op.");
  }
}

function useStyletron() {
  var styletronEngine = useContext(StyletronContext);
  var debugEngine = useContext(DebugEngineContext);
  var hydrating = useContext(HydrationContext);
  checkNoopEngine(styletronEngine);
  var debugClassName = useRef("");
  var prevDebugClassNameDeps = useRef([]);
  return [function css(style) {
    var className = driver(style, styletronEngine);

    if (!(true && process.env.NODE_ENV !== "production")) {
      return className;
    }

    var _ref = new Error("stacktrace source"),
        stack = _ref.stack,
        message = _ref.message;

    var nextDeps = [debugEngine, hydrating];

    if (prevDebugClassNameDeps.current[0] !== nextDeps[0] || prevDebugClassNameDeps.current[1] !== nextDeps[1]) {
      if (debugEngine && !hydrating) {
        debugClassName.current = debugEngine.debug({
          stackInfo: {
            stack: stack,
            message: message
          },
          stackIndex: 1
        });
      }

      prevDebugClassNameDeps.current = nextDeps;
    }

    if (debugClassName.current) {
      return debugClassName.current + " " + className;
    }

    return className;
  }];
}
function createStyled(_ref2) {
  var getInitialStyle$$1 = _ref2.getInitialStyle,
      driver$$1 = _ref2.driver,
      wrapper = _ref2.wrapper;

  function styled(base, styleArg) {
    if (process.env.NODE_ENV !== "production") {
      if (base.__STYLETRON__) {
        /* eslint-disable no-console */
        console.warn("It appears you are passing a styled component into `styled`.");
        console.warn("For composition with existing styled components, use `withStyle` or `withTransform` instead.");
        /* eslint-enable no-console */
      }
    }

    var baseStyletron = {
      reducers: [],
      base: base,
      driver: driver$$1,
      getInitialStyle: getInitialStyle$$1,
      wrapper: wrapper
    };

    if (true && process.env.NODE_ENV !== "production") {
      addDebugMetadata(baseStyletron, 2);
    }

    return createStyledElementComponent(autoComposeShallow(baseStyletron, styleArg));
  }

  return styled;
}
var styled = createStyled({
  getInitialStyle: getInitialStyle,
  driver: driver,
  wrapper: function wrapper(Component$$1) {
    return Component$$1;
  }
});
function withTransform(component, transformer) {
  var styletron = component.__STYLETRON__;

  if (true && process.env.NODE_ENV !== "production") {
    addDebugMetadata(styletron, 2);
  }

  return createStyledElementComponent(composeDynamic(styletron, transformer));
}
var withStyle = withStyleDeep;
function withStyleDeep(component, styleArg) {
  var styletron = component.__STYLETRON__;

  if (process.env.NODE_ENV !== "production") {
    if (!styletron) {
      /* eslint-disable no-console */
      console.warn("The first parameter to `withStyle` must be a styled component (without extra wrappers).");
      /* eslint-enable no-console */
    }
  }

  if (true && process.env.NODE_ENV !== "production") {
    addDebugMetadata(styletron, 2);
    return createStyledElementComponent(addExtension(autoComposeDeep(styletron, styleArg), component, styleArg));
  } else {
    return createStyledElementComponent(autoComposeDeep(styletron, styleArg));
  }
}
function withWrapper(component, wrapper) {
  var styletron = component.__STYLETRON__;

  if (process.env.NODE_ENV !== "production") {
    if (!styletron) {
      /* eslint-disable no-console */
      console.warn("The first parameter to `withWrapper` must be a styled component (without extra wrappers).");
      /* eslint-enable no-console */
    }
  }

  var composed = {
    getInitialStyle: styletron.getInitialStyle,
    base: styletron.base,
    driver: styletron.driver,
    wrapper: wrapper,
    reducers: styletron.reducers
  };

  if (true && process.env.NODE_ENV !== "production") {
    addDebugMetadata(composed, 2);
  }

  return createStyledElementComponent(composed);
}
function autoComposeShallow(styletron, styleArg) {
  if (typeof styleArg === "function") {
    return dynamicComposeShallow(styletron, styleArg);
  }

  return staticComposeShallow(styletron, styleArg);
}

function addExtension(composed, component, styleArg) {
  return Object.assign({}, composed, {
    ext: {
      with: styleArg,
      name: component.displayName,
      base: component.__STYLETRON__.base,
      getInitialStyle: component.__STYLETRON__.reducers.length ? component.__STYLETRON__.reducers[0].reducer : component.__STYLETRON__.getInitialStyle
    }
  });
}

function autoComposeDeep(styletron, styleArg) {
  if (typeof styleArg === "function") {
    return dynamicComposeDeep(styletron, styleArg);
  }

  return staticComposeDeep(styletron, styleArg);
}
function staticComposeShallow(styletron, style) {
  return composeStatic(styletron, createShallowMergeReducer(style));
}
function staticComposeDeep(styletron, style) {
  return composeStatic(styletron, createDeepMergeReducer(style));
}
function dynamicComposeShallow(styletron, styleFn) {
  return composeDynamic(styletron, function (style, props) {
    return shallowMerge(style, styleFn(props));
  });
}
function dynamicComposeDeep(styletron, styleFn) {
  return composeDynamic(styletron, function (style, props) {
    return deepMerge(style, styleFn(props));
  });
}
function createShallowMergeReducer(style) {
  return {
    reducer: function reducer(inputStyle) {
      return shallowMerge(inputStyle, style);
    },
    assignmentCommutative: true,
    factory: createShallowMergeReducer,
    style: style
  };
}
function createDeepMergeReducer(style) {
  return {
    reducer: function reducer(inputStyle) {
      return deepMerge(inputStyle, style);
    },
    assignmentCommutative: true,
    factory: createDeepMergeReducer,
    style: style
  };
}
function composeStatic(styletron, reducerContainer) {
  if (styletron.reducers.length === 0) {
    var style = reducerContainer.reducer(styletron.getInitialStyle());
    var result = {
      reducers: styletron.reducers,
      base: styletron.base,
      driver: styletron.driver,
      wrapper: styletron.wrapper,
      getInitialStyle: function getInitialStyle$$1() {
        return style;
      }
    };

    if (true && process.env.NODE_ENV !== "production") {
      result.debug = styletron.debug;
    }

    return result;
  } else {
    var last = styletron.reducers[0];

    if (last.assignmentCommutative === true && reducerContainer.assignmentCommutative === true) {
      var composed = reducerContainer.reducer(last.style);
      var _result = {
        getInitialStyle: styletron.getInitialStyle,
        base: styletron.base,
        driver: styletron.driver,
        wrapper: styletron.wrapper,
        reducers: [last.factory(composed)].concat(styletron.reducers.slice(1))
      };

      if (true && process.env.NODE_ENV !== "production") {
        _result.debug = styletron.debug;
      }

      return _result;
    }

    return composeDynamic(styletron, reducerContainer.reducer);
  }
}
function composeDynamic(styletron, reducer) {
  var composed = {
    getInitialStyle: styletron.getInitialStyle,
    base: styletron.base,
    driver: styletron.driver,
    wrapper: styletron.wrapper,
    reducers: [{
      assignmentCommutative: false,
      reducer: reducer
    }].concat(styletron.reducers)
  };

  if (true && process.env.NODE_ENV !== "production") {
    composed.debug = styletron.debug;
  }

  return composed;
}
function createStyledElementComponent(styletron) {
  var reducers = styletron.reducers,
      base = styletron.base,
      driver$$1 = styletron.driver,
      wrapper = styletron.wrapper,
      getInitialStyle$$1 = styletron.getInitialStyle,
      ext = styletron.ext;

  if (true && process.env.NODE_ENV !== "production") {
    var debugStackInfo, debugStackIndex;

    if (styletron.debug) {
      debugStackInfo = styletron.debug.stackInfo;
      debugStackIndex = styletron.debug.stackIndex;
    }
  }

  if (true && process.env.NODE_ENV !== "production") {
    var debugClassName;
  }

  var StyledElement = forwardRef(function (props, ref) {
    return createElement(Consumer, null, function (styletron, debugEngine, hydrating) {
      checkNoopEngine(styletron);
      var elementProps = omitPrefixedKeys(props);
      var style = resolveStyle(getInitialStyle$$1, reducers, props);

      if (props.$style) {
        if (typeof props.$style === "function") {
          style = deepMerge(style, props.$style(props));
        } else {
          style = deepMerge(style, props.$style);
        }
      }

      var styleClassString = driver$$1(style, styletron);
      var Element = props.$as ? props.$as : base;
      elementProps.className = props.className ? props.className + " " + styleClassString : styleClassString;

      if (true && process.env.NODE_ENV !== "production" && debugEngine && !hydrating) {
        if (!debugClassName) {
          debugClassName = debugEngine.debug({
            stackInfo: debugStackInfo,
            stackIndex: debugStackIndex
          });
        }

        var joined = debugClassName + " " + elementProps.className;
        elementProps.className = joined;
      }

      if (true && process.env.NODE_ENV !== "production" && window.__STYLETRON_DEVTOOLS__) {
        window.__STYLETRON_DEVTOOLS__.stylesMap.set(elementProps.className, style);

        if (ext) {
          window.__STYLETRON_DEVTOOLS__.extensionsMap.set(elementProps.className, {
            base: ext.base,
            displayName: ext.name,
            initialStyles: ext.getInitialStyle({}, props),
            styleOverrides: typeof ext.with === "function" ? ext.with(props) : ext.with
          });
        }
      }

      if (props.$ref) {
        // eslint-disable-next-line no-console
        console.warn("The prop `$ref` has been deprecated. Use `ref` instead. Refs are now forwarded with React.forwardRef.");
      }

      return createElement(Element, _extends({}, elementProps, {
        ref: ref || props.$ref
      }));
    });
  });
  var Wrapped = wrapper(StyledElement);
  Wrapped.__STYLETRON__ = {
    base: base,
    reducers: reducers,
    driver: driver$$1,
    wrapper: wrapper,
    getInitialStyle: getInitialStyle$$1
  };

  if (process.env.NODE_ENV !== "production") {
    var displayName;

    if (typeof base === "string") {
      displayName = base;
    } else if (base.displayName) {
      displayName = base.displayName;
    } else if (base.name) {
      displayName = base.name;
    } else {
      displayName = "Unknown";
    }

    Wrapped.displayName = "Styled(" + displayName + ")";
  }

  return Wrapped;
} // Utility functions

function resolveStyle(getInitialStyle$$1, reducers, props) {
  var result = getInitialStyle$$1();
  var i = reducers.length;

  while (i--) {
    // Cast to allow passing unused props param in case of static reducer
    var reducer = reducers[i].reducer;
    result = reducer(result, props);
  }

  return result;
}

function isObject(x) {
  return _typeof(x) === "object" && x !== null;
}

function omitPrefixedKeys(source) {
  var result = {};

  for (var key in source) {
    if (key[0] !== "$") {
      result[key] = source[key];
    }
  }

  return result;
}

function deepMerge(a, b) {
  var result = assign({}, a);

  for (var key in b) {
    var val = b[key];

    if (isObject(val) && isObject(a[key])) {
      result[key] = deepMerge(a[key], val);
    } else {
      result[key] = val;
    }
  }

  return result;
}

function shallowMerge(a, b) {
  return assign(assign({}, a), b);
}

function assign(target, source) {
  for (var key in source) {
    target[key] = source[key];
  }

  return target;
}

export { DebugEngine, Provider, DevConsumer, useStyletron, createStyled, styled, withTransform, withStyle, withStyleDeep, withWrapper, autoComposeShallow, autoComposeDeep, staticComposeShallow, staticComposeDeep, dynamicComposeShallow, dynamicComposeDeep, createShallowMergeReducer, createDeepMergeReducer, composeStatic, composeDynamic, createStyledElementComponent, resolveStyle };
//# sourceMappingURL=browser.es5.es.js.map
