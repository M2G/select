"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _pubsub = _interopRequireDefault(require("@m2g/pubsub"));

var _debounce = _interopRequireDefault(require("./debounce"));

var _component = _interopRequireDefault(require("./component"));

var _wrap = _interopRequireDefault(require("./wrap"));

var _constants = require("./constants");

var BLUR = _constants.SYSTEM_EVENTS.BLUR,
    CHANGE = _constants.SYSTEM_EVENTS.CHANGE,
    RESET = _constants.SYSTEM_EVENTS.RESET;
var ON_CLICK = _constants.DOM_EVENTS.ON_CLICK,
    ON_BLUR = _constants.DOM_EVENTS.ON_BLUR,
    ON_FOCUS = _constants.DOM_EVENTS.ON_FOCUS,
    ON_KEY_UP = _constants.DOM_EVENTS.ON_KEY_UP,
    ON_MOUSE_DOWN = _constants.DOM_EVENTS.ON_MOUSE_DOWN;
var ENTER = _constants.KEYS.ENTER,
    ARROW_UP = _constants.KEYS.ARROW_UP,
    ARROW_DOWN = _constants.KEYS.ARROW_DOWN;
/**
 * @class
 * @constructor
 * @public
 */

var Select =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(Select, _Component);

  /**
   * Construct Select instance
   * @constructor
   * @param {Element} elem
   * @param {Object} params
   */
  function Select(elem, params) {
    var _this;

    (0, _classCallCheck2["default"])(this, Select);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Select).call(this, Select, elem, params));
    var _params$placeholder = params.placeholder,
        placeholder = _params$placeholder === void 0 ? '' : _params$placeholder,
        _params$name = params.name,
        name = _params$name === void 0 ? '' : _params$name,
        _params$options = params.options,
        options = _params$options === void 0 ? [] : _params$options,
        _params$label = params.label,
        label = _params$label === void 0 ? '' : _params$label; // instantiation pubsub

    _this.events = new _pubsub["default"](); // Setup

    _this.isOpen = false;
    _this.count = 0;
    _this.options = options;

    if (_this.elem && _this.elem.tagName === 'SELECT') {
      // select tag in DOM
      _this.select = _this.elem; // read values from DOM

      for (var i = 0; i < _this.select.children.length; i += 1) {
        if (_this.select.children[i].value && _this.select.children[i].innerText) {
          _this.options[i] = {
            value: _this.select.children[i].value,
            label: _this.select.children[i].innerText
          };
        }
      }
    } else {
      // select created programmatically
      _this.select = document.createElement('select');

      _this.select.setAttribute('name', name); // https://www.freecodecamp.org/forum/t/create-strings-using-template-literals-with-for-loop/220850


      var selectOptions = [];

      for (var _i = 0; _i < _this.options.length; _i += 1) {
        if (_this.options[_i].value && _this.options[_i].label) {
          selectOptions.push("<option value=\"".concat(_this.options[_i].value, "\">").concat(_this.options[_i].label, "</option>"));
        }
      }

      _this.select.innerHTML = selectOptions.join('');
    }

    _this.select.tabIndex = -1;
    _this.select.style.display = 'none'; // wrapper

    _this.wrapper = document.createElement('div');

    var cloneDiv = _this.wrapper.cloneNode(false);

    var cloneDivParentNode = _this.wrapper.cloneNode(false);

    _this.wrapper.classList.add('c-select'); // label


    var labelWrapper = cloneDiv;
    var lbl = document.createElement('label');
    labelWrapper.classList.add('c-select__label');
    lbl.innerHTML = label;
    labelWrapper.appendChild(lbl); // input

    _this.input = document.createElement('input');

    _this.input.classList.add('c-select__input');

    _this.input.setAttribute('type', 'text');

    _this.input.setAttribute('readonly', true);

    _this.input.setAttribute('placeholder', placeholder); // dropdown


    _this.dropdown = document.createElement('ul');

    _this.dropdown.classList.add('c-select__dropdown');

    var dropdownOptions = [];

    for (var _i2 = 0; _i2 < _this.options.length; _i2 += 1) {
      if (_this.options[_i2].value && _this.options[_i2].label) {
        dropdownOptions.push("<li class=\"c-select__dropdown__item\" data-value=\"".concat(_this.options[_i2].value, "\">").concat(_this.options[_i2].label, "</li>"));
      }
    }

    _this.dropdown.innerHTML = dropdownOptions.join('');
    /* eslint-disable */
    // icon

    var icon = "\n      <div class=\"c-select__icon\">\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"28\" viewBox=\"0 0 16 28\">\n          <path d=\"M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z\"></path>\n        </svg>\n      </div>";
    /* eslint-enable */
    // append

    _this.wrapper.innerHTML = icon;

    _this.wrapper.appendChild(labelWrapper);

    _this.wrapper.appendChild(_this.input);

    _this.wrapper.appendChild(_this.dropdown);

    if (!_this.select.parentNode && _this.elem) {
      _this.elem.appendChild(_this.select);

      _this.elem.appendChild(_this.wrapper);
    } else if (!_this.select.parentNode) {
      cloneDivParentNode.appendChild(_this.select);
      cloneDivParentNode.appendChild(_this.wrapper);
      _this.wrapper = cloneDivParentNode;
    } else {
      // @see how to make a wrap with DOM in vanilla
      // https://plainjs.com/javascript/manipulation/wrap-an-html-structure-around-an-element-28/
      (0, _wrap["default"])(_this.elem, cloneDivParentNode);
      cloneDivParentNode.appendChild(_this.wrapper);
    } // Init events


    _this._setupEventHandlers();

    return _this;
  }

  (0, _createClass2["default"])(Select, [{
    key: "destroy",

    /**
     * Destroy
     */
    value: function destroy() {
      this._removeEventHandlers();

      this.wrapper.remove();
      this.wrapper = undefined;
    }
    /**
     * Remove Event Handlers
     */

  }, {
    key: "_removeEventHandlers",
    value: function _removeEventHandlers() {
      this.input.removeEventListener(ON_CLICK, this._showDropdownBound);
      this.input.removeEventListener(ON_FOCUS, this._showDropdownBound);
      this.input.removeEventListener(ON_BLUR, this._hideDropdownBound);
      this.dropdown.removeEventListener(ON_CLICK, this._handleOptionClickBound);
      this.dropdown.removeEventListener(ON_MOUSE_DOWN, function (event) {
        return event.preventDefault();
      });
      this.events.unsubscribe(BLUR, this._hideDropdownBound);
      document.body.removeEventListener(ON_KEY_UP, this._handleOptionKeyUpBound);
    }
    /**
     * Setup Event Handlers
     */

  }, {
    key: "_setupEventHandlers",
    value: function _setupEventHandlers() {
      this._handleOptionClickBound = this._handleOptionClick.bind(this);
      this._handleOptionKeyUpBound = this._handleOptionKeyUp.bind(this);
      this._showDropdownBound = this._showDropdown.bind(this);
      this._hideDropdownBound = this._hideDropdown.bind(this);
      this.input.addEventListener(ON_CLICK, this._showDropdownBound);
      this.input.addEventListener(ON_FOCUS, this._showDropdownBound);
      this.input.addEventListener(ON_BLUR, this._hideDropdownBound);
      this.dropdown.addEventListener(ON_MOUSE_DOWN, function (event) {
        return event.preventDefault();
      });
      this.dropdown.addEventListener(ON_CLICK, this._handleOptionClickBound);
      this.events.subscribe(BLUR, this._hideDropdownBound);
      document.body.addEventListener(ON_KEY_UP, (0, _debounce["default"])(this._handleOptionKeyUpBound, 150), true);
    }
    /**
     * Handle Option Click
     * @param {Event} event
     */

  }, {
    key: "_handleOptionClick",
    value: function _handleOptionClick(_ref) {
      var target = _ref.target,
          _ref$target = _ref.target,
          _ref$target$dataset = _ref$target.dataset,
          dataset = _ref$target$dataset === void 0 ? '' : _ref$target$dataset,
          _ref$target$innerText = _ref$target.innerText,
          innerText = _ref$target$innerText === void 0 ? '' : _ref$target$innerText;
      var value = dataset.value;
      var label = innerText;

      if (target.matches('li')) {
        this._setValueToInput(label);

        this._setValueToSelect(value);

        this._getSelectedState();

        this._removeActive(this.selectedState);

        this._addActive(target);

        this._setSelectedState(target);

        this.events.publish(BLUR);
      }
    }
    /**
     * Handle Option Keyup
     * @param {Event} event
     */

  }, {
    key: "_handleOptionKeyUp",
    value: function _handleOptionKeyUp(_ref2) {
      var keyCode = _ref2.keyCode;
      if (!this.isOpen) return;

      if (keyCode === ARROW_UP) {
        if (this.count === 0) {
          // i would become 0
          this.count = this.dropdown.children.length; // so put it at the other end of the array
        }

        this.count = this.count - 1;

        this._getSelectedState();

        this._removeActive(this.selectedState);

        this._addActive(this.dropdown.children[this.count]);

        this._setSelectedState(this.dropdown.children[this.count]);
      } else if (keyCode === ARROW_DOWN) {
        this.count = this.count + 1; // increase i by one

        this.count = this.count % this.dropdown.children.length; // if we've gone too high, start from `0` again

        this._getSelectedState();

        this._removeActive(this.selectedState);

        this._addActive(this.dropdown.children[this.count]);

        this._setSelectedState(this.dropdown.children[this.count]);
      } else if (keyCode === ENTER) {
        var _this$dropdown$childr = this.dropdown.children[this.count],
            _this$dropdown$childr2 = _this$dropdown$childr.dataset,
            dataset = _this$dropdown$childr2 === void 0 ? '' : _this$dropdown$childr2,
            _this$dropdown$childr3 = _this$dropdown$childr.innerText,
            innerText = _this$dropdown$childr3 === void 0 ? '' : _this$dropdown$childr3;
        var value = dataset.value;
        var label = innerText;

        this._setValueToInput(label);

        this._setValueToSelect(value);

        this.events.publish(BLUR);
      }
    }
    /**
     * Set text value to input
     * @param {Label} label
     */

  }, {
    key: "_setValueToInput",
    value: function _setValueToInput() {
      var label = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this.input.value = label;
    }
    /**
     * Set text value to select
     * @param {Value} value
     */

  }, {
    key: "_setValueToSelect",
    value: function _setValueToSelect() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this.select.value = value;

      if (value && this.events.events.CHANGE) {
        this.events.publish(CHANGE, value);
      }
    }
    /**
     * Append element
     * @param {Element} elem
     */

    /* eslint-disable */

  }, {
    key: "appendTo",
    value: function appendTo(elem) {
      if (!(elem instanceof Element)) {
        console.error(Error("".concat(elem, " is not an HTML Element")));
        return;
      }

      elem.appendChild(this.wrapper);
    }
    /**
     * Bind event
     * @param {eventName} event
     * @param {callback} callback
     */

  }, {
    key: "on",
    value: function on(eventName, callback) {
      this.events.subscribe(eventName, callback);
    }
    /**
     * Set selected elem
     * @param {Selected} selected
     */

  }, {
    key: "_setSelectedState",
    value: function _setSelectedState(selected) {
      this.selectedState = selected;
    }
    /**
     * Get selected elem
     * @return {Element} elem
     */

  }, {
    key: "_getSelectedState",
    value: function _getSelectedState() {
      return this.selectedState;
    }
    /**
     * Reset
     */

  }, {
    key: "reset",
    value: function reset() {
      this._setValueToInput(null);

      this._setValueToSelect(null);

      this.events.publish(RESET);
    }
    /**
     * Add active
     * @param {Element} elem
     */

  }, {
    key: "_addActive",
    value: function _addActive(elem) {
      if (!elem.classList.contains('is-active')) {
        elem.classList.add('is-active');
      }
    }
    /**
     * Remove active
     * @param {Element} elem
     */

  }, {
    key: "_removeActive",
    value: function _removeActive(elem) {
      if (elem && elem.classList.contains('is-active')) {
        elem.classList.remove('is-active');
      }
    }
    /**
     * Show dropdown
     */

  }, {
    key: "_showDropdown",
    value: function _showDropdown() {
      this.isOpen = true;
      this.dropdown.classList.add('is-visible');
    }
    /**
     * Hide dropdown
     */

  }, {
    key: "_hideDropdown",
    value: function _hideDropdown() {
      this.isOpen = false;
      this.dropdown.classList.remove('is-visible');
    }
    /* eslint-disable */

  }], [{
    key: "init",
    value: function init(elem, options) {
      return (0, _get2["default"])((0, _getPrototypeOf2["default"])(Select), "init", this).call(this, this, elem, options);
    }
  }]);
  return Select;
}(_component["default"]);

var _default = Select;
exports["default"] = _default;
//# sourceMappingURL=index.js.map