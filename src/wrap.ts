/* eslint-disable */
function wrap(el, wrapper): void {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}

export default wrap;
