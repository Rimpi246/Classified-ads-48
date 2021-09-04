import "egalink-toasty.js";
const Toasty = window["Toasty"];
const options = {
  classname: "toast",
  transition: "fade",
  insertBefore: true,
  duration: 4000,
  enableSounds: true,
  autoClose: false,
  progressBar: true,
  sounds: {
    info: "/sounds/info/1.mp3",
    success: "/sounds/success/1.mp3",
    warning: "/sounds/warning/1.mp3",
    error: "/sounds/error/1.mp3",
  },
  onShow: function (type) {},
  onHide: function (type) {},
  prependTo: document.body.childNodes[0],
};
const __errors__ = window["__errors__"];
const __successes__ = window["__successes__"];
export const runToasts = async () => {
  return new Promise(function(resolve, reject) {
    try {
      const toast = new Toasty(options);
      __errors__.forEach((error) => {
        toast.error(error);
      });
      __successes__.forEach((success) => {
        toast.success(success);
      });
      return resolve('### function "runToasts" run successfully');
    } catch (error) {
      console.log(
        error.message
      );
      return reject(new Error('### function "runToasts" failed'));
    }
  });
};
