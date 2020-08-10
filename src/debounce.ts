import restArguments from './restArguments';
import delay from './delay';

/*
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 */

/* eslint-disable */
function debounce(func, wait, immediate) {
  let result;
  let timeout;

  const later = function (context, args) {
    timeout = null;
    if (args) result = func.apply(context, args);
  };
// @ts-ignore
  const debounced = restArguments(function (args) {
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(this, args);
    } else {
      // @ts-ignore
      timeout = delay(later, wait, this, args);
    }

    return result;
  });
// @ts-ignore
  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}

export default debounce;
