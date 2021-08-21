import Avatar from "avatar-initials";
const __initials__ = window["__initials__"];
// eslint-disable-next-line max-len
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Avatar @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
export const setupGravatar = () => {
  const gravatar = document.getElementById("avatar");
  if (gravatar) {
    gravatar.style.border = "2px solid #3399CC";
    const avatar = Avatar.from(document.getElementById("avatar"), {
      useGravatar: false,
      initials: __initials__,
    });
  }
};
