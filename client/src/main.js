/*
  'main.js' has access to DOM objects and runs on every page.
  This is why it should be safe because
  pages contain different HTML elements

  GLOBAL VARIABLES besides DOM objects are
  coming sequencially from imported scripts
  before 'main.js' is imported. These are variables renamed

  - pell -> __pell: https://github.com/jaredreich/pell
  - new Tagify: https://github.com/yairEO/tagify
  - new Toasty: https://github.com/egalink/Toasty.js
  - holmes: https://github.com/Haroenv/holmes
  - new autoComplete:  https://github.com/Pixabay/JavaScript-autoComplete
  - jsI18n: https://github.com/danabr/jsI18n
  - new Avatar: https://github.com/MatthewCallis/avatar
  - new FontPicker: https://github.com/samuelmeuli/font-picker
  - Stretchy: https://github.com/LeaVerou/stretchy
  - SVGInjector: https://github.com/iconic/SVGInjector
*/

import { setupShared } from "./shared/shared";
import {APIHost, logLevel} from "./consts";
import log from 'loglevel';
log.setDefaultLevel(logLevel[process.env.NODE_ENV]);

if (['development', 'local'].includes(APIHost[process.env.NODE_ENV])) {
  console.log(`Section: ${__section__}`)
  console.log(`Successes: ${__successes__}`)
  console.log(`Errors: ${__errors__}`)
  console.log(`Latitude: ${__lat__}`)
  console.log(`Longitude: ${__lng__}`)
  console.log(`Font: ${__font__}`)
  console.log(`Initials: ${__initials__}`)
  console.log(`Section: ${__section__}`)
}

console.log(
  ' compiled under environment:', process.env.NODE_ENV, '\n',
  'compiled for domain:', APIHost[process.env.NODE_ENV], '\n',
);

setupShared();
