import { getDzStateNames } from "../../data/get-dz-state-names";
import { autoComplete } from "./vendors/auto-complete.min";

export const setupGovAutoComplete = () => {
  const names = getDzStateNames();
  // eslint-disable-next-line max-len
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ AUTOCOMPLETE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // Autocomplete for governmental divisions
  // autoComplete is safe if input does not exist
  const divAutoComplete = new autoComplete({
    selector: 'input[name="div_q"]',
    minChars: 1,
    source: function (term, suggest) {
      term = term.toLowerCase();
      const choices = names;
      const matches = [];
      for (let i = 0; i < choices.length; i++) {
        if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
      }
      suggest(matches);
    },
  });
};
