"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Component =
/*#__PURE__*/
function () {
  /**
   * Generic constructor for all components
   * @constructor
   * @param {Element} el
   * @param {Object} _
   */

  /* eslint-disable */
  function Component(ClassDef, elem, _ref) {
    var _ref$options = _ref.options,
        options = _ref$options === void 0 ? [] : _ref$options;
    (0, _classCallCheck2["default"])(this, Component);

    if (!(elem instanceof Element)) {
      console.log("".concat(elem, " is not an HTML Element"));
    }

    this.elem = elem;
    /* eslint-enable */
  }
  /**
   * Initializes components
   * @param {class} classDef
   * @param {Element | NodeList} els
   * @param {Object} options
   */


  (0, _createClass2["default"])(Component, null, [{
    key: "init",
    value: function init(ClassDef, elem, options) {
      var instances = null;

      if (elem instanceof Element) {
        instances = new ClassDef(elem, options);
      } else if (!!elem && elem instanceof NodeList) {
        var instancesArr = [];

        for (var i = 0; i < elem.length; i += 1) {
          instancesArr.push(new ClassDef(elem[i], options));
        }

        instances = instancesArr;
      } else {
        instances = new ClassDef(null, options);
      }

      return instances;
    }
  }]);
  return Component;
}();

var _default = Component;
exports["default"] = _default;
//# sourceMappingURL=component.js.map