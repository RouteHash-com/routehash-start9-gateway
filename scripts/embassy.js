var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  1 ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// deno:https://deno.land/x/embassyd_sdk@v0.3.1.1.2/types.ts
var require_types = __commonJS({
  "deno:https://deno.land/x/embassyd_sdk@v0.3.1.1.2/types.ts"() {
  }
});

// deno:https://deno.land/x/ts_matches@v5.2.0/mod.ts
var mod_exports = {};
__export(mod_exports, {
  AnyParser: () => AnyParser,
  ArrayOfParser: () => ArrayOfParser,
  ArrayParser: () => ArrayParser,
  BoolParser: () => BoolParser,
  ConcatParsers: () => ConcatParsers,
  FunctionParser: () => FunctionParser,
  GuardParser: () => GuardParser,
  LiteralsParser: () => LiteralsParser,
  MappedAParser: () => MappedAParser,
  NamedParser: () => NamedParser,
  NilParser: () => NilParser,
  NumberParser: () => NumberParser,
  ObjectParser: () => ObjectParser,
  OrParsers: () => OrParsers,
  Parse: () => Parse,
  Parser: () => Parser,
  ShapeParser: () => ShapeParser,
  StringParser: () => StringParser,
  Validator: () => Parser,
  allOf: () => allOf,
  any: () => any,
  anyOf: () => anyOf,
  array: () => array,
  arrayOf: () => arrayOf,
  boolean: () => boolean,
  default: () => mod_default,
  deferred: () => deferred,
  dictionary: () => dictionary,
  every: () => every,
  guard: () => guard,
  instanceOf: () => instanceOf,
  isFunction: () => isFunction,
  literal: () => literal,
  literals: () => literals,
  matches: () => matches,
  natural: () => natural,
  nill: () => nill,
  number: () => number,
  object: () => object,
  oneOf: () => oneOf,
  parserName: () => parserName,
  partial: () => partial,
  recursive: () => recursive,
  regex: () => regex,
  saferStringify: () => saferStringify,
  shape: () => shape,
  some: () => some,
  string: () => string,
  tuple: () => tuple,
  unknown: () => unknown
});

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/utils.ts
var isObject = (x) => typeof x === "object" && x != null;
var isFunctionTest = (x) => typeof x === "function";
var isNumber = (x) => typeof x === "number";
var isString = (x) => typeof x === "string";
var booleanOnParse = {
  parsed(_) {
    return true;
  },
  invalid(_) {
    return false;
  }
};

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/guard-parser.ts
var GuardParser = class {
  checkIsA;
  typeName;
  description;
  constructor(checkIsA, typeName, description = {
    name: "Guard",
    children: [],
    extras: [
      typeName
    ]
  }) {
    this.checkIsA = checkIsA;
    this.typeName = typeName;
    this.description = description;
  }
  parse(a, onParse) {
    if (this.checkIsA(a)) {
      return onParse.parsed(a);
    }
    return onParse.invalid({
      value: a,
      keys: [],
      parser: this
    });
  }
};

// deno:https://deno.land/x/ts_matches@v5.2.0/src/utils.ts
function saferStringify(x) {
  try {
    return JSON.stringify(x);
  } catch (e) {
    return "" + x;
  }
}

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/any-parser.ts
var AnyParser = class {
  description;
  constructor(description = {
    name: "Any",
    children: [],
    extras: []
  }) {
    this.description = description;
  }
  parse(a, onParse) {
    return onParse.parsed(a);
  }
};

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/array-parser.ts
var ArrayParser = class {
  description;
  constructor(description = {
    name: "Array",
    children: [],
    extras: []
  }) {
    this.description = description;
  }
  parse(a, onParse) {
    if (Array.isArray(a)) return onParse.parsed(a);
    return onParse.invalid({
      value: a,
      keys: [],
      parser: this
    });
  }
};

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/bool-parser.ts
var BoolParser = class {
  description;
  constructor(description = {
    name: "Boolean",
    children: [],
    extras: []
  }) {
    this.description = description;
  }
  parse(a, onParse) {
    if (a === true || a === false) return onParse.parsed(a);
    return onParse.invalid({
      value: a,
      keys: [],
      parser: this
    });
  }
};

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/concat-parser.ts
var ConcatParsers = class _ConcatParsers {
  parent;
  otherParser;
  description;
  constructor(parent, otherParser, description = {
    name: "Concat",
    children: [
      parent,
      otherParser
    ],
    extras: []
  }) {
    this.parent = parent;
    this.otherParser = otherParser;
    this.description = description;
  }
  static of(parent, otherParser) {
    if (parent.unwrappedParser().description.name === "Any") {
      return otherParser;
    }
    if (otherParser.unwrappedParser().description.name === "Any") {
      return parent;
    }
    return new _ConcatParsers(parent, otherParser);
  }
  parse(a, onParse) {
    const parent = this.parent.enumParsed(a);
    if ("error" in parent) {
      return onParse.invalid(parent.error);
    }
    const other = this.otherParser.enumParsed(parent.value);
    if ("error" in other) {
      return onParse.invalid(other.error);
    }
    return onParse.parsed(other.value);
  }
};

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/default-parser.ts
var DefaultParser = class {
  parent;
  defaultValue;
  description;
  constructor(parent, defaultValue, description = {
    name: "Default",
    children: [
      parent
    ],
    extras: [
      defaultValue
    ]
  }) {
    this.parent = parent;
    this.defaultValue = defaultValue;
    this.description = description;
  }
  parse(a, onParse) {
    const parser = this;
    const defaultValue = this.defaultValue;
    if (a == null) {
      return onParse.parsed(defaultValue);
    }
    const parentCheck = this.parent.enumParsed(a);
    if ("error" in parentCheck) {
      parentCheck.error.parser = parser;
      return onParse.invalid(parentCheck.error);
    }
    return onParse.parsed(parentCheck.value);
  }
};

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/function-parser.ts
var FunctionParser = class {
  description;
  constructor(description = {
    name: "Function",
    children: [],
    extras: []
  }) {
    this.description = description;
  }
  parse(a, onParse) {
    if (isFunctionTest(a)) return onParse.parsed(a);
    return onParse.invalid({
      value: a,
      keys: [],
      parser: this
    });
  }
};

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/mapped-parser.ts
var MappedAParser = class {
  parent;
  map;
  mappingName;
  description;
  constructor(parent, map2, mappingName = map2.name, description = {
    name: "Mapped",
    children: [
      parent
    ],
    extras: [
      mappingName
    ]
  }) {
    this.parent = parent;
    this.map = map2;
    this.mappingName = mappingName;
    this.description = description;
  }
  parse(a, onParse) {
    const map2 = this.map;
    const result = this.parent.enumParsed(a);
    if ("error" in result) {
      return onParse.invalid(result.error);
    }
    return onParse.parsed(map2(result.value));
  }
};

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/maybe-parser.ts
var MaybeParser = class {
  parent;
  description;
  constructor(parent, description = {
    name: "Maybe",
    children: [
      parent
    ],
    extras: []
  }) {
    this.parent = parent;
    this.description = description;
  }
  parse(a, onParse) {
    if (a == null) {
      return onParse.parsed(null);
    }
    const parser = this;
    const parentState = this.parent.enumParsed(a);
    if ("error" in parentState) {
      const { error } = parentState;
      error.parser = parser;
      return onParse.invalid(error);
    }
    return onParse.parsed(parentState.value);
  }
};

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/named.ts
var NamedParser = class {
  parent;
  name;
  description;
  constructor(parent, name, description = {
    name: "Named",
    children: [
      parent
    ],
    extras: [
      name
    ]
  }) {
    this.parent = parent;
    this.name = name;
    this.description = description;
  }
  parse(a, onParse) {
    const parser = this;
    const parent = this.parent.enumParsed(a);
    if ("error" in parent) {
      const { error } = parent;
      error.parser = parser;
      return onParse.invalid(error);
    }
    return onParse.parsed(parent.value);
  }
};
function parserName(name, parent) {
  return new Parser(new NamedParser(parent, name));
}

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/nill-parser.ts
var NilParser = class {
  description;
  constructor(description = {
    name: "Null",
    children: [],
    extras: []
  }) {
    this.description = description;
  }
  parse(a, onParse) {
    if (a === null || a === void 0) return onParse.parsed(a);
    return onParse.invalid({
      value: a,
      keys: [],
      parser: this
    });
  }
};

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/number-parser.ts
var NumberParser = class {
  description;
  constructor(description = {
    name: "Number",
    children: [],
    extras: []
  }) {
    this.description = description;
  }
  parse(a, onParse) {
    if (isNumber(a)) return onParse.parsed(a);
    return onParse.invalid({
      value: a,
      keys: [],
      parser: this
    });
  }
};

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/object-parser.ts
var ObjectParser = class {
  description;
  constructor(description = {
    name: "Object",
    children: [],
    extras: []
  }) {
    this.description = description;
  }
  parse(a, onParse) {
    if (isObject(a)) return onParse.parsed(a);
    return onParse.invalid({
      value: a,
      keys: [],
      parser: this
    });
  }
};

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/or-parser.ts
var OrParsers = class {
  parent;
  otherParser;
  description;
  constructor(parent, otherParser, description = {
    name: "Or",
    children: [
      parent,
      otherParser
    ],
    extras: []
  }) {
    this.parent = parent;
    this.otherParser = otherParser;
    this.description = description;
  }
  parse(a, onParse) {
    const parser = this;
    const parent = this.parent.enumParsed(a);
    if ("value" in parent) {
      return onParse.parsed(parent.value);
    }
    const other = this.otherParser.enumParsed(a);
    if ("error" in other) {
      const { error } = other;
      error.parser = parser;
      return onParse.invalid(error);
    }
    return onParse.parsed(other.value);
  }
};

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/shape-parser.ts
var ShapeParser = class {
  parserMap;
  isPartial;
  parserKeys;
  description;
  constructor(parserMap, isPartial2, parserKeys = Object.keys(parserMap), description = {
    name: isPartial2 ? "Partial" : "Shape",
    children: parserKeys.map((key) => parserMap[key]),
    extras: parserKeys
  }) {
    this.parserMap = parserMap;
    this.isPartial = isPartial2;
    this.parserKeys = parserKeys;
    this.description = description;
  }
  parse(a, onParse) {
    const parser = this;
    if (!object.test(a)) {
      return onParse.invalid({
        value: a,
        keys: [],
        parser
      });
    }
    const { parserMap, isPartial: isPartial2 } = this;
    const value = {
      ...a
    };
    if (Array.isArray(a)) {
      value.length = a.length;
    }
    for (const key in parserMap) {
      if (key in value) {
        const parser2 = parserMap[key];
        const state = parser2.enumParsed(a[key]);
        if ("error" in state) {
          const { error } = state;
          error.keys.push(saferStringify(key));
          return onParse.invalid(error);
        }
        const smallValue = state.value;
        value[key] = smallValue;
      } else if (!isPartial2) {
        return onParse.invalid({
          value: "missingProperty",
          parser,
          keys: [
            saferStringify(key)
          ]
        });
      }
    }
    return onParse.parsed(value);
  }
};
var isPartial = (testShape) => {
  return new Parser(new ShapeParser(testShape, true));
};
var partial = isPartial;
var isShape = (testShape) => {
  return new Parser(new ShapeParser(testShape, false));
};
function shape(testShape, optionals, optionalAndDefaults) {
  if (optionals) {
    const defaults = optionalAndDefaults || {};
    const entries = Object.entries(testShape);
    const optionalSet = new Set(Array.from(optionals));
    return every(partial(Object.fromEntries(entries.filter(([key, _]) => optionalSet.has(key)).map(([key, parser]) => [
      key,
      parser.optional()
    ]))), isShape(Object.fromEntries(entries.filter(([key, _]) => !optionalSet.has(key))))).map((ret) => {
      for (const key of optionalSet) {
        const keyAny = key;
        if (!(keyAny in ret) && keyAny in defaults) {
          ret[keyAny] = defaults[keyAny];
        }
      }
      return ret;
    });
  }
  return isShape(testShape);
}

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/string-parser.ts
var StringParser = class {
  description;
  constructor(description = {
    name: "String",
    children: [],
    extras: []
  }) {
    this.description = description;
  }
  parse(a, onParse) {
    if (isString(a)) return onParse.parsed(a);
    return onParse.invalid({
      value: a,
      keys: [],
      parser: this
    });
  }
};

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/parser.ts
function unwrapParser(a) {
  if (a instanceof Parser) return unwrapParser(a.parser);
  return a;
}
var enumParsed = {
  parsed(value) {
    return {
      value
    };
  },
  invalid(error) {
    return {
      error
    };
  }
};
var Parser = class _Parser {
  parser;
  description;
  /// This is a hack to get the type of what the parser is going to return.
  _TYPE;
  constructor(parser, description = {
    name: "Wrapper",
    children: [
      parser
    ],
    extras: []
  }) {
    this.parser = parser;
    this.description = description;
    this._TYPE = null;
    this.test = (value) => {
      return this.parse(value, booleanOnParse);
    };
  }
  /**
   * Use this when you want to decide what happens on the succes and failure cases of parsing
   * @param a
   * @param onParse
   * @returns
   */
  parse(a, onParse) {
    return this.parser.parse(a, onParse);
  }
  /**
   * This is a constructor helper that can use a predicate tester in the form of a guard function,
   * and will return a parser that will only parse if the predicate returns true.
   * https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types
   * @param checkIsA
   * @param name
   * @returns
   */
  static isA(checkIsA, name) {
    return new _Parser(new GuardParser(checkIsA, name));
  }
  /**
   * This is the line of code that could be over written if
   * One would like to have a custom error as any shape
   */
  static validatorErrorAsString = (error) => {
    const { parser, value, keys } = error;
    const keysString = !keys.length ? "" : keys.map((x) => `[${x}]`).reverse().join("");
    return `${keysString}${_Parser.parserAsString(parser)}(${saferStringify(value)})`;
  };
  /**
   * Trying to convert the parser into a string representation
   * @param parserComingIn
   * @returns
   */
  static parserAsString(parserComingIn) {
    const parser = unwrapParser(parserComingIn);
    const { description: { name, extras, children } } = parser;
    if (parser instanceof ShapeParser) {
      return `${name}<{${parser.description.children.map((subParser, i) => `${String(parser.description.extras[i]) || "?"}:${_Parser.parserAsString(subParser)}`).join(",")}}>`;
    }
    if (parser instanceof OrParsers) {
      const parent = unwrapParser(parser.parent);
      const parentString = _Parser.parserAsString(parent);
      if (parent instanceof OrParsers) return parentString;
      return `${name}<${parentString},...>`;
    }
    if (parser instanceof GuardParser) {
      return String(extras[0] || name);
    }
    if (parser instanceof StringParser || parser instanceof ObjectParser || parser instanceof NumberParser || parser instanceof BoolParser || parser instanceof AnyParser) {
      return name.toLowerCase();
    }
    if (parser instanceof FunctionParser) {
      return name;
    }
    if (parser instanceof NilParser) {
      return "null";
    }
    if (parser instanceof ArrayParser) {
      return "Array<unknown>";
    }
    const specifiers = [
      ...extras.map(saferStringify),
      ...children.map(_Parser.parserAsString)
    ];
    const specifiersString = `<${specifiers.join(",")}>`;
    const childrenString = !children.length ? "" : `<>`;
    return `${name}${specifiersString}`;
  }
  /**
   * This is the most useful parser, it assumes the happy path and will throw an error if it fails.
   * @param value
   * @returns
   */
  unsafeCast(value) {
    const state = this.enumParsed(value);
    if ("value" in state) return state.value;
    const { error } = state;
    throw new TypeError(`Failed type: ${_Parser.validatorErrorAsString(error)} given input ${saferStringify(value)}`);
  }
  /**
   * This is the like the unsafe parser, it assumes the happy path and will throw and return a failed promise during failure.
   * @param value
   * @returns
   */
  castPromise(value) {
    const state = this.enumParsed(value);
    if ("value" in state) return Promise.resolve(state.value);
    const { error } = state;
    return Promise.reject(new TypeError(`Failed type: ${_Parser.validatorErrorAsString(error)} given input ${saferStringify(value)}`));
  }
  /**
   * When we want to get the error message from the input, to know what is wrong
   * @param input
   * @returns Null if there is no error
   */
  errorMessage(input) {
    const parsed = this.parse(input, enumParsed);
    if ("value" in parsed) return;
    return _Parser.validatorErrorAsString(parsed.error);
  }
  /**
   * Use this that we want to do transformations after the value is valid and parsed.
   * A use case would be parsing a string, making sure it can be parsed to a number, and then convert to a number
   * @param fn
   * @param mappingName
   * @returns
   */
  map(fn, mappingName) {
    return new _Parser(new MappedAParser(this, fn, mappingName));
  }
  /**
   * Use this when you want to combine two parsers into one. This will make sure that both parsers will run against the same value.
   * @param otherParser
   * @returns
   */
  concat(otherParser) {
    return new _Parser(ConcatParsers.of(this, new _Parser(otherParser)));
  }
  /**
   * Use this to combine parsers into one. This will make sure that one or the other parsers will run against the value.
   * @param otherParser
   * @returns
   */
  orParser(otherParser) {
    return new _Parser(new OrParsers(this, new _Parser(otherParser)));
  }
  test;
  /**
   * When we want to make sure that we handle the null later on in a monoid fashion,
   * and this ensures we deal with the value
   * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#optional-chaining
   */
  optional(name) {
    return new _Parser(new MaybeParser(this));
  }
  /**
   * There are times that we would like to bring in a value that we know as null or undefined
   * and want it to go to a default value
   */
  defaultTo(defaultValue) {
    return new _Parser(new DefaultParser(new _Parser(new MaybeParser(this)), defaultValue));
  }
  /**
   * We want to test value with a test eg isEven
   */
  validate(isValid, otherName) {
    return new _Parser(ConcatParsers.of(this, new _Parser(new GuardParser(isValid, otherName))));
  }
  /**
   * We want to refine to a new type given an original type, like isEven, or casting to a more
   * specific type
   */
  refine(refinementTest, otherName = refinementTest.name) {
    return new _Parser(ConcatParsers.of(this, new _Parser(new GuardParser(refinementTest, otherName))));
  }
  /**
   * Use this when we want to give the parser a name, and we want to be able to use the name in the error messages.
   * @param nameString
   * @returns
   */
  name(nameString) {
    return parserName(nameString, this);
  }
  /**
   * This is another type of parsing that will return a value that is a discriminated union of the success and failure cases.
   * https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions
   * @param value
   * @returns
   */
  enumParsed(value) {
    return this.parse(value, enumParsed);
  }
  /**
   * Return the unwrapped parser/ IParser
   * @returns
   */
  unwrappedParser() {
    let answer = this;
    while (true) {
      const next = answer.parser;
      if (next instanceof _Parser) {
        answer = next;
      } else {
        return next;
      }
    }
  }
};

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/unknown-parser.ts
var UnknownParser = class {
  description;
  constructor(description = {
    name: "Unknown",
    children: [],
    extras: []
  }) {
    this.description = description;
  }
  parse(a, onParse) {
    return onParse.parsed(a);
  }
};

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/simple-parsers.ts
function guard(test, testName) {
  return Parser.isA(test, testName || test.name);
}
var any = new Parser(new AnyParser());
var unknown = new Parser(new UnknownParser());
var number = new Parser(new NumberParser());
var isNill = new Parser(new NilParser());
var natural = number.refine((x) => x >= 0 && x === Math.floor(x));
var isFunction = new Parser(new FunctionParser());
var boolean = new Parser(new BoolParser());
var object = new Parser(new ObjectParser());
var isArray = new Parser(new ArrayParser());
var string = new Parser(new StringParser());
var instanceOf = (classCreator) => guard((x) => x instanceof classCreator, `is${classCreator.name}`);
var regex = (tester) => string.refine(function(x) {
  return tester.test(x);
}, tester.toString());

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/some-parser.ts
function some(...parsers) {
  if (parsers.length <= 0) {
    return any;
  }
  const first = parsers.splice(0, 1)[0];
  return parsers.reduce((left, right) => left.orParser(right), first);
}

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/every-parser.ts
function every(...parsers) {
  const filteredParsers = parsers.filter((x) => x !== any);
  if (filteredParsers.length <= 0) {
    return any;
  }
  const first = filteredParsers.splice(0, 1)[0];
  return filteredParsers.reduce((left, right) => {
    return left.concat(right);
  }, first);
}

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/dictionary-parser.ts
var DictionaryParser = class {
  parsers;
  description;
  constructor(parsers, description = {
    name: "Dictionary",
    children: parsers.reduce((acc, [k, v]) => {
      acc.push(k, v);
      return acc;
    }, []),
    extras: []
  }) {
    this.parsers = parsers;
    this.description = description;
  }
  parse(a, onParse) {
    const { parsers } = this;
    const parser = this;
    const answer = {
      ...a
    };
    outer: for (const key in a) {
      let parseError = [];
      for (const [keyParser, valueParser] of parsers) {
        const enumState = keyParser.enumParsed(key);
        if ("error" in enumState) {
          const { error: error2 } = enumState;
          error2.parser = parser;
          error2.keys.push("" + key);
          parseError.push(error2);
          continue;
        }
        const newKey = enumState.value;
        const valueState = valueParser.enumParsed(a[key]);
        if ("error" in valueState) {
          const { error: error2 } = valueState;
          error2.keys.push("" + newKey);
          parseError.unshift(error2);
          continue;
        }
        delete answer[key];
        answer[newKey] = valueState.value;
        break outer;
      }
      const error = parseError[0];
      if (!!error) {
        return onParse.invalid(error);
      }
    }
    return onParse.parsed(answer);
  }
};
var dictionary = (...parsers) => {
  return object.concat(new DictionaryParser([
    ...parsers
  ]));
};

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/tuple-parser.ts
var TupleParser = class {
  parsers;
  lengthMatcher;
  description;
  constructor(parsers, lengthMatcher = literal(parsers.length), description = {
    name: "Tuple",
    children: parsers,
    extras: []
  }) {
    this.parsers = parsers;
    this.lengthMatcher = lengthMatcher;
    this.description = description;
  }
  parse(input, onParse) {
    const tupleError = isArray.enumParsed(input);
    if ("error" in tupleError) return onParse.invalid(tupleError.error);
    const values = input;
    const stateCheck = this.lengthMatcher.enumParsed(values.length);
    if ("error" in stateCheck) {
      stateCheck.error.keys.push(saferStringify("length"));
      return onParse.invalid(stateCheck.error);
    }
    const answer = new Array(this.parsers.length);
    for (const key in this.parsers) {
      const parser = this.parsers[key];
      const value = values[key];
      const result = parser.enumParsed(value);
      if ("error" in result) {
        const { error } = result;
        error.keys.push(saferStringify(key));
        return onParse.invalid(error);
      }
      answer[key] = result.value;
    }
    return onParse.parsed(answer);
  }
};
function tuple(...parsers) {
  return new Parser(new TupleParser(parsers));
}

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/array-of-parser.ts
var ArrayOfParser = class {
  parser;
  description;
  constructor(parser, description = {
    name: "ArrayOf",
    children: [
      parser
    ],
    extras: []
  }) {
    this.parser = parser;
    this.description = description;
  }
  parse(a, onParse) {
    if (!Array.isArray(a)) {
      return onParse.invalid({
        value: a,
        keys: [],
        parser: this
      });
    }
    const values = [
      ...a
    ];
    for (let index = 0; index < values.length; index++) {
      const result = this.parser.enumParsed(values[index]);
      if ("error" in result) {
        result.error.keys.push("" + index);
        return onParse.invalid(result.error);
      } else {
        values[index] = result.value;
      }
    }
    return onParse.parsed(values);
  }
};
function arrayOf(validator) {
  return new Parser(new ArrayOfParser(validator));
}

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/literal-parser.ts
var LiteralsParser = class {
  values;
  description;
  constructor(values, description = {
    name: "Literal",
    children: [],
    extras: values
  }) {
    this.values = values;
    this.description = description;
  }
  parse(a, onParse) {
    if (this.values.indexOf(a) >= 0) {
      return onParse.parsed(a);
    }
    return onParse.invalid({
      value: a,
      keys: [],
      parser: this
    });
  }
};
function literal(isEqualToValue) {
  return new Parser(new LiteralsParser([
    isEqualToValue
  ]));
}
function literals(firstValue, ...restValues) {
  return new Parser(new LiteralsParser([
    firstValue,
    ...restValues
  ]));
}

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/recursive-parser.ts
var RecursiveParser = class _RecursiveParser {
  recursive;
  description;
  parser;
  static create(fn) {
    const parser = new _RecursiveParser(fn);
    parser.parser = fn(new Parser(parser));
    return parser;
  }
  constructor(recursive2, description = {
    name: "Recursive",
    children: [],
    extras: [
      recursive2
    ]
  }) {
    this.recursive = recursive2;
    this.description = description;
  }
  parse(a, onParse) {
    if (!this.parser) {
      return onParse.invalid({
        value: "Recursive Invalid State",
        keys: [],
        parser: this
      });
    }
    return this.parser.parse(a, onParse);
  }
};
function recursive(fn) {
  let value = fn(any);
  const created = RecursiveParser.create(fn);
  return new Parser(created);
}

// deno:https://deno.land/x/ts_matches@v5.2.0/src/parsers/deferred-parser.ts
var DeferredParser = class _DeferredParser {
  description;
  parser;
  static create() {
    return new _DeferredParser();
  }
  constructor(description = {
    name: "Deferred",
    children: [],
    extras: []
  }) {
    this.description = description;
  }
  setParser(parser) {
    this.parser = new Parser(parser);
    return this;
  }
  parse(a, onParse) {
    if (!this.parser) {
      return onParse.invalid({
        value: "Not Set Up",
        keys: [],
        parser: this
      });
    }
    return this.parser.parse(a, onParse);
  }
};
function deferred() {
  const deferred2 = DeferredParser.create();
  function setParser(parser) {
    deferred2.setParser(parser);
  }
  return [
    new Parser(deferred2),
    setParser
  ];
}

// deno:https://deno.land/x/ts_matches@v5.2.0/src/matches.ts
var Matched = class {
  value;
  constructor(value) {
    this.value = value;
  }
  when(..._args) {
    return this;
  }
  defaultTo(_defaultValue) {
    return this.value;
  }
  defaultToLazy(_getValue) {
    return this.value;
  }
  unwrap() {
    return this.value;
  }
};
var MatchMore = class {
  a;
  constructor(a) {
    this.a = a;
  }
  when(...args) {
    const [outcome, ...matchers] = args.reverse();
    const me = this;
    const parser = matches.some(...matchers.map((matcher) => matcher instanceof Parser ? matcher : literal(matcher)));
    const result = parser.enumParsed(this.a);
    if ("error" in result) {
      return me;
    }
    const { value } = result;
    if (outcome instanceof Function) {
      return new Matched(outcome(value));
    }
    return new Matched(outcome);
  }
  defaultTo(value) {
    return value;
  }
  defaultToLazy(getValue) {
    return getValue();
  }
  unwrap() {
    throw new Error("Expecting that value is matched");
  }
};
var matches = Object.assign(function matchesFn(value) {
  return new MatchMore(value);
}, {
  array: isArray,
  arrayOf,
  some,
  tuple,
  regex,
  number,
  natural,
  isFunction,
  object,
  string,
  shape,
  partial,
  literal,
  every,
  guard,
  unknown,
  any,
  boolean,
  dictionary,
  literals,
  nill: isNill,
  instanceOf,
  Parse: Parser,
  parserName,
  recursive,
  deferred
});
var array = isArray;
var nill = isNill;
var Parse = Parser;
var oneOf = some;
var anyOf = some;
var allOf = every;
var matches_default = matches;

// deno:https://deno.land/x/ts_matches@v5.2.0/mod.ts
var mod_default = matches_default;

// deno:https://deno.land/std@0.140.0/encoding/yaml.ts
var yaml_exports = {};
__export(yaml_exports, {
  CORE_SCHEMA: () => core,
  DEFAULT_SCHEMA: () => def,
  EXTENDED_SCHEMA: () => extended,
  FAILSAFE_SCHEMA: () => failsafe,
  JSON_SCHEMA: () => json,
  Type: () => Type,
  parse: () => parse,
  parseAll: () => parseAll,
  stringify: () => stringify
});

// deno:https://deno.land/std@0.140.0/encoding/_yaml/error.ts
var YAMLError = class extends Error {
  mark;
  constructor(message = "(unknown reason)", mark = "") {
    super(`${message} ${mark}`), this.mark = mark;
    this.name = this.constructor.name;
  }
  toString(_compact) {
    return `${this.name}: ${this.message} ${this.mark}`;
  }
};

// deno:https://deno.land/std@0.140.0/encoding/_yaml/utils.ts
function isBoolean(value) {
  return typeof value === "boolean" || value instanceof Boolean;
}
function isObject2(value) {
  return value !== null && typeof value === "object";
}
function repeat(str2, count) {
  let result = "";
  for (let cycle = 0; cycle < count; cycle++) {
    result += str2;
  }
  return result;
}
function isNegativeZero(i) {
  return i === 0 && Number.NEGATIVE_INFINITY === 1 / i;
}

// deno:https://deno.land/std@0.140.0/encoding/_yaml/mark.ts
var Mark = class {
  name;
  buffer;
  position;
  line;
  column;
  constructor(name, buffer, position, line, column) {
    this.name = name;
    this.buffer = buffer;
    this.position = position;
    this.line = line;
    this.column = column;
  }
  getSnippet(indent = 4, maxLength = 75) {
    if (!this.buffer) return null;
    let head = "";
    let start = this.position;
    while (start > 0 && "\0\r\n\x85\u2028\u2029".indexOf(this.buffer.charAt(start - 1)) === -1) {
      start -= 1;
      if (this.position - start > maxLength / 2 - 1) {
        head = " ... ";
        start += 5;
        break;
      }
    }
    let tail = "";
    let end = this.position;
    while (end < this.buffer.length && "\0\r\n\x85\u2028\u2029".indexOf(this.buffer.charAt(end)) === -1) {
      end += 1;
      if (end - this.position > maxLength / 2 - 1) {
        tail = " ... ";
        end -= 5;
        break;
      }
    }
    const snippet = this.buffer.slice(start, end);
    return `${repeat(" ", indent)}${head}${snippet}${tail}
${repeat(" ", indent + this.position - start + head.length)}^`;
  }
  toString(compact) {
    let snippet, where = "";
    if (this.name) {
      where += `in "${this.name}" `;
    }
    where += `at line ${this.line + 1}, column ${this.column + 1}`;
    if (!compact) {
      snippet = this.getSnippet();
      if (snippet) {
        where += `:
${snippet}`;
      }
    }
    return where;
  }
};

// deno:https://deno.land/std@0.140.0/encoding/_yaml/schema.ts
function compileList(schema, name, result) {
  const exclude = [];
  for (const includedSchema of schema.include) {
    result = compileList(includedSchema, name, result);
  }
  for (const currentType of schema[name]) {
    for (let previousIndex = 0; previousIndex < result.length; previousIndex++) {
      const previousType = result[previousIndex];
      if (previousType.tag === currentType.tag && previousType.kind === currentType.kind) {
        exclude.push(previousIndex);
      }
    }
    result.push(currentType);
  }
  return result.filter((_type, index) => !exclude.includes(index));
}
function compileMap(...typesList) {
  const result = {
    fallback: {},
    mapping: {},
    scalar: {},
    sequence: {}
  };
  for (const types2 of typesList) {
    for (const type of types2) {
      if (type.kind !== null) {
        result[type.kind][type.tag] = result["fallback"][type.tag] = type;
      }
    }
  }
  return result;
}
var Schema = class _Schema {
  static SCHEMA_DEFAULT;
  implicit;
  explicit;
  include;
  compiledImplicit;
  compiledExplicit;
  compiledTypeMap;
  constructor(definition) {
    this.explicit = definition.explicit || [];
    this.implicit = definition.implicit || [];
    this.include = definition.include || [];
    for (const type of this.implicit) {
      if (type.loadKind && type.loadKind !== "scalar") {
        throw new YAMLError("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
      }
    }
    this.compiledImplicit = compileList(this, "implicit", []);
    this.compiledExplicit = compileList(this, "explicit", []);
    this.compiledTypeMap = compileMap(this.compiledImplicit, this.compiledExplicit);
  }
  /* Returns a new extended schema from current schema */
  extend(definition) {
    return new _Schema({
      implicit: [
        .../* @__PURE__ */ new Set([
          ...this.implicit,
          ...definition?.implicit ?? []
        ])
      ],
      explicit: [
        .../* @__PURE__ */ new Set([
          ...this.explicit,
          ...definition?.explicit ?? []
        ])
      ],
      include: [
        .../* @__PURE__ */ new Set([
          ...this.include,
          ...definition?.include ?? []
        ])
      ]
    });
  }
  static create() {
  }
};

// deno:https://deno.land/std@0.140.0/encoding/_yaml/type.ts
var DEFAULT_RESOLVE = () => true;
var DEFAULT_CONSTRUCT = (data) => data;
function checkTagFormat(tag) {
  return tag;
}
var Type = class {
  tag;
  kind = null;
  instanceOf;
  predicate;
  represent;
  defaultStyle;
  styleAliases;
  loadKind;
  constructor(tag, options) {
    this.tag = checkTagFormat(tag);
    if (options) {
      this.kind = options.kind;
      this.resolve = options.resolve || DEFAULT_RESOLVE;
      this.construct = options.construct || DEFAULT_CONSTRUCT;
      this.instanceOf = options.instanceOf;
      this.predicate = options.predicate;
      this.represent = options.represent;
      this.defaultStyle = options.defaultStyle;
      this.styleAliases = options.styleAliases;
    }
  }
  resolve = () => true;
  construct = (data) => data;
};

// deno:https://deno.land/std@0.140.0/_util/assert.ts
var DenoStdInternalError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "DenoStdInternalError";
  }
};
function assert(expr, msg = "") {
  if (!expr) {
    throw new DenoStdInternalError(msg);
  }
}

// deno:https://deno.land/std@0.140.0/bytes/mod.ts
function copy(src, dst, off = 0) {
  off = Math.max(0, Math.min(off, dst.byteLength));
  const dstBytesAvailable = dst.byteLength - off;
  if (src.byteLength > dstBytesAvailable) {
    src = src.subarray(0, dstBytesAvailable);
  }
  dst.set(src, off);
  return src.byteLength;
}

// deno:https://deno.land/std@0.140.0/io/buffer.ts
var MIN_READ = 32 * 1024;
var MAX_SIZE = 2 ** 32 - 2;
var Buffer2 = class {
  #buf;
  #off = 0;
  constructor(ab) {
    this.#buf = ab === void 0 ? new Uint8Array(0) : new Uint8Array(ab);
  }
  /** Returns a slice holding the unread portion of the buffer.
   *
   * The slice is valid for use only until the next buffer modification (that
   * is, only until the next call to a method like `read()`, `write()`,
   * `reset()`, or `truncate()`). If `options.copy` is false the slice aliases the buffer content at
   * least until the next buffer modification, so immediate changes to the
   * slice will affect the result of future reads.
   * @param options Defaults to `{ copy: true }`
   */
  bytes(options = {
    copy: true
  }) {
    if (options.copy === false) return this.#buf.subarray(this.#off);
    return this.#buf.slice(this.#off);
  }
  /** Returns whether the unread portion of the buffer is empty. */
  empty() {
    return this.#buf.byteLength <= this.#off;
  }
  /** A read only number of bytes of the unread portion of the buffer. */
  get length() {
    return this.#buf.byteLength - this.#off;
  }
  /** The read only capacity of the buffer's underlying byte slice, that is,
   * the total space allocated for the buffer's data. */
  get capacity() {
    return this.#buf.buffer.byteLength;
  }
  /** Discards all but the first `n` unread bytes from the buffer but
   * continues to use the same allocated storage. It throws if `n` is
   * negative or greater than the length of the buffer. */
  truncate(n) {
    if (n === 0) {
      this.reset();
      return;
    }
    if (n < 0 || n > this.length) {
      throw Error("bytes.Buffer: truncation out of range");
    }
    this.#reslice(this.#off + n);
  }
  reset() {
    this.#reslice(0);
    this.#off = 0;
  }
  #tryGrowByReslice(n) {
    const l = this.#buf.byteLength;
    if (n <= this.capacity - l) {
      this.#reslice(l + n);
      return l;
    }
    return -1;
  }
  #reslice(len) {
    assert(len <= this.#buf.buffer.byteLength);
    this.#buf = new Uint8Array(this.#buf.buffer, 0, len);
  }
  /** Reads the next `p.length` bytes from the buffer or until the buffer is
   * drained. Returns the number of bytes read. If the buffer has no data to
   * return, the return is EOF (`null`). */
  readSync(p) {
    if (this.empty()) {
      this.reset();
      if (p.byteLength === 0) {
        return 0;
      }
      return null;
    }
    const nread = copy(this.#buf.subarray(this.#off), p);
    this.#off += nread;
    return nread;
  }
  /** Reads the next `p.length` bytes from the buffer or until the buffer is
   * drained. Resolves to the number of bytes read. If the buffer has no
   * data to return, resolves to EOF (`null`).
   *
   * NOTE: This methods reads bytes synchronously; it's provided for
   * compatibility with `Reader` interfaces.
   */
  read(p) {
    const rr = this.readSync(p);
    return Promise.resolve(rr);
  }
  writeSync(p) {
    const m = this.#grow(p.byteLength);
    return copy(p, this.#buf, m);
  }
  /** NOTE: This methods writes bytes synchronously; it's provided for
   * compatibility with `Writer` interface. */
  write(p) {
    const n = this.writeSync(p);
    return Promise.resolve(n);
  }
  #grow(n) {
    const m = this.length;
    if (m === 0 && this.#off !== 0) {
      this.reset();
    }
    const i = this.#tryGrowByReslice(n);
    if (i >= 0) {
      return i;
    }
    const c = this.capacity;
    if (n <= Math.floor(c / 2) - m) {
      copy(this.#buf.subarray(this.#off), this.#buf);
    } else if (c + n > MAX_SIZE) {
      throw new Error("The buffer cannot be grown beyond the maximum size.");
    } else {
      const buf = new Uint8Array(Math.min(2 * c + n, MAX_SIZE));
      copy(this.#buf.subarray(this.#off), buf);
      this.#buf = buf;
    }
    this.#off = 0;
    this.#reslice(Math.min(m + n, MAX_SIZE));
    return m;
  }
  /** Grows the buffer's capacity, if necessary, to guarantee space for
   * another `n` bytes. After `.grow(n)`, at least `n` bytes can be written to
   * the buffer without another allocation. If `n` is negative, `.grow()` will
   * throw. If the buffer can't grow it will throw an error.
   *
   * Based on Go Lang's
   * [Buffer.Grow](https://golang.org/pkg/bytes/#Buffer.Grow). */
  grow(n) {
    if (n < 0) {
      throw Error("Buffer.grow: negative count");
    }
    const m = this.#grow(n);
    this.#reslice(m);
  }
  /** Reads data from `r` until EOF (`null`) and appends it to the buffer,
   * growing the buffer as needed. It resolves to the number of bytes read.
   * If the buffer becomes too large, `.readFrom()` will reject with an error.
   *
   * Based on Go Lang's
   * [Buffer.ReadFrom](https://golang.org/pkg/bytes/#Buffer.ReadFrom). */
  async readFrom(r) {
    let n = 0;
    const tmp = new Uint8Array(MIN_READ);
    while (true) {
      const shouldGrow = this.capacity - this.length < MIN_READ;
      const buf = shouldGrow ? tmp : new Uint8Array(this.#buf.buffer, this.length);
      const nread = await r.read(buf);
      if (nread === null) {
        return n;
      }
      if (shouldGrow) this.writeSync(buf.subarray(0, nread));
      else this.#reslice(this.length + nread);
      n += nread;
    }
  }
  /** Reads data from `r` until EOF (`null`) and appends it to the buffer,
   * growing the buffer as needed. It returns the number of bytes read. If the
   * buffer becomes too large, `.readFromSync()` will throw an error.
   *
   * Based on Go Lang's
   * [Buffer.ReadFrom](https://golang.org/pkg/bytes/#Buffer.ReadFrom). */
  readFromSync(r) {
    let n = 0;
    const tmp = new Uint8Array(MIN_READ);
    while (true) {
      const shouldGrow = this.capacity - this.length < MIN_READ;
      const buf = shouldGrow ? tmp : new Uint8Array(this.#buf.buffer, this.length);
      const nread = r.readSync(buf);
      if (nread === null) {
        return n;
      }
      if (shouldGrow) this.writeSync(buf.subarray(0, nread));
      else this.#reslice(this.length + nread);
      n += nread;
    }
  }
};
var CR = "\r".charCodeAt(0);
var LF = "\n".charCodeAt(0);

// deno:https://deno.land/std@0.140.0/encoding/_yaml/type/binary.ts
var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
function resolveYamlBinary(data) {
  if (data === null) return false;
  let code;
  let bitlen = 0;
  const max = data.length;
  const map2 = BASE64_MAP;
  for (let idx = 0; idx < max; idx++) {
    code = map2.indexOf(data.charAt(idx));
    if (code > 64) continue;
    if (code < 0) return false;
    bitlen += 6;
  }
  return bitlen % 8 === 0;
}
function constructYamlBinary(data) {
  const input = data.replace(/[\r\n=]/g, "");
  const max = input.length;
  const map2 = BASE64_MAP;
  const result = [];
  let bits = 0;
  for (let idx = 0; idx < max; idx++) {
    if (idx % 4 === 0 && idx) {
      result.push(bits >> 16 & 255);
      result.push(bits >> 8 & 255);
      result.push(bits & 255);
    }
    bits = bits << 6 | map2.indexOf(input.charAt(idx));
  }
  const tailbits = max % 4 * 6;
  if (tailbits === 0) {
    result.push(bits >> 16 & 255);
    result.push(bits >> 8 & 255);
    result.push(bits & 255);
  } else if (tailbits === 18) {
    result.push(bits >> 10 & 255);
    result.push(bits >> 2 & 255);
  } else if (tailbits === 12) {
    result.push(bits >> 4 & 255);
  }
  return new Buffer2(new Uint8Array(result));
}
function representYamlBinary(object2) {
  const max = object2.length;
  const map2 = BASE64_MAP;
  let result = "";
  let bits = 0;
  for (let idx = 0; idx < max; idx++) {
    if (idx % 3 === 0 && idx) {
      result += map2[bits >> 18 & 63];
      result += map2[bits >> 12 & 63];
      result += map2[bits >> 6 & 63];
      result += map2[bits & 63];
    }
    bits = (bits << 8) + object2[idx];
  }
  const tail = max % 3;
  if (tail === 0) {
    result += map2[bits >> 18 & 63];
    result += map2[bits >> 12 & 63];
    result += map2[bits >> 6 & 63];
    result += map2[bits & 63];
  } else if (tail === 2) {
    result += map2[bits >> 10 & 63];
    result += map2[bits >> 4 & 63];
    result += map2[bits << 2 & 63];
    result += map2[64];
  } else if (tail === 1) {
    result += map2[bits >> 2 & 63];
    result += map2[bits << 4 & 63];
    result += map2[64];
    result += map2[64];
  }
  return result;
}
function isBinary(obj) {
  const buf = new Buffer2();
  try {
    if (0 > buf.readFromSync(obj)) return true;
    return false;
  } catch {
    return false;
  } finally {
    buf.reset();
  }
}
var binary = new Type("tag:yaml.org,2002:binary", {
  construct: constructYamlBinary,
  kind: "scalar",
  predicate: isBinary,
  represent: representYamlBinary,
  resolve: resolveYamlBinary
});

// deno:https://deno.land/std@0.140.0/encoding/_yaml/type/bool.ts
function resolveYamlBoolean(data) {
  const max = data.length;
  return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
}
function constructYamlBoolean(data) {
  return data === "true" || data === "True" || data === "TRUE";
}
var bool = new Type("tag:yaml.org,2002:bool", {
  construct: constructYamlBoolean,
  defaultStyle: "lowercase",
  kind: "scalar",
  predicate: isBoolean,
  represent: {
    lowercase(object2) {
      return object2 ? "true" : "false";
    },
    uppercase(object2) {
      return object2 ? "TRUE" : "FALSE";
    },
    camelcase(object2) {
      return object2 ? "True" : "False";
    }
  },
  resolve: resolveYamlBoolean
});

// deno:https://deno.land/std@0.140.0/encoding/_yaml/type/float.ts
var YAML_FLOAT_PATTERN = new RegExp("^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
function resolveYamlFloat(data) {
  if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  data[data.length - 1] === "_") {
    return false;
  }
  return true;
}
function constructYamlFloat(data) {
  let value = data.replace(/_/g, "").toLowerCase();
  const sign = value[0] === "-" ? -1 : 1;
  const digits = [];
  if ("+-".indexOf(value[0]) >= 0) {
    value = value.slice(1);
  }
  if (value === ".inf") {
    return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  }
  if (value === ".nan") {
    return NaN;
  }
  if (value.indexOf(":") >= 0) {
    value.split(":").forEach((v) => {
      digits.unshift(parseFloat(v));
    });
    let valueNb = 0;
    let base = 1;
    digits.forEach((d) => {
      valueNb += d * base;
      base *= 60;
    });
    return sign * valueNb;
  }
  return sign * parseFloat(value);
}
var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
function representYamlFloat(object2, style) {
  if (isNaN(object2)) {
    switch (style) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  } else if (Number.POSITIVE_INFINITY === object2) {
    switch (style) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  } else if (Number.NEGATIVE_INFINITY === object2) {
    switch (style) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  } else if (isNegativeZero(object2)) {
    return "-0.0";
  }
  const res = object2.toString(10);
  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
}
function isFloat(object2) {
  return Object.prototype.toString.call(object2) === "[object Number]" && (object2 % 1 !== 0 || isNegativeZero(object2));
}
var float = new Type("tag:yaml.org,2002:float", {
  construct: constructYamlFloat,
  defaultStyle: "lowercase",
  kind: "scalar",
  predicate: isFloat,
  represent: representYamlFloat,
  resolve: resolveYamlFloat
});

// deno:https://deno.land/std@0.140.0/encoding/_yaml/type/function.ts
function reconstructFunction(code) {
  const func2 = new Function(`return ${code}`)();
  if (!(func2 instanceof Function)) {
    throw new TypeError(`Expected function but got ${typeof func2}: ${code}`);
  }
  return func2;
}
var func = new Type("tag:yaml.org,2002:js/function", {
  kind: "scalar",
  resolve(data) {
    if (data === null) {
      return false;
    }
    try {
      reconstructFunction(`${data}`);
      return true;
    } catch (_err) {
      return false;
    }
  },
  construct(data) {
    return reconstructFunction(data);
  },
  predicate(object2) {
    return object2 instanceof Function;
  },
  represent(object2) {
    return object2.toString();
  }
});

// deno:https://deno.land/std@0.140.0/encoding/_yaml/type/int.ts
function isHexCode(c) {
  return 48 <= /* 0 */
  c && c <= 57 || 65 <= /* A */
  c && c <= 70 || 97 <= /* a */
  c && c <= 102;
}
function isOctCode(c) {
  return 48 <= /* 0 */
  c && c <= 55;
}
function isDecCode(c) {
  return 48 <= /* 0 */
  c && c <= 57;
}
function resolveYamlInteger(data) {
  const max = data.length;
  let index = 0;
  let hasDigits = false;
  if (!max) return false;
  let ch = data[index];
  if (ch === "-" || ch === "+") {
    ch = data[++index];
  }
  if (ch === "0") {
    if (index + 1 === max) return true;
    ch = data[++index];
    if (ch === "b") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_") continue;
        if (ch !== "0" && ch !== "1") return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "x") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_") continue;
        if (!isHexCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    for (; index < max; index++) {
      ch = data[index];
      if (ch === "_") continue;
      if (!isOctCode(data.charCodeAt(index))) return false;
      hasDigits = true;
    }
    return hasDigits && ch !== "_";
  }
  if (ch === "_") return false;
  for (; index < max; index++) {
    ch = data[index];
    if (ch === "_") continue;
    if (ch === ":") break;
    if (!isDecCode(data.charCodeAt(index))) {
      return false;
    }
    hasDigits = true;
  }
  if (!hasDigits || ch === "_") return false;
  if (ch !== ":") return true;
  return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
}
function constructYamlInteger(data) {
  let value = data;
  const digits = [];
  if (value.indexOf("_") !== -1) {
    value = value.replace(/_/g, "");
  }
  let sign = 1;
  let ch = value[0];
  if (ch === "-" || ch === "+") {
    if (ch === "-") sign = -1;
    value = value.slice(1);
    ch = value[0];
  }
  if (value === "0") return 0;
  if (ch === "0") {
    if (value[1] === "b") return sign * parseInt(value.slice(2), 2);
    if (value[1] === "x") return sign * parseInt(value, 16);
    return sign * parseInt(value, 8);
  }
  if (value.indexOf(":") !== -1) {
    value.split(":").forEach((v) => {
      digits.unshift(parseInt(v, 10));
    });
    let valueInt = 0;
    let base = 1;
    digits.forEach((d) => {
      valueInt += d * base;
      base *= 60;
    });
    return sign * valueInt;
  }
  return sign * parseInt(value, 10);
}
function isInteger(object2) {
  return Object.prototype.toString.call(object2) === "[object Number]" && object2 % 1 === 0 && !isNegativeZero(object2);
}
var int = new Type("tag:yaml.org,2002:int", {
  construct: constructYamlInteger,
  defaultStyle: "decimal",
  kind: "scalar",
  predicate: isInteger,
  represent: {
    binary(obj) {
      return obj >= 0 ? `0b${obj.toString(2)}` : `-0b${obj.toString(2).slice(1)}`;
    },
    octal(obj) {
      return obj >= 0 ? `0${obj.toString(8)}` : `-0${obj.toString(8).slice(1)}`;
    },
    decimal(obj) {
      return obj.toString(10);
    },
    hexadecimal(obj) {
      return obj >= 0 ? `0x${obj.toString(16).toUpperCase()}` : `-0x${obj.toString(16).toUpperCase().slice(1)}`;
    }
  },
  resolve: resolveYamlInteger,
  styleAliases: {
    binary: [
      2,
      "bin"
    ],
    decimal: [
      10,
      "dec"
    ],
    hexadecimal: [
      16,
      "hex"
    ],
    octal: [
      8,
      "oct"
    ]
  }
});

// deno:https://deno.land/std@0.140.0/encoding/_yaml/type/map.ts
var map = new Type("tag:yaml.org,2002:map", {
  construct(data) {
    return data !== null ? data : {};
  },
  kind: "mapping"
});

// deno:https://deno.land/std@0.140.0/encoding/_yaml/type/merge.ts
function resolveYamlMerge(data) {
  return data === "<<" || data === null;
}
var merge = new Type("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: resolveYamlMerge
});

// deno:https://deno.land/std@0.140.0/encoding/_yaml/type/nil.ts
function resolveYamlNull(data) {
  const max = data.length;
  return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
}
function constructYamlNull() {
  return null;
}
function isNull(object2) {
  return object2 === null;
}
var nil = new Type("tag:yaml.org,2002:null", {
  construct: constructYamlNull,
  defaultStyle: "lowercase",
  kind: "scalar",
  predicate: isNull,
  represent: {
    canonical() {
      return "~";
    },
    lowercase() {
      return "null";
    },
    uppercase() {
      return "NULL";
    },
    camelcase() {
      return "Null";
    }
  },
  resolve: resolveYamlNull
});

// deno:https://deno.land/std@0.140.0/encoding/_yaml/type/omap.ts
var { hasOwn } = Object;
var _toString = Object.prototype.toString;
function resolveYamlOmap(data) {
  const objectKeys = [];
  let pairKey = "";
  let pairHasKey = false;
  for (const pair of data) {
    pairHasKey = false;
    if (_toString.call(pair) !== "[object Object]") return false;
    for (pairKey in pair) {
      if (hasOwn(pair, pairKey)) {
        if (!pairHasKey) pairHasKey = true;
        else return false;
      }
    }
    if (!pairHasKey) return false;
    if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
    else return false;
  }
  return true;
}
function constructYamlOmap(data) {
  return data !== null ? data : [];
}
var omap = new Type("tag:yaml.org,2002:omap", {
  construct: constructYamlOmap,
  kind: "sequence",
  resolve: resolveYamlOmap
});

// deno:https://deno.land/std@0.140.0/encoding/_yaml/type/pairs.ts
var _toString2 = Object.prototype.toString;
function resolveYamlPairs(data) {
  const result = Array.from({
    length: data.length
  });
  for (let index = 0; index < data.length; index++) {
    const pair = data[index];
    if (_toString2.call(pair) !== "[object Object]") return false;
    const keys = Object.keys(pair);
    if (keys.length !== 1) return false;
    result[index] = [
      keys[0],
      pair[keys[0]]
    ];
  }
  return true;
}
function constructYamlPairs(data) {
  if (data === null) return [];
  const result = Array.from({
    length: data.length
  });
  for (let index = 0; index < data.length; index += 1) {
    const pair = data[index];
    const keys = Object.keys(pair);
    result[index] = [
      keys[0],
      pair[keys[0]]
    ];
  }
  return result;
}
var pairs = new Type("tag:yaml.org,2002:pairs", {
  construct: constructYamlPairs,
  kind: "sequence",
  resolve: resolveYamlPairs
});

// deno:https://deno.land/std@0.140.0/encoding/_yaml/type/regexp.ts
var REGEXP = /^\/(?<regexp>[\s\S]+)\/(?<modifiers>[gismuy]*)$/;
var regexp = new Type("tag:yaml.org,2002:js/regexp", {
  kind: "scalar",
  resolve(data) {
    if (data === null || !data.length) {
      return false;
    }
    const regexp2 = `${data}`;
    if (regexp2.charAt(0) === "/") {
      if (!REGEXP.test(data)) {
        return false;
      }
      const modifiers = [
        ...regexp2.match(REGEXP)?.groups?.modifiers ?? ""
      ];
      if (new Set(modifiers).size < modifiers.length) {
        return false;
      }
    }
    return true;
  },
  construct(data) {
    const { regexp: regexp2 = `${data}`, modifiers = "" } = `${data}`.match(REGEXP)?.groups ?? {};
    return new RegExp(regexp2, modifiers);
  },
  predicate(object2) {
    return object2 instanceof RegExp;
  },
  represent(object2) {
    return object2.toString();
  }
});

// deno:https://deno.land/std@0.140.0/encoding/_yaml/type/seq.ts
var seq = new Type("tag:yaml.org,2002:seq", {
  construct(data) {
    return data !== null ? data : [];
  },
  kind: "sequence"
});

// deno:https://deno.land/std@0.140.0/encoding/_yaml/type/set.ts
var { hasOwn: hasOwn2 } = Object;
function resolveYamlSet(data) {
  if (data === null) return true;
  for (const key in data) {
    if (hasOwn2(data, key)) {
      if (data[key] !== null) return false;
    }
  }
  return true;
}
function constructYamlSet(data) {
  return data !== null ? data : {};
}
var set = new Type("tag:yaml.org,2002:set", {
  construct: constructYamlSet,
  kind: "mapping",
  resolve: resolveYamlSet
});

// deno:https://deno.land/std@0.140.0/encoding/_yaml/type/str.ts
var str = new Type("tag:yaml.org,2002:str", {
  construct(data) {
    return data !== null ? data : "";
  },
  kind: "scalar"
});

// deno:https://deno.land/std@0.140.0/encoding/_yaml/type/timestamp.ts
var YAML_DATE_REGEXP = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$");
var YAML_TIMESTAMP_REGEXP = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");
function resolveYamlTimestamp(data) {
  if (data === null) return false;
  if (YAML_DATE_REGEXP.exec(data) !== null) return true;
  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
  return false;
}
function constructYamlTimestamp(data) {
  let match = YAML_DATE_REGEXP.exec(data);
  if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
  if (match === null) throw new Error("Date resolve error");
  const year = +match[1];
  const month = +match[2] - 1;
  const day = +match[3];
  if (!match[4]) {
    return new Date(Date.UTC(year, month, day));
  }
  const hour = +match[4];
  const minute = +match[5];
  const second = +match[6];
  let fraction = 0;
  if (match[7]) {
    let partFraction = match[7].slice(0, 3);
    while (partFraction.length < 3) {
      partFraction += "0";
    }
    fraction = +partFraction;
  }
  let delta = null;
  if (match[9]) {
    const tzHour = +match[10];
    const tzMinute = +(match[11] || 0);
    delta = (tzHour * 60 + tzMinute) * 6e4;
    if (match[9] === "-") delta = -delta;
  }
  const date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
  if (delta) date.setTime(date.getTime() - delta);
  return date;
}
function representYamlTimestamp(date) {
  return date.toISOString();
}
var timestamp = new Type("tag:yaml.org,2002:timestamp", {
  construct: constructYamlTimestamp,
  instanceOf: Date,
  kind: "scalar",
  represent: representYamlTimestamp,
  resolve: resolveYamlTimestamp
});

// deno:https://deno.land/std@0.140.0/encoding/_yaml/type/undefined.ts
var undefinedType = new Type("tag:yaml.org,2002:js/undefined", {
  kind: "scalar",
  resolve() {
    return true;
  },
  construct() {
    return void 0;
  },
  predicate(object2) {
    return typeof object2 === "undefined";
  },
  represent() {
    return "";
  }
});

// deno:https://deno.land/std@0.140.0/encoding/_yaml/schema/failsafe.ts
var failsafe = new Schema({
  explicit: [
    str,
    seq,
    map
  ]
});

// deno:https://deno.land/std@0.140.0/encoding/_yaml/schema/json.ts
var json = new Schema({
  implicit: [
    nil,
    bool,
    int,
    float
  ],
  include: [
    failsafe
  ]
});

// deno:https://deno.land/std@0.140.0/encoding/_yaml/schema/core.ts
var core = new Schema({
  include: [
    json
  ]
});

// deno:https://deno.land/std@0.140.0/encoding/_yaml/schema/default.ts
var def = new Schema({
  explicit: [
    binary,
    omap,
    pairs,
    set
  ],
  implicit: [
    timestamp,
    merge
  ],
  include: [
    core
  ]
});

// deno:https://deno.land/std@0.140.0/encoding/_yaml/schema/extended.ts
var extended = new Schema({
  explicit: [
    regexp,
    undefinedType
  ],
  include: [
    def
  ]
});

// deno:https://deno.land/std@0.140.0/encoding/_yaml/state.ts
var State = class {
  schema;
  constructor(schema = def) {
    this.schema = schema;
  }
};

// deno:https://deno.land/std@0.140.0/encoding/_yaml/loader/loader_state.ts
var LoaderState = class extends State {
  input;
  documents;
  length;
  lineIndent;
  lineStart;
  position;
  line;
  filename;
  onWarning;
  legacy;
  json;
  listener;
  implicitTypes;
  typeMap;
  version;
  checkLineBreaks;
  tagMap;
  anchorMap;
  tag;
  anchor;
  kind;
  result;
  constructor(input, { filename, schema, onWarning, legacy = false, json: json2 = false, listener = null }) {
    super(schema), this.input = input, this.documents = [], this.lineIndent = 0, this.lineStart = 0, this.position = 0, this.line = 0, this.result = "";
    this.filename = filename;
    this.onWarning = onWarning;
    this.legacy = legacy;
    this.json = json2;
    this.listener = listener;
    this.implicitTypes = this.schema.compiledImplicit;
    this.typeMap = this.schema.compiledTypeMap;
    this.length = input.length;
  }
};

// deno:https://deno.land/std@0.140.0/encoding/_yaml/loader/loader.ts
var { hasOwn: hasOwn3 } = Object;
var CONTEXT_FLOW_IN = 1;
var CONTEXT_FLOW_OUT = 2;
var CONTEXT_BLOCK_IN = 3;
var CONTEXT_BLOCK_OUT = 4;
var CHOMPING_CLIP = 1;
var CHOMPING_STRIP = 2;
var CHOMPING_KEEP = 3;
var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function _class(obj) {
  return Object.prototype.toString.call(obj);
}
function isEOL(c) {
  return c === 10 || /* LF */
  c === 13;
}
function isWhiteSpace(c) {
  return c === 9 || /* Tab */
  c === 32;
}
function isWsOrEol(c) {
  return c === 9 || c === 32 || c === 10 || c === 13;
}
function isFlowIndicator(c) {
  return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
}
function fromHexCode(c) {
  if (48 <= /* 0 */
  c && c <= 57) {
    return c - 48;
  }
  const lc = c | 32;
  if (97 <= /* a */
  lc && lc <= 102) {
    return lc - 97 + 10;
  }
  return -1;
}
function escapedHexLen(c) {
  if (c === 120) {
    return 2;
  }
  if (c === 117) {
    return 4;
  }
  if (c === 85) {
    return 8;
  }
  return 0;
}
function fromDecimalCode(c) {
  if (48 <= /* 0 */
  c && c <= 57) {
    return c - 48;
  }
  return -1;
}
function simpleEscapeSequence(c) {
  return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "\x85" : c === 95 ? "\xA0" : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
}
function charFromCodepoint(c) {
  if (c <= 65535) {
    return String.fromCharCode(c);
  }
  return String.fromCharCode((c - 65536 >> 10) + 55296, (c - 65536 & 1023) + 56320);
}
var simpleEscapeCheck = Array.from({
  length: 256
});
var simpleEscapeMap = Array.from({
  length: 256
});
for (let i = 0; i < 256; i++) {
  simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
  simpleEscapeMap[i] = simpleEscapeSequence(i);
}
function generateError(state, message) {
  return new YAMLError(message, new Mark(state.filename, state.input, state.position, state.line, state.position - state.lineStart));
}
function throwError(state, message) {
  throw generateError(state, message);
}
function throwWarning(state, message) {
  if (state.onWarning) {
    state.onWarning.call(null, generateError(state, message));
  }
}
var directiveHandlers = {
  YAML(state, _name, ...args) {
    if (state.version !== null) {
      return throwError(state, "duplication of %YAML directive");
    }
    if (args.length !== 1) {
      return throwError(state, "YAML directive accepts exactly one argument");
    }
    const match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
    if (match === null) {
      return throwError(state, "ill-formed argument of the YAML directive");
    }
    const major = parseInt(match[1], 10);
    const minor = parseInt(match[2], 10);
    if (major !== 1) {
      return throwError(state, "unacceptable YAML version of the document");
    }
    state.version = args[0];
    state.checkLineBreaks = minor < 2;
    if (minor !== 1 && minor !== 2) {
      return throwWarning(state, "unsupported YAML version of the document");
    }
  },
  TAG(state, _name, ...args) {
    if (args.length !== 2) {
      return throwError(state, "TAG directive accepts exactly two arguments");
    }
    const handle = args[0];
    const prefix = args[1];
    if (!PATTERN_TAG_HANDLE.test(handle)) {
      return throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
    }
    if (state.tagMap && hasOwn3(state.tagMap, handle)) {
      return throwError(state, `there is a previously declared suffix for "${handle}" tag handle`);
    }
    if (!PATTERN_TAG_URI.test(prefix)) {
      return throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
    }
    if (typeof state.tagMap === "undefined") {
      state.tagMap = {};
    }
    state.tagMap[handle] = prefix;
  }
};
function captureSegment(state, start, end, checkJson) {
  let result;
  if (start < end) {
    result = state.input.slice(start, end);
    if (checkJson) {
      for (let position = 0, length = result.length; position < length; position++) {
        const character = result.charCodeAt(position);
        if (!(character === 9 || 32 <= character && character <= 1114111)) {
          return throwError(state, "expected valid JSON character");
        }
      }
    } else if (PATTERN_NON_PRINTABLE.test(result)) {
      return throwError(state, "the stream contains non-printable characters");
    }
    state.result += result;
  }
}
function mergeMappings(state, destination, source, overridableKeys) {
  if (!isObject2(source)) {
    return throwError(state, "cannot merge mappings; the provided source object is unacceptable");
  }
  const keys = Object.keys(source);
  for (let i = 0, len = keys.length; i < len; i++) {
    const key = keys[i];
    if (!hasOwn3(destination, key)) {
      destination[key] = source[key];
      overridableKeys[key] = true;
    }
  }
}
function storeMappingPair(state, result, overridableKeys, keyTag, keyNode, valueNode, startLine, startPos) {
  if (Array.isArray(keyNode)) {
    keyNode = Array.prototype.slice.call(keyNode);
    for (let index = 0, quantity = keyNode.length; index < quantity; index++) {
      if (Array.isArray(keyNode[index])) {
        return throwError(state, "nested arrays are not supported inside keys");
      }
      if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
        keyNode[index] = "[object Object]";
      }
    }
  }
  if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
    keyNode = "[object Object]";
  }
  keyNode = String(keyNode);
  if (result === null) {
    result = {};
  }
  if (keyTag === "tag:yaml.org,2002:merge") {
    if (Array.isArray(valueNode)) {
      for (let index = 0, quantity = valueNode.length; index < quantity; index++) {
        mergeMappings(state, result, valueNode[index], overridableKeys);
      }
    } else {
      mergeMappings(state, result, valueNode, overridableKeys);
    }
  } else {
    if (!state.json && !hasOwn3(overridableKeys, keyNode) && hasOwn3(result, keyNode)) {
      state.line = startLine || state.line;
      state.position = startPos || state.position;
      return throwError(state, "duplicated mapping key");
    }
    result[keyNode] = valueNode;
    delete overridableKeys[keyNode];
  }
  return result;
}
function readLineBreak(state) {
  const ch = state.input.charCodeAt(state.position);
  if (ch === 10) {
    state.position++;
  } else if (ch === 13) {
    state.position++;
    if (state.input.charCodeAt(state.position) === 10) {
      state.position++;
    }
  } else {
    return throwError(state, "a line break is expected");
  }
  state.line += 1;
  state.lineStart = state.position;
}
function skipSeparationSpace(state, allowComments, checkIndent) {
  let lineBreaks = 0, ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    while (isWhiteSpace(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }
    if (allowComments && ch === 35) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (ch !== 10 && /* LF */
      ch !== 13 && /* CR */
      ch !== 0);
    }
    if (isEOL(ch)) {
      readLineBreak(state);
      ch = state.input.charCodeAt(state.position);
      lineBreaks++;
      state.lineIndent = 0;
      while (ch === 32) {
        state.lineIndent++;
        ch = state.input.charCodeAt(++state.position);
      }
    } else {
      break;
    }
  }
  if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
    throwWarning(state, "deficient indentation");
  }
  return lineBreaks;
}
function testDocumentSeparator(state) {
  let _position = state.position;
  let ch = state.input.charCodeAt(_position);
  if ((ch === 45 || /* - */
  ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
    _position += 3;
    ch = state.input.charCodeAt(_position);
    if (ch === 0 || isWsOrEol(ch)) {
      return true;
    }
  }
  return false;
}
function writeFoldedLines(state, count) {
  if (count === 1) {
    state.result += " ";
  } else if (count > 1) {
    state.result += repeat("\n", count - 1);
  }
}
function readPlainScalar(state, nodeIndent, withinFlowCollection) {
  const kind = state.kind;
  const result = state.result;
  let ch = state.input.charCodeAt(state.position);
  if (isWsOrEol(ch) || isFlowIndicator(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
    return false;
  }
  let following;
  if (ch === 63 || /* ? */
  ch === 45) {
    following = state.input.charCodeAt(state.position + 1);
    if (isWsOrEol(following) || withinFlowCollection && isFlowIndicator(following)) {
      return false;
    }
  }
  state.kind = "scalar";
  state.result = "";
  let captureEnd, captureStart = captureEnd = state.position;
  let hasPendingContent = false;
  let line = 0;
  while (ch !== 0) {
    if (ch === 58) {
      following = state.input.charCodeAt(state.position + 1);
      if (isWsOrEol(following) || withinFlowCollection && isFlowIndicator(following)) {
        break;
      }
    } else if (ch === 35) {
      const preceding = state.input.charCodeAt(state.position - 1);
      if (isWsOrEol(preceding)) {
        break;
      }
    } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && isFlowIndicator(ch)) {
      break;
    } else if (isEOL(ch)) {
      line = state.line;
      const lineStart = state.lineStart;
      const lineIndent = state.lineIndent;
      skipSeparationSpace(state, false, -1);
      if (state.lineIndent >= nodeIndent) {
        hasPendingContent = true;
        ch = state.input.charCodeAt(state.position);
        continue;
      } else {
        state.position = captureEnd;
        state.line = line;
        state.lineStart = lineStart;
        state.lineIndent = lineIndent;
        break;
      }
    }
    if (hasPendingContent) {
      captureSegment(state, captureStart, captureEnd, false);
      writeFoldedLines(state, state.line - line);
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
    }
    if (!isWhiteSpace(ch)) {
      captureEnd = state.position + 1;
    }
    ch = state.input.charCodeAt(++state.position);
  }
  captureSegment(state, captureStart, captureEnd, false);
  if (state.result) {
    return true;
  }
  state.kind = kind;
  state.result = result;
  return false;
}
function readSingleQuotedScalar(state, nodeIndent) {
  let ch, captureStart, captureEnd;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 39) {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  state.position++;
  captureStart = captureEnd = state.position;
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 39) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);
      if (ch === 39) {
        captureStart = state.position;
        state.position++;
        captureEnd = state.position;
      } else {
        return true;
      }
    } else if (isEOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;
    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      return throwError(state, "unexpected end of the document within a single quoted scalar");
    } else {
      state.position++;
      captureEnd = state.position;
    }
  }
  return throwError(state, "unexpected end of the stream within a single quoted scalar");
}
function readDoubleQuotedScalar(state, nodeIndent) {
  let ch = state.input.charCodeAt(state.position);
  if (ch !== 34) {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  state.position++;
  let captureEnd, captureStart = captureEnd = state.position;
  let tmp;
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 34) {
      captureSegment(state, captureStart, state.position, true);
      state.position++;
      return true;
    }
    if (ch === 92) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);
      if (isEOL(ch)) {
        skipSeparationSpace(state, false, nodeIndent);
      } else if (ch < 256 && simpleEscapeCheck[ch]) {
        state.result += simpleEscapeMap[ch];
        state.position++;
      } else if ((tmp = escapedHexLen(ch)) > 0) {
        let hexLength = tmp;
        let hexResult = 0;
        for (; hexLength > 0; hexLength--) {
          ch = state.input.charCodeAt(++state.position);
          if ((tmp = fromHexCode(ch)) >= 0) {
            hexResult = (hexResult << 4) + tmp;
          } else {
            return throwError(state, "expected hexadecimal character");
          }
        }
        state.result += charFromCodepoint(hexResult);
        state.position++;
      } else {
        return throwError(state, "unknown escape sequence");
      }
      captureStart = captureEnd = state.position;
    } else if (isEOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;
    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      return throwError(state, "unexpected end of the document within a double quoted scalar");
    } else {
      state.position++;
      captureEnd = state.position;
    }
  }
  return throwError(state, "unexpected end of the stream within a double quoted scalar");
}
function readFlowCollection(state, nodeIndent) {
  let ch = state.input.charCodeAt(state.position);
  let terminator;
  let isMapping = true;
  let result = {};
  if (ch === 91) {
    terminator = 93;
    isMapping = false;
    result = [];
  } else if (ch === 123) {
    terminator = 125;
  } else {
    return false;
  }
  if (state.anchor !== null && typeof state.anchor != "undefined" && typeof state.anchorMap != "undefined") {
    state.anchorMap[state.anchor] = result;
  }
  ch = state.input.charCodeAt(++state.position);
  const tag = state.tag, anchor = state.anchor;
  let readNext = true;
  let valueNode, keyNode, keyTag = keyNode = valueNode = null, isExplicitPair, isPair = isExplicitPair = false;
  let following = 0, line = 0;
  const overridableKeys = {};
  while (ch !== 0) {
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if (ch === terminator) {
      state.position++;
      state.tag = tag;
      state.anchor = anchor;
      state.kind = isMapping ? "mapping" : "sequence";
      state.result = result;
      return true;
    }
    if (!readNext) {
      return throwError(state, "missed comma between flow collection entries");
    }
    keyTag = keyNode = valueNode = null;
    isPair = isExplicitPair = false;
    if (ch === 63) {
      following = state.input.charCodeAt(state.position + 1);
      if (isWsOrEol(following)) {
        isPair = isExplicitPair = true;
        state.position++;
        skipSeparationSpace(state, true, nodeIndent);
      }
    }
    line = state.line;
    composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
    keyTag = state.tag || null;
    keyNode = state.result;
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if ((isExplicitPair || state.line === line) && ch === 58) {
      isPair = true;
      ch = state.input.charCodeAt(++state.position);
      skipSeparationSpace(state, true, nodeIndent);
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      valueNode = state.result;
    }
    if (isMapping) {
      storeMappingPair(state, result, overridableKeys, keyTag, keyNode, valueNode);
    } else if (isPair) {
      result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode));
    } else {
      result.push(keyNode);
    }
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if (ch === 44) {
      readNext = true;
      ch = state.input.charCodeAt(++state.position);
    } else {
      readNext = false;
    }
  }
  return throwError(state, "unexpected end of the stream within a flow collection");
}
function readBlockScalar(state, nodeIndent) {
  let chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false;
  let ch = state.input.charCodeAt(state.position);
  let folding = false;
  if (ch === 124) {
    folding = false;
  } else if (ch === 62) {
    folding = true;
  } else {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  let tmp = 0;
  while (ch !== 0) {
    ch = state.input.charCodeAt(++state.position);
    if (ch === 43 || /* + */
    ch === 45) {
      if (CHOMPING_CLIP === chomping) {
        chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
      } else {
        return throwError(state, "repeat of a chomping mode identifier");
      }
    } else if ((tmp = fromDecimalCode(ch)) >= 0) {
      if (tmp === 0) {
        return throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
      } else if (!detectedIndent) {
        textIndent = nodeIndent + tmp - 1;
        detectedIndent = true;
      } else {
        return throwError(state, "repeat of an indentation width identifier");
      }
    } else {
      break;
    }
  }
  if (isWhiteSpace(ch)) {
    do {
      ch = state.input.charCodeAt(++state.position);
    } while (isWhiteSpace(ch));
    if (ch === 35) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (!isEOL(ch) && ch !== 0);
    }
  }
  while (ch !== 0) {
    readLineBreak(state);
    state.lineIndent = 0;
    ch = state.input.charCodeAt(state.position);
    while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
      state.lineIndent++;
      ch = state.input.charCodeAt(++state.position);
    }
    if (!detectedIndent && state.lineIndent > textIndent) {
      textIndent = state.lineIndent;
    }
    if (isEOL(ch)) {
      emptyLines++;
      continue;
    }
    if (state.lineIndent < textIndent) {
      if (chomping === CHOMPING_KEEP) {
        state.result += repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (chomping === CHOMPING_CLIP) {
        if (didReadContent) {
          state.result += "\n";
        }
      }
      break;
    }
    if (folding) {
      if (isWhiteSpace(ch)) {
        atMoreIndented = true;
        state.result += repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (atMoreIndented) {
        atMoreIndented = false;
        state.result += repeat("\n", emptyLines + 1);
      } else if (emptyLines === 0) {
        if (didReadContent) {
          state.result += " ";
        }
      } else {
        state.result += repeat("\n", emptyLines);
      }
    } else {
      state.result += repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
    }
    didReadContent = true;
    detectedIndent = true;
    emptyLines = 0;
    const captureStart = state.position;
    while (!isEOL(ch) && ch !== 0) {
      ch = state.input.charCodeAt(++state.position);
    }
    captureSegment(state, captureStart, state.position, false);
  }
  return true;
}
function readBlockSequence(state, nodeIndent) {
  let line, following, detected = false, ch;
  const tag = state.tag, anchor = state.anchor, result = [];
  if (state.anchor !== null && typeof state.anchor !== "undefined" && typeof state.anchorMap !== "undefined") {
    state.anchorMap[state.anchor] = result;
  }
  ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    if (ch !== 45) {
      break;
    }
    following = state.input.charCodeAt(state.position + 1);
    if (!isWsOrEol(following)) {
      break;
    }
    detected = true;
    state.position++;
    if (skipSeparationSpace(state, true, -1)) {
      if (state.lineIndent <= nodeIndent) {
        result.push(null);
        ch = state.input.charCodeAt(state.position);
        continue;
      }
    }
    line = state.line;
    composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
    result.push(state.result);
    skipSeparationSpace(state, true, -1);
    ch = state.input.charCodeAt(state.position);
    if ((state.line === line || state.lineIndent > nodeIndent) && ch !== 0) {
      return throwError(state, "bad indentation of a sequence entry");
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }
  if (detected) {
    state.tag = tag;
    state.anchor = anchor;
    state.kind = "sequence";
    state.result = result;
    return true;
  }
  return false;
}
function readBlockMapping(state, nodeIndent, flowIndent) {
  const tag = state.tag, anchor = state.anchor, result = {}, overridableKeys = {};
  let following, allowCompact = false, line, pos, keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
  if (state.anchor !== null && typeof state.anchor !== "undefined" && typeof state.anchorMap !== "undefined") {
    state.anchorMap[state.anchor] = result;
  }
  ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    following = state.input.charCodeAt(state.position + 1);
    line = state.line;
    pos = state.position;
    if ((ch === 63 || /* ? */
    ch === 58) && /* : */
    isWsOrEol(following)) {
      if (ch === 63) {
        if (atExplicitKey) {
          storeMappingPair(state, result, overridableKeys, keyTag, keyNode, null);
          keyTag = keyNode = valueNode = null;
        }
        detected = true;
        atExplicitKey = true;
        allowCompact = true;
      } else if (atExplicitKey) {
        atExplicitKey = false;
        allowCompact = true;
      } else {
        return throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
      }
      state.position += 1;
      ch = following;
    } else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
      if (state.line === line) {
        ch = state.input.charCodeAt(state.position);
        while (isWhiteSpace(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (ch === 58) {
          ch = state.input.charCodeAt(++state.position);
          if (!isWsOrEol(ch)) {
            return throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
          }
          if (atExplicitKey) {
            storeMappingPair(state, result, overridableKeys, keyTag, keyNode, null);
            keyTag = keyNode = valueNode = null;
          }
          detected = true;
          atExplicitKey = false;
          allowCompact = false;
          keyTag = state.tag;
          keyNode = state.result;
        } else if (detected) {
          return throwError(state, "can not read an implicit mapping pair; a colon is missed");
        } else {
          state.tag = tag;
          state.anchor = anchor;
          return true;
        }
      } else if (detected) {
        return throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
      } else {
        state.tag = tag;
        state.anchor = anchor;
        return true;
      }
    } else {
      break;
    }
    if (state.line === line || state.lineIndent > nodeIndent) {
      if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
        if (atExplicitKey) {
          keyNode = state.result;
        } else {
          valueNode = state.result;
        }
      }
      if (!atExplicitKey) {
        storeMappingPair(state, result, overridableKeys, keyTag, keyNode, valueNode, line, pos);
        keyTag = keyNode = valueNode = null;
      }
      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
    }
    if (state.lineIndent > nodeIndent && ch !== 0) {
      return throwError(state, "bad indentation of a mapping entry");
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }
  if (atExplicitKey) {
    storeMappingPair(state, result, overridableKeys, keyTag, keyNode, null);
  }
  if (detected) {
    state.tag = tag;
    state.anchor = anchor;
    state.kind = "mapping";
    state.result = result;
  }
  return detected;
}
function readTagProperty(state) {
  let position, isVerbatim = false, isNamed = false, tagHandle = "", tagName, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 33) return false;
  if (state.tag !== null) {
    return throwError(state, "duplication of a tag property");
  }
  ch = state.input.charCodeAt(++state.position);
  if (ch === 60) {
    isVerbatim = true;
    ch = state.input.charCodeAt(++state.position);
  } else if (ch === 33) {
    isNamed = true;
    tagHandle = "!!";
    ch = state.input.charCodeAt(++state.position);
  } else {
    tagHandle = "!";
  }
  position = state.position;
  if (isVerbatim) {
    do {
      ch = state.input.charCodeAt(++state.position);
    } while (ch !== 0 && ch !== 62);
    if (state.position < state.length) {
      tagName = state.input.slice(position, state.position);
      ch = state.input.charCodeAt(++state.position);
    } else {
      return throwError(state, "unexpected end of the stream within a verbatim tag");
    }
  } else {
    while (ch !== 0 && !isWsOrEol(ch)) {
      if (ch === 33) {
        if (!isNamed) {
          tagHandle = state.input.slice(position - 1, state.position + 1);
          if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
            return throwError(state, "named tag handle cannot contain such characters");
          }
          isNamed = true;
          position = state.position + 1;
        } else {
          return throwError(state, "tag suffix cannot contain exclamation marks");
        }
      }
      ch = state.input.charCodeAt(++state.position);
    }
    tagName = state.input.slice(position, state.position);
    if (PATTERN_FLOW_INDICATORS.test(tagName)) {
      return throwError(state, "tag suffix cannot contain flow indicator characters");
    }
  }
  if (tagName && !PATTERN_TAG_URI.test(tagName)) {
    return throwError(state, `tag name cannot contain such characters: ${tagName}`);
  }
  if (isVerbatim) {
    state.tag = tagName;
  } else if (typeof state.tagMap !== "undefined" && hasOwn3(state.tagMap, tagHandle)) {
    state.tag = state.tagMap[tagHandle] + tagName;
  } else if (tagHandle === "!") {
    state.tag = `!${tagName}`;
  } else if (tagHandle === "!!") {
    state.tag = `tag:yaml.org,2002:${tagName}`;
  } else {
    return throwError(state, `undeclared tag handle "${tagHandle}"`);
  }
  return true;
}
function readAnchorProperty(state) {
  let ch = state.input.charCodeAt(state.position);
  if (ch !== 38) return false;
  if (state.anchor !== null) {
    return throwError(state, "duplication of an anchor property");
  }
  ch = state.input.charCodeAt(++state.position);
  const position = state.position;
  while (ch !== 0 && !isWsOrEol(ch) && !isFlowIndicator(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }
  if (state.position === position) {
    return throwError(state, "name of an anchor node must contain at least one character");
  }
  state.anchor = state.input.slice(position, state.position);
  return true;
}
function readAlias(state) {
  let ch = state.input.charCodeAt(state.position);
  if (ch !== 42) return false;
  ch = state.input.charCodeAt(++state.position);
  const _position = state.position;
  while (ch !== 0 && !isWsOrEol(ch) && !isFlowIndicator(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }
  if (state.position === _position) {
    return throwError(state, "name of an alias node must contain at least one character");
  }
  const alias = state.input.slice(_position, state.position);
  if (typeof state.anchorMap !== "undefined" && !hasOwn3(state.anchorMap, alias)) {
    return throwError(state, `unidentified alias "${alias}"`);
  }
  if (typeof state.anchorMap !== "undefined") {
    state.result = state.anchorMap[alias];
  }
  skipSeparationSpace(state, true, -1);
  return true;
}
function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
  let allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, type, flowIndent, blockIndent;
  if (state.listener && state.listener !== null) {
    state.listener("open", state);
  }
  state.tag = null;
  state.anchor = null;
  state.kind = null;
  state.result = null;
  const allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
  if (allowToSeek) {
    if (skipSeparationSpace(state, true, -1)) {
      atNewLine = true;
      if (state.lineIndent > parentIndent) {
        indentStatus = 1;
      } else if (state.lineIndent === parentIndent) {
        indentStatus = 0;
      } else if (state.lineIndent < parentIndent) {
        indentStatus = -1;
      }
    }
  }
  if (indentStatus === 1) {
    while (readTagProperty(state) || readAnchorProperty(state)) {
      if (skipSeparationSpace(state, true, -1)) {
        atNewLine = true;
        allowBlockCollections = allowBlockStyles;
        if (state.lineIndent > parentIndent) {
          indentStatus = 1;
        } else if (state.lineIndent === parentIndent) {
          indentStatus = 0;
        } else if (state.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      } else {
        allowBlockCollections = false;
      }
    }
  }
  if (allowBlockCollections) {
    allowBlockCollections = atNewLine || allowCompact;
  }
  if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
    const cond = CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext;
    flowIndent = cond ? parentIndent : parentIndent + 1;
    blockIndent = state.position - state.lineStart;
    if (indentStatus === 1) {
      if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
        hasContent = true;
      } else {
        if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
          hasContent = true;
        } else if (readAlias(state)) {
          hasContent = true;
          if (state.tag !== null || state.anchor !== null) {
            return throwError(state, "alias node should not have Any properties");
          }
        } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
          hasContent = true;
          if (state.tag === null) {
            state.tag = "?";
          }
        }
        if (state.anchor !== null && typeof state.anchorMap !== "undefined") {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    } else if (indentStatus === 0) {
      hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
    }
  }
  if (state.tag !== null && state.tag !== "!") {
    if (state.tag === "?") {
      for (let typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex++) {
        type = state.implicitTypes[typeIndex];
        if (type.resolve(state.result)) {
          state.result = type.construct(state.result);
          state.tag = type.tag;
          if (state.anchor !== null && typeof state.anchorMap !== "undefined") {
            state.anchorMap[state.anchor] = state.result;
          }
          break;
        }
      }
    } else if (hasOwn3(state.typeMap[state.kind || "fallback"], state.tag)) {
      type = state.typeMap[state.kind || "fallback"][state.tag];
      if (state.result !== null && type.kind !== state.kind) {
        return throwError(state, `unacceptable node kind for !<${state.tag}> tag; it should be "${type.kind}", not "${state.kind}"`);
      }
      if (!type.resolve(state.result)) {
        return throwError(state, `cannot resolve a node with !<${state.tag}> explicit tag`);
      } else {
        state.result = type.construct(state.result);
        if (state.anchor !== null && typeof state.anchorMap !== "undefined") {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    } else {
      return throwError(state, `unknown tag !<${state.tag}>`);
    }
  }
  if (state.listener && state.listener !== null) {
    state.listener("close", state);
  }
  return state.tag !== null || state.anchor !== null || hasContent;
}
function readDocument(state) {
  const documentStart = state.position;
  let position, directiveName, directiveArgs, hasDirectives = false, ch;
  state.version = null;
  state.checkLineBreaks = state.legacy;
  state.tagMap = {};
  state.anchorMap = {};
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    skipSeparationSpace(state, true, -1);
    ch = state.input.charCodeAt(state.position);
    if (state.lineIndent > 0 || ch !== 37) {
      break;
    }
    hasDirectives = true;
    ch = state.input.charCodeAt(++state.position);
    position = state.position;
    while (ch !== 0 && !isWsOrEol(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }
    directiveName = state.input.slice(position, state.position);
    directiveArgs = [];
    if (directiveName.length < 1) {
      return throwError(state, "directive name must not be less than one character in length");
    }
    while (ch !== 0) {
      while (isWhiteSpace(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (ch === 35) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0 && !isEOL(ch));
        break;
      }
      if (isEOL(ch)) break;
      position = state.position;
      while (ch !== 0 && !isWsOrEol(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      directiveArgs.push(state.input.slice(position, state.position));
    }
    if (ch !== 0) readLineBreak(state);
    if (hasOwn3(directiveHandlers, directiveName)) {
      directiveHandlers[directiveName](state, directiveName, ...directiveArgs);
    } else {
      throwWarning(state, `unknown document directive "${directiveName}"`);
    }
  }
  skipSeparationSpace(state, true, -1);
  if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
    state.position += 3;
    skipSeparationSpace(state, true, -1);
  } else if (hasDirectives) {
    return throwError(state, "directives end mark is expected");
  }
  composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
  skipSeparationSpace(state, true, -1);
  if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
    throwWarning(state, "non-ASCII line breaks are interpreted as content");
  }
  state.documents.push(state.result);
  if (state.position === state.lineStart && testDocumentSeparator(state)) {
    if (state.input.charCodeAt(state.position) === 46) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);
    }
    return;
  }
  if (state.position < state.length - 1) {
    return throwError(state, "end of the stream or a document separator is expected");
  } else {
    return;
  }
}
function loadDocuments(input, options) {
  input = String(input);
  options = options || {};
  if (input.length !== 0) {
    if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
      input += "\n";
    }
    if (input.charCodeAt(0) === 65279) {
      input = input.slice(1);
    }
  }
  const state = new LoaderState(input, options);
  state.input += "\0";
  while (state.input.charCodeAt(state.position) === 32) {
    state.lineIndent += 1;
    state.position += 1;
  }
  while (state.position < state.length - 1) {
    readDocument(state);
  }
  return state.documents;
}
function isCbFunction(fn) {
  return typeof fn === "function";
}
function loadAll(input, iteratorOrOption, options) {
  if (!isCbFunction(iteratorOrOption)) {
    return loadDocuments(input, iteratorOrOption);
  }
  const documents = loadDocuments(input, options);
  const iterator = iteratorOrOption;
  for (let index = 0, length = documents.length; index < length; index++) {
    iterator(documents[index]);
  }
  return void 0;
}
function load(input, options) {
  const documents = loadDocuments(input, options);
  if (documents.length === 0) {
    return;
  }
  if (documents.length === 1) {
    return documents[0];
  }
  throw new YAMLError("expected a single document in the stream, but found more");
}

// deno:https://deno.land/std@0.140.0/encoding/_yaml/parse.ts
function parse(content, options) {
  return load(content, options);
}
function parseAll(content, iterator, options) {
  return loadAll(content, iterator, options);
}

// deno:https://deno.land/std@0.140.0/encoding/_yaml/dumper/dumper_state.ts
var { hasOwn: hasOwn4 } = Object;
function compileStyleMap(schema, map2) {
  if (typeof map2 === "undefined" || map2 === null) return {};
  let type;
  const result = {};
  const keys = Object.keys(map2);
  let tag, style;
  for (let index = 0, length = keys.length; index < length; index += 1) {
    tag = keys[index];
    style = String(map2[tag]);
    if (tag.slice(0, 2) === "!!") {
      tag = `tag:yaml.org,2002:${tag.slice(2)}`;
    }
    type = schema.compiledTypeMap.fallback[tag];
    if (type && typeof type.styleAliases !== "undefined" && hasOwn4(type.styleAliases, style)) {
      style = type.styleAliases[style];
    }
    result[tag] = style;
  }
  return result;
}
var DumperState = class extends State {
  indent;
  noArrayIndent;
  skipInvalid;
  flowLevel;
  sortKeys;
  lineWidth;
  noRefs;
  noCompatMode;
  condenseFlow;
  implicitTypes;
  explicitTypes;
  tag = null;
  result = "";
  duplicates = [];
  usedDuplicates = [];
  styleMap;
  dump;
  constructor({ schema, indent = 2, noArrayIndent = false, skipInvalid = false, flowLevel = -1, styles = null, sortKeys = false, lineWidth = 80, noRefs = false, noCompatMode = false, condenseFlow = false }) {
    super(schema);
    this.indent = Math.max(1, indent);
    this.noArrayIndent = noArrayIndent;
    this.skipInvalid = skipInvalid;
    this.flowLevel = flowLevel;
    this.styleMap = compileStyleMap(this.schema, styles);
    this.sortKeys = sortKeys;
    this.lineWidth = lineWidth;
    this.noRefs = noRefs;
    this.noCompatMode = noCompatMode;
    this.condenseFlow = condenseFlow;
    this.implicitTypes = this.schema.compiledImplicit;
    this.explicitTypes = this.schema.compiledExplicit;
  }
};

// deno:https://deno.land/std@0.140.0/encoding/_yaml/dumper/dumper.ts
var _toString3 = Object.prototype.toString;
var { hasOwn: hasOwn5 } = Object;
var CHAR_TAB = 9;
var CHAR_LINE_FEED = 10;
var CHAR_SPACE = 32;
var CHAR_EXCLAMATION = 33;
var CHAR_DOUBLE_QUOTE = 34;
var CHAR_SHARP = 35;
var CHAR_PERCENT = 37;
var CHAR_AMPERSAND = 38;
var CHAR_SINGLE_QUOTE = 39;
var CHAR_ASTERISK = 42;
var CHAR_COMMA = 44;
var CHAR_MINUS = 45;
var CHAR_COLON = 58;
var CHAR_GREATER_THAN = 62;
var CHAR_QUESTION = 63;
var CHAR_COMMERCIAL_AT = 64;
var CHAR_LEFT_SQUARE_BRACKET = 91;
var CHAR_RIGHT_SQUARE_BRACKET = 93;
var CHAR_GRAVE_ACCENT = 96;
var CHAR_LEFT_CURLY_BRACKET = 123;
var CHAR_VERTICAL_LINE = 124;
var CHAR_RIGHT_CURLY_BRACKET = 125;
var ESCAPE_SEQUENCES = {};
ESCAPE_SEQUENCES[0] = "\\0";
ESCAPE_SEQUENCES[7] = "\\a";
ESCAPE_SEQUENCES[8] = "\\b";
ESCAPE_SEQUENCES[9] = "\\t";
ESCAPE_SEQUENCES[10] = "\\n";
ESCAPE_SEQUENCES[11] = "\\v";
ESCAPE_SEQUENCES[12] = "\\f";
ESCAPE_SEQUENCES[13] = "\\r";
ESCAPE_SEQUENCES[27] = "\\e";
ESCAPE_SEQUENCES[34] = '\\"';
ESCAPE_SEQUENCES[92] = "\\\\";
ESCAPE_SEQUENCES[133] = "\\N";
ESCAPE_SEQUENCES[160] = "\\_";
ESCAPE_SEQUENCES[8232] = "\\L";
ESCAPE_SEQUENCES[8233] = "\\P";
var DEPRECATED_BOOLEANS_SYNTAX = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
];
function encodeHex(character) {
  const string4 = character.toString(16).toUpperCase();
  let handle;
  let length;
  if (character <= 255) {
    handle = "x";
    length = 2;
  } else if (character <= 65535) {
    handle = "u";
    length = 4;
  } else if (character <= 4294967295) {
    handle = "U";
    length = 8;
  } else {
    throw new YAMLError("code point within a string may not be greater than 0xFFFFFFFF");
  }
  return `\\${handle}${repeat("0", length - string4.length)}${string4}`;
}
function indentString(string4, spaces) {
  const ind = repeat(" ", spaces), length = string4.length;
  let position = 0, next = -1, result = "", line;
  while (position < length) {
    next = string4.indexOf("\n", position);
    if (next === -1) {
      line = string4.slice(position);
      position = length;
    } else {
      line = string4.slice(position, next + 1);
      position = next + 1;
    }
    if (line.length && line !== "\n") result += ind;
    result += line;
  }
  return result;
}
function generateNextLine(state, level) {
  return `
${repeat(" ", state.indent * level)}`;
}
function testImplicitResolving(state, str2) {
  let type;
  for (let index = 0, length = state.implicitTypes.length; index < length; index += 1) {
    type = state.implicitTypes[index];
    if (type.resolve(str2)) {
      return true;
    }
  }
  return false;
}
function isWhitespace(c) {
  return c === CHAR_SPACE || c === CHAR_TAB;
}
function isPrintable(c) {
  return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== 65279 || 65536 <= c && c <= 1114111;
}
function isPlainSafe(c) {
  return isPrintable(c) && c !== 65279 && // - c-flow-indicator
  c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && // - ":" - "#"
  c !== CHAR_COLON && c !== CHAR_SHARP;
}
function isPlainSafeFirst(c) {
  return isPrintable(c) && c !== 65279 && !isWhitespace(c) && // - s-white
  // - (c-indicator ::=
  // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
  c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && // | “#” | “&” | “*” | “!” | “|” | “>” | “'” | “"”
  c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && // | “%” | “@” | “`”)
  c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
}
function needIndentIndicator(string4) {
  const leadingSpaceRe = /^\n* /;
  return leadingSpaceRe.test(string4);
}
var STYLE_PLAIN = 1;
var STYLE_SINGLE = 2;
var STYLE_LITERAL = 3;
var STYLE_FOLDED = 4;
var STYLE_DOUBLE = 5;
function chooseScalarStyle(string4, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType) {
  const shouldTrackWidth = lineWidth !== -1;
  let hasLineBreak = false, hasFoldableLine = false, previousLineBreak = -1, plain = isPlainSafeFirst(string4.charCodeAt(0)) && !isWhitespace(string4.charCodeAt(string4.length - 1));
  let char, i;
  if (singleLineOnly) {
    for (i = 0; i < string4.length; i++) {
      char = string4.charCodeAt(i);
      if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char);
    }
  } else {
    for (i = 0; i < string4.length; i++) {
      char = string4.charCodeAt(i);
      if (char === CHAR_LINE_FEED) {
        hasLineBreak = true;
        if (shouldTrackWidth) {
          hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
          i - previousLineBreak - 1 > lineWidth && string4[previousLineBreak + 1] !== " ";
          previousLineBreak = i;
        }
      } else if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char);
    }
    hasFoldableLine = hasFoldableLine || shouldTrackWidth && i - previousLineBreak - 1 > lineWidth && string4[previousLineBreak + 1] !== " ";
  }
  if (!hasLineBreak && !hasFoldableLine) {
    return plain && !testAmbiguousType(string4) ? STYLE_PLAIN : STYLE_SINGLE;
  }
  if (indentPerLevel > 9 && needIndentIndicator(string4)) {
    return STYLE_DOUBLE;
  }
  return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
}
function foldLine(line, width) {
  if (line === "" || line[0] === " ") return line;
  const breakRe = / [^ ]/g;
  let match;
  let start = 0, end, curr = 0, next = 0;
  let result = "";
  while (match = breakRe.exec(line)) {
    next = match.index;
    if (next - start > width) {
      end = curr > start ? curr : next;
      result += `
${line.slice(start, end)}`;
      start = end + 1;
    }
    curr = next;
  }
  result += "\n";
  if (line.length - start > width && curr > start) {
    result += `${line.slice(start, curr)}
${line.slice(curr + 1)}`;
  } else {
    result += line.slice(start);
  }
  return result.slice(1);
}
function dropEndingNewline(string4) {
  return string4[string4.length - 1] === "\n" ? string4.slice(0, -1) : string4;
}
function foldString(string4, width) {
  const lineRe = /(\n+)([^\n]*)/g;
  let result = (() => {
    let nextLF = string4.indexOf("\n");
    nextLF = nextLF !== -1 ? nextLF : string4.length;
    lineRe.lastIndex = nextLF;
    return foldLine(string4.slice(0, nextLF), width);
  })();
  let prevMoreIndented = string4[0] === "\n" || string4[0] === " ";
  let moreIndented;
  let match;
  while (match = lineRe.exec(string4)) {
    const prefix = match[1], line = match[2];
    moreIndented = line[0] === " ";
    result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
    prevMoreIndented = moreIndented;
  }
  return result;
}
function escapeString(string4) {
  let result = "";
  let char, nextChar;
  let escapeSeq;
  for (let i = 0; i < string4.length; i++) {
    char = string4.charCodeAt(i);
    if (char >= 55296 && char <= 56319) {
      nextChar = string4.charCodeAt(i + 1);
      if (nextChar >= 56320 && nextChar <= 57343) {
        result += encodeHex((char - 55296) * 1024 + nextChar - 56320 + 65536);
        i++;
        continue;
      }
    }
    escapeSeq = ESCAPE_SEQUENCES[char];
    result += !escapeSeq && isPrintable(char) ? string4[i] : escapeSeq || encodeHex(char);
  }
  return result;
}
function blockHeader(string4, indentPerLevel) {
  const indentIndicator = needIndentIndicator(string4) ? String(indentPerLevel) : "";
  const clip = string4[string4.length - 1] === "\n";
  const keep = clip && (string4[string4.length - 2] === "\n" || string4 === "\n");
  const chomp = keep ? "+" : clip ? "" : "-";
  return `${indentIndicator}${chomp}
`;
}
function writeScalar(state, string4, level, iskey) {
  state.dump = (() => {
    if (string4.length === 0) {
      return "''";
    }
    if (!state.noCompatMode && DEPRECATED_BOOLEANS_SYNTAX.indexOf(string4) !== -1) {
      return `'${string4}'`;
    }
    const indent = state.indent * Math.max(1, level);
    const lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
    const singleLineOnly = iskey || // No block styles in flow mode.
    state.flowLevel > -1 && level >= state.flowLevel;
    function testAmbiguity(str2) {
      return testImplicitResolving(state, str2);
    }
    switch (chooseScalarStyle(string4, singleLineOnly, state.indent, lineWidth, testAmbiguity)) {
      case STYLE_PLAIN:
        return string4;
      case STYLE_SINGLE:
        return `'${string4.replace(/'/g, "''")}'`;
      case STYLE_LITERAL:
        return `|${blockHeader(string4, state.indent)}${dropEndingNewline(indentString(string4, indent))}`;
      case STYLE_FOLDED:
        return `>${blockHeader(string4, state.indent)}${dropEndingNewline(indentString(foldString(string4, lineWidth), indent))}`;
      case STYLE_DOUBLE:
        return `"${escapeString(string4)}"`;
      default:
        throw new YAMLError("impossible error: invalid scalar style");
    }
  })();
}
function writeFlowSequence(state, level, object2) {
  let _result = "";
  const _tag = state.tag;
  for (let index = 0, length = object2.length; index < length; index += 1) {
    if (writeNode(state, level, object2[index], false, false)) {
      if (index !== 0) _result += `,${!state.condenseFlow ? " " : ""}`;
      _result += state.dump;
    }
  }
  state.tag = _tag;
  state.dump = `[${_result}]`;
}
function writeBlockSequence(state, level, object2, compact = false) {
  let _result = "";
  const _tag = state.tag;
  for (let index = 0, length = object2.length; index < length; index += 1) {
    if (writeNode(state, level + 1, object2[index], true, true)) {
      if (!compact || index !== 0) {
        _result += generateNextLine(state, level);
      }
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        _result += "-";
      } else {
        _result += "- ";
      }
      _result += state.dump;
    }
  }
  state.tag = _tag;
  state.dump = _result || "[]";
}
function writeFlowMapping(state, level, object2) {
  let _result = "";
  const _tag = state.tag, objectKeyList = Object.keys(object2);
  let pairBuffer, objectKey, objectValue;
  for (let index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = state.condenseFlow ? '"' : "";
    if (index !== 0) pairBuffer += ", ";
    objectKey = objectKeyList[index];
    objectValue = object2[objectKey];
    if (!writeNode(state, level, objectKey, false, false)) {
      continue;
    }
    if (state.dump.length > 1024) pairBuffer += "? ";
    pairBuffer += `${state.dump}${state.condenseFlow ? '"' : ""}:${state.condenseFlow ? "" : " "}`;
    if (!writeNode(state, level, objectValue, false, false)) {
      continue;
    }
    pairBuffer += state.dump;
    _result += pairBuffer;
  }
  state.tag = _tag;
  state.dump = `{${_result}}`;
}
function writeBlockMapping(state, level, object2, compact = false) {
  const _tag = state.tag, objectKeyList = Object.keys(object2);
  let _result = "";
  if (state.sortKeys === true) {
    objectKeyList.sort();
  } else if (typeof state.sortKeys === "function") {
    objectKeyList.sort(state.sortKeys);
  } else if (state.sortKeys) {
    throw new YAMLError("sortKeys must be a boolean or a function");
  }
  let pairBuffer = "", objectKey, objectValue, explicitPair;
  for (let index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = "";
    if (!compact || index !== 0) {
      pairBuffer += generateNextLine(state, level);
    }
    objectKey = objectKeyList[index];
    objectValue = object2[objectKey];
    if (!writeNode(state, level + 1, objectKey, true, true, true)) {
      continue;
    }
    explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
    if (explicitPair) {
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += "?";
      } else {
        pairBuffer += "? ";
      }
    }
    pairBuffer += state.dump;
    if (explicitPair) {
      pairBuffer += generateNextLine(state, level);
    }
    if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
      continue;
    }
    if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
      pairBuffer += ":";
    } else {
      pairBuffer += ": ";
    }
    pairBuffer += state.dump;
    _result += pairBuffer;
  }
  state.tag = _tag;
  state.dump = _result || "{}";
}
function detectType(state, object2, explicit = false) {
  const typeList = explicit ? state.explicitTypes : state.implicitTypes;
  let type;
  let style;
  let _result;
  for (let index = 0, length = typeList.length; index < length; index += 1) {
    type = typeList[index];
    if ((type.instanceOf || type.predicate) && (!type.instanceOf || typeof object2 === "object" && object2 instanceof type.instanceOf) && (!type.predicate || type.predicate(object2))) {
      state.tag = explicit ? type.tag : "?";
      if (type.represent) {
        style = state.styleMap[type.tag] || type.defaultStyle;
        if (_toString3.call(type.represent) === "[object Function]") {
          _result = type.represent(object2, style);
        } else if (hasOwn5(type.represent, style)) {
          _result = type.represent[style](object2, style);
        } else {
          throw new YAMLError(`!<${type.tag}> tag resolver accepts not "${style}" style`);
        }
        state.dump = _result;
      }
      return true;
    }
  }
  return false;
}
function writeNode(state, level, object2, block, compact, iskey = false) {
  state.tag = null;
  state.dump = object2;
  if (!detectType(state, object2, false)) {
    detectType(state, object2, true);
  }
  const type = _toString3.call(state.dump);
  if (block) {
    block = state.flowLevel < 0 || state.flowLevel > level;
  }
  const objectOrArray = type === "[object Object]" || type === "[object Array]";
  let duplicateIndex = -1;
  let duplicate = false;
  if (objectOrArray) {
    duplicateIndex = state.duplicates.indexOf(object2);
    duplicate = duplicateIndex !== -1;
  }
  if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
    compact = false;
  }
  if (duplicate && state.usedDuplicates[duplicateIndex]) {
    state.dump = `*ref_${duplicateIndex}`;
  } else {
    if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
      state.usedDuplicates[duplicateIndex] = true;
    }
    if (type === "[object Object]") {
      if (block && Object.keys(state.dump).length !== 0) {
        writeBlockMapping(state, level, state.dump, compact);
        if (duplicate) {
          state.dump = `&ref_${duplicateIndex}${state.dump}`;
        }
      } else {
        writeFlowMapping(state, level, state.dump);
        if (duplicate) {
          state.dump = `&ref_${duplicateIndex} ${state.dump}`;
        }
      }
    } else if (type === "[object Array]") {
      const arrayLevel = state.noArrayIndent && level > 0 ? level - 1 : level;
      if (block && state.dump.length !== 0) {
        writeBlockSequence(state, arrayLevel, state.dump, compact);
        if (duplicate) {
          state.dump = `&ref_${duplicateIndex}${state.dump}`;
        }
      } else {
        writeFlowSequence(state, arrayLevel, state.dump);
        if (duplicate) {
          state.dump = `&ref_${duplicateIndex} ${state.dump}`;
        }
      }
    } else if (type === "[object String]") {
      if (state.tag !== "?") {
        writeScalar(state, state.dump, level, iskey);
      }
    } else {
      if (state.skipInvalid) return false;
      throw new YAMLError(`unacceptable kind of an object to dump ${type}`);
    }
    if (state.tag !== null && state.tag !== "?") {
      state.dump = `!<${state.tag}> ${state.dump}`;
    }
  }
  return true;
}
function inspectNode(object2, objects, duplicatesIndexes) {
  if (object2 !== null && typeof object2 === "object") {
    const index = objects.indexOf(object2);
    if (index !== -1) {
      if (duplicatesIndexes.indexOf(index) === -1) {
        duplicatesIndexes.push(index);
      }
    } else {
      objects.push(object2);
      if (Array.isArray(object2)) {
        for (let idx = 0, length = object2.length; idx < length; idx += 1) {
          inspectNode(object2[idx], objects, duplicatesIndexes);
        }
      } else {
        const objectKeyList = Object.keys(object2);
        for (let idx = 0, length = objectKeyList.length; idx < length; idx += 1) {
          inspectNode(object2[objectKeyList[idx]], objects, duplicatesIndexes);
        }
      }
    }
  }
}
function getDuplicateReferences(object2, state) {
  const objects = [], duplicatesIndexes = [];
  inspectNode(object2, objects, duplicatesIndexes);
  const length = duplicatesIndexes.length;
  for (let index = 0; index < length; index += 1) {
    state.duplicates.push(objects[duplicatesIndexes[index]]);
  }
  state.usedDuplicates = Array.from({
    length
  });
}
function dump(input, options) {
  options = options || {};
  const state = new DumperState(options);
  if (!state.noRefs) getDuplicateReferences(input, state);
  if (writeNode(state, 0, input, true, true)) return `${state.dump}
`;
  return "";
}

// deno:https://deno.land/std@0.140.0/encoding/_yaml/stringify.ts
function stringify(obj, options) {
  return dump(obj, options);
}

// deno:https://deno.land/x/embassyd_sdk@v0.3.1.1.2/mod.ts
var types = __toESM(require_types());

// deno:https://deno.land/x/embassyd_sdk@v0.3.1.1.2/compat/mod.ts
var mod_exports2 = {};
__export(mod_exports2, {
  getConfig: () => getConfig,
  migrations: () => migrations_exports,
  properties: () => properties,
  setConfig: () => setConfig
});

// deno:https://deno.land/x/embassyd_sdk@v0.3.1.1.2/util.ts
function unwrapResultType(res) {
  if ("error-code" in res) {
    throw new Error(res["error-code"][1]);
  } else if ("error" in res) {
    throw new Error(res["error"]);
  } else {
    return res.result;
  }
}
var exists = (effects, props) => effects.metadata(props).then((_) => true, (_) => false);

// deno:https://deno.land/x/embassyd_sdk@v0.3.1.1.2/compat/properties.ts
var asResult = (result) => ({
  result
});
var noPropertiesFound = {
  result: {
    version: 2,
    data: {
      "Not Ready": {
        type: "string",
        value: "Could not find properties. The service might still be starting",
        qr: false,
        copyable: false,
        masked: false,
        description: "Fallback Message When Properties could not be found"
      }
    }
  }
};
var properties = async (effects) => {
  if (await exists(effects, {
    path: "start9/stats.yaml",
    volumeId: "main"
  }) === false) {
    return noPropertiesFound;
  }
  return await effects.readFile({
    path: "start9/stats.yaml",
    volumeId: "main"
  }).then(yaml_exports.parse).then(asResult);
};

// deno:https://deno.land/x/embassyd_sdk@v0.3.1.1.2/compat/setConfig.ts
var setConfig = async (effects, newConfig, dependsOn = {}) => {
  await effects.createDir({
    path: "start9",
    volumeId: "main"
  });
  await effects.writeFile({
    path: "start9/config.yaml",
    toWrite: yaml_exports.stringify(newConfig),
    volumeId: "main"
  });
  const result = {
    signal: "SIGTERM",
    "depends-on": dependsOn
  };
  return {
    result
  };
};

// deno:https://deno.land/x/embassyd_sdk@v0.3.1.1.2/compat/getConfig.ts
var { any: any2, string: string2, dictionary: dictionary2 } = mod_exports;
var matchConfig = dictionary2([
  string2,
  any2
]);
var getConfig = (spec) => async (effects) => {
  const config = await effects.readFile({
    path: "start9/config.yaml",
    volumeId: "main"
  }).then((x) => yaml_exports.parse(x)).then((x) => matchConfig.unsafeCast(x)).catch((e) => {
    effects.info(`Got error ${e} while trying to read the config`);
    return void 0;
  });
  return {
    result: {
      config,
      spec
    }
  };
};

// deno:https://deno.land/x/embassyd_sdk@v0.3.1.1.2/compat/migrations.ts
var migrations_exports = {};
__export(migrations_exports, {
  fromMapping: () => fromMapping2,
  initNoRepeat: () => initNoRepeat,
  noRepeatGuard: () => noRepeatGuard,
  updateConfig: () => updateConfig
});

// deno:https://deno.land/x/embassyd_sdk@v0.3.1.1.2/emver-lite/mod.ts
function incrementLastNumber(list) {
  const newList = [
    ...list
  ];
  newList[newList.length - 1]++;
  return newList;
}
var EmVer = class _EmVer {
  values;
  /**
   * Convert the range, should be 1.2.* or * into a emver
   * Or an already made emver
   * IsUnsafe
   */
  static from(range) {
    if (range instanceof _EmVer) {
      return range;
    }
    return _EmVer.parse(range);
  }
  /**
   * Convert the range, should be 1.2.* or * into a emver
   * IsUnsafe
   */
  static parse(range) {
    const values = range.split(".").map((x) => parseInt(x));
    for (const value of values) {
      if (isNaN(value)) {
        throw new Error(`Couldn't parse range: ${range}`);
      }
    }
    return new _EmVer(values);
  }
  constructor(values) {
    this.values = values;
  }
  /**
   * Used when we need a new emver that has the last number incremented, used in the 1.* like things
   */
  withLastIncremented() {
    return new _EmVer(incrementLastNumber(this.values));
  }
  greaterThan(other) {
    for (const i in this.values) {
      if (other.values[i] == null) {
        return true;
      }
      if (this.values[i] > other.values[i]) {
        return true;
      }
      if (this.values[i] < other.values[i]) {
        return false;
      }
    }
    return false;
  }
  equals(other) {
    if (other.values.length !== this.values.length) {
      return false;
    }
    for (const i in this.values) {
      if (this.values[i] !== other.values[i]) {
        return false;
      }
    }
    return true;
  }
  greaterThanOrEqual(other) {
    return this.greaterThan(other) || this.equals(other);
  }
  lessThanOrEqual(other) {
    return !this.greaterThan(other);
  }
  lessThan(other) {
    return !this.greaterThanOrEqual(other);
  }
  /**
   * Return a enum string that describes (used for switching/iffs)
   * to know comparison
   * @param other
   * @returns
   */
  compare(other) {
    if (this.equals(other)) {
      return "equal";
    } else if (this.greaterThan(other)) {
      return "greater";
    } else {
      return "less";
    }
  }
  /**
   * Used when sorting emver's in a list using the sort method
   * @param other
   * @returns
   */
  compareForSort(other) {
    return mod_exports.matches(this.compare(other)).when("equal", () => 0).when("greater", () => 1).when("less", () => -1).unwrap();
  }
};

// deno:https://deno.land/x/embassyd_sdk@v0.3.1.1.2/migrations.ts
function migrationFn(fn) {
  return fn;
}
function fromMapping(migrations, currentVersion) {
  const directionShape = mod_exports.literals("from", "to");
  return async (effects, version, direction) => {
    if (!directionShape.test(direction)) {
      return {
        error: 'Must specify arg "from" or "to".'
      };
    }
    let configured = true;
    const current = EmVer.parse(currentVersion);
    const other = EmVer.parse(version);
    const filteredMigrations = Object.entries(migrations).map(([version2, migration2]) => ({
      version: EmVer.parse(version2),
      migration: migration2
    })).filter(({ version: version2 }) => version2.greaterThan(other) && version2.lessThanOrEqual(current));
    const migrationsToRun = mod_exports.matches(direction).when("from", () => filteredMigrations.sort((a, b) => a.version.compareForSort(b.version)).map(({ migration: migration2 }) => migration2.up)).when("to", () => filteredMigrations.sort((a, b) => b.version.compareForSort(a.version)).map(({ migration: migration2 }) => migration2.down)).unwrap();
    for (const migration2 of migrationsToRun) {
      configured = (await migration2(effects)).configured && configured;
    }
    return {
      result: {
        configured
      }
    };
  };
}

// deno:https://deno.land/x/embassyd_sdk@v0.3.1.1.2/compat/migrations.ts
function updateConfig(fn, configured, noRepeat, noFail = false) {
  return migrationFn(async (effects) => {
    await noRepeatGuard(effects, noRepeat, async () => {
      let config = unwrapResultType(await getConfig({})(effects)).config;
      if (config) {
        try {
          config = fn(config, effects);
        } catch (e) {
          if (!noFail) {
            throw e;
          } else {
            configured = false;
          }
        }
        unwrapResultType(await setConfig(effects, config));
      }
    });
    return {
      configured
    };
  });
}
async function noRepeatGuard(effects, noRepeat, fn) {
  if (!noRepeat) {
    return fn();
  }
  if (!await exists(effects, {
    path: "start9/migrations",
    volumeId: "main"
  })) {
    await effects.createDir({
      path: "start9/migrations",
      volumeId: "main"
    });
  }
  const migrationPath = {
    path: `start9/migrations/${noRepeat.version}.complete`,
    volumeId: "main"
  };
  if (noRepeat.type === "up") {
    if (!await exists(effects, migrationPath)) {
      await fn();
      await effects.writeFile({
        ...migrationPath,
        toWrite: ""
      });
    }
  } else if (noRepeat.type === "down") {
    if (await exists(effects, migrationPath)) {
      await fn();
      await effects.removeFile(migrationPath);
    }
  }
}
async function initNoRepeat(effects, migrations, startingVersion) {
  if (!await exists(effects, {
    path: "start9/migrations",
    volumeId: "main"
  })) {
    const starting = EmVer.parse(startingVersion);
    await effects.createDir({
      path: "start9/migrations",
      volumeId: "main"
    });
    for (const version in migrations) {
      const migrationVersion = EmVer.parse(version);
      if (migrationVersion.lessThanOrEqual(starting)) {
        await effects.writeFile({
          path: `start9/migrations/${version}.complete`,
          volumeId: "main",
          toWrite: ""
        });
      }
    }
  }
}
function fromMapping2(migrations, currentVersion) {
  const inner = fromMapping(migrations, currentVersion);
  return async (effects, version, direction) => {
    await initNoRepeat(effects, migrations, direction === "from" ? version : currentVersion);
    return inner(effects, version, direction);
  };
}

// scripts/procedures/setConfig.ts
var setConfig2 = mod_exports2.setConfig;

// scripts/procedures/getConfig.ts
var getConfig2 = mod_exports2.getConfig({
  bitcoind: {
    type: "object",
    name: "Bitcoin RPC settings",
    description: "RPC settings for bitcoind",
    spec: {
      rpcuser: {
        type: "pointer",
        name: "RPC Username",
        description: "The username for Bitcoin Core's RPC interface",
        subtype: "package",
        "package-id": "bitcoind",
        target: "config",
        multi: false,
        selector: "$.rpc.username"
      },
      rpcpassword: {
        type: "pointer",
        name: "RPC Password",
        description: "The password for Bitcoin Core's RPC interface",
        subtype: "package",
        "package-id": "bitcoind",
        target: "config",
        multi: false,
        selector: "$.rpc.password"
      },
      rpcurl: {
        type: "string",
        name: "RPC URL",
        description: "RPC URL for communication with local bitcoind. (GBT Template Source)",
        nullable: false,
        default: "http://bitcoind.embassy:8332"
      },
      work_update_seconds: {
        type: "number",
        name: "Work Update (Seconds)",
        description: "How frequently should Bitcoind send updated templates",
        nullable: true,
        range: "[5,120)",
        integral: true,
        default: 40,
        units: "seconds"
      },
      blocknotify: {
        type: "pointer",
        name: "Block Notify",
        description: "Does Bitcoind have blocknotify? This should say curl -s -m5 http://datum.embassy:7152/NOTIFY",
        subtype: "package",
        "package-id": "bitcoind",
        target: "config",
        multi: false,
        selector: "$.advanced.blocknotify"
      }
    }
  },
  stratum: {
    type: "object",
    name: "Stratum Server Settings",
    description: "Configure the Datum gateway's stratum server.",
    spec: {
      listen_port: {
        type: "number",
        name: "Listen Port",
        description: "Listening port for Stratum Gateway.",
        nullable: true,
        range: "[0,65535]",
        integral: false,
        default: 23335
      },
      max_clients_per_thread: {
        type: "number",
        name: "Maximum Clients Per Thread",
        description: "Maximum clients per Stratum server thread.",
        nullable: true,
        range: "[0,*)",
        integral: true,
        default: 1e3
      },
      max_threads: {
        type: "number",
        name: "Max Threads",
        description: "Maximum Stratum server threads (integer, default: 8)",
        nullable: true,
        range: "[0,*)",
        integral: true,
        default: 8
      },
      max_clients: {
        type: "number",
        name: "Max Clients",
        description: "Maximum total Stratum clients before rejecting connections (integer, default: 2048)",
        nullable: true,
        range: "[0,*)",
        integral: true,
        default: 2048
      },
      vardiff_min: {
        type: "number",
        name: "Minimum Difficulty",
        description: "Work difficulty floor (integer, default: 16384)",
        nullable: true,
        range: "[0,*)",
        integral: true,
        default: 16384
      },
      vardiff_target_shares_min: {
        type: "number",
        name: "Target Shares per Minute",
        description: "Adjust work difficulty to target this many shares per minute (integer, default: 8)",
        nullable: true,
        range: "[0,*)",
        integral: true,
        default: 8
      },
      vardiff_quickdiff_count: {
        type: "number",
        name: "Difficulty Update Speed",
        description: "How many shares before considering a quick diff update (integer, default: 8)",
        nullable: true,
        range: "[0,*)",
        integral: true,
        default: 8
      },
      vardiff_quickdiff_delta: {
        type: "number",
        name: "Difficulty Delta",
        description: "How many times faster than our target does the miner have to be before we enforce a quick diff bump (integer, default: 8)",
        nullable: true,
        range: "[0,*)",
        integral: true,
        default: 8
      },
      share_stale_seconds: {
        type: "number",
        name: "Seconds Until Shares Considered Stale",
        description: "How many seconds after a job is generated before a share submission is considered stale? (integer, default: 120)",
        nullable: true,
        range: "[0,*)",
        integral: true,
        default: 120
      },
      fingerprint_miners: {
        type: "boolean",
        name: "Fingerprint Miners",
        description: "Attempt to fingerprint miners for better use of coinbase space (boolean, default: true)",
        default: true,
        nullable: false
      },
      // empty_block_speedup: {
      //   type: "boolean",
      //   name: "Empty Block Speedup",
      //   description: "Get on the latest block as fast as possible by sending blank work first (highly recommended) (boolean, default: true)",
      //   default: true,
      //   nullable: false,
      // },
      username_modifiers: {
        type: "list",
        subtype: "object",
        name: "Username_modifiers",
        description: "RPC settings for bitcoind",
        default: [],
        range: "[0,*)",
        spec: {
          spec: {
            name: {
              type: "string",
              nullable: false,
              name: "Modifier name",
              description: "The name of this modifier"
            },
            addresses: {
              type: "list",
              subtype: "object",
              name: "Modifier addresses",
              description: "Bitcoin addresses and the designated split amount",
              default: [],
              range: "[2,*)",
              spec: {
                spec: {
                  address: {
                    type: "string",
                    name: "Bitcoin address",
                    description: "The bitcoin address to send to",
                    nullable: true,
                    pattern: "[0-9a-zA-Z]{0,88}",
                    "pattern-description": "Must be a valid bitcoin address"
                  },
                  split: {
                    type: "number",
                    name: "Address split",
                    description: "value of the modifier for this address",
                    nullable: false,
                    integral: false,
                    range: "[0,1]",
                    default: 0.9
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  mining: {
    type: "object",
    name: "Mining Settings",
    description: "Mining settings",
    spec: {
      pool_address: {
        type: "string",
        name: "Bitcoin Address",
        description: "Bitcoin address used for mining on DATUM Pool, and for solo mining rewards.",
        nullable: false,
        pattern: "[0-9a-zA-Z]{20,88}",
        "pattern-description": "Must be a valid Bitcoin address."
      },
      coinbase_tag_primary: {
        type: "string",
        name: "Primary Coinbase Tag",
        description: "Text to have in the primary coinbase tag when solo (overridden by DATUM Pool with the pool's name.)",
        default: "Datum User",
        nullable: true
      },
      coinbase_tag_secondary: {
        type: "string",
        name: "Secondary Coinbase Tag",
        description: "Text to have in the secondary coinbase tag. If you're mining on a pool, this is what you label your blocks with.",
        default: "Datum Miner",
        nullable: true
      },
      // coinbase_tag_tertiary: {
      //   type: "string",
      //   name: "Tertiary Coinbase Tag",
      //   description: "Text to have in the tertiary coinbase tag. Suggested to be a longer name/description/url/etc",
      //   default: "Datum User",
      //   nullable: true,
      // },
      coinbase_unique_id: {
        type: "number",
        name: "Coinbase Unique ID",
        description: "A unique ID between 1 and 65535. This is appended to the coinbase. Make unique per instance of datum with the same coinbase tags.",
        integral: true,
        range: "[1,65535]",
        default: 120,
        nullable: true
      },
      allow_hasher_time_rolling: {
        type: "boolean",
        name: "Allow Hasher Time Rolling",
        description: "Blake2b ASICs rolling nTime fail header-v2 checks on Convoy/AlphaPool. Leave OFF on this XBT gateway.",
        default: false,
        nullable: false
      }
    }
  },
  api: {
    type: "object",
    name: "API",
    description: "Settings for the Datum Gateway Dashboard",
    spec: {
      listen_port: {
        type: "number",
        name: "Listen Port",
        description: "Listening port for Datum Gateway Dashboard.",
        nullable: false,
        range: "[0,65535]",
        integral: true,
        default: 7152
      },
      admin_password: {
        type: "string",
        name: "Admin Password",
        description: "Admin password for dashboard login and API config writes (username admin)",
        default: "",
        nullable: true
      },
      modify_conf: {
        type: "boolean",
        name: "Allow API Config Writes",
        description: "When on, DATUM accepts dashboard/API changes (including username_modifiers). RouteHash House Pool sync needs this. Restart still rebuilds other fields from this StartOS config; modifiers on disk are restored if this UI list is empty.",
        default: true,
        nullable: false
      },
      allow_insecure_auth: {
        type: "boolean",
        name: "Allow Insecure Authentication",
        description: "Allow insecure authentication (required for Safari)",
        default: false,
        nullable: true,
        warning: "This lowers security of the dashboard login. Use it only on trusted networks."
      }
    }
  },
  // "extra_block_submissions": {
  //   type: "object",
  //   name: "Extra Block Submissions",
  //   description: "Additional places to submit solved blocks",
  //   spec: {
  //     type: "string",
  //     name: "URL",
  //     descrption: "Array of bitcoind RPC URLs to submit our blocks to directly.  Include auth info: http://user:pass@IP (string_array)",
  //     nullable: true,
  //   },
  // },
  logger: {
    type: "object",
    name: "Logger",
    description: "Log Settings",
    spec: {
      log_level_console: {
        type: "number",
        name: "Log Level Console",
        description: "Minimum log level for console messages (0=All, 1=Debug, 2=Info, 3=Warn, 4=Error, 5=Fatal) (integer, default: 2)",
        integral: true,
        range: "[0,5)",
        default: 2,
        nullable: false
      },
      log_to_file: {
        type: "boolean",
        name: "Log to File",
        description: "Enable logging of messages to a file",
        default: false,
        nullable: true
      },
      log_file: {
        type: "string",
        name: "Log File",
        description: "Path to file to write log messages, when enabled",
        default: "/root/start9/logs.txt",
        nullable: true
      },
      log_level_file: {
        type: "number",
        name: "File Log Level",
        description: "Minimum log level for log file messages",
        integral: true,
        range: "[0,5)",
        default: 1,
        nullable: true
      }
    }
  },
  datum: {
    type: "object",
    name: "Datum",
    description: "Datum-Gateway settings. These are set to mine on OCEAN by default. Modify to switch to another Datum-supporting pool, or to solo mine.",
    spec: {
      pool_host: {
        type: "string",
        name: "Pool Host",
        description: "Remote DATUM server host for collaborative TIDES (Convoy/AlphaPool/Rabbit). Leave blank for solo/autonomous templates from the local Knots node. Do not use Ocean on this Blake2b gateway.",
        default: "",
        nullable: true
      },
      pool_port: {
        type: "number",
        name: "Pool Port",
        description: "Remote DATUM server port (integer, default: 28915)",
        range: "[0,65535]",
        default: 28915,
        integral: true,
        nullable: true
      },
      pool_pubkey: {
        type: "string",
        name: "Pool Pubkey",
        description: "Public key of the DATUM server for initiating encrypted connection. Get from secure location, or set to empty to auto-fetch.",
        default: "f21f2f0ef0aa1970468f22bad9bb7f4535146f8e4a8f646bebc93da3d89b1406f40d032f09a417d94dc068055df654937922d2c89522e3e8f6f0e649de473003",
        nullable: true
      },
      pool_pass_workers: {
        type: "boolean",
        name: "Pool Pass Workers",
        description: "Pass stratum miner usernames as sub-worker names to the pool (boolean, default: true)",
        default: true,
        nullable: true
      },
      pool_pass_full_users: {
        type: "boolean",
        name: "Pool Pass Full Users",
        description: "Pass stratum miner usernames as raw usernames to the pool (use if putting multiple payout addresses on miners behind this gateway)",
        default: true,
        nullable: true
      },
      always_pay_self: {
        type: "boolean",
        name: "Always Pay Self",
        description: "Always include my datum.pool_username payout in my blocks if possible (boolean, default: true)",
        default: true,
        nullable: true
      },
      // pay_self_below_minimum: {
      //   type: "boolean",
      //   name: "Pay Self Below Minimum",
      //   description: "If datum.always_pay_self, include even if below the pool's minimum payout (boolean, default: false)",
      //   default: false,
      //   nullable: true,
      // },
      // allow_low_local_diff: {
      //   type: "boolean",
      //   name: "Allow Low Local Diff",
      //   description: "Do full local stratum vardiff even if below the pool's minimum difficulty for my connection. (boolean, default: false)",
      //   default: false,
      //   nullable: true,
      // },
      reward_sharing: {
        type: "enum",
        values: [
          "require",
          "prefer",
          "never"
        ],
        name: "Collaborative reward sharing (pooled mining)",
        description: "You can share rewards and share in others' rewards - or only get rewarded when you find a block yourself.",
        "value-names": {
          require: "require (pooled mining only)",
          prefer: "prefer (failover to non-pooled)",
          never: "never (non-pooled only)"
        },
        default: "require"
      }
    }
  }
});

// scripts/procedures/properties.ts
var properties2 = mod_exports2.properties;

// scripts/procedures/migrations.ts
function migrate_022_to_0221(config) {
  if (config.datum.pooled_mining_only) {
    config.datum.reward_sharing = "require";
  } else if (config.datum.pool_host) {
    config.datum.reward_sharing = "prefer";
  } else {
    config.datum.reward_sharing = "never";
  }
  delete config.datum.pooled_mining_only;
  return config;
}
function migrate_0221_to_022(config) {
  if (config.datum.reward_sharing == "require") {
    config.datum.pooled_mining_only = true;
  } else {
    config.datum.pooled_mining_only = false;
    if (config.datum.reward_sharing == "prefer") {
      if (!config.datum.pool_host) {
        config.datum.pool_host = "datum-beta1.mine.ocean.xyz";
      }
    } else {
      config.datum.pool_host = null;
    }
  }
  delete config.datum.reward_sharing;
  return config;
}
function migrate_022_to_031(config) {
  config.api.admin_password = "";
  return config;
}
function migrate_031_to_022(config) {
  delete config.api.admin_password;
  return config;
}
var migration = mod_exports2.migrations.fromMapping({
  "0.2.1": {
    up: mod_exports2.migrations.updateConfig((config) => {
      return config;
    }, false, {
      version: "0.2.1",
      type: "up"
    }),
    down: mod_exports2.migrations.updateConfig((config) => {
      return config;
    }, false, {
      version: "0.2.1",
      type: "down"
    })
  },
  "0.2.2.1": {
    up: mod_exports2.migrations.updateConfig(migrate_022_to_0221, true, {
      version: "0.2.2.1",
      type: "up"
    }),
    down: mod_exports2.migrations.updateConfig(migrate_0221_to_022, true, {
      version: "0.2.2.1",
      type: "down"
    })
  },
  "0.3.1": {
    up: mod_exports2.migrations.updateConfig(migrate_022_to_031, true, {
      version: "0.3.1",
      type: "up"
    }),
    down: mod_exports2.migrations.updateConfig(migrate_031_to_022, true, {
      version: "0.3.1",
      type: "down"
    })
  },
  "0.4.0": {
    up: mod_exports2.migrations.updateConfig((config) => {
      config.stratum.username_modifiers = [];
      return config;
    }, true, {
      version: "0.4.0",
      type: "up"
    }),
    down: mod_exports2.migrations.updateConfig((config) => {
      delete config.stratum.username_modifiers;
      return config;
    }, true, {
      version: "0.4.0",
      type: "down"
    })
  },
  "0.4.1": {
    up: mod_exports2.migrations.updateConfig((config) => {
      config.api.allow_insecure_auth = false;
      return config;
    }, true, {
      version: "0.4.1",
      type: "up"
    }),
    down: mod_exports2.migrations.updateConfig((config) => {
      delete config.api.allow_insecure_auth;
      return config;
    }, true, {
      version: "0.4.1",
      type: "down"
    })
  }
}, "0.4.1.1");

// scripts/procedures/dependencies.ts
var { shape: shape2, boolean: boolean2, string: string3, any: any3 } = mod_exports;
var matchOldBitcoindConfig = shape2({
  rpc: shape2({
    enable: boolean2
  }),
  advanced: any3
});
var dependencies = {
  bitcoind: {
    // deno-lint-ignore require-await
    async check(_effects, configInput) {
      if (matchOldBitcoindConfig.test(configInput) && !configInput.rpc.enable) {
        return {
          error: "Must have RPC enabled"
        };
      } else if (matchOldBitcoindConfig.test(configInput) && !configInput.advanced.blocknotify) {
        return {
          error: "Blocknotify must not be null"
        };
      } else if (matchOldBitcoindConfig.test(configInput)) {
        return {
          result: null
        };
      }
      return {
        result: null
      };
    },
    // deno-lint-ignore require-await
    async autoConfigure(_effects, configInput) {
      if (matchOldBitcoindConfig.test(configInput)) {
        configInput.rpc.enable = true;
        configInput.advanced.blocknotify = "curl -s -m5 http://datum.embassy:7152/NOTIFY";
        return {
          result: configInput
        };
      } else {
        return {
          result: configInput
        };
      }
    }
  }
};
export {
  dependencies,
  getConfig2 as getConfig,
  migration,
  properties2 as properties,
  setConfig2 as setConfig
};
