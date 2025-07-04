// ==UserScript==
// @name             搜索引擎广告拦截
// @description        搜索引擎广告拦截，支持电脑和手机的浏览器。
// @author             chwmq
// @version            1.0.0
// @match             *://www.google.co.jp/*
// @match             *://www.google.com.hk/*
// @match             *://www.google.com/*
// @match             *://m.baidu.com/*
// @match             *://www.baidu.com/*
// @match             *://m.sm.cn/*
// @match             *://yz.m.sm.cn/*
// @match             *://wap.sogou.com/*
// @match             *://m.sogou.com/*
// @match             *://www.sogou.com/*
// @match             *://www.so.com/*
// @match             *://m.so.com/*
// @match             *://s.cn.bing.net/*
// @match             *://*.bing.com/*
// @match             *://so.toutiao.com/*
// @match             *://so.douyin.com/*
// @grant              GM_addStyle
// @grant              unsafeWindow
// @run-at             document-start
// @source            https://github.com/chwmq/Ad-Blocking
// @license            MIT
// ==/UserScript==

/* eslint-disable no-undef */

(function (cat) {
  "use strict";

  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }

  const userConfig = {
    css: " {display: none !important;width: 0 !important;height: 0 !important;} ",
    timeout: 10000,
    tryCount: 5,
    tryTimeout: 500,
  };
  const defaultRules = `
! 不支持的规则和开头为 ! 的行会忽略
!
! 由于语法限制，此处规则中
! 一个反斜杠需要改成两个，像这样 \\
www.google.com,www.google.com.hk,www.google.co.jp##div.MjjYud:has([href*='%E2%9C%94%EF%B8%8F%E2%96%9B']),div.MjjYud:has([href*='%E3%80%90%E2%9C%94%EF%B8%8F']),div.MjjYud:has([href*='%E2%9E%BF%E3%80%91']),div.MjjYud:has([href*='%E2%8F%AA%29']),div.MjjYud:has([href*='%E2%9A%BD%E3%80%91']),div.MjjYud:has([href*='-%E3%80%90']),div.MjjYud:has([href*='%E2%9C%94%EF%B8%8F'][href*='%E2%98%80%EF%B8%8F']),div.MjjYud:has([href*='-('][href*='%E2%9C%94%EF%B8%8F']),div.MjjYud:has([href*='%E2%9C%94%EF%B8%8F%29']),div.MjjYud:has([href*='-%E2%9C%94%EF%B8%8F']),div.MjjYud:has([href*='%E2%9C%94%EF%B8%8F']),div.MjjYud:has([href*='%E2%9C%85%EF%B8%8F']),div.MjjYud:has([href*='%E2%9E%A1%EF%B8%8F']),div.MjjYud:has([href*='%E2%AD%90']),div.MjjYud:has([href*='%E3%8A%99%EF%B8%8F'])

so.com##.tg-wrap-async
so.com##.res-mediav
so.com##.e_result
so.com##.c-title-tag
so.com##DIV.res-mediav-right
so.com##DIV.inner_left
so.com###so-activity-entry
so.com##DIV.tg-wrap
baidu.com##.ad-wrapper
baidu.com#?#.ec_wise_ad
sogou.com##.qb-download-banner-non-share
##DIV[data-text-ad]
##.ad-block
www.baidu.com##.result-op[tpl="right_game_recommend"]
www.baidu.com##div[id$="_canvas"]
www.baidu.com##style[id*="s-m"] + div[id^="m"]
www.baidu.com#?##content_left > div:not([class]) > div[data-placeid]
www.baidu.com#?##content_right > table > tbody > tr > td > div:not(#con-ar):not([class])
www.baidu.com#?#div:not([id]) > style[id^="s-"] + div[id]
www.baidu.com#?##content_left > [style*="important"]
www.baidu.com#?#div[id$="_canvas"]
www.baidu.com#?#.c-container:-abp-has(.t > a[data-landurl])
baidu.com##[class='result c-container new-pmd'][id='1'][tpl='se_com_default'][data-click='{']
baidu.com###content_right > table > tbody > tr > td > div:not(#con-ar):not([class])
baidu.com##.result-op[tpl='sp_hot_sale']
baidu.com##DIV#relativewords.se-relativewords.c-container.se-relativewords-new.c-bg-color-white
m.sm.cn##DIV.ad-alert-info
##.se-recommend-word-list-container
###se-recommend-word-list-container
##[class*="ball-wrapper"]
baidu.com##DIV#page-copyright.se-page-copyright[style='margin-bottom: 50px;']
baidu.com##DIV[style^='position: fixed; bottom: 0px; left: 0px; z-index: 300; width: 100%; height: 52px; background: rgb(255, 255, 255);']
##[ad_dot_url*="http"]
##.dl-banner-without-logo
##.ad_result
##[class="result c-container new-pmd"][id="1"][tpl="se_com_default"][data-click="{"]
##.biz_sponsor
##.b_algospacing
##[onmousedown*="ad"][h*="Ads"]
bing.com,cn.bing.net##li.b_ans:not(:has(h2))
bing.com,cn.bing.net##.pa_sb
bing.com,cn.bing.net##.adsMvC
bing.com,cn.bing.net##.pa_sb
bing.com,cn.bing.net##a[h$=",Ads"]
bing.com,cn.bing.net##a[href*="/aclick?ld="]
bing.com,cn.bing.net##.b_algo:has(.rms_img[src*="/th?id=OADD2."][src$="21.2"])
bing.com,cn.bing.net##.b_algo:has(.rms_img[src*="=AdsPlus"])
bing.com,cn.bing.net##li.b_ad
bing.com,cn.bing.net##.ad_sc
so.toutiao.com##DIV[id^='ad_']
so.douyin.com##[class*='h5-ad-']
so.douyin.com##[class^='layout-']
so.douyin.com##X-VIEW.inner.PrimaryBG-light
##[href^='http://yz.m.sm.cn/adclick']
`;

  const CRRE =
      /^(\[\$domain=)?(~?[\w-]+(?:\.[\w-]+)*(?:\.[\w-]+|\.\*)(?:(?:,|\|)~?[\w-]+(?:\.[\w-]+)*(?:\.[\w-]+|\.\*))*)?(?:])?(#@?\$?\??#)([^\s^+].*)/,
    CRFlags = ["##", "#@#", "#?#", "#@?#", "#$#", "#@$#", "#$?#", "#@$?#"],
    styleBoxes = ["genHideCss", "genExtraCss", "spcHideCss", "spcExtraCss"],
    dataBoxes = ["selectors", "extSelectors", "styles", "extStyles"];
  function makeRuleBox() {
    return {
      black: [],
      white: [],
    };
  }
  function domainChecker(domains) {
    const results = [],
      invResults = [],
      currDomain = location.hostname,
      urlSuffix = /\.+?[\w-]+$/.exec(currDomain);
    let totalResult = [0, false],
      black = false,
      white = false,
      match = false;
    domains.forEach((domain) => {
      const invert = domain[0] === "~";
      if (invert) domain = domain.slice(1);
      if (domain.endsWith(".*") && Array.isArray(urlSuffix)) {
        domain = domain.replace(".*", urlSuffix[0]);
      }
      const result = currDomain.endsWith(domain);
      if (invert) {
        if (result) white = true;
        invResults.push([domain.length, !result]);
      } else {
        if (result) black = true;
        results.push([domain.length, result]);
      }
    });
    if (results.length > 0 && !black) {
      match = false;
    } else if (invResults.length > 0 && !white) {
      match = true;
    } else {
      results.forEach((r) => {
        if (r[0] >= totalResult[0] && r[1]) {
          totalResult = r;
        }
      });
      invResults.forEach((r) => {
        if (r[0] >= totalResult[0] && !r[1]) {
          totalResult = r;
        }
      });
      match = totalResult[1];
    }
    return [match, results.length === 0];
  }
  function hasSome(str, arr) {
    return arr.some((word) => str.includes(word));
  }
  function ruleSpliter(rule) {
    const group = rule.match(CRRE);
    if (group) {
      const [, isDomain, place = "*", flag, sel] = group,
        type = CRFlags.indexOf(flag),
        matchResult =
          place === "*"
            ? [true, true]
            : domainChecker(place.split(isDomain ? "|" : ","));
      if (sel && matchResult[0]) {
        return {
          black: type % 2 ? "white" : "black",
          type: Math.floor(type / 2),
          place: (isDomain ? "|" : "") + place,
          generic: matchResult[1],
          sel,
        };
      }
    }
  }
  function ruleLoader(rule) {
    if (
      hasSome(rule, [
        ":matches-path(",
        ":min-text-length(",
        ":watch-attr(",
        ":-abp-properties(",
        ":matches-property(",
      ])
    )
      return;
    // 去掉开头末尾空格
    rule = rule.trim();
    // 如果 #$# 不包含 {} 就排除
    // 可以尽量排除 Snippet Filters
    if (
      /(?:\w|\*|]|^)#\$#/.test(rule) &&
      !/{\s*[a-zA-Z-]+\s*:\s*.+}\s*$/.test(rule)
    )
      return;
    // ## -> #?#
    if (
      /(?:\w|\*|]|^)#@?\$?#/.test(rule) &&
      hasSome(rule, [
        ":has(",
        ":-abp-has(",
        "[-ext-has=",
        ":has-text(",
        ":contains(",
        ":-abp-contains(",
        "[-ext-contains=",
        ":matches-css(",
        "[-ext-matches-css=",
        ":matches-css-before(",
        "[-ext-matches-css-before=",
        ":matches-css-after(",
        "[-ext-matches-css-after=",
        ":matches-attr(",
        ":nth-ancestor(",
        ":upward(",
        ":xpath(",
        ":remove()",
        ":not(",
      ])
    ) {
      rule = rule.replace(/(\w|\*|]|^)#(@?\$?)#/, "$1#$2?#");
    }
    // :style(...) 转换
    // example.com#?##id:style(color: red)
    // example.com#$?##id { color: red }
    if (rule.includes(":style(")) {
      rule = rule
        .replace(/(\w|\*|]|^)#(@?)(\??)#/, "$1#$2$$$3#")
        .replace(/:style\(\s*/, " { ")
        .replace(/\s*\)$/, " }");
    }
    return ruleSpliter(rule);
  }
  function ruleToCss(rule, preset) {
    var _a, _b;
    const isStyle = /}\s*$/.test(rule.sel);
    return [
      `/* ${rule.type}${rule.place} */ ${
        rule.sel + (!isStyle ? preset : "")
      } \n`,
      isStyle
        ? (_b =
            (_a = rule.sel.match(/^(.+?)\s*{\s*[a-zA-Z-]+\s*:\s*.+}\s*$/)) ===
              null || _a === void 0
              ? void 0
              : _a[1]) !== null && _b !== void 0
          ? _b
          : rule.sel
        : rule.sel,
    ];
  }

  const data = {
    disabled: false,
    saved: false,
    update: true,
    updating: false,
    receivedRules: "",
    customRules: defaultRules,
    allRules: "",
    genHideCss: "",
    genExtraCss: "",
    spcHideCss: "",
    spcExtraCss: "",
    selectors: makeRuleBox(),
    extSelectors: makeRuleBox(),
    styles: makeRuleBox(),
    extStyles: makeRuleBox(),
    bRules: [],
    appliedLevel: 0,
    appliedCount: 0,
    isFrame: cat.unsafeWindow.self !== cat.unsafeWindow.top,
    isClean: false,
    mutex: "__lemon__abp__parser__$__",
    preset: getUserConfig("css"),
    timeout: getUserConfig("timeout"),
    xTimeout: 1000,
    tryCount: getUserConfig("tryCount"),
    tryTimeout: getUserConfig("tryTimeout"),
  };
  function getUserConfig(prop) {
    {
      return userConfig[prop];
    }
  }
  function addStyle(css, pass = 0) {
    let el;
    if (pass >= data.tryCount) return;
    if (typeof cat.GM_addStyle == "function") {
      el = cat.GM_addStyle(css);
    } else {
      el = document.createElement("style");
      el.textContent = css;
      document.documentElement.appendChild(el);
    }
    if (typeof el == "object") {
    if (!el || !document.documentElement.contains(el)) {
      setTimeout(() => {
        addStyle(css, pass + 1);
      }, data.tryTimeout);
    }
  }
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  const NODE = {
    SELECTOR_LIST: "SelectorList",
    SELECTOR: "Selector",
    REGULAR_SELECTOR: "RegularSelector",
    EXTENDED_SELECTOR: "ExtendedSelector",
    ABSOLUTE_PSEUDO_CLASS: "AbsolutePseudoClass",
    RELATIVE_PSEUDO_CLASS: "RelativePseudoClass",
  };
  class AnySelectorNode {
    constructor(type) {
      _defineProperty(this, "children", []);
      this.type = type;
    }
    addChild(child) {
      this.children.push(child);
    }
  }
  class RegularSelectorNode extends AnySelectorNode {
    constructor(value) {
      super(NODE.REGULAR_SELECTOR);
      this.value = value;
    }
  }
  class RelativePseudoClassNode extends AnySelectorNode {
    constructor(name) {
      super(NODE.RELATIVE_PSEUDO_CLASS);
      this.name = name;
    }
  }
  class AbsolutePseudoClassNode extends AnySelectorNode {
    constructor(name) {
      super(NODE.ABSOLUTE_PSEUDO_CLASS);
      _defineProperty(this, "value", "");
      this.name = name;
    }
  }
  const LEFT_SQUARE_BRACKET = "[";
  const RIGHT_SQUARE_BRACKET = "]";
  const LEFT_PARENTHESIS = "(";
  const RIGHT_PARENTHESIS = ")";
  const LEFT_CURLY_BRACKET = "{";
  const RIGHT_CURLY_BRACKET = "}";
  const BRACKET = {
    SQUARE: {
      LEFT: LEFT_SQUARE_BRACKET,
      RIGHT: RIGHT_SQUARE_BRACKET,
    },
    PARENTHESES: {
      LEFT: LEFT_PARENTHESIS,
      RIGHT: RIGHT_PARENTHESIS,
    },
    CURLY: {
      LEFT: LEFT_CURLY_BRACKET,
      RIGHT: RIGHT_CURLY_BRACKET,
    },
  };
  const SLASH = "/";
  const BACKSLASH = "\\";
  const SPACE = " ";
  const COMMA = ",";
  const DOT = ".";
  const SEMICOLON = ";";
  const COLON = ":";
  const SINGLE_QUOTE = "'";
  const DOUBLE_QUOTE = '"';
  const CARET = "^";
  const DOLLAR_SIGN = "$";
  const EQUAL_SIGN = "=";
  const TAB = "\t";
  const CARRIAGE_RETURN = "\r";
  const LINE_FEED = "\n";
  const FORM_FEED = "\f";
  const WHITE_SPACE_CHARACTERS = [
    SPACE,
    TAB,
    CARRIAGE_RETURN,
    LINE_FEED,
    FORM_FEED,
  ];
  const ASTERISK = "*";
  const ID_MARKER = "#";
  const CLASS_MARKER = DOT;
  const DESCENDANT_COMBINATOR = SPACE;
  const CHILD_COMBINATOR = ">";
  const NEXT_SIBLING_COMBINATOR = "+";
  const SUBSEQUENT_SIBLING_COMBINATOR = "~";
  const COMBINATORS = [
    DESCENDANT_COMBINATOR,
    CHILD_COMBINATOR,
    NEXT_SIBLING_COMBINATOR,
    SUBSEQUENT_SIBLING_COMBINATOR,
  ];
  const SUPPORTED_SELECTOR_MARKS = [
    LEFT_SQUARE_BRACKET,
    RIGHT_SQUARE_BRACKET,
    LEFT_PARENTHESIS,
    RIGHT_PARENTHESIS,
    LEFT_CURLY_BRACKET,
    RIGHT_CURLY_BRACKET,
    SLASH,
    BACKSLASH,
    SEMICOLON,
    COLON,
    COMMA,
    SINGLE_QUOTE,
    DOUBLE_QUOTE,
    CARET,
    DOLLAR_SIGN,
    ASTERISK,
    ID_MARKER,
    CLASS_MARKER,
    DESCENDANT_COMBINATOR,
    CHILD_COMBINATOR,
    NEXT_SIBLING_COMBINATOR,
    SUBSEQUENT_SIBLING_COMBINATOR,
    TAB,
    CARRIAGE_RETURN,
    LINE_FEED,
    FORM_FEED,
  ];
  const SUPPORTED_STYLE_DECLARATION_MARKS = [
    COLON,
    SEMICOLON,
    SINGLE_QUOTE,
    DOUBLE_QUOTE,
    BACKSLASH,
    SPACE,
    TAB,
    CARRIAGE_RETURN,
    LINE_FEED,
    FORM_FEED,
  ];
  const CONTAINS_PSEUDO = "contains";
  const HAS_TEXT_PSEUDO = "has-text";
  const ABP_CONTAINS_PSEUDO = "-abp-contains";
  const MATCHES_CSS_PSEUDO = "matches-css";
  const MATCHES_CSS_BEFORE_PSEUDO = "matches-css-before";
  const MATCHES_CSS_AFTER_PSEUDO = "matches-css-after";
  const MATCHES_ATTR_PSEUDO_CLASS_MARKER = "matches-attr";
  const MATCHES_PROPERTY_PSEUDO_CLASS_MARKER = "matches-property";
  const XPATH_PSEUDO_CLASS_MARKER = "xpath";
  const NTH_ANCESTOR_PSEUDO_CLASS_MARKER = "nth-ancestor";
  const CONTAINS_PSEUDO_NAMES = [
    CONTAINS_PSEUDO,
    HAS_TEXT_PSEUDO,
    ABP_CONTAINS_PSEUDO,
  ];
  const UPWARD_PSEUDO_CLASS_MARKER = "upward";
  const REMOVE_PSEUDO_MARKER = "remove";
  const HAS_PSEUDO_CLASS_MARKER = "has";
  const ABP_HAS_PSEUDO_CLASS_MARKER = "-abp-has";
  const HAS_PSEUDO_CLASS_MARKERS = [
    HAS_PSEUDO_CLASS_MARKER,
    ABP_HAS_PSEUDO_CLASS_MARKER,
  ];
  const IS_PSEUDO_CLASS_MARKER = "is";
  const NOT_PSEUDO_CLASS_MARKER = "not";
  const ABSOLUTE_PSEUDO_CLASSES = [
    CONTAINS_PSEUDO,
    HAS_TEXT_PSEUDO,
    ABP_CONTAINS_PSEUDO,
    MATCHES_CSS_PSEUDO,
    MATCHES_CSS_BEFORE_PSEUDO,
    MATCHES_CSS_AFTER_PSEUDO,
    MATCHES_ATTR_PSEUDO_CLASS_MARKER,
    MATCHES_PROPERTY_PSEUDO_CLASS_MARKER,
    XPATH_PSEUDO_CLASS_MARKER,
    NTH_ANCESTOR_PSEUDO_CLASS_MARKER,
    UPWARD_PSEUDO_CLASS_MARKER,
  ];
  const RELATIVE_PSEUDO_CLASSES = [
    ...HAS_PSEUDO_CLASS_MARKERS,
    IS_PSEUDO_CLASS_MARKER,
    NOT_PSEUDO_CLASS_MARKER,
  ];
  const SUPPORTED_PSEUDO_CLASSES = [
    ...ABSOLUTE_PSEUDO_CLASSES,
    ...RELATIVE_PSEUDO_CLASSES,
  ];
  const OPTIMIZATION_PSEUDO_CLASSES = [
    NOT_PSEUDO_CLASS_MARKER,
    IS_PSEUDO_CLASS_MARKER,
  ];
  const SCOPE_CSS_PSEUDO_CLASS = ":scope";
  const REGULAR_PSEUDO_ELEMENTS = {
    AFTER: "after",
    BACKDROP: "backdrop",
    BEFORE: "before",
    CUE: "cue",
    CUE_REGION: "cue-region",
    FIRST_LETTER: "first-letter",
    FIRST_LINE: "first-line",
    FILE_SELECTION_BUTTON: "file-selector-button",
    GRAMMAR_ERROR: "grammar-error",
    MARKER: "marker",
    PART: "part",
    PLACEHOLDER: "placeholder",
    SELECTION: "selection",
    SLOTTED: "slotted",
    SPELLING_ERROR: "spelling-error",
    TARGET_TEXT: "target-text",
  };
  const AT_RULE_MARKER = "@";
  const CONTENT_CSS_PROPERTY = "content";
  const PSEUDO_PROPERTY_POSITIVE_VALUE = "true";
  const DEBUG_PSEUDO_PROPERTY_GLOBAL_VALUE = "global";
  const NO_SELECTOR_ERROR_PREFIX = "Selector should be defined";
  const STYLE_ERROR_PREFIX = {
    NO_STYLE: "No style declaration found",
    NO_SELECTOR: `${NO_SELECTOR_ERROR_PREFIX} before style declaration in stylesheet`,
    INVALID_STYLE: "Invalid style declaration",
    UNCLOSED_STYLE: "Unclosed style declaration",
    NO_PROPERTY: "Missing style property in declaration",
    NO_VALUE: "Missing style value in declaration",
    NO_STYLE_OR_REMOVE:
      "Style should be declared or :remove() pseudo-class should used",
    NO_COMMENT: "Comments are not supported",
  };
  const NO_AT_RULE_ERROR_PREFIX = "At-rules are not supported";
  const REMOVE_ERROR_PREFIX = {
    INVALID_REMOVE: "Invalid :remove() pseudo-class in selector",
    NO_TARGET_SELECTOR: `${NO_SELECTOR_ERROR_PREFIX} before :remove() pseudo-class`,
    MULTIPLE_USAGE: "Pseudo-class :remove() appears more than once in selector",
    INVALID_POSITION: "Pseudo-class :remove() should be at the end of selector",
  };
  const MATCHING_ELEMENT_ERROR_PREFIX = "Error while matching element";
  const MAX_STYLE_PROTECTION_COUNT = 50;
  const REGEXP_VALID_OLD_SYNTAX =
    /\[-(?:ext)-([a-z-_]+)=(["'])((?:(?=(\\?))\4.)*?)\2\]/g;
  const INVALID_OLD_SYNTAX_MARKER = "[-ext-";
  const evaluateMatch = (match, name, quoteChar, rawValue) => {
    const re = new RegExp(`([^\\\\]|^)\\\\${quoteChar}`, "g");
    const value = rawValue.replace(re, `$1${quoteChar}`);
    return `:${name}(${value})`;
  };
  const SCOPE_MARKER_REGEXP = /\(:scope >/g;
  const SCOPE_REPLACER = "(>";
  const MATCHES_CSS_PSEUDO_ELEMENT_REGEXP = /(:matches-css)-(before|after)\(/g;
  const convertMatchesCss = (
    match,
    extendedPseudoClass,
    regularPseudoElement
  ) => {
    return `${extendedPseudoClass}${BRACKET.PARENTHESES.LEFT}${regularPseudoElement}${COMMA}`;
  };
  const normalize = (selector) => {
    const normalizedSelector = selector
      .replace(REGEXP_VALID_OLD_SYNTAX, evaluateMatch)
      .replace(SCOPE_MARKER_REGEXP, SCOPE_REPLACER)
      .replace(MATCHES_CSS_PSEUDO_ELEMENT_REGEXP, convertMatchesCss);
    if (normalizedSelector.includes(INVALID_OLD_SYNTAX_MARKER)) {
      throw new Error(
        `Invalid extended-css old syntax selector: '${selector}'`
      );
    }
    return normalizedSelector;
  };
  const convert = (rawSelector) => {
    const trimmedSelector = rawSelector.trim();
    return normalize(trimmedSelector);
  };
  const TOKEN_TYPE = {
    MARK: "mark",
    WORD: "word",
  };
  const tokenize = (input, supportedMarks) => {
    let wordBuffer = "";
    const tokens = [];
    const selectorSymbols = input.split("");
    selectorSymbols.forEach((symbol) => {
      if (supportedMarks.includes(symbol)) {
        if (wordBuffer.length > 0) {
          tokens.push({
            type: TOKEN_TYPE.WORD,
            value: wordBuffer,
          });
          wordBuffer = "";
        }
        tokens.push({
          type: TOKEN_TYPE.MARK,
          value: symbol,
        });
        return;
      }
      wordBuffer += symbol;
    });
    if (wordBuffer.length > 0) {
      tokens.push({
        type: TOKEN_TYPE.WORD,
        value: wordBuffer,
      });
    }
    return tokens;
  };
  const tokenizeSelector = (rawSelector) => {
    const selector = convert(rawSelector);
    return tokenize(selector, SUPPORTED_SELECTOR_MARKS);
  };
  const tokenizeAttribute = (attribute) => {
    return tokenize(attribute, [...SUPPORTED_SELECTOR_MARKS, EQUAL_SIGN]);
  };
  const flatten = (input) => {
    const stack = [];
    input.forEach((el) => stack.push(el));
    const res = [];
    while (stack.length) {
      const next = stack.pop();
      if (!next) {
        throw new Error("Unable to make array flat");
      }
      if (Array.isArray(next)) {
        next.forEach((el) => stack.push(el));
      } else {
        res.push(next);
      }
    }
    return res.reverse();
  };
  const getFirst = (array) => {
    return array[0];
  };
  const getLast = (array) => {
    return array[array.length - 1];
  };
  const getPrevToLast = (array) => {
    return array[array.length - 2];
  };
  const getItemByIndex = (array, index, errorMessage) => {
    const indexChild = array[index];
    if (!indexChild) {
      throw new Error(errorMessage || `No array item found by index ${index}`);
    }
    return indexChild;
  };
  const NO_REGULAR_SELECTOR_ERROR =
    "At least one of Selector node children should be RegularSelector";
  const isSelectorListNode = (astNode) => {
    return (
      (astNode === null || astNode === void 0 ? void 0 : astNode.type) ===
      NODE.SELECTOR_LIST
    );
  };
  const isSelectorNode = (astNode) => {
    return (
      (astNode === null || astNode === void 0 ? void 0 : astNode.type) ===
      NODE.SELECTOR
    );
  };
  const isRegularSelectorNode = (astNode) => {
    return (
      (astNode === null || astNode === void 0 ? void 0 : astNode.type) ===
      NODE.REGULAR_SELECTOR
    );
  };
  const isExtendedSelectorNode = (astNode) => {
    return astNode.type === NODE.EXTENDED_SELECTOR;
  };
  const isAbsolutePseudoClassNode = (astNode) => {
    return (
      (astNode === null || astNode === void 0 ? void 0 : astNode.type) ===
      NODE.ABSOLUTE_PSEUDO_CLASS
    );
  };
  const isRelativePseudoClassNode = (astNode) => {
    return (
      (astNode === null || astNode === void 0 ? void 0 : astNode.type) ===
      NODE.RELATIVE_PSEUDO_CLASS
    );
  };
  const getNodeName = (astNode) => {
    if (astNode === null) {
      throw new Error("Ast node should be defined");
    }
    if (
      !isAbsolutePseudoClassNode(astNode) &&
      !isRelativePseudoClassNode(astNode)
    ) {
      throw new Error(
        "Only AbsolutePseudoClass or RelativePseudoClass ast node can have a name"
      );
    }
    if (!astNode.name) {
      throw new Error("Extended pseudo-class should have a name");
    }
    return astNode.name;
  };
  const getNodeValue = (astNode, errorMessage) => {
    if (astNode === null) {
      throw new Error("Ast node should be defined");
    }
    if (
      !isRegularSelectorNode(astNode) &&
      !isAbsolutePseudoClassNode(astNode)
    ) {
      throw new Error(
        "Only RegularSelector ot AbsolutePseudoClass ast node can have a value"
      );
    }
    if (!astNode.value) {
      throw new Error(
        errorMessage ||
          "Ast RegularSelector ot AbsolutePseudoClass node should have a value"
      );
    }
    return astNode.value;
  };
  const getRegularSelectorNodes = (children) => {
    return children.filter(isRegularSelectorNode);
  };
  const getFirstRegularChild = (children, errorMessage) => {
    const regularSelectorNodes = getRegularSelectorNodes(children);
    const firstRegularSelectorNode = getFirst(regularSelectorNodes);
    if (!firstRegularSelectorNode) {
      throw new Error(errorMessage || NO_REGULAR_SELECTOR_ERROR);
    }
    return firstRegularSelectorNode;
  };
  const getLastRegularChild = (children) => {
    const regularSelectorNodes = getRegularSelectorNodes(children);
    const lastRegularSelectorNode = getLast(regularSelectorNodes);
    if (!lastRegularSelectorNode) {
      throw new Error(NO_REGULAR_SELECTOR_ERROR);
    }
    return lastRegularSelectorNode;
  };
  const getNodeOnlyChild = (node, errorMessage) => {
    if (node.children.length !== 1) {
      throw new Error(errorMessage);
    }
    const onlyChild = getFirst(node.children);
    if (!onlyChild) {
      throw new Error(errorMessage);
    }
    return onlyChild;
  };
  const getPseudoClassNode = (extendedSelectorNode) => {
    return getNodeOnlyChild(
      extendedSelectorNode,
      "Extended selector should be specified"
    );
  };
  const getRelativeSelectorListNode = (pseudoClassNode) => {
    if (!isRelativePseudoClassNode(pseudoClassNode)) {
      throw new Error(
        "Only RelativePseudoClass node can have relative SelectorList node as child"
      );
    }
    return getNodeOnlyChild(
      pseudoClassNode,
      `Missing arg for :${getNodeName(pseudoClassNode)}() pseudo-class`
    );
  };
  const ATTRIBUTE_CASE_INSENSITIVE_FLAG = "i";
  const POSSIBLE_MARKS_BEFORE_REGEXP = {
    COMMON: [
      BRACKET.PARENTHESES.LEFT,
      SINGLE_QUOTE,
      DOUBLE_QUOTE,
      EQUAL_SIGN,
      DOT,
      COLON,
      SPACE,
    ],
    CONTAINS: [BRACKET.PARENTHESES.LEFT, SINGLE_QUOTE, DOUBLE_QUOTE],
  };
  const isSupportedPseudoClass = (tokenValue) => {
    return SUPPORTED_PSEUDO_CLASSES.includes(tokenValue);
  };
  const isOptimizationPseudoClass = (name) => {
    return OPTIMIZATION_PSEUDO_CLASSES.includes(name);
  };
  const doesRegularContinueAfterSpace = (nextTokenType, nextTokenValue) => {
    if (!nextTokenType || !nextTokenValue) {
      return false;
    }
    return (
      COMBINATORS.includes(nextTokenValue) ||
      nextTokenType === TOKEN_TYPE.WORD ||
      nextTokenValue === ASTERISK ||
      nextTokenValue === ID_MARKER ||
      nextTokenValue === CLASS_MARKER ||
      nextTokenValue === COLON ||
      nextTokenValue === SINGLE_QUOTE ||
      nextTokenValue === DOUBLE_QUOTE ||
      nextTokenValue === BRACKET.SQUARE.LEFT
    );
  };
  const isRegexpOpening = (context, prevTokenValue, bufferNodeValue) => {
    const lastExtendedPseudoClassName = getLast(
      context.extendedPseudoNamesStack
    );
    if (!lastExtendedPseudoClassName) {
      throw new Error(
        "Regexp pattern allowed only in arg of extended pseudo-class"
      );
    }
    if (CONTAINS_PSEUDO_NAMES.includes(lastExtendedPseudoClassName)) {
      return POSSIBLE_MARKS_BEFORE_REGEXP.CONTAINS.includes(prevTokenValue);
    }
    if (
      prevTokenValue === SLASH &&
      lastExtendedPseudoClassName !== XPATH_PSEUDO_CLASS_MARKER
    ) {
      const rawArgDesc = bufferNodeValue
        ? `in arg part: '${bufferNodeValue}'`
        : "arg";
      throw new Error(
        `Invalid regexp pattern for :${lastExtendedPseudoClassName}() pseudo-class ${rawArgDesc}`
      );
    }
    return POSSIBLE_MARKS_BEFORE_REGEXP.COMMON.includes(prevTokenValue);
  };
  const isAttributeOpening = (tokenValue, prevTokenValue) => {
    return tokenValue === BRACKET.SQUARE.LEFT && prevTokenValue !== BACKSLASH;
  };
  const isAttributeClosing = (context) => {
    var _getPrevToLast;
    if (!context.isAttributeBracketsOpen) {
      return false;
    }
    const noSpaceAttr = context.attributeBuffer.split(SPACE).join("");
    const attrTokens = tokenizeAttribute(noSpaceAttr);
    const firstAttrToken = getFirst(attrTokens);
    const firstAttrTokenType =
      firstAttrToken === null || firstAttrToken === void 0
        ? void 0
        : firstAttrToken.type;
    const firstAttrTokenValue =
      firstAttrToken === null || firstAttrToken === void 0
        ? void 0
        : firstAttrToken.value;
    if (
      firstAttrTokenType === TOKEN_TYPE.MARK &&
      firstAttrTokenValue !== BACKSLASH
    ) {
      throw new Error(
        `'[${context.attributeBuffer}]' is not a valid attribute due to '${firstAttrTokenValue}' at start of it`
      );
    }
    const lastAttrToken = getLast(attrTokens);
    const lastAttrTokenType =
      lastAttrToken === null || lastAttrToken === void 0
        ? void 0
        : lastAttrToken.type;
    const lastAttrTokenValue =
      lastAttrToken === null || lastAttrToken === void 0
        ? void 0
        : lastAttrToken.value;
    if (lastAttrTokenValue === EQUAL_SIGN) {
      throw new Error(
        `'[${context.attributeBuffer}]' is not a valid attribute due to '${EQUAL_SIGN}'`
      );
    }
    const equalSignIndex = attrTokens.findIndex((token) => {
      return token.type === TOKEN_TYPE.MARK && token.value === EQUAL_SIGN;
    });
    const prevToLastAttrTokenValue =
      (_getPrevToLast = getPrevToLast(attrTokens)) === null ||
      _getPrevToLast === void 0
        ? void 0
        : _getPrevToLast.value;
    if (equalSignIndex === -1) {
      if (lastAttrTokenType === TOKEN_TYPE.WORD) {
        return true;
      }
      return (
        prevToLastAttrTokenValue === BACKSLASH &&
        (lastAttrTokenValue === DOUBLE_QUOTE ||
          lastAttrTokenValue === SINGLE_QUOTE)
      );
    }
    const nextToEqualSignToken = getItemByIndex(attrTokens, equalSignIndex + 1);
    const nextToEqualSignTokenValue = nextToEqualSignToken.value;
    const isAttrValueQuote =
      nextToEqualSignTokenValue === SINGLE_QUOTE ||
      nextToEqualSignTokenValue === DOUBLE_QUOTE;
    if (!isAttrValueQuote) {
      if (lastAttrTokenType === TOKEN_TYPE.WORD) {
        return true;
      }
      throw new Error(
        `'[${context.attributeBuffer}]' is not a valid attribute`
      );
    }
    if (
      lastAttrTokenType === TOKEN_TYPE.WORD &&
      (lastAttrTokenValue === null || lastAttrTokenValue === void 0
        ? void 0
        : lastAttrTokenValue.toLocaleLowerCase()) ===
        ATTRIBUTE_CASE_INSENSITIVE_FLAG
    ) {
      return prevToLastAttrTokenValue === nextToEqualSignTokenValue;
    }
    return lastAttrTokenValue === nextToEqualSignTokenValue;
  };
  const isWhiteSpaceChar = (tokenValue) => {
    if (!tokenValue) {
      return false;
    }
    return WHITE_SPACE_CHARACTERS.includes(tokenValue);
  };
  const isAbsolutePseudoClass = (str) => {
    return ABSOLUTE_PSEUDO_CLASSES.includes(str);
  };
  const isRelativePseudoClass = (str) => {
    return RELATIVE_PSEUDO_CLASSES.includes(str);
  };
  const getBufferNode = (context) => {
    if (context.pathToBufferNode.length === 0) {
      return null;
    }
    return getLast(context.pathToBufferNode) || null;
  };
  const getBufferNodeParent = (context) => {
    if (context.pathToBufferNode.length < 2) {
      return null;
    }
    return getPrevToLast(context.pathToBufferNode) || null;
  };
  const getContextLastRegularSelectorNode = (context) => {
    const bufferNode = getBufferNode(context);
    if (!bufferNode) {
      throw new Error("No bufferNode found");
    }
    if (!isSelectorNode(bufferNode)) {
      throw new Error("Unsupported bufferNode type");
    }
    const lastRegularSelectorNode = getLastRegularChild(bufferNode.children);
    context.pathToBufferNode.push(lastRegularSelectorNode);
    return lastRegularSelectorNode;
  };
  const updateBufferNode = (context, tokenValue) => {
    const bufferNode = getBufferNode(context);
    if (bufferNode === null) {
      throw new Error("No bufferNode to update");
    }
    if (isAbsolutePseudoClassNode(bufferNode)) {
      bufferNode.value += tokenValue;
    } else if (isRegularSelectorNode(bufferNode)) {
      bufferNode.value += tokenValue;
      if (context.isAttributeBracketsOpen) {
        context.attributeBuffer += tokenValue;
      }
    } else {
      throw new Error(
        `${bufferNode.type} node cannot be updated. Only RegularSelector and AbsolutePseudoClass are supported`
      );
    }
  };
  const addSelectorListNode = (context) => {
    const selectorListNode = new AnySelectorNode(NODE.SELECTOR_LIST);
    context.ast = selectorListNode;
    context.pathToBufferNode.push(selectorListNode);
  };
  const addAstNodeByType = function (context, type) {
    let tokenValue =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
    const bufferNode = getBufferNode(context);
    if (bufferNode === null) {
      throw new Error("No buffer node");
    }
    let node;
    if (type === NODE.REGULAR_SELECTOR) {
      node = new RegularSelectorNode(tokenValue);
    } else if (type === NODE.ABSOLUTE_PSEUDO_CLASS) {
      node = new AbsolutePseudoClassNode(tokenValue);
    } else if (type === NODE.RELATIVE_PSEUDO_CLASS) {
      node = new RelativePseudoClassNode(tokenValue);
    } else {
      node = new AnySelectorNode(type);
    }
    bufferNode.addChild(node);
    context.pathToBufferNode.push(node);
  };
  const initAst = (context, tokenValue) => {
    addSelectorListNode(context);
    addAstNodeByType(context, NODE.SELECTOR);
    addAstNodeByType(context, NODE.REGULAR_SELECTOR, tokenValue);
  };
  const initRelativeSubtree = function (context) {
    let tokenValue =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    addAstNodeByType(context, NODE.SELECTOR_LIST);
    addAstNodeByType(context, NODE.SELECTOR);
    addAstNodeByType(context, NODE.REGULAR_SELECTOR, tokenValue);
  };
  const upToClosest = (context, parentType) => {
    for (let i = context.pathToBufferNode.length - 1; i >= 0; i -= 1) {
      var _context$pathToBuffer;
      if (
        ((_context$pathToBuffer = context.pathToBufferNode[i]) === null ||
        _context$pathToBuffer === void 0
          ? void 0
          : _context$pathToBuffer.type) === parentType
      ) {
        context.pathToBufferNode = context.pathToBufferNode.slice(0, i + 1);
        break;
      }
    }
  };
  const getUpdatedBufferNode = (context) => {
    const bufferNode = getBufferNode(context);
    if (
      bufferNode &&
      isSelectorListNode(bufferNode) &&
      isRelativePseudoClassNode(getBufferNodeParent(context))
    ) {
      return bufferNode;
    }
    upToClosest(context, NODE.SELECTOR);
    const selectorNode = getBufferNode(context);
    if (!selectorNode) {
      throw new Error(
        "No SelectorNode, impossible to continue selector parsing by ExtendedCss"
      );
    }
    const lastSelectorNodeChild = getLast(selectorNode.children);
    const hasExtended =
      lastSelectorNodeChild &&
      isExtendedSelectorNode(lastSelectorNodeChild) &&
      context.standardPseudoBracketsStack.length === 0;
    const supposedPseudoClassNode =
      hasExtended && getFirst(lastSelectorNodeChild.children);
    let newNeededBufferNode = selectorNode;
    if (supposedPseudoClassNode) {
      const lastExtendedPseudoName =
        hasExtended && supposedPseudoClassNode.name;
      const isLastExtendedNameRelative =
        lastExtendedPseudoName && isRelativePseudoClass(lastExtendedPseudoName);
      const isLastExtendedNameAbsolute =
        lastExtendedPseudoName && isAbsolutePseudoClass(lastExtendedPseudoName);
      const hasRelativeExtended =
        isLastExtendedNameRelative &&
        context.extendedPseudoBracketsStack.length > 0 &&
        context.extendedPseudoBracketsStack.length ===
          context.extendedPseudoNamesStack.length;
      const hasAbsoluteExtended =
        isLastExtendedNameAbsolute &&
        lastExtendedPseudoName === getLast(context.extendedPseudoNamesStack);
      if (hasRelativeExtended) {
        context.pathToBufferNode.push(lastSelectorNodeChild);
        newNeededBufferNode = supposedPseudoClassNode;
      } else if (hasAbsoluteExtended) {
        context.pathToBufferNode.push(lastSelectorNodeChild);
        newNeededBufferNode = supposedPseudoClassNode;
      }
    } else if (hasExtended) {
      newNeededBufferNode = selectorNode;
    } else {
      newNeededBufferNode = getContextLastRegularSelectorNode(context);
    }
    context.pathToBufferNode.push(newNeededBufferNode);
    return newNeededBufferNode;
  };
  const handleNextTokenOnColon = (
    context,
    selector,
    tokenValue,
    nextTokenValue,
    nextToNextTokenValue
  ) => {
    if (!nextTokenValue) {
      throw new Error(
        `Invalid colon ':' at the end of selector: '${selector}'`
      );
    }
    if (!isSupportedPseudoClass(nextTokenValue.toLowerCase())) {
      if (nextTokenValue.toLowerCase() === REMOVE_PSEUDO_MARKER) {
        throw new Error(`${REMOVE_ERROR_PREFIX.INVALID_REMOVE}: '${selector}'`);
      }
      updateBufferNode(context, tokenValue);
      if (
        nextToNextTokenValue &&
        nextToNextTokenValue === BRACKET.PARENTHESES.LEFT &&
        !context.isAttributeBracketsOpen
      ) {
        context.standardPseudoNamesStack.push(nextTokenValue);
      }
    } else {
      if (
        HAS_PSEUDO_CLASS_MARKERS.includes(nextTokenValue) &&
        context.standardPseudoNamesStack.length > 0
      ) {
        throw new Error(
          `Usage of :${nextTokenValue}() pseudo-class is not allowed inside regular pseudo: '${getLast(
            context.standardPseudoNamesStack
          )}'`
        );
      } else {
        upToClosest(context, NODE.SELECTOR);
        addAstNodeByType(context, NODE.EXTENDED_SELECTOR);
      }
    }
  };
  const IS_OR_NOT_PSEUDO_SELECTING_ROOT = `html ${ASTERISK}`;
  const hasExtendedSelector = (selectorList) => {
    return selectorList.children.some((selectorNode) => {
      return selectorNode.children.some((selectorNodeChild) => {
        return isExtendedSelectorNode(selectorNodeChild);
      });
    });
  };
  const selectorListOfRegularsToString = (selectorList) => {
    const standardCssSelectors = selectorList.children.map((selectorNode) => {
      const selectorOnlyChild = getNodeOnlyChild(
        selectorNode,
        "Ast Selector node should have RegularSelector node"
      );
      return getNodeValue(selectorOnlyChild);
    });
    return standardCssSelectors.join(`${COMMA}${SPACE}`);
  };
  const updateNodeChildren = (node, newChildren) => {
    node.children = newChildren;
    return node;
  };
  const shouldOptimizeExtendedSelector = (currExtendedSelectorNode) => {
    if (currExtendedSelectorNode === null) {
      return false;
    }
    const extendedPseudoClassNode = getPseudoClassNode(
      currExtendedSelectorNode
    );
    const pseudoName = getNodeName(extendedPseudoClassNode);
    if (isAbsolutePseudoClass(pseudoName)) {
      return false;
    }
    const relativeSelectorList = getRelativeSelectorListNode(
      extendedPseudoClassNode
    );
    const innerSelectorNodes = relativeSelectorList.children;
    if (isOptimizationPseudoClass(pseudoName)) {
      const areAllSelectorNodeChildrenRegular = innerSelectorNodes.every(
        (selectorNode) => {
          try {
            const selectorOnlyChild = getNodeOnlyChild(
              selectorNode,
              "Selector node should have RegularSelector"
            );
            return isRegularSelectorNode(selectorOnlyChild);
          } catch (e) {
            return false;
          }
        }
      );
      if (areAllSelectorNodeChildrenRegular) {
        return true;
      }
    }
    return innerSelectorNodes.some((selectorNode) => {
      return selectorNode.children.some((selectorNodeChild) => {
        if (!isExtendedSelectorNode(selectorNodeChild)) {
          return false;
        }
        return shouldOptimizeExtendedSelector(selectorNodeChild);
      });
    });
  };
  const getOptimizedExtendedSelector = (
    currExtendedSelectorNode,
    prevRegularSelectorNode
  ) => {
    if (!currExtendedSelectorNode) {
      return null;
    }
    const extendedPseudoClassNode = getPseudoClassNode(
      currExtendedSelectorNode
    );
    const relativeSelectorList = getRelativeSelectorListNode(
      extendedPseudoClassNode
    );
    const hasInnerExtendedSelector = hasExtendedSelector(relativeSelectorList);
    if (!hasInnerExtendedSelector) {
      const relativeSelectorListStr =
        selectorListOfRegularsToString(relativeSelectorList);
      const pseudoName = getNodeName(extendedPseudoClassNode);
      const optimizedExtendedStr = `${COLON}${pseudoName}${BRACKET.PARENTHESES.LEFT}${relativeSelectorListStr}${BRACKET.PARENTHESES.RIGHT}`;
      prevRegularSelectorNode.value = `${getNodeValue(
        prevRegularSelectorNode
      )}${optimizedExtendedStr}`;
      return null;
    }
    const optimizedRelativeSelectorList =
      optimizeSelectorListNode(relativeSelectorList);
    const optimizedExtendedPseudoClassNode = updateNodeChildren(
      extendedPseudoClassNode,
      [optimizedRelativeSelectorList]
    );
    return updateNodeChildren(currExtendedSelectorNode, [
      optimizedExtendedPseudoClassNode,
    ]);
  };
  const optimizeCurrentRegularSelector = (current, previous) => {
    previous.value = `${getNodeValue(previous)}${SPACE}${getNodeValue(
      current
    )}`;
  };
  const optimizeSelectorNode = (selectorNode) => {
    const rawSelectorNodeChildren = selectorNode.children;
    const optimizedChildrenList = [];
    let currentIndex = 0;
    while (currentIndex < rawSelectorNodeChildren.length) {
      const currentChild = getItemByIndex(
        rawSelectorNodeChildren,
        currentIndex,
        "currentChild should be specified"
      );
      if (currentIndex === 0) {
        optimizedChildrenList.push(currentChild);
      } else {
        const prevRegularChild = getLastRegularChild(optimizedChildrenList);
        if (isExtendedSelectorNode(currentChild)) {
          let optimizedExtendedSelector = null;
          let isOptimizationNeeded =
            shouldOptimizeExtendedSelector(currentChild);
          optimizedExtendedSelector = currentChild;
          while (isOptimizationNeeded) {
            optimizedExtendedSelector = getOptimizedExtendedSelector(
              optimizedExtendedSelector,
              prevRegularChild
            );
            isOptimizationNeeded = shouldOptimizeExtendedSelector(
              optimizedExtendedSelector
            );
          }
          if (optimizedExtendedSelector !== null) {
            optimizedChildrenList.push(optimizedExtendedSelector);
            const optimizedPseudoClass = getPseudoClassNode(
              optimizedExtendedSelector
            );
            const optimizedPseudoName = getNodeName(optimizedPseudoClass);
            if (
              getNodeValue(prevRegularChild) === ASTERISK &&
              isOptimizationPseudoClass(optimizedPseudoName)
            ) {
              prevRegularChild.value = IS_OR_NOT_PSEUDO_SELECTING_ROOT;
            }
          }
        } else if (isRegularSelectorNode(currentChild)) {
          const lastOptimizedChild = getLast(optimizedChildrenList) || null;
          if (isRegularSelectorNode(lastOptimizedChild)) {
            optimizeCurrentRegularSelector(currentChild, prevRegularChild);
          }
        }
      }
      currentIndex += 1;
    }
    return updateNodeChildren(selectorNode, optimizedChildrenList);
  };
  const optimizeSelectorListNode = (selectorListNode) => {
    return updateNodeChildren(
      selectorListNode,
      selectorListNode.children.map((s) => optimizeSelectorNode(s))
    );
  };
  const optimizeAst = (ast) => {
    return optimizeSelectorListNode(ast);
  };
  const XPATH_PSEUDO_SELECTING_ROOT = "body";
  const NO_WHITESPACE_ERROR_PREFIX =
    "No white space is allowed before or after extended pseudo-class name in selector";
  const parse = (selector) => {
    const tokens = tokenizeSelector(selector);
    const context = {
      ast: null,
      pathToBufferNode: [],
      extendedPseudoNamesStack: [],
      extendedPseudoBracketsStack: [],
      standardPseudoNamesStack: [],
      standardPseudoBracketsStack: [],
      isAttributeBracketsOpen: false,
      attributeBuffer: "",
      isRegexpOpen: false,
      shouldOptimize: false,
    };
    let i = 0;
    while (i < tokens.length) {
      const token = tokens[i];
      if (!token) {
        break;
      }
      const { type: tokenType, value: tokenValue } = token;
      const nextToken = tokens[i + 1];
      const nextTokenType =
        nextToken === null || nextToken === void 0 ? void 0 : nextToken.type;
      const nextTokenValue =
        nextToken === null || nextToken === void 0 ? void 0 : nextToken.value;
      const nextToNextToken = tokens[i + 2];
      const nextToNextTokenValue =
        nextToNextToken === null || nextToNextToken === void 0
          ? void 0
          : nextToNextToken.value;
      const previousToken = tokens[i - 1];
      const prevTokenType =
        previousToken === null || previousToken === void 0
          ? void 0
          : previousToken.type;
      const prevTokenValue =
        previousToken === null || previousToken === void 0
          ? void 0
          : previousToken.value;
      const previousToPreviousToken = tokens[i - 2];
      const prevToPrevTokenValue =
        previousToPreviousToken === null || previousToPreviousToken === void 0
          ? void 0
          : previousToPreviousToken.value;
      let bufferNode = getBufferNode(context);
      switch (tokenType) {
        case TOKEN_TYPE.WORD:
          if (bufferNode === null) {
            initAst(context, tokenValue);
          } else if (isSelectorListNode(bufferNode)) {
            addAstNodeByType(context, NODE.SELECTOR);
            addAstNodeByType(context, NODE.REGULAR_SELECTOR, tokenValue);
          } else if (isRegularSelectorNode(bufferNode)) {
            updateBufferNode(context, tokenValue);
          } else if (isExtendedSelectorNode(bufferNode)) {
            if (
              isWhiteSpaceChar(nextTokenValue) &&
              nextToNextTokenValue === BRACKET.PARENTHESES.LEFT
            ) {
              throw new Error(`${NO_WHITESPACE_ERROR_PREFIX}: '${selector}'`);
            }
            const lowerCaseTokenValue = tokenValue.toLowerCase();
            context.extendedPseudoNamesStack.push(lowerCaseTokenValue);
            if (isAbsolutePseudoClass(lowerCaseTokenValue)) {
              addAstNodeByType(
                context,
                NODE.ABSOLUTE_PSEUDO_CLASS,
                lowerCaseTokenValue
              );
            } else {
              addAstNodeByType(
                context,
                NODE.RELATIVE_PSEUDO_CLASS,
                lowerCaseTokenValue
              );
              if (isOptimizationPseudoClass(lowerCaseTokenValue)) {
                context.shouldOptimize = true;
              }
            }
          } else if (isAbsolutePseudoClassNode(bufferNode)) {
            updateBufferNode(context, tokenValue);
          } else if (isRelativePseudoClassNode(bufferNode)) {
            initRelativeSubtree(context, tokenValue);
          }
          break;
        case TOKEN_TYPE.MARK:
          switch (tokenValue) {
            case COMMA:
              if (
                !bufferNode ||
                (typeof bufferNode !== "undefined" && !nextTokenValue)
              ) {
                throw new Error(`'${selector}' is not a valid selector`);
              } else if (isRegularSelectorNode(bufferNode)) {
                if (context.isAttributeBracketsOpen) {
                  updateBufferNode(context, tokenValue);
                } else {
                  upToClosest(context, NODE.SELECTOR_LIST);
                }
              } else if (isAbsolutePseudoClassNode(bufferNode)) {
                updateBufferNode(context, tokenValue);
              } else if (isSelectorNode(bufferNode)) {
                upToClosest(context, NODE.SELECTOR_LIST);
              }
              break;
            case SPACE:
              if (
                isRegularSelectorNode(bufferNode) &&
                !context.isAttributeBracketsOpen
              ) {
                bufferNode = getUpdatedBufferNode(context);
              }
              if (isRegularSelectorNode(bufferNode)) {
                if (
                  !context.isAttributeBracketsOpen &&
                  ((prevTokenValue === COLON &&
                    nextTokenType === TOKEN_TYPE.WORD) ||
                    (prevTokenType === TOKEN_TYPE.WORD &&
                      nextTokenValue === BRACKET.PARENTHESES.LEFT))
                ) {
                  throw new Error(`'${selector}' is not a valid selector`);
                }
                if (
                  !nextTokenValue ||
                  doesRegularContinueAfterSpace(
                    nextTokenType,
                    nextTokenValue
                  ) ||
                  context.isAttributeBracketsOpen
                ) {
                  updateBufferNode(context, tokenValue);
                }
              }
              if (isAbsolutePseudoClassNode(bufferNode)) {
                updateBufferNode(context, tokenValue);
              }
              if (isRelativePseudoClassNode(bufferNode)) {
                initRelativeSubtree(context);
              }
              if (isSelectorNode(bufferNode)) {
                if (
                  doesRegularContinueAfterSpace(nextTokenType, nextTokenValue)
                ) {
                  addAstNodeByType(context, NODE.REGULAR_SELECTOR);
                }
              }
              break;
            case DESCENDANT_COMBINATOR:
            case CHILD_COMBINATOR:
            case NEXT_SIBLING_COMBINATOR:
            case SUBSEQUENT_SIBLING_COMBINATOR:
            case SEMICOLON:
            case SLASH:
            case BACKSLASH:
            case SINGLE_QUOTE:
            case DOUBLE_QUOTE:
            case CARET:
            case DOLLAR_SIGN:
            case BRACKET.CURLY.LEFT:
            case BRACKET.CURLY.RIGHT:
            case ASTERISK:
            case ID_MARKER:
            case CLASS_MARKER:
            case BRACKET.SQUARE.LEFT:
              if (COMBINATORS.includes(tokenValue)) {
                if (bufferNode === null) {
                  throw new Error(`'${selector}' is not a valid selector`);
                }
                bufferNode = getUpdatedBufferNode(context);
              }
              if (bufferNode === null) {
                initAst(context, tokenValue);
                if (isAttributeOpening(tokenValue, prevTokenValue)) {
                  context.isAttributeBracketsOpen = true;
                }
              } else if (isRegularSelectorNode(bufferNode)) {
                if (
                  tokenValue === BRACKET.CURLY.LEFT &&
                  !(context.isAttributeBracketsOpen || context.isRegexpOpen)
                ) {
                  throw new Error(`'${selector}' is not a valid selector`);
                }
                updateBufferNode(context, tokenValue);
                if (isAttributeOpening(tokenValue, prevTokenValue)) {
                  context.isAttributeBracketsOpen = true;
                }
              } else if (isAbsolutePseudoClassNode(bufferNode)) {
                updateBufferNode(context, tokenValue);
                if (
                  tokenValue === SLASH &&
                  context.extendedPseudoNamesStack.length > 0
                ) {
                  if (
                    prevTokenValue === SLASH &&
                    prevToPrevTokenValue === BACKSLASH
                  ) {
                    context.isRegexpOpen = false;
                  } else if (prevTokenValue && prevTokenValue !== BACKSLASH) {
                    if (
                      isRegexpOpening(
                        context,
                        prevTokenValue,
                        getNodeValue(bufferNode)
                      )
                    ) {
                      context.isRegexpOpen = !context.isRegexpOpen;
                    } else {
                      context.isRegexpOpen = false;
                    }
                  }
                }
              } else if (isRelativePseudoClassNode(bufferNode)) {
                initRelativeSubtree(context, tokenValue);
                if (isAttributeOpening(tokenValue, prevTokenValue)) {
                  context.isAttributeBracketsOpen = true;
                }
              } else if (isSelectorNode(bufferNode)) {
                if (COMBINATORS.includes(tokenValue)) {
                  addAstNodeByType(context, NODE.REGULAR_SELECTOR, tokenValue);
                } else if (!context.isRegexpOpen) {
                  bufferNode = getContextLastRegularSelectorNode(context);
                  updateBufferNode(context, tokenValue);
                  if (isAttributeOpening(tokenValue, prevTokenValue)) {
                    context.isAttributeBracketsOpen = true;
                  }
                }
              } else if (isSelectorListNode(bufferNode)) {
                addAstNodeByType(context, NODE.SELECTOR);
                addAstNodeByType(context, NODE.REGULAR_SELECTOR, tokenValue);
                if (isAttributeOpening(tokenValue, prevTokenValue)) {
                  context.isAttributeBracketsOpen = true;
                }
              }
              break;
            case BRACKET.SQUARE.RIGHT:
              if (isRegularSelectorNode(bufferNode)) {
                if (
                  !context.isAttributeBracketsOpen &&
                  prevTokenValue !== BACKSLASH
                ) {
                  throw new Error(
                    `'${selector}' is not a valid selector due to '${tokenValue}' after '${getNodeValue(
                      bufferNode
                    )}'`
                  );
                }
                if (isAttributeClosing(context)) {
                  context.isAttributeBracketsOpen = false;
                  context.attributeBuffer = "";
                }
                updateBufferNode(context, tokenValue);
              }
              if (isAbsolutePseudoClassNode(bufferNode)) {
                updateBufferNode(context, tokenValue);
              }
              break;
            case COLON:
              if (
                isWhiteSpaceChar(nextTokenValue) &&
                nextToNextTokenValue &&
                SUPPORTED_PSEUDO_CLASSES.includes(nextToNextTokenValue)
              ) {
                throw new Error(`${NO_WHITESPACE_ERROR_PREFIX}: '${selector}'`);
              }
              if (bufferNode === null) {
                if (nextTokenValue === XPATH_PSEUDO_CLASS_MARKER) {
                  initAst(context, XPATH_PSEUDO_SELECTING_ROOT);
                } else if (
                  nextTokenValue === UPWARD_PSEUDO_CLASS_MARKER ||
                  nextTokenValue === NTH_ANCESTOR_PSEUDO_CLASS_MARKER
                ) {
                  throw new Error(
                    `${NO_SELECTOR_ERROR_PREFIX} before :${nextTokenValue}() pseudo-class`
                  );
                } else {
                  initAst(context, ASTERISK);
                }
                bufferNode = getBufferNode(context);
              }
              if (isSelectorListNode(bufferNode)) {
                addAstNodeByType(context, NODE.SELECTOR);
                addAstNodeByType(context, NODE.REGULAR_SELECTOR);
                bufferNode = getBufferNode(context);
              }
              if (isRegularSelectorNode(bufferNode)) {
                if (
                  (prevTokenValue && COMBINATORS.includes(prevTokenValue)) ||
                  prevTokenValue === COMMA
                ) {
                  updateBufferNode(context, ASTERISK);
                }
                handleNextTokenOnColon(
                  context,
                  selector,
                  tokenValue,
                  nextTokenValue,
                  nextToNextTokenValue
                );
              }
              if (isSelectorNode(bufferNode)) {
                if (!nextTokenValue) {
                  throw new Error(
                    `Invalid colon ':' at the end of selector: '${selector}'`
                  );
                }
                if (isSupportedPseudoClass(nextTokenValue.toLowerCase())) {
                  addAstNodeByType(context, NODE.EXTENDED_SELECTOR);
                } else if (
                  nextTokenValue.toLowerCase() === REMOVE_PSEUDO_MARKER
                ) {
                  throw new Error(
                    `${REMOVE_ERROR_PREFIX.INVALID_REMOVE}: '${selector}'`
                  );
                } else {
                  bufferNode = getContextLastRegularSelectorNode(context);
                  handleNextTokenOnColon(
                    context,
                    selector,
                    tokenValue,
                    nextTokenType,
                    nextToNextTokenValue
                  );
                }
              }
              if (isAbsolutePseudoClassNode(bufferNode)) {
                if (
                  getNodeName(bufferNode) === XPATH_PSEUDO_CLASS_MARKER &&
                  nextTokenValue &&
                  SUPPORTED_PSEUDO_CLASSES.includes(nextTokenValue) &&
                  nextToNextTokenValue === BRACKET.PARENTHESES.LEFT
                ) {
                  throw new Error(
                    `:xpath() pseudo-class should be the last in selector: '${selector}'`
                  );
                }
                updateBufferNode(context, tokenValue);
              }
              if (isRelativePseudoClassNode(bufferNode)) {
                if (!nextTokenValue) {
                  throw new Error(
                    `Invalid pseudo-class arg at the end of selector: '${selector}'`
                  );
                }
                initRelativeSubtree(context, ASTERISK);
                if (!isSupportedPseudoClass(nextTokenValue.toLowerCase())) {
                  updateBufferNode(context, tokenValue);
                  if (nextToNextTokenValue === BRACKET.PARENTHESES.LEFT) {
                    context.standardPseudoNamesStack.push(nextTokenValue);
                  }
                } else {
                  upToClosest(context, NODE.SELECTOR);
                  addAstNodeByType(context, NODE.EXTENDED_SELECTOR);
                }
              }
              break;
            case BRACKET.PARENTHESES.LEFT:
              if (isAbsolutePseudoClassNode(bufferNode)) {
                if (
                  getNodeName(bufferNode) !== XPATH_PSEUDO_CLASS_MARKER &&
                  context.isRegexpOpen
                ) {
                  updateBufferNode(context, tokenValue);
                } else {
                  context.extendedPseudoBracketsStack.push(tokenValue);
                  if (
                    context.extendedPseudoBracketsStack.length >
                    context.extendedPseudoNamesStack.length
                  ) {
                    updateBufferNode(context, tokenValue);
                  }
                }
              }
              if (isRegularSelectorNode(bufferNode)) {
                if (context.standardPseudoNamesStack.length > 0) {
                  updateBufferNode(context, tokenValue);
                  context.standardPseudoBracketsStack.push(tokenValue);
                }
                if (context.isAttributeBracketsOpen) {
                  updateBufferNode(context, tokenValue);
                }
              }
              if (isRelativePseudoClassNode(bufferNode)) {
                context.extendedPseudoBracketsStack.push(tokenValue);
              }
              break;
            case BRACKET.PARENTHESES.RIGHT:
              if (isAbsolutePseudoClassNode(bufferNode)) {
                if (
                  getNodeName(bufferNode) !== XPATH_PSEUDO_CLASS_MARKER &&
                  context.isRegexpOpen
                ) {
                  updateBufferNode(context, tokenValue);
                } else {
                  context.extendedPseudoBracketsStack.pop();
                  if (getNodeName(bufferNode) !== XPATH_PSEUDO_CLASS_MARKER) {
                    context.extendedPseudoNamesStack.pop();
                    if (
                      context.extendedPseudoBracketsStack.length >
                      context.extendedPseudoNamesStack.length
                    ) {
                      updateBufferNode(context, tokenValue);
                    } else if (
                      context.extendedPseudoBracketsStack.length >= 0 &&
                      context.extendedPseudoNamesStack.length >= 0
                    ) {
                      upToClosest(context, NODE.SELECTOR);
                    }
                  } else {
                    if (
                      context.extendedPseudoBracketsStack.length <
                      context.extendedPseudoNamesStack.length
                    ) {
                      context.extendedPseudoNamesStack.pop();
                    } else {
                      updateBufferNode(context, tokenValue);
                    }
                  }
                }
              }
              if (isRegularSelectorNode(bufferNode)) {
                if (context.isAttributeBracketsOpen) {
                  updateBufferNode(context, tokenValue);
                } else if (
                  context.standardPseudoNamesStack.length > 0 &&
                  context.standardPseudoBracketsStack.length > 0
                ) {
                  updateBufferNode(context, tokenValue);
                  context.standardPseudoBracketsStack.pop();
                  const lastStandardPseudo =
                    context.standardPseudoNamesStack.pop();
                  if (!lastStandardPseudo) {
                    throw new Error(
                      `Parsing error. Invalid selector: ${selector}`
                    );
                  }
                  if (
                    Object.values(REGULAR_PSEUDO_ELEMENTS).includes(
                      lastStandardPseudo
                    ) &&
                    nextTokenValue === COLON &&
                    nextToNextTokenValue &&
                    HAS_PSEUDO_CLASS_MARKERS.includes(nextToNextTokenValue)
                  ) {
                    throw new Error(
                      `Usage of :${nextToNextTokenValue}() pseudo-class is not allowed after any regular pseudo-element: '${lastStandardPseudo}'`
                    );
                  }
                } else {
                  context.extendedPseudoBracketsStack.pop();
                  context.extendedPseudoNamesStack.pop();
                  upToClosest(context, NODE.EXTENDED_SELECTOR);
                  upToClosest(context, NODE.SELECTOR);
                }
              }
              if (isSelectorNode(bufferNode)) {
                context.extendedPseudoBracketsStack.pop();
                context.extendedPseudoNamesStack.pop();
                upToClosest(context, NODE.EXTENDED_SELECTOR);
                upToClosest(context, NODE.SELECTOR);
              }
              if (isRelativePseudoClassNode(bufferNode)) {
                if (
                  context.extendedPseudoNamesStack.length > 0 &&
                  context.extendedPseudoBracketsStack.length > 0
                ) {
                  context.extendedPseudoBracketsStack.pop();
                  context.extendedPseudoNamesStack.pop();
                }
              }
              break;
            case LINE_FEED:
            case FORM_FEED:
            case CARRIAGE_RETURN:
              throw new Error(`'${selector}' is not a valid selector`);
            case TAB:
              if (
                isRegularSelectorNode(bufferNode) &&
                context.isAttributeBracketsOpen
              ) {
                updateBufferNode(context, tokenValue);
              } else {
                throw new Error(`'${selector}' is not a valid selector`);
              }
          }
          break;
        default:
          throw new Error(`Unknown type of token: '${tokenValue}'`);
      }
      i += 1;
    }
    if (context.ast === null) {
      throw new Error(`'${selector}' is not a valid selector`);
    }
    if (
      context.extendedPseudoNamesStack.length > 0 ||
      context.extendedPseudoBracketsStack.length > 0
    ) {
      throw new Error(
        `Unbalanced brackets for extended pseudo-class: '${getLast(
          context.extendedPseudoNamesStack
        )}'`
      );
    }
    if (context.isAttributeBracketsOpen) {
      throw new Error(
        `Unbalanced attribute brackets in selector: '${selector}'`
      );
    }
    return context.shouldOptimize ? optimizeAst(context.ast) : context.ast;
  };
  const natives = {
    MutationObserver: window.MutationObserver || window.WebKitMutationObserver,
  };
  class NativeTextContent {
    constructor() {
      this.nativeNode = window.Node || Node;
    }
    setGetter() {
      var _Object$getOwnPropert;
      this.getter =
        (_Object$getOwnPropert = Object.getOwnPropertyDescriptor(
          this.nativeNode.prototype,
          "textContent"
        )) === null || _Object$getOwnPropert === void 0
          ? void 0
          : _Object$getOwnPropert.get;
    }
  }
  const nativeTextContent = new NativeTextContent();
  const getNodeTextContent = (domElement) => {
    if (nativeTextContent.getter) {
      return nativeTextContent.getter.apply(domElement);
    }
    return domElement.textContent || "";
  };
  const getElementSelectorDesc = (element) => {
    let selectorText = element.tagName.toLowerCase();
    selectorText += Array.from(element.attributes)
      .map((attr) => {
        return `[${attr.name}="${element.getAttribute(attr.name)}"]`;
      })
      .join("");
    return selectorText;
  };
  const getElementSelectorPath = (inputEl) => {
    if (!(inputEl instanceof Element)) {
      throw new Error("Function received argument with wrong type");
    }
    let el;
    el = inputEl;
    const path = [];
    while (!!el && el.nodeType === Node.ELEMENT_NODE) {
      let selector = el.nodeName.toLowerCase();
      if (el.id && typeof el.id === "string") {
        selector += `#${el.id}`;
        path.unshift(selector);
        break;
      }
      let sibling = el;
      let nth = 1;
      while (sibling.previousElementSibling) {
        sibling = sibling.previousElementSibling;
        if (
          sibling.nodeType === Node.ELEMENT_NODE &&
          sibling.nodeName.toLowerCase() === selector
        ) {
          nth += 1;
        }
      }
      if (nth !== 1) {
        selector += `:nth-of-type(${nth})`;
      }
      path.unshift(selector);
      el = el.parentElement;
    }
    return path.join(" > ");
  };
  const isHtmlElement = (element) => {
    return element instanceof HTMLElement;
  };
  const getParent = (element, errorMessage) => {
    const { parentElement } = element;
    if (!parentElement) {
      throw new Error(errorMessage || "Element does no have parent element");
    }
    return parentElement;
  };
  const isErrorWithMessage = (error) => {
    return (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof error.message === "string"
    );
  };
  const toErrorWithMessage = (maybeError) => {
    if (isErrorWithMessage(maybeError)) {
      return maybeError;
    }
    try {
      return new Error(JSON.stringify(maybeError));
    } catch {
      return new Error(String(maybeError));
    }
  };
  const getErrorMessage = (error) => {
    return toErrorWithMessage(error).message;
  };
  const logger = {
    error:
      typeof console !== "undefined" && console.error && console.error.bind
        ? console.error.bind(window.console)
        : console.error,
    info:
      typeof console !== "undefined" && console.info && console.info.bind
        ? console.info.bind(window.console)
        : console.info,
  };
  const removeSuffix = (str, suffix) => {
    const index = str.indexOf(suffix, str.length - suffix.length);
    if (index >= 0) {
      return str.substring(0, index);
    }
    return str;
  };
  const replaceAll = (input, pattern, replacement) => {
    if (!input) {
      return input;
    }
    return input.split(pattern).join(replacement);
  };
  const toRegExp = (str) => {
    if (str.startsWith(SLASH) && str.endsWith(SLASH)) {
      return new RegExp(str.slice(1, -1));
    }
    const escaped = str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(escaped);
  };
  const convertTypeIntoString = (value) => {
    let output;
    switch (value) {
      case undefined:
        output = "undefined";
        break;
      case null:
        output = "null";
        break;
      default:
        output = value.toString();
    }
    return output;
  };
  const convertTypeFromString = (value) => {
    const numValue = Number(value);
    let output;
    if (!Number.isNaN(numValue)) {
      output = numValue;
    } else {
      switch (value) {
        case "undefined":
          output = undefined;
          break;
        case "null":
          output = null;
          break;
        case "true":
          output = true;
          break;
        case "false":
          output = false;
          break;
        default:
          output = value;
      }
    }
    return output;
  };
  const SAFARI_USER_AGENT_REGEXP = /\sVersion\/(\d{2}\.\d)(.+\s|\s)(Safari)\//;
  const isSafariBrowser = SAFARI_USER_AGENT_REGEXP.test(navigator.userAgent);
  const isUserAgentSupported = (userAgent) => {
    if (userAgent.includes("MSIE") || userAgent.includes("Trident/")) {
      return false;
    }
    return true;
  };
  const isBrowserSupported = () => {
    return isUserAgentSupported(navigator.userAgent);
  };
  const CSS_PROPERTY = {
    BACKGROUND: "background",
    BACKGROUND_IMAGE: "background-image",
    CONTENT: "content",
    OPACITY: "opacity",
  };
  const REGEXP_ANY_SYMBOL = ".*";
  const REGEXP_WITH_FLAGS_REGEXP = /^\s*\/.*\/[gmisuy]*\s*$/;
  const removeContentQuotes = (str) => {
    return str.replace(/^(["'])([\s\S]*)\1$/, "$2");
  };
  const addUrlPropertyQuotes = (str) => {
    if (!str.includes('url("')) {
      const re = /url\((.*?)\)/g;
      return str.replace(re, 'url("$1")');
    }
    return str;
  };
  const addUrlQuotesTo = {
    regexpArg: (str) => {
      const re = /(\^)?url(\\)?\\\((\w|\[\w)/g;
      return str.replace(re, '$1url$2\\(\\"?$3');
    },
    noneRegexpArg: addUrlPropertyQuotes,
  };
  const escapeRegExp = (str) => {
    const specials = [
      ".",
      "+",
      "?",
      "$",
      "{",
      "}",
      "(",
      ")",
      "[",
      "]",
      "\\",
      "/",
    ];
    const specialsRegex = new RegExp(`[${specials.join("\\")}]`, "g");
    return str.replace(specialsRegex, "\\$&");
  };
  const convertStyleMatchValueToRegexp = (rawValue) => {
    let value;
    if (rawValue.startsWith(SLASH) && rawValue.endsWith(SLASH)) {
      value = addUrlQuotesTo.regexpArg(rawValue);
      value = value.slice(1, -1);
    } else {
      value = addUrlQuotesTo.noneRegexpArg(rawValue);
      value = value.replace(/\\([\\()[\]"])/g, "$1");
      value = escapeRegExp(value);
      value = replaceAll(value, ASTERISK, REGEXP_ANY_SYMBOL);
    }
    return new RegExp(value, "i");
  };
  const normalizePropertyValue = (propertyName, propertyValue) => {
    let normalized = "";
    switch (propertyName) {
      case CSS_PROPERTY.BACKGROUND:
      case CSS_PROPERTY.BACKGROUND_IMAGE:
        normalized = addUrlPropertyQuotes(propertyValue);
        break;
      case CSS_PROPERTY.CONTENT:
        normalized = removeContentQuotes(propertyValue);
        break;
      case CSS_PROPERTY.OPACITY:
        normalized = isSafariBrowser
          ? (Math.round(parseFloat(propertyValue) * 100) / 100).toString()
          : propertyValue;
        break;
      default:
        normalized = propertyValue;
    }
    return normalized;
  };
  const getComputedStylePropertyValue = (
    domElement,
    propertyName,
    regularPseudoElement
  ) => {
    const style = window.getComputedStyle(domElement, regularPseudoElement);
    const propertyValue = style.getPropertyValue(propertyName);
    return normalizePropertyValue(propertyName, propertyValue);
  };
  const getPseudoArgData = (pseudoArg, separator) => {
    const index = pseudoArg.indexOf(separator);
    let name;
    let value;
    if (index > -1) {
      name = pseudoArg.substring(0, index).trim();
      value = pseudoArg.substring(index + 1).trim();
    } else {
      name = pseudoArg;
    }
    return {
      name,
      value,
    };
  };
  const parseStyleMatchArg = (pseudoName, rawArg) => {
    const { name, value } = getPseudoArgData(rawArg, COMMA);
    let regularPseudoElement = name;
    let styleMatchArg = value;
    if (!Object.values(REGULAR_PSEUDO_ELEMENTS).includes(name)) {
      regularPseudoElement = null;
      styleMatchArg = rawArg;
    }
    if (!styleMatchArg) {
      throw new Error(
        `Required style property argument part is missing in :${pseudoName}() arg: '${rawArg}'`
      );
    }
    if (regularPseudoElement) {
      regularPseudoElement = `${COLON}${COLON}${regularPseudoElement}`;
    }
    return {
      regularPseudoElement,
      styleMatchArg,
    };
  };
  const isStyleMatched = (argsData) => {
    const { pseudoName, pseudoArg, domElement } = argsData;
    const { regularPseudoElement, styleMatchArg } = parseStyleMatchArg(
      pseudoName,
      pseudoArg
    );
    const { name: matchName, value: matchValue } = getPseudoArgData(
      styleMatchArg,
      COLON
    );
    if (!matchName || !matchValue) {
      throw new Error(
        `Required property name or value is missing in :${pseudoName}() arg: '${styleMatchArg}'`
      );
    }
    let valueRegexp;
    try {
      valueRegexp = convertStyleMatchValueToRegexp(matchValue);
    } catch (e) {
      logger.error(getErrorMessage(e));
      throw new Error(
        `Invalid argument of :${pseudoName}() pseudo-class: '${styleMatchArg}'`
      );
    }
    const value = getComputedStylePropertyValue(
      domElement,
      matchName,
      regularPseudoElement
    );
    return valueRegexp && valueRegexp.test(value);
  };
  const validateStrMatcherArg = (arg) => {
    if (arg.includes(SLASH)) {
      return false;
    }
    if (!/^[\w-]+$/.test(arg)) {
      return false;
    }
    return true;
  };
  const getValidMatcherArg = function (rawArg) {
    let isWildcardAllowed =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    let arg;
    if (
      rawArg.length > 1 &&
      rawArg.startsWith(DOUBLE_QUOTE) &&
      rawArg.endsWith(DOUBLE_QUOTE)
    ) {
      rawArg = rawArg.slice(1, -1);
    }
    if (rawArg === "") {
      throw new Error("Argument should be specified. Empty arg is invalid.");
    }
    if (rawArg.startsWith(SLASH) && rawArg.endsWith(SLASH)) {
      if (rawArg.length > 2) {
        arg = toRegExp(rawArg);
      } else {
        throw new Error(`Invalid regexp: '${rawArg}'`);
      }
    } else if (rawArg.includes(ASTERISK)) {
      if (rawArg === ASTERISK && !isWildcardAllowed) {
        throw new Error(`Argument should be more specific than ${rawArg}`);
      }
      arg = replaceAll(rawArg, ASTERISK, REGEXP_ANY_SYMBOL);
      arg = new RegExp(arg);
    } else {
      if (!validateStrMatcherArg(rawArg)) {
        throw new Error(`Invalid argument: '${rawArg}'`);
      }
      arg = rawArg;
    }
    return arg;
  };
  const getRawMatchingData = (pseudoName, pseudoArg) => {
    const { name: rawName, value: rawValue } = getPseudoArgData(
      pseudoArg,
      EQUAL_SIGN
    );
    if (!rawName) {
      throw new Error(
        `Required attribute name is missing in :${pseudoName} arg: ${pseudoArg}`
      );
    }
    return {
      rawName,
      rawValue,
    };
  };
  const isAttributeMatched = (argsData) => {
    const { pseudoName, pseudoArg, domElement } = argsData;
    const elementAttributes = domElement.attributes;
    if (elementAttributes.length === 0) {
      return false;
    }
    const { rawName: rawAttrName, rawValue: rawAttrValue } = getRawMatchingData(
      pseudoName,
      pseudoArg
    );
    let attrNameMatch;
    try {
      attrNameMatch = getValidMatcherArg(rawAttrName);
    } catch (e) {
      const errorMessage = getErrorMessage(e);
      logger.error(errorMessage);
      throw new SyntaxError(errorMessage);
    }
    let isMatched = false;
    let i = 0;
    while (i < elementAttributes.length && !isMatched) {
      const attr = elementAttributes[i];
      if (!attr) {
        break;
      }
      const isNameMatched =
        attrNameMatch instanceof RegExp
          ? attrNameMatch.test(attr.name)
          : attrNameMatch === attr.name;
      if (!rawAttrValue) {
        isMatched = isNameMatched;
      } else {
        let attrValueMatch;
        try {
          attrValueMatch = getValidMatcherArg(rawAttrValue);
        } catch (e) {
          const errorMessage = getErrorMessage(e);
          logger.error(errorMessage);
          throw new SyntaxError(errorMessage);
        }
        const isValueMatched =
          attrValueMatch instanceof RegExp
            ? attrValueMatch.test(attr.value)
            : attrValueMatch === attr.value;
        isMatched = isNameMatched && isValueMatched;
      }
      i += 1;
    }
    return isMatched;
  };
  const parseRawPropChain = (input) => {
    if (
      input.length > 1 &&
      input.startsWith(DOUBLE_QUOTE) &&
      input.endsWith(DOUBLE_QUOTE)
    ) {
      input = input.slice(1, -1);
    }
    const chainChunks = input.split(DOT);
    const chainPatterns = [];
    let patternBuffer = "";
    let isRegexpPattern = false;
    let i = 0;
    while (i < chainChunks.length) {
      const chunk = getItemByIndex(
        chainChunks,
        i,
        `Invalid pseudo-class arg: '${input}'`
      );
      if (
        chunk.startsWith(SLASH) &&
        chunk.endsWith(SLASH) &&
        chunk.length > 2
      ) {
        chainPatterns.push(chunk);
      } else if (chunk.startsWith(SLASH)) {
        isRegexpPattern = true;
        patternBuffer += chunk;
      } else if (chunk.endsWith(SLASH)) {
        isRegexpPattern = false;
        patternBuffer += `.${chunk}`;
        chainPatterns.push(patternBuffer);
        patternBuffer = "";
      } else {
        if (isRegexpPattern) {
          patternBuffer += chunk;
        } else {
          chainPatterns.push(chunk);
        }
      }
      i += 1;
    }
    if (patternBuffer.length > 0) {
      throw new Error(`Invalid regexp property pattern '${input}'`);
    }
    const chainMatchPatterns = chainPatterns.map((pattern) => {
      if (pattern.length === 0) {
        throw new Error(
          `Empty pattern '${pattern}' is invalid in chain '${input}'`
        );
      }
      let validPattern;
      try {
        validPattern = getValidMatcherArg(pattern, true);
      } catch (e) {
        logger.error(getErrorMessage(e));
        throw new Error(
          `Invalid property pattern '${pattern}' in property chain '${input}'`
        );
      }
      return validPattern;
    });
    return chainMatchPatterns;
  };
  const filterRootsByRegexpChain = function (base, chain) {
    let output =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    const tempProp = getFirst(chain);
    if (chain.length === 1) {
      let key;
      for (key in base) {
        if (tempProp instanceof RegExp) {
          if (tempProp.test(key)) {
            output.push({
              base,
              prop: key,
              value: base[key],
            });
          }
        } else if (tempProp === key) {
          output.push({
            base,
            prop: tempProp,
            value: base[key],
          });
        }
      }
      return output;
    }
    if (tempProp instanceof RegExp) {
      const nextProp = chain.slice(1);
      const baseKeys = [];
      for (const key in base) {
        if (tempProp.test(key)) {
          baseKeys.push(key);
        }
      }
      baseKeys.forEach((key) => {
        var _Object$getOwnPropert;
        const item =
          (_Object$getOwnPropert = Object.getOwnPropertyDescriptor(
            base,
            key
          )) === null || _Object$getOwnPropert === void 0
            ? void 0
            : _Object$getOwnPropert.value;
        filterRootsByRegexpChain(item, nextProp, output);
      });
    }
    if (base && typeof tempProp === "string") {
      var _Object$getOwnPropert2;
      const nextBase =
        (_Object$getOwnPropert2 = Object.getOwnPropertyDescriptor(
          base,
          tempProp
        )) === null || _Object$getOwnPropert2 === void 0
          ? void 0
          : _Object$getOwnPropert2.value;
      chain = chain.slice(1);
      if (nextBase !== undefined) {
        filterRootsByRegexpChain(nextBase, chain, output);
      }
    }
    return output;
  };
  const isPropertyMatched = (argsData) => {
    const { pseudoName, pseudoArg, domElement } = argsData;
    const { rawName: rawPropertyName, rawValue: rawPropertyValue } =
      getRawMatchingData(pseudoName, pseudoArg);
    if (rawPropertyName.includes("\\/") || rawPropertyName.includes("\\.")) {
      throw new Error(
        `Invalid :${pseudoName} name pattern: ${rawPropertyName}`
      );
    }
    let propChainMatches;
    try {
      propChainMatches = parseRawPropChain(rawPropertyName);
    } catch (e) {
      const errorMessage = getErrorMessage(e);
      logger.error(errorMessage);
      throw new SyntaxError(errorMessage);
    }
    const ownerObjArr = filterRootsByRegexpChain(domElement, propChainMatches);
    if (ownerObjArr.length === 0) {
      return false;
    }
    let isMatched = true;
    if (rawPropertyValue) {
      let propValueMatch;
      try {
        propValueMatch = getValidMatcherArg(rawPropertyValue);
      } catch (e) {
        const errorMessage = getErrorMessage(e);
        logger.error(errorMessage);
        throw new SyntaxError(errorMessage);
      }
      if (propValueMatch) {
        for (let i = 0; i < ownerObjArr.length; i += 1) {
          var _ownerObjArr$i;
          const realValue =
            (_ownerObjArr$i = ownerObjArr[i]) === null ||
            _ownerObjArr$i === void 0
              ? void 0
              : _ownerObjArr$i.value;
          if (propValueMatch instanceof RegExp) {
            isMatched = propValueMatch.test(convertTypeIntoString(realValue));
          } else {
            if (realValue === "null" || realValue === "undefined") {
              isMatched = propValueMatch === realValue;
              break;
            }
            isMatched = convertTypeFromString(propValueMatch) === realValue;
          }
          if (isMatched) {
            break;
          }
        }
      }
    }
    return isMatched;
  };
  const isTextMatched = (argsData) => {
    const { pseudoName, pseudoArg, domElement } = argsData;
    const textContent = getNodeTextContent(domElement);
    let isTextContentMatched;
    let pseudoArgToMatch = pseudoArg;
    if (
      pseudoArgToMatch.startsWith(SLASH) &&
      REGEXP_WITH_FLAGS_REGEXP.test(pseudoArgToMatch)
    ) {
      const flagsIndex = pseudoArgToMatch.lastIndexOf("/");
      const flagsStr = pseudoArgToMatch.substring(flagsIndex + 1);
      pseudoArgToMatch = pseudoArgToMatch
        .substring(0, flagsIndex + 1)
        .slice(1, -1)
        .replace(/\\([\\"])/g, "$1");
      let regex;
      try {
        regex = new RegExp(pseudoArgToMatch, flagsStr);
      } catch (e) {
        throw new Error(
          `Invalid argument of :${pseudoName}() pseudo-class: ${pseudoArg}`
        );
      }
      isTextContentMatched = regex.test(textContent);
    } else {
      pseudoArgToMatch = pseudoArgToMatch.replace(/\\([\\()[\]"])/g, "$1");
      isTextContentMatched = textContent.includes(pseudoArgToMatch);
    }
    return isTextContentMatched;
  };
  const getValidNumberAncestorArg = (rawArg, pseudoName) => {
    const deep = Number(rawArg);
    if (Number.isNaN(deep) || deep < 1 || deep >= 256) {
      throw new Error(
        `Invalid argument of :${pseudoName} pseudo-class: '${rawArg}'`
      );
    }
    return deep;
  };
  const getNthAncestor = (domElement, nth, pseudoName) => {
    let ancestor = null;
    let i = 0;
    while (i < nth) {
      ancestor = domElement.parentElement;
      if (!ancestor) {
        throw new Error(
          `Out of DOM: Argument of :${pseudoName}() pseudo-class is too big — '${nth}'.`
        );
      }
      domElement = ancestor;
      i += 1;
    }
    return ancestor;
  };
  const validateStandardSelector = (selector) => {
    let isValid;
    try {
      document.querySelectorAll(selector);
      isValid = true;
    } catch (e) {
      isValid = false;
    }
    return isValid;
  };
  const matcherWrapper = (callback, argsData, errorMessage) => {
    let isMatched;
    try {
      isMatched = callback(argsData);
    } catch (e) {
      logger.error(getErrorMessage(e));
      throw new Error(errorMessage);
    }
    return isMatched;
  };
  const getAbsolutePseudoError = (propDesc, pseudoName, pseudoArg) => {
    return `${MATCHING_ELEMENT_ERROR_PREFIX} ${propDesc}, may be invalid :${pseudoName}() pseudo-class arg: '${pseudoArg}'`;
  };
  const isMatchedByAbsolutePseudo = (domElement, pseudoName, pseudoArg) => {
    let argsData;
    let errorMessage;
    let callback;
    switch (pseudoName) {
      case CONTAINS_PSEUDO:
      case HAS_TEXT_PSEUDO:
      case ABP_CONTAINS_PSEUDO:
        callback = isTextMatched;
        argsData = {
          pseudoName,
          pseudoArg,
          domElement,
        };
        errorMessage = getAbsolutePseudoError(
          "text content",
          pseudoName,
          pseudoArg
        );
        break;
      case MATCHES_CSS_PSEUDO:
      case MATCHES_CSS_AFTER_PSEUDO:
      case MATCHES_CSS_BEFORE_PSEUDO:
        callback = isStyleMatched;
        argsData = {
          pseudoName,
          pseudoArg,
          domElement,
        };
        errorMessage = getAbsolutePseudoError("style", pseudoName, pseudoArg);
        break;
      case MATCHES_ATTR_PSEUDO_CLASS_MARKER:
        callback = isAttributeMatched;
        argsData = {
          domElement,
          pseudoName,
          pseudoArg,
        };
        errorMessage = getAbsolutePseudoError(
          "attributes",
          pseudoName,
          pseudoArg
        );
        break;
      case MATCHES_PROPERTY_PSEUDO_CLASS_MARKER:
        callback = isPropertyMatched;
        argsData = {
          domElement,
          pseudoName,
          pseudoArg,
        };
        errorMessage = getAbsolutePseudoError(
          "properties",
          pseudoName,
          pseudoArg
        );
        break;
      default:
        throw new Error(`Unknown absolute pseudo-class :${pseudoName}()`);
    }
    return matcherWrapper(callback, argsData, errorMessage);
  };
  const findByAbsolutePseudoPseudo = {
    nthAncestor: (domElements, rawPseudoArg, pseudoName) => {
      const deep = getValidNumberAncestorArg(rawPseudoArg, pseudoName);
      const ancestors = domElements
        .map((domElement) => {
          let ancestor = null;
          try {
            ancestor = getNthAncestor(domElement, deep, pseudoName);
          } catch (e) {
            logger.error(getErrorMessage(e));
          }
          return ancestor;
        })
        .filter(isHtmlElement);
      return ancestors;
    },
    xpath: (domElements, rawPseudoArg) => {
      const foundElements = domElements.map((domElement) => {
        const result = [];
        let xpathResult;
        try {
          xpathResult = document.evaluate(
            rawPseudoArg,
            domElement,
            null,
            window.XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
            null
          );
        } catch (e) {
          logger.error(getErrorMessage(e));
          throw new Error(
            `Invalid argument of :xpath() pseudo-class: '${rawPseudoArg}'`
          );
        }
        let node = xpathResult.iterateNext();
        while (node) {
          if (isHtmlElement(node)) {
            result.push(node);
          }
          node = xpathResult.iterateNext();
        }
        return result;
      });
      return flatten(foundElements);
    },
    upward: (domElements, rawPseudoArg) => {
      if (!validateStandardSelector(rawPseudoArg)) {
        throw new Error(
          `Invalid argument of :upward pseudo-class: '${rawPseudoArg}'`
        );
      }
      const closestAncestors = domElements
        .map((domElement) => {
          const parent = domElement.parentElement;
          if (!parent) {
            return null;
          }
          return parent.closest(rawPseudoArg);
        })
        .filter(isHtmlElement);
      return closestAncestors;
    },
  };
  const scopeDirectChildren = `${SCOPE_CSS_PSEUDO_CLASS}${CHILD_COMBINATOR}`;
  const scopeAnyChildren = `${SCOPE_CSS_PSEUDO_CLASS}${DESCENDANT_COMBINATOR}`;
  const getFirstInnerRegularChild = (selectorNode, pseudoName) => {
    return getFirstRegularChild(
      selectorNode.children,
      `RegularSelector is missing for :${pseudoName}() pseudo-class`
    );
  };
  const hasRelativesBySelectorList = (argsData) => {
    const { element, relativeSelectorList, pseudoName } = argsData;
    return relativeSelectorList.children.every((selectorNode) => {
      const relativeRegularSelector = getFirstInnerRegularChild(
        selectorNode,
        pseudoName
      );
      let specifiedSelector = "";
      let rootElement = null;
      const regularSelector = getNodeValue(relativeRegularSelector);
      if (
        regularSelector.startsWith(NEXT_SIBLING_COMBINATOR) ||
        regularSelector.startsWith(SUBSEQUENT_SIBLING_COMBINATOR)
      ) {
        rootElement = element.parentElement;
        const elementSelectorText = getElementSelectorDesc(element);
        specifiedSelector = `${scopeDirectChildren}${elementSelectorText}${regularSelector}`;
      } else if (regularSelector === ASTERISK) {
        rootElement = element;
        specifiedSelector = `${scopeAnyChildren}${ASTERISK}`;
      } else {
        specifiedSelector = `${scopeAnyChildren}${regularSelector}`;
        rootElement = element;
      }
      if (!rootElement) {
        throw new Error(
          `Selection by :${pseudoName}() pseudo-class is not possible`
        );
      }
      let relativeElements;
      try {
        relativeElements = getElementsForSelectorNode(
          selectorNode,
          rootElement,
          specifiedSelector
        );
      } catch (e) {
        logger.error(getErrorMessage(e));
        throw new Error(
          `Invalid selector for :${pseudoName}() pseudo-class: '${regularSelector}'`
        );
      }
      return relativeElements.length > 0;
    });
  };
  const isAnyElementBySelectorList = (argsData) => {
    const { element, relativeSelectorList, pseudoName } = argsData;
    return relativeSelectorList.children.some((selectorNode) => {
      const relativeRegularSelector = getFirstInnerRegularChild(
        selectorNode,
        pseudoName
      );
      const rootElement = getParent(
        element,
        `Selection by :${pseudoName}() pseudo-class is not possible`
      );
      const specifiedSelector = `${scopeDirectChildren}${getNodeValue(
        relativeRegularSelector
      )}`;
      let anyElements;
      try {
        anyElements = getElementsForSelectorNode(
          selectorNode,
          rootElement,
          specifiedSelector
        );
      } catch (e) {
        return false;
      }
      return anyElements.includes(element);
    });
  };
  const notElementBySelectorList = (argsData) => {
    const { element, relativeSelectorList, pseudoName } = argsData;
    return relativeSelectorList.children.every((selectorNode) => {
      const relativeRegularSelector = getFirstInnerRegularChild(
        selectorNode,
        pseudoName
      );
      const rootElement = getParent(
        element,
        `Selection by :${pseudoName}() pseudo-class is not possible`
      );
      const specifiedSelector = `${scopeDirectChildren}${getNodeValue(
        relativeRegularSelector
      )}`;
      let anyElements;
      try {
        anyElements = getElementsForSelectorNode(
          selectorNode,
          rootElement,
          specifiedSelector
        );
      } catch (e) {
        logger.error(getErrorMessage(e));
        throw new Error(
          `Invalid selector for :${pseudoName}() pseudo-class: '${getNodeValue(
            relativeRegularSelector
          )}'`
        );
      }
      return !anyElements.includes(element);
    });
  };
  const getByRegularSelector = (
    regularSelectorNode,
    root,
    specifiedSelector
  ) => {
    const selectorText = specifiedSelector
      ? specifiedSelector
      : getNodeValue(regularSelectorNode);
    let selectedElements = [];
    try {
      selectedElements = Array.from(root.querySelectorAll(selectorText));
    } catch (e) {
      throw new Error(
        `Error: unable to select by '${selectorText}' — ${getErrorMessage(e)}`
      );
    }
    return selectedElements;
  };
  const getByExtendedSelector = (domElements, extendedSelectorNode) => {
    let foundElements = [];
    const extendedPseudoClassNode = getPseudoClassNode(extendedSelectorNode);
    const pseudoName = getNodeName(extendedPseudoClassNode);
    if (isAbsolutePseudoClass(pseudoName)) {
      const absolutePseudoArg = getNodeValue(
        extendedPseudoClassNode,
        `Missing arg for :${pseudoName}() pseudo-class`
      );
      if (pseudoName === NTH_ANCESTOR_PSEUDO_CLASS_MARKER) {
        foundElements = findByAbsolutePseudoPseudo.nthAncestor(
          domElements,
          absolutePseudoArg,
          pseudoName
        );
      } else if (pseudoName === XPATH_PSEUDO_CLASS_MARKER) {
        try {
          document.createExpression(absolutePseudoArg, null);
        } catch (e) {
          throw new Error(
            `Invalid argument of :${pseudoName}() pseudo-class: '${absolutePseudoArg}'`
          );
        }
        foundElements = findByAbsolutePseudoPseudo.xpath(
          domElements,
          absolutePseudoArg
        );
      } else if (pseudoName === UPWARD_PSEUDO_CLASS_MARKER) {
        if (Number.isNaN(Number(absolutePseudoArg))) {
          foundElements = findByAbsolutePseudoPseudo.upward(
            domElements,
            absolutePseudoArg
          );
        } else {
          foundElements = findByAbsolutePseudoPseudo.nthAncestor(
            domElements,
            absolutePseudoArg,
            pseudoName
          );
        }
      } else {
        foundElements = domElements.filter((element) => {
          return isMatchedByAbsolutePseudo(
            element,
            pseudoName,
            absolutePseudoArg
          );
        });
      }
    } else if (isRelativePseudoClass(pseudoName)) {
      const relativeSelectorList = getRelativeSelectorListNode(
        extendedPseudoClassNode
      );
      let relativePredicate;
      switch (pseudoName) {
        case HAS_PSEUDO_CLASS_MARKER:
        case ABP_HAS_PSEUDO_CLASS_MARKER:
          relativePredicate = (element) =>
            hasRelativesBySelectorList({
              element,
              relativeSelectorList,
              pseudoName,
            });
          break;
        case IS_PSEUDO_CLASS_MARKER:
          relativePredicate = (element) =>
            isAnyElementBySelectorList({
              element,
              relativeSelectorList,
              pseudoName,
            });
          break;
        case NOT_PSEUDO_CLASS_MARKER:
          relativePredicate = (element) =>
            notElementBySelectorList({
              element,
              relativeSelectorList,
              pseudoName,
            });
          break;
        default:
          throw new Error(`Unknown relative pseudo-class: '${pseudoName}'`);
      }
      foundElements = domElements.filter(relativePredicate);
    } else {
      throw new Error(`Unknown extended pseudo-class: '${pseudoName}'`);
    }
    return foundElements;
  };
  const getByFollowingRegularSelector = (domElements, regularSelectorNode) => {
    let foundElements = [];
    const value = getNodeValue(regularSelectorNode);
    if (value.startsWith(CHILD_COMBINATOR)) {
      foundElements = domElements.map((root) => {
        const specifiedSelector = `${SCOPE_CSS_PSEUDO_CLASS}${value}`;
        return getByRegularSelector(
          regularSelectorNode,
          root,
          specifiedSelector
        );
      });
    } else if (
      value.startsWith(NEXT_SIBLING_COMBINATOR) ||
      value.startsWith(SUBSEQUENT_SIBLING_COMBINATOR)
    ) {
      foundElements = domElements.map((element) => {
        const rootElement = element.parentElement;
        if (!rootElement) {
          return [];
        }
        const elementSelectorText = getElementSelectorDesc(element);
        const specifiedSelector = `${scopeDirectChildren}${elementSelectorText}${value}`;
        const selected = getByRegularSelector(
          regularSelectorNode,
          rootElement,
          specifiedSelector
        );
        return selected;
      });
    } else {
      foundElements = domElements.map((root) => {
        const specifiedSelector = `${scopeAnyChildren}${getNodeValue(
          regularSelectorNode
        )}`;
        return getByRegularSelector(
          regularSelectorNode,
          root,
          specifiedSelector
        );
      });
    }
    return flatten(foundElements);
  };
  const getElementsForSelectorNode = (
    selectorNode,
    root,
    specifiedSelector
  ) => {
    let selectedElements = [];
    let i = 0;
    while (i < selectorNode.children.length) {
      const selectorNodeChild = getItemByIndex(
        selectorNode.children,
        i,
        "selectorNodeChild should be specified"
      );
      if (i === 0) {
        selectedElements = getByRegularSelector(
          selectorNodeChild,
          root,
          specifiedSelector
        );
      } else if (isExtendedSelectorNode(selectorNodeChild)) {
        selectedElements = getByExtendedSelector(
          selectedElements,
          selectorNodeChild
        );
      } else if (isRegularSelectorNode(selectorNodeChild)) {
        selectedElements = getByFollowingRegularSelector(
          selectedElements,
          selectorNodeChild
        );
      }
      i += 1;
    }
    return selectedElements;
  };
  const selectElementsByAst = function (ast) {
    let doc =
      arguments.length > 1 && arguments[1] !== undefined
        ? arguments[1]
        : document;
    const selectedElements = [];
    ast.children.forEach((selectorNode) => {
      selectedElements.push(...getElementsForSelectorNode(selectorNode, doc));
    });
    const uniqueElements = [...new Set(flatten(selectedElements))];
    return uniqueElements;
  };
  class ExtCssDocument {
    constructor() {
      this.astCache = new Map();
    }
    saveAstToCache(selector, ast) {
      this.astCache.set(selector, ast);
    }
    getAstFromCache(selector) {
      const cachedAst = this.astCache.get(selector) || null;
      return cachedAst;
    }
    getSelectorAst(selector) {
      let ast = this.getAstFromCache(selector);
      if (!ast) {
        ast = parse(selector);
      }
      this.saveAstToCache(selector, ast);
      return ast;
    }
    querySelectorAll(selector) {
      const ast = this.getSelectorAst(selector);
      return selectElementsByAst(ast);
    }
  }
  const extCssDocument = new ExtCssDocument();
  const getObjectFromEntries = (entries) => {
    const object = {};
    entries.forEach((el) => {
      const [key, value] = el;
      object[key] = value;
    });
    return object;
  };
  const DEBUG_PSEUDO_PROPERTY_KEY = "debug";
  const parseRemoveSelector = (rawSelector) => {
    const VALID_REMOVE_MARKER = `${COLON}${REMOVE_PSEUDO_MARKER}${BRACKET.PARENTHESES.LEFT}${BRACKET.PARENTHESES.RIGHT}`;
    const INVALID_REMOVE_MARKER = `${COLON}${REMOVE_PSEUDO_MARKER}${BRACKET.PARENTHESES.LEFT}`;
    let selector;
    let shouldRemove = false;
    const firstIndex = rawSelector.indexOf(VALID_REMOVE_MARKER);
    if (firstIndex === 0) {
      throw new Error(
        `${REMOVE_ERROR_PREFIX.NO_TARGET_SELECTOR}: '${rawSelector}'`
      );
    } else if (firstIndex > 0) {
      if (firstIndex !== rawSelector.lastIndexOf(VALID_REMOVE_MARKER)) {
        throw new Error(
          `${REMOVE_ERROR_PREFIX.MULTIPLE_USAGE}: '${rawSelector}'`
        );
      } else if (firstIndex + VALID_REMOVE_MARKER.length < rawSelector.length) {
        throw new Error(
          `${REMOVE_ERROR_PREFIX.INVALID_POSITION}: '${rawSelector}'`
        );
      } else {
        selector = rawSelector.substring(0, firstIndex);
        shouldRemove = true;
      }
    } else if (rawSelector.includes(INVALID_REMOVE_MARKER)) {
      throw new Error(
        `${REMOVE_ERROR_PREFIX.INVALID_REMOVE}: '${rawSelector}'`
      );
    } else {
      selector = rawSelector;
    }
    const stylesOfSelector = shouldRemove
      ? [
          {
            property: REMOVE_PSEUDO_MARKER,
            value: PSEUDO_PROPERTY_POSITIVE_VALUE,
          },
        ]
      : [];
    return {
      selector,
      stylesOfSelector,
    };
  };
  const parseSelectorRulePart = (selectorBuffer, extCssDoc) => {
    let selector = selectorBuffer.trim();
    if (selector.startsWith(AT_RULE_MARKER)) {
      throw new Error(`${NO_AT_RULE_ERROR_PREFIX}: '${selector}'.`);
    }
    let removeSelectorData;
    try {
      removeSelectorData = parseRemoveSelector(selector);
    } catch (e) {
      logger.error(getErrorMessage(e));
      throw new Error(`${REMOVE_ERROR_PREFIX.INVALID_REMOVE}: '${selector}'`);
    }
    let stylesOfSelector = [];
    let success = false;
    let ast;
    try {
      selector = removeSelectorData.selector;
      stylesOfSelector = removeSelectorData.stylesOfSelector;
      ast = extCssDoc.getSelectorAst(selector);
      success = true;
    } catch (e) {
      success = false;
    }
    return {
      success,
      selector,
      ast,
      stylesOfSelector,
    };
  };
  const createRawResultsMap = () => {
    return new Map();
  };
  const saveToRawResults = (rawResults, rawRuleData) => {
    const { selector, ast, rawStyles } = rawRuleData;
    if (!rawStyles) {
      throw new Error(`No style declaration for selector: '${selector}'`);
    }
    if (!ast) {
      throw new Error(`No ast parsed for selector: '${selector}'`);
    }
    const storedRuleData = rawResults.get(selector);
    if (!storedRuleData) {
      rawResults.set(selector, {
        ast,
        styles: rawStyles,
      });
    } else {
      storedRuleData.styles.push(...rawStyles);
    }
  };
  const isRemoveSetInStyles = (styles) => {
    return styles.some((s) => {
      return (
        s.property === REMOVE_PSEUDO_MARKER &&
        s.value === PSEUDO_PROPERTY_POSITIVE_VALUE
      );
    });
  };
  const getDebugStyleValue = (styles) => {
    const debugStyle = styles.find((s) => {
      return s.property === DEBUG_PSEUDO_PROPERTY_KEY;
    });
    return debugStyle === null || debugStyle === void 0
      ? void 0
      : debugStyle.value;
  };
  const prepareRuleData = (rawRuleData) => {
    const { selector, ast, rawStyles } = rawRuleData;
    if (!ast) {
      throw new Error(`AST should be parsed for selector: '${selector}'`);
    }
    if (!rawStyles) {
      throw new Error(`Styles should be parsed for selector: '${selector}'`);
    }
    const ruleData = {
      selector,
      ast,
    };
    const debugValue = getDebugStyleValue(rawStyles);
    const shouldRemove = isRemoveSetInStyles(rawStyles);
    let styles = rawStyles;
    if (debugValue) {
      styles = rawStyles.filter(
        (s) => s.property !== DEBUG_PSEUDO_PROPERTY_KEY
      );
      if (
        debugValue === PSEUDO_PROPERTY_POSITIVE_VALUE ||
        debugValue === DEBUG_PSEUDO_PROPERTY_GLOBAL_VALUE
      ) {
        ruleData.debug = debugValue;
      }
    }
    if (shouldRemove) {
      ruleData.style = {
        [REMOVE_PSEUDO_MARKER]: PSEUDO_PROPERTY_POSITIVE_VALUE,
      };
      const contentStyle = styles.find(
        (s) => s.property === CONTENT_CSS_PROPERTY
      );
      if (contentStyle) {
        ruleData.style[CONTENT_CSS_PROPERTY] = contentStyle.value;
      }
    } else {
      if (styles.length > 0) {
        const stylesAsEntries = styles.map((style) => {
          const { property, value } = style;
          return [property, value];
        });
        const preparedStyleData = getObjectFromEntries(stylesAsEntries);
        ruleData.style = preparedStyleData;
      }
    }
    return ruleData;
  };
  const combineRulesData = (rawResults) => {
    const results = [];
    rawResults.forEach((value, key) => {
      const selector = key;
      const { ast, styles: rawStyles } = value;
      results.push(
        prepareRuleData({
          selector,
          ast,
          rawStyles,
        })
      );
    });
    return results;
  };
  const tokenizeStyleBlock = (rawStyle) => {
    const styleDeclaration = rawStyle.trim();
    return tokenize(styleDeclaration, SUPPORTED_STYLE_DECLARATION_MARKS);
  };
  const DECLARATION_PART = {
    PROPERTY: "property",
    VALUE: "value",
  };
  const isValueQuotesOpen = (context) => {
    return context.bufferValue !== "" && context.valueQuoteMark !== null;
  };
  const collectStyle = (context) => {
    context.styles.push({
      property: context.bufferProperty.trim(),
      value: context.bufferValue.trim(),
    });
    context.bufferProperty = "";
    context.bufferValue = "";
  };
  const processPropertyToken = (context, styleBlock, token) => {
    const { value: tokenValue } = token;
    switch (token.type) {
      case TOKEN_TYPE.WORD:
        if (context.bufferProperty.length > 0) {
          throw new Error(
            `Invalid style property in style block: '${styleBlock}'`
          );
        }
        context.bufferProperty += tokenValue;
        break;
      case TOKEN_TYPE.MARK:
        if (tokenValue === COLON) {
          if (context.bufferProperty.trim().length === 0) {
            throw new Error(
              `Missing style property before ':' in style block: '${styleBlock}'`
            );
          }
          context.bufferProperty = context.bufferProperty.trim();
          context.processing = DECLARATION_PART.VALUE;
        } else if (WHITE_SPACE_CHARACTERS.includes(tokenValue));
        else {
          throw new Error(
            `Invalid style declaration in style block: '${styleBlock}'`
          );
        }
        break;
      default:
        throw new Error(
          `Unsupported style property character: '${tokenValue}' in style block: '${styleBlock}'`
        );
    }
  };
  const processValueToken = (context, styleBlock, token) => {
    const { value: tokenValue } = token;
    if (token.type === TOKEN_TYPE.WORD) {
      context.bufferValue += tokenValue;
    } else {
      switch (tokenValue) {
        case COLON:
          if (!isValueQuotesOpen(context)) {
            throw new Error(
              `Invalid style value for property '${context.bufferProperty}' in style block: '${styleBlock}'`
            );
          }
          context.bufferValue += tokenValue;
          break;
        case SEMICOLON:
          if (isValueQuotesOpen(context)) {
            context.bufferValue += tokenValue;
          } else {
            collectStyle(context);
            context.processing = DECLARATION_PART.PROPERTY;
          }
          break;
        case SINGLE_QUOTE:
        case DOUBLE_QUOTE:
          if (context.valueQuoteMark === null) {
            context.valueQuoteMark = tokenValue;
          } else if (
            !context.bufferValue.endsWith(BACKSLASH) &&
            context.valueQuoteMark === tokenValue
          ) {
            context.valueQuoteMark = null;
          }
          context.bufferValue += tokenValue;
          break;
        case BACKSLASH:
          if (!isValueQuotesOpen(context)) {
            throw new Error(
              `Invalid style value for property '${context.bufferProperty}' in style block: '${styleBlock}'`
            );
          }
          context.bufferValue += tokenValue;
          break;
        case SPACE:
        case TAB:
        case CARRIAGE_RETURN:
        case LINE_FEED:
        case FORM_FEED:
          if (context.bufferValue.length > 0) {
            context.bufferValue += tokenValue;
          }
          break;
        default:
          throw new Error(`Unknown style declaration token: '${tokenValue}'`);
      }
    }
  };
  const parseStyleBlock = (rawStyleBlock) => {
    const styleBlock = rawStyleBlock.trim();
    const tokens = tokenizeStyleBlock(styleBlock);
    const context = {
      processing: DECLARATION_PART.PROPERTY,
      styles: [],
      bufferProperty: "",
      bufferValue: "",
      valueQuoteMark: null,
    };
    let i = 0;
    while (i < tokens.length) {
      const token = tokens[i];
      if (!token) {
        break;
      }
      if (context.processing === DECLARATION_PART.PROPERTY) {
        processPropertyToken(context, styleBlock, token);
      } else if (context.processing === DECLARATION_PART.VALUE) {
        processValueToken(context, styleBlock, token);
      } else {
        throw new Error("Style declaration parsing failed");
      }
      i += 1;
    }
    if (isValueQuotesOpen(context)) {
      throw new Error(
        `Unbalanced style declaration quotes in style block: '${styleBlock}'`
      );
    }
    if (context.bufferProperty.length > 0) {
      if (context.bufferValue.length === 0) {
        throw new Error(
          `Missing style value for property '${context.bufferProperty}' in style block '${styleBlock}'`
        );
      }
      collectStyle(context);
    }
    if (context.styles.length === 0) {
      throw new Error(STYLE_ERROR_PREFIX.NO_STYLE);
    }
    return context.styles;
  };
  const getLeftCurlyBracketIndexes = (cssRule) => {
    const indexes = [];
    for (let i = 0; i < cssRule.length; i += 1) {
      if (cssRule[i] === BRACKET.CURLY.LEFT) {
        indexes.push(i);
      }
    }
    return indexes;
  };
  const parseRule = (rawCssRule, extCssDoc) => {
    var _rawRuleData$selector;
    const cssRule = rawCssRule.trim();
    if (
      cssRule.includes(`${SLASH}${ASTERISK}`) &&
      cssRule.includes(`${ASTERISK}${SLASH}`)
    ) {
      throw new Error(STYLE_ERROR_PREFIX.NO_COMMENT);
    }
    const leftCurlyBracketIndexes = getLeftCurlyBracketIndexes(cssRule);
    if (getFirst(leftCurlyBracketIndexes) === 0) {
      throw new Error(NO_SELECTOR_ERROR_PREFIX);
    }
    let selectorData;
    if (
      leftCurlyBracketIndexes.length > 0 &&
      !cssRule.includes(BRACKET.CURLY.RIGHT)
    ) {
      throw new Error(
        `${STYLE_ERROR_PREFIX.NO_STYLE} OR ${STYLE_ERROR_PREFIX.UNCLOSED_STYLE}`
      );
    }
    if (
      leftCurlyBracketIndexes.length === 0 ||
      !cssRule.includes(BRACKET.CURLY.RIGHT)
    ) {
      try {
        selectorData = parseSelectorRulePart(cssRule, extCssDoc);
        if (selectorData.success) {
          var _selectorData$stylesO;
          if (
            ((_selectorData$stylesO = selectorData.stylesOfSelector) === null ||
            _selectorData$stylesO === void 0
              ? void 0
              : _selectorData$stylesO.length) === 0
          ) {
            throw new Error(STYLE_ERROR_PREFIX.NO_STYLE_OR_REMOVE);
          }
          return {
            selector: selectorData.selector.trim(),
            ast: selectorData.ast,
            rawStyles: selectorData.stylesOfSelector,
          };
        } else {
          throw new Error("Invalid selector");
        }
      } catch (e) {
        throw new Error(getErrorMessage(e));
      }
    }
    let selectorBuffer;
    let styleBlockBuffer;
    const rawRuleData = {
      selector: "",
    };
    for (let i = leftCurlyBracketIndexes.length - 1; i > -1; i -= 1) {
      const index = leftCurlyBracketIndexes[i];
      if (!index) {
        throw new Error(
          `Impossible to continue, no '{' to process for rule: '${cssRule}'`
        );
      }
      selectorBuffer = cssRule.slice(0, index);
      styleBlockBuffer = cssRule.slice(index + 1, cssRule.length - 1);
      selectorData = parseSelectorRulePart(selectorBuffer, extCssDoc);
      if (selectorData.success) {
        var _rawRuleData$rawStyle;
        rawRuleData.selector = selectorData.selector.trim();
        rawRuleData.ast = selectorData.ast;
        rawRuleData.rawStyles = selectorData.stylesOfSelector;
        const parsedStyles = parseStyleBlock(styleBlockBuffer);
        (_rawRuleData$rawStyle = rawRuleData.rawStyles) === null ||
        _rawRuleData$rawStyle === void 0
          ? void 0
          : _rawRuleData$rawStyle.push(...parsedStyles);
        break;
      } else {
        continue;
      }
    }
    if (
      ((_rawRuleData$selector = rawRuleData.selector) === null ||
      _rawRuleData$selector === void 0
        ? void 0
        : _rawRuleData$selector.length) === 0
    ) {
      throw new Error("Selector in not valid");
    }
    return rawRuleData;
  };
  const parseRules$1 = (rawCssRules, extCssDoc) => {
    const rawResults = createRawResultsMap();
    const warnings = [];
    const uniqueRules = [...new Set(rawCssRules.map((r) => r.trim()))];
    uniqueRules.forEach((rule) => {
      try {
        saveToRawResults(rawResults, parseRule(rule, extCssDoc));
      } catch (e) {
        const errorMessage = getErrorMessage(e);
        warnings.push(`'${rule}' - error: '${errorMessage}'`);
      }
    });
    if (warnings.length > 0) {
      logger.info(`Invalid rules:\n  ${warnings.join("\n  ")}`);
    }
    return combineRulesData(rawResults);
  };
  const REGEXP_DECLARATION_END = /[;}]/g;
  const REGEXP_DECLARATION_DIVIDER = /[;:}]/g;
  const REGEXP_NON_WHITESPACE = /\S/g;
  const restoreRuleAcc = (context) => {
    context.rawRuleData = {
      selector: "",
    };
  };
  const parseSelectorPart = (context, extCssDoc) => {
    let selector = context.selectorBuffer.trim();
    if (selector.startsWith(AT_RULE_MARKER)) {
      throw new Error(`${NO_AT_RULE_ERROR_PREFIX}: '${selector}'.`);
    }
    let removeSelectorData;
    try {
      removeSelectorData = parseRemoveSelector(selector);
    } catch (e) {
      logger.error(getErrorMessage(e));
      throw new Error(`${REMOVE_ERROR_PREFIX.INVALID_REMOVE}: '${selector}'`);
    }
    if (context.nextIndex === -1) {
      if (selector === removeSelectorData.selector) {
        throw new Error(
          `${STYLE_ERROR_PREFIX.NO_STYLE_OR_REMOVE}: '${context.cssToParse}'`
        );
      }
      context.cssToParse = "";
    }
    let stylesOfSelector = [];
    let success = false;
    let ast;
    try {
      selector = removeSelectorData.selector;
      stylesOfSelector = removeSelectorData.stylesOfSelector;
      ast = extCssDoc.getSelectorAst(selector);
      success = true;
    } catch (e) {
      success = false;
    }
    if (context.nextIndex > 0) {
      context.cssToParse = context.cssToParse.slice(context.nextIndex);
    }
    return {
      success,
      selector,
      ast,
      stylesOfSelector,
    };
  };
  const parseUntilClosingBracket = (context, styles) => {
    REGEXP_DECLARATION_DIVIDER.lastIndex = context.nextIndex;
    let match = REGEXP_DECLARATION_DIVIDER.exec(context.cssToParse);
    if (match === null) {
      throw new Error(
        `${STYLE_ERROR_PREFIX.INVALID_STYLE}: '${context.cssToParse}'`
      );
    }
    let matchPos = match.index;
    let matched = match[0];
    if (matched === BRACKET.CURLY.RIGHT) {
      const declarationChunk = context.cssToParse.slice(
        context.nextIndex,
        matchPos
      );
      if (declarationChunk.trim().length === 0) {
        if (styles.length === 0) {
          throw new Error(
            `${STYLE_ERROR_PREFIX.NO_STYLE}: '${context.cssToParse}'`
          );
        }
      } else {
        throw new Error(
          `${STYLE_ERROR_PREFIX.INVALID_STYLE}: '${context.cssToParse}'`
        );
      }
      return matchPos;
    }
    if (matched === COLON) {
      const colonIndex = matchPos;
      REGEXP_DECLARATION_END.lastIndex = colonIndex;
      match = REGEXP_DECLARATION_END.exec(context.cssToParse);
      if (match === null) {
        throw new Error(
          `${STYLE_ERROR_PREFIX.UNCLOSED_STYLE}: '${context.cssToParse}'`
        );
      }
      matchPos = match.index;
      matched = match[0];
      const property = context.cssToParse
        .slice(context.nextIndex, colonIndex)
        .trim();
      if (property.length === 0) {
        throw new Error(
          `${STYLE_ERROR_PREFIX.NO_PROPERTY}: '${context.cssToParse}'`
        );
      }
      const value = context.cssToParse.slice(colonIndex + 1, matchPos).trim();
      if (value.length === 0) {
        throw new Error(
          `${STYLE_ERROR_PREFIX.NO_VALUE}: '${context.cssToParse}'`
        );
      }
      styles.push({
        property,
        value,
      });
      if (matched === BRACKET.CURLY.RIGHT) {
        return matchPos;
      }
    }
    context.cssToParse = context.cssToParse.slice(matchPos + 1);
    context.nextIndex = 0;
    return parseUntilClosingBracket(context, styles);
  };
  const parseNextStyle = (context) => {
    const styles = [];
    const styleEndPos = parseUntilClosingBracket(context, styles);
    REGEXP_NON_WHITESPACE.lastIndex = styleEndPos + 1;
    const match = REGEXP_NON_WHITESPACE.exec(context.cssToParse);
    if (match === null) {
      context.cssToParse = "";
      return styles;
    }
    const matchPos = match.index;
    context.cssToParse = context.cssToParse.slice(matchPos);
    return styles;
  };
  const parseStylesheet = (rawStylesheet, extCssDoc) => {
    const stylesheet = rawStylesheet.trim();
    if (
      stylesheet.includes(`${SLASH}${ASTERISK}`) &&
      stylesheet.includes(`${ASTERISK}${SLASH}`)
    ) {
      throw new Error(
        `${STYLE_ERROR_PREFIX.NO_COMMENT} in stylesheet: '${stylesheet}'`
      );
    }
    const context = {
      isSelector: true,
      nextIndex: 0,
      cssToParse: stylesheet,
      selectorBuffer: "",
      rawRuleData: {
        selector: "",
      },
    };
    const rawResults = createRawResultsMap();
    let selectorData;
    while (context.cssToParse) {
      if (context.isSelector) {
        context.nextIndex = context.cssToParse.indexOf(BRACKET.CURLY.LEFT);
        if (context.selectorBuffer.length === 0 && context.nextIndex === 0) {
          throw new Error(
            `${STYLE_ERROR_PREFIX.NO_SELECTOR}: '${context.cssToParse}'`
          );
        }
        if (context.nextIndex === -1) {
          context.selectorBuffer = context.cssToParse;
        } else {
          context.selectorBuffer += context.cssToParse.slice(
            0,
            context.nextIndex
          );
        }
        selectorData = parseSelectorPart(context, extCssDoc);
        if (selectorData.success) {
          context.rawRuleData.selector = selectorData.selector.trim();
          context.rawRuleData.ast = selectorData.ast;
          context.rawRuleData.rawStyles = selectorData.stylesOfSelector;
          context.isSelector = false;
          if (context.nextIndex === -1) {
            saveToRawResults(rawResults, context.rawRuleData);
            restoreRuleAcc(context);
          } else {
            context.nextIndex = 1;
            context.selectorBuffer = "";
          }
        } else {
          context.selectorBuffer += BRACKET.CURLY.LEFT;
          context.cssToParse = context.cssToParse.slice(1);
        }
      } else {
        var _context$rawRuleData$;
        const parsedStyles = parseNextStyle(context);
        (_context$rawRuleData$ = context.rawRuleData.rawStyles) === null ||
        _context$rawRuleData$ === void 0
          ? void 0
          : _context$rawRuleData$.push(...parsedStyles);
        saveToRawResults(rawResults, context.rawRuleData);
        context.nextIndex = 0;
        restoreRuleAcc(context);
        context.isSelector = true;
      }
    }
    return combineRulesData(rawResults);
  };
  const isNumber = (arg) => {
    return typeof arg === "number" && !Number.isNaN(arg);
  };
  class ThrottleWrapper {
    constructor(callback) {
      this.callback = callback;
      this.executeCallback = this.executeCallback.bind(this);
    }
    executeCallback() {
      this.lastRunTime = performance.now();
      if (isNumber(this.timerId)) {
        clearTimeout(this.timerId);
        delete this.timerId;
      }
      this.callback();
    }
    run() {
      if (isNumber(this.timerId)) {
        return;
      }
      if (isNumber(this.lastRunTime)) {
        const elapsedTime = performance.now() - this.lastRunTime;
        if (elapsedTime < ThrottleWrapper.THROTTLE_DELAY_MS) {
          this.timerId = window.setTimeout(
            this.executeCallback,
            ThrottleWrapper.THROTTLE_DELAY_MS - elapsedTime
          );
          return;
        }
      }
      this.timerId = window.setTimeout(this.executeCallback);
    }
  }
  _defineProperty(ThrottleWrapper, "THROTTLE_DELAY_MS", 150);
  const LAST_EVENT_TIMEOUT_MS = 10;
  const IGNORED_EVENTS = ["mouseover", "mouseleave", "mouseenter", "mouseout"];
  const SUPPORTED_EVENTS = [
    "keydown",
    "keypress",
    "keyup",
    "auxclick",
    "click",
    "contextmenu",
    "dblclick",
    "mousedown",
    "mouseenter",
    "mouseleave",
    "mousemove",
    "mouseover",
    "mouseout",
    "mouseup",
    "pointerlockchange",
    "pointerlockerror",
    "select",
    "wheel",
  ];
  const SAFARI_PROBLEMATIC_EVENTS = ["wheel"];
  class EventTracker {
    constructor() {
      _defineProperty(this, "getLastEventType", () => this.lastEventType);
      _defineProperty(this, "getTimeSinceLastEvent", () => {
        if (!this.lastEventTime) {
          return null;
        }
        return Date.now() - this.lastEventTime;
      });
      this.trackedEvents = isSafariBrowser
        ? SUPPORTED_EVENTS.filter(
            (event) => !SAFARI_PROBLEMATIC_EVENTS.includes(event)
          )
        : SUPPORTED_EVENTS;
      this.trackedEvents.forEach((eventName) => {
        document.documentElement.addEventListener(
          eventName,
          this.trackEvent,
          true
        );
      });
    }
    trackEvent(event) {
      this.lastEventType = event.type;
      this.lastEventTime = Date.now();
    }
    isIgnoredEventType() {
      const lastEventType = this.getLastEventType();
      const sinceLastEventTime = this.getTimeSinceLastEvent();
      return (
        !!lastEventType &&
        IGNORED_EVENTS.includes(lastEventType) &&
        !!sinceLastEventTime &&
        sinceLastEventTime < LAST_EVENT_TIMEOUT_MS
      );
    }
    stopTracking() {
      this.trackedEvents.forEach((eventName) => {
        document.documentElement.removeEventListener(
          eventName,
          this.trackEvent,
          true
        );
      });
    }
  }
  function shouldIgnoreMutations(mutations) {
    return !mutations.some((m) => m.type !== "attributes");
  }
  function observeDocument(context) {
    if (context.isDomObserved) {
      return;
    }
    context.isDomObserved = true;
    context.domMutationObserver = new natives.MutationObserver((mutations) => {
      if (!mutations || mutations.length === 0) {
        return;
      }
      const eventTracker = new EventTracker();
      if (
        eventTracker.isIgnoredEventType() &&
        shouldIgnoreMutations(mutations)
      ) {
        return;
      }
      context.eventTracker = eventTracker;
      context.scheduler.run();
    });
    context.domMutationObserver.observe(document, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["id", "class"],
    });
  }
  function disconnectDocument(context) {
    if (!context.isDomObserved) {
      return;
    }
    context.isDomObserved = false;
    if (context.domMutationObserver) {
      context.domMutationObserver.disconnect();
    }
    if (context.eventTracker) {
      context.eventTracker.stopTracking();
    }
  }
  const CONTENT_ATTR_PREFIX_REGEXP = /^("|')adguard.+?/;
  const removeElement = (context, affectedElement) => {
    const { node } = affectedElement;
    affectedElement.removed = true;
    const elementSelector = getElementSelectorPath(node);
    const elementRemovalsCounter =
      context.removalsStatistic[elementSelector] || 0;
    if (elementRemovalsCounter > MAX_STYLE_PROTECTION_COUNT) {
      logger.error(
        `ExtendedCss: infinite loop protection for selector: '${elementSelector}'`
      );
      return;
    }
    if (node.parentElement) {
      node.parentElement.removeChild(node);
      context.removalsStatistic[elementSelector] = elementRemovalsCounter + 1;
    }
  };
  const setStyleToElement = (node, style) => {
    if (!(node instanceof HTMLElement)) {
      return;
    }
    Object.keys(style).forEach((prop) => {
      if (typeof node.style.getPropertyValue(prop.toString()) !== "undefined") {
        let value = style[prop];
        if (!value) {
          return;
        }
        if (
          prop === CONTENT_CSS_PROPERTY &&
          value.match(CONTENT_ATTR_PREFIX_REGEXP)
        ) {
          return;
        }
        value = removeSuffix(value.trim(), "!important").trim();
        node.style.setProperty(prop, value, "important");
      }
    });
  };
  const isIAffectedElement = (affectedElement) => {
    return (
      "node" in affectedElement &&
      "rules" in affectedElement &&
      affectedElement.rules instanceof Array
    );
  };
  const isAffectedElement = (affectedElement) => {
    return (
      "node" in affectedElement &&
      "originalStyle" in affectedElement &&
      "rules" in affectedElement &&
      affectedElement.rules instanceof Array
    );
  };
  const applyStyle = (context, rawAffectedElement) => {
    if (rawAffectedElement.protectionObserver) {
      return;
    }
    let affectedElement;
    if (context.beforeStyleApplied) {
      if (!isIAffectedElement(rawAffectedElement)) {
        throw new Error(
          "Returned IAffectedElement should have 'node' and 'rules' properties"
        );
      }
      affectedElement = context.beforeStyleApplied(rawAffectedElement);
      if (!affectedElement) {
        throw new Error(
          "Callback 'beforeStyleApplied' should return IAffectedElement"
        );
      }
    } else {
      affectedElement = rawAffectedElement;
    }
    if (!isAffectedElement(affectedElement)) {
      throw new Error(
        "Returned IAffectedElement should have 'node' and 'rules' properties"
      );
    }
    const { node, rules } = affectedElement;
    for (let i = 0; i < rules.length; i += 1) {
      const rule = rules[i];
      const selector =
        rule === null || rule === void 0 ? void 0 : rule.selector;
      const style = rule === null || rule === void 0 ? void 0 : rule.style;
      const debug = rule === null || rule === void 0 ? void 0 : rule.debug;
      if (style) {
        if (style[REMOVE_PSEUDO_MARKER] === PSEUDO_PROPERTY_POSITIVE_VALUE) {
          removeElement(context, affectedElement);
          return;
        }
        setStyleToElement(node, style);
      } else if (!debug) {
        throw new Error(
          `No style declaration in rule for selector: '${selector}'`
        );
      }
    }
  };
  const revertStyle = (affectedElement) => {
    if (affectedElement.protectionObserver) {
      affectedElement.protectionObserver.disconnect();
    }
    affectedElement.node.style.cssText = affectedElement.originalStyle;
  };
  class ExtMutationObserver {
    constructor(protectionCallback) {
      this.styleProtectionCount = 0;
      this.observer = new natives.MutationObserver((mutations) => {
        if (!mutations.length) {
          return;
        }
        this.styleProtectionCount += 1;
        protectionCallback(mutations, this);
      });
    }
    observe(target, options) {
      if (this.styleProtectionCount < MAX_STYLE_PROTECTION_COUNT) {
        this.observer.observe(target, options);
      } else {
        logger.error("ExtendedCss: infinite loop protection for style");
      }
    }
    disconnect() {
      this.observer.disconnect();
    }
  }
  const PROTECTION_OBSERVER_OPTIONS = {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ["style"],
  };
  const createProtectionCallback = (styles) => {
    const protectionCallback = (mutations, extObserver) => {
      if (!mutations[0]) {
        return;
      }
      const { target } = mutations[0];
      extObserver.disconnect();
      styles.forEach((style) => {
        setStyleToElement(target, style);
      });
      extObserver.observe(target, PROTECTION_OBSERVER_OPTIONS);
    };
    return protectionCallback;
  };
  const protectStyleAttribute = (node, rules) => {
    if (!natives.MutationObserver) {
      return null;
    }
    const styles = [];
    rules.forEach((ruleData) => {
      const { style } = ruleData;
      if (style) {
        styles.push(style);
      }
    });
    const protectionObserver = new ExtMutationObserver(
      createProtectionCallback(styles)
    );
    protectionObserver.observe(node, PROTECTION_OBSERVER_OPTIONS);
    return protectionObserver;
  };
  const STATS_DECIMAL_DIGITS_COUNT = 4;
  class TimingStats {
    constructor() {
      this.appliesTimings = [];
      this.appliesCount = 0;
      this.timingsSum = 0;
      this.meanTiming = 0;
      this.squaredSum = 0;
      this.standardDeviation = 0;
    }
    push(elapsedTimeMs) {
      this.appliesTimings.push(elapsedTimeMs);
      this.appliesCount += 1;
      this.timingsSum += elapsedTimeMs;
      this.meanTiming = this.timingsSum / this.appliesCount;
      this.squaredSum += elapsedTimeMs * elapsedTimeMs;
      this.standardDeviation = Math.sqrt(
        this.squaredSum / this.appliesCount - Math.pow(this.meanTiming, 2)
      );
    }
  }
  const beautifyTimingNumber = (timestamp) => {
    return Number(timestamp.toFixed(STATS_DECIMAL_DIGITS_COUNT));
  };
  const beautifyTimings = (rawTimings) => {
    return {
      appliesTimings: rawTimings.appliesTimings.map((t) =>
        beautifyTimingNumber(t)
      ),
      appliesCount: beautifyTimingNumber(rawTimings.appliesCount),
      timingsSum: beautifyTimingNumber(rawTimings.timingsSum),
      meanTiming: beautifyTimingNumber(rawTimings.meanTiming),
      standardDeviation: beautifyTimingNumber(rawTimings.standardDeviation),
    };
  };
  const printTimingInfo = (context) => {
    if (context.areTimingsPrinted) {
      return;
    }
    context.areTimingsPrinted = true;
    const timingsLogData = {};
    context.parsedRules.forEach((ruleData) => {
      if (ruleData.timingStats) {
        const { selector, style, debug, matchedElements } = ruleData;
        if (!style && !debug) {
          throw new Error(
            `Rule should have style declaration for selector: '${selector}'`
          );
        }
        const selectorData = {
          selectorParsed: selector,
          timings: beautifyTimings(ruleData.timingStats),
        };
        if (
          style &&
          style[REMOVE_PSEUDO_MARKER] === PSEUDO_PROPERTY_POSITIVE_VALUE
        ) {
          selectorData.removed = true;
        } else {
          selectorData.styleApplied = style || null;
          selectorData.matchedElements = matchedElements;
        }
        timingsLogData[selector] = selectorData;
      }
    });
    if (Object.keys(timingsLogData).length === 0) {
      return;
    }
    logger.info(
      "[ExtendedCss] Timings in milliseconds for %o:\n%o",
      window.location.href,
      timingsLogData
    );
  };
  const findAffectedElement = (affElements, domNode) => {
    return affElements.find((affEl) => affEl.node === domNode);
  };
  const applyRule = (context, ruleData) => {
    const isDebuggingMode = !!ruleData.debug || context.debug;
    let startTime;
    if (isDebuggingMode) {
      startTime = performance.now();
    }
    const { ast } = ruleData;
    const nodes = [];
    try {
      nodes.push(...selectElementsByAst(ast));
    } catch (e) {
      if (context.debug) {
        logger.error(getErrorMessage(e));
      }
    }
    nodes.forEach((node) => {
      let affectedElement = findAffectedElement(context.affectedElements, node);
      if (affectedElement) {
        affectedElement.rules.push(ruleData);
        applyStyle(context, affectedElement);
      } else {
        const originalStyle = node.style.cssText;
        affectedElement = {
          node,
          rules: [ruleData],
          originalStyle,
          protectionObserver: null,
        };
        applyStyle(context, affectedElement);
        context.affectedElements.push(affectedElement);
      }
    });
    if (isDebuggingMode && startTime) {
      const elapsedTimeMs = performance.now() - startTime;
      if (!ruleData.timingStats) {
        ruleData.timingStats = new TimingStats();
      }
      ruleData.timingStats.push(elapsedTimeMs);
    }
    return nodes;
  };
  const applyRules = (context) => {
    const newSelectedElements = [];
    disconnectDocument(context);
    context.parsedRules.forEach((ruleData) => {
      const nodes = applyRule(context, ruleData);
      Array.prototype.push.apply(newSelectedElements, nodes);
      if (ruleData.debug) {
        ruleData.matchedElements = nodes;
      }
    });
    let affLength = context.affectedElements.length;
    while (affLength) {
      const affectedElement = context.affectedElements[affLength - 1];
      if (!affectedElement) {
        break;
      }
      if (!newSelectedElements.includes(affectedElement.node)) {
        revertStyle(affectedElement);
        context.affectedElements.splice(affLength - 1, 1);
      } else if (!affectedElement.removed) {
        if (!affectedElement.protectionObserver) {
          affectedElement.protectionObserver = protectStyleAttribute(
            affectedElement.node,
            affectedElement.rules
          );
        }
      }
      affLength -= 1;
    }
    observeDocument(context);
    printTimingInfo(context);
  };
  class ExtendedCss {
    constructor(configuration) {
      if (!configuration) {
        throw new Error("ExtendedCss configuration should be provided.");
      }
      this.applyRulesCallbackListener =
        this.applyRulesCallbackListener.bind(this);
      this.context = {
        beforeStyleApplied: configuration.beforeStyleApplied,
        debug: false,
        affectedElements: [],
        isDomObserved: false,
        removalsStatistic: {},
        parsedRules: [],
        scheduler: new ThrottleWrapper(this.applyRulesCallbackListener),
      };
      if (!isBrowserSupported()) {
        logger.error("Browser is not supported by ExtendedCss");
        return;
      }
      if (!configuration.styleSheet && !configuration.cssRules) {
        throw new Error(
          "ExtendedCss configuration should have 'styleSheet' or 'cssRules' defined."
        );
      }
      if (configuration.styleSheet) {
        try {
          this.context.parsedRules.push(
            ...parseStylesheet(configuration.styleSheet, extCssDocument)
          );
        } catch (e) {
          throw new Error(
            `Pass the rules as configuration.cssRules since configuration.styleSheet cannot be parsed because of: '${getErrorMessage(
              e
            )}'`
          );
        }
      }
      if (configuration.cssRules) {
        this.context.parsedRules.push(
          ...parseRules$1(configuration.cssRules, extCssDocument)
        );
      }
      this.context.debug =
        configuration.debug ||
        this.context.parsedRules.some((ruleData) => {
          return ruleData.debug === DEBUG_PSEUDO_PROPERTY_GLOBAL_VALUE;
        });
      if (
        this.context.beforeStyleApplied &&
        typeof this.context.beforeStyleApplied !== "function"
      ) {
        throw new Error(
          `Invalid configuration. Type of 'beforeStyleApplied' should be a function, received: '${typeof this
            .context.beforeStyleApplied}'`
        );
      }
    }
    applyRulesCallbackListener() {
      applyRules(this.context);
    }
    init() {
      nativeTextContent.setGetter();
    }
    apply() {
      applyRules(this.context);
      if (document.readyState !== "complete") {
        document.addEventListener(
          "DOMContentLoaded",
          this.applyRulesCallbackListener,
          false
        );
      }
    }
    dispose() {
      disconnectDocument(this.context);
      this.context.affectedElements.forEach((el) => {
        revertStyle(el);
      });
      document.removeEventListener(
        "DOMContentLoaded",
        this.applyRulesCallbackListener,
        false
      );
    }
    getAffectedElements() {
      return this.context.affectedElements;
    }
    static query(selector) {
      let noTiming =
        arguments.length > 1 && arguments[1] !== undefined
          ? arguments[1]
          : true;
      if (typeof selector !== "string") {
        throw new Error("Selector should be defined as a string.");
      }
      const start = performance.now();
      try {
        return extCssDocument.querySelectorAll(selector);
      } finally {
        const end = performance.now();
        if (!noTiming) {
          logger.info(
            `[ExtendedCss] Elapsed: ${Math.round((end - start) * 1000)} μs.`
          );
        }
      }
    }
    static validate(inputSelector) {
      try {
        const { selector } = parseRemoveSelector(inputSelector);
        ExtendedCss.query(selector);
        return {
          ok: true,
          error: null,
        };
      } catch (e) {
        const error = `Error: Invalid selector: '${inputSelector}' -- ${getErrorMessage(
          e
        )}`;
        return {
          ok: false,
          error,
        };
      }
    }
  }

  function canApplyCss(type) {
    return (
      (data.appliedLevel & (type >= 2 ? 2 : 1)) == 0 &&
      data[styleBoxes[type]].length > 0
    );
  }

  function getCustomRules(saveHash) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield Promise.resolve(String(saveHash));
    });
  }
  function initRules(apply) {
    let abpRules = {};
    data.receivedRules = "";
    getCustomRules(true);
    Object.keys(abpRules).forEach((name) => {
      data.receivedRules += "\n" + abpRules[name];
    });
    data.allRules = data.customRules + data.receivedRules;
    if (apply) splitRules();
    return data.receivedRules.length;
  }
  function styleApplyExec(type) {
    if (canApplyCss(type)) {
      const csss = data[styleBoxes[type]];
      new ExtendedCss({
        styleSheet: csss.replaceAll(/\/\*\s*\d.+?\s*\*\//g, ""),
      }).apply();
      if (!(type % 2 == 1)) addStyle(csss);
    }
  }
  function styleApply() {
    for (let type = 0; type < 4; type++) styleApplyExec(type);
  }
  function parseRules() {
    function addRule(rule, exten) {
      const [full, selector] = ruleToCss(rule, data.preset);
      const index = exten + (rule.generic ? 0 : 2);
      const checkResult = ExtendedCss.validate(selector);
      if (checkResult.ok) {
        data[styleBoxes[index]] += full;
        data.appliedCount++;
      } else {
        console.error("选择器检查错误:", rule, checkResult.error);
      }
    }
    styleBoxes.forEach((box) => {
      data[box] = "";
    });
    [data.styles, data.extStyles, data.selectors, data.extSelectors].forEach(
      (r, t) => {
        const sels = new Set();
        r.white.forEach((obj) => !sels.has(obj.sel) && sels.add(obj.sel));
        r.black
          .filter((obj) => !sels.has(obj.sel) && sels.add(obj.sel))
          .forEach((s) => addRule(s, t % 2));
      }
    );
    if (!data.saved) styleApply();
  }
  function splitRules() {
    dataBoxes.forEach((box) => {
      data[box] = makeRuleBox();
    });
    data.allRules.split("\n").forEach((rule) => {
      {
        const ruleObj = ruleLoader(rule);
        if (typeof ruleObj !== "undefined") {
          if (
            ruleObj.black === "black" &&
            data[dataBoxes[ruleObj.type]].white.includes(ruleObj)
          )
            return;
          data[dataBoxes[ruleObj.type]][ruleObj.black].push(ruleObj);
        }
      }
    });
    parseRules();
  }

  function main() {
    return __awaiter(this, void 0, void 0, function* () {
      yield getCustomRules(false);
      {
        if (initRules(false) === 0) {
          initRules(true);
        }
        splitRules();
      }
    });
  }
  function runOnce(key, func) {
    if (key in cat.unsafeWindow) return Promise.reject();
    cat.unsafeWindow[key] = true;
    return func();
  }
  {
    runOnce(data.mutex, main);
  }
})({
  GM_info: typeof GM_info == "object" ? GM_info : {},
  unsafeWindow: typeof unsafeWindow == "object" ? unsafeWindow : window,
  GM_addStyle: typeof GM_addStyle == "function" ? GM_addStyle : undefined,
});
