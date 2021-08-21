// eslint-disable-next-line max-len
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ HOLMES @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
/**
 * ADD 'https://tarekraafat.github.io/autoComplete.js/' auto complete
 * MUST EXIST:
 *    input id="autoComplete"
 */
import autoComplete from '@tarekraafat/autocomplete.js'
import {APIHost} from "../../consts";
export const setupAutoComplete = () => {
  if (document.querySelector('input#autoComplete')) {
    try {
      const autoCompleteJS = new autoComplete({
        placeHolder: "Search for Listings...",
        data: {
          src: async (query) => {
            try {
              // Fetch Data from external Source
              const source = await fetch(`${APIHost[process.env.NODE_ENV]}/listings/autocomplete/${query}`);
              // Data is array of `Objects` | `Strings`
              const data = await source.json();
              return data;
            } catch (error) {
              return error;
            }
          },
          // Data 'Object' key to be searched
          keys: ["_id"]
        },
        cache: true,
        debounce: 300,
        searchEngine: 'loose',
        diacritics: true,
        maxResults: 15,
        threshold: 3,
        resultItem: {
          highlight: true
        },
        events: {
          input: {
            selection: (event) => {
              const selection = event.detail.selection.value;
              const keyword = selection['_id'];
              autoCompleteJS.input.value = keyword;
              window.location.href = `${APIHost[process.env.NODE_ENV]}/keyword/${keyword}`;
            }
          }
        }
      });
    } catch (error) {
      console.log(
        "Maybe running where there is no input with id = 'autoComplete' in HTML | ERROR: ",
        error.message
      );
    }
  }
};
