/**
 * loads Illustrations
 * @param {dom} keyword
 */

import { getAllIndexes } from "./helpers/get-all-indexes";
import { undrawGallery } from "../../../data/undraw";
import { buildMiniaturesGrid } from "./helpers/build-miniatures-grid";
import SimpleLightbox from "simple-lightbox";
import { lightbox } from "./state/lightbox";
let corpus = [];
if (typeof undrawGallery !== "undefined") {
  corpus = undrawGallery.map((a) => a.tags.split(", "));
}

export const loadIllustrations = (keyword) => {
  if (lightbox.current) {
    lightbox.current.destroy();
  }
  if (corpus.length && keyword.value) {
    const scoreIt = (tags) =>
      tags.indexOf(keyword.value) > -1 && 1 / tags.length;
    const scores = corpus.map(scoreIt);
    const bestImgIdx = getAllIndexes(scores, Math.max(...scores));
    const simpleLightboxInput = bestImgIdx
      .map((idx) => undrawGallery[idx].image)
      .slice(0, 3);

    if (simpleLightboxInput.length) {
      lightbox.current = SimpleLightbox.open({
        items: simpleLightboxInput,
      });
      buildMiniaturesGrid(simpleLightboxInput);
    }
  }
};
