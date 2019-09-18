"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOM_EVENTS = exports.SYSTEM_EVENTS = exports.KEYS = void 0;

/**
 * System event consts, used to notify when interesting things happen in client.
 *
 * @type {Object}
 */

/* eslint-disable */
var SYSTEM_EVENTS = {
  BLUR: 'BLUR',
  CHANGE: 'CHANGE',
  RESET: 'RESET'
};
/**
 * DOM events mapping for actions.
 *
 * @type {Object}
 */

exports.SYSTEM_EVENTS = SYSTEM_EVENTS;
var DOM_EVENTS = {
  ON_CLICK: 'click',
  ON_BLUR: 'blur',
  ON_FOCUS: 'focus',
  ON_KEY_UP: 'keyup',
  ON_MOUSE_DOWN: 'mousedown'
};
exports.DOM_EVENTS = DOM_EVENTS;
var KEYS = {
  ENTER: 13,
  ARROW_UP: 38,
  ARROW_DOWN: 40
};
exports.KEYS = KEYS;
//# sourceMappingURL=constants.js.map