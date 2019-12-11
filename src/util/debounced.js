/**
 * Ensures a function is only run only once every delay
 *
 * @param delay {number} the number of milliseconds to delay the function call
 * @return function
 */
export default function debounced(delay) {
  let timer = null;
  return function(fn, ...args) {
    const context = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}
