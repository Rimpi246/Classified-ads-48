import { newTagify } from "./helpers/new-tagify";

const inputElm = document.querySelector("#donations") || document.querySelector("#skills");
let enTags, arTags, frTags;
let tagifyObj;
const choices = document.getElementsByClassName("tagsLang");
export const setupInputTags = () => {
  if (choices.length === 3) {
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
  }
  const getTags = (jsonTags) => {
    if(jsonTags[0].masculine) {
      return jsonTags.map((tag) => tag.masculine)
    }
    return jsonTags;
  }
  if (inputElm) {
    fetch(`/data/get_${inputElm.id}_tags_ar`)
      .then((res) => res.json())
      .then((tags) => {
        arTags = getTags(tags.tags);
      })
      .catch((err) => {
        throw err;
      });
    fetch(`/data/get_${inputElm.id}_tags_en`)
      .then((res) => res.json())
      .then((tags) => {
        enTags = getTags(tags.tags);
      })
      .catch((err) => {
        throw err;
      });
    fetch(`/data/get_${inputElm.id}_tags_fr`)
      .then((res) => res.json())
      .then((tags) => {
        frTags = getTags(tags.tags);
      })
      .catch((err) => {
        throw err;
      });
  } 
};
