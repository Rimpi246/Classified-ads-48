import { newTagify } from "./helpers/new-tagify";

const inputElm = document.querySelector("#donations") || document.querySelector("#skills");
let enTags, arTags, frTags;
let tagifyObj;
const choices = document.getElementsByClassName("tagsLang");
// TODO: Context specific. Deal with languages.
export const setupInputTags = async () => {
  return new Promise(function(resolve, reject) {
    if (!(choices.length === 3) || !inputElm) {
      return resolve('rolling well');
    }
    // For gender specific datasets ESCOT
    const getTags = (json) => {
      if(json[0].masculine) {
        return json.map((tag) => tag.masculine)
      }
      return json;
    }
    const dataURLs = [
      `/data/get_${inputElm.id}_tags_ar`, 
      `/data/get_${inputElm.id}_tags_en`,
      `/data/get_${inputElm.id}_tags_fr`];
  
  
    var promises = dataURLs.map(url => fetch(url).then(y => y.json()));
    Promise.all(promises).then(arr => {
      arTags = getTags(arr[0].tags);
      enTags = getTags(arr[1].tags);
      frTags = getTags(arr[2].tags);
      resolve('### function "setupInputTags" run successfully')
    }).catch(err => {
      reject(new Error('### function "setupInputTags" failed'))
    })
  
    const enChoice = choices[0];
    const arChoice = choices[1];
    const frChoice = choices[2];
    enChoice.onclick = function () {
      if (enTags && inputElm) {
        tagifyObj = newTagify(tagifyObj, inputElm, enTags);
      }
    };
    arChoice.onclick = function () {
      if (arTags && inputElm) {
        tagifyObj = newTagify(tagifyObj, inputElm, arTags);
      }
    };
    frChoice.onclick = function () {
      if (frTags && inputElm) {
        tagifyObj = newTagify(tagifyObj, inputElm, frTags);
      }
    };
  });
};
