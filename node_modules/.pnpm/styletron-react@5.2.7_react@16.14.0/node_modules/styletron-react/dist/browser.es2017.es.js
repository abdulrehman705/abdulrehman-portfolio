import { Component, createContext, createElement, forwardRef, useContext, useRef } from 'react';
import { driver, getInitialStyle } from 'styletron-standard';

/* eslint-env browser */

/* global module */
function addDebugMetadata(instance, stackIndex) {
  const {
    stack,
    stacktrace,
    message
  } = new Error("stacktrace source");
  instance.debug = {
    stackInfo: {
      stack,
      stacktrace,
      message
    },
    stackIndex: stackIndex
  };
} // DEVTOOLS SETUP

const setupDevtoolsExtension = () => {
  const atomicMap = {};
  const extensionsMap = new Map();
  const stylesMap = new Map();

  const getStyles = className => {
    const styles = {};

    if (typeof className !== "string") {
      return styles;
    }

    if (stylesMap.has(className)) {
      styles.styles = stylesMap.get(className);
      const classList = className.split(" ");

      if (classList.length) {
        const classes = {};
        classList.forEach(singleClassName => {
          classes[singleClassName] = atomicMap[singleClassName];
        });
        styles.classes = classes;
      }

      if (extensionsMap.has(className)) {
        const extension = extensionsMap.get(className);
        styles.extends = extension;
      }

      return styles;
    }
  };

  window.__STYLETRON_DEVTOOLS__ = {
    atomicMap,
    extensionsMap,
    stylesMap,
    getStyles
  };
};

class BrowserDebugEngine {
  constructor(worker) {
    if (!worker) {
      const workerBlob = new Blob([`importScripts("https://unpkg.com/css-to-js-sourcemap-worker@2.0.5/worker.js")`], {
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
        module.hot.addStatusHandler(status => {
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

    this.worker.onmessage = msg => {
      const {
        id,
        css
      } = msg.data;

      if (id === "render_css" && css) {
        const style = document.createElement("style");
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
      }
    };
  }

  debug({
    stackIndex,
    stackInfo
  }) {
    const className = `__debug-${this.counter++}`;
    this.worker.postMessage({
      id: "add_mapped_class",
      className,
      stackInfo,
      stackIndex
    });
    return className;
  }

}

const DebugEngine = BrowserDebugEngine;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-env browser */

/* eslint-disable no-unused-vars, no-redeclare, no-shadow */
const noopEngine = {
  renderStyle: () => "",
  renderKeyframes: () => "",
  renderFontFace: () => ""
};
const StyletronContext = createContext(noopEngine);
const HydrationContext = createContext(false);
const DebugEngineContext = createContext();
const ThemeContext = createContext();

class DevProvider extends Component {
  constructor(props) {
    super();
    this.state = {
      hydrating: Boolean(props.debugAfterHydration)
    };
  }

  componentDidMount() {
    {
      if (this.state.hydrating === true) {
        this.setState({
          hydrating: false
        });
      }
    }
  }

  render() {
    return createElement(StyletronContext.Provider, {
      value: this.props.value
    }, createElement(DebugEngineContext.Provider, {
      value: this.props.debug
    }, createElement(HydrationContext.Provider, {
      value: this.state.hydrating
    }, this.props.children)));
  }

}

const Provider = true && process.env.NODE_ENV !== "production" ? DevProvider : StyletronContext.Provider;

if (true && process.env.NODE_ENV !== "production" && !window.__STYLETRON_DEVTOOLS__) {
  setupDevtoolsExtension();
} // TODO: more precise types


function DevConsumer(props) {
  return createElement(StyletronContext.Consumer, null, styletronEngine => createElement(DebugEngineContext.Consumer, null, debugEngine => createElement(HydrationContext.Consumer, null, hydrating => props.children(styletronEngine, debugEngine, hydrating))));
}
const Consumer = true && process.env.NODE_ENV !== "production" ? DevConsumer : StyletronContext.Consumer;

function checkNoopEngine(engine) {
  // if no engine provided, we default to no-op, handy for tests
  // however, print a warning in other envs
  if (process.env.NODE_ENV !== "test") {
    engine === noopEngine && // eslint-disable-next-line no-console
    console.warn(process.env.NODE_ENV !== "production" ? `
Styletron has been switched to a no-op (test) mode.

A Styletron styled component was rendered, but no Styletron engine instance was provided in React context.

Did you forget to provide a Styletron engine instance to React context via using the Styletron provider component?

Note: Providers and Consumers must come from the exact same React.createContext call to work.
If your app has multiple instances of the "styletron-react" package in your node_module tree,
your Provider may be coming from a different React.createContext call, which means the styled components
will not recieve the provided engine instance. This scenario can arise, for example, when using "npm link".
` : `Styletron Provider is not set up. Defaulting to no-op.`);
  }
}

function useStyletron() {
  const styletronEngine = useContext(StyletronContext);
  const debugEngine = useContext(DebugEngineContext);
  const hydrating = useContext(HydrationContext);
  checkNoopEngine(styletronEngine);
  const debugClassName = useRef("");
  const prevDebugClassNameDeps = useRef([]);
  return [function css(style) {
    const className = driver(style, styletronEngine);

    if (!(true && process.env.NODE_ENV !== "production")) {
      return className;
    }

    const {
      stack,
      message
    } = new Error("stacktrace source");
    const nextDeps = [debugEngine, hydrating];

    if (prevDebugClassNameDeps.current[0] !== nextDeps[0] || prevDebugClassNameDeps.current[1] !== nextDeps[1]) {
      if (debugEngine && !hydrating) {
        debugClassName.current = debugEngine.debug({
          stackInfo: {
            stack,
            message
          },
          stackIndex: 1
        });
      }

      prevDebugClassNameDeps.current = nextDeps;
    }

    if (debugClassName.current) {
      return `${debugClassName.current} ${className}`;
    }

    return className;
  }];
}
function createStyled({
  getInitialStyle: getInitialStyle$$1,
  driver: driver$$1,
  wrapper
}) {
  function styled(base, styleArg) {
    if (process.env.NODE_ENV !== "production") {
      if (base.__STYLETRON__) {
        /* eslint-disable no-console */
        console.warn("It appears you are passing a styled component into `styled`.");
        console.warn("For composition with existing styled components, use `withStyle` or `withTransform` instead.");
        /* eslint-enable no-console */
      }
    }

    const baseStyletron = {
      reducers: [],
      base: base,
      driver: driver$$1,
      getInitialStyle: getInitialStyle$$1,
      wrapper
    };

    if (true && process.env.NODE_ENV !== "production") {
      addDebugMetadata(baseStyletron, 2);
    }

    return createStyledElementComponent(autoComposeShallow(baseStyletron, styleArg));
  }

  return styled;
}
const styled = createStyled({
  getInitialStyle,
  driver,
  wrapper: Component$$1 => Component$$1
});
function withTransform(component, transformer) {
  const styletron = component.__STYLETRON__;

  if (true && process.env.NODE_ENV !== "production") {
    addDebugMetadata(styletron, 2);
  }

  return createStyledElementComponent(composeDynamic(styletron, transformer));
}
var withStyle = withStyleDeep;
function withStyleDeep(component, styleArg) {
  const styletron = component.__STYLETRON__;

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
  const styletron = component.__STYLETRON__;

  if (process.env.NODE_ENV !== "production") {
    if (!styletron) {
      /* eslint-disable no-console */
      console.warn("The first parameter to `withWrapper` must be a styled component (without extra wrappers).");
      /* eslint-enable no-console */
    }
  }

  const composed = {
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
  return composeDynamic(styletron, (style, props) => shallowMerge(style, styleFn(props)));
}
function dynamicComposeDeep(styletron, styleFn) {
  return composeDynamic(styletron, (style, props) => deepMerge(style, styleFn(props)));
}
function createShallowMergeReducer(style) {
  return {
    reducer: inputStyle => shallowMerge(inputStyle, style),
    assignmentCommutative: true,
    factory: createShallowMergeReducer,
    style: style
  };
}
function createDeepMergeReducer(style) {
  return {
    reducer: inputStyle => deepMerge(inputStyle, style),
    assignmentCommutative: true,
    factory: createDeepMergeReducer,
    style: style
  };
}
function composeStatic(styletron, reducerContainer) {
  if (styletron.reducers.length === 0) {
    const style = reducerContainer.reducer(styletron.getInitialStyle());
    const result = {
      reducers: styletron.reducers,
      base: styletron.base,
      driver: styletron.driver,
      wrapper: styletron.wrapper,
      getInitialStyle: () => style
    };

    if (true && process.env.NODE_ENV !== "production") {
      result.debug = styletron.debug;
    }

    return result;
  } else {
    const last = styletron.reducers[0];

    if (last.assignmentCommutative === true && reducerContainer.assignmentCommutative === true) {
      const composed = reducerContainer.reducer(last.style);
      const result = {
        getInitialStyle: styletron.getInitialStyle,
        base: styletron.base,
        driver: styletron.driver,
        wrapper: styletron.wrapper,
        reducers: [last.factory(composed)].concat(styletron.reducers.slice(1))
      };

      if (true && process.env.NODE_ENV !== "production") {
        result.debug = styletron.debug;
      }

      return result;
    }

    return composeDynamic(styletron, reducerContainer.reducer);
  }
}
function composeDynamic(styletron, reducer) {
  const composed = {
    getInitialStyle: styletron.getInitialStyle,
    base: styletron.base,
    driver: styletron.driver,
    wrapper: styletron.wrapper,
    reducers: [{
      assignmentCommutative: false,
      reducer
    }].concat(styletron.reducers)
  };

  if (true && process.env.NODE_ENV !== "production") {
    composed.debug = styletron.debug;
  }

  return composed;
}
function createStyledElementComponent(styletron) {
  const {
    reducers,
    base,
    driver: driver$$1,
    wrapper,
    getInitialStyle: getInitialStyle$$1,
    ext
  } = styletron;

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

  const StyledElement = forwardRef((props, ref) => {
    return createElement(Consumer, null, (styletron, debugEngine, hydrating) => {
      checkNoopEngine(styletron);
      const elementProps = omitPrefixedKeys(props);
      let style = resolveStyle(getInitialStyle$$1, reducers, props);

      if (props.$style) {
        if (typeof props.$style === "function") {
          style = deepMerge(style, props.$style(props));
        } else {
          style = deepMerge(style, props.$style);
        }
      }

      const styleClassString = driver$$1(style, styletron);
      const Element = props.$as ? props.$as : base;
      elementProps.className = props.className ? `${props.className} ${styleClassString}` : styleClassString;

      if (true && process.env.NODE_ENV !== "production" && debugEngine && !hydrating) {
        if (!debugClassName) {
          debugClassName = debugEngine.debug({
            stackInfo: debugStackInfo,
            stackIndex: debugStackIndex
          });
        }

        const joined = `${debugClassName} ${elementProps.className}`;
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
  const Wrapped = wrapper(StyledElement);
  Wrapped.__STYLETRON__ = {
    base,
    reducers,
    driver: driver$$1,
    wrapper,
    getInitialStyle: getInitialStyle$$1
  };

  if (process.env.NODE_ENV !== "production") {
    let displayName;

    if (typeof base === "string") {
      displayName = base;
    } else if (base.displayName) {
      displayName = base.displayName;
    } else if (base.name) {
      displayName = base.name;
    } else {
      displayName = "Unknown";
    }

    Wrapped.displayName = `Styled(${displayName})`;
  }

  return Wrapped;
} // Utility functions

function resolveStyle(getInitialStyle$$1, reducers, props) {
  let result = getInitialStyle$$1();
  let i = reducers.length;

  while (i--) {
    // Cast to allow passing unused props param in case of static reducer
    const reducer = reducers[i].reducer;
    result = reducer(result, props);
  }

  return result;
}

function isObject(x) {
  return typeof x === "object" && x !== null;
}

function omitPrefixedKeys(source) {
  const result = {};

  for (const key in source) {
    if (key[0] !== "$") {
      result[key] = source[key];
    }
  }

  return result;
}

function deepMerge(a, b) {
  const result = assign({}, a);

  for (const key in b) {
    const val = b[key];

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
  for (const key in source) {
    target[key] = source[key];
  }

  return target;
}

export { DebugEngine, Provider, DevConsumer, useStyletron, createStyled, styled, withTransform, withStyle, withStyleDeep, withWrapper, autoComposeShallow, autoComposeDeep, staticComposeShallow, staticComposeDeep, dynamicComposeShallow, dynamicComposeDeep, createShallowMergeReducer, createDeepMergeReducer, composeStatic, composeDynamic, createStyledElementComponent, resolveStyle };
//# sourceMappingURL=browser.es2017.es.js.map
