/**
 * All common util function will expose here
 */

/**
 *  Debounce function
 * @param {Func} func
 * @param {Number} wait
 * @param {Boolean} immediate
 * @returns
 */
export function debounce(func, wait, immediate = false) {
  let timeout;
  return function () {
    var vm = this;
    var args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(vm, args);
    }, wait);
    if (immediate && !timeout) {
      func.apply(vm, args);
    }
  };
}

/**
 * 
 * @param {*} text 
 * @returns 
 */
export const kebabCase = (text) => {
  return text.replace(NON_WORD_UNDERSCORE, "-");
};

/**
 * 
 * @param {*} text 
 * @returns 
 */
export const snakeCase = (text) => {
  return text.replace(NON_WORD_UNDERSCORE, "_");
};
