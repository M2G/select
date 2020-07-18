import PubSub from '@m2g/pubsub';
import debounce from './debounce';
import Component from './component';
import wrap from './wrap';
import { SYSTEM_EVENTS, DOM_EVENTS, KEYS } from './constants';

const {
  BLUR,
  CHANGE,
  RESET
} = SYSTEM_EVENTS;

const {
  ON_CLICK,
  ON_BLUR,
  ON_FOCUS,
  ON_KEY_UP,
  ON_MOUSE_DOWN
} = DOM_EVENTS;

const {
  ENTER,
  ARROW_UP,
  ARROW_DOWN
} = KEYS;

/**
 * @class
 * @constructor
 * @public
 */
class Select extends Component {
  /**
   * Construct Select instance
   * @constructor
   * @param {Element} elem
   * @param {Object} params
   */
  constructor(elem, params) {
    super(Select, elem, params);

    const {
      placeholder = '', // placeholder
      name = '', // name
      options = [], // options
      label = '' // label
    } = params;

    // instantiation pubsub
    this.events = new PubSub();

    // Setup
    this.isOpen = false;
    this.count = 0;
    this.options = options;
    if (this.elem && this.elem.tagName === 'SELECT') {
      // select tag in DOM
      this.select = this.elem;
      // read values from DOM
      for (let i = 0; i < this.select.children.length; i += 1) {
        if (this.select.children[i].value && this.select.children[i].innerText) {
          this.options[i] = {
            value: this.select.children[i].value,
            label: this.select.children[i].innerText
          };
        }
      }
    } else {
      // select created programmatically
      this.select = document.createElement('select');
      this.select.setAttribute('name', name);
      // https://www.freecodecamp.org/forum/t/create-strings-using-template-literals-with-for-loop/220850
      const selectOptions = [];
      for (let i = 0; i < this.options.length; i += 1) {
        if (this.options[i].value && this.options[i].label) {
          selectOptions.push(`<option value="${this.options[i].value}">${this.options[i].label}</option>`);
        }
      }
      this.select.innerHTML = selectOptions.join('');
    }

    this.select.tabIndex = -1;
    this.select.style.display = 'none';

    // wrapper
    this.wrapper = document.createElement('div');

    const cloneDiv = this.wrapper.cloneNode(false);
    const cloneDivParentNode = this.wrapper.cloneNode(false);

    this.wrapper.classList.add('c-select');

    // label
    const labelWrapper = cloneDiv;
    const lbl = document.createElement('label');
    labelWrapper.classList.add('c-select__label');
    lbl.innerHTML = label;
    labelWrapper.appendChild(lbl);

    // input
    this.input = document.createElement('input');
    this.input.classList.add('c-select__input');
    this.input.setAttribute('type', 'text');
    this.input.setAttribute('readonly', true);
    this.input.setAttribute('placeholder', placeholder);

    // dropdown
    this.dropdown = document.createElement('ul');
    this.dropdown.classList.add('c-select__dropdown');

    const dropdownOptions = [];
    for (let i = 0; i < this.options.length; i += 1) {
      if (this.options[i].value && this.options[i].label) {
        dropdownOptions.push(
          `<li class="c-select__dropdown__item" data-value="${this.options[i].value}">${this.options[i].label}</li>`
        );
      }
    }

    this.dropdown.innerHTML = dropdownOptions.join('');

    /* eslint-disable */
    // icon
    const icon = `
      <div class="c-select__icon">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="28" viewBox="0 0 16 28">
          <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
        </svg>
      </div>`;
    /* eslint-enable */
    // append
    this.wrapper.innerHTML = icon;
    this.wrapper.appendChild(labelWrapper);
    this.wrapper.appendChild(this.input);
    this.wrapper.appendChild(this.dropdown);

    if (!this.select.parentNode && this.elem) {
      this.elem.appendChild(this.select);
      this.elem.appendChild(this.wrapper);
    } else if (!this.select.parentNode) {
      cloneDivParentNode.appendChild(this.select);
      cloneDivParentNode.appendChild(this.wrapper);
      this.wrapper = cloneDivParentNode;
    } else {
      // @see how to make a wrap with DOM in vanilla
      // https://plainjs.com/javascript/manipulation/wrap-an-html-structure-around-an-element-28/
      wrap(this.elem, cloneDivParentNode);
      cloneDivParentNode.appendChild(this.wrapper);
    }

    // Init events
    this._setupEventHandlers();
  }

  static create(elem, options) {
    return super.create(this, elem, options);
  }

  /**
   * Destroy
   */
  destroy() {
    this._removeEventHandlers();
    this.wrapper.remove();
    this.wrapper = undefined;
  }

  /**
   * Remove Event Handlers
   */
  _removeEventHandlers() {
    this.input.removeEventListener(ON_CLICK, this._showDropdownBound);
    this.input.removeEventListener(ON_FOCUS, this._showDropdownBound);
    this.input.removeEventListener(ON_BLUR, this._hideDropdownBound);
    this.dropdown.removeEventListener(ON_CLICK, this._handleOptionClickBound);
    this.dropdown.removeEventListener(ON_MOUSE_DOWN, event => event.preventDefault());
    this.events.unsubscribe(BLUR, this._hideDropdownBound);
    document.body.removeEventListener(ON_KEY_UP, this._handleOptionKeyUpBound);
  }

  /**
   * Setup Event Handlers
   */
  _setupEventHandlers() {
    this._handleOptionClickBound = this._handleOptionClick.bind(this);
    this._handleOptionKeyUpBound = this._handleOptionKeyUp.bind(this);
    this._showDropdownBound = this._showDropdown.bind(this);
    this._hideDropdownBound = this._hideDropdown.bind(this);

    this.input.addEventListener(ON_CLICK, this._showDropdownBound);
    this.input.addEventListener(ON_FOCUS, this._showDropdownBound);
    this.input.addEventListener(ON_BLUR, this._hideDropdownBound);
    this.dropdown.addEventListener(ON_MOUSE_DOWN, event => event.preventDefault());
    this.dropdown.addEventListener(ON_CLICK, this._handleOptionClickBound);
    this.events.subscribe(BLUR, this._hideDropdownBound);
    document.body.addEventListener(ON_KEY_UP, debounce(this._handleOptionKeyUpBound, 150), true);
  }

  /**
   * Handle Option Click
   * @param {Event} event
   */
  _handleOptionClick({ target, target: { dataset = '', innerText = '' } }) {
    const { value } = dataset;
    const label = innerText;
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
  _handleOptionKeyUp({ keyCode }) {
    if (!this.isOpen) return;

    if (keyCode === ARROW_UP) {
      if (this.count === 0) { // i would become 0
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
      const { dataset = '', innerText = '' } = this.dropdown.children[this.count];
      const { value } = dataset;
      const label = innerText;
      this._setValueToInput(label);
      this._setValueToSelect(value);
      this.events.publish(BLUR);
    }
  }

  /**
   * Set text value to input
   * @param {Label} label
   */
  _setValueToInput(label = '') {
    this.input.value = label;
  }

  /**
   * Set text value to select
   * @param {Value} value
   */
  _setValueToSelect(value = '') {
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
  appendTo(elem) {
    if (!(elem instanceof Element)) {
      console.error(Error(`${elem} is not an HTML Element`));
      return;
    }

    elem.appendChild(this.wrapper);
  }
  /**
   * Bind event
   * @param {eventName} event
   * @param {callback} callback
   */
  on(eventName, callback) {
    this.events.subscribe(eventName, callback);
  }
  /**
   * Set selected elem
   * @param {Selected} selected
   */
  _setSelectedState(selected) {
    this.selectedState = selected;
  }

  /**
   * Get selected elem
   * @return {Element} elem
   */
  _getSelectedState() {
    return this.selectedState;
  }

  /**
   * Reset
   */
  reset() {
    this._setValueToInput(null);
    this._setValueToSelect(null);
    this.events.publish(RESET);
  }

  /**
   * Add active
   * @param {Element} elem
   */
  _addActive(elem) {
    if (!elem.classList.contains('is-active')) {
      elem.classList.add('is-active');
    }
  }

  /**
   * Remove active
   * @param {Element} elem
   */
  _removeActive(elem) {
    if (elem && elem.classList.contains('is-active')) {
      elem.classList.remove('is-active');
    }
  }

  /**
   * Show dropdown
   */
  _showDropdown() {
    this.isOpen = true;
    this.dropdown.classList.add('is-visible');
  }

  /**
   * Hide dropdown
   */
  _hideDropdown() {
    this.isOpen = false;
    this.dropdown.classList.remove('is-visible');
  }
  /* eslint-disable */
}

export default Select;
