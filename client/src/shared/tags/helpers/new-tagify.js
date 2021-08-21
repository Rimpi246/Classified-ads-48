import Tagify from "@yaireo/tagify";
import { transformTag } from "./transform-tag";
/**
 * @param tagified
 * @param input
 * @param {array} tags of some language
 * @param maxTags
 */
export function newTagify(tagified, input, tags, maxTags = 3) {
  if (tagified) {
    tagified.destroy();
  }
  tagified = new Tagify(input, {
    pattern: /^.{0,20}$/,
    delimiters: ",| ",
    keepInvalidTags: false,
    editTags: {
      clicks: 1, // single click to edit a tag
      keepInvalid: true, // if after editing, tag is invalid, auto-revert
    },
    maxTags,
    whitelist: tags,
    transformTag: transformTag,
    backspace: "edit",
    placeholder: "Type something",
    dropdown: {
      enabled: 1,
      fuzzySearch: true,
      position: "text",
      caseSensitive: true,
    },
    templates: {
      dropdownItemNoMatch: function (data) {
        return `No suggestion found for: ${data.value}`;
      },
    },
  });
  return tagified;
}
