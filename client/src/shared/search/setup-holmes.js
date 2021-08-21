// eslint-disable-next-line max-len
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ HOLMES @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
/**
 * ADD 'github.com/Haroenv/holmes' INSTANT SEARCH
 * MUST EXIST:
 *    .search input (search input)
 *    .row .card p (complex nested elements to ensure the page we are in)
 *    .col-sm (what to search, show and hide in case it matches)
 */
import holmes from "holmes.js";

export const setupHolmes = () => {
  if (document.querySelector(".row .card p")) {
    try {
      const h = holmes({
        input: ".search input",
        find: ".col-sm",
        placeholder: "<h3>— No results, my dear Watson. —</h3>",
        mark: true,
        hiddenAttr: true,
        class: {
          visible: "visible",
          hidden: "hidden",
        },
        onHidden(el) {
          // console.log("hidden", el);
        },
        onFound(el) {
          // console.log("found", el);
        },
        onInput(el) {
          // console.log("input", el);
        },
        onVisible(el) {
          // console.log("visible", el);
        },
        onEmpty(el) {
          // console.log("empty", el);
        },
      });
    } catch (error) {
      console.log(
        "Maybe running where there is no list in HTML | ERROR: ",
        error.message
      );
    }
  }
};
