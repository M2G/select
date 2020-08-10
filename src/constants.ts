/**
 * System event consts, used to notify when interesting things happen in client.
 *
 * @type {Object}
 */
/* eslint-disable */
const SYSTEM_EVENTS = {
  BLUR             : 'BLUR',
  CHANGE           : 'CHANGE',
  RESET            : 'RESET'
};

/**
 * DOM events mapping for actions.
 *
 * @type {Object}
 */
const DOM_EVENTS = {
  ON_CLICK                : 'click',
  ON_BLUR                 : 'blur',
  ON_FOCUS                : 'focus',
  ON_KEY_UP               : 'keyup',
  ON_MOUSE_DOWN           : 'mousedown'
};

const DOM = {
  SELECT: "SELECT"
};

const KEYS = {
  ENTER      : 13,
  ARROW_UP   : 38,
  ARROW_DOWN : 40
};

export {
  KEYS,
  SYSTEM_EVENTS,
  DOM_EVENTS,
  DOM
};
