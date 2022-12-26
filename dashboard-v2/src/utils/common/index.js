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

/**
 * File download from url
 * @param {*} url
 * @param {*} name
 */
export const downloadFileFromUrl = (url, name) => {
  fetch(url)
    .then((res) => res.blob())
    .then((file) => {
      const tempUrl = URL.createObjectURL(file);

      const a = Object.assign(document.createElement("a"), {
        href: tempUrl,
        style: "display:none",
        download: name,
      });

      a.download = name ? name : url.replace(/^.*[\\\/]/, "");

      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(tempUrl);
      a.remove();
    });
};

/**
 *
 * @param {*} url
 * @param {*} target
 */
export const openLinkInNewTab = (url, target = "_blank") => {
  if (url) {
    window.open(url, target, "noreferrer");
  }
};
